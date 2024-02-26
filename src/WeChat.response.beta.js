import ENVs from "./ENV/ENV.mjs";
import URIs from "./URI/URI.mjs";

import Database from "./database/index.mjs";
import setENV from "./function/setENV.mjs";

const $ = new ENVs("🍟 GetSomeFries: WeChat v0.2.1(1) response.beta");
const URI = new URIs();

/***************** Processing *****************/
// 解构URL
const URL = URI.parse($request.url);
$.log(`⚠ URL: ${JSON.stringify(URL)}`, "");
// 获取连接参数
const METHOD = $request.method, HOST = URL.host, PATH = URL.path, PATHs = URL.paths;
$.log(`⚠ METHOD: ${METHOD}`, "");
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
					//body = M3U8.parse($response.body);
					//$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
					//$response.body = M3U8.stringify(body);
					break;
				case "text/xml":
				case "text/html":
				case "text/plist":
				case "application/xml":
				case "application/plist":
				case "application/x-plist":
					$.log(`🚧 ${$.name}`, `body: ${$response.body}`, "");
					body = new DOMParser().parseFromString($response.body, FORMAT);
					$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
					// 路径判断
					switch (PATH) {
						case "cgi-bin/mmsupport-bin/readtemplate":
							break;
						case "cgi-bin/mmspamsupport-bin/newredirectconfirmcgi":
							let script = body?.querySelector("script")?.textContent?.trim();
							$.log(`🚧 ${$.name}`, `script: ${JSON.stringify(script)}`, "");
							eval(script);
							//Function(`"use strict";return (${script})`)();
							$.log(`🚧 ${$.name}`, `cgiData: ${JSON.stringify(cgiData ?? undefined)}`, "");
							if (cgiData?.url) {
								let url = URI.parse(cgiData.url);
								switch (url?.host) {
									case "mp.weixin.qq.com":
									default:
										break;
									case "qr.alipay.com":
										//$request.url = `alipays://platformapi/startapp?appId=20000067&url=${cgiData.url}`;
										url.scheme = "alipays";
										url.host = "platformapi";
										url.path = "startapp";
										url.query = {
											"appId": 20000067,
											"url": encodeURIComponent(cgiData.url)
										};
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
										url.scheme = "taobao";
										break;
								};
								switch (url?.scheme) {
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
										$response.headers = { Location: URI.stringify(url) };
										delete $response.body;
										break;
									case "http":
									case "https":
										$response = await $.fetch(cgiData.url);
								};
							}
							break;
					};
					//$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
					//$response.body = new XMLSerializer().serializeToString(body);
					break;
				case "text/vtt":
				case "application/vtt":
					//body = VTT.parse($response.body);
					//$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
					//$response.body = VTT.stringify(body);
					break;
				case "text/json":
				case "application/json":
					//body = JSON.parse($request.body ?? "{}");
					//$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
					//$request.body = JSON.stringify(body);
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
.finally(() => {
	switch ($response) {
		default: { // 有回复数据，返回回复数据
			//const FORMAT = ($response?.headers?.["Content-Type"] ?? $response?.headers?.["content-type"])?.split(";")?.[0];
			$.log(`🎉 ${$.name}, finally`, `$response`, `FORMAT: ${FORMAT}`, "");
			//$.log(`🚧 ${$.name}, finally`, `$response: ${JSON.stringify($response)}`, "");
			if ($response?.headers?.["Content-Encoding"]) $response.headers["Content-Encoding"] = "identity";
			if ($response?.headers?.["content-encoding"]) $response.headers["content-encoding"] = "identity";
			if ($.isQuanX()) {
				switch (FORMAT) {
					case undefined: // 视为无body
						// 返回普通数据
						$.done({ status: $response.status, headers: $response.headers });
						break;
					default:
						// 返回普通数据
						$.done({ status: $response.status, headers: $response.headers, body: $response.body });
						break;
					case "application/protobuf":
					case "application/x-protobuf":
					case "application/vnd.google.protobuf":
					case "application/grpc":
					case "application/grpc+proto":
					case "application/octet-stream":
						// 返回二进制数据
						//$.log(`${$response.bodyBytes.byteLength}---${$response.bodyBytes.buffer.byteLength}`);
						$.done({ status: $response.status, headers: $response.headers, bodyBytes: $response.bodyBytes.buffer.slice($response.bodyBytes.byteOffset, $response.bodyBytes.byteLength + $response.bodyBytes.byteOffset) });
						break;
				};
			} else $.done($response);
			break;
		};
		case undefined: { // 无回复数据
			break;
		};
	};
})

/***************** Function *****************/
