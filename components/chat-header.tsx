"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type ChatHeaderProps = {
  onPreviewClick?: () => void;
};

export default function ChatHeader({ onPreviewClick }: ChatHeaderProps) {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#FAF8F5]/60 backdrop-blur-xl">
      <div className="px-5 py-4 sm:px-8 md:px-12 lg:px-16">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex h-9 items-center gap-2.5 sm:gap-3"
          >
            <Image
              src="/giticon.png"
              alt="Chatbotinitial logo"
              width={36}
              height={36}
              className="size-9 shrink-0 object-contain"
              priority
            />
            <span className="font-['Times_New_Roman',Times,serif] text-2xl font-bold leading-9 tracking-tight text-neutral-900">
              Chatbotinitial
            </span>
          </motion.div>

          {/* Wrapped in an anchor tag for external redirection */}
          <a 
            href="https://sarim2022.github.io/WorkPortfolio/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block"
          >
            <motion.button
              type="button"
              onClick={onPreviewClick}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className="rounded-full bg-[#FF5A36] px-4 py-2 text-sm font-medium text-white shadow-[0_4px_14px_-2px_rgba(255,90,54,0.45)] transition-colors hover:bg-[#E84E2D] sm:px-5 sm:py-2.5 sm:text-[15px]"
            >
              I&apos;m Here
            </motion.button>
          </a>
        </div>
      </div>
      <div aria-hidden className="h-px w-full bg-neutral-200/80" />
    </header>
  );
}
