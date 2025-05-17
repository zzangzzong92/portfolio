"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

// 페이지 전환 애니메이션 변형 설정
const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
}

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} initial="hidden" animate="visible" exit="exit" variants={pageVariants}>
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
