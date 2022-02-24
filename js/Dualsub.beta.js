/*
README:https://github.com/VirgilClyne/GetSomeFries
*/

// refer:https://raw.githubusercontent.com/Neurogram-R/Surge/master/DualSub.js

const $ = new Env('DualSub');
const VTT = new WebVTT('DualSub');

let url = $request.url
let headers = $request.headers

/***************** Enviroment *****************/
const Platform = url.match(/(dssott|starott)\.com/i) ? "Disney_Plus"
	: url.match(/\.(api\.hbo|hbomaxcdn)\.com/i) ? "HBO_Max"
		: url.match(/\.nflxvideo\.net/i) ? "Netflix"
			: (url.match(/cbs(aa|i)video\.com/i)) ? "Paramount_plus"
				: url.match(/www\.youtube\.com/i) ? "YouTube"
					: undefined
$.log(`🚧 ${$.name}, Enviroment调试信息`, `Platform内容: ${Platform}`, "");

// Default Settings
$.DualSub = {
	Disney_Plus: {
		Settings: {
			type: "Official", // Official, Google, DeepL, Disable
			lang: "EN-US",
			sl: "AUTO",
			tl: "en",
			line: "s", // f, s
			dkey: "null", // DeepL API key
		},
		Languages: {
			//"BG": "bg", // 保加利亚语
			//"CS": "cs", // 捷克语
			"DA": "da", // 丹麦语
			"DE": "de", // 德文
			//"EL": "el", // 希腊语
			"EN-GB": "en", // 英语（英国）
			"EN-US": "en", // 英语（美国）
			"EN-US SDH": "en", // 英语（美国）CC
			"ES": "es-ES", // 西班牙语
			"ES-419": "es-419", // 西班牙语（拉丁美洲）
			"ES-ES": "es-ES", // 西班牙语
			//"ET": "et", // 爱沙尼亚语
			"FI": "fi", // 芬兰语
			"FR": "fr-FR", // 法语
			//"HU": "hu", // 匈牙利语
			"IT": "it", // 意大利语
			"JA": "ja", // 日语
			//"KO": "ko", // 韩语
			//"LT": "lt", // 立陶宛语
			//"LV": "lv", // 拉脱维亚语
			"NL": "nl", // 荷兰语
			"NO": "no", // 挪威语
			//"PL": "pl", // 波兰语
			"PT-PT": "pt-PT", // 葡萄牙语
			"PT-BR": "pt-BR", // 葡萄牙语(巴西)
			//"RO": "ro", // 罗马尼亚语
			//"RU": "ru", // 俄罗斯
			//"SK": "sk", // 斯洛伐克语
			//"SL": "sl", // 斯洛文尼亚语
			"SV": "sv", // 瑞典语
			"IS": "is", // 冰岛语
			"ZH-CN": "zh-Hans", // 中文（简体）
			"ZH-HK": "zh-HK", // 中文（香港）
			"ZH-TW": "zh-Hant" // 中文（繁体）
		}
	},
	HBO_Max: {
		Settings: {
			type: "Official", // Official, Google, DeepL, Disable
			lang: "English CC",
			sl: "AUTO",
			tl: "en-US SDH",
			line: "s", // f, s
			dkey: "null", // DeepL API key
		},
		Languages: {
			"BG": "bg-BG", // 保加利亚语
			//"CS": "cs", // 捷克语
			"DA": "da-DK", // 丹麦语
			//"DE": "de", // 德文
			//"EL": "el", // 希腊语
			"EN-GB": "en", // 英语（英国）
			"EN-US": "en-US", // 英语（美国）
			"EN-US SDH": "en-US SDH", // 英语（美国）CC
			"ES": "es-419", // 西班牙语
			"ES-419": "es-419", // 西班牙语（拉丁美洲）
			"ES-ES": "es-ES", // 西班牙语
			"ET": "et-EE", // 爱沙尼亚语
			//"FI": "fi", // 芬兰语
			//"FR": "fr", // 法语
			"HU": "hu-HU", // 匈牙利语
			"IT": "it", // 意大利语
			//"JA": "ja", // 日语
			//"KO": "ko", // 韩语
			"LT": "lt-LT", // 立陶宛语
			"LV": "lv-LV", // 拉脱维亚语
			"NL": "nl-NL", // 荷兰语
			"PL": "pl-PL", // 波兰语
			"PT-PT": "pt-PT", // 葡萄牙语
			"PT-BR": "pt-BR", // 葡萄牙语(巴西)
			"RO": "ro-RO", // 罗马尼亚语
			"RU": "ru-RU", // 俄罗斯
			"SK": "sk-SK", // 斯洛伐克语
			"SL": "sl-SI", // 斯洛文尼亚语
			"SV": "sv-SE", // 瑞典语
			"ZH-CN": "zh-CN", // 中文（中国）
			"ZH-HK": "zh-HK", // 中文（香港）
			"ZH-TW": "zh-TW" // 中文（台湾）
		},
	},
	Netflix: {
		Settings: {
			type: "Google", // Google, DeepL, Disable
			lang: "English",
			sl: "AUTO",
			tl: "en",
			line: "s", // f, s
			dkey: "null", // DeepL API key
		}
	},
	Paramount_Plus: {
		Settings: {
			type: "Google", // Google, DeepL, Disable
			lang: "English",
			sl: "auto",
			tl: "en",
			line: "s", // f, s
			dkey: "null", // DeepL API key
		}
	},
	YouTube: {
		Settings: {
			type: "Enable", // Enable, Disable
			lang: "English",
			sl: "AUTO",
			tl: "en",
		},
		Languages: {
			"BG": "bg-BG", // 保加利亚语
			//"CS": "cs", // 捷克语
			"DA": "da-DK", // 丹麦语
			//"DE": "de", // 德文
			//"EL": "el", // 希腊语
			"EN-GB": "en", // 英语（英国）
			"EN-US": "en-US", // 英语（美国）
			"EN-US SDH": "en-US SDH", // 英语（美国）CC
			"ES": "es-419", // 西班牙语
			"ES-419": "es-419", // 西班牙语（拉丁美洲）
			"ES-ES": "es-ES", // 西班牙语
			"ET": "et-EE", // 爱沙尼亚语
			//"FI": "fi", // 芬兰语
			//"FR": "fr", // 法语
			"HU": "hu-HU", // 匈牙利语
			"IT": "it", // 意大利语
			//"JA": "ja", // 日语
			//"KO": "ko", // 韩语
			"LT": "lt-LT", // 立陶宛语
			"LV": "lv-LV", // 拉脱维亚语
			"NL": "nl-NL", // 荷兰语
			"PL": "pl-PL", // 波兰语
			"PT-PT": "pt-PT", // 葡萄牙语
			"PT-BR": "pt-BR", // 葡萄牙语(巴西)
			"RO": "ro-RO", // 罗马尼亚语
			"RU": "ru-RU", // 俄罗斯
			"SK": "sk-SK", // 斯洛伐克语
			"SL": "sl-SI", // 斯洛文尼亚语
			"SV": "sv-SE", // 瑞典语
			"ZH-CN": "zh-Hans", // 中文（简体）
			"ZH-HK": "zh-Hant-HK", // 中文（香港）
			"ZH-TW": "zh-Hant" // 中文（繁体）
		},
	},
	Google: {
		Languages: {
			"BG": "bg", // 保加利亚语
			"CS": "cs", // 捷克语
			"DA": "da", // 丹麦语
			"DE": "de", // 德文
			"EL": "el", // 希腊语
			"EN-GB": "en", // 英语（英国）
			"EN-US": "en", // 英语（美国）
			"EN-US SDH": "en", // 英语（美国）CC
			"ES": "es", // 西班牙文
			"ES-419": "es", // 西班牙语（拉丁美洲）
			"ES-ES": "es", // 西班牙文
			"ET": "et", // 爱沙尼亚语
			"FI": "fi", // 芬兰语
			"FR": "fr", // 法语
			"HU": "hu", // 匈牙利语
			"IT": "it", // 意大利语
			"JA": "ja", // 日语
			"KO": "ko", // 韩语
			"LT": "lt", // 立陶宛语
			"LV": "lv", // 拉脱维亚语
			"NL": "nl", // 荷兰语
			"PL": "pl", // 波兰语
			"PT-PT": "pt", // 葡萄牙语
			"PT-BR": "pt", // 葡萄牙语(巴西)
			"RO": "ro", // 罗马尼亚语
			"RU": "ru", // 俄罗斯
			"SK": "sk", // 斯洛伐克语
			"SL": "sl", // 斯洛文尼亚语
			"SV": "sv", // 瑞典语
			"ZH-CN": "zh-CN", // 中文（中国）
			"ZH-HK": "zh-HK", // 中文（香港）
			"ZH-TW": "zh-TW" // 中文（台湾）
		},
	},
	DeepL: {
		Languages: {
			"AUTO": "", // 自动识别
			"BG": "BG", // 保加利亚语
			"CS": "CS", // 捷克语
			"DA": "DA", // 丹麦语
			"DE": "de", // 德文
			"EL": "el", // 希腊语
			"EN": "EN", // 英语（英国）
			"EN-GB": "EN-GB", // 英语（英国）
			"EN-US": "EN-US", // 英语（美国）
			"EN-US SDH": "EN-US", // 英语（美国）CC
			"ES": "ES", // 西班牙文
			"ES-419": "ES", // 西班牙语（拉丁美洲）
			"ES-ES": "ES", // 西班牙文
			"ET": "ET", // 爱沙尼亚语
			"FI": "FI", // 芬兰语
			"FR": "FR", // 法语
			"HU": "HU", // 匈牙利语
			"IT": "IT", // 意大利语
			"JA": "JA", // 日语
			//"KO": "ko", // 韩语
			"LT": "LT", // 立陶宛语
			"LV": "LV", // 拉脱维亚语
			"NL": "NL", // 荷兰语
			"PL": "PL", // 波兰语
			"PT": "PT", // 葡萄牙语
			"PT-PT": "PT-PT", // 葡萄牙语
			"PT-BR": "PT-BR", // 葡萄牙语(巴西)
			"RO": "RO", // 罗马尼亚语
			"RU": "RU", // 俄罗斯
			"SK": "SK", // 斯洛伐克语
			"SL": "SL", // 斯洛文尼亚语
			"SV": "SV", // 瑞典语
			"ZH": "ZH", // 中文（简体）
		}
	}
};
// Default Cache
$.DualSub[Platform].Cache = []
/*
$.DualSub[Platform].Cache = {
	subtitles_m3u8_url: "null",
	subtitles_vtt_urls: "null",
	s_subtitles_url: "null",
	subtitles_vtt_urls: "null",
	subtitles: "null",
	subtitles_type: "null",
	subtitles_sl: "null",
	subtitles_tl: "null",
	subtitles_line: "null",
}
*/
if (typeof $.DualSub == "string") $.DualSub = JSON.parse($.DualSub)
// BoxJs Function Supported
if ($.getjson("Neurogram")) {
	$.log(`🎉 ${$.name}, BoxJs`);
	// load user prefs from BoxJs
	$.BoxJs = $.getjson("Neurogram")?.DualSub ?? $.DualSub
	$.DualSub[Platform] = Object.assign($.DualSub[Platform], $.BoxJs[Platform]);
	//$.log(`🚧 ${$.name}, BoxJs调试信息`, `$.DualSub类型: ${typeof $.DualSub}`, `$.DualSub内容: ${JSON.stringify($.DualSub)}`, "");
}
// Argument Function Supported
else if (typeof $argument != "undefined") {
	$.log(`🎉 ${$.name}, Argument`);
	let arg = Object.fromEntries($argument.split("&").map((item) => item.split("=")));
	console.log(JSON.stringify(arg));
	$.argument = {
		[Platform]: {
			Settings: {
				type: arg?.type ?? "Disable", // Official, Google, DeepL, Disable
				lang: arg?.lang ?? "English",
				sl: arg?.sl ?? "AUTO",
				tl: arg?.tl ?? "en",
				line: arg?.line ?? "s", // f, s
				dkey: arg?.dkey ?? "null", // DeepL API key
			}
		}
	};
	$.DualSub[Platform] = Object.assign($.DualSub[Platform], $.getjson("Neurogram").DualSub[Platform], $.argument[Platform])
	$.log(`🚧 ${$.name}, Argument调试信息`, `$.DualSub类型: ${typeof $.DualSub}`, `$.DualSub内容: ${JSON.stringify($.DualSub)}`, "");
};
//$.setdata($.Neurogram,"Neurogram")
//$.log(`🚧 ${$.name}, 初始化完成, 调试信息`, `$.DualSub内容: ${JSON.stringify($.DualSub)}`, "");

