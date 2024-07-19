#!/bin/bash

# 检查tyarn是否已安装
if ! command -v pnpm &> /dev/null
then
    echo "安装pnpm..."
    npm i -g pnpm
fi

# 安装根目录下的依赖
echo "安装项目依赖..."
pnpm install

# 启动服务
npm start