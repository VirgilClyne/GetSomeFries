# 🍟 GetSomeFries
整点薯条  
又不是不能用  
Telegram讨论组:[🍟 整点薯条](https://t.me/GetSomeFries)

---

> 目录
- [🍟 GetSomeFries](#-getsomefries)
- [🍟 Cloudflare](#-cloudflare)
  - [简介](#简介)
  - [功能列表](#功能列表)
  - [todo](#todo)
  - [使用方式](#使用方式)
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
- [鸣谢](#鸣谢)


---

# 🍟 Cloudflare
## 简介
  * Cloudflare DNS记录管理及自动更新DDNS

  * 注:
    * 本插件使用[my-ip.io](https://www.my-ip.io/api)的api进行外部IP探测，请注意相关域名`api4.my-ip.io`和`api6.my-ip.io`的分流，以免获取到的是节点出口IP

## 功能列表
  * 自定义更新特定类型和内容记录
  * 自动更新未指定IP的A记录和AAAA记录
  * 通知(有，但不是完全有，有来自Cloudflare的错误和信息通知)
  * BoxJs集成
  * 持久化储存(有，但不是完全有，没有做反写功能)

## todo
  * 并行处理优化(阶段性完工，除非有更好的方法)
  * web面板(暂不开工)

## 使用方式
* 配合`BoxJs`及订阅使用
  * 安装`BoxJs`插件:
    * Loon: [boxjs.rewrite.loon.plugin](https://github.com/chavyleung/scripts/raw/master/box/rewrite/boxjs.rewrite.loon.plugin "BoxJs")
    * Quantumult X: [boxjs.rewrite.quanx.conf](https://github.com/chavyleung/scripts/raw/master/box/rewrite/boxjs.rewrite.quanx.conf "BoxJs")
    * Surge: [boxjs.rewrite.surge.sgmodule](https://github.com/chavyleung/scripts/raw/master/box/rewrite/boxjs.rewrite.surge.sgmodule "BoxJs")
  * 导入本项目订阅: [fries.boxjs.json](./box/fries.boxjs.json?raw=true "整点薯条")
  * 在`应用`-`整点薯条`-`Cloudflare`中填写您的Cloudflare DNS信息
    * 验证方式: 
      * API 令牌: 在[我的个人资料的'API 令牌'页面]([./box/fries.boxjs.json?raw=true](https://dash.cloudflare.com/profile/api-tokens) "API 令牌 | Cloudflare")的`API 令牌`生成，注意生成的令牌要有需管理区域的`DNS编辑`权限(推荐使用预设的`编辑区域 DNS`模版)
      * API 密钥: 在[我的个人资料的'API 令牌'页面]([./box/fries.boxjs.json?raw=true](https://dash.cloudflare.com/profile/api-tokens) "API 令牌 | Cloudflare")的`API 密钥`的`Global API Key`获取，注意此密钥默认拥有全部权限，不建议使用此方式
    * 验证内容: 即`API令牌`内容或`API 密钥`内容，注意`API 密钥`需分两行填写，第一行密钥，第二行邮箱
    * 区域ID: 在`区域`页面右下角的`API`小节的`区域 ID`，单击复制
    * 区域名称: 即域名
    * DNS记录: 格式范例如下，一行一个记录，A记录和AAAA记录如果不带内容则自动获取外部IP，如果带内容则以内容为准
      ```
      id=记录ID&type=类型&name=名称&content=内容&ttl=TTL&priority=优先级&proxied=是否代理
      id=12345ABCDE&type=MX&name=mail&content=127.0.0.1&ttl=1&priority=10&proxied=true
      type=A&name=www&proxied=false
      type=AAAA&name=ipv6&proxied=false
      ```
* 配合Surge模块的`argument`字段使用:
  * 暂不支持多记录，推荐使用BoxJs设置
  * 格式如下:
      ```
      argument=Token=令牌&zone_id=区域ID&zone_name=区域名称&dns_records_id=记录ID&dns_records_name=记录名称&dns_records_type=记录类型&dns_records_ttl=TTL&dns_records_priority=记录优先级&dns_records_proxied=是否代理
      ```
      例如:
      ```
      argument=Token=1234567ABCDEFG&zone_id=1234567ABCDEFG&zone_name=exapmle.com&dns_records_id=1234567ABCDEFG&dns_records_name=www&dns_records_proxied=false
      ```
      或
      ```
      argument=Token=1234567ABCDEFG&zone_id=1234567ABCDEFG&dns_records_name=www&dns_records_type=A&dns_records_proxied=false
      ```

## 安装链接
### 正式版
  * Loon:
    * [Cloudflare.plugin](./plugins/Cloudflare.plugin?raw=true "🍟 Cloudflare")
  * Quantumult X:
    * 下载脚本[Cloudflare.js](./js/Cloudflare.js?raw=true "🍟 Cloudflare")并保存至`Quantumult X`的`Scripts`文件夹下
      * 修改配置文件，在`[task_local]`段添加如下内容：
      ```
      event-network Cloudflare.js
      */10 * * * * Cloudflare.js
      ```
  * Surge:
    * [Cloudflare.sgmodule](./sgmodule/Cloudflare.sgmodule?raw=true "🍟 Cloudflare")
### 🧪测试版
  * Surge:
    * [Cloudflare.beta.sgmodule](./sgmodule/Cloudflare.beta.sgmodule?raw=true "🍟 Cloudflare")

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

# 鸣谢
  * 排名不分先后  
[@chavyleung](https://github.com/chavyleung)  
[@NobyDa](https://github.com/NobyDa)  
[@zZPiglet](https://github.com/zZPiglet)  
[@yichahucha](https://github.com/yichahucha)  
[@Peng-YM](https://github.com/Peng-YM)  
[@app2smile](https://github.com/app2smile)  
[@Loon0x00](https://github.com/Loon0x00)  
[@Tartarus2014](https://github.com/Tartarus2014)  
[@Hackl0us](https://github.com/Hackl0us)  
