/*
README:https://github.com/VirgilClyne/GetSomeFries
*/

const $ = new Env("1.1.1.1 by Cloudflare v2.0.0-response-beta");
const DataBase = {
	Cloudflare: {"WARP":{"Verify":{"License":null,"Mode":"Token","Content":null,"RegistrationId":null},"env":{"Version":"v0i2109031904","deviceType":"iOS","Type":"i"}}},
	WireGuard: {"config":{"interface":{"addresses":{"v4":"","v6":""}},"peers":[{"public_key":"","endpoint":{"host":"","v4":"","v6":""}}]},"PrivateKey":"","PublicKey":""}
};
const { url, method, headers } = $request
$.log(`🚧 ${$.name}`, `url: ${url}`, `method: ${method}`, "");

/***************** Processing *****************/
!(async () => {
	const { Type, WARP, WireGuard } = await setENV("GetSomeFries", url, DataBase);
	if (Type === "Registration") { // 是链接
		if (typeof $response?.body != "undefined") { // 有回复体
			if (method === "PUT" || method === "GET") { // 是PUT或GET方法
				body = JSON.parse($response.body);
				if (Array.isArray(body.messages) && body.messages.length != 0) body.messages.forEach(element => {
					if (element.code !== 10000) $.msg($.name, `code: ${element.code}`, `message: ${element.message}`);
				})
				if (body.success === true) {
					if (body.ip) resolve(body.ip);
					else if (Array.isArray(body.result) && body.result.length != 0) resolve(body.result[0]);
					else if (body.result) {
						var matchTokenReg = /Bearer (\S*)/
						let Token = headers?.authorization?.match(matchTokenReg)?.[1] ?? headers?.Authorization?.match(matchTokenReg)?.[1]
						if (body.result.id.startsWith('t.')) {
							$.msg($.name, "检测到WARP Teams配置文件", `设备注册ID:\n${body.result.id}\n设备令牌Token:\n${Token}\n账户类型:${body.result.account.account_type}\n账户组织:${body.result.account.organization}\n客户端公钥:\n${body.result.key}\n节点公钥:\n${body.result.config.peers[0].public_key}`);
							//$.log($.name, "检测到WARP Teams配置文件", `设备注册ID/id: ${body.result.id}`, `设备令牌Token: ${Token}`, `账户ID/account.id: ${body.result.account.id}`, `账户类型/account.account_type: ${body.result.account.account_type}`, `账户组织/account.organization: ${body.result.account.organization}`, `客户端公钥/key: ${body.result.key}`, `节点公钥/config.peers[0].public_key: ${body.result.config.peers[0].public_key}`, '', `原始配置文件:\n${JSON.stringify(body.result)}`);
							$.log($.name, "检测到WARP Teams配置文件", `原始配置文件:\n注意！文本内容未转义！字符串中可能包含额外字符！\n${JSON.stringify(body.result)}`, '');
						} else {
							$.msg($.name, "检测到WARP Personal配置文件", `设备注册ID:\n${body.result.id}\n设备令牌Token:\n${Token}\nWARP启用状态: ${body.result.warp_enabled},账户类型:${body.result.account.account_type},WARP+:${body.result.account.warp_plus},WARP+流量:${body.result.account.premiumbody},邀请人数:${body.result.account.referral_count}\n许可证/account.license:\n${body.result.account.license}\n客户端公钥:\n${body.result.key}\n节点公钥:\n${body.result.config.peers[0].public_key}`);
							//$.log($.name, "检测到WARP Personal配置文件", `设备注册ID/id: ${body.result.id}`, `设备令牌Token: ${Token}`, `WARP启用状态/warp_enabled: ${body.result.warp_enabled}`, `账户ID/account.id: ${body.result.account.id}`, `许可证/account.license: ${body.result.account.license}`, `账户类型/account.account_type: ${body.result.account.account_type}`, `WARP+/account.warp_plus: ${body.result.account.warp_plus}`, `WARP+流量/account.premiumbody: ${body.result.account.premiumbody}`, `邀请人数/account.referral_count: ${body.result.account.referral_count}`, `客户端公钥/key: ${body.result.key}`, `节点公钥/config.peers[0].public_key: ${body.result.config.peers[0].public_key}`, '', `原始配置文件:\n${JSON.stringify(body.result)}`);
							$.log($.name, "检测到WARP Personal配置文件", `原始配置文件:\n注意！文本内容未转义！字符串中可能包含额外字符！\n${JSON.stringify(body.result)}`, '');
						}
					}
				} else if (body.success === false) {
					if (Array.isArray(body.errors) && body.errors.length != 0) body.errors.forEach(element => { $.msg($.name, `code: ${element.code}`, `message: ${element.message}`); })
				}
				$response.body = JSON.stringify(body);
			}
		}
	}
})()
	.catch((e) => $.logErr(e))
	.finally(() => {
		if ($.isQuanX()) $.done({ body: $response.body })
		else $.done($response)
	})

