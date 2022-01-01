/*
README:https://github.com/VirgilClyne/GetSomeFries
*/

// refer:https://github.com/phil-r/node-cloudflare-ddns

// Default Example User API Keys
let CF_KEY = 'exampleKey';//Set your account email address and API key. The API key can be found on the My Profile -> API Tokens page in the Cloudflare dashboard.
let CF_EMAIL = 'admin@example.com';//Your contact email address
// Default Example DNS Records for a Zone
let ZONE = 'example.com';//The domain/website name you want to run updates for (e.g. example.com)
let SUBDOMAIN = 'domain.example.com';//DNS record name, subdomain/CNAME you want to run updates for
let PROXIED = 'true';//Whether the record is receiving the performance and security benefits of Cloudflare
let RECORD = {id: 'abcdefghijklmn'}
ZONE.id = 'abcdefghijklmn'
RECORD.id =' abcdefghijklmn'


// Argument Function Supported
if (typeof $argument != "undefined") {
	let arg = Object.fromEntries($argument.split("&").map((item) => item.split("=")));
	console.log(JSON.stringify(arg));
	CF_KEY = arg.CF_KEY;
	CF_EMAIL = arg.CF_EMAIL;
	ZONE = arg.ZONE;
	SUBDOMAIN = arg.SUBDOMAIN;
	PROXIED = arg.PROXIED;
};

const $ = new Env('Cloudflare DDNS');

const baseURL = 'https://api.cloudflare.com/client/v4/';
$.VAL_headers = {
	'X-Auth-Key': CF_KEY,
	'X-Auth-Email': CF_EMAIL,
	'Content-Type': 'application/json',
}


(async () => {
	try {
		//Step 1
		$.log('获取外部IP地址中');
		//Refer: https://manual.nssurge.com/scripting/common.html
		const ipv4Address = await networkInfo(IPV4) //获取IPV4地址
		const ipv6Address = await networkInfo(IPV6) //获取IPV6地址
		$.log('IPV4地址:', ipv4Address, 'IPV6地址:', ipv6Address);
		//Step 2
		$.log('查询区域信息');
		if (ipv4Address) const zone = await listZone(ZONE, 'A');
		if (ipv6Address) const zone = await listZone(ZONE, 'AAAA');
		$.log('zone.id', zone.id);
		//Step 3
		$.log('查询记录信息'); //需要改进，根据A或AAAA查两次，新建也是两次
		if (ipv4Address) const record = await listRecord(zone, SUBDOMAIN, 'A');
		if (ipv6Address) const record = await listRecord(zone, SUBDOMAIN, 'AAAA');
		console.log('record', record);
		//Step 4
		$.log('构造更新内容');

		const recordObjectV4 = {
			name: SUBDOMAIN,
			content: networkInfo(IPV4),
			type: 'A',
			proxied: PROXIED === 'true'
		};
		const recordObjectV6 = {
			name: SUBDOMAIN,
			content: networkInfo(IPV6),
			type: 'AAAA',
			proxied: PROXIED === 'true'
		};
		//Step 5
		$.log('开始更新内容');
		let newRecord;
		if (!record) {
			$.log('无记录');
			if (networkInfo(IPV4)) {
				$.log('有IPV4, 创建IPV4记录');
				newRecord = await createRecord(zone, { type: 'A', name: SUBDOMAIN, content: networkInfo(IPV4) });
				console.log('New record', newRecord);
			}
			if (networkInfo(IPV6)) {
				$.log('有IPV6, 创建IPV6记录');
				newRecord = await createRecord(zone, { type: 'AAAA', name: SUBDOMAIN, content: networkInfo(IPV6) });
				console.log('New record', newRecord);
			}
		} else if (record.type == 'A' && record.content !== ipv4Address) {
			$.log('有A记录但地址不对');
			newRecord = await updateRecord(zone, record, recordObj);
			console.log('记录已更新', newRecord);
		} else if (record.type == 'AAAA' && record.content !== ipv6Address) {
			$.log('有AAAA记录但地址不对');
			newRecord = await updateRecord(zone, record, recordObj);
			console.log('记录已更新', newRecord);
		} else {
			console.log('不需要更新');
		}
	} catch (e) {
		if (e.response) {
			$.logErr(e.response.data);
		} else {
			$.logErr(e);
		}
	} finally {
		$.done()
	}
})()

/***************** function *****************/
// Step 1
// Public API
// Basic Information
//https://manual.nssurge.com/scripting/common.html
async function networkInfo(type) {
	var result
	switch (type) {
		case 'SSID':
		case 'ssid':
			result = $network.wifi.ssid;
			$.log('SSID:', result);
		case 'IPV4':
		case 'A':
			result = $network.v4.primaryAddress;
			$.log('IPV4地址:', result);
		case 'IPV6':
		case 'AAAA':
			result = $network.v6.primaryAddress;
			$.log('IPV6地址:', result);
		default:
			result = $network.v4.primaryAddress;
			$.log('IPV4地址:', result);
	} return result
}

// Step 2
// User Details
//https://api.cloudflare.com/#user-user-details
async function getUser() {
	const url = { url: `${baseURL}user`, headers: JSON.parse($.VAL_headers) }
	$.get(url, (error, response, data) => {
		try {
			const _data = JSON.parse(data)
			if (error) throw new Error(error)
		} catch (e) {
			$.log(`❗️ ${$.name}, getUser执行失败!`, `error = ${error || e}`, `response = ${JSON.stringify(response)}`, `data = ${data}`, '')
		}
	})
}

