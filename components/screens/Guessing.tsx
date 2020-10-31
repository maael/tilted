import { createRef, useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import { useDebounceCallback } from '@react-hook/debounce'
import { v4 as uuidv4 } from 'uuid'
import { AiFillStar, AiOutlineNumber } from 'react-icons/ai'
import useGyro from '../hooks/useGyro'
import useCountdown from '../hooks/useCountdown'
import { useRouter } from 'next/router'
import useLocalstorage, { LocalStorageKeys } from '../hooks/useLocalstorage'
import { getBg, getReadable } from '../../utils/colors'
import shuffle from '../../utils/shuffle'

export default function GuessingScreen({ data: originalData, type }: { data: { name: string }[]; type: string }) {
  const data = useMemo(() => shuffle(originalData, Math.random), [originalData])
  const router = useRouter()
  const [wins, setWins] = useState(0)
  const [total, setTotal] = useState(0)
  const [bg, setBg] = useState(getBg())
  const [idx, setIdx] = useState(0)
  const [id] = useState(uuidv4())
  const [results, setResults] = useLocalstorage(
    LocalStorageKeys.RESULTS,
    { [data[idx].name]: { result: false, idx } },
    {
      keySuffix: id,
    }
  )
  const handleGyroTrigger = useDebounceCallback(
    (direction) => {
      const result = direction === 'backwards'
      if (result) {
        setWins((w) => w + 1)
      }
      setTotal((t) => t + 1)
      setBg(getBg())
      window.navigator.vibrate(100)
      setIdx((i) => {
        const newIdx = i === data.length - 1 ? 0 : i + 1
        setResults((items) => ({
          ...items,
          [data[i].name]: { result, idx: i },
          [data[newIdx].name]: { result: false, idx: newIdx },
        }))
        return newIdx
      })
    },
    1000,
    true
  )
  const countdown = useCountdown({
    start: 30,
    onFinish: async () => {
      setResults(results)
      window.navigator.vibrate([100, 100, 100])
      await router.push(`/results/${type}/${id}`)
    },
  })
  useGyro(handleGyroTrigger)
  return (
    <>
      <Head>
        <meta key={'theme-color'} name="theme-color" content={bg} />
      </Head>
      <style global jsx>{`
        :root {
          --color-bg: ${bg};
          --color-text: ${getReadable(bg)};
        }
        body {
          overflow: hidden;
        }
      `}</style>
      <div>
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
          }}
        >
          <div
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '10vmin',
              marginTop: 10,
            }}
          >
            <div
              style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
            >
              <AiFillStar style={{ marginRight: 5 }} size={'10vmin'} /> {wins}
            </div>
            <div
              style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
            >
              <AiOutlineNumber style={{ marginRight: 5 }} size={'10vmin'} /> {total}
            </div>
          </div>
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              padding: '2vmin',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '15vmin',
              textAlign: 'center',
            }}
          >
            <div>{data[idx].name}</div>
          </div>
          <div
            style={{
              position: 'fixed',
              bottom: 10,
              right: '50%',
              transform: 'translate(50%)',
              textAlign: 'center',
              fontSize: '10vmin',
            }}
          >
            {countdown}
          </div>
        </div>
      </div>
    </>
  )
}