/*
if (url.search(path1) != -1) {
	$.log(path1);
	if ($request.method == "GET") {

		var body = $response.body
		body = JSON.parse(body)
		if (Array.isArray(body.messages) && body.messages.length != 0) body.messages.forEach(element => {
			if (element.code !== 10000) $.msg($.name, `code: ${element.code}`, `message: ${element.message}`);
		})
		if (body.success === true) {
			if (body.ip) resolve(body.ip);
			else if (Array.isArray(body.result) && body.result.length != 0) resolve(body.result[0]);
			else if (body.result) {
				var matchTokenReg = /Bearer (\S*)/
				let Token = headers['Authorization'].match(matchTokenReg)[1]
				if (body.result.id.startsWith('t.')) {
					$.msg($.name, "检测到WARP Teams配置文件", `设备注册ID:\n${body.result.id}\n设备令牌Token:\n${Token}\n账户类型:${body.result.account.account_type}\n账户组织:${body.result.account.organization}\n客户端公钥:\n${body.result.key}\n节点公钥:\n${body.result.config.peers[0].public_key}`);
					//$.log($.name, "检测到WARP Teams配置文件", `设备注册ID/id: ${body.result.id}`, `设备令牌Token: ${Token}`, `账户ID/account.id: ${body.result.account.id}`, `账户类型/account.account_type: ${body.result.account.account_type}`, `账户组织/account.organization: ${body.result.account.organization}`, `客户端公钥/key: ${body.result.key}`, `节点公钥/config.peers[0].public_key: ${body.result.config.peers[0].public_key}`, '', `原始配置文件:\n${JSON.stringify(body.result)}`);
					$.log($.name, "检测到WARP Teams配置文件", `原始配置文件:\n注意！文本内容未转义！字符串中可能包含额外字符！\n${JSON.stringify(body.result)}`, '');
				} else {
					$.msg($.name, "检测到WARP Personal配置文件", `设备注册ID:\n${body.result.id}\n设备令牌Token:\n${Token}\nWARP启用状态: ${body.result.warp_enabled},账户类型:${body.result.account.account_type},WARP+:${body.result.account.warp_plus},WARP+流量:${body.result.account.premiumbody},邀请人数:${body.result.account.referral_count}\n许可证/account.license:\n${body.result.account.license}\n客户端公钥:\n${body.result.key}\n节点公钥:\n${body.result.config.peers[0].public_key}`);
					//$.log($.name, "检测到WARP Personal配置文件", `设备注册ID/id: ${body.result.id}`, `设备令牌Token: ${Token}`, `WARP启用状态/warp_enabled: ${body.result.warp_enabled}`, `账户ID/account.id: ${body.result.account.id}`, `许可证/account.license: ${body.result.account.license}`, `账户类型/account.account_type: ${body.result.account.account_type}`, `WARP+/account.warp_plus: ${body.result.account.warp_plus}`, `WARP+流量/account.premiumbody: ${body.result.account.premiumbody}`, `邀请人数/account.referral_count: ${body.result.account.referral_count}`, `客户端公钥/key: ${body.result.key}`, `节点公钥/config.peers[0].public_key: ${body.result.config.peers[0].public_key}`, '', `原始配置文件:\n${JSON.stringify(body.result)}`);
					$.log($.name, "检测到WARP Personal配置文件", `原始配置文件:\n注意！文本内容未转义！字符串中可能包含额外字符！\n${JSON.stringify(body.result)}`, '');
				}
			}
		} else if (body.success === false) {
			if (Array.isArray(body.errors) && body.errors.length != 0) body.errors.forEach(element => { $.msg($.name, `code: ${element.code}`, `message: ${element.message}`); })
		}

	} else if ($request.method == "PUT") {
		if (url.search(path2) != -1) {
			$.log(path2);
			if (typeof $request?.body != "undefined") {
				var body = $request.body
				body = JSON.parse(body)
				if (body.key) {
					body.key = $.WireGuard.PublicKey;
					$.msg($.name, "客户端公钥已替换", `当前公钥为:\n${$.WireGuard.PublicKey}`);
					//$.log($.name, "客户端公钥已替换", `当前公钥为: ${$.WireGuard.PublicKey}`, '');
				}
				body = JSON.stringify(body);
				$.done({ body });
			}
			$.done();
		}
	}
}
$.done();


//Check Key and Rewrite
if (url.search(path1) != -1 && $request.method == "PUT") {
	$.log(path1);
	if (typeof $request?.body != "undefined") {
		var body = $request.body
		body = JSON.parse(body)
		if (body.key) {
			body.key = $.WireGuard.PublicKey;
			$.msg($.name, "客户端公钥已替换", `当前公钥为:\n${$.WireGuard.PublicKey}`);
			//$.log($.name, "客户端公钥已替换", `当前公钥为: ${$.WireGuard.PublicKey}`, '');
		}
		body = JSON.stringify(body);
		$.done({ body });
	}
	$.done();
} 

//Check Config
else if (url.search(path2) != -1 && $request.method == "GET") {
	$.log(path2);
	if (typeof $response?.body != "undefined") {
		var body = $response.body
		body = JSON.parse(body)
		if (Array.isArray(body.messages) && body.messages.length != 0) body.messages.forEach(element => {
			if (element.code !== 10000) $.msg($.name, `code: ${element.code}`, `message: ${element.message}`);
		})
		if (body.success === true) {
			if (body.ip) resolve(body.ip);
			else if (Array.isArray(body.result) && body.result.length != 0) resolve(body.result[0]);
			else if (body.result) {
				var matchTokenReg = /Bearer (\S*)/
				let Token = headers['Authorization'].match(matchTokenReg)[1]
				if (body.result.id.startsWith('t.')) {					
					$.msg($.name, "检测到WARP Teams配置文件", `设备注册ID:\n${body.result.id}\n设备令牌Token:\n${Token}\n账户类型:${body.result.account.account_type}\n账户组织:${body.result.account.organization}\n客户端公钥:\n${body.result.key}\n节点公钥:\n${body.result.config.peers[0].public_key}`);
					//$.log($.name, "检测到WARP Teams配置文件", `设备注册ID/id: ${body.result.id}`, `设备令牌Token: ${Token}`, `账户ID/account.id: ${body.result.account.id}`, `账户类型/account.account_type: ${body.result.account.account_type}`, `账户组织/account.organization: ${body.result.account.organization}`, `客户端公钥/key: ${body.result.key}`, `节点公钥/config.peers[0].public_key: ${body.result.config.peers[0].public_key}`, '', `原始配置文件:\n${JSON.stringify(body.result)}`);
					$.log($.name, "检测到WARP Teams配置文件", `原始配置文件:\n注意！文本内容未转义！字符串中可能包含额外字符！\n${JSON.stringify(body.result)}`, '');

				} else {
					$.msg($.name, "检测到WARP Personal配置文件", `设备注册ID:\n${body.result.id}\n设备令牌Token:\n${Token}\nWARP启用状态: ${body.result.warp_enabled},账户类型:${body.result.account.account_type},WARP+:${body.result.account.warp_plus},WARP+流量:${body.result.account.premiumbody},邀请人数:${body.result.account.referral_count}\n许可证/account.license:\n${body.result.account.license}\n客户端公钥:\n${body.result.key}\n节点公钥:\n${body.result.config.peers[0].public_key}`);
					//$.log($.name, "检测到WARP Personal配置文件", `设备注册ID/id: ${body.result.id}`, `设备令牌Token: ${Token}`, `WARP启用状态/warp_enabled: ${body.result.warp_enabled}`, `账户ID/account.id: ${body.result.account.id}`, `许可证/account.license: ${body.result.account.license}`, `账户类型/account.account_type: ${body.result.account.account_type}`, `WARP+/account.warp_plus: ${body.result.account.warp_plus}`, `WARP+流量/account.premiumbody: ${body.result.account.premiumbody}`, `邀请人数/account.referral_count: ${body.result.account.referral_count}`, `客户端公钥/key: ${body.result.key}`, `节点公钥/config.peers[0].public_key: ${body.result.config.peers[0].public_key}`, '', `原始配置文件:\n${JSON.stringify(body.result)}`);
					$.log($.name, "检测到WARP Personal配置文件", `原始配置文件:\n注意！文本内容未转义！字符串中可能包含额外字符！\n${JSON.stringify(body.result)}`, '');

				}
			}
		} else if (body.success === false) {
			if (Array.isArray(body.errors) && body.errors.length != 0) body.errors.forEach(element => { $.msg($.name, `code: ${element.code}`, `message: ${element.message}`); })
		}
	}
	$.done();
}
else $.done();
*/