// Step 3A
// Zone Details
//https://api.cloudflare.com/#zone-zone-details
async function getZone(zone) {
	return new Promise((resolve) => {
		const url = { url: `${baseURL}zones/${zone.id}`, headers: JSON.parse($.VAL_headers) }
		$.get(url, (error, response, data) => {
			try {
				const _data = JSON.parse(data)
				if (error) throw new Error(error)
				if (_data.success === true) return _data.result
			} catch (e) {
				$.log(`❗️ ${$.name}, getZone执行失败!`, `error = ${error || e}`, `response = ${JSON.stringify(response)}`, `data = ${data}`, '')
			} finally {
				resolve()
			}
		})
	})
}

// Step 3B
// List Zones
//https://api.cloudflare.com/#zone-list-zones
async function listZone(name, type = 'A') {
	const url = { url: `${baseURL}zones?type=${type}&name=${name}`, headers: JSON.parse($.VAL_headers) }
	$.get(url, (error, response, data) => {
		try {
			const _data = JSON.parse(data)
			if (error) throw new Error(error)
			if (_data.success === true) return _data.result[0]
		} catch (e) {
			$.log(`❗️ ${$.name}, listZone执行失败!`, `error = ${error || e}`, `response = ${JSON.stringify(response)}`, `data = ${data}`, '')
		}
	})
}

// Step 4
// Create DNS Record
//https://api.cloudflare.com/#dns-records-for-a-zone-create-dns-record
async function createRecord(zone, { type, name, content, ttl = 1, priority = 10, proxied = false }) {
	const url = { url: `${baseURL}zones/${zone.id}/dns_records`, headers: JSON.parse($.VAL_headers), body = { type, name, content, ttl, priority, proxied } }
	$.get(url, (error, response, data) => {
		try {
			const _data = JSON.parse(data)
			if (error) throw new Error(error)
			if (_data.success === true) return _data.result
		} catch (e) {
			$.log(`❗️ ${$.name}, createRecord执行失败!`, `error = ${error || e}`, `response = ${JSON.stringify(response)}`, `data = ${data}`, '')
		}
	})
}

// Step 5A
// DNS Record Details
//https://api.cloudflare.com/#dns-records-for-a-zone-dns-record-details
async function getRecord(zone, record) {
	return new Promise((resolve) => {
		const url = { url: `${baseURL}zones/${zone.id}/dns_records/${record.id}`, headers: JSON.parse($.VAL_headers) }
		$.get(url, (error, response, data) => {
			try {
				const _data = JSON.parse(data)
				if (error) throw new Error(error)
				if (_data.success === true) return _data.result
			} catch (e) {
				$.log(`❗️ ${$.name}, getRecord执行失败!`, `error = ${error || e}`, `response = ${JSON.stringify(response)}`, `data = ${data}`, '')
			} finally {
				resolve()
			}
		})
	})
}

// Step 5B
// List DNS Records
//https://api.cloudflare.com/#dns-records-for-a-zone-list-dns-records
async function listRecord(zone, name, type = 'A') {
	const url = { url: `${baseURL}zones/${zone.id}/dns_records?type=${type}&name=${name}.${zone.name}&order=type`, headers: JSON.parse($.VAL_headers) }
	$.get(url, (error, response, data) => {
		try {
			const _data = JSON.parse(data)
			if (error) throw new Error(error)
			if (_data.success === true) return _data.result[0]
		} catch (e) {
			$.log(`❗️ ${$.name}, listRecord执行失败!`, `error = ${error || e}`, `response = ${JSON.stringify(response)}`, `data = ${data}`, '')
		}
	})
}

// Step 6
// Update DNS Record
//https://api.cloudflare.com/#dns-records-for-a-zone-update-dns-record
async function updateRecord(zone, record, { type, name, content, ttl = 1, priority = 10, proxied = true}) {
	const url = { url: `${baseURL}zones/${zone.id}/dns_records/${record.id}`, headers: JSON.parse($.VAL_headers), body = { type, name, content, ttl, priority, proxied } }
	$.get(url, (error, response, data) => {
		try {
			const _data = JSON.parse(data)
			if (error) throw new Error(error)
			if (_data.success === true) return _data.result
		} catch (e) {
			$.log(`❗️ ${$.name}, updateRecord执行失败!`, `error = ${error || e}`, `response = ${JSON.stringify(response)}`, `data = ${data}`, '')
		}
	})
}

/***************** Env *****************/
// prettier-ignore
// https://github.com/chavyleung/scripts/blob/master/Env.min.js
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}isShadowrocket(){return"undefined"!=typeof $rocket}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){if(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:i,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:i,statusCode:r,headers:o,rawBody:h},s.decode(h,this.encoding))},t=>{const{message:i,response:r}=t;e(i,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let i=require("iconv-lite");this.initGotEnv(t);const{url:r,...o}=t;this.got[s](r,o).then(t=>{const{statusCode:s,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:s,statusCode:r,headers:o,rawBody:h},i.decode(h,this.encoding))},t=>{const{message:s,response:r}=t;e(s,r,r&&i.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl,i=rawOpts["update-pasteboard"]||rawOpts.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard":i}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
