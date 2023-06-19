import logo from './logo.svg';
import './App.css';
import { useCallback, useEffect, useState } from 'react';

const chromeWebView = window.chrome !== undefined
const reactNativeWebView = window.ReactNativeWebView !== undefined
const webkitWebView = window.webkit !== undefined
const start = Date.now()

function App() {
  const nativeCall = (fn, ...args) => {
    if (fn === undefined) {
      throw new Error(`postAction: no at least one action required.`)
    }

    chromeWebView && window.chrome.webview.postMessage(JSON.stringify({fn, args}))
    reactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({fn, args}))
    webkitWebView && window.webkit.messageHandlers.callbackHandler.postMessage(JSON.stringify({fn, args}));
  }

  const sendPostMessage = () => {
    // console.log(`post message`)
    // window.ReactNativeWebView.postMessage('nativeHello()');
    nativeCall('nativeHello')
  }

  const [nativeResult, setNativeResult] = useState("")  

  const log = useCallback( (...args) => {
    console.log(...args)
    nativeCall('console.log', ...args)
  }, [])


  const nativeMessage = useCallback((...args) => {
    if (!args[0])
      return

    if (typeof args[0].data === 'string') {
      if (args[0].data.startsWith('webpackHotUpdate')) {
        // ignore these!
        return
      }
    } else {
      // ignore non string
      return
    }

    try {
      //let result = JSON.stringify(args[0])
      let result = JSON.parse(args[0].data)
      if (!result.nativeResult)
        return

      log(`native result: ${result.nativeResult}`)
      setNativeResult(result.nativeResult)

    } catch (e) {
      log(`error parsing result: ${args[0].data.substring ? args[0].data.substring(0, 10) : '<>'}\n${e.message}\n${e.stack}`)
    }
    log(`native result 1: (${start})`, args[0].data)
  }, [setNativeResult])


  useEffect(() => {
    // window -> message receives a lot of noise, just use document
    reactNativeWebView && document.addEventListener('message', nativeMessage, true)
    chromeWebView && window.chrome.webview.addEventListener('message', nativeMessage, true)
    webkitWebView && window.addEventListener('message', nativeMessage, true)

    return () => {
      reactNativeWebView && document.removeEventListener('message', nativeMessage, true)
      chromeWebView && window.chrome.webview.removeEventListener('message', nativeMessage, true)
      webkitWebView && window.removeEventListener('message', nativeMessage, true)
    }
  }, [nativeMessage, log])
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      <button onClick={sendPostMessage}>Hello Native</button>
      <h1>{nativeResult}</h1>
      </header>
    </div>
  );
}

export default App;