/***************** Function *****************/
/**
 * Set Environment Variables
 * @author VirgilClyne
 * @param {String} name - Persistent Store Key
 * @param {String} url - Request URL
 * @param {Object} database - Default DataBase
 * @return {Promise<*>}
 */
async function setENV(e,i,t){let r=$.getjson(e,t),n=r?.Cloudflare?.WARP||t.Cloudflare.WARP;"Key"==n?.Verify?.Mode&&(n.Verify.Content=Array.from(n.Verify.Content.split("\n")));let o=r?.WireGuard||t?.WireGuard;if("undefined"!=typeof $argument){let e=Object.fromEntries($argument.split("&").map((e=>e.split("="))));n.Verify.License=e.License,n.Verify.Mode=e.Mode,n.Verify.Content=e.AccessToken,n.Verify.Content=e.ServiceKey,n.Verify.Content[0]=e.Key,n.Verify.Content[1]=e.Email,n.Verify.RegistrationId=e.RegistrationId,o.PrivateKey=e.PrivateKey,o.PublicKey=e.PublicKey,n.env.Version=e.Version,n.env.deviceType=e.deviceType}return{Type:RegExp(`/reg/${n.Verify.RegistrationId}`,"i").test(i)?"RegistrationId":/reg/i.test(i)?"Registration":void 0,WARP:n,WireGuard:o}}

/***************** Env *****************/
// prettier-ignore
// https://github.com/chavyleung/scripts/blob/master/Env.min.js
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}isShadowrocket(){return"undefined"!=typeof $rocket}isStash(){return"undefined"!=typeof $environment&&$environment["stash-version"]}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){if(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:i,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:i,statusCode:r,headers:o,rawBody:h},s.decode(h,this.encoding))},t=>{const{message:i,response:r}=t;e(i,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let i=require("iconv-lite");this.initGotEnv(t);const{url:r,...o}=t;this.got[s](r,o).then(t=>{const{statusCode:s,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:s,statusCode:r,headers:o,rawBody:h},i.decode(h,this.encoding))},t=>{const{message:s,response:r}=t;e(s,r,r&&i.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl,i=t["update-pasteboard"]||t.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard":i}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
