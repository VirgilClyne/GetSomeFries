/*
README:https://github.com/VirgilClyne/GetSomeFries
*/

const $ = new Env('Disney+');

/***************** database *****************/
const database = {
	"flows": { // 覆盖层
		"star": { // STAR
			"eligibleForOnboarding": true, // 允许登陆
			//"isOnboarded": false // 已登陆
		}, // 未知
		"marketingPreferences": {
			"eligibleForOnboarding": false, // 允许登陆
			//"isOnboarded": true // 已登陆
		}
	},
	"location": {
		// 🇭🇰HongKong 1
		"HK1": {
			"region_name": "",
			"type": "COUNTRY_CODE",
			"asn": 141677,
			"zip_code": "",
			"state_name": "",
			"country_code": "HK",
			"carrier": "nathosts limited",
			"city_name": "",
			"connection_type": "",
			"dma": 0
		},
		// 🇭🇰HongKong 2
		"HK2": {
			"regionName": "",
			"countryCode": "HK",
			"asn": 9304,
			"type": "COUNTRY_CODE",
			"dma": 0,
			"connectionType": "mobile wireless",
			"zipCode": ""
		},
		// 🇭🇰HongKong 3
		"HK3": {
			"regionName": "",
			"countryCode": "HK",
			"asn": 4760,
			"type": "COUNTRY_CODE",
			"dma": 0,
			"connectionType": "tx",
			"zipCode": ""
		},
		// 🇭🇰HongKong 4
		"HK4": {
			"region_name": "",
			"type": "COUNTRY_CODE",
			"asn": 9304,
			"zip_code": "",
			"state_name": "",
			"country_code": "HK",
			"carrier": "hgc global communications limited",
			"city_name": "",
			"connection_type": "mobile wireless",
			"dma": 0
		},
		// 🇹🇼TaiWan 1
		"TW1": {
			"region_name": "",
			"type": "ZIP_CODE",
			"asn": 3462,
			"zip_code": "100",
			"state_name": "taipei",
			"country_code": "TW",
			"carrier": "data communication business group",
			"city_name": "zhongzheng district",
			"connection_type": "dsl",
			"dma": 0
		},
		// 🇹🇼TaiWan 2
		"TW2": {
			"regionName": "unknown",
			"countryCode": "TW",
			"asn": 3462,
			"type": "ZIP_CODE",
			"dma": 0,
			"connectionType": "dsl",
			"zipCode": "104"
		},
		// 🇸🇬Singapore 1
		"SG1": {
			"city_name": "",
			"connection_type": "",
			"zip_code": "",
			"dma": 0,
			"state_name": "",
			"asn": 41378,
			"region_name": "",
			"type": "COUNTRY_CODE",
			"country_code": "SG",
			"carrier": "kirino llc"
		},
		// 🇸🇬Singapore 2
		"SG2": {
			"type": "COUNTRY_CODE",
			"countryCode": "SG",
			"dma": 0,
			"asn": 41378,
			"regionName": "",
			"connectionType": "",
			"zipCode": ""
		},
		// 🇺🇸UnitedStates 1
		"US1": {
			"region_name": "northeast",
			"type": "ZIP_CODE",
			"asn": 46997,
			"zip_code": "13235",
			"state_name": "new york",
			"country_code": "US",
			"carrier": "black mesa corporation",
			"city_name": "syracuse",
			"connection_type": "",
			"dma": 555
		},
		// 🇺🇸UnitedStates 2
		"US2": {
			"regionName": "northeast",
			"countryCode": "US",
			"asn": 396948,
			"type": "ZIP_CODE",
			"dma": 501,
			"connectionType": "tx",
			"zipCode": "10017"
		},
		// 🇺🇸UnitedStates 3
		"US3": {
			"region_name": "southwest",
			"type": "ZIP_CODE",
			"asn": 3356,
			"zip_code": "95122",
			"state_name": "california",
			"country_code": "US",
			"carrier": "level 3 parent  llc",
			"city_name": "san jose",
			"connection_type": "tx",
			"dma": 807
		},
	},
	"maturityRating": {
		// 🇭🇰HongKong & 🇹🇼TaiWan
		"DisneyPlusAPAC": {
			"ratingSystem": "DisneyPlusAPAC",
		},
		// 🇸🇬Singapore
		"MDA": {
			"ratingSystem": "MDA",
			"ratingSystemValues": [
				"G",
				"PG",
				"PG13",
				"NC16",
				"M18",
				"R21"
			],
			"contentMaturityRating": "PG13",
			"maxRatingSystemValue": "R21",
			"isMaxContentMaturityRating": false
		},
		// 🇺🇸UnitedStates
		"MPAAAndTVPG": {
			"ratingSystem": "MPAAAndTVPG",
		},
		// EU
		"AI": {
			"ratingSystem": "AI",
			"isMaxContentMaturityRating": true,
			"contentMaturityRating": "18+",
			"maxRatingSystemValue": "18+",
			"ratingSystemValues": [
				"GA",
				"7+",
				"13+",
				"18+"
			]
		}
	},
	"home_location": { // 主页定义
		"country_code": "" // 国家
	},
	"extensions": {
		"sdk": {
			"session": {
				"entitlements": [
					"DISNEY_HULU_ADS",
					"DISNEY_PLUS",
					"ESPN_PLUS"
				],
				"inSupportedLocation": true,
				//"isSubscriber": true,
				"preferredMaturityRating": {
					"DisneyPlusAPAC": {
						"impliedMaturityRating": 1450,
						"ratingSystem": "DisneyPlusAPAC"
					},
					"MDA": {
						"impliedMaturityRating": 1499,
						"ratingSystem": "MDA"
					},
					"MPAAAndTVPG": {
						"impliedMaturityRating": 1899,
						"ratingSystem": "MPAAAndTVPG"
					}
				}
			}
		}
	}
};