/***************** Enviroment *****************/
$.Settings = $.DualSub[Platform].Settings
$.log(`🚧 ${$.name}, Enviroment调试信息`, `Settings内容: ${JSON.stringify($.Settings)}`, "");
$.Settings.tl = $.DualSub?.[$.Settings.type]?.Languages?.[$.Settings.lang] ?? $.DualSub?.[Platform]?.Languages?.[$.Settings.lang] ?? $.Settings.tl;
$.log(`🚧 ${$.name}, Language调试信息`, `$.Settings.tl内容: ${$.Settings.tl}`, "");
$.Cache = $.DualSub[Platform].Cache
//$.log(`🚧 ${$.name}, Enviroment调试信息`, `$.Cache类型: ${typeof $.Cache}`, `$.Cache内容: ${$.Cache}`, "");
if (typeof $.Cache == "string") $.Cache = JSON.parse($.Cache)
$.log(`🚧 ${$.name}, Enviroment调试信息`, `$.Cache类型: ${typeof $.Cache}`, `$.Cache内容: ${JSON.stringify($.Cache)}`, "");

/***************** Processing *****************/
!(async () => {
	$.log(`🚧 ${$.name}, V6`, "");
	if ($.Settings.type == "Disable") $.done()
	else if ($.Settings.type != "Official" && url.match(/\.m3u8/)) $.done();
	else if (Platform == "YouTube") {
		/***************** Youtube *****************/
		if (url.match(`lang=${$.Settings.tl}`) || url.match(/&tlang=/)) $.done();
		else $.done({ url: `${url}&tlang=${$.Settings.tl}` });
	} else if ($.Settings.type == "Official" && url.match(/\.m3u8/)) {
		let metadata = await getMetaData(Platform)
		if (Platform == "Disney_Plus") {
			if (!$.Cache[metadata.uuid]) $.Cache[metadata.uuid] = {};
			$.Cache[metadata.uuid].metadata = metadata;
			$.Cache[metadata.uuid].subtitles_m3u8_url = await getPlaylist(Platform, metadata)
			$.Cache[metadata.uuid].subtitles_vtt_urls = await getVTTURLs(Platform, metadata)
		} else {
			$.Cache.metadata = metadata;
			$.Cache.subtitles_m3u8_url = await getPlaylist(Platform, metadata)
			$.Cache.subtitles_vtt_urls = await getVTTURLs(Platform, metadata)
		}
		$.setjson($.Cache, `@Neurogram.DualSub.${Platform}.Cache`)
	} else if (url.match(/\.vtt/) || Platform == "Netflix") {
		let metadata = await getMetaData(Platform)
		/***************** Generate VTT Subtitle *****************/
		$.log(`🚧 ${$.name}, Generate VTT Subtitle`, "");
		let body = $response.body
		if (!body) $.done()
		/***************** Settings Type *****************/
		$.log(`🚧 ${$.name}, Generate VTT Subtitle调试信息`, `Platform: ${Platform}`, `$.Settings.type内容: ${$.Settings.type}`, "");
		if (Platform != "Netflix" && url == $.Cache.s_subtitles_url && $.Cache.subtitles != "null" && $.Cache.subtitles_type == $.Settings.type && $.Cache.subtitles_sl == $.Settings.sl && $.Cache.subtitles_tl == $.Settings.tl && $.Cache.subtitles_line == $.Settings.line) {
			$.log(`🚧 ${$.name}, Generate VTT Subtitle调试信息`, `$.Cache.subtitles内容: ${JSON.stringify($.Cache.subtitles)}`, "");
			$.done({ body: $.Cache.subtitles })
		} else if ($.Settings.type == "Official") {
			if (Platform == "Disney_Plus" && $.Cache[metadata.uuid].subtitles_vtt_urls) {
				body = await official_subtitles(url, body, $.Cache[metadata.uuid].subtitles_vtt_urls);
				$.setjson($.Cache, `@Neurogram.DualSub.${Platform}.Cache`)
				$.done({ body });
			} else if ($.Cache.subtitles_vtt_urls) {
				body = await official_subtitles(url, body, $.Cache.subtitles_vtt_urls);
				$.setjson($.Cache, `@Neurogram.DualSub.${Platform}.Cache`)
				$.done({ body });
			} else $.done();
		/*
		} else if ($.Settings.type == "Google") {
			body = await machine_subtitles($.Settings.type)
			$.done({ body });
		} else if ($.Settings.type == "DeepL") {
			body = await machine_subtitles($.Settings.type)
			$.done({ body });
		} else if ($.Settings.type == "External"){
			body = await external_subtitles($.Cache.external_subtitles)
			$.done({ body });
		*/
		} else $.done();
	}
	else throw new Error('无匹配结果', '')
})()
	.catch((e) => $.logErr(e))
	.finally(() => $.done())

