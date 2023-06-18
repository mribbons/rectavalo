# rm -rf _build && cmake -G Xcode cmakelists/darwin -B_build/darwin -DCMAKE_OSX_SYSROOT=$(xcrun --sdk macosx --show-sdk-path)  && cmake --build _build/darwin
rm -rf _build &&\
 cmake cmakelists/darwin -B_build/darwin -DCMAKE_OSX_SYSROOT=$(xcrun --sdk macosx --show-sdk-path) &&\
 cmake --build _build/darwin &&\
./_build/darwin/app
