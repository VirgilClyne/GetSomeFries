/*
README:https://github.com/VirgilClyne/GetSomeFries
*/

// refer:https://github.com/phil-r/node-cloudflare-ddns

const $ = new Env('Cloudflare DDNS');

// Endpoints
// https://api.cloudflare.com/#getting-started-endpoints
const baseURL = 'https://api.cloudflare.com/client/v4/';

// Requests
// https://api.cloudflare.com/#getting-started-requests
// API Tokens
// API Tokens provide a new way to authenticate with the Cloudflare API.
var Token = 'YQSn-xWAQiiEh9qM58wZNnyQS7FUdoqGIUAbrh7T';
// API Keys
// All requests must include both X-AUTH-KEY and X-AUTH-EMAIL headers to authenticate. Requests that use X-AUTH-USER-SERVICE-KEY can use that instead of the Auth-Key and Auth-Email headers.
var Key = '1234567893feefc5f0q5000bfo0c38d90bbeb'; //Set your account email address and API key. The API key can be found on the My Profile -> API Tokens page in the Cloudflare dashboard.
var Email = 'example@example.com'; //Your contact email address

// Zone
// https://api.cloudflare.com/#zone-properties
var zone = {};
// Zone Details
// https://api.cloudflare.com/#zone-zone-details
zone.id = '023e105f4ecef8ad9ca31a8372d0c353';
// List Zones
// https://api.cloudflare.com/#zone-list-zones
zone.name = 'example.com'; //The domain/website name you want to run updates for (e.g. example.com)

// DNS Records for a Zone
// https://api.cloudflare.com/#dns-records-for-a-zone-properties
var dns_records = {};
// DNS Record Details
// https://api.cloudflare.com/#dns-records-for-a-zone-dns-record-details
dns_records.id = '372e67954025e0ba6aaa6d586b9e0b59';
// List DNS Records
// https://api.cloudflare.com/#dns-records-for-a-zone-list-dns-records
// type
// DNS record type
dns_records.type = 'A';
// name
// DNS record name
dns_records.name = 'example'; //DNS record name, subdomain/CNAME you want to run updates for
// content
// DNS record content
dns_records.content = '0.0.0.0';
// ttl
// Time to live, in seconds, of the DNS record. Must be between 60 and 86400, or 1 for 'automatic'
dns_records.ttl = 1;
// priority
// Required for MX, SRV and URI records; unused by other record types.
dns_records.priority = 10;
// proxied
// Whether the record is receiving the performance and security benefits of Cloudflare
dns_records.proxied = false; //Whether the record is receiving the performance and security benefits of Cloudflare


// Argument Function Supported
if (typeof $argument != "undefined") {
	let arg = Object.fromEntries($argument.split("&").map((item) => item.split("=")));
	$.log(JSON.stringify(arg));
	Token = arg.Token;
	Key = arg.Key;
	Email = arg.Email;
	zone.id = arg.zone_id;
	zone.name = arg.zone_name;
	dns_records.id = arg.dns_records_id;
	dns_records.name = arg.dns_records_name;
	dns_records.ttl = arg.dns_records_ttl;
	dns_records.priority = arg.dns_records_priority;
	//dns_records.proxied = Boolean(JSON.parse(arg.dns_records_proxied));
};

!(async () => {
	try {
		await Verify(Token, Key, Email)
		DDNS('A', await getPublicIP(4));
		DDNS('AAAA', await getPublicIP(6));
		//await Promise.all([DDNS('A', 4), DDNS('AAAA', 6)])
	} catch (e) {
		$.logErr(e);
	} finally {
		$.done()
	}
})()
	.catch((e) => $.logErr(e))
	.finally(() => $.done())



/***************** async *****************/
//Verify API Token/Key
async function Verify(Token, Key, Email) {
	$.log('验证授权');
	if (Token) {
		$.VAL_headers = await verifyToken(Token);
	} else if (Key && Email) {
		$.VAL_headers = await getUser(Key, Email);
	} else {
		$.logErr('无可用授权方式', `Token=${Token}`, `Key=${Key}`, `Email=${Email}`, '');
		$.done();
	}
}

