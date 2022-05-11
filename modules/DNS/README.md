# DNS
DNS分流插件/模块   
有问题请至Issue页面反馈  
Telegram讨论组:[🍟 整点薯条](https://t.me/GetSomeFries)  

---

- [DNS](#dns)
  - [简介](#简介)
  - [关于DNS分流](#关于dns分流)
  - [工作逻辑](#工作逻辑)
  - [注意事项](#注意事项)
  - [安装链接](#安装链接)

---
## 简介
  * 优化DNS设置

## 关于DNS分流
  * 解决使用全局DNS时，使用响应快的解析结果，而非响应准确的解析结果
    * 如: 解析淘宝域名，腾讯公共DNS优先响应
      * 你要信任腾讯对阿里的解析结果吗？
  * 解决全局DNS对路由器内网域名的解析问题
    * 如: 华硕路由器保留域名router.asus.com, 强制由系统DNS解析

## 工作逻辑
  * 路由器内网域名由系统DNS进行解析
  * 拥有自己DNS的企业/公司/法人团体/机关单位，所属域名由自己的DNS进行解析(拥有DoH DNS的，使用DoH DNS)
    * 国际: Apple, Alphabet, Cloudflare, Hurricane Electric, iQZone
    * 中国大陆: 阿里巴巴, 蚂蚁集团, 腾讯, 百度
    * 港澳台: 中华电信, TWNIC
  * 域名及CDN解析强依赖所在地运营商DNS解析结果的，由系统DNS解析
    * 京东
    * BiliBili

## 注意事项
  * 在某些策略规则中，部分在国内可以直连的海外域名，采用了直连策略，但由于在本模块中，相关域名被指定为使用其官方DoH DNS，则会造成直连解析失败，需用户注意
    * 如:dl.google.com, translate.googleapis.com等

## 安装链接
  * Loon:
    * [DNS.plugin](./DNS.plugin?raw=true "🌐 DNS for Router and Companys")
  * Quantumult X:
    * [DNS.qxrewrite](./DNS.qxrewrite?raw=true "🌐 DNS for Router and Companys")
    * 需要1.0.29 (671)及以上版本
    * Quantumult X不支持直接引用片段中包含Host和DNS内容，需要手动复制粘贴此内容至配置文件[dns]段落
  * Surge:
    * [DNS.sgmodule](./DNS.sgmodule?raw=true "🌐 DNS for Router and Companys")
