/*
README:https://github.com/VirgilClyne/GetSomeFries
*/

// refer:https://github.com/phil-r/node-cloudflare-ddns

const $ = new Env('Cloudflare DNS');

// Endpoints
// https://api.cloudflare.com/#getting-started-endpoints
$.baseURL = 'https://api.cloudflare.com/client/v4';

// BoxJs Function Supported
if (typeof $.getdata("GetSomeFries") != "undefined") {
	// load user prefs from BoxJs
	$.Cloudflare = JSON.parse($.getdata("GetSomeFries")).Cloudflare
	//$.log(JSON.stringify($.Cloudflare.DNS))
	if ($.Cloudflare.DNS.Verify.Mode == "Key") {
		$.Cloudflare.DNS.Verify.Content = Array.from($.Cloudflare.DNS.Verify.Content.split("\n"))
		//$.log(JSON.stringify($.Cloudflare.DNS.Verify.Content))
	};
	$.Cloudflare.DNS.zone.dns_records = Array.from($.Cloudflare.DNS.zone.dns_records.split("\n"))
	//$.log(JSON.stringify($.Cloudflare.DNS.zone.dns_records))
	$.Cloudflare.DNS.zone.dns_records.forEach((item, i) => {
		$.Cloudflare.DNS.zone.dns_records[i] = Object.fromEntries(item.split("&").map((item) => item.split("=")));
		$.Cloudflare.DNS.zone.dns_records[i].proxied = JSON.parse($.Cloudflare.DNS.zone.dns_records[i].proxied);
	})
	//$.log(JSON.stringify($.Cloudflare.DNS.zone.dns_records));
	// Argument Function Supported
} else if (typeof $argument != "undefined") {
	let arg = Object.fromEntries($argument.split("&").map((item) => item.split("=")));
	$.log(JSON.stringify(arg));
	$.Cloudflare.DNS.Verify.Content = arg.Token;
	$.Cloudflare.DNS.Verify.Content = arg.ServiceKey;
	$.Cloudflare.DNS.Verify.Content[0] = arg.Key;
	$.Cloudflare.DNS.Verify.Content[1] = arg.Email;
	$.Cloudflare.DNS.zone.id = arg.zone_id;
	$.Cloudflare.DNS.zone.name = arg.zone_name;
	$.Cloudflare.DNS.dns_records.id = arg.dns_records_id;
	$.Cloudflare.DNS.dns_records.type = arg.dns_records_type;
	$.Cloudflare.DNS.dns_records.name = arg.dns_records_name;
	$.Cloudflare.DNS.dns_records.content = arg.dns_records_content;
	$.Cloudflare.DNS.dns_records.ttl = arg.dns_records_ttl;
	$.Cloudflare.DNS.dns_records.priority = arg.dns_records_priority;
	$.Cloudflare.DNS.dns_records.proxied = JSON.parse(arg.dns_records_proxied);
} else {
	$.Cloudflare.DNS = {
		"Verify":{
			"Mode":"Token",
			// Requests
			// https://api.cloudflare.com/#getting-started-requests
			"Content":""
			// API Tokens
			// API Tokens provide a new way to authenticate with the Cloudflare API.
			//"Content":"8M7wS6hCpXVc-DoRnPPY_UCWPgy8aea4Wy6kCe5T"
			// API Keys
			// All requests must include both X-AUTH-KEY and X-AUTH-EMAIL headers to authenticate.
			// Requests that use X-AUTH-USER-SERVICE-KEY can use that instead of the Auth-Key and Auth-Email headers.
			/*
			//Set your account email address and API key. The API key can be found on the My Profile -> API Tokens page in the Cloudflare dashboard.
			"Content":["1234567893feefc5f0q5000bfo0c38d90bbeb",
			//Your contact email address
			"example@example.com" ]
			//User Service Key, A special Cloudflare API key good for a restricted set of endpoints. Always begins with "v1.0-", may vary in length.
			"Content": "v1.0-e24fd090c02efcfecb4de8f4ff246fd5c75b48946fdf0ce26c59f91d0d90797b-cfa33fe60e8e34073c149323454383fc9005d25c9b4c502c2f063457ef65322eade065975001a0b4b4c591c5e1bd36a6e8f7e2d4fa8a9ec01c64c041e99530c2-07b9efe0acd78c82c8d9c690aacb8656d81c369246d7f996a205fe3c18e9254a"
			*/
		},
		// Zone
		// https://api.cloudflare.com/#zone-properties
		"zone":{
			// Zone Details
			// https://api.cloudflare.com/#zone-zone-details
			"id":"",
			// List Zones
			// https://api.cloudflare.com/#zone-list-zones
			"name":"", //The domain/website name you want to run updates for (e.g. example.com)
			// DNS Records for a Zone
			// https://api.cloudflare.com/#dns-records-for-a-zone-properties
			"dns_records":[
				{
					// DNS Record Details
					// https://api.cloudflare.com/#dns-records-for-a-zone-dns-record-details
					"id":"",
					// List DNS Records
					// https://api.cloudflare.com/#dns-records-for-a-zone-list-dns-records
					// type
					// DNS record type
					"type":"A",
					// name
					// DNS record name
					"name":"",
					// content
					// DNS record content
					"content":"",
					// ttl
					// Time to live, in seconds, of the DNS record. Must be between 60 and 86400, or 1 for 'automatic'
					"ttl":1,
					// priority
					// Required for MX, SRV and URI records; unused by other record types.
					//"priority":10,
					// proxied
					// Whether the record is receiving the performance and security benefits of Cloudflare
					"proxied":false //Whether the record is receiving the performance and security benefits of Cloudflare
				},
				{
					"id":"",
					"type":"AAAA",
					"name":"",
					"content":"",
					"ttl":1,
					"proxied":false
				}
			]
		}
	}	
};
console.log($.Cloudflare.DNS)