/***************** Fuctions *****************/
// Function 1
// Get MetaData
async function getMetaData(Platform) {
	$.log(`🚧 ${$.name}, Get Metadata`, "");
	// https://vod-llc-ap-west-2.media.dssott.com/ps01/disney/fb1fc2f7-9606-4599-bc6d-930c040fd9fe/cbcs-all-b7129de7-2046-430a-afbf-7a2aa98a97ed-dd284b2b-9ba9-48d2-a969-0856b7d6c071.m3u8?r=1080&a=3&sxl=zh-Hans&hash=067b95e47d9627533c99e7f487b79ef6d464374c
	//const Disney_Plus_Regex = /.*media\.(dssott|starott)\.com\/ps01\/disney\/[^\/]+\//
	const Disney_Plus_Regex = /^(?<host>https?:\/\/(?<dataServer>.*)\.media\.(?<Domain>dssott|starott)\.com\/(?:ps01|\w*\d*)\/disney\/(?<uuid>[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12})\/)/
	$.log(`🚧 ${$.name}, Get MetaData调试信息`, `Disney_Plus_Regex内容: ${Disney_Plus_Regex}`, "");

	/***************** Get Subtitle Data *****************/
	let metadata = {};
	if (Platform == "Disney_Plus") {
		metadata = url.match(Disney_Plus_Regex)?.groups ?? null;
		$.log(`🚧 ${$.name}, Get Metadata`, "Disney Plus", `host内容: ${metadata.host}`, "");
	}
	return metadata
}

