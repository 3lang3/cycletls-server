# cycletls 代理 api 服务

用来解决`ja3`指纹识别问题，通过`cycletls`代理，可以实现`ja3`指纹的变化，从而绕过指纹识别

> cloudfare 通过 ja3 指纹识别，从而进行拦截

## 使用

### 安装 node

先安装`nodejs`稳定版本

- [nodejs 官网](https://nodejs.org/zh-cn/)

```bash
node -v # 输出对应版本号即安装成功
```

### 一键开启服务

下载源码解压，进入目录

- win 系统双击`start.bat`即可
- mac 系统执行`sh start.sh`即可

```bash
# 成功启动后，会输出如下信息
✨ CycletlsAPIServer running on http://localhost:33333
```

如果一键开启失败，请使用下面手动开启服务👇

### 手动开启服务

下载源码解压，进入目录，执行如下命令

```bash
npm i -g tyarn
yarn
npm start
```
