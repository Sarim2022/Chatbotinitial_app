"use client";

import { motion } from "framer-motion";

export default function ThinkingState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex flex-1 items-center justify-center py-24"
    >
      <p className="animate-thinking text-lg font-medium tracking-wide text-neutral-500 sm:text-xl">
        Thinking...
      </p>
    </motion.div>
  );
}
