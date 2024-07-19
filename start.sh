#!/bin/bash

# 检查Node.js是否已安装
if ! command -v node &> /dev/null
then
    echo "未安装Node.js。请先安装Node.js。https://nodejs.org/"
    exit 1
fi

# 检查tyarn是否已安装
if ! command -v tyarn &> /dev/null
then
    echo "安装tyarn..."
    npm i -g tyarn
fi

# 安装根目录下的依赖
echo "安装项目依赖..."
tyarn

# 启动服务
npm start