import { useRouter } from 'next/router'
import Link from 'next/link'
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'
import useLocalStorage, { LocalStorageKeys } from '../../../components/hooks/useLocalstorage'

export default function Index() {
  const { query } = useRouter()
  const [results] = useLocalStorage(LocalStorageKeys.RESULTS, {}, { keySuffix: query.id as string })
  const vals = Object.values(results)
  const wins = vals.filter((i: any) => i.result)
  return (
    <div style={{ margin: '10px 0px' }}>
      <div style={{ fontSize: '2em' }}>
        {wins.length} / {vals.length}
      </div>
      <div style={{ fontSize: '1.5em', margin: '5px 0px 15px 0px' }}>
        {Object.entries<any>(results)
          .sort(([_1, a], [_2, b]) => a.idx - b.idx)
          .map(([name, { result }], i) => (
            <div
              key={name}
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                opacity: result ? 1 : 0.8,
                backgroundColor: i % 2 === 0 ? '' : 'rgba(255, 255, 255, 0.2)',
                padding: '0px 10px',
              }}
            >
              <div style={{ flex: 0, marginRight: 10 }}>{i + 1}.</div>
              <div style={{ flex: 1, textAlign: 'left' }}>{name}</div>
              <div style={{ flex: 0, marginLeft: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                {result ? <AiOutlineCheckCircle /> : <AiOutlineCloseCircle />}
              </div>
            </div>
          ))}
      </div>
      <div style={{ backgroundColor: 'var(--color-text)', color: 'var(--color-bg)', margin: '5px 0px', padding: 10 }}>
        <Link href={`/g/${query.type}`}>
          <a>Play same again?</a>
        </Link>
      </div>
      <div style={{ backgroundColor: 'var(--color-text)', color: 'var(--color-bg)', margin: '5px 0px', padding: 10 }}>
        <Link href={`/`}>
          <a>Play something different?</a>
        </Link>
      </div>
    </div>
  )
}