!(async () => {
	//Step 1
	let status = await Verify($.Cloudflare.DNS.Verify.Mode, $.Cloudflare.DNS.Verify.Content)
	if (status == true) {
		//Step 2
		$.Cloudflare.DNS.zone = await checkZoneInfo($.Cloudflare.DNS.zone)
		//Step 3 4 5
		for (let i in $.Cloudflare.DNS.zone.dns_records) { await DDNS($.Cloudflare.DNS.zone, $.Cloudflare.DNS.zone.dns_records[i]); }
	} else throw new Error('验证失败')
})()
	.catch((e) => $.logErr(e))
	.finally(() => $.done())

/***************** DDNS *****************/

//Update DDNS
async function DDNS(zone, dns_records) {
	try {
		$.log(`开始更新${dns_records.type}类型记录`);
		//Step 3
		dns_records = await checkRecordContent(dns_records);
		//Step 4
		var oldRecord = await checkRecordInfo(zone, dns_records);
		//Step 5
		var newRecord = await setupRecord(zone, oldRecord, dns_records)
		$.log(`${newRecord.name}上的${newRecord.type}记录${newRecord.content}更新完成`, '');
	} catch (e) {
		$.logErr(e);
	} finally {
		return $.log(`${DDNS.name}完成`, `名称:${dns_records.name}`, `type:${dns_records.type}`, `content:${dns_records.content}`, '');
	}
};

/***************** async *****************/
//Step 1
//Verify API Token/Key
async function Verify(Mode, Content) {
	$.log('验证授权');
	if (Mode == "Token") {
		$.VAL_headers = { 'Authorization': `Bearer ${Content}` };
		const result = await verifyToken($.VAL_headers);
		if (result.status == 'active') return true
	} else if (Mode == "ServiceKey") {
		$.VAL_headers = { 'X-Auth-User-Service-Key': Content };
		const result = await getUser($.VAL_headers);
		return result.suspended
	} else if (Mode == "Key") {
		$.VAL_headers = { 'X-Auth-Key': Content[0], 'X-Auth-Email': Content[1] };
		const result = await getUser($.VAL_headers);
		return result.suspended
	} else {
		$.logErr('无可用授权方式', `Mode=${Mode}`, `Content=${Content}`, '');
		$.done();
	}
}

