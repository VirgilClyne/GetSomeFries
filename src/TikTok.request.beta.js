import _ from './ENV/Lodash.mjs'
import $Storage from './ENV/$Storage.mjs'
import ENV from "./ENV/ENV.mjs";

import Database from "./database/index.mjs";
import setENV from "./function/setENV.mjs";

const $ = new ENV("🍟 GetSomeFries: ♪ TikTok v0.2.0(5) request.beta");

// 构造回复数据
let $response = undefined;

/***************** Processing *****************/
// 解构URL
const url = new URL($request.url);
$.log(`⚠ url: ${url.toJSON()}`, "");
// 获取连接参数
const METHOD = $request.method, HOST = url.hostname, PATH = url.pathname;
$.log(`⚠ METHOD: ${METHOD}, HOST: ${HOST}, PATH: ${PATH}` , "");
// 解析格式
const FORMAT = ($request.headers?.["Content-Type"] ?? $request.headers?.["content-type"])?.split(";")?.[0];
$.log(`⚠ FORMAT: ${FORMAT}`, "");
(async () => {
	const { Settings, Caches, Configs } = setENV("GetSomeFries", "TikTok", Database);
	$.log(`⚠ Settings.Switch: ${Settings?.Switch}`, "");
	switch (Settings.Switch) {
		case true:
		default:
			// 创建空数据
			let body = {};
			// 方法判断
			switch (METHOD) {
				case "POST":
				case "PUT":
				case "PATCH":
				case "DELETE":
					// 格式判断
					switch (FORMAT) {
						case undefined: // 视为无body
							break;
						case "application/x-www-form-urlencoded":
						case "text/plain":
						default:
							//$.log(`🚧 body: ${JSON.stringify(body)}`, "");
							break;
						case "application/x-mpegURL":
						case "application/x-mpegurl":
						case "application/vnd.apple.mpegurl":
						case "audio/mpegurl":
							//body = M3U8.parse($request.body);
							//$.log(`🚧 body: ${JSON.stringify(body)}`, "");
							//$request.body = M3U8.stringify(body);
							break;
						case "text/xml":
						case "text/html":
						case "text/plist":
						case "application/xml":
						case "application/plist":
						case "application/x-plist":
							//body = XML.parse($response.body);
							//$.log(`🚧 body: ${JSON.stringify(body)}`, "");
							//$response.body = XML.stringify(body);
							break;
						case "text/vtt":
						case "application/vtt":
							//body = VTT.parse($request.body);
							//$.log(`🚧 body: ${JSON.stringify(body)}`, "");
							//$request.body = VTT.stringify(body);
							break;
						case "text/json":
						case "application/json":
							//body = JSON.parse($request.body ?? "{}");
							//$.log(`🚧 body: ${JSON.stringify(body)}`, "");
							//$request.body = JSON.stringify(body);
							break;
						case "application/protobuf":
						case "application/x-protobuf":
						case "application/vnd.google.protobuf":
						case "application/grpc":
						case "application/grpc+proto":
						case "applecation/octet-stream":
							break;
					};
					//break; // 不中断，继续处理URL
				case "GET":
				case "HEAD":
				case "OPTIONS":
				default:
					// 路径判断
					switch (PATH) {
						case "/get_domains/v4/":
						case "/get_domains/v5/":
						case "/get_domains/v6/":
						case "/get_domains/v7/":
						case "/get_domains/v8/":
						case "/get_domains/v9/":
							$.log(`🚧 调试信息, cronet_version: ${url.searchParams.get("cronet_version")}`, "");
							$.log(`🚧 调试信息, ttnet_version: ${url.searchParams.get("ttnet_version")}`, "");
							delete $request.headers?.["x-tt-tnc-summary"];
						/*
						//case "/service/2/app_log/":
						case "/aweme/v1/user/":
						case "/aweme/v1/user/profile/other/":
						case "/aweme/v1/commit/follow/user/":
						case "/aweme/v1/user/settings/":
						case "/tiktok/user/profile/self/v1":
						case "/tiktok/user/profile/other/v1":
						case "/tiktok/v1/mix/list/":
							break;
						*/
						default:
							/*
							processParams(url.searchParams, Settings.CountryCode, Settings.Carrier, Configs);
							if ($request.headers?.["x-common-params-v2"] ?? $request.headers?.["X-Common-Params-V2"]) {
								let commonParams = $request.headers?.["x-common-params-v2"] ?? $request.headers?.["X-Common-Params-V2"];
								commonParams = new Map(commonParams.split("&").map((param) => param.split("=")));
								commonParams = processParams(commonParams, Settings.CountryCode, Settings.Carrier, Configs);
								commonParams = Array.from(commonParams).map(param => param.join("=")).join("&");
								if ($request.headers?.["x-common-params-v2"]) $request.headers["x-common-params-v2"] = commonParams;
								if ($request.headers?.["X-Common-Params-V2"]) $request.headers["X-Common-Params-V2"] = commonParams;
							};
							*/
							break;
					};
					break;
				case "CONNECT":
				case "TRACE":
					break;
			};
			$request.url = url.toString();
			$.log(`🚧 调试信息`, `$request.url: ${$request.url}`, "");
			break;
		case false:
			break;
	};
})()
.catch((e) => $.logErr(e))
.finally(() => {
	switch ($response) {
		default: // 有构造回复数据，返回构造的回复数据
			//$.log(`🚧 finally`, `echo $response: ${JSON.stringify($response, null, 2)}`, "");
			if ($response.headers?.["Content-Encoding"]) $response.headers["Content-Encoding"] = "identity";
			if ($response.headers?.["content-encoding"]) $response.headers["content-encoding"] = "identity";
			if ($.isQuanX()) {
				if (!$response.status) $response.status = "HTTP/1.1 200 OK";
				delete $response.headers?.["Content-Length"];
				delete $response.headers?.["content-length"];
				delete $response.headers?.["Transfer-Encoding"];
				$.done($response);
			} else $.done({ response: $response });
			break;
		case undefined: // 无构造回复数据，发送修改的请求数据
			//$.log(`🚧 finally`, `$request: ${JSON.stringify($request, null, 2)}`, "");
			$.done($request);
			break;
	};
})