// Default Settings
$.Disney_Plus = {
	"settings": {
		"region": "SG", // 内容区域代码
		"maturityRating": "MDA", // 分级系统
		"location": "SG1", // 地理位置信息
		"entitlements": "", // 账户权益
		"flows": "star", // 内容目录
	},
	"flows": {},
	"location": {},
	"maturityRating": {},
	"extensions": {
		"sdk": {
			"session": {}
		}
	}
};
// BoxJs Function Supported
if ($.getdata("GetSomeFries")) {
	$.log(`🎉 ${$.name}, BoxJs`);
	// load user prefs from BoxJs
	const GetSomeFries = $.getdata("GetSomeFries")
	$.log(`🚧 ${$.name}, BoxJs调试信息, GetSomeFries类型: ${typeof GetSomeFries}`, `GetSomeFries内容: ${GetSomeFries}`, "");
	if (JSON.parse($.getdata("GetSomeFries"))?.Disney_Plus) {
		$.Disney_Plus = JSON.parse($.getdata("GetSomeFries")).Disney_Plus
		$.log('Disney_Plus:' + JSON.stringify($.Disney_Plus))
	}
}
// Argument Function Supported
else if (typeof $argument != "undefined") {
	let arg = Object.fromEntries($argument.split("&").map((item) => item.split("=")));
	console.log(JSON.stringify(arg));
	$.Disney_Plus.settings.region = arg?.region ?? "SG";
	$.Disney_Plus.settings.maturityRating = arg?.maturityRating ?? "MDA";
	$.Disney_Plus.settings.location = arg?.location ?? "SG";
	$.Disney_Plus.settings.flows = arg?.flows ?? "star";
};
$.log(`🚧 ${$.name}, BoxJs调试信息, $.Disney_Plus内容: ${JSON.stringify($.Disney_Plus)}`);

var url = $request.url;

const url0 = "disney.content.edge.bamgrid.com/svc";
const path1 = "/token";
const path2 = "/session";
const path3 = "/v1/public/graphql";
const path4 = "/graph/v1/device/graphql";
const path5 = "/svc/content/DmcVideo";

if (url.search(url0) != -1) {
	$.log(url0);
	$.log($.Disney_Plus.settings.region);
	$.log('before, url:' + url);
	const Regular = /(?<baseurl>.*)\/content\/(?<content>.*)\/version\/(?<version>\d\.\d)\/region\/(?<region>[A-Z]{2}|undefined)\/(?<other>.*)/i;
	url = url.replace(Regular, `$<baseurl>/content/$<content>/version/$<version>/region/${$.Disney_Plus.settings.region}/$<other>`);
	$.log('after, url:' + url);
	$.done({ url });
};

