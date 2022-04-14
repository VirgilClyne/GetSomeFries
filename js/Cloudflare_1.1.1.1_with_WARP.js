/*
README:https://github.com/VirgilClyne/GetSomeFries
*/

const $ = new Env("Cloudflare 1.1.1.1 with WARP v1.5.0");
const DataBase = {
	Cloudflare: {"WARP":{"Verify":{"License":null,"Mode":"Token","Content":null,"RegistrationId":null},"env":{"Version":"v0i2109031904","deviceType":"iOS","Type":"i"}}},
	WireGuard: {"config":{"interface":{"addresses":{"v4":"","v6":""}},"peers":[{"public_key":"","endpoint":{"host":"","v4":"","v6":""}}]},"PrivateKey":"","PublicKey":""}
};
const { url, method, headers } = $request
let body = ""
$.log(`🚧 ${$.name}`, `url: ${url}`, `method: ${method}`, "");

/***************** Processing *****************/
!(async () => {
	const { Type, WARP, WireGuard } = await setENV(url, DataBase);
	if (typeof $request != "undefined") { // 是请求
		if (Type == "RegistrationId") { // 是指定链接
			if (typeof $request.body != "undefined") { // 有请求体
				body = $request.body
				if (method == "PUT") { // 是PUT方法
					$.log(method);
					_data = JSON.parse(body)
					if (_data.key) {
						_data.key = WireGuard.PublicKey;
						$.msg($.name, "客户端公钥已替换", `当前公钥为:\n${WireGuard.PublicKey}`);
						//$.log($.name, "客户端公钥已替换", `当前公钥为: ${WireGuard.PublicKey}`, '');
					}
					body = JSON.stringify(_data);
				}
			}
		}
	}
	if (typeof $response != "undefined") { // 是回复
		if (Type == "Registration") { // 是链接
			if (typeof $response?.body != "undefined") { // 有回复体
				body = $response.body
				if (method == "PUT" || method == "GET") { // 是PUT或GET方法
					_data = JSON.parse(body)
					if (Array.isArray(_data.messages) && _data.messages.length != 0) _data.messages.forEach(element => {
						if (element.code !== 10000) $.msg($.name, `code: ${element.code}`, `message: ${element.message}`);
					})
					if (_data.success === true) {
						if (_data.ip) resolve(_data.ip);
						else if (Array.isArray(_data.result) && _data.result.length != 0) resolve(_data.result[0]);
						else if (_data.result) {
							var matchTokenReg = /Bearer (\S*)/
							let Token = headers['Authorization'].match(matchTokenReg)[1]
							if (_data.result.id.startsWith('t.')) {
								$.msg($.name, "检测到WARP Teams配置文件", `设备注册ID:\n${_data.result.id}\n设备令牌Token:\n${Token}\n账户类型:${_data.result.account.account_type}\n账户组织:${_data.result.account.organization}\n客户端公钥:\n${_data.result.key}\n节点公钥:\n${_data.result.config.peers[0].public_key}`);
								//$.log($.name, "检测到WARP Teams配置文件", `设备注册ID/id: ${_data.result.id}`, `设备令牌Token: ${Token}`, `账户ID/account.id: ${_data.result.account.id}`, `账户类型/account.account_type: ${_data.result.account.account_type}`, `账户组织/account.organization: ${_data.result.account.organization}`, `客户端公钥/key: ${_data.result.key}`, `节点公钥/config.peers[0].public_key: ${_data.result.config.peers[0].public_key}`, '', `原始配置文件:\n${JSON.stringify(_data.result)}`);
								$.log($.name, "检测到WARP Teams配置文件", `原始配置文件:\n注意！文本内容未转义！字符串中可能包含额外字符！\n${JSON.stringify(_data.result)}`, '');
							} else {
								$.msg($.name, "检测到WARP Personal配置文件", `设备注册ID:\n${_data.result.id}\n设备令牌Token:\n${Token}\nWARP启用状态: ${_data.result.warp_enabled},账户类型:${_data.result.account.account_type},WARP+:${_data.result.account.warp_plus},WARP+流量:${_data.result.account.premium_data},邀请人数:${_data.result.account.referral_count}\n许可证/account.license:\n${_data.result.account.license}\n客户端公钥:\n${_data.result.key}\n节点公钥:\n${_data.result.config.peers[0].public_key}`);
								//$.log($.name, "检测到WARP Personal配置文件", `设备注册ID/id: ${_data.result.id}`, `设备令牌Token: ${Token}`, `WARP启用状态/warp_enabled: ${_data.result.warp_enabled}`, `账户ID/account.id: ${_data.result.account.id}`, `许可证/account.license: ${_data.result.account.license}`, `账户类型/account.account_type: ${_data.result.account.account_type}`, `WARP+/account.warp_plus: ${_data.result.account.warp_plus}`, `WARP+流量/account.premium_data: ${_data.result.account.premium_data}`, `邀请人数/account.referral_count: ${_data.result.account.referral_count}`, `客户端公钥/key: ${_data.result.key}`, `节点公钥/config.peers[0].public_key: ${_data.result.config.peers[0].public_key}`, '', `原始配置文件:\n${JSON.stringify(_data.result)}`);
								$.log($.name, "检测到WARP Personal配置文件", `原始配置文件:\n注意！文本内容未转义！字符串中可能包含额外字符！\n${JSON.stringify(_data.result)}`, '');
							}
						}
					} else if (_data.success === false) {
						if (Array.isArray(_data.errors) && _data.errors.length != 0) _data.errors.forEach(element => { $.msg($.name, `code: ${element.code}`, `message: ${element.message}`); })
					}
				}
			}
		}
	}
})()
	.catch((e) => $.logErr(e))
	.finally(() => $.done({ headers, body }))