//Step 2
async function checkZoneInfo(zone) {
	$.log('查询区域信息');
	if (zone.id && zone.name) {
		$.log(`有区域ID${zone.id}和区域名称${zone.name}, 继续`, '');
		newZone = zone;
	} else if (zone.id) {
		$.log(`有区域ID${zone.id}, 继续`, '');
		newZone = await getZone(zone);
	} else if (zone.name) {
		$.log(`有区域名称${zone.name}, 继续`, '');
		newZone = await listZones(zone);	
	} else {
		$.logErr('未提供记录ID和名称, 终止', '');
		$.done();
	}
	$.log(`区域查询结果:`, `ID:${newZone.id}`, `名称:${newZone.name}`, `状态:${newZone.status}`, `仅DNS服务:${newZone.paused}`, `类型:${newZone.type}`, `开发者模式:${newZone.development_mode}`, `名称服务器:${newZone.name_servers}`, `原始名称服务器:${newZone.original_name_servers}`, '');
	const result = await Object.assign(zone, newZone);
	return result
}

//Step 3
async function checkRecordContent(dns_records) {
	if (dns_records.type) {
		$.log(`有类型${dns_records.type}, 继续`, '');
		dns_records.type = dns_records.type;
		if (dns_records.content) {
			$.log(`有内容${dns_records.content}, 跳过`, '');
			dns_records.content = dns_records.content;
		} else {
			$.log(`无内容, 获取`, '');
			if (dns_records.type == 'A') dns_records.content = await getPublicIP(4);
			else if (dns_records.type == 'AAAA') dns_records.content = await getPublicIP(6);
			else {
				$.log(`类型${dns_records.type}, 无内容，也不需要获取外部IP,中止`, '');
				$.done();
			}
		}
	} else {
		$.log(`无类型${dns_records.type},中止`, '');
		$.done();
	}
	$.log(`${dns_records.type}类型内容:${dns_records.content}`, '');
	return dns_records
}

//Step 4
async function checkRecordInfo(zone, dns_records) {
	$.log('查询记录信息');
	if (dns_records.id) {
		$.log(`有记录ID${dns_records.id}, 继续`, '');
		var oldRecord = await getDNSRecord(zone, dns_records);
	} else if (dns_records.name) {
		$.log(`有记录名称${dns_records.name}, 继续`, '');
		var oldRecord = await listDNSRecords(zone, dns_records);
	} else {
		$.log('未提供记录ID和名称, 终止', '');
		$.done();
	}
	$.log(`记录查询结果:`, `ID:${oldRecord.id}`, `名称:${oldRecord.name}`, `类型:${oldRecord.type}`, `内容:${oldRecord.content}`, `代理状态:${oldRecord.proxied}`, `TTL:${oldRecord.ttl}`, '');
	return oldRecord
}

//Step 5
async function setupRecord(zone, oldRecord, dns_records) {
	$.log('开始更新内容');
	if (!oldRecord.content) {
		$.log('无记录');
		var newRecord = await createDNSRecord(zone, dns_records);
	} else if (oldRecord.content !== dns_records.content) {
		$.log('有记录且IP地址不同');
		var newRecord = await updateDNSRecord(zone, oldRecord, dns_records);
	} else if (oldRecord.content === dns_records.content) {
		$.log('有记录且IP地址相同');
		var newRecord = oldRecord
	}
	$.log(`记录更新结果:`, `ID:${newRecord.id}`, `名称:${newRecord.name}`, `类型:${newRecord.type}`, `内容:${newRecord.content}`, `可代理:${newRecord.proxiable}`, `代理状态:${newRecord.proxied}`, `TTL:${newRecord.ttl}`, `已锁定:${newRecord.locked}`, '');
	return newRecord
}

