/*
README:https://github.com/VirgilClyne/GetSomeFries
*/

const $ = new Env('Netflix');

if (typeof $.getdata("GetSomeFries") != "undefined") {
	// BoxJs Function Supported
	// load user prefs from BoxJs
	$.Netflix = JSON.parse($.getdata("GetSomeFries")).Netflix
	$.log('before, Netflix:' + JSON.stringify($.Netflix))
	if ($.Netflix.config) {
		//$.log('before, Netflix.config:' + JSON.stringify($.Netflix.config))
		$.Netflix.config = Object.fromEntries($.Netflix.config.split("\n").map((item) => item.split("=")));
		//$.log('middle, Netflix.config:' + JSON.stringify($.Netflix.config))
		for (var item in $.Netflix.config) $.Netflix.config[item] = ($.Netflix.config[item] == "true") ? true : ($.Netflix.config[item] == "false") ? false : $.Netflix.config[item];
		//$.log('after, Netflix.config:' + JSON.stringify($.Netflix.config))
	};
	if ($.Netflix.ctx.hasUser != "AUTO") $.Netflix.ctx.hasUser = JSON.parse($.Netflix.ctx.hasUser);
	$.log('after, Netflix:' + JSON.stringify($.Netflix));
} else if (typeof $argument != "undefined") {
	// Argument Function Supported
	let arg = Object.fromEntries($argument.split("&").map((item) => item.split("=")));
	$.log(JSON.stringify(arg));
	$.Netflix.geolocation.policy = (arg.geolocation_policy == "AUTO") ? $.Netflix.geolocation.policy : arg.geolocation_policy
	$.Netflix.geolocation.country = arg.geolocation_country;
	if (arg.config) {
		$.Netflix.value.config = arg.config
		/*
		$.Netflix.config.allowWidevinePlayback = JSON.parse(arg.config_allowWidevinePlayback);
		$.Netflix.config.airPlayDisabledEnabledOnBuild = arg.config_airPlayDisabledEnabledOnBuild;
		$.Netflix.config.preferRichWebVTTOverImageBasedSubtitle = JSON.parse(arg.config_preferRichWebVTTOverImageBasedSubtitle);
		$.Netflix.config.requestRichWebVTTAsExperimental = JSON.parse(arg.config_requestRichWebVTTAsExperimental);
		$.Netflix.config.reuseAVPlayerEnabledOnBuild = arg.config_reuseAVPlayerEnabledOnBuild;
		$.Netflix.config.nfplayerReduxEnabledOnBuild = arg.config_nfplayerReduxEnabledOnBuild;
		*/
	}
	$.Netflix.ctx.region = arg.ctx_region;
	$.Netflix.ctx.device = (arg.ctx_device == "AUTO") ? $.Netflix.ctx.device : arg.ctx_device;
	$.Netflix.ctx.ip = arg.ctx_ip;
	$.Netflix.ctx.hasUser = (arg.ctx_hasUser == "AUTO") ? $.Netflix.ctx.hasUser : JSON.parse(arg.ctx_hasUser);
} else {
	// Default Settings
	$.Netflix = {
		"geolocation":{
			"policy":"ALLOW", //策略
			"country":"" // 国家
		},
		"config":{
			"allowWidevinePlayback": true, // 允许Widevine DRM回放
			"airPlayDisabledEnabledOnBuild": "50.0.0", // 开始禁用airPlay的版本
			"preferRichWebVTTOverImageBasedSubtitle": true, // 偏好使用RichWebVTT字幕多于图片字幕
			"requestRichWebVTTAsExperimental": true, //试验性请求RichWebVTT字幕
			"reuseAVPlayerEnabledOnBuild": "0", // 重新开始启用AVPlayer的版本
			"nfplayerReduxEnabledOnBuild": "50.0.0", // 开始启用nfplayerRedux的版本
		},
		"ctx":{
			"region": "", // 当前IP所属地区
			//"monotonic": true, // 函数？
			"device": "", // 当前使用设备
			//"isolate_pool": true, // 隔离池？
			//"iter": 0,
			//"abtests":55, // AB测试
			//"ts":1642392069933, // timestamp？
			"ip": "",
			"hasUser": false // 当前IP是否有用户
		}
	}	
};

const url = $request.url;
var body = $response.body;

const path1 = "/iosui/user";
const path2 = "/ftl/probe";

