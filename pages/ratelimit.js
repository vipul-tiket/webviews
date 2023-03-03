import Head from 'next/head'
import Image from 'next/image'

export default function BackOrClose() {
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

  const reload = (e) => {
    if (!!window && !!window.location) {
      window.location.reload()
    }
    
  }

  return (
    <div>
      <Head>
      <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Tiket Masuk Konser Musik, Paket Wisata, Hiburan - tiket.com</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" />
      </Head>

      <div style={{"background-color": "white","height": "100vh","width": "100%","display": "flex","justify-content": "center","align-items": "center"}}>
        <div style={{"padding": "20px","border-radius": "5px","max-width": "420px","text-align": "center"}}>
        <img style={{"width": "100%","height": "auto","margin-bottom": "32px"}} src="https://www.tiket.com/to-do/assets/rate-limiter-access-illustration.png" alt="" />
        <div style={{"font-weight": "600","font-size": "20px","line-height": "30px","color": "#35405a","margin-bottom": "6px"}}>Sorry, but you have to wait</div>
        <div style={{"font-weight": "400","font-size": "14px","line-height": "22px","color": "#58627a","margin-bottom": "24px"}}>This ticket is in high demand. Tap "Retry" periodically until you can continue.</div>
         
         <button onClick={reload} style={{"cursor":"pointer", "font-size": "18px","line-height": "28px","color": "#fff","background": "#0064d2","border-radius": "24px","padding-top": "9px","padding-bottom": "11px","width": "100%","border": "none"}}>RETRY</button>
        </div>
    </div>
    </div>
  )
}

