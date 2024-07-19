# cycletls 代理 api 服务

用来解决`ja3`指纹识别问题，通过`cycletls`代理，可以实现`ja3`指纹的变化，从而绕过指纹识别

> cloudfare 通过 ja3 指纹识别，从而进行拦截

## 使用

先安装`nodejs`稳定版本

- [nodejs 官网](https://nodejs.org/zh-cn/)

```bash
node -v # 输出对应版本号即安装成功
```

### 开启服务

- `Win`系统: 直接双击`start.bat`即可
- `Mac`系统: 在项目根目录执行`sh start.sh`即可

> 脚本会自动安装依赖，如果安装失败，可以手动执行`npm install`安装依赖, 然后再执行`npm start`启动服务

![start](https://private-user-images.githubusercontent.com/7098719/350312980-654cbfba-0b04-4d11-a50c-3322a2074346.png)
