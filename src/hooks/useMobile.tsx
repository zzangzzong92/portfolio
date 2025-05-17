"use client"

import { useState, useEffect } from "react"

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // 초기 설정
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // 초기 실행
    checkIfMobile()

    // 리사이즈 이벤트 리스너
    window.addEventListener("resize", checkIfMobile)

    // 클린업
    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  return isMobile
}
