/*
README:https://github.com/VirgilClyne/GetSomeFries
*/

// refer:https://github.com/ViRb3/wgcf
// refer:https://github.com/yyuueexxiinngg/some-scripts/blob/master/cloudflare/warp2wireguard.js

const $ = new Env('Cloudflare WARP');
$.VAL = {
	// Endpoints
	// https://api.cloudflare.com/#getting-started-endpoints
	"url": "https://api.cloudflareclient.com",
	"headers": {
		"Host": "api.cloudflareclient.com",
		"Authorization": null,
		"Content-Type": "application/json",
		"User-Agent": "1.1.1.1/2109031904.1 CFNetwork/1327.0.4 Darwin/21.2.0",
		//"User-Agent": "1.1.1.1/1909221500.1 CFNetwork/978.0.7 Darwin/18.7.0",
		//"User-Agent": "okhttp/3.12.1",
		//"User-Agent": "WARP",
		"CF-Client-Version": "i-6.7-2109031904.1"
		//"CF-Client-Version": "m-2021.12.1.0-0",
		//"CF-Client-Version": "a-6.3-1922",
		//"Debug": false
	}
};

// Default Settings
$.Cloudflare = { "WARP": { "Verify": { "License": null, "Mode": "Token", "Content": null, "RegistrationId": null }, "env": { "Version": "v0i2109031904", "deviceType": "iOS", "Type": "i" } } };
// BoxJs Function Supported
if ($.getdata("GetSomeFries") !== null) {
	// load user prefs from BoxJs
	$.Cloudflare = JSON.parse($.getdata("GetSomeFries")).Cloudflare
	$.WireGuard = JSON.parse($.getdata("GetSomeFries")).WireGuard
	//$.log(JSON.stringify($.Cloudflare.WARP))
	if ($.Cloudflare.WARP.Verify.Mode == "Key") {
		$.Cloudflare.WARP.Verify.Content = Array.from($.Cloudflare.WARP.Verify.Content.split("\n"))
		//$.log(JSON.stringify($.Cloudflare.WARP.Verify.Content))
	};
}
// Argument Function Supported
else if (typeof $argument != "undefined") {
	let arg = Object.fromEntries($argument.split("&").map((item) => item.split("=")));
	$.log(JSON.stringify(arg));
	$.Cloudflare.WARP.Verify.License = arg.License;
	$.Cloudflare.WARP.Verify.Mode = arg.Mode;
	$.Cloudflare.WARP.Verify.Content = arg.AccessToken;
	$.Cloudflare.WARP.Verify.Content = arg.ServiceKey;
	$.Cloudflare.WARP.Verify.Content[0] = arg.Key;
	$.Cloudflare.WARP.Verify.Content[1] = arg.Email;
	$.Cloudflare.WARP.Verify.RegistrationId = arg.RegistrationId;
	$.WireGuard.PrivateKey = arg.PrivateKey;
	$.WireGuard.PublicKey = arg.PublicKey;
	$.Cloudflare.WARP.env.Version = arg.Version;
	$.Cloudflare.WARP.env.deviceType = arg.deviceType;
}
console.log($.Cloudflare.WARP)

/***************** async *****************/

!(async () => {
	//Step 1
	await setupVAL($.Cloudflare.WARP.Verify, $.Cloudflare.WARP.env)
	//Step 2
	await WARP($.Cloudflare.WARP.setupMode, $.Cloudflare.WARP.env, $.WireGuard.PrivateKey, $.WireGuard.PublicKey, $.Cloudflare.WARP.Verify)
})()
	.catch((e) => $.logErr(e))
	.finally(() => $.done())

/***************** async *****************/

