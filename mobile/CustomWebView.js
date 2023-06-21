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
    let webViewRef

    const nativeCall = async (message) => {
      try {
        const r = (await Rectavalo.nativeCall(message));
        // console.log(`nativeHello result: ${JSON.stringify(r)}, ${typeof r.result}`)
        if (typeof r.result === 'string') {
          console.log(`post message: ${r.result}`)
          webViewRef.postMessage(r.result)
        }
        else
          console.log(`bad Rectavalo result: ${typeof r.result} ${JSON.stringify(r)}`)
      } catch (e) {
        console.log(`nativeCall error: ${e.message}\n${e.stack}`)
      }
    }

    const onMessage = async (e) => {

      // let { fn, args } = JSON.parse(e.nativeEvent.data)
      console.log(`onMessage: ${e.nativeEvent.data}`)
      nativeCall(e.nativeEvent.data)

      // if (fn === undefined) {
      //   console.log(`unknown fn: ${e.nativeEvent.data}`)
      // }

      // // console.log(`fn: ${fn}, ${JSON.stringify(args)}`)

      // switch (fn) {
      //   case 'nativeHello':
      //     nativeHello()
      //     break
      //   case 'console.log':
      //     console.log(...args)
      //     break;
      //   default:
      //     console.log(`unknown fn: ${fn}, ${e.nativeEvent.data}`)
      // }

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
        source={{ uri: this.props.url }}
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
