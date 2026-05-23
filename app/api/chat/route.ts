import { GoogleGenAI } from "@google/genai";
import { NextRequest } from "next/server";

import type { ChatMessage } from "@/components/message-bubble";

const MODEL = "gemini-2.5-flash";

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY in environment variables.");
  }

  return new GoogleGenAI({ apiKey });
}

function toGeminiContents(messages: Pick<ChatMessage, "role" | "content">[]) {
  return messages.map((message) => ({
    role: message.role,
    parts: [{ text: message.content }],
  }));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const messages: Pick<ChatMessage, "role" | "content">[] = body.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json(
        { error: "Messages array is required." },
        { status: 400 },
      );
    }

    const ai = getGeminiClient();
    const stream = await ai.models.generateContentStream({
      model: MODEL,
      contents: toGeminiContents(messages),
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.text ?? "";
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to generate response.";
    return Response.json({ error: message }, { status: 500 });
  }
}