//Step 1
//Setup Environment
async function setupVAL(Verify, env) {
	$.log('设置运行环境');
	//设置设备环境
	if (env.deviceType == "iOS") {
		$.Cloudflare.WARP.env.Type = "i";
		$.Cloudflare.WARP.env.Version = "v0i2109031904";
		$.VAL.headers["User-Agent"] = "1.1.1.1/2109031904.1 CFNetwork/1327.0.4 Darwin/21.2.0";
		$.VAL.headers["CF-Client-Version"] = "i-6.7-2109031904.1";
	} else if (env.deviceType == "macOS") {
		$.Cloudflare.WARP.env.Type = "m";
		$.VAL.headers["User-Agent"] = "1.1.1.1/2109031904.1 CFNetwork/1327.0.4 Darwin/21.2.0";
		$.VAL.headers["CF-Client-Version"] = "m-2021.12.1.0-0";
	} else if (env.deviceType == "Android") {
		$.Cloudflare.WARP.env.Type = "a";
		$.Cloudflare.WARP.env.Version = "v0a1922";
		$.VAL.headers["User-Agent"] = "okhttp/3.12.1";
		$.VAL.headers["CF-Client-Version"] = "a-6.3-1922";
	} else if (env.deviceType == "Windows") {
		$.Cloudflare.WARP.env.Type = "w";
	} else if (env.deviceType == "Liunx") {
		$.Cloudflare.WARP.env.Type = "l";
	} else {
		$.logErr('无可用设备类型', `deviceType=${env.deviceType}`, '');
		$.done();
	};
	//设置验证方式
	if (Verify.Mode == "Token" && typeof Verify.Content != "undefined") {
		$.VAL.headers.Authorization = `Bearer ${Verify.Content}`;
	} else if (Verify.Mode == "ServiceKey" && typeof Verify.Content != "undefined") {
		$.VAL.headers['X-Auth-User-Service-Key'] = Verify.Content;
	} else if (Verify.Mode == "Key" && typeof Verify.Content != "undefined") {
		$.VAL.headers['X-Auth-Key'] = Verify.Content[0];
		$.VAL.headers['X-Auth-Email'] = Verify.Content[1];
	} else {
		$.logErr('无可用授权方式', `Mode=${Verify.Mode}`, `Content=${Verify.Content}`, '');
		$.done();
	};
}

