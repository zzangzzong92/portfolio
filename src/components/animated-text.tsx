"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface AnimatedTextProps {
  children: ReactNode
  className?: string
  delay?: number
}

// 텍스트 애니메이션을 위한 변형 설정
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
}

export function AnimatedText({ children, className = "", delay = 0 }: AnimatedTextProps) {
  return (
    <motion.div initial="hidden" animate="visible" custom={delay} variants={textVariants} className={className}>
      {children}
    </motion.div>
  )
}
