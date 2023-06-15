// import com.reactnativecommunity.webview.*;
// import com.facebook.react.ThemedReactContext;

// @ReactModule(name = CustomWebViewManager.REACT_CLASS)
// public class CustomWebViewManager extends RNCWebViewManager {
//   /* This name must match what we're referring to in JS */
//   protected static final String REACT_CLASS = "RCTCustomWebView";

//   protected static class CustomWebViewClient extends RNCWebViewClient { }

//   protected static class CustomWebView extends RNCWebView {
//     public CustomWebView(ThemedReactContext reactContext) {
//       super(reactContext);
//     }
//   }

//   @Override
//   protected RNCWebView createRNCWebViewInstance(ThemedReactContext reactContext) {
//     return new CustomWebView(reactContext);
//   }

//   @Override
//   public String getName() {
//     return REACT_CLASS;
//   }

//   @Override
//   protected void addEventEmitters(ThemedReactContext reactContext, WebView view) {
//     view.setWebViewClient(new CustomWebViewClient());
//   }
// }
