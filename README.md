# Rectavalo - Cross Platform App Template

Build your apps in React
Run your react code in webviews

Mobile is implemented in React Native 
Windows, MacOS and Linux are implemented in simple C++ applications.
Note that React Native itself does support Windows and MacOS

## Todo

### General
 - [x] json parser
 - [ ] websocket server
 - [ ] move json, websocket to separate libs
 - [ ] shared lib load
 - [x] No hardcoded dev URL
 - [ ] Support static/bundled html
 - [ ] json*.h - change sprintf to snprintf
 - [ ] memory leaks in native message handler
 - [ ] Error reporting - toast on mobile
 - [ ] Error reporting - dialog on desktop

### React
 - [x] clean up 'CustomWebView' class

### Darwin
 - [ ] bundle identifier
 - [ ] custom lib imports: loop through entries in folder
 - [ ] copy .env.js to runtime folder
 - [ ] .env-[scheme].js support
 - [ ] window resize support / start maximised

### iOS
 - [ ] custom lib imports
 - [ ] cmakelists for native layer

### Android
 - [ ] custom lib imports
 - [x] figure out file listing issue, permission denied on .

### Windows
 - [ ] cmakelists.txt
 - [ ] cmakelists.txt: figure out how to use nuget packages
 - [ ] custom lib imports
 - [ ] copy .env.js to runtime folder
 - [ ] .env-[configuration].js support

### Linux
 - [x] basic webview app
 - [x] cmakelists.txt
 - [ ] custom lib imports
 - [x] copy .env.js to runtime folder
 - [x] .env-[configuration].js support

### Desktop general
- [ ] Window state (maximized etc)
- [ ] window size as %