// Function 2
// Get Subtitle playlist.m3u8 URL
async function getPlaylist(Platform, metadata) {
	//let patt = new RegExp(`TYPE=SUBTITLES.+LANGUAGE="${$.Settings.tl}".+URI="([^"]+)`)
	//const Language_Regex = new RegExp(`TYPE=SUBTITLES.+LANGUAGE="${$.Settings.tl}".+URI="([^"]+)`)
	const Language_Regex = new RegExp(`TYPE=SUBTITLES.+LANGUAGE="${$.Settings.tl}".+URI="(?<subtitles_m3u8_url>[^"]+)`)

	let body = $response.body
	if (!body) $.done();
	
	/***************** Get Subtitle playlist.m3u8 URL *****************/
	if (body.match(Language_Regex)) {
		let subtitles_m3u8_url = (Platform == "Disney_Plus") ? metadata.host + body.match(Language_Regex)?.groups?.subtitles_m3u8_url ?? null
			: body.match(Language_Regex)?.groups?.subtitles_m3u8_url ?? null;
		$.log(`🚧 ${$.name}, Get Subtitle playlist.m3u8 URL`, `subtitles_m3u8_url内容: ${subtitles_m3u8_url}`, "");
		//$.setjson($.Cache, `@Neurogram.DualSub.${Platform}.Cache`)
		return subtitles_m3u8_url
	} else $.done();
}

