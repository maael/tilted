import { useEffect, useState } from 'react'

const ONE_SECOND = 1000

interface Params {
  start: number
  incrementMs?: number
  onTick?: (count: number) => void
  onFinish?: () => void
}

export default function useCountdown({ start, incrementMs = ONE_SECOND, onTick, onFinish }: Params) {
  const [countdown, setCountdown] = useState(start)
  useEffect(() => {
    if (countdown === 0) {
      onFinish && onFinish()
    }
    if (countdown <= 0) return undefined
    onTick && onTick(countdown)
    const timeout = setTimeout(() => setCountdown(countdown - 1), incrementMs)
    return () => {
      clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown])
  return countdown
}