//Update DDNS
async function DDNS(type, content) {
	try {
		$.log(`开始更新${type}类型记录`);
		//Step 1
		$.log('写入地址');
		if (content) {
			dns_records.type = type;
			dns_records.content = content;
			$.log(`${dns_records.type}类地址:${dns_records.content}`, '');
		} else {
			$.log(`无${dns_records.type}类地址`, '');
		}
		//Step 2
		$.log('查询区域信息');
		if (zone.id) {
			zone = await getZone(zone).then();
			$.log(`${zone}`, '');
			$.log(`区域ID:${zone.id}`, '');
		} else if (zone.name) {
			zone = await listZone(zone, dns_records);
			$.log(`区域ID:${zone.id}`, '');
		} else {
			$.logErr('未设置区域信息');
			$.done();
		}
		//Step 3
		$.log('查询记录信息');
		if (dns_records.id) {
			oldRecord = await getRecord(zone, dns_records);
		} else if (dns_records.name) {
			oldRecord = await listRecord(zone, dns_records);			
		} else {
			$.log('未查询到记录信息');
		} $.log(`记录查询结果:`, `记录ID:${oldRecord.id}`, `名称:${oldRecord.name}`, `类型:${oldRecord.type}`, `内容:${oldRecord.content}`, `代理状态:${oldRecord.proxied}`, `TTL:${oldRecord.ttl}`, '');
		//Step 4
		$.log('构造更新内容');
		$.log(`dns_records:${JSON.stringify(dns_records)}`, '')
		var newRecord = dns_records
		delete newRecord.id
		if (oldRecord.proxiable === false) {
			$.log('当前记录不可代理');
			newRecord.proxied = false
		}
		$.log(`newRecord:${JSON.stringify(newRecord)}`, '')
		//Step 5
		$.log('开始更新内容');
		if (!oldRecord) {
			$.log('无记录');
			newRecord = await createRecord(zone, newRecord);
			$.log(`新记录':${JSON.stringify(newRecord)}`, '');
		} else if (oldRecord && oldRecord.content !== newRecord.content) {
			$.log('有记录，但IP地址不符，开始更新');
			newRecord = await updateRecord(zone, oldRecord, newRecord);
			$.log(`记录已更新:${JSON.stringify(newRecord)}`, '');
		} else {
			$.log(`不需要更新:${JSON.stringify(oldRecord)}`, '');
		}
	} catch (data) {
		if (data.message) data.message.forEach((code, message) => { $.msg($.name, code, message); })
		if (data.error) data.error.forEach((code, message) => { $.msg($.name, code, message); })
		else $.logErr(data);
	} finally {
		$.log(`${newRecord.name}上的${newRecord.type}记录${newRecord.content}更新完成`);
	}
};

/***************** function *****************/
// Function 1A
// Get Public IP / External IP address
// https://www.my-ip.io/api
async function getPublicIP(type) {
	$.log(`${getPublicIP.name}`);
	const url = { url: `https://api${type}.my-ip.io/ip.json`};
	const data = await $.http.get(url).then();
	$.log(`🚧 ${$.name}, ${getPublicIP.name}调试信息`, `data = ${data.body}`, '');
	const _data = JSON.parse(data.body);
	if (_data.success === true) return _data.ip;
}

// Function 1B
// Public API
// Basic Information
// https://manual.nssurge.com/scripting/common.html
function networkInfo(type) {
	switch (type) {
		case 'BSSID':
		case 'bssid':
			result = $network.wifi.bssid;
			break;
		case 'SSID':
		case 'ssid':
			result = $network.wifi.ssid;
			break;
		case 'V4':
		case 'IPv4':
		case 'A':
			result = $network.v4.primaryAddress;
			break;
		case 'V6':
		case 'IPv6':
		case 'AAAA':
			result = $network.v6.primaryAddress;
			break;
		default:
			result = $network;
	} return result
}

// Function 2A
// Verify Token
// https://api.cloudflare.com/#user-api-tokens-verify-token
async function verifyToken(Token) {
	const url = { url: `${baseURL}user/tokens/verify`, headers: { 'Authorization': `Bearer ${Token}`, 'Content-Type': 'application/json' } };
	const data = await $.http.get(url).then();
	$.log(`🚧 ${$.name}, ${verifyToken.name}调试信息`, `data = ${data.body}`, '');
	const _data = JSON.parse(data.body)
	if (_data.success === true) {
		if (_data.messages[0].code == 10000) return url.headers;
		else if (_data.messages[0]) $.msg(getZone.name, _data.messages[0].code, _data.messages[0].message);
	} else if (_data.success === false) throw new Error(_data)
}

// Function 2B
// User Details
// https://api.cloudflare.com/#user-user-details
async function getUser(Key, Email) {
	const url = { url: `${baseURL}user`, headers: { 'X-Auth-Key': Key, 'X-Auth-Email': Email, 'Content-Type': 'application/json' } }
	const data = await $.http.get(url).then();
	$.log(`🚧 ${$.name}, ${getUser.name}调试信息`, `data = ${data.body}`, '');
	const _data = JSON.parse(data.body)
	if (_data.success === true) return url.headers;
}

