@REM set platform=x64
@REM msbuild Win32WebView.sln /p:Configuration=Debug

copy mobile\.env.js .\win32\
start win32\Win32WebView.sln
