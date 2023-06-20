/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 * @jsdoc
 */

'use strict';

import { NativeModules } from 'react-native';

const RectavaloModule = NativeModules.Rectavalo;

if (!RectavaloModule) {
  throw new Error(`[Rectavalo]: NativeModule: Rectavalo is null.

To fix this issue try these steps:

  • Rebuild and restart the app.

  • Run the packager with \`--clearCache\` flag.

  • Run \`pod install\` in the \`ios\` directory and then rebuild and re-run the app.
`);
}

const Rectavalo = {
  /**
   */
  hello: async function(): Promise<String> {
    return await RectavaloModule.hello("");
  },

  /**
   * nativeCall
   * @param messageBody Receives a json message body for a function to run, eg {fn:'native_call',args:[]}
   * @returns 
   */
  nativeCall: async function(messageBody: string): Promise<String> {
    return await RectavaloModule.nativeCall(messageBody);
  },
};

export default Rectavalo;
