/*
README: https://github.com/VirgilClyne/GetSomeFries
*/
const $ = new Env("🍟 GetSomeFries: WeChat v0.2.0(4) response.beta");
const URL = new URLs();
const XML = new XMLs();
const DataBase = {
	"WeChat":{
		"Settings":{"Switch":true}
	},
	"Default": {
		"Settings":{"Switch":true}
	}
};

/***************** Processing *****************/
// 解构URL
let url = URL.parse($request?.url);
// 获取连接参数
const METHOD = $request?.method, HOST = url?.host, PATH = url?.path, PATHs = url?.paths;
$.log(`⚠ ${$.name}`, `METHOD: ${METHOD}`, `HOST: ${HOST}`, `PATH: ${PATH}`, `PATHs: ${PATHs}`, "");
// 解析格式
const FORMAT = ($response?.headers?.["Content-Type"] ?? $response?.headers?.["content-type"])?.split(";")?.[0];
$.log(`⚠ ${$.name}, FORMAT: ${FORMAT}`, "");
(async () => {
	const { Settings, Caches, Configs } = setENV("GetSomeFries", "WeChat", DataBase);
	$.log(`⚠ ${$.name}`, `Settings.Switch: ${Settings?.Switch}`, "");
	switch (Settings.Switch) {
		case true:
		default:
			// 创建空数据
			let body = {};
			// 格式判断
			switch (FORMAT) {
				case undefined: // 视为无body
					break;
				case "application/x-www-form-urlencoded":
				case "text/plain":
				default:
					break;
				case "application/x-mpegURL":
				case "application/x-mpegurl":
				case "application/vnd.apple.mpegurl":
					break;
				case "text/xml":
				case "text/html":
				case "text/plist":
				case "application/xml":
				case "application/plist":
				case "application/x-plist":
					$.log(`🚧 ${$.name}`, `body: ${$response.body}`, "");
					body = XML.parse($response.body);
					$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
					// 路径判断
					switch (PATH) {
						case "cgi-bin/mmsupport-bin/readtemplate":
							break;
						case "cgi-bin/mmspamsupport-bin/newredirectconfirmcgi":
							let script = body?.html?.body?.script?.[0]?.["#"]?.trim();
							$.log(`🚧 ${$.name}`, `script: ${JSON.stringify(script)}`, "");
							eval(script);
							//Function(`"use strict";return (${script})`)();
							$.log(`🚧 ${$.name}`, `cgiData: ${JSON.stringify(cgiData ?? undefined)}`, "");
							/*
							if (cgiData?.url) {
								let url = URL.parse(cgiData.url);
								switch (url?.host) {
									case "mp.weixin.qq.com":
									default:
										break;
									case "qr.alipay.com":
										//$request.url = `alipays://platformapi/startapp?appId=20000067&url=${cgiData.url}`;
										url.scheme = "alipays";
										url.host = "platformapi";
										url.path = "startapp";
										url.query = {
											"appId": 20000067,
											"url": encodeURIComponent(cgiData.url)
										};
										break;
									case "www.taobao.com":
									case "taobao.com":
									case "www.tmall.com":
									case "tmall.com":
									case "c.tb.cn":
									case "m.tb.cn":
									case "s.tb.cn":
									case "t.tb.cn":
									case "tb.cn":
										url.scheme = "taobao";
										break;
								};
								switch (url?.scheme) {
									case "alipays":
									case "taobao":
									default:
										switch ($.getEnv()) {
											case "Quantumult X":
												$response.status = "HTTP/1.1 302 Temporary Redirect";
												break;
											case "Surge":
											case "Loon":
											case "Stash":
											case "Shadowrocket":
											default:
												$response.status = 302;
												break;
										};
										$response.headers = { Location: URL.stringify(url) };
										delete $response.body;
										break;
									case "http":
									case "https":
										$response = await $.http.get(cgiData.url);
								};
							}
							*/
							break;
					};
					$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
					$response.body = XML.stringify(body);
					break;
				case "text/vtt":
				case "application/vtt":
					break;
				case "text/json":
				case "application/json":
					//body = JSON.parse($request.body);
					//$.log(body);
					//$request.body = JSON.stringify(body);
					break;
				case "application/x-protobuf":
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
.finally(() => {
	switch ($response) {
		default: { // 有回复数据，返回回复数据
			//const FORMAT = ($response?.headers?.["Content-Type"] ?? $response?.headers?.["content-type"])?.split(";")?.[0];
			$.log(`🎉 ${$.name}, finally`, `$response`, `FORMAT: ${FORMAT}`, "");
			//$.log(`🚧 ${$.name}, finally`, `$response: ${JSON.stringify($response)}`, "");
			if ($response?.headers?.["Content-Encoding"]) $response.headers["Content-Encoding"] = "identity";
			if ($response?.headers?.["content-encoding"]) $response.headers["content-encoding"] = "identity";
			if ($.isQuanX()) {
				switch (FORMAT) {
					case undefined: // 视为无body
						// 返回普通数据
						$.done({ headers: $response.headers });
						break;
					default:
						// 返回普通数据
						$.done({ headers: $response.headers, body: $response.body });
						break;
					case "application/x-protobuf":
					case "application/grpc":
					case "application/grpc+proto":
					//case "applecation/octet-stream":
						// 返回二进制数据
						//$.log(`${$response.bodyBytes.byteLength}---${$response.bodyBytes.buffer.byteLength}`);
						$.done({ headers: $response.headers, bodyBytes: $response.bodyBytes.buffer.slice($response.bodyBytes.byteOffset, $response.bodyBytes.byteLength + $response.bodyBytes.byteOffset) });
						break;
				};
			} else $.done($response);
			break;
		};
		case undefined: { // 无回复数据
			break;
		};
	};
})

/***************** Function *****************/
/**
 * Set Environment Variables
 * @author VirgilClyne
 * @param {String} name - Persistent Store Key
 * @param {Array} platforms - Platform Names
 * @param {Object} database - Default DataBase
 * @return {Object} { Settings, Caches, Configs }
 */
function setENV(name, platforms, database) {
	$.log(`☑️ ${$.name}, Set Environment Variables`, "");
	let { Settings, Caches, Configs } = getENV(name, platforms, database);
	/***************** Settings *****************/
	$.log(`✅ ${$.name}, Set Environment Variables`, `Settings: ${typeof Settings}`, `Settings内容: ${JSON.stringify(Settings)}`, "");
	/***************** Caches *****************/
	//$.log(`✅ ${$.name}, Set Environment Variables`, `Caches: ${typeof Caches}`, `Caches内容: ${JSON.stringify(Caches)}`, "");
	/***************** Configs *****************/
	return { Settings, Caches, Configs };
};

/***************** Env *****************/
// prettier-ignore
// https://github.com/chavyleung/scripts/blob/master/Env.min.js
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,a)=>{s.call(this,t,(t,s,r)=>{t?a(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}getEnv(){return"undefined"!=typeof $environment&&$environment["surge-version"]?"Surge":"undefined"!=typeof $environment&&$environment["stash-version"]?"Stash":"undefined"!=typeof module&&module.exports?"Node.js":"undefined"!=typeof $task?"Quantumult X":"undefined"!=typeof $loon?"Loon":"undefined"!=typeof $rocket?"Shadowrocket":void 0}isNode(){return"Node.js"===this.getEnv()}isQuanX(){return"Quantumult X"===this.getEnv()}isSurge(){return"Surge"===this.getEnv()}isLoon(){return"Loon"===this.getEnv()}isShadowrocket(){return"Shadowrocket"===this.getEnv()}isStash(){return"Stash"===this.getEnv()}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const a=this.getdata(t);if(a)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,a)=>e(a))})}runScript(t,e){return new Promise(s=>{let a=this.getdata("@chavy_boxjs_userCfgs.httpapi");a=a?a.replace(/\n/g,"").trim():a;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[i,o]=a.split("@"),n={url:`http://${o}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":i,Accept:"*/*"},timeout:r};this.post(n,(t,e,a)=>s(a))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),a=!s&&this.fs.existsSync(e);if(!s&&!a)return{};{const a=s?t:e;try{return JSON.parse(this.fs.readFileSync(a))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),a=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):a?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const a=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of a)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,a)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[a+1])>>0==+e[a+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,a]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,a,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,a,r]=/^@(.*?)\.(.*?)$/.exec(e),i=this.getval(a),o=a?"null"===i?null:i||"{}":"{}";try{const e=JSON.parse(o);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),a)}catch(e){const i={};this.lodash_set(i,r,t),s=this.setval(JSON.stringify(i),a)}}else s=this.setval(t,e);return s}getval(t){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.read(t);case"Quantumult X":return $prefs.valueForKey(t);case"Node.js":return this.data=this.loaddata(),this.data[t];default:return this.data&&this.data[t]||null}}setval(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.write(t,e);case"Quantumult X":return $prefs.setValueForKey(t,e);case"Node.js":return this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0;default:return this.data&&this.data[e]||null}}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){switch(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"],delete t.headers["content-type"],delete t.headers["content-length"]),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,a)=>{!t&&s&&(s.body=a,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,a)});break;case"Quantumult X":this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:a,headers:r,body:i,bodyBytes:o}=t;e(null,{status:s,statusCode:a,headers:r,body:i,bodyBytes:o},i,o)},t=>e(t&&t.error||"UndefinedError"));break;case"Node.js":let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:a,statusCode:r,headers:i,rawBody:o}=t,n=s.decode(o,this.encoding);e(null,{status:a,statusCode:r,headers:i,rawBody:o,body:n},n)},t=>{const{message:a,response:r}=t;e(a,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";switch(t.body&&t.headers&&!t.headers["Content-Type"]&&!t.headers["content-type"]&&(t.headers["content-type"]="application/x-www-form-urlencoded"),t.headers&&(delete t.headers["Content-Length"],delete t.headers["content-length"]),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,a)=>{!t&&s&&(s.body=a,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,a)});break;case"Quantumult X":t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:a,headers:r,body:i,bodyBytes:o}=t;e(null,{status:s,statusCode:a,headers:r,body:i,bodyBytes:o},i,o)},t=>e(t&&t.error||"UndefinedError"));break;case"Node.js":let a=require("iconv-lite");this.initGotEnv(t);const{url:r,...i}=t;this.got[s](r,i).then(t=>{const{statusCode:s,statusCode:r,headers:i,rawBody:o}=t,n=a.decode(o,this.encoding);e(null,{status:s,statusCode:r,headers:i,rawBody:o,body:n},n)},t=>{const{message:s,response:r}=t;e(s,r,r&&a.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let a={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in a)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?a[e]:("00"+a[e]).substr((""+a[e]).length)));return t}queryStr(t){let e="";for(const s in t){let a=t[s];null!=a&&""!==a&&("object"==typeof a&&(a=JSON.stringify(a)),e+=`${s}=${a}&`)}return e=e.substring(0,e.length-1),e}msg(e=t,s="",a="",r){const i=t=>{switch(typeof t){case void 0:return t;case"string":switch(this.getEnv()){case"Surge":case"Stash":default:return{url:t};case"Loon":case"Shadowrocket":return t;case"Quantumult X":return{"open-url":t};case"Node.js":return}case"object":switch(this.getEnv()){case"Surge":case"Stash":case"Shadowrocket":default:{let e=t.url||t.openUrl||t["open-url"];return{url:e}}case"Loon":{let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}case"Quantumult X":{let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl,a=t["update-pasteboard"]||t.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard":a}}case"Node.js":return}default:return}};if(!this.isMute)switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:$notification.post(e,s,a,i(r));break;case"Quantumult X":$notify(e,s,a,i(r));break;case"Node.js":}if(!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),a&&t.push(a),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t);break;case"Node.js":this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack)}}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;switch(this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:$done(t);break;case"Node.js":process.exit(1)}}}(t,e)}

/**
 * Get Environment Variables
 * @link https://github.com/VirgilClyne/GetSomeFries/blob/main/function/getENV/getENV.min.js
 * @author VirgilClyne
 * @param {String} key - Persistent Store Key
 * @param {Array} names - Platform Names
 * @param {Object} database - Default Database
 * @return {Object} { Settings, Caches, Configs }
 */
function getENV(key,names,database){let BoxJs=$.getjson(key,database),Argument={};if("undefined"!=typeof $argument&&Boolean($argument)){let arg=Object.fromEntries($argument.split("&").map((item=>item.split("="))));for(let item in arg)setPath(Argument,item,arg[item])}const Store={Settings:database?.Default?.Settings||{},Configs:database?.Default?.Configs||{},Caches:{}};Array.isArray(names)||(names=[names]);for(let name of names)Store.Settings={...Store.Settings,...database?.[name]?.Settings,...BoxJs?.[name]?.Settings,...Argument},Store.Configs={...Store.Configs,...database?.[name]?.Configs},BoxJs?.[name]?.Caches&&"string"==typeof BoxJs?.[name]?.Caches&&(BoxJs[name].Caches=JSON.parse(BoxJs?.[name]?.Caches)),Store.Caches={...Store.Caches,...BoxJs?.[name]?.Caches};return function traverseObject(o,c){for(var t in o){var n=o[t];o[t]="object"==typeof n&&null!==n?traverseObject(n,c):c(t,n)}return o}(Store.Settings,((key,value)=>("true"===value||"false"===value?value=JSON.parse(value):"string"==typeof value&&(value?.includes(",")?value=value.split(","):value&&!isNaN(value)&&(value=parseInt(value,10))),value))),Store;function setPath(object,path,value){path.split(".").reduce(((o,p,i)=>o[p]=path.split(".").length===++i?value:o[p]||{}),object)}}

// https://github.com/VirgilClyne/GetSomeFries/blob/main/function/URL/URLs.embedded.min.js
function URLs(t){return new class{constructor(t=[]){this.name="URL v1.2.2",this.opts=t,this.json={scheme:"",host:"",path:"",type:"",query:{}}}parse(t){let s=t.match(/(?:(?<scheme>.+):\/\/(?<host>[^/]+))?\/?(?<path>[^?]+)?\??(?<query>[^?]+)?/)?.groups??null;return s?.path?s.paths=s?.path?.split("/"):s.path="",s?.paths&&(s.type=s?.paths?.[s?.paths?.length-1]?.split(".")?.[1]),s?.query&&(s.query=Object.fromEntries(s.query.split("&").map((t=>t.split("="))))),s}stringify(t=this.json){let s="";return t?.scheme&&t?.host&&(s+=t.scheme+"://"+t.host),t?.path&&(s+=t?.host?"/"+t.path:t.path),t?.query&&(s+="?"+Object.entries(t.query).map((t=>t.join("="))).join("&")),s}}(t)}

// https://github.com/DualSubs/XML/blob/main/XML.embedded.min.js
function XMLs(opts){return new class{#ATTRIBUTE_KEY="@";#CHILD_NODE_KEY="#";#UNESCAPE={"&amp;":"&","&lt;":"<","&gt;":">","&apos;":"'","&quot;":'"'};#ESCAPE={"&":"&amp;","<":"&lt;",">":"&gt;","'":"&apos;",'"':"&quot;"};constructor(opts){this.name="XML v0.3.6-2",this.opts=opts,BigInt.prototype.toJSON=()=>this.toString()}parse(xml=new String,reviver=""){const UNESCAPE=this.#UNESCAPE,ATTRIBUTE_KEY=this.#ATTRIBUTE_KEY,CHILD_NODE_KEY=this.#CHILD_NODE_KEY;let json=function fromXML(elem,reviver){let object;switch(typeof elem){case"string":case"undefined":object=elem;break;case"object":const raw=elem.raw,name=elem.name,tag=elem.tag,children=elem.children;object=raw||(tag?function(tag,reviver){if(!tag)return;const list=tag.split(/([^\s='"]+(?:\s*=\s*(?:'[\S\s]*?'|"[\S\s]*?"|[^\s'"]*))?)/),length=list.length;let attributes,val;for(let i=0;i<length;i++){let str=removeSpaces(list[i]);if(!str)continue;attributes||(attributes={});const pos=str.indexOf("=");if(pos<0)str=ATTRIBUTE_KEY+str,val=null;else{val=str.substr(pos+1).replace(/^\s+/,""),str=ATTRIBUTE_KEY+str.substr(0,pos).replace(/\s+$/,"");const firstChar=val[0];firstChar!==val[val.length-1]||"'"!==firstChar&&'"'!==firstChar||(val=val.substr(1,val.length-2)),val=unescapeXML(val)}reviver&&(val=reviver(str,val)),addObject(attributes,str,val)}return attributes;function removeSpaces(str){return str?.trim?.()}}(tag,reviver):children?{}:{[name]:void 0}),"plist"===name?object=Object.assign(object,fromPlist(children[0],reviver)):children?.forEach?.(((child,i)=>{"string"==typeof child?addObject(object,CHILD_NODE_KEY,fromXML(child,reviver),void 0):child.tag||child.children||child.raw?addObject(object,child.name,fromXML(child,reviver),void 0):addObject(object,child.name,fromXML(child,reviver),children?.[i-1]?.name)})),reviver&&(object=reviver(name||"",object))}return object;function addObject(object,key,val,prevKey=key){if(void 0!==val){const prev=object[prevKey];Array.isArray(prev)?prev.push(val):prev?object[prevKey]=[prev,val]:object[key]=val}}}(function(text){const list=text.split(/<([^!<>?](?:'[\S\s]*?'|"[\S\s]*?"|[^'"<>])*|!(?:--[\S\s]*?--|\[[^\[\]'"<>]+\[[\S\s]*?]]|DOCTYPE[^\[<>]*?\[[\S\s]*?]|(?:ENTITY[^"<>]*?"[\S\s]*?")?[\S\s]*?)|\?[\S\s]*?\?)>/),length=list.length,root={children:[]};let elem=root;const stack=[];for(let i=0;i<length;){const str=list[i++];str&&appendText(str);const tag=list[i++];tag&&parseNode(tag)}return root;function parseNode(tag){let child={};switch(tag[0]){case"/":const closed=tag.replace(/^\/|[\s\/].*$/g,"").toLowerCase();for(;stack.length;){const tagName=elem?.name?.toLowerCase?.();if(elem=stack.pop(),tagName===closed)break}break;case"?":"xml"===tag.slice(1,4)?(child.name="?xml",child.raw=tag.slice(5,-1)):(child.name="?",child.raw=tag.slice(1,-1)),appendChild(child);break;case"!":"DOCTYPE"===tag.slice(1,8)?(child.name="!DOCTYPE",child.raw=tag.slice(9)):"[CDATA["===tag.slice(1,8)&&"]]"===tag.slice(-2)?(child.name="!CDATA",child.raw=tag.slice(9,-2)):(child.name="!",child.raw=tag.slice(1)),appendChild(child);break;default:if(child=function(tag){const elem={children:[]};tag=tag.replace(/\s*\/?$/,"");const pos=tag.search(/[\s='"\/]/);pos<0?elem.name=tag:(elem.name=tag.substr(0,pos),elem.tag=tag.substr(pos));return elem}(tag),appendChild(child),"/"===tag.slice(-1))delete child.children;else stack.push(elem),elem=child}}function appendText(str){(str=function(str){return str?.replace?.(/^(\r\n|\r|\n|\t)+|(\r\n|\r|\n|\t)+$/g,"")}(str))&&appendChild(unescapeXML(str))}function appendChild(child){elem.children.push(child)}}(xml),reviver);return json;function fromPlist(elem,reviver){let object;switch(typeof elem){case"string":case"undefined":object=elem;break;case"object":const name=elem.name,children=elem.children;switch(object={},name){case"plist":let plist=fromPlist(children[0],reviver);object=Object.assign(object,plist);break;case"dict":let dict=children.map((child=>fromPlist(child,reviver)));dict=function(source,length){var index=0,target=[];for(;index<source.length;)target.push(source.slice(index,index+=length));return target}(dict,2),object=Object.fromEntries(dict);break;case"array":Array.isArray(object)||(object=[]),object=children.map((child=>fromPlist(child,reviver)));break;case"key":object=children[0];break;case"true":case"false":const boolean=name;object=JSON.parse(boolean);break;case"integer":const integer=children[0];object=BigInt(integer);break;case"real":const real=children[0];object=parseFloat(real);break;case"string":object=children[0]}reviver&&(object=reviver(name||"",object))}return object}function unescapeXML(str){return str.replace(/(&(?:lt|gt|amp|apos|quot|#(?:\d{1,6}|x[0-9a-fA-F]{1,5}));)/g,(function(str){if("#"===str[1]){const code="x"===str[2]?parseInt(str.substr(3),16):parseInt(str.substr(2),10);if(code>-1)return String.fromCharCode(code)}return UNESCAPE[str]||str}))}}stringify(json=new Object,tab=""){this.#ESCAPE;const ATTRIBUTE_KEY=this.#ATTRIBUTE_KEY,CHILD_NODE_KEY=this.#CHILD_NODE_KEY;let XML="";for(let elem in json)XML+=toXml(json[elem],elem,"");return XML=tab?XML.replace(/\t/g,tab):XML.replace(/\t|\n/g,""),XML;function toXml(Elem,Name,Ind){let xml="";switch(typeof Elem){case"object":if(Array.isArray(Elem))xml=Elem.reduce(((prevXML,currXML)=>prevXML+`${Ind}${toXml(currXML,Name,`${Ind}\t`)}\n`),"");else{let attribute="",hasChild=!1;for(let name in Elem)name[0]===ATTRIBUTE_KEY?(attribute+=` ${name.substring(1)}="${Elem[name].toString()}"`,delete Elem[name]):void 0===Elem[name]?Name=name:hasChild=!0;if(xml+=`${Ind}<${Name}${attribute}${hasChild?"":"/"}>`,hasChild){if("plist"===Name)xml+=toPlist(Elem,Name,`${Ind}\t`);else for(let name in Elem)if(name===CHILD_NODE_KEY)xml+=Elem[name];else xml+=toXml(Elem[name],name,`${Ind}\t`);xml+=("\n"===xml.slice(-1)?Ind:"")+`</${Name}>`}}break;case"string":switch(Name){case"?xml":xml+=`${Ind}<${Name} ${Elem.toString()}?>\n`;break;case"?":xml+=`${Ind}<${Name}${Elem.toString()}${Name}>`;break;case"!":xml+=`${Ind}\x3c!--${Elem.toString()}--\x3e`;break;case"!DOCTYPE":xml+=`${Ind}<!DOCTYPE ${Elem.toString()}>`;break;case"!CDATA":xml+=`${Ind}<![CDATA[${Elem.toString()}]]>`;case CHILD_NODE_KEY:xml+=Elem;break;default:xml+=`${Ind}<${Name}>${Elem.toString()}</${Name}>`}break;case"undefined":xml+=Ind+`<${Name.toString()}/>`}return xml}function toPlist(Elem,Name,Ind){let plist="";switch(typeof Elem){case"boolean":plist=`${Ind}<${Elem.toString()}/>`;break;case"number":plist=`${Ind}<real>${Elem.toString()}</real>`;break;case"bigint":plist=`${Ind}<integer>${Elem.toString()}</integer>`;break;case"string":plist=`${Ind}<string>${Elem.toString()}</string>`;break;case"object":let array="";if(Array.isArray(Elem)){for(var i=0,n=Elem.length;i<n;i++)array+=`${Ind}${toPlist(Elem[i],Name,`${Ind}\t`)}`;plist=`${Ind}<array>${array}${Ind}</array>`}else{let dict="";Object.entries(Elem).forEach((([key,value])=>{dict+=`${Ind}<key>${key}</key>`,dict+=toPlist(value,key,Ind)})),plist=`${Ind}<dict>${dict}${Ind}</dict>`}}return plist}}}(opts)}
// refer: https://github.com/Peng-YM/QuanX/blob/master/Tools/XMLParser/xml-parser.js
// refer: https://goessner.net/download/prj/jsonxml/json2xml.js
function XMLs(opts) {
	return new (class {
		#ATTRIBUTE_KEY = "@";
		#CHILD_NODE_KEY = "#";
		#UNESCAPE = {
			"&amp;": "&",
			"&lt;": "<",
			"&gt;": ">",
			"&apos;": "'",
			"&quot;": '"'
		};
		#ESCAPE = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			"'": "&apos;",
			'"': "&quot;"
		};
		
		constructor(opts) {
			this.name = "XML v0.4.0";
			this.opts = opts;
			BigInt.prototype.toJSON = () => this.toString();
		};

		parse(xml = new String, reviver = "") {
			const UNESCAPE = this.#UNESCAPE;
			const ATTRIBUTE_KEY = this.#ATTRIBUTE_KEY;
			const CHILD_NODE_KEY = this.#CHILD_NODE_KEY;
			$.log(`☑️ ${$.name}, parse XML`, "");
			const DOM = toDOM(xml);
			//$.log(`🚧 ${$.name}, parse XML`, `toDOM: ${JSON.stringify(DOM)}`, "");
			let json = fromXML(DOM, reviver);
			//$.log(`🚧 ${$.name}, parse XML`, `json: ${JSON.stringify(json)}`, "");
			return json;

			/***************** Fuctions *****************/
			function toDOM(text) {
				$.log(`☑️ ${$.name}, toDOM`, "");
				const list = text.replace(/^[ \t]+/gm, "")
					.split(/<([^!<>?](?:'[\S\s]*?'|"[\S\s]*?"|[^'"<>])*|!(?:--[\S\s]*?--|\[[^\[\]'"<>]+\[[\S\s]*?]]|DOCTYPE[^\[<>]*?\[[\S\s]*?]|(?:ENTITY[^"<>]*?"[\S\s]*?")?[\S\s]*?)|\?[\S\s]*?\?)>/);
				$.log(`🚧 ${$.name}, toDOM`, `list: ${JSON.stringify(list)}`, "");
				const length = list.length;

				// root element
				const root = { children: [] };
				let elem = root;

				// dom tree stack
				const stack = [];

				// parse
				for (let i = 0; i < length;) {
					// text node
					const str = list[i++];
					if (str) appendText(str);

					// child node
					const tag = list[i++];
					if (tag) parseNode(tag);
				}
				$.log(`✅ ${$.name}, toDOM`, `root: ${JSON.stringify(root)}`, "");
				return root;
				/***************** Fuctions *****************/
				function parseNode(tag) {
					//$.log(`🚧 ${$.name}, toDOM`, `tag: ${tag}`, "")
					const tags = tag.split(" ");
					//$.log(`🚧 ${$.name}, toDOM`, `tags: ${tags}`, "")
					const name = tags.shift();
					const length = tags.length;
					$.log(`🚧 ${$.name}, toDOM`, `name: ${name}, tags: ${tags}`, "")
					let child = {};
					switch (name[0]) {
						case "/":
							// close tag
							const closed = tag.replace(/^\/|[\s\/].*$/g, "").toLowerCase();
							while (stack.length) {
								const tagName = elem?.name?.toLowerCase?.();
								elem = stack.pop();
								if (tagName === closed) break;
							}
							break;
						case "?":
							// XML declaration
							child.name = name;
							child.raw = tags.join(" ");
							appendChild(child);
							break;
						case "!":
							if (/!\[CDATA\[(.+)\]\]/.test(tag)) {
								// CDATA section
								child.name = "!CDATA";
								//child.raw = tag.slice(9, -2);
								child.raw = tag.match(/!\[CDATA\[(.+)\]\]/);
								//appendText(tag.slice(9, -2));
							} else {
								// Comment section
								child.name = name;
								child.raw = tags.join(" ");
							};
							appendChild(child);
							break;
						default:
							child = openTag(tag);
							appendChild(child);
							switch (name) {
								case "link":
									delete child.children; // emptyTag
									break;
								default:
									switch (tags[length - 1]) {
										case "/":
											//child.hasChild = false; // emptyTag
											delete child.children; // emptyTag
											break;
										default:
											stack.push(elem); // openTag
											elem = child;
											break;
									};
									break;
							};
							break;
					}

					function openTag(tag) {
						const elem = { children: [] };
						tag = tag.replace(/\s*\/?$/, "");
						const pos = tag.search(/[\s='"\/]/);
						if (pos < 0) {
							elem.name = tag;
						} else {
							elem.name = tag.substr(0, pos);
							elem.tag = tag.substr(pos);
						}
						return elem;
					}
				}

				function appendText(str) {
					//str = removeSpaces(str);
					str = removeBreakLine(str);
					//str = str?.trim?.();
					if (str) appendChild(unescapeXML(str));

					function removeBreakLine(str) {
						return str?.replace?.(/^(\r\n|\r|\n|\t)+|(\r\n|\r|\n|\t)+$/g, "");
					}
				}

				function appendChild(child) {
					elem.children.push(child);
				}
			};
			/***************** Fuctions *****************/
			function fromPlist(elem, reviver) {
				//$.log(`☑️ ${$.name}, fromPlist`, `typeof elem: ${typeof elem}`, "");
				//$.log(`🚧 ${$.name}, fromPlist`, `elem: ${JSON.stringify(elem)}`, "");
				let object;
				switch (typeof elem) {
					case "string":
					case "undefined":
						object = elem;
						break;
					case "object":
						//default:
						const name = elem.name;
						const children = elem.children;

						object = {};
						//$.log(`🚧 ${$.name}, fromPlist`, `object: ${JSON.stringify(object)}`, "");

						switch (name) {
							case "plist":
								let plist = fromPlist(children[0], reviver);
								object = Object.assign(object, plist)
								break;
							case "dict":
								let dict = children.map(child => fromPlist(child, reviver));
								//$.log(`🚧 ${$.name}, fromPlist`, `middle dict: ${JSON.stringify(dict)}`, "");
								dict = chunk(dict, 2);
								object = Object.fromEntries(dict);
								//$.log(`🚧 ${$.name}, fromPlist`, `after dict: ${JSON.stringify(dict)}`, "");
								break;
							case "array":
								if (!Array.isArray(object)) object = [];
								object = children.map(child => fromPlist(child, reviver));
								break;
							case "key":
								const key = children[0];
								//$.log(`🚧 ${$.name}, fromPlist`, `key: ${key}`, "");
								object = key;
								break;
							case "true":
							case "false":
								const boolean = name;
								//$.log(`🚧 ${$.name}, fromPlist`, `boolean: ${boolean}`, "");
								object = JSON.parse(boolean);
								break;
							case "integer":
								const integer = children[0];
								$.log(`🚧 ${$.name}, fromPlist`, `integer: ${integer}`, "");
								//object = parseInt(integer);
								object = BigInt(integer);
								break;
							case "real":
								const real = children[0];
								$.log(`🚧 ${$.name}, fromPlist`, `real: ${real}`, "");
								//const digits = real.split(".")[1]?.length || 0;
								object = parseFloat(real)//.toFixed(digits);
								break;
							case "string":
								const string = children[0];
								//$.log(`🚧 ${$.name}, fromPlist`, `string: ${string}`, "");
								object = string;
								break;
						};
						if (reviver) object = reviver(name || "", object);
						break;
				}
				//$.log(`✅ ${$.name}, fromPlist`, `object: ${JSON.stringify(object)}`, "");
				return object;

				/** 
				 * Chunk Array
				 * @author VirgilClyne
				 * @param {Array} source - source
				 * @param {Number} length - number
				 * @return {Array<*>} target
				 */
				function chunk(source, length) {
					//$.log(`☑️ ${$.name}, Chunk Array`, "");
					var index = 0, target = [];
					while (index < source.length) target.push(source.slice(index, index += length));
					//$.log(`✅ ${$.name}, Chunk Array`, `target: ${JSON.stringify(target)}`, "");
					return target;
				};
			}

			function fromXML(elem, reviver) {
				//$.log(`☑️ ${$.name}, fromXML`, `typeof elem: ${typeof elem}`, "");
				let object;
				switch (typeof elem) {
					case "string":
					case "undefined":
						object = elem;
						break;
					case "object":
					//default:
						const raw = elem.raw;
						const name = elem.name;
						const tag = elem.tag;
						const children = elem.children;

						if (raw) object = raw;
						else if (tag) object = parseAttribute(tag, reviver);
						else if (!children) object = { [name]: undefined };
						else object = {};
						//$.log(`🚧 ${$.name}, fromXML`, `object: ${JSON.stringify(object)}`, "");

						if (name === "plist") object = Object.assign(object, fromPlist(children[0], reviver));
						else children?.forEach?.((child, i) => {
							if (typeof child === "string") addObject(object, CHILD_NODE_KEY, fromXML(child, reviver), undefined)
							else if (!child.tag && !child.children && !child.raw) addObject(object, child.name, fromXML(child, reviver), children?.[i - 1]?.name)
							else addObject(object, child.name, fromXML(child, reviver), undefined)
						});
						if (children && children.length === 0) addObject(object, CHILD_NODE_KEY, null, undefined);
						/*
						if (Object.keys(object).length === 0) {
							if (elem.name) object[elem.name] = (elem.hasChild === false) ? null : "";
							else object = (elem.hasChild === false) ? null : "";
						}
						*/
						
						//if (Object.keys(object).length === 0) addObject(object, elem.name, (elem.hasChild === false) ? null : "");
						//if (Object.keys(object).length === 0) object = (elem.hasChild === false) ? undefined : "";
						if (reviver) object = reviver(name || "", object);
						break;
				}
				//$.log(`✅ ${$.name}, fromXML`, `object: ${JSON.stringify(object)}`, "");
				return object;
				/***************** Fuctions *****************/
				function parseAttribute(tag, reviver) {
					if (!tag) return;
					const list = tag.split(/([^\s='"]+(?:\s*=\s*(?:'[\S\s]*?'|"[\S\s]*?"|[^\s'"]*))?)/);
					const length = list.length;
					let attributes, val;

					for (let i = 0; i < length; i++) {
						let str = removeSpaces(list[i]);
						//let str = removeBreakLine(list[i]);
						//let str = list[i]?.trim?.();
						if (!str) continue;

						if (!attributes) {
							attributes = {};
						}

						const pos = str.indexOf("=");
						if (pos < 0) {
							// bare attribute
							str = ATTRIBUTE_KEY + str;
							val = null;
						} else {
							// attribute key/value pair
							val = str.substr(pos + 1).replace(/^\s+/, "");
							str = ATTRIBUTE_KEY + str.substr(0, pos).replace(/\s+$/, "");

							// quote: foo="FOO" bar='BAR'
							const firstChar = val[0];
							const lastChar = val[val.length - 1];
							if (firstChar === lastChar && (firstChar === "'" || firstChar === '"')) {
								val = val.substr(1, val.length - 2);
							}

							val = unescapeXML(val);
						}
						if (reviver) val = reviver(str, val);

						addObject(attributes, str, val);
					}

					return attributes;

					function removeSpaces(str) {
						//return str && str.replace(/^\s+|\s+$/g, "");
						return str?.trim?.();
					}
				}

				function addObject(object, key, val, prevKey = key) {
					if (typeof val === "undefined") return;
					else {
						const prev = object[prevKey];
						//const curr = object[key];
						if (Array.isArray(prev)) prev.push(val);
						else if (prev) object[prevKey] = [prev, val];
						else object[key] = val;
					}
				}
			}

			function unescapeXML(str) {
				return str.replace(/(&(?:lt|gt|amp|apos|quot|#(?:\d{1,6}|x[0-9a-fA-F]{1,5}));)/g, function (str) {
					if (str[1] === "#") {
						const code = (str[2] === "x") ? parseInt(str.substr(3), 16) : parseInt(str.substr(2), 10);
						if (code > -1) return String.fromCharCode(code);
					}
					return UNESCAPE[str] || str;
				});
			}

		};

		stringify(json = new Object, tab = "") {
			const ESCAPE = this.#ESCAPE;
			const ATTRIBUTE_KEY = this.#ATTRIBUTE_KEY;
			const CHILD_NODE_KEY = this.#CHILD_NODE_KEY;
			$.log(`☑️ ${$.name}, stringify XML`, "");
			let XML = "";
			for (let elem in json) XML += toXml(json[elem], elem, "");
			XML = tab ? XML.replace(/\t/g, tab) : XML.replace(/\t|\n/g, "");
			//$.log(`🚧 ${$.name}, stringify XML`, `XML: ${XML}`, "");
			return XML;
			/***************** Fuctions *****************/
			function toXml(Elem, Name, Ind) {
				let xml = "";
				switch (typeof Elem) {
					case "object":
						if (Array.isArray(Elem)) {
							xml = Elem.reduce(
								(prevXML, currXML) => prevXML += `${Ind}${toXml(currXML, Name, `${Ind}\t`)}\n`,
								""
							);
						} else {
							let attribute = "";
							let hasChild = false;
							for (let name in Elem) {
								if (name[0] === ATTRIBUTE_KEY) {
									attribute += ` ${name.substring(1)}=\"${Elem[name].toString()}\"`;
									delete Elem[name];
								} else if (Elem[name] === undefined) Name = name;
								else hasChild = true;
							}
							xml += `${Ind}<${Name}${attribute}${(hasChild || Name === "link") ? "" : "/"}>`;
							
							if (hasChild) {
								if (Name === "plist") xml += toPlist(Elem, Name, `${Ind}\t`);
								else {
									for (let name in Elem) {
										$.log(`🚧 ${$.name}, stringify XML`, `name: ${name}`, "")
										switch (name) {
											case CHILD_NODE_KEY:
												xml += Elem[name] ?? "";
												break;
											default:
												xml += toXml(Elem[name], name, `${Ind}\t`);
												break;
										};
									};
								};
								xml += (xml.slice(-1) === "\n" ? Ind : "") + `</${Name}>`;
							};
						};
						break;
					case "string":
						switch (Name) {
							case "?xml":
								xml += `${Ind}<${Name} ${Elem.toString()}?>\n`;
								break;
							case "?":
								xml += `${Ind}<${Name}${Elem.toString()}${Name}>`;
								break;
							case "!":
								xml += `${Ind}<!--${Elem.toString()}-->`;
								break;
							case "!DOCTYPE":
								xml += `${Ind}<!DOCTYPE ${Elem.toString()}>`;
								break;
							case "!CDATA":
								xml += `${Ind}<![CDATA[${Elem.toString()}]]>`;
							case CHILD_NODE_KEY:
								xml += Elem;
								break;
							default:
								xml += `${Ind}<${Name}>${Elem.toString()}</${Name}>`;
						};
						break;
					case "undefined":
						xml += Ind + `<${Name.toString()}/>`;
						break;
				};
				$.log(`✅ ${$.name}, toXml`, `xml: ${xml}`, "");
				return xml;
			};

			function toPlist(Elem, Name, Ind) {
				$.log(`☑️ ${$.name}, toPlist`, `typeof Elem: ${typeof Elem}`, "");
				//$.log(`🚧 ${$.name}, toPlist`, `Elem: ${JSON.stringify(Elem)}`, "");
				let plist = "";
				switch (typeof Elem) {
					case "boolean":
						plist = `${Ind}<${Elem.toString()}/>`;
						break;
					case "number":
						plist = `${Ind}<real>${Elem.toString()}</real>`;
						break;
					case "bigint":
						plist = `${Ind}<integer>${Elem.toString()}</integer>`;
						break;
					case "string":
						plist = `${Ind}<string>${Elem.toString()}</string>`;
						break;
					case "object":
						let array = "";
						if (Array.isArray(Elem)) {
							for (var i = 0, n = Elem.length; i < n; i++) array += `${Ind}${toPlist(Elem[i], Name, `${Ind}\t`)}`;
							plist = `${Ind}<array>${array}${Ind}</array>`;
						} else {
							let dict = "";
							Object.entries(Elem).forEach(([key, value]) => {
								dict += `${Ind}<key>${key}</key>`;
								dict += toPlist(value, key, Ind);
							});
							plist = `${Ind}<dict>${dict}${Ind}</dict>`;
						};
						break;
				}
				$.log(`✅ ${$.name}, toPlist`, `plist: ${plist}`, "");
				return plist;
			};
		};
	})(opts)
}
