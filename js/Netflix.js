// 判断是否是重写
const isRequest = typeof $request != "undefined";
const isResponse = typeof $response != "undefined";
// 判断是否是Surge
const isSurge = typeof $httpClient != "undefined";
// 判断是否是QuanX
const isQuanX = typeof $task != "undefined";
// 判断是否是Loon
const isLoon = typeof $loon != "undefined";
// 关闭请求
const done = (value = {}) => {
	if (isQuanX) return $done(value);
	if (isSurge) isRequest ? $done(value) : $done();
};

/*
README:https://github.com/VirgilClyne/iRingo
*/

// Default Settings
geolocation = {};
geolocation.policy = "ALLOW";
geolocation.country = "SG"
allowWidevinePlayback = true;
airPlayDisabledEnabledOnBuild = "0";
//preferRichWebVTTOverImageBasedSubtitle = true;
reuseAVPlayerEnabledOnBuild = "0";
nfplayerReduxEnabledOnBuild = "0";

// Argument Function Supported
if (typeof $argument != "undefined") {
	let arg = Object.fromEntries($argument.split("&").map((item) => item.split("=")));
	console.log(JSON.stringify(arg));
	geolocation.policy = arg.geolocation.policy
	geolocation.country = arg.geolocation.country;
	allowWidevinePlayback = arg.allowWidevinePlayback;
	airPlayDisabledEnabledOnBuild = arg.airPlayDisabledEnabledOnBuild;
	//preferRichWebVTTOverImageBasedSubtitle = arg.preferRichWebVTTOverImageBasedSubtitle;
	reuseAVPlayerEnabledOnBuild = arg.reuseAVPlayerEnabledOnBuild;
	nfplayerReduxEnabledOnBuild = arg.nfplayerReduxEnabledOnBuild;
};

const url = $request.url;

const path1 = "/iosui/user/";

if (url.search(path1) != -1) {
	let body = $response.body;
	console.log(path1);
	let content = JSON.parse(body);
	if (content.value?.geolocation?.policy) content.value.geolocation.policy = geolocation.policy
	if (content.value?.geolocation?.country) content.value.geolocation.country = geolocation.country;
	if (content.value?.config?.allowWidevinePlayback) content.value.config.allowWidevinePlayback = allowWidevinePlayback;
	if (content.value?.config?.airPlayDisabledEnabledOnBuild) content.value.config.airPlayDisabledEnabledOnBuild = airPlayDisabledEnabledOnBuild;
	//if (content.value?.config?.preferRichWebVTTOverImageBasedSubtitle) content.value.config.preferRichWebVTTOverImageBasedSubtitle = preferRichWebVTTOverImageBasedSubtitle;
	if (content.value?.config?.nfplayerReduxEnabledOnBuild) content.value.config.nfplayerReduxEnabledOnBuild = nfplayerReduxEnabledOnBuild;
	body = JSON.stringify(content);
	done({ body });
};