// Function 3
// Get Subtitle *.vtt URLs
async function getVTTURLs(Platform, metadata) {
	let body = $response.body
	if (!body) $.done();
	let subtitles_m3u8_url = (Platform == "Disney_Plus") ? $.Cache[metadata.uuid].subtitles_m3u8_url : $.Cache.subtitles_m3u8_url
	$.log(`🚧 ${$.name}, 调试信息`, "Get Subtitle *.vtt URLs", `subtitles_m3u8_url内容: ${subtitles_m3u8_url}`, "");
	let subtitles_vtt_urls = [];
	await $.http.get({ url: subtitles_m3u8_url, headers: headers }).then((response) => {
		let data = response.body
		const webVTT_Regex = (Platform == "Disney_Plus") ? /.+-MAIN.+\.vtt/g : /http.+\.vtt/g
		subtitles_vtt_urls = data.match(webVTT_Regex)
		if (Platform == "Disney_Plus") subtitles_vtt_urls = subtitles_vtt_url.forEach(item => item = metadata.host + item);
		/*
		if (Platform == "Disney_Plus" && $.Cache[metadata.uuid].subtitles_m3u8_url.match(/.+-MAIN.+/) && data.match(/,\nseg.+\.vtt/g)) {
			$.Cache[metadata.uuid].subtitles_vtt_urls = data.match(/,\nseg.+\.vtt/g)
			let url_path = subtitles_data_link.match(/\/r\/(.+)/)[1].replace(/\w+\.m3u8/, "")
			$.log(`🚧 ${$.name}, Get Subtitle Data调试信息`, `url_path内容: ${url_path}`, "");
			$.Cache[metadata.uuid].subtitles_vtt_urls = $.Cache[metadata.uuid].subtitles_vtt_urls.forEach(element => element = url_path + element);
			$.log(`🚧 ${$.name}, Get Subtitle Data调试信息`, `$.Cache[metadata.uuid].subtitles_vtt_urls内容: ${JSON.stringify($.Cache[metadata.uuid].subtitles_vtt_urls)}`, "");
		}
		*/
		//$.setjson($.Cache, `@Neurogram.DualSub.${Platform}.Cache`)
	})
	return subtitles_vtt_urls
}

// Function 2
// Combine Dual Subtitles
async function mergeDualSubs(Sub1 = { headers: {}, body: [] }, Sub2 = { headers: {}, body: [] }, options = ["Forward"]) { // options = ["Forward", "Reverse"]
	$.log(`🚧 ${$.name}, Combine Dual Subtitles`, "mergeDualSubs", "");
	let DualSub = {
		headers: options.includes("Reverse")? Sub2.headers : Sub1.headers,
		body: options.includes("Reverse") ? Sub2.body : Sub1.body
	};
	// 有序数列 用不着排序
	//FirstSub.body.sort((x, y) => x - y);
	//SecondSub.body.sort((x, y) => x - y);
	const length1 = Sub1.body.length, length2 = Sub2.body.length;
	let index0 = 0, index1 = 0, index2 = 0;
	// 双指针法查找两个数组中的相同元素
	while (index1 < length1 && index2 < length2) {
		const timeStamp1 = Sub1.body[index1].timeStamp, timeStamp2 = Sub2.body[index2].timeStamp;
		const text1 = Sub1.body[index1]?.text ?? "", text2 = Sub2.body[index2]?.text ?? "";
		if (Math.abs(timeStamp1 - timeStamp2) <= 1000) {
			index0 = options.includes("Reverse") ? index2 : index1;
			DualSub.body[index0].text = options.includes("Reverse") ? `${text2}\n${text1}` : `${text1}\n${text2}`;
			//DualSub.body[index0].timeStamp = options.includes("Reverse") ? timeStamp2 : timeStamp1;
			//DualSub.body[index0].index = options.includes("Reverse") ? index2 : index1;
			index1++;
			index2++;
		} else if (timeStamp2 - timeStamp1 > 1000) {
			index1++;
		} else {
			index2++;
		}
	}
	return DualSub;
};

