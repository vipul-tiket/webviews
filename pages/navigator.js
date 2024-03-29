

  import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

export async function getServerSideProps({ req }) {
  return {
    props: { data: req.headers["user-agent"]},
  }
}

export default function Home({ data }) {
  const router = useRouter()
  const [lang, setLanguage] = useState("en")
  useEffect(() => {
    // if (/^en\b/.test(navigator.language)) {
        setLanguage(window.navigator.language);
    //   }
    
  })

  return (
    <div>
      <Head>
        <title>PoC Web Common Actions </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='container p-8 bg-slate-100'>
        My Currency from browser navigator is: {lang}
        </div>
    </div>
  )
}
