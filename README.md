# 🍟 GetSomeFries
  * 实验性项目/插件
  * **Powered by [Chavy](https://github.com/chavyleung)‘s [Env.js](https://github.com/chavyleung/scripts/blob/master/Env.js) and [BoxJs](https://chavyleung.gitbook.io/boxjs/)**
  * 有问题请至[Issue页面](https://github.com/VirgilClyne/GetSomeFries/issues)反馈
  * 如需及时了解更新说明，请订阅Telegram频道:[🍟 整点薯条](https://t.me/GetSomeFriesChannel)
  * Telegram讨论组:[🍟 整点薯条 - 群组](https://t.me/GetSomeFries)
```
⚠️注意：Cloudflare相关内容已移至独立项目[☁️ Cloudflare](https://github.com/VirgilClyne/Cloudflare)
```
---

> 目录
- [🍟 GetSomeFries](#-getsomefries)
- [🍟 Disney Plus](#-disney-plus)
  - [简介](#简介)
  - [功能列表](#功能列表)
  - [使用方式](#使用方式)
    - [配合`BoxJs`及订阅使用](#配合boxjs及订阅使用)
    - [配合Surge模块的`argument`字段使用:](#配合surge模块的argument字段使用)
    - [直接安装使用](#直接安装使用)
  - [安装链接](#安装链接)
    - [正式版](#正式版)
    - [🧪测试版](#测试版)
- [🍟 Netflix](#-netflix)
  - [简介](#简介-1)
  - [功能列表](#功能列表-1)
  - [todo](#todo)
  - [使用方式](#使用方式-1)
  - [安装链接](#安装链接-1)
    - [🧪试验版，随时可能修改/删除](#试验版随时可能修改删除)
- [鸣谢](#鸣谢)

---

# 🍟 Disney Plus
## 简介
  * 无视支付地区与网络线路限制，强制加载指定地区与分级内容

  * 注:
    * 凑合用,翻车别找我
    * 至少相关线路属于任意可用地区，不会被直接拒绝连接

## 功能列表
  * BoxJs集成
  * 持久化储存
  * 修改地区检测
  * 指定内容地区
  * 指定分级标准
  * 显示地区限定分区
  * 修改内容可用状态

## 使用方式
### 配合`BoxJs`及订阅使用
  * 安装`BoxJs`插件:
    * Loon: [boxjs.rewrite.loon.plugin](https://github.com/chavyleung/scripts/raw/master/box/rewrite/boxjs.rewrite.loon.plugin "BoxJs")
    * Quantumult X: [boxjs.rewrite.quanx.conf](https://github.com/chavyleung/scripts/raw/master/box/rewrite/boxjs.rewrite.quanx.conf "BoxJs")
    * Surge: [boxjs.rewrite.surge.sgmodule](https://github.com/chavyleung/scripts/raw/master/box/rewrite/boxjs.rewrite.surge.sgmodule "BoxJs")
  * 导入本项目订阅: [fries.boxjs.json](./box/fries.boxjs.json?raw=true "整点薯条")
  * 在`应用`-`整点薯条`-`Disney Plus`中填写您的设置信息
### 配合Surge模块的`argument`字段使用:
  * 使用[@baranwang](https://github.com/baranwang)的[Surge模块Argument代理](https://sgmodule-argument-proxy.vercel.app/)直接生成带配置的专属模块[使用说明](https://github.com/baranwang/sgmodule-argument-proxy#readme)
  * 格式如下:
      ```
      argument=region=重定向地区代码&maturityRating=分级标准&location=地区检测代码&flows=覆盖层
      ```
### 直接安装使用
  * 直接安装使用，默认为新加坡区，网络为新加坡kirino llc，分级为MDA的R21，显示STAR分区

## 安装链接
### 正式版
  * Loon:
    * [Disney_Plus.plugin](./plugins/Disney_Plus.plugin?raw=true "🍟 Disney Plus")
  * Quantumult X:
    * [Disney_Plus.qxrewrite](./qxrewrite/Disney_Plus.qxrewrite?raw=true "🍟 Disney Plus")
  * Surge:
    * [Disney_Plus.sgmodule](./sgmodule/Disney_Plus.sgmodule?raw=true "🍟 Disney Plus")
### 🧪测试版
  * Surge:
    * [Disney_Plus.beta.sgmodule](./sgmodule/Disney_Plus.beta.sgmodule?raw=true "🍟 Disney Plus")
      * 此测试模块强制指定为新加坡区

---

# 🍟 Netflix
## 简介
  * 自定义部分Netflix功能

  * 注:
    * 试验性质
    * 翻车别找我
    * 部分设置可能改了也没效果

## 功能列表
  * 强制解除地区限制(可能改了也没用)
  * 启用VTT字幕(对于Web和Android等平台,还要指定VTT字幕服务器)
  * 启用AirPlay
    * 需要正经支持Airplay视频投屏的设备如`Apple TV`,`Sony`、`LG`、`三星`电视，国产破解Airplay的兼容方案就别想了
  * 允许Widevine DRM播放
  * 其他设置内容详见[iOS平台全部设置项列表](https://github.com/VirgilClyne/GetSomeFries/wiki/iOS平台全部设置项列表)
  * 修改当前CDN所属地区
  * 修改当前IP地址(可能改了也没用)
  * 修改当前IP地址是否已有用户(可能改了也没用，关系到多人共用IP封非自制内容的问题)

## todo
  * 我咋知道

## 使用方式
* 配合`BoxJs`及订阅使用
  * 安装`BoxJs`插件:
    * Loon: [boxjs.rewrite.loon.plugin](https://github.com/chavyleung/scripts/raw/master/box/rewrite/boxjs.rewrite.loon.plugin "BoxJs")
    * Quantumult X: [boxjs.rewrite.quanx.conf](https://github.com/chavyleung/scripts/raw/master/box/rewrite/boxjs.rewrite.quanx.conf "BoxJs")
    * Surge: [boxjs.rewrite.surge.sgmodule](https://github.com/chavyleung/scripts/raw/master/box/rewrite/boxjs.rewrite.surge.sgmodule "BoxJs")
  * 导入本项目订阅: [fries.boxjs.json](./box/fries.boxjs.json?raw=true "整点薯条")
  * 在`应用`-`整点薯条`-`Netflix`中填写需要修改Netflix的信息
  * `配置：功能内容`段落示例如下
    ```
    hideAccountPaymentEnabledOnBuild=50.0.0
    isAccountProfileLinkEnabled=true
    allowWidevinePlayback=true
    airPlayDisabledEnabledOnBuild=50.0.0
    preferRichWebVTTOverImageBasedSubtitle=true
    requestRichWebVTTAsExperimental=true
    previewsWebVttStyleUrl=https:\/\/webvtt-s.nflxext.com\/35\/PreviewsWebVTTStyle.plist
    iPhoneWebVttStyleUrl=https:\/\/webvtt-s.nflxext.com\/35\/iPhoneWebVTTStyle.plist
    iPadWebVttStyleUrl=https:\/\/webvtt-s.nflxext.com\/35\/iPadWebVTTStyle.plist
    ```
* 配合Surge模块的`argument`字段使用:
  * 使用[@baranwang](https://github.com/baranwang)的[Surge模块Argument代理](https://sgmodule-argument-proxy.vercel.app/)直接生成带配置的专属模块[使用说明](https://github.com/baranwang/sgmodule-argument-proxy#readme)
  * 暂不支持多记录，推荐使用BoxJs设置
  * 格式如下:
      ```
      argument=懒得写
      ```
      例如:
      ```
      argument=geolocation_policy=ALLOW&geolocation_country=SG&onfig_allowWidevinePlayback=true&config_airPlayDisabledEnabledOnBuild=50.0.0&config_preferRichWebVTTOverImageBasedSubtitle=true&config_reuseAVPlayerEnabledOnBuild=0&config_nfplayerReduxEnabledOnBuild=50.0.0
      ```

## 安装链接
### 🧪试验版，随时可能修改/删除
  * Loon:
    * [Netflix.beta.plugin](./plugins/Netflix.beta.plugin?raw=true "🍟 Netflix")
  * Quantumult X:
    * [Netflix.beta.qxrewrite](./qxrewrite/Netflix.beta.qxrewrite?raw=true "🍟 Netflix")
  * Surge:
    * [Netflix.beta.sgmodule](./sgmodule/Netflix.beta.sgmodule?raw=true "🍟 Netflix")

---
# 鸣谢
* 排名不分先后
  * [@chavyleung](https://github.com/chavyleung)
  * [@NobyDa](https://github.com/NobyDa)
  * [@zZPiglet](https://github.com/zZPiglet)
  * [@yichahucha](https://github.com/yichahucha)
  * [@Peng-YM](https://github.com/Peng-YM)
  * [@app2smile](https://github.com/app2smile)
  * [@MuTu](https://github.com/githubdulong)
  * [@fengchang](https://github.com/fengchang)
  * [@Loon0x00](https://github.com/Loon0x00)
  * [@Tartarus2014](https://github.com/Tartarus2014)
  * [@Hackl0us](https://github.com/Hackl0us)
  * [@Koolson](https://github.com/Koolson)
  * [@LucaLin](https://github.com/LucaLin233)
  * [@Shawn](https://github.com/KOP-XIAO)