// Function 3
// Official Subtitles
async function official_subtitles(url, body, SubtitlesURLs = new Array) {
	$.log(`🚧 ${$.name}, Official Subtitles`, "official_subtitles", "");
	//$.log(`🚧 ${$.name}, Official Subtitles`, "official_subtitles", `SubtitlesURLs内容: ${SubtitlesURLs}`, "");

	/***************** Slice subtitles URLs Array *****************/
	//let SubtitlesIndex = parseInt(url.match(/(\d+)\.vtt/)[1])
	//$.log(`🚧 ${$.name}, Official Subtitles`, "official_subtitles", `SubtitlesIndex内容: ${SubtitlesIndex}`, "");
	//let start = SubtitlesIndex - 3 < 0 ? 0 : SubtitlesIndex - 3
	//SubtitlesURLs = SubtitlesURLs.slice(start, SubtitlesIndex + 4)
	//$.log(`🚧 ${$.name}, Official Subtitles`, "Combine subtitles urls", `SubtitlesURLs内容: ${SubtitlesURLs}`, "");

	/***************** Combine Disney Plus Url *****************/
	/*
	if (Platform == "Disney_Plus") {
		//let host = url.match(/https.+media.(dss|star)ott.com\/ps01\/disney\/[^\/]+\//)[0]
		let Disney_Plus_Regex = /.*media\.(dssott|starott)\.com\/ps01\/disney\/[^\/]+\//
		$.log(`🚧 ${$.name}, Official Subtitles`, "Combine Disney Plus Url", `Disney_Plus_Regex内容: ${Disney_Plus_Regex}`, "");
		let host = url.match(Disney_Plus_Regex)[0]
		$.log(`🚧 ${$.name}, Official Subtitles`, "Combine Disney Plus Url", `host内容: ${host}`, "");
		//host = host ? host[0] : ""
		//$.log(`🚧 ${$.name}, host调试信息, host内容: ${host}`, "");
		for (var k in SubtitlesURLs) { SubtitlesURLs[k] = `${host + "r/" + SubtitlesURLs[k]}` }
		$.log(`🚧 ${$.name}, Official Subtitles`, "Combine Disney Plus Url", `SubtitlesURLs内容: ${SubtitlesURLs}`, "")
	};
	*/

	/***************** Get subtitles URL *****************/
	let SubtitleName = url.match(/(\d+\.vtt)/)[1]
	$.log(`🚧 ${$.name}, Official Subtitles`, "Get subtitles URL", `SubtitleName内容: ${SubtitleName}`, "")
	let SubtitlesURL = SubtitlesURLs.find(item => item.includes(SubtitleName))
	$.log(`🚧 ${$.name}, Official Subtitles`, "Get subtitles URL", `SubtitlesURL内容: ${SubtitlesURL}`, "")
	/***************** Get subtitles *****************/
	//let result = {}
	// 获取webVTT
	//for (var k in SubtitlesURLs) { await $.http.get({ url: SubtitlesURLs[k], headers: headers }).then((response) => { result.push(response.body) }) }
	let result = await $.http.get({ url: SubtitlesURL, headers: headers }).then((response) => { return response.body })
	//$.log(`🚧 ${$.name}, Official Subtitles`, "Get subtitles", `result内容: ${result}`, "");

	/***************** merge Dual Subtitles *****************/
	//result = result.join("\n\n") //转为字符串
	//$.log(`🚧 ${$.name}, merge Dual Subtitles`, `result.join(\"\\n\\n\")`, `result内容: ${result}`, "");
	
	let FirstSub = VTT.parse(body, ["timeStamp", "ms"])
	$.log("FirstSub.headers", JSON.stringify(FirstSub.headers))
	$.log("FirstSub.body[0]", JSON.stringify(FirstSub.body[0]))
	$.log("FirstSub.body[10]", JSON.stringify(FirstSub.body[10]))
	$.log("FirstSub.body[25].groups", JSON.stringify(FirstSub.body[25]))
	let SecondSub = VTT.parse(result, ["timeStamp", "ms"])
	$.log("SecondSub.headers", JSON.stringify(SecondSub.headers))
	$.log("SecondSub.body[0]", JSON.stringify(SecondSub.body[0]))
	$.log("SecondSub.body[10]", JSON.stringify(SecondSub.body[10]))
	$.log("SecondSub.body[25].groups", JSON.stringify(SecondSub.body[25]))

	//$.log("VTT.stringify(FirstSub)", VTT.stringify(FirstSub));

	let DualSub = await mergeDualSubs(FirstSub, SecondSub);
	$.log(`🚧 ${$.name}, merge Dual Subtitles`, "await mergeDualSubs(FirstSub, SecondSub)", `DualSub内容: ${JSON.stringify(DualSub)}`, "");

	DualSub = VTT.stringify(DualSub)
	$.log(`🚧 ${$.name}, merge Dual Subtitles`, `DualSub类型: ${typeof DualSub}`, `DualSub内容: ${DualSub}`, "");

	$.Cache.s_subtitles_url = url
	$.Cache.subtitles = DualSub
	$.Cache.subtitles_type = $.Settings.type
	$.Cache.subtitles_sl = $.Settings.sl
	$.Cache.subtitles_tl = $.Settings.tl
	$.Cache.subtitles_line = $.Settings.line
	return DualSub
};