// Function 3A
// Zone Details
// https://api.cloudflare.com/#zone-zone-details
function getZone(zone) {
	return new Promise((resolve) => {
		const url = { url: `${baseURL}zones/${zone.id}`, headers: $.VAL_headers }
		$.get(url, (error, response, data) => {
			try {
				if (error) throw new Error(error)
				else if (data) _data = JSON.parse(data)
				else throw new Error(response);
				//if (_data.success === true) {
					//if (_data.messages) throw _data.messages;
					if (_data.result) resolve(_data.result);
				//} else if (_data.success === false) throw _data.errors;
			} catch (e) {
				$.logErr(`❗️${$.name}, ${getZone.name}执行失败`, ` error = ${error || e}`, `response = ${JSON.stringify(response)}`, `data = ${data}`, '')
				throw e
			} finally {
				$.log(`🚧 ${$.name}, ${getZone.name}调试信息`, `data = ${data}`, '')
				resolve()
			}
		})
	})
}

// Function 3B
// List Zones
// https://api.cloudflare.com/#zone-list-zones
async function listZone(zone, record) {
	const url = { url: `${baseURL}zones?type=${record.type}&name=${zone.name}`, headers: $.VAL_headers }
	const data = await $.http.get(url).then();
	$.log(`🚧 ${$.name}, ${listZone.name}调试信息`, `data = ${data.body}`, '');
	const _data = JSON.parse(data.body)
	if (_data.success === true) return _data.result[0];
}

// Function 4
// Create DNS Record
// https://api.cloudflare.com/#dns-records-for-a-zone-create-dns-record
async function createRecord(zone, { type, name, content, ttl = 1, priority = 10, proxied = false }) {
	const url = { url: `${baseURL}zones/${zone.id}/dns_records`, headers: $.VAL_headers, body: { type, name, content, ttl, priority, proxied } }
	const data = await $.http.post(url).then();
	$.log(`🚧 ${$.name}, ${createRecord.name}调试信息`, `data = ${data.body}`, '');
	const _data = JSON.parse(data.body)
	if (_data.success === true) return _data.result;
}

// Function 5A
// DNS Record Details
// https://api.cloudflare.com/#dns-records-for-a-zone-dns-record-details
async function getRecord(zone, record) {
	const url = { url: `${baseURL}zones/${zone.id}/dns_records/${record.id}`, headers: $.VAL_headers }
	const data = await $.http.get(url).then();
	$.log(`🚧 ${$.name}, ${getRecord.name}调试信息`, `data = ${data.body}`, '');
	const _data = JSON.parse(data.body)
	if (_data.success === true) return _data.result;
}

// Function 5B
// List DNS Records
// https://api.cloudflare.com/#dns-records-for-a-zone-list-dns-records
async function listRecord(zone, record) {
	const url = { url: `${baseURL}zones/${zone.id}/dns_records?type=${record.type}&name=${record.name}.${zone.name}&order=type`, headers: $.VAL_headers }
	const data = await $.http.get(url).then();
	$.log(`🚧 ${$.name}, ${listRecord.name}调试信息`, `data = ${data.body}`, '');
	const _data = JSON.parse(data.body)
	if (_data.success === true) return _data.result[0];
}

// Function 6
// Update DNS Record
// https://api.cloudflare.com/#dns-records-for-a-zone-update-dns-record
async function updateRecord(zone, record, { type, name, content, ttl = 1, priority = 10, proxied = true}) {
	const url = {method: 'PUT', url: `${baseURL}zones/${zone.id}/dns_records/${record.id}`, headers: $.VAL_headers, body: { type, name, content, ttl, priority, proxied } }
	const data = await $.http.post(url).then();
	$.log(`🚧 ${$.name}, ${updateRecord.name}调试信息`, `data = ${data.body}`, '');
	const _data = JSON.parse(data.body)
	if (_data.success === true) return _data.result;
}

/***************** Env *****************/
// prettier-ignore
// https://github.com/chavyleung/scripts/blob/master/Env.min.js
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}isShadowrocket(){return"undefined"!=typeof $rocket}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){if(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:i,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:i,statusCode:r,headers:o,rawBody:h},s.decode(h,this.encoding))},t=>{const{message:i,response:r}=t;e(i,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let i=require("iconv-lite");this.initGotEnv(t);const{url:r,...o}=t;this.got[s](r,o).then(t=>{const{statusCode:s,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:s,statusCode:r,headers:o,rawBody:h},i.decode(h,this.encoding))},t=>{const{message:s,response:r}=t;e(s,r,r&&i.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl,i=rawOpts["update-pasteboard"]||rawOpts.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard":i}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