//Function Settings
if (url.search(path1) != -1) {
	$.log(path1);
	let content = JSON.parse(body);
	if (content.value?.geolocation?.policy) content.value.geolocation.policy = 	($.Netflix.geolocation.policy != "AUTO") ? $.Netflix.geolocation.policy : content.value.geolocation.policy;
	if (content.value?.geolocation?.country) content.value.geolocation.country = $.Netflix.geolocation.country ? $.Netflix.geolocation.country : content.value.geolocation.country;
	if (content.value?.geolocation) $.msg($.name, `已修改配置文件链接`, `策略: ${content.value.geolocation.policy}, 国家: ${content.value.geolocation.country}`)
	if (content.value?.config !== undefined && $.Netflix.value?.config !== undefined) {
		content.value.config = Object.assign(content.value.config, $.Netflix.value.config);
		$.log('after, content.value.config:' + JSON.stringify(content.value.config))
	};
	/*
	if (content.value?.config?.allowWidevinePlayback !== undefined) {
		$.log('before, allowWidevinePlayback:' + content.value.config.allowWidevinePlayback);
		content.value.config.allowWidevinePlayback = ($.Netflix.config.allowWidevinePlayback !== undefined) ? $.Netflix.config.allowWidevinePlayback : content.value.config.allowWidevinePlayback;
		$.log('after, allowWidevinePlayback:' + content.value.config.allowWidevinePlayback);
	}
	if (content.value?.config?.airPlayDisabledEnabledOnBuild) content.value.config.airPlayDisabledEnabledOnBuild = $.Netflix.config.airPlayDisabledEnabledOnBuild ? $.Netflix.config.airPlayDisabledEnabledOnBuild : content.value.config.airPlayDisabledEnabledOnBuild;
	if (content.value?.config?.preferRichWebVTTOverImageBasedSubtitle !== undefined) content.value.config.preferRichWebVTTOverImageBasedSubtitle = ($.Netflix.config.preferRichWebVTTOverImageBasedSubtitle  !== undefined) ? $.Netflix.config.preferRichWebVTTOverImageBasedSubtitle : content.value.config.preferRichWebVTTOverImageBasedSubtitle;
	if (content.value?.config?.reuseAVPlayerEnabledOnBuild) content.value.config.reuseAVPlayerEnabledOnBuild = $.Netflix.config.reuseAVPlayerEnabledOnBuild ? $.Netflix.config.reuseAVPlayerEnabledOnBuild : content.value.config.reuseAVPlayerEnabledOnBuild;
	if (content.value?.config?.nfplayerReduxEnabledOnBuild) content.value.config.nfplayerReduxEnabledOnBuild = $.Netflix.config.nfplayerReduxEnabledOnBuild ? $.Netflix.config.nfplayerReduxEnabledOnBuild : content.value.config.nfplayerReduxEnabledOnBuild;
	*/
	body = JSON.stringify(content);
	$.done({ body });
}

//Check IP Status
else if (url.search(path2) != -1) {
	$.log(path2);
	let content = JSON.parse(body);
	if (content.ctx?.region) content.ctx.region = $.Netflix.ctx.region ? $.Netflix.ctx.region : content.ctx.region;
	if (content.ctx?.device) content.ctx.device = ($.Netflix.ctx.device != "AUTO") ? $.Netflix.ctx.device : content.ctx.device;
	if (content.ctx?.ip) content.ctx.ip = $.Netflix.ctx.ip ? $.Netflix.ctx.ip : content.ctx.ip;
	if (content.ctx?.hasUser !== undefined) {
		$.log('before, hasUser:' + content.ctx.hasUser);
		content.ctx.hasUser = ($.Netflix.ctx.hasUser != "AUTO") ? $.Netflix.ctx.hasUser : content.ctx.hasUser;
		$.log('after, hasUser:' + content.ctx.hasUser);
	}
	if (content.ctx) $.msg($.name, `已修改IP检测链接`, `地区: ${content.ctx?.region}, 设备: ${content.ctx?.device}, IP: ${content.ctx?.ip}, 已有用户: ${content.ctx?.hasUser}`)
	body = JSON.stringify(content);
	$.done({ body });
}

else $.done();


/***************** Env *****************/
// prettier-ignore
// https://github.com/chavyleung/scripts/blob/master/Env.min.js
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}isShadowrocket(){return"undefined"!=typeof $rocket}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){if(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:i,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:i,statusCode:r,headers:o,rawBody:h},s.decode(h,this.encoding))},t=>{const{message:i,response:r}=t;e(i,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let i=require("iconv-lite");this.initGotEnv(t);const{url:r,...o}=t;this.got[s](r,o).then(t=>{const{statusCode:s,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:s,statusCode:r,headers:o,rawBody:h},i.decode(h,this.encoding))},t=>{const{message:s,response:r}=t;e(s,r,r&&i.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl,i=rawOpts["update-pasteboard"]||rawOpts.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard":i}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
