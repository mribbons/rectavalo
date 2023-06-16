import React, {Component, PropTypes, useState } from 'react';
import { WebView } from 'react-native-webview';
import Rectavalo from './Rectavalo'
// import { requireNativeComponent } from 'react-native'

/*
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onContentProcessDidTerminate={(syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.warn('Content process terminated, reloading', nativeEvent);
    this.refs.webview.reload();
  }}
/>
*/
export default class CustomWebView extends Component {
  static propTypes = WebView.propTypes;

  render() {
    // const [renderedOnce, setRenderedOnce] = useState(false);
    // // const webViewRef = useWebViewRef();
    const uri = 'http://192.168.1.77:3000'
    // const webViewRef = React.useRef<WebView>(null);
    let webViewRef

    const nativeHello = async () => {
      const r = (await Rectavalo.hello());
      // console.log(`nativeHello result: ${JSON.stringify(r)}, ${typeof r.result}`)
      if (typeof r.result === 'string') {
        console.log(`post message`)
        webViewRef.postMessage(JSON.stringify({ nativeResult: r.result }))
      }
      else
        console.log(`bad Rectavalo result: ${JSON.stringify(r)}`)
    }

    const onMessage = async (e) => {
      let { fn, args } = JSON.parse(e.nativeEvent.data)

      if (fn === undefined) {
        console.log(`unknown fn: ${e.nativeEvent.data}`)
      }

      // console.log(`fn: ${fn}, ${JSON.stringify(args)}`)

      switch (fn) {
        case 'nativeHello':
          nativeHello()
          break
        case 'console.log':
          console.log(...args)
          break;
        default:
          console.log(`unknown fn: ${fn}, ${e.nativeEvent.data}`)
      }

      // if (e.nativeEvent.data === 'nativeHello()' ) {
      //   const r = (await Rectavalo.hello());
      //   if (typeof r.result === 'string') 
      //     webViewRef.postMessage(r.result)

      //   console.log(`result 2: ${JSON.stringify(r)}`)
      // } else {
      //   console.log(`got something from js: ${e.nativeEvent.data}`)
      // }
    }

    // console.log(`requireNativeComponent: ${JSON.stringify(requireNativeComponent)}`)

    return (
      <WebView 
        // ref={webViewRef.current}
        ref={WEBVIEW_REF => (webViewRef = WEBVIEW_REF)}
        style={{ height: "100%" }}
        source={{ uri: uri }}
        startInLoadingState={true}
        onMessage={onMessage}
      />
    );
  }
}

// const RCTCustomWebView = requireNativeComponent(
//   'RCTCustomWebView',
//   CustomWebView,
//   WebView.extraNativeComponentConfig,
// );
