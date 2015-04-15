@echo off
set WS=F:\1-WORKSPACE

rem PARA KARMA
rem setx FIREFOX_BIN "c:\Program Files (x86)\Mozilla Firefox\firefox.exe"
rem setx CHROME_BIN "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
rem setx IE_BIN "c:\Program Files\Internet Explorer\iexplore.exe"

rem GENERALES de java
setx JDK_HOME "%WS%\Java\1.7.0.51"
setx JAVA_HOME "%%JDK_HOME%%"
setx ANT_HOME "%WS%\ant\1.9.2"
setx MAVEN_HOME "%WS%\Maven\3.2.3"
set PATH_TEMP="%%JAVA_HOME%%\bin;%%ANT_HOME%%\bin;%%MAVEN_HOME%%\bin"

rem NODE
set NODE_PATH=%WS%\NodeJs
setx NODE_PATH "%WS%\NodeJs"
rem donde esten los modulos descargados esto cambia la ruta y los pone dentro de node, y no en "application data"
call %NODE_PATH%\npm c set prefix %NODE_PATH% -g
call %NODE_PATH%\npm c set cache %NODE_PATH%\npm-cache -g
setx NODE_MODULES "%%NODE_PATH%%\node_modules"
set PATH_TEMP="%PATH_TEMP%;%%NODE_PATH%%"

setx PHANTOM_HOME %WS%\PhantomJs\2.0.0
set PATH_TEMP="%PATH_TEMP%;%%PHANTOM_HOME%%\bin"

rem ANDROID
setx ANDROID_HOME "%WS%"\android
set PATH_TEMP="%PATH_TEMP%;%%ANDROID_HOME%%\tools;%%ANDROID_HOME%%\platform-tools"

setx GRAPHICSMAGICK %WS%\GraphicsMagick\1.3.19-Q16
set PATH_TEMP="%PATH_TEMP%;%%GRAPHICSMAGICK%%"

setx GIT_HOME %WS%\Git\msysgit\cmd
set PATH_TEMP="%PATH_TEMP%;%%GIT_HOME%%"

setx PATH "%PATH_TEMP%;%WS%\Lib;"
