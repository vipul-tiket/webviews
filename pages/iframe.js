import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'
export default function BackOrClose() {

  const [externalUrl, setExternalUrl] = useState("")

  const closeWebViewJSI = (e) => {
    if(!!window.native) {
      window.native.closeWebView()
    }
  }

  const backOrClose = (e) => {
    if(!!window.native) {
      window.native.backOrClose()
    }
  }
  var myHistory = [];

  const emptyStack = () => {
    // window.history.state = null;
    window.history.pushState(myHistory, "ramankit", "ramankit");
    window.history.pushState(myHistory, "ramankit", "ramankit");
    window.history.pushState(myHistory, "ramankit", "ramankit");
    window.history.pushState(myHistory, "ramankit", "ramankit");
    window.history.pushState(myHistory, "ramankit", "ramankit");
    window.history.pushState(myHistory, "ramankit", "ramankit");
    window.history.pushState(myHistory, "ramankit", "ramankit");
    window.history.pushState(myHistory, "ramankit", "ramankit");
  }

  const jsihistory = () => {
    if(!!window.native) {
      window.native.backOrClose()
    }
    history.back()
  }

  const historyjsi = () => {
    history.back()
    if(!!window.native) {
      window.native.backOrClose()
    }
  }

  const openIframe = () => {
    setExternalUrl('http://webviews-psi.vercel.app/ramankit');
  }
  

  const closeWebViewHistoryBack = (e) => {
    history.back()
  }

  return (
    <div>
      <Head>
        <title>Iframe to open a url</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='container p-8 bg-slate-100'>
        

        <div className="grid grid-cols-1 gap-2">
          <iframe src={externalUrl}></iframe>
          <button onClick={openIframe} className="shadow-md rounded-md p-2 w-full bg-neutral-50 active:bg-sky-300 text-center">
              Open Iframe
          </button>
        </div>
      </div>
    </div>
  )
}