if ($response?.status == 200) {
	// 构建数据
	if ($.Disney_Plus.settings.location != "default") $.Disney_Plus.location = database.location[`${$.Disney_Plus.settings.location}`];
	if ($.Disney_Plus.settings.maturityRating != "default") $.Disney_Plus.maturityRating = database.maturityRating[`${$.Disney_Plus.settings.maturityRating}`];
	$.Disney_Plus.extensions = database.extensions;
	if ($.Disney_Plus.settings.maturityRating != "default") $.Disney_Plus.extensions.sdk.session.preferredMaturityRating = database.extensions.sdk.session.preferredMaturityRating[`${$.Disney_Plus.settings.maturityRating}`];
	//if($.Disney_Plus.settings.flows == "star") $.Disney_Plus.flows.star = database.flows.star;
	//if($.Disney_Plus.settings.flows == "hulu") $.Disney_Plus.flows.hulu = database.flows.hulu;
	$.Disney_Plus.flows = database.flows;
	$.log(`🚧 ${$.name}, 调试信息, $.Disney_Plus构建内容: ${JSON.stringify($.Disney_Plus)}`);
	/*
	if (url.search(path1) != -1) {
		let status = $response.status;
		let body = $response.body;
		let token = JSON.parse(body);
		console.log(path1);
		if (isLoon && (status = 400)){
			if (token.error) console.log(token.error);
			if (token.error_description) console.log(token.error_description);
			$done({})
		} else if (isQuanX && (status = "HTTP/1.1 400 Bad Request")){
			if (token.error) console.log(token.error);
			if (token.error_description) console.log(token.error_description);
			$done({})
		} else if (isSurge && (status = 400)){
			if (token.error) console.log(token.error);
			if (token.error_description) console.log(token.error_description);
			$done({})
		} else {
			if (token.refresh_token) console.log(token.refresh_token);
			if (token.token_type) console.log(token.token_type);
			if (token.access_token) console.log(token.access_token);
			if (token.expires_in) console.log(token.expires_in);
			$done({})
		}
	};
	*/

	if (url.search(path2) != -1) {
		let body = $response.body;
		$.log(path2);
		let session = JSON.parse(body);
		// location
		if ($.Disney_Plus.settings.location != "default") {
			// location
			if (session?.location) session.location = $.Disney_Plus?.location ?? session.location;
			// homeLocation
			//if (session?.home_location) session.home_location = $.Disney_Plus?.home_location ?? session.home_location;
		};
		body = JSON.stringify(session);
		$.done({ body });
	};

	if (url.search(path3) != -1) {
		let body = $response.body;
		$.log(path3);
		let graphql = JSON.parse(body);
		// location
		if ($.Disney_Plus.settings.location != "default") {
			// country
			if (graphql?.data?.me?.account?.attributes?.locations?.manual?.country) graphql.data.me.account.attributes.locations.manual.country = $.Disney_Plus?.location?.country_code ?? graphql.data.me.account.attributes.locations.manual.country;
			if (graphql?.data?.login?.account?.attributes?.locations?.manual?.country) graphql.data.login.account.attributes.locations.manual.country = $.Disney_Plus?.location?.country_code ?? graphql.data.login.account.attributes.locations.manual.country;
			if (graphql?.data?.me?.account?.attributes?.locations?.purchase?.country) graphql.data.me.account.attributes.locations.purchase.country = $.Disney_Plus?.location?.country_code ?? graphql.data.me.account.attributes.locations.purchase.country;
			if (graphql?.data?.login?.account?.attributes?.locations?.purchase?.country) graphql.data.login.account.attributes.locations.purchase.country = $.Disney_Plus?.location?.country_code ?? graphql.data.login.account.attributes.locations.purchase.country;
			// location
			if (graphql?.data?.activeSession?.location) graphql.data.activeSession.location = $.Disney_Plus?.location ?? graphql.data.activeSession.location;
			if (graphql?.data?.me?.activeSession?.location) graphql.data.me.activeSession.location = $.Disney_Plus?.location ?? graphql.data.me.activeSession.location;
			if (graphql?.extensions?.sdk?.session?.location) graphql.extensions.sdk.session.location = $.Disney_Plus?.location ?? graphql.extensions.sdk.session.location;
			if (graphql?.data?.login?.activeSession?.location) graphql.data.login.activeSession.location = $.Disney_Plus?.location ?? graphql.data.login.activeSession.location;
			// homeLocation
			//if (graphql?.data?.activeSession?.homeLocation) graphql.data.activeSession.homeLocation = $.Disney_Plus?.home_location ?? graphql.data.activeSession.homeLocation;
			//if (graphql?.data?.me?.activeSession?.homeLocation) graphql.data.me.activeSession.homeLocation = $.Disney_Plus?.home_location ?? graphql.data.me.activeSession.homeLocation;
			//if (graphql?.extensions?.sdk?.session?.homeLocation) graphql.extensions.sdk.session.homeLocation = $.Disney_Plus?.home_location ?? graphql.extensions.sdk.session.homeLocation;
			//if (graphql?.data?.login?.activeSession?.homeLocation) graphql.data.login.activeSession.homeLocation = $.Disney_Plus?.home_location ?? graphql.data.login.activeSession.homeLocation;
		};
		// entitlements
		if ($.Disney_Plus.settings.entitlements != "default") {
			if (graphql?.data?.activeSession?.entitlements) graphql.data.activeSession.entitlements = $.Disney_Plus?.extensions.sdk.session.entitlements ?? graphql.data.activeSession.entitlements;
			if (graphql?.data?.me?.activeSession?.entitlements) graphql.data.me.activeSession.entitlements = $.Disney_Plus?.extensions.sdk.session.entitlements ?? graphql.data.me.activeSession.entitlements;
			if (graphql?.extensions?.sdk?.session?.entitlements) graphql.extensions.sdk.session.entitlements = $.Disney_Plus?.extensions.sdk.session.entitlements ?? graphql.extensions.sdk.session.entitlements;
			if (graphql?.data?.login?.activeSession?.entitlements) graphql.data.login.activeSession.entitlements = $.Disney_Plus?.extensions.sdk.session.entitlements ?? graphql.data.login.activeSession.entitlements;
		};
		// inSupportedLocation
		if (graphql?.data?.activeSession?.inSupportedLocation) graphql.data.activeSession.inSupportedLocation = $.Disney_Plus?.extensions.sdk.session.inSupportedLocation ?? graphql.data.activeSession.inSupportedLocation;
		if (graphql?.data?.me?.activeSession?.inSupportedLocation) graphql.data.me.activeSession.inSupportedLocation = $.Disney_Plus?.extensions.sdk.session.inSupportedLocation ?? graphql.data.me.activeSession.inSupportedLocation;
		if (graphql?.data?.login?.activeSession?.inSupportedLocation) graphql.data.login.activeSession.entitlements = $.Disney_Plus?.extensions.sdk.session.inSupportedLocation ?? graphql.data.login.activeSession.inSupportedLocation;
		if (graphql?.extensions?.sdk?.session?.inSupportedLocation) graphql.extensions.sdk.session.inSupportedLocation = $.Disney_Plus?.extensions.sdk.session.inSupportedLocation ?? graphql.extensions.sdk.session.inSupportedLocation;
		// MaturityRating
		if ($.Disney_Plus.settings.maturityRating != "default") {
			// preferredMaturityRating
			if (graphql?.data?.activeSession?.preferredMaturityRating) graphql.data.activeSession.preferredMaturityRating = $.Disney_Plus?.extensions.sdk.session.preferredMaturityRating ?? graphql.data.activeSession.preferredMaturityRating;
			if (graphql?.data?.me?.activeSession?.preferredMaturityRating) graphql.data.me.activeSession.preferredMaturityRating = $.Disney_Plus?.extensions.sdk.session.preferredMaturityRating ?? graphql.data.me.activeSession.preferredMaturityRating;
			if (graphql?.data?.login?.activeSession?.preferredMaturityRating) graphql.data.login.activeSession.preferredMaturityRating = $.Disney_Plus?.extensions.sdk.session.preferredMaturityRating ?? graphql.data.login.activeSession.preferredMaturityRating;
			if (graphql?.extensions?.sdk?.session?.preferredMaturityRating) graphql.extensions.sdk.session.preferredMaturityRating = $.Disney_Plus?.extensions.sdk.session.preferredMaturityRating ?? graphql.extensions.sdk.session.preferredMaturityRating;
			// maturityRating
			if (graphql?.data?.login?.account?.activeProfile) graphql.data.login.account.activeProfile.maturityRating = $.Disney_Plus?.maturityRating ?? graphql.data.login.account.activeProfile.maturityRating;
			for (var item in graphql?.data?.me?.account?.profiles) graphql.data.me.account.profiles[item].maturityRating = $.Disney_Plus?.maturityRating ?? graphql.data.me.account.profiles[item].maturityRating;
			for (var item in graphql?.data?.login?.account?.profiles) graphql.data.login.account.profiles[item].maturityRating = $.Disney_Plus?.maturityRating ?? graphql.data.login.account.profiles[item].maturityRating;
		};
		// flows
		if ($.Disney_Plus.settings.flows != "default") {
			if (graphql?.data?.me?.account?.activeProfile?.flows) graphql.data.me.account.activeProfile.flows = $.Disney_Plus?.flows ?? graphql.data.me.account.activeProfile.flows;
			for (var item in graphql?.data?.me?.account?.profiles) graphql.data.me.account.profiles[item].flows = $.Disney_Plus?.flows ?? graphql.data.me.account.activeProfile[item].flows;
			for (var item in graphql?.data?.login?.account?.profiles) graphql.data.login.account.profiles[item].flows = $.Disney_Plus?.flows ?? graphql.data.login.account.profiles[item].flows;
		};
		body = JSON.stringify(graphql);
		$.done({ body });
	};

	if (url.search(path4) != -1) {
		let body = $response.body;
		$.log(path4);
		let graphql = JSON.parse(body);
		// location
		if ($.Disney_Plus.settings.location != "default") {
			// location
			if (graphql?.extensions?.sdk?.session?.location) graphql.extensions.sdk.session.location = $.Disney_Plus?.location ?? graphql.extensions.sdk.session.location;
			// homeLocation
			//if (graphql?.extensions?.sdk?.session?.homeLocation) graphql.extensions.sdk.session.homeLocation = $.Disney_Plus?.home_location ?? graphql.extensions.sdk.session.homeLocation;
		};
		// entitlements
		if ($.Disney_Plus.settings.entitlements != "default") {
			if (graphql?.extensions?.sdk?.session?.entitlements) graphql.extensions.sdk.session.entitlements = $.Disney_Plus?.extensions.sdk.session.entitlements ?? graphql.extensions.sdk.session.entitlements;
		};
		// inSupportedLocation
		if (graphql?.extensions?.sdk?.session?.inSupportedLocation) graphql.extensions.sdk.session.inSupportedLocation = $.Disney_Plus?.extensions.sdk.session.inSupportedLocation ?? graphql.extensions.sdk.session.inSupportedLocation;
		// MaturityRating
		if ($.Disney_Plus.settings.maturityRating != "default") {
			// preferredMaturityRating
			if (graphql?.extensions?.sdk?.session?.preferredMaturityRating) graphql.extensions.sdk.session.preferredMaturityRating = $.Disney_Plus?.extensions.sdk.session.preferredMaturityRating ?? graphql.extensions.sdk.session.preferredMaturityRating;
		};
		body = JSON.stringify(graphql);
		$.done({ body });
	};

	if (url.search(path5) != -1) {
		let body = $response.body;
		$.log(path4);
		let content = JSON.parse(body);
		// region
		if (content?.data?.DmcVideo?.video?.currentAvailability?.region) content.data.DmcVideo.video.currentAvailability.region = $.Disney_Plus.settings.region ?? content.data.DmcVideo.video.currentAvailability.region;
		body = JSON.stringify(content);
		$.done({ body });
	};
}

