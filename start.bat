@echo off
SETLOCAL

REM 检查Node.js是否已安装
node -v >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo 未安装Nodejs, 请先安装 -> https://nodejs.org/
    pause
    EXIT /B 1
)

REM 检查tyarn是否已安装
tyarn -v >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo 安装tyarn...
    npm i -g tyarn
)

REM 安装根目录下的依赖
echo 安装项目依赖...
tyarn

REM 启动服务
npm start
ENDLOCAL
EXIT /B 0
