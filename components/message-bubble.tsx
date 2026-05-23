"use client";

import { motion } from "framer-motion";

export type MessageRole = "user" | "model";

export type ChatMessage = {
  id: string;
  role: MessageRole;
  content: string;
};

type MessageBubbleProps = {
  message: ChatMessage;
};

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[88%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed shadow-sm transition-shadow hover:shadow-md sm:max-w-[78%] sm:text-base ${
          isUser
            ? "bg-[#FF5A36] text-white shadow-[0_4px_20px_-4px_rgba(255,90,54,0.45)]"
            : "glass border-neutral-200/60 text-neutral-900"
        }`}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
      </div>
    </motion.div>
  );
}
