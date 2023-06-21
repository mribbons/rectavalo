import logo from './logo.svg';
import './App.css';
import { useCallback, useEffect, useState } from 'react';

const chromeWebView = window?.chrome?.webview?.postMessage !== undefined
const reactNativeWebView = window?.ReactNativeWebView?.postMessage !== undefined
const darwinWebView = window?.webkit?.messageHandlers?.callbackHandler?.postMessage !== undefined
const iosWebView = navigator.userAgent.indexOf('iPhone') >= 0 || navigator.userAgent.indexOf('iPad') >= 0

const start = Date.now()

let _callbackId = -1;
let _resolveQueue = {}

function addMessageEventListener(nativeMessage) {
  reactNativeWebView && window.addEventListener('message', nativeMessage, true);
  chromeWebView && window.chrome.webview.addEventListener('message', nativeMessage, true);
  darwinWebView && window.addEventListener('message', nativeMessage, true);
}

function removeMessageEventListener(nativeMessage) {
  reactNativeWebView && document.removeEventListener('message', nativeMessage, true);
  chromeWebView && window.chrome.webview.removeEventListener('message', nativeMessage, true);
  darwinWebView && window.removeEventListener('message', nativeMessage, true);
}

function App() {
  const nativeCall = (fn, ...args) => {
    if (fn === undefined) {
      throw new Error(`postAction: fn required.`)
    }

    const callbackId = ++_callbackId

    queueMicrotask(() => {
      chromeWebView && window.chrome.webview.postMessage(JSON.stringify({fn, callbackId, args}))
      reactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({fn, callbackId, args}))
      darwinWebView && window.webkit.messageHandlers.callbackHandler.postMessage(JSON.stringify({fn, callbackId, args}));
    })

    return new Promise(resolve => {
      _resolveQueue[callbackId] = resolve
    })
  }

  const sendPostMessage = () => {
    // console.log(`post message`)
    // window.ReactNativeWebView.postMessage('nativeHello()');
    nativeCall('nativeHello')
  }

  const callHelloNative = useCallback(async (...args) => {
    let r = await nativeCall('nativeHello')
    setNativeResult(`cb: ${r.callbackId}, ${r.nativeResult}`)
  })

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
        removeMessageEventListener()
        return
      }
    } else {
      // non string data indicates some other message type
      return
    }

    try {
      // we could now ignore anything that doesn't have a callbackId
      let result = JSON.parse(args[0].data)

      if (result.callbackId > -1) {
        console.log(`got callback: ${args[0].data}`)
        try  {
          _resolveQueue[result.callbackId](result)
        } catch (e2) {
          console.log(`callback resolver ${result.callbackId} failed: ${e2.message}\n${e2.stack}`)
        }
      }

    } catch (e) {
      log(`error parsing result: ${args[0].data.substring ? args[0].data.substring(0, 10) : '<>'}\n${e.message}\n${e.stack}`)
    }
    log(`native result 1: (${start})`, args[0].data)
  }, [setNativeResult])


  useEffect(() => {

    log(`window load: ${reactNativeWebView}, ${chromeWebView}, ${navigator.userAgent}`)
    // window -> message receives a lot of noise, just use document
    addMessageEventListener(nativeMessage);

    return () => {
      removeMessageEventListener(nativeMessage);
    }
  }, [nativeMessage, log])
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      <button onClick={callHelloNative}>Hello Native</button>
      <h1>{nativeResult}</h1>
      {chromeWebView && "chromeWebView ☑️"}<br/>
      {reactNativeWebView && "reactNativeWebView ☑️"}<br/>
      {darwinWebView && "darwinWebView ☑️"}<br/>
      {iosWebView && "iosWebView ☑️"}<br/>
      </header>
    </div>
  );
}

export default App;
