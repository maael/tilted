import { useEffect, useRef, useState } from 'react'
import useGyroPermissions from './useGyroPermissions'

const ax = ['x', 'y', 'z', 'w']

export default function useGryo(onTrigger: (direction: 'forwards' | 'backwards') => void) {
  const permission = useGyroPermissions()
  const [quaternion, setQuaternion] = useState({ x: 0, y: 0, z: 0 })
  const ignoreNext = useRef(false)
  useEffect(() => {
    let ignoreTs
    const sensor = new Gyroscope({ frequency: 30 })
    function handle() {
      setQuaternion({
        x: Number(sensor.x.toFixed(2)),
        y: Number(sensor.y.toFixed(2)),
        z: Number(sensor.z.toFixed(2)),
      })
      if (Math.abs(sensor.y) > 8.5 && !ignoreNext.current) {
        ignoreNext.current = true
        onTrigger(sensor.y > 0 ? 'backwards' : 'forwards')
        ignoreTs = setTimeout(() => (ignoreNext.current = false), 1000)
      }
    }
    if (permission) {
      sensor.start()
      sensor.addEventListener('reading', handle)
    }
    return () => {
      sensor.stop()
      sensor.removeEventListener('reading', handle)
      if (ignoreTs) {
        clearTimeout(ignoreTs)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permission])
  return quaternion
}
