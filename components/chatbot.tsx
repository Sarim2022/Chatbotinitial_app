"use client";

import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import AnimatedParticleBackground from "@/components/animated-particle-background";
import ChatHeader from "@/components/chat-header";
import ChatInput from "@/components/chat-input";
import MessageBubble, { type ChatMessage } from "@/components/message-bubble";
import ThinkingState from "@/components/thinking-state";
import { streamChatResponse } from "@/lib/chat-api";

function createId() {
  return crypto.randomUUID();
}

export default function Chatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const focusInput = useCallback(() => {
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }, []);

  useEffect(() => {
    focusInput();
  }, [focusInput]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  const visibleMessages = messages.filter((m) => m.content);
  const showThinking =
    isLoading &&
    !messages.some((m) => m.role === "model" && m.content);

  const handleSubmit = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    setError(null);

    const userMessage: ChatMessage = {
      id: createId(),
      role: "user",
      content: trimmed,
    };

    const assistantId = createId();
    const assistantMessage: ChatMessage = {
      id: assistantId,
      role: "model",
      content: "",
    };

    const nextMessages = [...messages, userMessage];
    setMessages([...nextMessages, assistantMessage]);
    setInput("");
    setIsLoading(true);

    try {
      await streamChatResponse(nextMessages, (text) => {
        setMessages((current) =>
          current.map((message) =>
            message.id === assistantId ? { ...message, content: text } : message,
          ),
        );
      });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setError(message);
      setMessages((current) =>
        current.filter((message) => message.id !== assistantId),
      );
    } finally {
      setIsLoading(false);
      focusInput();
    }
  };

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-[#FAF8F5] text-neutral-900">
      <AnimatedParticleBackground />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <ChatHeader onPreviewClick={focusInput} />

        <main className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-4 sm:px-8 md:px-12 lg:px-16">
            <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col">
              {visibleMessages.length === 0 && !showThinking && !error && (
                <div className="flex flex-1 flex-col items-center justify-center py-16 text-center">
                  <p className="text-lg font-semibold tracking-tight text-neutral-900 sm:text-xl">
                    Welcome to Chatbotinitial
                  </p>
                  <p className="mt-2 max-w-sm text-sm text-neutral-500">
                    Ask anything below to start a conversation powered by
                    Gemini.
                  </p>
                </div>
              )}

              {visibleMessages.length > 0 && (
                <div className="flex flex-col gap-4 pb-4">
                  {visibleMessages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                  ))}
                </div>
              )}

              <AnimatePresence>
                {showThinking && <ThinkingState key="thinking" />}
              </AnimatePresence>

              {error && (
                <div className="glass mt-4 rounded-2xl border-red-200/80 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/90 to-transparent" />

          <div className="relative z-20 shrink-0 px-4 pb-5 pt-2 sm:px-8 md:px-12 lg:px-16">
            <ChatInput
              value={input}
              onChange={setInput}
              onSubmit={handleSubmit}
              disabled={isLoading}
              inputRef={inputRef}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