//Step 2
async function WARP(setupMode, env, privateKey, publicKey, Verify) {
	try {
		$.log(`开始运行,模式:${setupMode}`, '');
		if (setupMode == "RegisterNewAccount") {
			if (!Verify.RegistrationId) {
				$.log('无设备ID(RegistrationId)', '');
				var result = await regAccount(env.Version, null, publicKey, env.Locale, env.deviceModel, env.Type, env.warp_enabled);
				$.log('生成完成,妥善保管以下四个凭证', `帐户ID:${result.account.id}`, '账户ID:等同于匿名账号', `许可证:${result.account.license}`, '许可证:可付费购买的订阅，流量，邀请奖励均绑定于许可证，一个许可证可以绑定5个设备(注册ID)', `注册ID:${result.id}`, '注册ID:相当于WARP的客户端或设备ID，配置信息均关联到此注册ID', `令牌:${result.token}`, '令牌:相当于密码，更新读取对应账号所需，如果要更新注册ID的配置或者更改关联的许可证，需要此令牌验证收发数据', '');
			} else {
				$.log(`不符合模式:${setupMode}运行要求，退出`, '');
				$.done();
			}
		} else if (setupMode == "RegisterNewAccountwithPublicKey") {
			if (!Verify.RegistrationId && privateKey && publicKey) {
				$.log('无设备ID(RegistrationId)', '');
				var result = await regAccount(env.Version, null, publicKey, env.Locale, env.deviceModel, env.Type, env.warp_enabled);
				$.log('生成完成,妥善保管以下四个凭证', `帐户ID:${result.account.id}`, '账户ID:等同于匿名账号', `许可证:${result.account.license}`, '许可证:可付费购买的订阅，流量，邀请奖励均绑定于许可证，一个许可证可以绑定5个设备(注册ID)', `注册ID:${result.id}`, '注册ID:相当于WARP的客户端或设备ID，配置信息均关联到此注册ID', `令牌:${result.token}`, '令牌:相当于密码，更新读取对应账号所需，如果要更新注册ID的配置或者更改关联的许可证，需要此令牌验证收发数据', '');
				if (privateKey && publicKey) {
					$.log('有自定义私钥(privateKey)', '有自定义公钥(publicKey)', '');
					Verify.Content = result.token;
					await setupVAL(Verify, env);
					$.WireGuard = await getDevice(env.Version, result.id);
					const SurgeConf = `
					[Proxy]
					WARP = wireguard, section-name = Cloudflare

					[Group]
					你的策略组 = 节点1, 节点2, 节点3, WARP

					[WireGuard Cloudflare]
					private-key = ${privateKey}
					self-ip = 172.16.0.254
					dns-server = 1.1.1.1
					mtu = 1280
					peer = (public-key = bmXOC+F1FxEMF9dyiK2H5/1SUtzH0JuVo51h2wPfgyo=, allowed-ips = 0.0.0.0/0, endpoint = ${$.WireGuard.config.peers[0].endpoint.v4})
					`;
					$.log('Surge可用配置', wireGuardConf)
					const wireGuardConf = `
					[Interface]
					PrivateKey = ${privateKey}
					PublicKey = ${publicKey}
					Address = ${$.WireGuard.config.interface.addresses.v4}
					Address = ${$.WireGuard.config.interface.addresses.v6}
					DNS = 1.1.1.1
				
					[Peer]
					PublicKey = ${$.WireGuard.config.peers[0].public_key}
					Endpoint = ${$.WireGuard.config.peers[0].endpoint.v4}
					Endpoint = ${$.WireGuard.config.peers[0].endpoint.v6}
					Endpoint = ${$.WireGuard.config.peers[0].endpoint.host}
					AllowedIPs = 0.0.0.0/0
					`;
					$.log('WireGuard可用配置', wireGuardConf)
				}
			} else {
				$.log(`不符合模式:${setupMode}运行要求，退出`, '');
				$.done();
			}
		} else if (setupMode == "RegisterNewDevice") {
			if (Verify.RegistrationId) {
				$.log('有设备ID(RegistrationId)', '');
				var result = await regDevice(env.Version, Verify.RegistrationId, publicKey, env.Locale, env.deviceModel, env.Type, env.warp_enabled);
			} else {
				$.log(`不符合模式:${setupMode}运行要求，退出`, '');
				$.done();
			}
		} else if (setupMode == "RebindingLicense") {
			if (Verify.License && Verify.RegistrationId && Verify.Content) {
				$.log('有账户/许可证(License),有设备ID(RegistrationId),有验证内容(Content)', '');
				var result = await setAccountLicense(env.Version, Verify.RegistrationId, Verify.License);
			} else {
				$.log(`不符合模式:${setupMode}运行要求，退出`, '');
				$.done();
			}
		} else if (setupMode == "ChangeKeypair") {
			if (Verify.RegistrationId && Verify.Content && publicKey) {
				$.log('有设备ID(RegistrationId),有验证内容(Content),有自定义公钥(publicKey)', '');
				var result = await setKeypair(env.Version, Verify.RegistrationId, publicKey);
			} else {
				$.log(`不符合模式:${setupMode}运行要求，退出`, '');
				$.done();
			}
		} else if (setupMode == "AccountDetail") {
			result = await getAccount(env.Version, Verify.RegistrationId);
		} else if (setupMode == "DeviceDetail") {
			result = await getDevices(env.Version, Verify.RegistrationId);
		} else if (setupMode == "AutoAffWARP") {
			$.log('没写', '');
			//result = await autoAFF(License, AffID);
		} else $.log(`未选择运行模式或不符合模式:${setupMode}运行要求，退出`, `setupMode = ${setupMode}`, `License = ${Verify.License}`, `RegistrationId = ${Verify.RegistrationId}`, '');
	} catch (e) {
		$.logErr(e);
	} finally {
		return $.log(`${WARP.name}完成`, `result = ${JSON.stringify(result)}`, '');
		//return $.log(`${WARP.name}完成`, `名称:${dns_records.name}`, `type:${dns_records.type}`, `content:${dns_records.content}`, '');
	}
};


