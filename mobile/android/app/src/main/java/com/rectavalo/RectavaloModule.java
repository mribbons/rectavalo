package com.rectavalo;

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.module.annotations.ReactModule;

@ReactModule(name = RectavaloModule.TAG)
public final class RectavaloModule
    extends ReactContextBaseJavaModule {

  public static final String TAG = "Rectavalo";

  static {
    try {
      System.loadLibrary("rectavalo");
      Log.d(TAG, "-------- librectavalo: loaded");
    } catch (Exception e){
      Log.d(TAG, "-------- librectavalo: loaded");
    }
  }

  RectavaloModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return TAG;
  }

  /**
   *
   */
  // @ReactMethod
  // public void multiply(final int a, final int b, final Promise promise) {
  //   long result = multiply(a, b);

  //   final WritableMap response = Arguments.createMap();

  //   response.putString("result", String.valueOf(result));

  //   promise.resolve(response);
  // }

  @ReactMethod void hello(final Promise promise) {
    String result = helloNative();

    final WritableMap response = Arguments.createMap();
    response.putString("result", String.valueOf(result));
    promise.resolve(response);
  }
  
  public static native String helloNative();
}
