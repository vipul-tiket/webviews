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

  const [dialogContent, setDialogContent] = useState({
    title: "Title",
    body: "Body" ,
    buttonText: "Button Text"
  })

  const [historyBackCount, setHistoryBackCount] = useState(-1)

  const nativeJsiCustomEventListener = function(e) {
    console.log(e.detail)
  }

  useEffect(() => {
    window.addEventListener('nativeJSICallback', nativeJsiCustomEventListener)
    return () => {
      window.removeEventListener('nativeJSICallback', nativeJsiCustomEventListener)
    }
  })

  const [title, setTitle] = useState("tiket.com")
  const [snackbarMessage, setSnackbarMessage] = useState("Hello from Snackbar")
  const [externalUrl, setExternalUrl] = useState("https://google.com")
  const [openNewWebViewUrl, setOpenNewWebViewUrl] = useState("https://blibli.com")

  const forceExternal = (e) => {
    if(!!window.native) {
      window.native.forceExternal(externalUrl)
    } else {
      window.webkit.messageHandlers.forceExternal.postMessage(externalUrl)
    }
  }

  const gotoStore = (e) => {
    if(!!window.native) {
      window.native.gotoPlayStore()
    } else {
      window.webkit.messageHandlers.gotoAppStore.postMessage('')
    }
  }

  const closeWebViewJSI = (e) => {
    if(!!window.native) {
      window.native.closeWebView()
    } else {
      window.webkit.messageHandlers.closeWebView.postMessage('')
    }
  }

  const closeWebViewHistoryBack = (e) => {
    history.back()
  }

  const customHistoryBack = (e) => {
    history.go(historyBackCount)
  }

  const backOrClose = (e) => {
    if(!!window.native) {
      window.native.backOrClose()
    } else {
      window.webkit.messageHandlers.backOrClose.postMessage('')
    }
  }

  const navigateToBackOrClosePage = (e) => {
    router.push("back-or-close")
  }

  const showNavbar = (e) => {
    if(!!window.native) {
      window.native.showNavbar()
    } else {
      window.webkit.messageHandlers.showNavbar.postMessage('')
    }
  }

  const hideNavbar = (e) => {
    if(!!window.native) {
      window.native.hideNavbar()
    } else {
      window.webkit.messageHandlers.hideNavbar.postMessage('')
    }
  }

  const showLoading = (e) => {
    if(!!window.native) {
      window.native.showLoading()

      setTimeout(function (){
        window.native.hideLoading()
      }, 2000)
    } else {
      window.webkit.messageHandlers.showLoading.postMessage('')

      setTimeout(function (){
        window.webkit.messageHandlers.hideLoading.postMessage('')
      }, 2000)
    }
  }

  const hideLoading = (e) => {
    if(!!window.native) {
      window.native.hideLoading()
    }
  }

  const openNewWebView = (e) => {
    if(!!window.native) {
      window.native.openNewWebView(openNewWebViewUrl)
    } else {
      window.webkit.messageHandlers.openNewWebView.postMessage(openNewWebViewUrl)
    }
  }

  const setTitleWebView = (e) => {
    if(!!window.native) {
      window.native.setTitle(title)
    } else {
      window.webkit.messageHandlers.setTitle.postMessage(title)
    }
  }

  const showSnackbarDefault = (e) => {
    if(!!window.native) {
      window.native.showSnackBarDefault(snackbarMessage)
    } else {
      window.webkit.messageHandlers.showSnackBarDefault.postMessage(snackbarMessage)
    }
  }

  const showSnackbarError = (e) => {
    if(!!window.native) {
      window.native.showSnackBarError(snackbarMessage)
    } else {
      window.webkit.messageHandlers.showSnackBarError.postMessage(snackbarMessage)
    }
  }

  const showSnackbarSuccess = (e) => {
    if(!!window.native) {
      window.native.showSnackBarSuccess(snackbarMessage)
    } else {
      window.webkit.messageHandlers.showSnackBarSuccess.postMessage(snackbarMessage)
    }
  }

  const showDialog = (e) => {
    console.log(dialogContent)
    if(!!window.native) {
      window.native.showDialog(dialogContent.title, dialogContent.body, dialogContent.buttonText)
    } else {
      window.webkit.messageHandlers.showDialog.postMessage(dialogContent)
    }
  }

  const updateAccountData = (e) => {
    if(!!window.native) {
      window.native.updateAccountData(snackbarMessage)
    } else {
      window.webkit.messageHandlers.updateAccountData.postMessage('')
    }
  }

  const openPNV = (screenName, eventLabel) => {
    let request = {}
    if (screenName !== undefined && screenName != "") {
      request["screenName"] = screenName
      request["eventLabel"] = eventLabel
    }
    let json = {
      "command": "requestPhoneVerification",
      "request": request
    }
    console.log(json)
    if(!!window.generic) {
      window.generic.callGenericNativeJSI(JSON.stringify(json))
    } else {
      window.webkit.messageHandlers.callNativeJSI.postMessage(JSON.stringify(json))
    }
  }

  const onCLickOpenPNV = (e) => {
    openPNV("poc-web-common-actions", "poc only")
  }

  const onClickOpenPNVWithoutTracker = (e) => {
    openPNV()
  }

  const redirectToBlibliCloseIntent = (e) => {
    window.location.href = "https://www.blibli.com/:intent/close"
  }

  const redirectToBlibliCloseIntentIsExternalTrue = (e) => {
    window.location.href = "https://www.blibli.com/:intent/close?isExternal=true"
  }

  const redirectToBlibliTiketRewardsCloseIntent = (e) => {
    window.location.href = "https://www.bliblitiketrewards.com/:intent/close"
  }

  return (
    <div>
      <Head>
        <title>PoC Web Common Actions </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='container p-8 bg-slate-100'>
        <div className="grid grid-cols-1 gap-2">
          <div>{data}</div>
          <button onClick={gotoStore} className="shadow-md rounded-md p-2 w-full bg-neutral-50 active:bg-sky-300 text-center">
            Open PlayStore / AppStore
          </button>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={showNavbar} className="shadow-md rounded-md p-2 w-full bg-neutral-50 active:bg-sky-300 text-center">
              Show Navbar
            </button>
            <button onClick={hideNavbar} className="shadow-md rounded-md p-2 w-full bg-neutral-50 active:bg-sky-300 text-center">
              Hide Navbar
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={showLoading} className="shadow-md rounded-md p-2 w-full bg-neutral-50 active:bg-sky-300 text-center">
              Show Loading (Will hide after 2s for testing purposes)
            </button>
            <button onClick={hideLoading} className="shadow-md rounded-md p-2 w-full bg-neutral-50 active:bg-sky-300 text-center">
              Hide Loading
            </button>
          </div>
          <div className="shadow-md rounded-md p-2 w-full bg-neutral-50 text-center">
            <input value={historyBackCount} onChange={ e => setHistoryBackCount(e.target.value) } className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2" type="number"/>
            <button onClick={customHistoryBack} className="shadow-md rounded-md p-2 w-full bg-blue-500 active:bg-sky-600 text-white text-center">
              History Back
            </button>
          </div>
          <button onClick={closeWebViewJSI} className="shadow-md rounded-md p-2 w-full bg-neutral-50 active:bg-sky-300 text-center">
            Close WebView (JSI)
          </button>
          <button onClick={closeWebViewHistoryBack} className="shadow-md rounded-md p-2 w-full bg-neutral-50 active:bg-sky-300 text-center">
            Close WebView (history.back)
          </button>
          <button onClick={redirectToBlibliCloseIntent} className="shadow-md rounded-md p-2 w-full bg-neutral-50 active:bg-sky-300 text-center">
            Close With Redirection (https://www.blibli.com/:intent/close)
          </button>
          <button onClick={redirectToBlibliCloseIntentIsExternalTrue} className="shadow-md rounded-md p-2 w-full bg-neutral-50 active:bg-sky-300 text-center">
            Close With Redirection (https://www.blibli.com/:intent/close?isExternal=true)
          </button>
          <button onClick={redirectToBlibliTiketRewardsCloseIntent} className="shadow-md rounded-md p-2 w-full bg-neutral-50 active:bg-sky-300 text-center">
            Close With Redirection (https://www.bliblitiketrewards.com/:intent/close)
          </button>
          <button onClick={updateAccountData} className="shadow-md rounded-md p-2 w-full bg-neutral-50 active:bg-sky-300 text-center">
            Update Account Data
          </button>
          <button onClick={onCLickOpenPNV} className="shadow-md rounded-md p-2 w-full bg-neutral-50 active:bg-sky-300 text-center">
            Update PNV
          </button>
          <button onClick={onClickOpenPNVWithoutTracker} className="shadow-md rounded-md p-2 w-full bg-neutral-50 active:bg-sky-300 text-center">
            Update PNV Without Tracker Property
          </button>
          <div className="shadow-md rounded-md p-2 w-full bg-neutral-50 text-center">
            <button onClick={backOrClose} className="shadow-md rounded-md p-2 w-full bg-blue-500 active:bg-sky-600 text-white text-center mb-2">
              Back or Close (will behave like closeWebView because on first page no history)
            </button>
            <button onClick={navigateToBackOrClosePage} className="shadow-md rounded-md p-2 w-full bg-blue-500 active:bg-sky-600 text-white text-center">
              Dummy Page to test Back or Close
            </button>
          </div>
          <div className="shadow-md rounded-md p-2 w-full bg-neutral-50 text-center">
            <input value={openNewWebViewUrl} onChange={ e => setOpenNewWebViewUrl(e.target.value) } className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2" type="text"/>
            <button onClick={openNewWebView} className="shadow-md rounded-md p-2 w-full bg-blue-500 active:bg-sky-600 text-white text-center">
              Open New WebView
            </button>
          </div>
          <div className="shadow-md rounded-md p-2 w-full bg-neutral-50 text-center">
            <input value={externalUrl} onChange={ e => setExternalUrl(e.target.value) } className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2" type="text"/>
            <button onClick={forceExternal} className="shadow-md rounded-md p-2 w-full bg-blue-500 active:bg-sky-600 text-white text-center">
              Force External
            </button>
          </div>
          <div className="shadow-md rounded-md p-2 w-full bg-neutral-50 text-center">
            <input value={title} onChange={ e => setTitle(e.target.value) } className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2" type="text"/>
            <button onClick={setTitleWebView} className="shadow-md rounded-md p-2 w-full bg-blue-500 active:bg-sky-600 text-white text-center">
              Set Title
            </button>
          </div>
          <div className="shadow-md rounded-md p-2 w-full bg-neutral-50 text-center">
            <input value={snackbarMessage} onChange={ e => setSnackbarMessage(e.target.value) } className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2" type="text"/>
            <button onClick={showSnackbarDefault} className="shadow-md rounded-md p-2 w-full bg-blue-500 active:bg-sky-600 text-white text-center">
              Show SnackBar Default
            </button>
          </div>
          <div className="shadow-md rounded-md p-2 w-full bg-neutral-50 text-center">
            <input value={snackbarMessage} onChange={ e => setSnackbarMessage(e.target.value) } className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2" type="text"/>
            <button onClick={showSnackbarSuccess} className="shadow-md rounded-md p-2 w-full bg-blue-500 active:bg-sky-600 text-white text-center">
              Show SnackBar Success
            </button>
          </div>
          <div className="shadow-md rounded-md p-2 w-full bg-neutral-50 text-center">
            <input value={snackbarMessage} onChange={ e => setSnackbarMessage(e.target.value) } className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2" type="text"/>
            <button onClick={showSnackbarError} className="shadow-md rounded-md p-2 w-full bg-blue-500 active:bg-sky-600 text-white text-center">
              Show SnackBar Error
            </button>
          </div>
          <div className="shadow-md rounded-md p-2 w-full bg-neutral-50 text-center">
            <input value={dialogContent.title} onChange={ e => setDialogContent({...dialogContent, title: e.target.value}) } className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2" type="text"/>
            <input value={dialogContent.body} onChange={ e => setDialogContent({...dialogContent, body: e.target.value}) } className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2" type="text"/>
            <input value={dialogContent.buttonText} onChange={ e => setDialogContent({...dialogContent, buttonText: e.target.value}) } className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2" type="text"/>
            <button onClick={showDialog} className="shadow-md rounded-md p-2 w-full bg-blue-500 active:bg-sky-600 text-white text-center">
              Show Dialog
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