// Function 4
// Machine Subtitles
async function machine_subtitles(type, body) {
	$.log(`🚧 ${$.name}, Machine Subtitles`, "machine_subtitles", "");

	body = body.replace(/(\d+:\d\d:\d\d.\d\d\d -->.+line.+\n.+)\n(.+)/g, "$1 $2")
	body = body.replace(/(\d+:\d\d:\d\d.\d\d\d -->.+line.+\n.+)\n(.+)/g, "$1 $2")

	let dialogue = body.match(/\d+:\d\d:\d\d.\d\d\d -->.+line.+\n.+/g)
	if (!dialogue) $.done()

	let timeline = body.match(/\d+:\d\d:\d\d.\d\d\d -->.+line.+/g)

	let s_sentences = []
	for (var i in dialogue) { s_sentences.push(`${type == "Google" ? "~" + i + "~" : "&text="}${dialogue[i].replace(/<\/*(c\.[^>]+|i)>/g, "").replace(/\d+:\d\d:\d\d.\d\d\d -->.+line.+\n/, "")}`) }
	s_sentences = await groupAgain(s_sentences, type == "Google" ? 80 : 50)

	let t_sentences = []
	let trans_result = []

	if (type == "Google") {
		for (var p in s_sentences) {
			let options = {
				url: `https://translate.google.com/translate_a/single?client=it&dt=qca&dt=t&dt=rmt&dt=bd&dt=rms&dt=sos&dt=md&dt=gt&dt=ld&dt=ss&dt=ex&otf=2&dj=1&hl=en&ie=UTF-8&oe=UTF-8&sl=${Settings.sl}&tl=${Settings.tl}`,
				headers: {
					"User-Agent": "GoogleTranslate/6.29.59279 (iPhone; iOS 15.4; en; iPhone14,2)"
				},
				body: `q=${encodeURIComponent(s_sentences[p].join("\n"))}`
			}

			//let trans = await send_request(options, "post")
			await $.http.post(options).then((resp) => {
				//let trans = resp.body
				if (resp.body.sentences) {
					let sentences = resp.body.sentences
					for (var k in sentences) {
						if (sentences[k].trans) trans_result.push(sentences[k].trans.replace(/\n$/g, "").replace(/\n/g, " ").replace(/〜|～/g, "~"))
					}
				}
			})
		}

		if (trans_result.length > 0) {
			t_sentences = trans_result.join(" ").match(/~\d+~[^~]+/g)
		}

	} else if (type == "DeepL") {
		for (var l in s_sentences) {
			let options = {
				url: "https://api-free.deepl.com/v2/translate",
				body: `auth_key=${Settings.dkey}${Settings.sl == "AUTO" ? "" : `&source_lang=${Settings.sl}`}&target_lang=${Settings.tl}${s_sentences[l].join("")}`
			}

			//let trans = await send_request(options, "post")
			await $.http.post(options).then((resp) => {
				//let trans = resp.body
				if (resp.body.translations) trans_result.push(resp.body.translations)
			})
		}

		if (trans_result.length > 0) {
			for (var o in trans_result) {
				for (var u in trans_result[o]) { t_sentences.push(trans_result[o][u].text.replace(/\n/g, " ")) }
			}
		}
	}

	if (t_sentences.length > 0) {
		let g_t_sentences = t_sentences.join("\n").replace(/\s\n/g, "\n")

		for (var j in dialogue) {
			let patt = new RegExp(`(${timeline[j]})`)
			if (Settings.line == "s") patt = new RegExp(`(${dialogue[j].replace(/(\[|\]|\(|\)|\?)/g, "\\$1")})`)

			let patt2 = new RegExp(`~${j}~\\s*(.+)`)

			if (type == "Google" && g_t_sentences.match(patt2)) body = body.replace(patt, `$1\n${g_t_sentences.match(patt2)[1]}`)
			else if (type == "DeepL") body = body.replace(patt, `$1\n${t_sentences[j]}`)

		}

		if (Platform != "Netflix") {
			Cache.s_subtitles_url = url
			Cache.subtitles = body
			Cache.subtitles_type = settings.type
			Cache.subtitles_sl = settings.sl
			Cache.subtitles_tl = settings.tl
			Cache.subtitles_line = settings.line
			$.setjson(Cache, `@Neurogram.DualSub.${Platform}.Cache`)
		}
	}
	$.log(`🚧 ${$.name}, Machine Subtitles`, "machine_subtitles", `body内容: ${body}`, "");
	return body
};

// Function 5
// External Subtitles
async function external_subtitles(external_subtitles, body) {
    let patt = new RegExp(`(\\d+\\n)*\\d+:\\d\\d:\\d\\d.\\d\\d\\d --> \\d+:\\d\\d:\\d\\d.\\d.+(\\n|.)+`)
    if (!external_subtitles.match(patt)) $.done()
    if (!body.match(patt)) $.done()
    let external = external_subtitles.replace(/(\d+:\d\d:\d\d),(\d\d\d)/g, "$1.$2")
    body = body.replace(patt, external.match(patt)[0])
	return body
};

// Function 6
// groupAgain
async function groupAgain(data, num) {
	var result = []
	for (var i = 0; i < data.length; i += num) {
		result.push(data.slice(i, i + num))
	}
	return result
};