$.done();

/***************** dev config *****************/
/*
$.Disney_Plus = {
	"settings": {
		"flows": "SG",
		"location": "SG",
		"region": "SG",
		"maturityRating": "SG"
	},
	"maturityRating": {
		"ratingSystem": "MDA", // 分级系统
		"ratingSystemValues": [
			"G",
			"PG",
			"PG13",
			"NC16",
			"M18",
			"R21"
		],
		"contentMaturityRating": "PG13", // 心理成熟分级
		"maxRatingSystemValue": "R21",
		"isMaxContentMaturityRating": false // 最高分级是否是心理成熟分级
	},
	"flows": {
		"star": {
			"eligibleForOnboarding": true, // 允许登陆STAR
			//"isOnboarded": false // 已登陆STAR(跳过STAR引导界面)
		}
	},
	"home_location": {
		"country_code": "SG" // 国家
	},
	"location": {
		"region_name": "",
		"type": "COUNTRY_CODE",
		"asn": 41378,
		"zip_code": "",
		"state_name": "",
		"country_code": "SG",
		"carrier": "kirino llc",
		"city_name": "",
		"connection_type": "",
		"dma": 0
	}
};
*/

/***************** Env *****************/
// prettier-ignore
// https://github.com/chavyleung/scripts/blob/master/Env.min.js
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}isShadowrocket(){return"undefined"!=typeof $rocket}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){if(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:i,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:i,statusCode:r,headers:o,rawBody:h},s.decode(h,this.encoding))},t=>{const{message:i,response:r}=t;e(i,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let i=require("iconv-lite");this.initGotEnv(t);const{url:r,...o}=t;this.got[s](r,o).then(t=>{const{statusCode:s,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:s,statusCode:r,headers:o,rawBody:h},i.decode(h,this.encoding))},t=>{const{message:s,response:r}=t;e(s,r,r&&i.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl,i=rawOpts["update-pasteboard"]||rawOpts.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard":i}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
