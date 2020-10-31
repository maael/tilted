import './styles.css'
import { useState } from 'react'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import useFathom from '../components/hooks/useFathom'
import SEO from '../next-seo.config'
import { getBg, getReadable } from '../utils/colors'

function App({ Component, pageProps }) {
  const [bg, setBg] = useState(getBg())
  useFathom()
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta key="theme-color" name="theme-color" content={bg} />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22> <text y=%22.9em%22 font-size=%2290%22>🤔</text></svg>"
        />
      </Head>
      <style global jsx>{`
        :root {
          --color-bg: ${bg};
          --color-text: ${getReadable(bg)};
        }
      `}</style>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  )
}

export default App
