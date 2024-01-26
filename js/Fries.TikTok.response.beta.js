/*
README: https://github.com/VirgilClyne/GetSomeFries
*/

const $ = new Env("🍿 DualSubs: ♪ TikTok v0.1.3(6) response.beta");
const URI = new URIs();
const DataBase = {
	"TikTok":{
		"Settings":{"Switch":true,"CountryCode":"US","MCC":"310","MNC":"260"}
	},
	"WeChat":{
		"Settings":{"Switch":true}
	},
	"Default": {
		"Settings":{"Switch":true}
	}
};

/***************** Processing *****************/
// 解构URL
const URL = URI.parse($request.url);
$.log(`⚠ ${$.name}`, `URL: ${JSON.stringify(URL)}`, "");
// 获取连接参数
const METHOD = $request.method, HOST = URL.host, PATH = URL.path, PATHs = URL.paths;
$.log(`⚠ ${$.name}`, `METHOD: ${METHOD}`, "");
// 解析格式
const FORMAT = ($response.headers?.["Content-Type"] ?? $response.headers?.["content-type"])?.split(";")?.[0];
$.log(`⚠ ${$.name}, FORMAT: ${FORMAT}`, "");
(async () => {
	// 读取设置
	const { Settings, Caches, Configs } = setENV("GetSomeFries", "TikTok", DataBase);
	$.log(`⚠ ${$.name}`, `Settings.Switch: ${Settings?.Switch}`, "");
	switch (Settings.Switch) {
		case true:
		default:
			// 获取字幕类型与语言
			// 创建空数据
			let body = {};
			// 格式判断
			switch (FORMAT) {
				case undefined: // 视为无body
					break;
				case "application/x-www-form-urlencoded":
				case "text/plain":
				case "text/html":
				default:
					//$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
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
				case "text/plist":
				case "application/xml":
				case "application/plist":
				case "application/x-plist":
					//body = XML.parse($response.body);
					//$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
					//$response.body = XML.stringify(body);
					break;
				case "text/vtt":
				case "application/vtt":
					//body = VTT.parse($response.body);
					//$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
					//$response.body = VTT.stringify(body);
					break;
				case "text/json":
				case "application/json":
					body = JSON.parse($response.body ?? "{}");
					switch (PATH) {
						case "get_domains/v4/":
						case "get_domains/v5/":
						case "get_domains/v6/":
						case "get_domains/v7/":
						case "get_domains/v8/":
						case "get_domains/v9/":
							$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");

							$.log(`🚧 ${$.name}`, `summary: ${body.summary}`, "");
							//body.summary = "633f13170d641f15f73710f80b9419eb";

							$.log(`🚧 ${$.name}`, `$response.headers["x-tt-tnc-config"]: ${$response.headers?.["x-tt-tnc-config"]}`, "");
							//delete $response.headers?.["x-tt-tnc-config"];

							//$.log(`🚧 ${$.name}`, `$response.headers["x-tt-tnc-attr"]: ${$response.headers?.["x-tt-tnc-attr"]}`, "");
							//delete $response.headers?.["x-tt-tnc-attr"];

							//$.log(`🚧 ${$.name}`, `$response.headers["x-tt-tnc-abtest-tag"]: ${$response.headers?.["x-tt-tnc-abtest-tag"]}`, "");
							//delete $response.headers?.["x-tt-tnc-abtest-tag"];

							//$.log(`🚧 ${$.name}`, `$response.headers["x-tt-tnc-abtest"]: ${$response.headers?.["x-tt-tnc-abtest"]}`, "");
							//delete $response.headers?.["x-tt-tnc-abtest"];

							//if ($response.headers?.["x-ss-canary"]) $response.headers?.["x-ss-canary"] = "0";
							//else $.log(`⚠ ${$.name}`, `⚠️ 警告, $response.headers["x-ss-canary"] 不存在`, "");
							
							if (body?.data?.chromium_open) body.data.chromium_open = 0;
							else $.log(`⚠ ${$.name}`, `⚠️ 警告, body.data.chromium_open 不存在`, "");

							$.log(`🚧 ${$.name}`, `client_key_config: ${JSON.stringify(body?.data?.client_key_config)}`, "");
							if (body?.data?.client_key_config) body.data.client_key_config.client_key_sign_enabled = 0;
							else $.lodash_set(body, "data.client_key_config.client_key_sign_enabled", 0);
							/*
							if (body?.data?.disable_encrypt_switch) body.data.disable_encrypt_switch = 1;
							else $.log(`⚠ ${$.name}`, `⚠️ 警告, body.data.disable_encrypt_switch 不存在`, "");

							if (body?.data?.force_http11_wildchar_hosts) {
								body.data.force_http11_wildchar_hosts.push("*.tiktokv.com");
								delete body.data.force_http11_wildchar_hosts;
							} else {
								$.log(`⚠ ${$.name}`, `⚠️ 警告, body.data.force_http11_wildchar_hosts 不存在`, "");
								body.data.force_http11_wildchar_hosts = ["*.tiktokv.com"];
							};

							if (body?.data?.hs_open) body.data.hs_open = 0;
							else $.log(`⚠ ${$.name}`, `⚠️ 警告, body.data.hs_open 不存在`, "");

							if (body?.data?.http_show_hijack) body.data.http_show_hijack = 0;
							else $.log(`⚠ ${$.name}`, `⚠️ 警告, body.data.http_show_hijack 不存在`, "");
							*/
							$.log(`🚧 ${$.name}`, `https_retry_http: ${body?.data?.https_retry_http}`, "");
							body.data.https_retry_http = 1;

							$.log(`🚧 ${$.name}`, `https_to_http: ${body?.data?.https_to_http}`, "");
							body.data.https_to_http = 1;

							$.log(`🚧 ${$.name}`, `ios_downloader: ${JSON.stringify(body?.data?.ios_downloader)}`, "");
							if (body?.data?.ios_downloader) {
								body.data.ios_downloader.is_report_tracker_enable = 0;
								body.data.ios_downloader.is_tracker_enable = 0;
							};

							$.log(`🚧 ${$.name}`, `opaque_data_enabled: ${body?.data?.opaque_data_enabled}`, "");
							body.data.opaque_data_enabled = 0;

							$.log(`🚧 ${$.name}`, `request_tag_enabled: ${body?.data?.request_tag_enabled}`, "");
							if (body?.data?.request_tag_enabled) body.data.request_tag_enabled = 0;
							/*
							if (body?.data?.send_tnc_host_arrays) delete body.data.send_tnc_host_arrays;
							else $.log(`⚠ ${$.name}`, `⚠️ 警告, body.data.send_tnc_host_arrays 不存在`, "");

							if (body?.data?.share_cookie_host_list) delete body.data.share_cookie_host_list;
							else $.log(`⚠ ${$.name}`, `⚠️ 警告, body.data.share_cookie_host_list 不存在`, "");

							if (body?.data?.tnc_config) {
								delete body.data.tnc_config;
								body.data.tnc_config.detect_enable = 1;
								body.data.tnc_config.local_enable = 0;
							} else $.log(`⚠ ${$.name}`, `⚠️ 警告, body.data.tnc_config 不存在`, "");
							*/
							if (body?.data?.ttnet_fake_network_detect_config) body.data.ttnet_fake_network_detect_config.detect_enable = 0;
							else {
								$.log(`⚠ ${$.name}`, `⚠️ 警告, body.data.ttnet_fake_network_detect_config 不存在`, "");
								body.data.ttnet_fake_network_detect_config = {
									"bypass_httpdns": 1,
									"detect_enable": 0,
									//"detect_hosts": ["api16-core.tiktokv.com", "api22-core.tiktokv.com"],
									//"detect_result_timeout_ms": 3000,
									//"detect_timeout_ms": 5000,
									//"detect_types": [1]
								};
							};
							/*
							if (body?.data?.tt_ssl_config) {
								delete body.data.tt_ssl_config;
								body.data.tt_ssl_config.enable_file_cache = 0;
								delete body.data.tt_ssl_config?.file_cache_whitelist;
							} else $.log(`⚠ ${$.name}`, `⚠️ 警告, body.data.tt_ssl_config 不存在`, "");
							*/
							if (body?.data?.ttnet_dispatch_actions) {
								delete body.data.ttnet_dispatch_actions;
								//body.data.ttnet_dispatch_actions.unshift({ "act_priority": 2001, "action": "dispatch", "desc": "skip frontier", "param": { "contain_group": ["/ws"], "dispatch_strategy": 0, "host_group": ["*frontier*"] }, "rule_id": 45227, "set_req_priority": 3000, "sign": "b2348456716f024522c08d88f6fb2fcc" })
							} else $.log(`⚠ ${$.name}`, `⚠️ 警告, body.data.ttnet_dispatch_actions 不存在`, "");
							/*
							if (body?.data?.ttnet_h2_config) delete body.data.ttnet_h2_config;
							else $.log(`⚠ ${$.name}`, `⚠️ 警告, body.data.ttnet_h2_config 不存在`, "");
							*/
							$.log(`🚧 ${$.name}`, `ttnet_h2_enabled: ${body?.data?.ttnet_h2_enabled}`, "");
							//body.data.ttnet_h2_enabled = 1;

							//if (body?.data?.ttnet_http_dns_addr) delete body.data.ttnet_http_dns_addr;
							//else $.log(`⚠ ${$.name}`, `⚠️ 警告, body.data.ttnet_http_dns_addr 不存在`, "");

							$.log(`🚧 ${$.name}`, `ttnet_http_dns_enabled: ${body?.data?.ttnet_http_dns_enabled}`, "");
							body.data.ttnet_http_dns_enabled = 0;

							//if (body?.data?.ttnet_preconnect_urls) delete body.data.ttnet_preconnect_urls;
							//else $.log(`⚠ ${$.name}`, `⚠️ 警告, body.data.ttnet_preconnect_urls 不存在`, "");

							$.log(`🚧 ${$.name}`, `ttnet_quic_enabled: ${body?.data?.ttnet_quic_enabled}`, "");
							body.data.ttnet_quic_enabled = 0;

							//if (body?.data?.ttnet_quic_hint) delete body.data.ttnet_quic_hint;
							//else $.log(`⚠ ${$.name}`, `⚠️ 警告, body.data.ttnet_quic_hint 不存在`, "");

							//if (body?.data?.ttnet_quic_internal_param) delete body.data.ttnet_quic_internal_param;
							//else $.log(`⚠ ${$.name}`, `⚠️ 警告, body.data.ttnet_quic_internal_param 不存在`, "");

							//if (body?.data?.ttnet_request_retry_force_httpdns_v2) delete body.data.ttnet_request_retry_force_httpdns_v2;
							//else $.log(`⚠ ${$.name}`, `⚠️ 警告, body.data.ttnet_request_retry_force_httpdns_v2 不存在`, "");

							//if (body?.data?.ttnet_retry_force_httpdns_error_list) delete body.data.ttnet_retry_force_httpdns_error_list;
							//else $.log(`⚠ ${$.name}`, `⚠️ 警告, body.data.ttnet_retry_force_httpdns_error_list 不存在`, "");
							
							//if (body?.data?.ttnet_retry_force_httpdns_white_list) delete body.data.ttnet_retry_force_httpdns_white_list;
							//else $.log(`⚠ ${$.name}`, `⚠️ 警告, body.data.ttnet_retry_force_httpdns_white_list 不存在`, "");

							$.log(`🚧 ${$.name}`, `ttnet_tt_http_dns: ${body?.data?.ttnet_tt_http_dns}`, "");
							body.data.ttnet_tt_http_dns = 0;

							//if (body.data?.ttnet_url_dispatcher_enabled) body.data.ttnet_url_dispatcher_enabled = 0;
							//else $.log(`⚠ ${$.name}`, `⚠️ 警告, body.data.ttnet_url_dispatcher_enabled 不存在`, "");

							if (body?.data?.ttnet_verify_api_config) body.data.ttnet_verify_api_config["5xx_enabled"] = 0;
							else $.lodash_set(body, "data.ttnet_verify_api_config.5xx_enabled", 0);
							$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
							break;
						case "passport/auth/only_login/":
							$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
							break;
						case "service/settings/v3/":
							//$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
							break;
						case "aweme/v1/cmpl/set/settings/":
							$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
							break;
						case "aweme/v1/aweme/detail/":
							$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
							//body.aweme_detail = processAwemeList(body.aweme_detail);
							break;
						case "/tiktok/feed/explore/v1":
							body.awemes = body.awemes.map(item => processAwemeList(item)).filter(Boolean);
							break;
						case "aweme/v1/multi/aweme/detail/":
						case "tiktok/v1/videos/detail/":
							body.aweme_details = body.aweme_details.map(item => processAwemeList(item)).filter(Boolean);
							break;
						case "aweme/v1/aweme/post/":
						case "aweme/v1/aweme/favorite/":
						case "aweme/v1/private/aweme/":
						case "aweme/v1/music/aweme/":
							body.aweme_list = body.aweme_list.map(item => processAwemeList(item)).filter(Boolean);
							break;
						case "aweme/v2/follow/feed/":
							body.data = body.data.map(item => {
								item.aweme = processAwemeList(item.aweme);
								return item;
							});
							break;
						case "aweme/v2/category/list/":
							body.category_list = body.category_list.map(item => {
								item.aweme_list = item.aweme_list.map(item => processAwemeList(item)).filter(Boolean);
								return item;
							});
							break;
						case "aweme/v1/user/profile/other/":
							$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
							if (!body.user) {
								body.status_msg = "";
								body.status_code = 0;
								$.lodash_set(body, "user.sec_uid", URL.query?.sec_user_id);
								$.lodash_set(body, "user.uid", URL.query?.user_id);
							};
							break;
						case "aweme/v1/commit/follow/user/":
							$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
							break;
						case "tiktok/user/profile/other/v1":
							$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
							break;
						default:
							//$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
							break;
					};
					$response.body = JSON.stringify(body);
					break;
				case "application/protobuf":
				case "application/x-protobuf":
				case "application/vnd.google.protobuf":
				case "application/grpc":
				case "application/grpc+proto":
				case "applecation/octet-stream":
					//$.log(`🚧 ${$.name}`, `$response.body: ${JSON.stringify($response.body)}`, "");
					//let rawBody = $.isQuanX() ? new Uint8Array($response.bodyBytes ?? []) : $response.body ?? new Uint8Array();
					//$.log(`🚧 ${$.name}`, `isBuffer? ${ArrayBuffer.isView(rawBody)}: ${JSON.stringify(rawBody)}`, "");
					// 写入二进制数据
					//if ($.isQuanX()) $response.bodyBytes = rawBody
					//else $response.body = rawBody;
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
						case "applecation/octet-stream":
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
/**
 * Set Environment Variables
 * @author VirgilClyne
 * @param {String} name - Persistent Store Key
 * @param {Array} platforms - Platform Names
 * @param {Object} database - Default DataBase
 * @return {Object} { Settings, Caches, Configs }
 */
function setENV(name, platforms, database) {
	$.log(`☑️ ${$.name}, Set Environment Variables`, "");
	let { Settings, Caches, Configs } = getENV(name, platforms, database);
	/***************** Settings *****************/
	$.log(`✅ ${$.name}, Set Environment Variables`, `Settings: ${typeof Settings}`, `Settings内容: ${JSON.stringify(Settings)}`, "");
	/***************** Caches *****************/
	//$.log(`✅ ${$.name}, Set Environment Variables`, `Caches: ${typeof Caches}`, `Caches内容: ${JSON.stringify(Caches)}`, "");
	/***************** Configs *****************/
	return { Settings, Caches, Configs };
};

function processAwemeList(aweme_detail = {}) {
	//$.log(`☑️ ${$.name}, process Aweme List`, "");
	if (!aweme_detail?.is_ads) {
	//$.log(`🚧 ${$.name}, process Aweme List`, `before aweme_detail: ${JSON.stringify(aweme_detail)}`, "");
		aweme_detail.prevent_download = false;
		aweme_detail.without_watermark = true;
		if (aweme_detail?.video) {
			aweme_detail.video.has_watermark = false;
			aweme_detail.video.prevent_download = false;
			aweme_detail.video.download_addr = aweme_detail.video.play_addr;
			aweme_detail.video.download_suffix_logo_addr = aweme_detail.video.play_addr;
			delete aweme_detail.video.misc_download_addrs;
		};
		if (aweme_detail?.music) {
			aweme_detail.music.prevent_download = false;
		};
		if (aweme_detail?.aweme_acl) {
			if (aweme_detail.aweme_acl?.download_general) {
				aweme_detail.aweme_acl.download_general.code = 0;
				aweme_detail.aweme_acl.download_general.transcode = 3;
				aweme_detail.aweme_acl.download_general.mute = false;
				aweme_detail.aweme_acl.download_general.show_type = 2;
				delete aweme_detail.aweme_acl.download_general.extra;
				aweme_detail.aweme_acl.download_mask_panel = aweme_detail.aweme_acl.download_general;
				aweme_detail.aweme_acl.share_general = aweme_detail.aweme_acl.download_general;
			}
		};
		if (aweme_detail?.video_control) {
			aweme_detail.video_control.allow_music = true;
			aweme_detail.video_control.prevent_download_type = 0;
			aweme_detail.video_control.allow_dynamic_wallpaper = true;
			aweme_detail.video_control.allow_download = true;
		};
		//$.log(`🚧 ${$.name}, process Aweme List`, `after aweme_detail: ${JSON.stringify(aweme_detail)}`, "");
		return aweme_detail;
	};
	//$.log(`✅ ${$.name}, process Aweme List`, "");
};

/***************** Env *****************/
// prettier-ignore
// https://github.com/chavyleung/scripts/blob/master/Env.min.js
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,a)=>{s.call(this,t,(t,s,r)=>{t?a(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}getEnv(){return"undefined"!=typeof $environment&&$environment["surge-version"]?"Surge":"undefined"!=typeof $environment&&$environment["stash-version"]?"Stash":"undefined"!=typeof module&&module.exports?"Node.js":"undefined"!=typeof $task?"Quantumult X":"undefined"!=typeof $loon?"Loon":"undefined"!=typeof $rocket?"Shadowrocket":void 0}isNode(){return"Node.js"===this.getEnv()}isQuanX(){return"Quantumult X"===this.getEnv()}isSurge(){return"Surge"===this.getEnv()}isLoon(){return"Loon"===this.getEnv()}isShadowrocket(){return"Shadowrocket"===this.getEnv()}isStash(){return"Stash"===this.getEnv()}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const a=this.getdata(t);if(a)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,a)=>e(a))})}runScript(t,e){return new Promise(s=>{let a=this.getdata("@chavy_boxjs_userCfgs.httpapi");a=a?a.replace(/\n/g,"").trim():a;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[i,o]=a.split("@"),n={url:`http://${o}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":i,Accept:"*/*"},timeout:r};this.post(n,(t,e,a)=>s(a))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),a=!s&&this.fs.existsSync(e);if(!s&&!a)return{};{const a=s?t:e;try{return JSON.parse(this.fs.readFileSync(a))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),a=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):a?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const a=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of a)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,a)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[a+1])>>0==+e[a+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,a]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,a,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,a,r]=/^@(.*?)\.(.*?)$/.exec(e),i=this.getval(a),o=a?"null"===i?null:i||"{}":"{}";try{const e=JSON.parse(o);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),a)}catch(e){const i={};this.lodash_set(i,r,t),s=this.setval(JSON.stringify(i),a)}}else s=this.setval(t,e);return s}getval(t){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.read(t);case"Quantumult X":return $prefs.valueForKey(t);case"Node.js":return this.data=this.loaddata(),this.data[t];default:return this.data&&this.data[t]||null}}setval(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.write(t,e);case"Quantumult X":return $prefs.setValueForKey(t,e);case"Node.js":return this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0;default:return this.data&&this.data[e]||null}}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){switch(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"],delete t.headers["content-type"],delete t.headers["content-length"]),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,a)=>{!t&&s&&(s.body=a,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,a)});break;case"Quantumult X":this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:a,headers:r,body:i,bodyBytes:o}=t;e(null,{status:s,statusCode:a,headers:r,body:i,bodyBytes:o},i,o)},t=>e(t&&t.error||"UndefinedError"));break;case"Node.js":let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:a,statusCode:r,headers:i,rawBody:o}=t,n=s.decode(o,this.encoding);e(null,{status:a,statusCode:r,headers:i,rawBody:o,body:n},n)},t=>{const{message:a,response:r}=t;e(a,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";switch(t.body&&t.headers&&!t.headers["Content-Type"]&&!t.headers["content-type"]&&(t.headers["content-type"]="application/x-www-form-urlencoded"),t.headers&&(delete t.headers["Content-Length"],delete t.headers["content-length"]),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,a)=>{!t&&s&&(s.body=a,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,a)});break;case"Quantumult X":t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:a,headers:r,body:i,bodyBytes:o}=t;e(null,{status:s,statusCode:a,headers:r,body:i,bodyBytes:o},i,o)},t=>e(t&&t.error||"UndefinedError"));break;case"Node.js":let a=require("iconv-lite");this.initGotEnv(t);const{url:r,...i}=t;this.got[s](r,i).then(t=>{const{statusCode:s,statusCode:r,headers:i,rawBody:o}=t,n=a.decode(o,this.encoding);e(null,{status:s,statusCode:r,headers:i,rawBody:o,body:n},n)},t=>{const{message:s,response:r}=t;e(s,r,r&&a.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let a={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in a)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?a[e]:("00"+a[e]).substr((""+a[e]).length)));return t}queryStr(t){let e="";for(const s in t){let a=t[s];null!=a&&""!==a&&("object"==typeof a&&(a=JSON.stringify(a)),e+=`${s}=${a}&`)}return e=e.substring(0,e.length-1),e}msg(e=t,s="",a="",r){const i=t=>{switch(typeof t){case void 0:return t;case"string":switch(this.getEnv()){case"Surge":case"Stash":default:return{url:t};case"Loon":case"Shadowrocket":return t;case"Quantumult X":return{"open-url":t};case"Node.js":return}case"object":switch(this.getEnv()){case"Surge":case"Stash":case"Shadowrocket":default:{let e=t.url||t.openUrl||t["open-url"];return{url:e}}case"Loon":{let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}case"Quantumult X":{let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl,a=t["update-pasteboard"]||t.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard":a}}case"Node.js":return}default:return}};if(!this.isMute)switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:$notification.post(e,s,a,i(r));break;case"Quantumult X":$notify(e,s,a,i(r));break;case"Node.js":}if(!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),a&&t.push(a),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t);break;case"Node.js":this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack)}}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;switch(this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:$done(t);break;case"Node.js":process.exit(1)}}}(t,e)}

/**
 * Get Environment Variables
 * @link https://github.com/VirgilClyne/GetSomeFries/blob/main/function/getENV/getENV.min.js
 * @author VirgilClyne
 * @param {String} key - Persistent Store Key
 * @param {Array} names - Platform Names
 * @param {Object} database - Default Database
 * @return {Object} { Settings, Caches, Configs }
 */
function getENV(key,names,database){let BoxJs=$.getjson(key,database),Argument={};if("undefined"!=typeof $argument&&Boolean($argument)){let arg=Object.fromEntries($argument.split("&").map((item=>item.split("="))));for(let item in arg)setPath(Argument,item,arg[item])}const Store={Settings:database?.Default?.Settings||{},Configs:database?.Default?.Configs||{},Caches:{}};Array.isArray(names)||(names=[names]);for(let name of names)Store.Settings={...Store.Settings,...database?.[name]?.Settings,...Argument,...BoxJs?.[name]?.Settings},Store.Configs={...Store.Configs,...database?.[name]?.Configs},BoxJs?.[name]?.Caches&&"string"==typeof BoxJs?.[name]?.Caches&&(BoxJs[name].Caches=JSON.parse(BoxJs?.[name]?.Caches)),Store.Caches={...Store.Caches,...BoxJs?.[name]?.Caches};return function traverseObject(o,c){for(var t in o){var n=o[t];o[t]="object"==typeof n&&null!==n?traverseObject(n,c):c(t,n)}return o}(Store.Settings,((key,value)=>("true"===value||"false"===value?value=JSON.parse(value):"string"==typeof value&&(value=value.includes(",")?value.split(",").map((item=>string2number(item))):string2number(value)),value))),Store;function setPath(object,path,value){path.split(".").reduce(((o,p,i)=>o[p]=path.split(".").length===++i?value:o[p]||{}),object)}function string2number(string){return string&&!isNaN(string)&&(string=parseInt(string,10)),string}}

// https://github.com/VirgilClyne/GetSomeFries/blob/main/function/URI/URIs.embedded.min.js
function URIs(t){return new class{constructor(t=[]){this.name="URI v1.2.6",this.opts=t,this.json={scheme:"",host:"",path:"",query:{}}}parse(t){let s=t.match(/(?:(?<scheme>.+):\/\/(?<host>[^/]+))?\/?(?<path>[^?]+)?\??(?<query>[^?]+)?/)?.groups??null;if(s?.path?s.paths=s.path.split("/"):s.path="",s?.paths){const t=s.paths[s.paths.length-1];if(t?.includes(".")){const e=t.split(".");s.format=e[e.length-1]}}return s?.query&&(s.query=Object.fromEntries(s.query.split("&").map((t=>t.split("="))))),s}stringify(t=this.json){let s="";return t?.scheme&&t?.host&&(s+=t.scheme+"://"+t.host),t?.path&&(s+=t?.host?"/"+t.path:t.path),t?.query&&(s+="?"+Object.entries(t.query).map((t=>t.join("="))).join("&")),s}}(t)}
