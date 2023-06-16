import logo from './logo.svg';
import './App.css';
import { useCallback, useMemo, useEffect, useState } from 'react';


// window.addEventListener('message',function(event){
//   document.getElementById('test').innerHTML = event.data;
//   console.log("Message received from RN: ",event.data);
// },false);
// document.addEventListener('message',function(event){
//   document.getElementById('test').innerHTML = event.data;
//   console.log("Message received from RN: ",event.data);
// },false);

function App() {
  const nativeCall = (fn, ...args) => {
    if (fn === undefined) {
      throw new Error(`postAction: no at least one action required.`)
    }

    window.ReactNativeWebView.postMessage(JSON.stringify({fn, args}))
  }

  const sendPostMessage = () => {
    // console.log(`post message`)
    // window.ReactNativeWebView.postMessage('nativeHello()');
    nativeCall('nativeHello')
  }

  const [nativeResult, setNativeResult] = useState("")
  const [loadOnce, setLoadOnce] = useState(false)

  

  const log = useCallback( (...args) => {
    // nativeCall('console.log', ...(Array(args).map(a => JSON.stringify(a)) ))
    console.log(...args)
    nativeCall('console.log', ...args)
  }, [])


  const nativeMessage = useCallback((...args) => {
    log(`message: ${JSON.stringify(args[0], Object.keys(MessageEvent.prototype))}`)
    if (!args[0])
      return

    if (typeof args[0].data === 'string') {
      if (args[0].data.startsWith('webpackHotUpdate')) {
        log(`reload`)
        // window.location.reload()
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
    log(`native result 1: `, args[0].data)
  }, [setNativeResult])


  useEffect(function setup() {
    // window -> message receives a lot of noise, just use document
    document.addEventListener('message', nativeMessage, true)

    return function clean () {
      document.removeEventListener('message', nativeMessage, true)
    }
  }, [nativeMessage, log])

  // document.addEventListener('message', function (e) { console.log('document event', e) }, true)

  
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
