import logo from './logo.svg';
import './App.css';
import { useCallback, useEffect, useState } from 'react';
import { 
  chromeWebView, 
  reactNativeWebView, 
  darwinWebView, 
  iosWebView,
  addMessageEventListener,
  removeMessageEventListener,
  nativeCall,
  nativeMessage
}
from './RectavaloWeb'

function App() {

  const callHelloNative = useCallback(async (...args) => {
    let r = await nativeCall('nativeHello')
    setNativeResult(`cb: ${r.callbackId}, ${r.nativeResult}`)
  })

  const [nativeResult, setNativeResult] = useState("")  

  const log = useCallback( (...args) => {
    console.log(...args)
    nativeCall('console.log', ...args)
  })

  useEffect(() => {

    log(`window load: ${reactNativeWebView}, ${chromeWebView}, ${navigator.userAgent}`)
    addMessageEventListener(nativeMessage)

    return () => {
      removeMessageEventListener(nativeMessage)
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
  )
}

export default App
