import _ from './ENV/Lodash.mjs'
import $Storage from './ENV/$Storage.mjs'
import ENV from "./ENV/ENV.mjs";

import Database from "./database/index.mjs";
import setENV from "./function/setENV.mjs";

const $ = new ENV("🍟 GetSomeFries: ♪ TikTok v0.2.0(3) response");

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

							if (body?.data?.chromium_open) body.data.chromium_open = 0;
							else $.log(`⚠ ⚠️ 警告, body.data.chromium_open 不存在`, "");

							$.log(`🚧 client_key_config: ${JSON.stringify(body?.data?.client_key_config)}`, "");
							if (body?.data?.client_key_config) body.data.client_key_config.client_key_sign_enabled = 0;
							else _.set(body, "data.client_key_config.client_key_sign_enabled", 0);

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

							$.log(`🚧 ttnet_h2_enabled: ${body?.data?.ttnet_h2_enabled}`, "");
							//body.data.ttnet_h2_enabled = 1;

							$.log(`🚧 ttnet_http_dns_enabled: ${body?.data?.ttnet_http_dns_enabled}`, "");
							body.data.ttnet_http_dns_enabled = 0;

							$.log(`🚧 ttnet_quic_enabled: ${body?.data?.ttnet_quic_enabled}`, "");
							body.data.ttnet_quic_enabled = 0;

							$.log(`🚧 ttnet_tt_http_dns: ${body?.data?.ttnet_tt_http_dns}`, "");
							body.data.ttnet_tt_http_dns = 0;

							if (body?.data?.ttnet_verify_api_config) body.data.ttnet_verify_api_config["5xx_enabled"] = 0;
							else _.set(body, "data.ttnet_verify_api_config.5xx_enabled", 0);
							$.log(`🚧 body: ${JSON.stringify(body)}`, "");
							break;
						case "/passport/auth/only_login/":
							break;
						case "/service/settings/v3/":
							break;
						case "/aweme/v1/cmpl/set/settings/":
							break;
						case "/aweme/v1/aweme/detail/":
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
							if (!body.user) {
								body.status_msg = "";
								body.status_code = 0;
								_.set(body, "user.sec_uid", url.searchParams.get("sec_user_id"));
								_.set(body, "user.uid", url.searchParams.get("user_id"));
							};
							break;
						case "/aweme/v1/commit/follow/user/":
							break;
						case "/tiktok/user/profile/other/v1":
							break;
						default:
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
	$.log(`☑️ process Aweme List`, "");
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
	$.log(`✅ process Aweme List`, "");
};
