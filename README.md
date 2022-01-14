# 🍟 GetSomeFries
整点薯条  
又不是不能用  
Telegram讨论组:[🍟 整点薯条](https://t.me/GetSomeFries)

---

> 目录
- [🍟 GetSomeFries](#-getsomefries)
- [🍟 Cloudflare DDNS](#-cloudflare-ddns)
  - [简介](#简介)
  - [功能列表](#功能列表)
  - [todo](#todo)
  - [安装链接](#安装链接)
    - [正式版](#正式版)
    - [🧪测试版](#测试版)
- [🍟 Disney Plus](#-disney-plus)
  - [简介](#简介-1)
  - [功能列表](#功能列表-1)
  - [todo](#todo-1)
  - [安装链接](#安装链接-1)
    - [🧪测试版](#测试版-1)
- [🍟 Netflix](#-netflix)
  - [简介](#简介-2)
  - [功能列表](#功能列表-2)
  - [todo](#todo-2)
  - [安装链接](#安装链接-2)
    - [🧪测试版](#测试版-2)


---

# 🍟 Cloudflare DDNS
## 简介
  * 🍟 Cloudflare DDNS

  * 注:
    * 暂时仅适用于`Surge for macOS`,支持BoxJs后应该都兼容
    * 凑合用

## 功能列表
  * 自定义更新特定类型和内容记录
  * 自动更新未指定IP的A记录和AAAA记录

## todo
  * 通知(有来自Cloudflare的错误和信息通知)
  * 并行处理优化(持续优化中)
  * BoxJs集成
  * 持久化储存
  * web面板



## 安装链接
### 正式版
  * Surge:
    * [Cloudflare_DDNS.sgmodule](./sgmodule/Cloudflare_DDNS.sgmodule?raw=true "🍟 Cloudflare DDNS")
      * 不能直接用，需要复制此模块，编辑argument内容为自己要更新的信息
### 🧪测试版
  * Surge:
    * [Cloudflare_DDNS.beta.sgmodule](./sgmodule/Cloudflare_DDNS.beta.sgmodule?raw=true "🍟 Cloudflare DDNS")
      * 不能直接用，需要复制此模块，编辑argument内容为自己要更新的信息

---

# 🍟 Disney Plus
## 简介
  * 无视地区线路限制，强制加载特定地区内容

  * 注:
    * 凑合用,翻车别找我
    * 至少相关线路属于任意可用地区，不会被直接拒绝连接

## 功能列表
  * 修改部分地区检测
  * 显示指定地区内容
  * 修改内容可用状态

## todo
  * 我咋知道

## 安装链接
### 🧪测试版
  * Surge:
    * [Disney_Plus.beta.sgmodule](./sgmodule/Disney_Plus.beta.sgmodule?raw=true "🍟 Redirect Disney Plus Region to 🇸🇬SG")
      * 此测试模块强制指定为新加坡区

---

# 🍟 Netflix
## 简介
  * 开启Netflix隐藏功能

  * 注:
    * 凑合用,翻车别找我

## 功能列表
  * 强制启用VTT字幕(似乎还要指定VTT字幕服务器)
  * 强制启用AirPlay(需要正经支持Airplay视频投屏的设备如`Apple TV`,`Sony``LG``三星`电视，国产破解Airplay的兼容方案就别想了)
  * 强制使用Fairplay DRM
  * 我咋知道

## todo
  * 我咋知道

## 安装链接
### 🧪测试版
  * Surge:
    * [Netflix.beta.sgmodule](./sgmodule/Netflix.beta.sgmodule?raw=true "🍟 Unlock Netflix Hidden Feature")

---