/***************** Function *****************/
// Set Environment Variables
async function setENV(url, database) {
	$.log(`⚠ ${$.name}, Set Environment Variables`, "");
	/***************** BoxJs *****************/
	// 包装为局部变量，用完释放内存
	// BoxJs的清空操作返回假值空字符串, 逻辑或操作符会在左侧操作数为假值时返回右侧操作数。
	let BoxJs = $.getjson("GetSomeFries", database) // BoxJs
	//$.log(`🚧 ${$.name}, Set Environment Variables`, `$.BoxJs类型: ${typeof $.BoxJs}`, `$.BoxJs内容: ${JSON.stringify($.BoxJs)}`, "");
	/***************** Cloudflare *****************/
	let WARP = BoxJs?.Cloudflare?.WARP || database.Cloudflare.WARP;
	$.log(`🚧 ${$.name}, Set Environment Variables`, `WARP: ${JSON.stringify(WARP)}`, "");
	if (WARP?.Verify?.Mode == "Key") {
		WARP.Verify.Content = Array.from(WARP.Verify.Content.split("\n"))
		//$.log(JSON.stringify(WARP.Verify.Content))
	};
	/***************** WireGuard *****************/
	let WireGuard = BoxJs?.WireGuard || database?.WireGuard;
	$.log(`🚧 ${$.name}, Set Environment Variables`, `WireGuard: ${JSON.stringify(WireGuard)}`, "");
	/***************** Argument *****************/
	if (typeof $argument != "undefined") {
		$.log(`🎉 ${$.name}, $Argument`);
		let arg = Object.fromEntries($argument.split("&").map((item) => item.split("=")));
		$.log(JSON.stringify(arg));
		WARP.Verify.License = arg.License;
		WARP.Verify.Mode = arg.Mode;
		WARP.Verify.Content = arg.AccessToken;
		WARP.Verify.Content = arg.ServiceKey;
		WARP.Verify.Content[0] = arg.Key;
		WARP.Verify.Content[1] = arg.Email;
		WARP.Verify.RegistrationId = arg.RegistrationId;
		WireGuard.PrivateKey = arg.PrivateKey;
		WireGuard.PublicKey = arg.PublicKey;
		WARP.env.Version = arg.Version;
		WARP.env.deviceType = arg.deviceType;
	};
	$.log(`🚧 ${$.name}, Set Environment Variables`, `WARP类型: ${typeof WARP}`, `WARP内容: ${JSON.stringify(WARP)}`, "");
	/***************** Platform *****************/
	const Type = RegExp(`/reg/${WARP.Verify.RegistrationId}`, "i").test(url) ? "RegistrationId"
		: /reg/i.test(url) ? "Registration"
			: undefined
	$.log(`🚧 ${$.name}, Set Environment Variables`, `Type: ${Type}`, "");
	return { Type, WARP, WireGuard };
};

/***************** Env *****************/
// prettier-ignore
// https://github.com/chavyleung/scripts/blob/master/Env.min.js
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}isShadowrocket(){return"undefined"!=typeof $rocket}isStash(){return"undefined"!=typeof $environment&&$environment["stash-version"]}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){if(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:i,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:i,statusCode:r,headers:o,rawBody:h},s.decode(h,this.encoding))},t=>{const{message:i,response:r}=t;e(i,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let i=require("iconv-lite");this.initGotEnv(t);const{url:r,...o}=t;this.got[s](r,o).then(t=>{const{statusCode:s,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:s,statusCode:r,headers:o,rawBody:h},i.decode(h,this.encoding))},t=>{const{message:s,response:r}=t;e(s,r,r&&i.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl,i=t["update-pasteboard"]||t.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard":i}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
