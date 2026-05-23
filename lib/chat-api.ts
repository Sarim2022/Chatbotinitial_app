import type { ChatMessage } from "@/components/message-bubble";

type ApiMessage = Pick<ChatMessage, "role" | "content">;

export async function streamChatResponse(
  messages: ApiMessage[],
  onChunk: (text: string) => void,
): Promise<string> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(data?.error ?? "Failed to get a response. Please try again.");
  }

  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error("No response stream received.");
  }

  const decoder = new TextDecoder();
  let fullText = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    fullText += decoder.decode(value, { stream: true });
    onChunk(fullText);
  }

  fullText += decoder.decode();
  onChunk(fullText);

  return fullText;
}
