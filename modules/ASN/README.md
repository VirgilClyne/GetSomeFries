# ASN
  * ASN 分流插件/模块
  * 有问题请至 [Issue 页面](https://github.com/VirgilClyne/VirgilClyne/issues) 反馈
  * 如需及时了解更新说明，请订阅 Telegram 频道:[🍟 整点薯条](https://t.me/GetSomeFriesChannel)
  * Telegram 讨论组:[🍟 整点薯条 - 群组](https://t.me/GetSomeFries)

---

- [ASN](#asn)
  - [简介](#简介)
  - [关于 ASN 分流](#关于-asn-分流)
  - [为什么使用 ASN 分流](#为什么使用-asn-分流)
  - [安装链接](#安装链接)

---
## 简介
  * 优化 ASN 设置

## 关于 ASN 分流
  * 匹配中国大陆ASN的域名与IP全部直连
    * 代替GeoIP方案，提供更准确的匹配结果
    * 中国大陆ASN列表详见:
      * https://bgp.he.net/country/CN
      * https://dnslytics.com/bgp/cn

## 为什么使用 ASN 分流
  * 以下引用自[china-operator-ip](https://github.com/gaoyifan/china-operator-ip/)
  ```
  在国内，BGP/ASN数据分析的商业服务只有一个ipip.net，是目前运营商IP库准确度最高的服务商，我认为没有之一。

  随着互联网规模的增加，为了处理大批量的路由数据，边界网关协议（即BGP，下同）应运而生，是互联网的基础协议之一。为了保证了全球网络路由的可达性，但凡需要在互联网中注册一个IP（段），都需要借助BGP协议对外广播，这样互联网中的其他自治域才能学习到这段地址的路由信息，其它主机才能成功访问这个IP（段）。因此可以说，BGP数据是最适合分析运营商IP地址的数据来源之一。

  但是，目前国内绝大多数IP库都由WHOIS数据库作为基础数据来源。WHOIS数据仅表示某个IP被哪个机构注册，但无从知晓该IP被用在何处，这就导致许多非运营商自己注册的IP地址无法被正确分类。ipip.net是最早开始做BGP/ASN数据分析的公司之一，数据准确性甩其它库几条街。但很可惜是，ipip.net作为商业公司，绝大多数高质量的IP数据都是收费的，且价格不菲。
  ```

## 安装链接
  * Surge:
    * 中国大陆 ASN
      * [ASN.China.sgmodule](./ASN.China.sgmodule?raw=true "🌐 ASN for Mainland China")
      * [ASN.China.list](./ASN.China.list?raw=true "🌐 ASN for Mainland China")
        * 在配置文件中代替`GEOIP,CN,DIRECT`，引用此规则组，并设置策略为`直连`。
        * ```
          RULE-SET,https://raw.githubusercontent.com/VirgilClyne/VirgilClyne/main/modules/ASN/ASN.China.list,DIRECT
          ```
    * Telegram ASN
      * [ASN.Telegram.list](./ASN.Telegram.list?raw=true "🌐 ASN for Telegram Messenger Inc")

