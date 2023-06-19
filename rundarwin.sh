# rebuilds app from existing xcode project
cmake --build _build/darwin &&\
  ./_build/darwin/Debug/app