/***************** Function *****************/
function processParams(searchParams = new URL($request.url).searchParams, cc = "TW", carrier = "中華電信", database = {}) {
	const MCCMNC = searchParams.get("mcc_mnc");
	$.log(`☑️ process Params, MCCMNC: ${MCCMNC}`, "");
	//if (searchParams.has("residence")) searchParams.set("residence", cc);
	if (searchParams.has("carrier")) searchParams.set("carrier", encodeURIComponent(carrier));
	//if (searchParams.has("sys_region")) searchParams.set("sys_region", cc);
	if (searchParams.has("sim_region")) searchParams.set("sim_region", database.MCCMNC[carrier]);
	if (searchParams.has("op_region")) searchParams.set("op_region", cc);
	if (searchParams.has("carrier_region")) searchParams.set("carrier_region", cc);
	//if (searchParams.has("carrier_region1")) searchParams.set("carrier_region1", cc);
	if (searchParams.has("current_region")) searchParams.set("current_region", cc);
	//if (searchParams.has("account_region")) searchParams.set("account_region", cc.toLocaleLowerCase());
	if (searchParams.has("tz_name")) searchParams.set("tz_name", database.TimeZone[carrier]);
	switch (MCCMNC) {
		case "46000":
		case "46001":
		case "46002":
		case "46003":
		case "46004":
		case "46005":
		case "46006":
		case "46007":
		case "46008":
		case "46009":
		case "46010":
		case "46011":
		case "46012":
		case "46013":
		case "46014":
		case "46015":
		case "46016":
		case "46017":
		case "46018":
		case "46019":
		case "46020":
			searchParams.set("mcc_mnc", database.MCCMNC[carrier]);
			break;
		case "45400":
		case "45401":
		case "45402":
		case "45403":
		case "45404":
		case "45405":
		case "45406":
		case "45407":
		case "45408":
		case "45409":
		case "45410":
		case "45411":
		case "45412":
		case "45413":
		case "45414":
		case "45415":
		case "45416":
		case "45417":
		case "45418":
		case "45419":
		case "45420":
		case "45429":
			searchParams.set("mcc_mnc", database.MCCMNC[carrier]);
			break;
		case undefined:
		default:
			break;
	};
	$.log(`✅ process Params`, "");
	return searchParams;
};