/***************** function *****************/
// Function 0A
// Get Cloudflare JSON
function getCFjson(url) {
	return new Promise((resolve) => {
		$.get(url, (error, response, data) => {
			try {
				if (error) throw new Error(error)
				else if (data) {
					_data = JSON.parse(data)
					if (Array.isArray(_data.messages) && _data.messages.length != 0) _data.messages.forEach(element => { 
						if (element.code !== 10000) $.msg($.name, `code: ${element.code}`, `message: ${element.message}`);
					})
					if (_data.success === true) {
						if (Array.isArray(_data.result) && _data.result.length != 0) resolve(_data.result[0]);
						else resolve(_data.result);
					} else if (_data.success === false) {
						if (Array.isArray(_data.errors) && _data.errors.length != 0) _data.errors.forEach(element => { $.msg($.name, `code: ${element.code}`, `message: ${element.message}`); })
					}
				} else throw new Error(response);
			} catch (e) {
				$.logErr(`❗️${$.name}, ${getCFjson.name}执行失败`, ` url = ${JSON.stringify(url)}`, ` error = ${error || e}`, `response = ${JSON.stringify(response)}`, `data = ${data}`, '')
			} finally {
				$.log(`🚧 ${$.name}, ${getCFjson.name}调试信息`, ` url = ${JSON.stringify(url)}`, `data = ${data}`, '')
				resolve()
			}
		})
	})
}

// Function 0B
// Fatch Cloudflare JSON
function fatchCFjson(url) {
	return new Promise((resolve) => {
		$.post(url, (error, response, data) => {
			try {
				if (error) throw new Error(error)
				else if (data) {
					_data = JSON.parse(data)
					if (Array.isArray(_data.messages) && _data.messages.length != 0) _data.messages.forEach(element => { $.msg($.name, `code: ${element.code}`, `message: ${element.message}`); })
					if (_data.success === true) {
						if (Array.isArray(_data.result) && _data.result.length != 0) resolve(_data.result[0]);
						else resolve(_data.result); // _data.result, _data.meta
					} else if (_data.success === false) {
						if (Array.isArray(_data.errors) && _data.errors.length != 0) _data.errors.forEach(element => { $.msg($.name, `code: ${element.code}`, `message: ${element.message}`); })
					}
				} else throw new Error(response);
			} catch (e) {
				$.logErr(`❗️${$.name}, ${fatchCFjson.name}执行失败`, ` url = ${JSON.stringify(url)}`, ` error = ${error || e}`, `response = ${JSON.stringify(response)}`, `data = ${data}`, '')
			} finally {
				$.log(`🚧 ${$.name}, ${fatchCFjson.name}调试信息`, ` url = ${JSON.stringify(url)}`, `data = ${data}`, '')
				resolve()
			}
		})
	})
}

// Function 1
// Register New Account
async function regAccount(Version, referrer, publicKey, Locale = "en_US", deviceModel = "", Type = "", warp_enabled = true) {
	$.log('注册账户');
	const install_id = genString(11);
	var body = {
		install_id: install_id, // not empty on actual client
		fcm_token: `${install_id}:APA91b${genString(134)}`, // not empty on actual client
		referrer: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(referrer) ? referrer : "",
		key: publicKey,
		locale: Locale,
		//warp_enabled: warp_enabled,
		//model: deviceModel,
		tos: new Date().toISOString(),
		type: Type
	};
	const url = { method: 'post', url: `${$.VAL.url}/${Version}/reg`, headers: $.VAL.headers, body }
	return await fatchCFjson(url);
}

