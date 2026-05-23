"use client";

import { Send } from "lucide-react";
import { FormEvent, KeyboardEvent, RefObject, useEffect } from "react";
import { motion } from "framer-motion";

type ChatInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  inputRef?: RefObject<HTMLInputElement | null>;
};

export default function ChatInput({
  value,
  onChange,
  onSubmit,
  disabled = false,
  inputRef,
}: ChatInputProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef?.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, [inputRef]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!disabled && value.trim()) {
      onSubmit();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!disabled && value.trim()) {
        onSubmit();
      }
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 }}
      onSubmit={handleSubmit}
      className="relative z-20 mx-auto w-full max-w-3xl"
    >
      <div className="input-glow rounded-[28px] bg-gradient-to-br from-[#FFE3D1] via-[#FFD2BC] to-[#FFB796] p-[5px] transition-shadow duration-300 sm:rounded-[32px] sm:p-1.5">
        <div className="glass flex items-center gap-3 rounded-full bg-white/95 px-4 py-2.5 sm:gap-4 sm:px-5 sm:py-3">
          <input
            ref={inputRef}
            type="text"
            autoFocus
            autoComplete="off"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={handleKeyDown}
            onClick={(event) => event.currentTarget.focus()}
            placeholder="Ask Chatbotinitial anything..."
            disabled={disabled}
            className="min-w-0 flex-1 cursor-text bg-transparent text-[15px] text-neutral-900 placeholder:text-neutral-400 outline-none ring-0 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
          />

          <motion.button
            type="submit"
            disabled={disabled || !value.trim()}
            whileHover={{ scale: disabled ? 1 : 1.06 }}
            whileTap={{ scale: disabled ? 1 : 0.94 }}
            aria-label="Send message"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FF5A36] text-white shadow-[0_4px_14px_-2px_rgba(255,90,54,0.5)] transition-colors hover:bg-[#E84E2D] disabled:cursor-not-allowed disabled:opacity-40 sm:h-10 sm:w-10"
          >
            <Send className="h-4 w-4 sm:h-[17px] sm:w-[17px]" strokeWidth={2.25} />
          </motion.button>
        </div>
      </div>
    </motion.form>
  );
}
