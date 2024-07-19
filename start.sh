#!/bin/bash

# 检查tyarn是否已安装
if ! command -v tyarn &> /dev/null
then
    echo "安装tyarn..."
    npm i -g tyarn
fi

# 安装根目录下的依赖
echo "安装项目依赖..."
tyarn install

# 启动服务
npm start