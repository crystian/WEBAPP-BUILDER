@echo off
set WS=F:\1-WORKSPACE
set SVN_CLIENT=C:\Program Files\TortoiseSVN

rem PARA KARMA
setx FIREFOX_BIN "c:\Program Files (x86)\Mozilla Firefox\firefox.exe"
setx CHROME_BIN "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
setx IE_BIN "c:\Program Files\Internet Explorer\iexplore.exe"

rem GENERALES de java
setx JDK_HOME "%WS%\Java\1.7.0.51"
setx JAVA_HOME "%%JDK_HOME%%"
setx ANT_HOME "%WS%\ant\1.9.2"
setx MAVEN_HOME "%WS%\Maven\3.2.3"
set PATH_TEMP="%%JAVA_HOME%%\bin;%%ANT_HOME%%\bin;%%MAVEN_HOME%%\bin"

rem NODE
set NODE_PATH=%WS%\NodeJs
setx NODE_PATH "%WS%\NodeJs"
setx NODE_MODULES "%%NODE_PATH%%\node_modules"
call %NODE_PATH%\npm c set prefix %NODE_PATH% -g
call %NODE_PATH%\npm c set cache %NODE_PATH%\npm-cache -g
set PATH_TEMP="%PATH_TEMP%;%%NODE_PATH%%"

setx PHANTOM_HOME %WS%\PhantomJs\2.0.0
set PATH_TEMP="%PATH_TEMP%;%%PHANTOM_HOME%%\bin"

rem ANDROID
setx ANDROID_HOME "%WS%"\android
set PATH_TEMP="%PATH_TEMP%;%%ANDROID_HOME%%\tools;%%ANDROID_HOME%%\platform-tools"

rem RUBY
setx RUBY_PATH %WS%\Ruby\2.0.0p451
set PATH_TEMP="%PATH_TEMP%;%%RUBY_PATH%%\bin"

rem OTHERS:
rem setx WEBIDE_JDK "%JDK_HOME%"

setx GRAPHICSMAGICK %WS%\GraphicsMagick\1.3.19-Q16
set PATH_TEMP="%PATH_TEMP%;%%GRAPHICSMAGICK%%"

setx GIT_HOME %WS%\Git\msysgit\cmd
set PATH_TEMP="%PATH_TEMP%;%%GIT_HOME%%"

rem set PHP_HOME=f:\1-WORKSPACE\Servers\WAMP\bin\php\php5.4.12
rem setx PHP_HOME "%PHP_HOME%"

setx PATH "%PATH_TEMP%;%WS%\Lib;%SVN_CLIENT%\bin;"

rem antes usaba esto:
rem just the user variable
rem for /F "tokens=2* delims= " %%f IN ('reg query "HKCU\Environment" /v Path ^| findstr /i path') do set OLD_SYSTEM_PATH=%%g
rem setx.exe PATH "%OLD_SYSTEM_PATH%;%%NODE_PATH%%;%%NODE_MODULES%%;"

