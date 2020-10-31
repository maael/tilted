import Link from 'next/link'

export default function Index() {
  return (
    <div style={{ fontSize: '1.5em' }}>
      <div style={{ fontSize: '3em' }}>🤔 Tilted</div>
      <div style={{ backgroundColor: 'var(--color-text)', color: 'var(--color-bg)', margin: '5px 0px', padding: 10 }}>
        <Link href="/g/movies">
          <a>Start guessing Movies</a>
        </Link>
      </div>
      <div style={{ backgroundColor: 'var(--color-text)', color: 'var(--color-bg)', margin: '5px 0px', padding: 10 }}>
        <Link href="/g/tv">
          <a>Start guessing TV Shows</a>
        </Link>
      </div>
      <div style={{ backgroundColor: 'var(--color-text)', color: 'var(--color-bg)', margin: '5px 0px', padding: 10 }}>
        <Link href="/g/games">
          <a>Start guessing Video Games</a>
        </Link>
      </div>
    </div>
  )
}
