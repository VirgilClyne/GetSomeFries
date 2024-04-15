import _ from './ENV/Lodash.mjs'
import $Storage from './ENV/$Storage.mjs'
import ENV from "./ENV/ENV.mjs";

import Database from "./database/index.mjs";
import setENV from "./function/setENV.mjs";

const $ = new ENV("🍟 GetSomeFries: ♪ TikTok v0.2.0(3) response.beta");

/***************** Processing *****************/
// 解构URL
const url = new URL($request.url);
$.log(`⚠ url: ${url.toJSON()}`, "");
// 获取连接参数
const METHOD = $request.method, HOST = url.hostname, PATH = url.pathname;
$.log(`⚠ METHOD: ${METHOD}, HOST: ${HOST}, PATH: ${PATH}` , "");
// 解析格式
const FORMAT = ($response.headers?.["Content-Type"] ?? $response.headers?.["content-type"])?.split(";")?.[0];
$.log(`⚠ FORMAT: ${FORMAT}`, "");
(async () => {
	// 读取设置
	const { Settings, Caches, Configs } = setENV("GetSomeFries", "TikTok", Database);
	$.log(`⚠ Settings.Switch: ${Settings?.Switch}`, "");
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
				default:
					//$.log(`🚧 body: ${JSON.stringify(body)}`, "");
					break;
				case "application/x-mpegURL":
				case "application/x-mpegurl":
				case "application/vnd.apple.mpegurl":
				case "audio/mpegurl":
					//body = M3U8.parse($response.body);
					//$.log(`🚧 body: ${JSON.stringify(body)}`, "");
					//$response.body = M3U8.stringify(body);
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
					//body = VTT.parse($response.body);
					//$.log(`🚧 body: ${JSON.stringify(body)}`, "");
					//$response.body = VTT.stringify(body);
					break;
				case "text/json":
				case "application/json":
					body = JSON.parse($response.body ?? "{}");
					switch (PATH) {
						case "/get_domains/v4/":
						case "/get_domains/v5/":
						case "/get_domains/v6/":
						case "/get_domains/v7/":
						case "/get_domains/v8/":
						case "/get_domains/v9/":
							$.log(`🚧 body: ${JSON.stringify(body)}`, "");

							$.log(`🚧 summary: ${body.summary}`, "");
							//body.summary = "633f13170d641f15f73710f80b9419eb";

							$.log(`🚧 $response.headers["x-tt-tnc-config"]: ${$response.headers?.["x-tt-tnc-config"]}`, "");
							//delete $response.headers?.["x-tt-tnc-config"];

							//$.log(`🚧 $response.headers["x-tt-tnc-attr"]: ${$response.headers?.["x-tt-tnc-attr"]}`, "");
							//delete $response.headers?.["x-tt-tnc-attr"];

							//$.log(`🚧 $response.headers["x-tt-tnc-abtest-tag"]: ${$response.headers?.["x-tt-tnc-abtest-tag"]}`, "");
							//delete $response.headers?.["x-tt-tnc-abtest-tag"];

							//$.log(`🚧 $response.headers["x-tt-tnc-abtest"]: ${$response.headers?.["x-tt-tnc-abtest"]}`, "");
							//delete $response.headers?.["x-tt-tnc-abtest"];

							//if ($response.headers?.["x-ss-canary"]) $response.headers?.["x-ss-canary"] = "0";
							//else $.log(`⚠ ⚠️ 警告, $response.headers["x-ss-canary"] 不存在`, "");
							
							if (body?.data?.chromium_open) body.data.chromium_open = 0;
							else $.log(`⚠ ⚠️ 警告, body.data.chromium_open 不存在`, "");

							$.log(`🚧 client_key_config: ${JSON.stringify(body?.data?.client_key_config)}`, "");
							if (body?.data?.client_key_config) body.data.client_key_config.client_key_sign_enabled = 0;
							else _.set(body, "data.client_key_config.client_key_sign_enabled", 0);
							/*
							if (body?.data?.disable_encrypt_switch) body.data.disable_encrypt_switch = 1;
							else $.log(`⚠ ⚠️ 警告, body.data.disable_encrypt_switch 不存在`, "");

							if (body?.data?.force_http11_wildchar_hosts) {
								body.data.force_http11_wildchar_hosts.push("*.tiktokv.com");
								delete body.data.force_http11_wildchar_hosts;
							} else {
								$.log(`⚠ ⚠️ 警告, body.data.force_http11_wildchar_hosts 不存在`, "");
								body.data.force_http11_wildchar_hosts = ["*.tiktokv.com"];
							};

							if (body?.data?.hs_open) body.data.hs_open = 0;
							else $.log(`⚠ ⚠️ 警告, body.data.hs_open 不存在`, "");

							if (body?.data?.http_show_hijack) body.data.http_show_hijack = 0;
							else $.log(`⚠ ⚠️ 警告, body.data.http_show_hijack 不存在`, "");
							*/
							$.log(`🚧 https_retry_http: ${body?.data?.https_retry_http}`, "");
							body.data.https_retry_http = 1;

							$.log(`🚧 https_to_http: ${body?.data?.https_to_http}`, "");
							body.data.https_to_http = 1;

							$.log(`🚧 ios_downloader: ${JSON.stringify(body?.data?.ios_downloader)}`, "");
							if (body?.data?.ios_downloader) {
								body.data.ios_downloader.is_report_tracker_enable = 0;
								body.data.ios_downloader.is_tracker_enable = 0;
							};

							$.log(`🚧 opaque_data_enabled: ${body?.data?.opaque_data_enabled}`, "");
							body.data.opaque_data_enabled = 0; // 关闭证书固定

							$.log(`🚧 request_tag_enabled: ${body?.data?.request_tag_enabled}`, "");
							if (body?.data?.request_tag_enabled) body.data.request_tag_enabled = 0;
							/*
							if (body?.data?.send_tnc_host_arrays) delete body.data.send_tnc_host_arrays;
							else $.log(`⚠ ⚠️ 警告, body.data.send_tnc_host_arrays 不存在`, "");

							if (body?.data?.share_cookie_host_list) delete body.data.share_cookie_host_list;
							else $.log(`⚠ ⚠️ 警告, body.data.share_cookie_host_list 不存在`, "");

							if (body?.data?.tnc_config) {
								delete body.data.tnc_config;
								body.data.tnc_config.detect_enable = 1;
								body.data.tnc_config.local_enable = 0;
							} else $.log(`⚠ ⚠️ 警告, body.data.tnc_config 不存在`, "");
							*/

							$.log(`🚧 tt_sandbox_intercept_enabled: ${body?.data?.tt_sandbox_intercept_enabled}`, "");
							body.data.tt_sandbox_intercept_enabled = 1;

							if (body?.data?.ttnet_fake_network_detect_config) body.data.ttnet_fake_network_detect_config.detect_enable = 0;
							else {
								$.log(`⚠ ⚠️ 警告, body.data.ttnet_fake_network_detect_config 不存在`, "");
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
							} else $.log(`⚠ ⚠️ 警告, body.data.tt_ssl_config 不存在`, "");
							*/
							/*
							if (body?.data?.ttnet_dispatch_actions) {
								body.data.ttnet_dispatch_actions = [];
								//body.data.ttnet_dispatch_actions.unshift({ "act_priority": 2001, "action": "dispatch", "desc": "skip frontier", "param": { "contain_group": ["/ws"], "dispatch_strategy": 0, "host_group": ["*frontier*"] }, "rule_id": 45227, "set_req_priority": 3000, "sign": "b2348456716f024522c08d88f6fb2fcc" })
							} else $.log(`⚠ ⚠️ 警告, body.data.ttnet_dispatch_actions 不存在`, "");
							*/
							/*
							if (body?.data?.ttnet_h2_config) delete body.data.ttnet_h2_config;
							else $.log(`⚠ ⚠️ 警告, body.data.ttnet_h2_config 不存在`, "");
							*/
							$.log(`🚧 ttnet_h2_enabled: ${body?.data?.ttnet_h2_enabled}`, "");
							//body.data.ttnet_h2_enabled = 1;

							//if (body?.data?.ttnet_http_dns_addr) delete body.data.ttnet_http_dns_addr;
							//else $.log(`⚠ ⚠️ 警告, body.data.ttnet_http_dns_addr 不存在`, "");

							$.log(`🚧 ttnet_http_dns_enabled: ${body?.data?.ttnet_http_dns_enabled}`, "");
							body.data.ttnet_http_dns_enabled = 0;

							//if (body?.data?.ttnet_preconnect_urls) delete body.data.ttnet_preconnect_urls;
							//else $.log(`⚠ ⚠️ 警告, body.data.ttnet_preconnect_urls 不存在`, "");

							$.log(`🚧 ttnet_quic_enabled: ${body?.data?.ttnet_quic_enabled}`, "");
							body.data.ttnet_quic_enabled = 0;

							//if (body?.data?.ttnet_quic_hint) delete body.data.ttnet_quic_hint;
							//else $.log(`⚠ ⚠️ 警告, body.data.ttnet_quic_hint 不存在`, "");

							//if (body?.data?.ttnet_quic_internal_param) delete body.data.ttnet_quic_internal_param;
							//else $.log(`⚠ ⚠️ 警告, body.data.ttnet_quic_internal_param 不存在`, "");

							//if (body?.data?.ttnet_request_retry_force_httpdns_v2) delete body.data.ttnet_request_retry_force_httpdns_v2;
							//else $.log(`⚠ ⚠️ 警告, body.data.ttnet_request_retry_force_httpdns_v2 不存在`, "");

							//if (body?.data?.ttnet_retry_force_httpdns_error_list) delete body.data.ttnet_retry_force_httpdns_error_list;
							//else $.log(`⚠ ⚠️ 警告, body.data.ttnet_retry_force_httpdns_error_list 不存在`, "");
							
							//if (body?.data?.ttnet_retry_force_httpdns_white_list) delete body.data.ttnet_retry_force_httpdns_white_list;
							//else $.log(`⚠ ⚠️ 警告, body.data.ttnet_retry_force_httpdns_white_list 不存在`, "");

							$.log(`🚧 ttnet_tt_http_dns: ${body?.data?.ttnet_tt_http_dns}`, "");
							body.data.ttnet_tt_http_dns = 0;

							//if (body.data?.ttnet_url_dispatcher_enabled) body.data.ttnet_url_dispatcher_enabled = 0;
							//else $.log(`⚠ ⚠️ 警告, body.data.ttnet_url_dispatcher_enabled 不存在`, "");

							if (body?.data?.ttnet_verify_api_config) body.data.ttnet_verify_api_config["5xx_enabled"] = 0;
							else _.set(body, "data.ttnet_verify_api_config.5xx_enabled", 0);
							$.log(`🚧 body: ${JSON.stringify(body)}`, "");
							break;
						case "/passport/auth/only_login/":
							$.log(`🚧 body: ${JSON.stringify(body)}`, "");
							break;
						case "/service/settings/v3/":
							//$.log(`🚧 body: ${JSON.stringify(body)}`, "");
							break;
						case "/aweme/v1/cmpl/set/settings/":
							$.log(`🚧 body: ${JSON.stringify(body)}`, "");
							break;
						case "/aweme/v1/aweme/detail/":
							$.log(`🚧 body: ${JSON.stringify(body)}`, "");
							//body.aweme_detail = processAwemeList(body.aweme_detail);
							break;
						case "/tiktok/feed/explore/v1":
							body.awemes = body.awemes.map(item => processAwemeList(item)).filter(Boolean);
							break;
						case "/aweme/v1/multi/aweme/detail/":
						case "/tiktok/v1/videos/detail/":
							body.aweme_details = body.aweme_details.map(item => processAwemeList(item)).filter(Boolean);
							break;
						case "/aweme/v1/aweme/post/":
						case "/aweme/v1/aweme/favorite/":
						case "/aweme/v1/private/aweme/":
						case "/aweme/v1/music/aweme/":
							body.aweme_list = body.aweme_list.map(item => processAwemeList(item)).filter(Boolean);
							break;
						case "/aweme/v2/follow/feed/":
							body.data = body.data.map(item => {
								item.aweme = processAwemeList(item.aweme);
								return item;
							});
							break;
						case "/aweme/v2/category/list/":
							body.category_list = body.category_list.map(item => {
								item.aweme_list = item.aweme_list.map(item => processAwemeList(item)).filter(Boolean);
								return item;
							});
							break;
						case "/aweme/v1/user/profile/other/":
							$.log(`🚧 body: ${JSON.stringify(body)}`, "");
							if (!body.user) {
								body.status_msg = "";
								body.status_code = 0;
								_.set(body, "user.sec_uid", url.searchParams.get("sec_user_id"));
								_.set(body, "user.uid", url.searchParams.get("user_id"));
							};
							break;
						case "/aweme/v1/commit/follow/user/":
							$.log(`🚧 body: ${JSON.stringify(body)}`, "");
							break;
						case "/tiktok/user/profile/other/v1":
							$.log(`🚧 body: ${JSON.stringify(body)}`, "");
							break;
						default:
							//$.log(`🚧 body: ${JSON.stringify(body)}`, "");
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
					//$.log(`🚧 $response.body: ${JSON.stringify($response.body)}`, "");
					//let rawBody = $.isQuanX() ? new Uint8Array($response.bodyBytes ?? []) : $response.body ?? new Uint8Array();
					//$.log(`🚧 isBuffer? ${ArrayBuffer.isView(rawBody)}: ${JSON.stringify(rawBody)}`, "");
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
	.finally(() => $.done($response))

/***************** Function *****************/
function processAwemeList(aweme_detail = {}) {
	//$.log(`☑️ process Aweme List`, "");
	if (!aweme_detail?.is_ads) {
	//$.log(`🚧 process Aweme List`, `before aweme_detail: ${JSON.stringify(aweme_detail)}`, "");
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
		//$.log(`🚧 process Aweme List`, `after aweme_detail: ${JSON.stringify(aweme_detail)}`, "");
		return aweme_detail;
	};
	//$.log(`✅ process Aweme List`, "");
};
