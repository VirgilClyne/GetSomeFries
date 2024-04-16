import _ from './ENV/Lodash.mjs'
import $Storage from './ENV/$Storage.mjs'
import ENV from "./ENV/ENV.mjs";

import Database from "./database/index.mjs";
import setENV from "./function/setENV.mjs";

const $ = new ENV("🍟 GetSomeFries: WeChat v0.3.0(1) response");

/***************** Processing *****************/
// 解构URL
const url = new URL($request.url);
$.log(`⚠ url: ${url.toJSON()}`, "");
// 获取连接参数
const METHOD = $request.method, HOST = url.hostname, PATH = url.pathname;
$.log(`⚠ METHOD: ${METHOD}, HOST: ${HOST}, PATH: ${PATH}` , "");
// 解析格式
const FORMAT = ($response.headers?.["Content-Type"] ?? $response.headers?.["content-type"] ?? $request.headers?.Accept ?? $request.headers?.accept)?.split(";")?.[0];
$.log(`⚠ FORMAT: ${FORMAT}`, "");
!(async () => {
	const { Settings, Caches, Configs } = setENV($, "GetSomeFries", "WeChat", Database);
	$.log(`⚠ ${$.name}`, `Settings.Switch: ${Settings?.Switch}`, "");
	switch (Settings.Switch) {
		case true:
		default:
			// 创建空数据
			let body = {};
			// 格式判断
			switch (FORMAT) {
				case undefined: // 视为无body
					break;
				case "application/x-www-form-urlencoded":
				case "text/plain":
				default:
					break;
				case "application/x-mpegURL":
				case "application/x-mpegurl":
				case "application/vnd.apple.mpegurl":
				case "audio/mpegurl":
					break;
				case "text/xml":
				case "text/html":
				case "text/plist":
				case "application/xml":
				case "application/plist":
				case "application/x-plist":
					body = new DOMParser().parseFromString($response.body, FORMAT);
					// 路径判断
					switch (PATH) {
						case "cgi-bin/mmsupport-bin/readtemplate":
							break;
						case "cgi-bin/mmspamsupport-bin/newredirectconfirmcgi":
							let script = body?.querySelector("script")?.textContent?.trim();
							eval(script);
							if (cgiData?.url) {
								let newURL = new URL(cgiData.url);
								switch (newURL?.hostname) {
									case "mp.weixin.qq.com":
									default:
										break;
									case "qr.alipay.com":
										url.protocol = "alipays";
										url.hostname = "platformapi";
										url.pathname = "startapp";
										url.searchParams.set("appId", 20000067);
										url.searchParams.set("url", cgiData.url);
										break;
									case "www.taobao.com":
									case "taobao.com":
									case "www.tmall.com":
									case "tmall.com":
									case "c.tb.cn":
									case "m.tb.cn":
									case "s.tb.cn":
									case "t.tb.cn":
									case "tb.cn":
										url.protocol = "taobao";
										break;
								};
								switch (newURL.protocol) {
									case "alipays":
									case "taobao":
									default:
										switch ($.platform()) {
											case "Quantumult X":
												$response.status = "HTTP/1.1 302 Temporary Redirect";
												break;
											case "Surge":
											case "Loon":
											case "Stash":
											case "Shadowrocket":
											default:
												$response.status = 302;
												break;
										};
										$response.headers = { Location: newURL.toString() };
										delete $response.body;
										break;
									case "http":
									case "https":
										$response = await $.fetch(cgiData.url);
								};
							}
							break;
					};
					break;
				case "text/vtt":
				case "application/vtt":
					break;
				case "text/json":
				case "application/json":
					break;
				case "application/protobuf":
				case "application/x-protobuf":
				case "application/vnd.google.protobuf":
				case "application/grpc":
				case "application/grpc+proto":
				case "application/octet-stream":
					break;
			};
			break;
		case false:
			break;
	};
})()
	.catch((e) => $.logErr(e))
	.finally(() => $.done($response))
