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
README:https://github.com/VirgilClyne/GetSomeFries
*/

// Default Settings
var geolocation = {
	"policy": "ALLOW", //策略
	"country": "SG", // 国家
};
console.log(geolocation);
/*
geolocation.policy = "ALLOW";
geolocation.country = "SG"
*/
var config = {
	"allowWidevinePlayback": true, // 允许Widevine DRM回放
	"airPlayDisabledEnabledOnBuild": "50.0.0", // 开始禁用airPlay的版本
	"preferRichWebVTTOverImageBasedSubtitle": true, // 偏好使用RichWebVTT字幕多于图片字幕
	"requestRichWebVTTAsExperimental": true, //试验性请求RichWebVTT字幕
	"reuseAVPlayerEnabledOnBuild": "0", // 重新开始启用AVPlayer的版本
	"nfplayerReduxEnabledOnBuild": "50.0.0", // 开始启用nfplayerRedux的版本
};
console.log(config);
/*
config.allowWidevinePlayback = true;
config.airPlayDisabledEnabledOnBuild = "50.0.0";
config.preferRichWebVTTOverImageBasedSubtitle = true;
config.reuseAVPlayerEnabledOnBuild = "0";
config.nfplayerReduxEnabledOnBuild = "50.0.0";
*/

var ctx = {
	"region": "", // 当前IP所属地区
	//"monotonic": true, // 函数？
	//"device": "", // 当前使用设备
	"isolate_pool": true, // 隔离池？
	//"iter": 0,
	//"abtests":55, // AB测试
	//"ts":1642392069933, // timestamp？
	"ip": "",
	"hasUser": false // 当前IP是否有用户
};
console.log(ctx);

/*
// Argument Function Supported
if (typeof $argument != "undefined") {
	let arg = Object.fromEntries($argument.split("&").map((item) => item.split("=")));
	console.log(JSON.stringify(arg));
	geolocation.policy = arg.geolocation_policy
	geolocation.country = arg.geolocation_country;
	config.allowWidevinePlayback = Boolean(JSON.parse(arg.config_allowWidevinePlayback));
	config.airPlayDisabledEnabledOnBuild = arg.config_airPlayDisabledEnabledOnBuild;
	config.preferRichWebVTTOverImageBasedSubtitle = Boolean(JSON.parse(arg.config_preferRichWebVTTOverImageBasedSubtitle));
	config.reuseAVPlayerEnabledOnBuild = arg.config_reuseAVPlayerEnabledOnBuild;
	config.nfplayerReduxEnabledOnBuild = arg.config_nfplayerReduxEnabledOnBuild;
};
*/

const url = $request.url;
var body = $response.body;

const path1 = "/iosui/user";
const path2 = "/ftl/probe";

//Function Settings
if (url.search(path1) != -1) {
	console.log(path1);
	let content = JSON.parse(body);
	if (content.value?.geolocation?.country) content.value.geolocation.country = geolocation.country ? geolocation.country : content.value.geolocation.country;
	if (content.value?.config?.allowWidevinePlayback !== undefined) {
		console.log('before, allowWidevinePlayback:' + content.value.config.allowWidevinePlayback);
		content.value.config.allowWidevinePlayback = (config.allowWidevinePlayback !== undefined) ? config.allowWidevinePlayback : content.value.config.allowWidevinePlayback;
		console.log('after, allowWidevinePlayback:' + content.value.config.allowWidevinePlayback);
	}
	if (content.value?.config?.airPlayDisabledEnabledOnBuild) content.value.config.airPlayDisabledEnabledOnBuild = config.airPlayDisabledEnabledOnBuild ? config.airPlayDisabledEnabledOnBuild : content.value.config.airPlayDisabledEnabledOnBuild;
	if (content.value?.config?.preferRichWebVTTOverImageBasedSubtitle !== undefined) content.value.config.preferRichWebVTTOverImageBasedSubtitle = (config.preferRichWebVTTOverImageBasedSubtitle  !== undefined) ? config.preferRichWebVTTOverImageBasedSubtitle : content.value.config.preferRichWebVTTOverImageBasedSubtitle;
	if (content.value?.config?.reuseAVPlayerEnabledOnBuild) content.value.config.reuseAVPlayerEnabledOnBuild = config.reuseAVPlayerEnabledOnBuild ? config.reuseAVPlayerEnabledOnBuild : content.value.config.reuseAVPlayerEnabledOnBuild;
	if (content.value?.config?.nfplayerReduxEnabledOnBuild) content.value.config.nfplayerReduxEnabledOnBuild = config.nfplayerReduxEnabledOnBuild ? config.nfplayerReduxEnabledOnBuild : content.value.config.nfplayerReduxEnabledOnBuild;
	body = JSON.stringify(content);
	done({ body });
}

//Check IP Status
else if (url.search(path2) != -1) {
	console.log(path2);
	let content = JSON.parse(body);
	if (content.ctx?.hasUser !== undefined) {
		console.log('before, hasUser:' + content.ctx.hasUser);
		content.ctx.hasUser = (ctx.hasUser  !== undefined) ? ctx.hasUser : content.ctx.hasUser;
		console.log('after, hasUser:' + content.ctx.hasUser);
	}
	body = JSON.stringify(content);
	done({ body });
}

else done();