// Function 2
// Register New Device
async function regDevice(Version, RegistrationId, publicKey, Locale = "en_US", deviceModel = "", Type = "", warp_enabled = true) {
	$.log('注册设备');
	const install_id = genString(11);
	var body = {
		install_id: install_id, // not empty on actual client
		fcm_token: `${install_id}:APA91b${genString(134)}`, // not empty on actual client
		referrer: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(RegistrationId) ? RegistrationId : "",
		key: publicKey,
		locale: Locale,
		//warp_enabled: warp_enabled,
		//model: deviceModel,
		tos: new Date().toISOString(),
		type: Type
	};
	const url = { method: 'post', url: `${$.VAL.url}/${Version}/reg/${RegistrationId}`, headers: $.VAL.headers, body }
	return await fatchCFjson(url);
}

// Function 2
// Get the Device Detail
async function getDevice(Version, RegistrationId) {
	$.log('获取当前设备配置');
	const url = { url: `${$.VAL.url}/${Version}/reg/${RegistrationId}`, headers: $.VAL.headers };
	return await getCFjson(url);
}

// Function 3
// Get the Account Detail
async function getAccount(Version, RegistrationId) {
	$.log('获取账户信息');
	const url = { url: `${$.VAL.url}/${Version}/reg/${RegistrationId}/account`, headers: $.VAL.headers };
	return await getCFjson(url);
}

// Function 4
// Get Account Devices Details
async function getDevices(Version, RegistrationId) {
	$.log('获取设备信息');
	const url = { url: `${$.VAL.url}/${Version}/reg/${RegistrationId}/account/devices`, headers: $.VAL.headers };
	return await getCFjson(url);
}

// Function 5
// Set Account License
async function setAccountLicense(Version, RegistrationId, License) {
	$.log('设置账户许可证');
	var body = { "license": License };
	const url = { method: 'put',  url: `${$.VAL.url}/${Version}/reg/${RegistrationId}/account`, headers: $.VAL.headers, body };
	return await fatchCFjson(url);
}

// Function 6
// Set Keypair
async function setKeypair(Version, RegistrationId, publicKey) {
	$.log('设置账户许可证');
	var body = { "key": publicKey };
	const url = { method: 'put',  url: `${$.VAL.url}/${Version}/reg/${RegistrationId}/account`, headers: $.VAL.headers, body };
	return await fatchCFjson(url);
}

// Function 7
// Set Device Active
async function setDeviceActive(Version, RegistrationId, active = true) {
	$.log('设置设备激活状态');
	var body = { "active": active };
	const url = { method: 'patch',  url: `${$.VAL.url}/${Version}/reg/${RegistrationId}/account/devices`, headers: $.VAL.headers, body };
	return await fatchCFjson(url);
}

// Function 8
// Set Device Name
async function setDeviceName(Version, RegistrationId, Name) {
	$.log('设置设备名称');
	var body = { "name": Name };
	const url = { method: 'patch',  url: `${$.VAL.url}/${Version}/reg/${RegistrationId}/account/devices`, headers: $.VAL.headers, body };
	return await fatchCFjson(url);
}

// Function 9
// Generate Random String
// https://gist.github.com/6174/6062387#gistcomment-2651745
function genString(length) {
	$.log('生成随机字符串');
	return [...Array(length)]
	  .map(i => (~~(Math.random() * 36)).toString(36))
	  .join("");
  }

/***************** Env *****************/
// prettier-ignore
// https://github.com/chavyleung/scripts/blob/master/Env.min.js
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}isShadowrocket(){return"undefined"!=typeof $rocket}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){if(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:i,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:i,statusCode:r,headers:o,rawBody:h},s.decode(h,this.encoding))},t=>{const{message:i,response:r}=t;e(i,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let i=require("iconv-lite");this.initGotEnv(t);const{url:r,...o}=t;this.got[s](r,o).then(t=>{const{statusCode:s,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:s,statusCode:r,headers:o,rawBody:h},i.decode(h,this.encoding))},t=>{const{message:s,response:r}=t;e(s,r,r&&i.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl,i=rawOpts["update-pasteboard"]||rawOpts.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard":i}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