/***************** Env *****************/
// prettier-ignore
// https://github.com/chavyleung/scripts/blob/master/Env.min.js
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}isShadowrocket(){return"undefined"!=typeof $rocket}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){if(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:i,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:i,statusCode:r,headers:o,rawBody:h},s.decode(h,this.encoding))},t=>{const{message:i,response:r}=t;e(i,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let i=require("iconv-lite");this.initGotEnv(t);const{url:r,...o}=t;this.got[s](r,o).then(t=>{const{statusCode:s,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:s,statusCode:r,headers:o,rawBody:h},i.decode(h,this.encoding))},t=>{const{message:s,response:r}=t;e(s,r,r&&i.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl,i=rawOpts["update-pasteboard"]||rawOpts.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard":i}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

// refer: https://www.w3.org/TR/webvtt1/
function WebVTT(e,t){return new class{constructor(e,t){this.name=e,Object.assign(this,t)}parse(e=new String,t=["timeStamp"]){const d=t.includes("ms")?/^(?:(?<srtNum>\d+)[(\r\n)\r\n])?(?<timeLine>(?<startTime>(?:\d\d:)?\d\d:\d\d(?:\.|,)\d\d\d) --> (?<endTime>(?:\d\d:)?\d\d:\d\d(?:\.|,)\d\d\d)) ?(?<options>.+)?[^](?<text>.+)/:/^(?:(?<srtNum>\d+)[(\r\n)\r\n])?(?<timeLine>(?<startTime>(?:\d\d:)?\d\d:\d\d)(?:\.|,)\d\d\d --> (?<endTime>(?:\d\d:)?\d\d:\d\d)(?:\.|,)\d\d\d) ?(?<options>.+)?[^](?<text>.+)/;let n={headers:e.match(/^(?:(?<fileType>WEBVTT)[^][^])?(?:(?<CSSStyle>STYLE)[^](?<CSSboxes>.*::cue.*(?:\(.*\))?(?:(?:\n|.)*})?)[^][^])?/)?.groups??null,body:e.split(/[(\r\n)\r\n]{2,}/).map((e=>e.match(d)?.groups??""))};return n.body=n.body.filter(Boolean),n.body=n.body.map(((e,d)=>{if(e.index=d,"WEBVTT"!==n.headers?.fileType&&(e.timeLine=e.timeLine.replace(",","."),e.startTime=e.startTime.replace(",","."),e.endTime=e.endTime.replace(",",".")),t.includes("timeStamp")){let d=e.startTime.replace(/(.*)/,"1970-01-01T$1Z");e.timeStamp=t.includes("ms")?Date.parse(d):Date.parse(d)/1e3}return t.includes("multiText")&&(e.text=e.text.split(/[(\r\n)\r\n]/)),e})),n}stringify(e={headers:new Object,body:new Array},t=["milliseconds","\n"]){const d=t.includes("\n")?"\n":t.includes("\r")?"\r":t.includes("\r\n")?"\r\n":"\n";return[e.headers=e?.headers?.CSSStyle?["WEBVTT","STYLE"+d+e.headers.CSSboxes].join(d+d):"WEBVTT",e.body=e.body.map((e=>(Array.isArray(e.text)&&(e.text=e.text.join(d)),e=`${e.timeLine} ${e.options}${d}${e.text}`))).join(d+d)].join(d+d)}}(e,t)}

function EXTM3U(name, opts) {
	return new (class {
		constructor(name, opts) {
			this.name = name
			Object.assign(this, opts)
		};

		parse(vtt = new String, options = ["SUBTITLES"]) { // options = ["MEDIA", "AUDIO", "SUBTITLES", "STREAM", "FRAME", "KEY"]
			const EXTM3U_headers_Regex = /^((?<fileType>\#EXTM3U)[^][^])(?<options>(\#EXT-X-.*)[^][^])?/;
			const MEDIA_Regex = /^#EXT-X-MEDIA:(.+)$/m;
			const STREAM_Regex = /^#EXT-X-STREAM-INF:(.+)$/m
			const FRAME_Regex = /^#EXT-X-I-FRAME-STREAM-INF:(.+)$/m
			const KEY_Regex = /^#EXT-X-SESSION-KEY:(.+)$/m
			let json = {
				headers: vtt.match(webVTT_headers_Regex)?.groups ?? null,
				body: vtt.split(/[(\r\n)\r\n]{2,}/).map(item => item = item.match(webVTT_body_Regex)?.groups ?? "")
			};
			json.body = json.body.filter(Boolean);
			json.body = json.body.map((item, i) => {
				item.index = i;
				if (json.headers?.fileType !== "WEBVTT") {
					item.timeLine = item.timeLine.replace(",", ".");
					item.startTime = item.startTime.replace(",", ".");
					item.endTime = item.endTime.replace(",", ".");
				}
				if (options.includes("timeStamp")) {
					let ISOString = item.startTime.replace(/(.*)/, "1970-01-01T$1Z")
					item.timeStamp = options.includes("ms") ? Date.parse(ISOString) : Date.parse(ISOString) / 1000;
				}
				if (options.includes("multiText")) {
					item.text = item.text.split(/[(\r\n)\r\n]/);
				}
				return item
			});
			return json
		};

		stringify(json = { headers: new Array, body: new Array }, options = ["milliseconds", "\n"]) {
			const newLine = (options.includes("\n")) ? "\n" : (options.includes("\r")) ? "\r" : (options.includes("\r\n")) ? "\r\n" : "\n";
			let vtt = [
				json.headers = (json?.headers?.CSSStyle) ? ["WEBVTT", "STYLE" + newLine + json.headers.CSSboxes].join(newLine + newLine) : "WEBVTT",
				json.body = json.body.map(item => {
					if (Array.isArray(item.text)) item.text = item.text.join(newLine);
					item = `${item.timeLine} ${item.options}${newLine}${item.text}`;
					return item;
				}).join(newLine + newLine)
			].join(newLine + newLine);
			return vtt
		};
	})(name, opts)
}