/***************** function *****************/
// Function 0A
// Get Cloudflare JSON
function getCFjson(url) {
	return new Promise((resolve) => {
		$.get(url, (error, response, data) => {
			try {
				if (error) throw new Error(error)
				else if (data) {
					const _data = JSON.parse(data)
					if (Array.isArray(_data.messages) && _data.messages.length != 0) _data.messages.forEach(element => { 
						if (element.code !== 10000) $.msg($.name, `code: ${element.code}`, `message: ${element.message}`);
					})
					if (_data.success === true) {
						if (_data.ip) resolve(_data.ip);
						else if (Array.isArray(_data.result) && _data.result.length != 0) resolve(_data.result[0]);
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
					const _data = JSON.parse(data)
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

// Function 1A
// Get Public IP / External IP address
// https://www.my-ip.io/api
async function getPublicIP(type) {
	$.log('获取公共IP');
	const url = { url: `https://api${type}.my-ip.io/ip.json` };
	return await getCFjson(url);
}

// Function 2A
// Verify Token
// https://api.cloudflare.com/#user-api-tokens-verify-token
async function verifyToken(headers) {
	$.log('验证令牌');
	const url = { url: `${$.baseURL}/user/tokens/verify`, headers: headers };
	return await getCFjson(url);
}

// Function 2B
// User Details
// https://api.cloudflare.com/#user-user-details
async function getUser(headers) {
	$.log('获取用户详情');
	const url = { url: `${$.baseURL}/user`, headers: headers }
	return await getCFjson(url);
}

// Function 3A
// Zone Details
// https://api.cloudflare.com/#zone-zone-details
async function getZone(zone) {
	$.log('获取区域详情');
	const url = { url: `${$.baseURL}/zones/${zone.id}`, headers: $.VAL_headers };
	return await getCFjson(url);
}

// Function 3B
// List Zones
// https://api.cloudflare.com/#zone-list-zones
async function listZones(zone) {
	$.log('列出区域');
	const url = { url: `${$.baseURL}/zones?name=${zone.name}`, headers: $.VAL_headers }
	return await getCFjson(url);
}

// Function 4
// Create DNS Record
// https://api.cloudflare.com/#dns-records-for-a-zone-create-dns-record
async function createDNSRecord(zone, { type, name, content, ttl = 1, priority = 10, proxied = true }) {
	$.log('创建新记录');
	const url = { method: 'post', url: `${$.baseURL}/zones/${zone.id}/dns_records`, headers: $.VAL_headers, body: { type, name, content, ttl, priority, proxied } }
	return await fatchCFjson(url);
}

// Function 5A
// DNS Record Details
// https://api.cloudflare.com/#dns-records-for-a-zone-dns-record-details
async function getDNSRecord(zone, record) {
	$.log('获取记录详情');
	const url = { url: `${$.baseURL}/zones/${zone.id}/dns_records/${record.id}`, headers: $.VAL_headers }
	return await getCFjson(url);
}

// Function 5B
// List DNS Records
// https://api.cloudflare.com/#dns-records-for-a-zone-list-dns-records
async function listDNSRecords(zone, record) {
	$.log('列出记录');
	const url = { url: `${$.baseURL}/zones/${zone.id}/dns_records?type=${record.type}&name=${record.name}.${zone.name}&order=type`, headers: $.VAL_headers }	
	return await getCFjson(url);
}

// Function 6
// Update DNS Record
// https://api.cloudflare.com/#dns-records-for-a-zone-update-dns-record
async function updateDNSRecord(zone, record, { type, name, content, ttl = 1, priority = 10, proxied = true }) {
	$.log('更新记录');
	const url = { method: 'put', url: `${$.baseURL}/zones/${zone.id}/dns_records/${record.id}`, headers: $.VAL_headers, body: { type, name, content, ttl, priority, proxied } }
	return await fatchCFjson(url);
}

/***************** Env *****************/
// prettier-ignore
// https://github.com/chavyleung/scripts/blob/master/Env.min.js
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}isShadowrocket(){return"undefined"!=typeof $rocket}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){if(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:i,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:i,statusCode:r,headers:o,rawBody:h},s.decode(h,this.encoding))},t=>{const{message:i,response:r}=t;e(i,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let i=require("iconv-lite");this.initGotEnv(t);const{url:r,...o}=t;this.got[s](r,o).then(t=>{const{statusCode:s,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:s,statusCode:r,headers:o,rawBody:h},i.decode(h,this.encoding))},t=>{const{message:s,response:r}=t;e(s,r,r&&i.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl,i=rawOpts["update-pasteboard"]||rawOpts.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard":i}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
