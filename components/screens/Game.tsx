import { createRef, useEffect, useState } from 'react'
import fscreen from 'fscreen'
import useCountdown from '../hooks/useCountdown'

import GuessingScreen from './Guessing'

export default function Index({ data, type }: { data: { name: string }[]; type: string }) {
  const [hasStarted, setHasStarted] = useState(false)
  const gameScreen = createRef<HTMLDivElement>()
  const countdown = useCountdown({ start: 3, onFinish: () => setHasStarted(true) })
  useEffect(() => {
    try {
      if (gameScreen.current) fscreen.fullscreenEnabled && fscreen.requestFullscreen(gameScreen.current)
    } catch (e) {
      console.warn(e)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameScreen.current])
  return (
    <div>
      {hasStarted ? (
        <GuessingScreen data={data} type={type} />
      ) : (
        <div
          style={{
            transform: 'rotate(90deg)',
            transformOrigin: 'bottom left',
            position: 'absolute',
            top: '-100vw',
            left: 0,
            height: '100vw',
            width: '100vh',
            overflow: 'hidden',
            backgroundColor: 'var(--color-bg)',
            color: 'var(--color-text)',
            fontSize: '4em',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {countdown}
        </div>
      )}
    </div>
  )
}
