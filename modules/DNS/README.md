# DNS
  * DNS 分流插件/模块
  * 有问题请至 [Issue 页面](https://github.com/VirgilClyne/VirgilClyne/issues) 反馈
  * 如需及时了解更新说明，请订阅 Telegram 频道:[🍟 整点薯条](https://t.me/GetSomeFriesChannel)
  * Telegram 讨论组:[🍟 整点薯条 - 群组](https://t.me/GetSomeFries)

---

- [DNS](#dns)
  - [简介](#简介)
  - [关于 DNS 分流](#关于-dns-分流)
  - [工作逻辑](#工作逻辑)
  - [注意事项](#注意事项)
  - [安装链接](#安装链接)
  - [其他事项](#其他事项)

---
## 简介
  * 优化 DNS 设置

## 关于 DNS 分流
  * 解决使用全局 DNS 时，使用响应快的解析结果，而非响应准确的解析结果
    * 如：解析淘宝域名，腾讯公共 DNS 优先响应
      * 你要信任腾讯对阿里的解析结果吗？
  * 解决全局 DNS 对路由器内网域名的解析问题
    * 如：华硕路由器保留域名 router.asus.com, 强制由系统 DNS 解析

## 工作逻辑
  * 路由器内网域名由系统 DNS 进行解析
  * 拥有自己 DNS 的企业/公司/法人团体/机关单位，所属域名由自己的DNS进行解析(拥有DoH DNS 的，使用 DoH DNS)
    * 国际：Apple, Alphabet, Cloudflare, Hurricane Electric, iQZone
    * 中国大陆：阿里巴巴，蚂蚁集团，腾讯，百度
    * 港澳台：中华电信，TWNIC
  * 域名及 CDN 解析强依赖所在地运营商 DNS 解析结果的，由系统 DNS 解析
    * 京东
    * BiliBili

## 注意事项
  * 在某些策略规则中，部分在国内可以直连的海外域名，采用了直连策略，但由于在本模块中，相关域名被指定为使用其官方 DoH DNS，则会造成直连解析失败，需用户注意
    * 如:dl.google.com, translate.googleapis.com 等
    * **不想用** Google 的 DoH 解析或者**无法使用** Google DoH 解析的，在 config 文件内有注释行，自行更换一下备选服务器就可以了

## 安装链接
  * Loon:
    * `DNS over HTTPS`需要 [2.1.13 (331)](https://t.me/LoonNews/535) 及以上版本
    * `host map支持dns server配置为doh服务器`需要 [2.1.13 (331)](https://t.me/LoonNews/535) 及以上版本
    * [DNS.plugin](./DNS.plugin?raw=true "🌐 DNS for Router and Companys")
  * Quantumult X:
    * `特定域名使用特定DNS`需要 1.0.29 (671) 及以上版本
    * `DNS over HTTP/3`需要 1.0.30 (703) 及以上版本
    * Quantumult X 不支持直接引用片段中包含 Host 和 DNS 内容，需要手动复制粘贴此内容至配置文件 [dns] 段落
    * [DNS.qxrewrite](./DNS.qxrewrite?raw=true "🌐 DNS for Router and Companys")
  * Surge:
    * iOS版
      *  `DNS over QUIC`需要 4.20.0 (2311) 及以上版本
      *  `DNS over HTTP/3`需要 4.20.0 (2317) 及以上版本
    * macOS版
      * `DNS over QUIC`需要 4.8.0-1764 及以上版本
      * `DNS over HTTP/3`需要 4.8.0-1766 及以上版本
    * [DNS.sgmodule](./DNS.sgmodule?raw=true "🌐 DNS for Router and Companys")

## 其他事项
  * DNSPod 目前提供 DoH "专业版" 的服务 (暂时免费)，想了解一下的话可以在 DNSPod DoH 项目 [官网](https://dns.pub/) 体验专业版，并将部分腾讯域名/其他域名设置成你的私有 DoH 进行解析，也可以使用他们提供的 DNS Filter 一类的服务 (Easylist AdGuard 等)。
  * 备用 DoH 节点 便于故障切换
    * 平台 | 国内请求均速
    * IBM
      * https://dns.quad9.net/dns-query 182ms
      * https://dns9.quad9.net/dns-query 203ms
    * iQDNS
      * https://worldwide.passcloud.xyz/dns-query (全球随机) 255ms
      * https://a.passcloud.xyz/dns-query (Anycast 默认地址) 56ms
    * AdGuard
      * https://dns.adguard.com/dns-query 202ms
      * https://dns-family.adguard.com/dns-query 230ms
      * https://dns-unfiltered.adguard.com/dns-query 262ms
    * DNS.SB
      * https://doh.dns.sb/dns-query 92ms
