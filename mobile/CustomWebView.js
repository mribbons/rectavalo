import React, {Component, PropTypes, useState } from 'react';
import { WebView } from 'react-native-webview';
// import { requireNativeComponent } from 'react-native'

export default class CustomWebView extends Component {
  static propTypes = WebView.propTypes;

  render() {
    // const [renderedOnce, setRenderedOnce] = useState(false);
    // // const webViewRef = useWebViewRef();
    const uri = 'http://192.168.1.77:3000'

    // console.log(`requireNativeComponent: ${JSON.stringify(requireNativeComponent)}`)

    return (
      <WebView 
      // url='http://localhost:3000' 
      source={{ uri: uri }}
      // nativeConfig={{component: RCTCustomWebView}}
      />
    );
  }
}

// const RCTCustomWebView = requireNativeComponent(
//   'RCTCustomWebView',
//   CustomWebView,
//   WebView.extraNativeComponentConfig,
// );
