/*
    Dualsub for Surge by Neurogram
 
        - Disney+, Star+, HBO Max, Netflix bilingual subtitles
        - Disney+, Star+, HBO Max Official subtitles support
        - Disney+, Star+, HBO Max, Netflix Machine translation support (Google, DeepL)
        - YouTube subtitles auto-translate
        - Customized language support
 
    Manual:
        Setting tool for Shortcuts: https://www.icloud.com/shortcuts/7b6ee34a64d9465f8abd8d1608251dca

        Surge:

        [Script]

        // all in one
        Dualsub = type=http-response,pattern=https:\/\/(.+media.(dss|star)ott|manifests.v2.api.hbo|.+hbomaxcdn|.+nflxvideo).(com|net)\/((.+(.vtt|-all-.+.m3u8.*))|hls.m3u8.+|\?o=\d+&v=\d+&e=.+),requires-body=1,max-size=0,timeout=30,script-path=Dualsub.js
        Dualsub-setting = type=http-request,pattern=https:\/\/(setting|www).(media.(dss|star)ott|hbomaxcdn|nflxvideo|youtube).(com|net)\/(\?action=(g|s)et|api\/timedtext.+),requires-body=1,max-size=0,script-path=Dualsub.js

        // individual
        DisneyPlus-Dualsub = type=http-response,pattern=https:\/\/.+media.(dss|star)ott.com\/ps01\/disney\/.+(\.vtt|-all-.+\.m3u8.*),requires-body=1,max-size=0,timeout=30,script-path=Dualsub.js
        DisneyPlus-Dualsub-Setting = type=http-request,pattern=https:\/\/.+media.(dss|star)ott.com\/\?action=(g|s)et,requires-body=1,max-size=0,script-path=Dualsub.js
 
        HBO-Max-Dualsub = type=http-response,pattern=https:\/\/(manifests.v2.api.hbo.com|.+hbomaxcdn.com)\/(hls.m3u8.+|video.+\.vtt$),requires-body=1,max-size=0,timeout=30,script-path=Dualsub.js
        HBO-Max-Dualsub-Setting = type=http-request,pattern=https:\/\/setting.hbomaxcdn.com\/\?action=(g|s)et,requires-body=1,max-size=0,script-path=Dualsub.js

        Netflix-Dualsub = type=http-response,pattern=https:\/\/.+nflxvideo.net\/\?o=\d+&v=\d+&e=.+,requires-body=1,max-size=0,timeout=30,script-path=Dualsub.js
        Netflix-Dualsub-Setting = type=http-request,pattern=https:\/\/.+nflxvideo.net\/\?action=(g|s)et,requires-body=1,max-size=0,script-path=Dualsub.js

        YouTube-Subtrans = type=http-request,pattern=https:\/\/(setting|www).youtube.com\/(api\/timedtext.+|\?action=(g|s)et),requires-body=1,max-size=0,script-path=Dualsub.js

        [MITM]
        hostname = *.media.dssott.com, *.media.starott.com, *.api.hbo.com, *.hbomaxcdn.com, *.nflxvideo.net, *.youtube.com

    Author:
        Telegram: Neurogram
        GitHub: Neurogram-R
*/
const $ = new Env('Dualsub');

let url = $request.url
let headers = $request.headers

// Default Settings
$.Neurogram = {
    Dualsub: {
        Disney: {
            type: "Official", // Official, Google, DeepL, Disable
            lang: "English [CC]",
            sl: "auto",
            tl: "English [CC]",
            line: "s", // f, s
            dkey: "null", // DeepL API key
            s_subtitles_url: "null",
            t_subtitles_url: "null",
            subtitles: "null",
            subtitles_type: "null",
            subtitles_sl: "null",
            subtitles_tl: "null",
            subtitles_line: "null",
        },
        HBOMax: {
            type: "Official", // Official, Google, DeepL, Disable
            lang: "English CC",
            sl: "auto",
            tl: "en-US SDH",
            line: "s", // f, s
            dkey: "null", // DeepL API key
            s_subtitles_url: "null",
            t_subtitles_url: "null",
            subtitles: "null",
            subtitles_type: "null",
            subtitles_sl: "null",
            subtitles_tl: "null",
            subtitles_line: "null",
        },
        Netflix: {
            type: "Google", // Google, DeepL, Disable
            lang: "English",
            sl: "auto",
            tl: "en",
            line: "s", // f, s
            dkey: "null", // DeepL API key
            s_subtitles_url: "null",
            t_subtitles_url: "null",
            subtitles: "null",
            subtitles_type: "null",
            subtitles_sl: "null",
            subtitles_tl: "null",
            subtitles_line: "null",
        },
        YouTube: {
            type: "Enable", // Enable, Disable
            lang: "English",
            sl: "auto",
            tl: "en",
        }
    }
};
// BoxJs Function Supported
if ($.getdata("Neurogram")) {
	$.log(`🎉 ${$.name}, BoxJs`);
	// load user prefs from BoxJs
	$.Neurogram = $.getdata("Neurogram")
	$.log(`🚧 ${$.name}, BoxJs调试信息, Neurogram类型: ${typeof $.Neurogram}`, `Neurogram内容: ${$.Neurogram}`, "");
    if (typeof ($.Neurogram) == "string") $.Neurogram = JSON.parse($.Neurogram)
    if ($.Neurogram?.Dualsub) $.log(`🚧 ${$.name}, BoxJs调试信息, Neurogram.Dualsub类型: ${typeof $.Neurogram.Dualsub}`, `Neurogram.Dualsub内容: ${$.Neurogram.Dualsub}`, "");

}
// Argument Function Supported
else if (typeof $argument != "undefined") {
	let arg = Object.fromEntries($argument.split("&").map((item) => item.split("=")));
	console.log(JSON.stringify(arg));
	$.Neurogram.Dualsub.Disney = arg?.Disney ?? "";
	$.Neurogram.Dualsub.HBOMax = arg?.HBOMax ?? "";
	$.Neurogram.Dualsub.Netflix = arg?.Netflix ?? "";
	$.Neurogram.Dualsub.YouTube = arg?.YouTube ?? "";
};
$.log(`🚧 ${$.name}, BoxJs调试信息, $.Neurogram.Dualsub内容: ${JSON.stringify($.Neurogram.Dualsub)}`);






/***************** Platform *****************/
let service = ""
if (url.match(/(dss|star)ott.com/)) service = "Disney"
else if (url.match(/hbo(maxcdn)*.com/)) service = "HBOMax"
else if (url.match(/nflxvideo.net/)) service = "Netflix"
else if (url.match(/youtube.com/)) service = "YouTube"
else $.done()

let setting = $.Neurogram.Dualsub[service]

if (url.match(/action=get/)) {
    delete setting.t_subtitles_url
    delete setting.subtitles
    $.done({ response: { body: JSON.stringify(setting) } })
}

if (url.match(/action=set/)) {
    let new_setting = JSON.parse($request.body)
    if (new_setting.type) $.Neurogram.Dualsub[service].type = new_setting.type
    if (new_setting.lang) $.Neurogram.Dualsub[service].lang = new_setting.lang
    if (new_setting.sl) $.Neurogram.Dualsub[service].sl = new_setting.sl
    if (new_setting.tl) $.Neurogram.Dualsub[service].tl = new_setting.tl
    if (new_setting.line) $.Neurogram.Dualsub[service].line = new_setting.line
    if (new_setting.dkey) $.Neurogram.Dualsub[service].dkey = new_setting.dkey
    if (new_setting.s_subtitles_url) $.Neurogram.Dualsub[service].s_subtitles_url = new_setting.s_subtitles_url
    if (new_setting.t_subtitles_url) $.Neurogram.Dualsub[service].t_subtitles_url = new_setting.t_subtitles_url
    if (new_setting.subtitles) $.Neurogram.Dualsub[service].subtitles = new_setting.subtitles
    if (new_setting.subtitles_type) $.Neurogram.Dualsub[service].subtitles_type = new_setting.subtitles_type
    if (new_setting.subtitles_sl) $.Neurogram.Dualsub[service].subtitles_sl = new_setting.subtitles_sl
    if (new_setting.subtitles_tl) $.Neurogram.Dualsub[service].subtitles_tl = new_setting.subtitles_tl
    if (new_setting.subtitles_line) $.Neurogram.Dualsub[service].subtitles_line = new_setting.subtitles_line
    $.setdata(JSON.stringify($.Neurogram.Dualsub),"Neurogram")
    delete $.Neurogram.Dualsub[service].t_subtitles_url
    delete $.Neurogram.Dualsub[service].subtitles
    $.done({ response: { body: JSON.stringify($.Neurogram.Dualsub[service]) } })
}

if (setting.type == "Disable") $done({})

if (service == "YouTube") {
    let patt = new RegExp(`lang=${setting.tl}`)

    if (url.match(patt)) $done({})

    if (url.match(/&tlang=/)) $done({})

    $done({ url: `${url}&tlang=${setting.tl == "zh-CN" ? "zh-Hans" : setting.tl == "zh-TW" ? "zh-Hant" : setting.tl}` })
}

if (setting.type != "Official" && url.match(/\.m3u8/)) $done({})

let body = $response.body

if (!body) $done({})

let subtitles_urls_data = setting.t_subtitles_url

let host = url.match(/https.+media.(dss|star)ott.com\/ps01\/disney\/[^\/]+\//)
host = host ? host[0] : ""

if (setting.type == "Official" && url.match(/\.m3u8/)) {
    $.Neurogram.Dualsub[service].t_subtitles_url = "null"
    $.setdata(JSON.stringify($.Neurogram.Dualsub),"Neurogram")

    let patt = new RegExp(`TYPE=SUBTITLES.+NAME="${setting.tl.replace(/(\[|\]|\(|\))/g, "\\$1")}.+URI="([^"]+)`)

    if (body.match(patt)) {

        let subtitles_data_link = `${host}${body.match(patt)[1]}`

        let options = {
            url: subtitles_data_link,
            headers: headers
        }

        $httpClient.get(options, function (error, response, data) {
            let subtitles_data = data.match(/http.+\.vtt/g)
            if (service == "Disney") subtitles_data = data.match(/.+-MAIN.+\.vtt/g)

            if (subtitles_data) {
                $.Neurogram.Dualsub[service].t_subtitles_url = subtitles_data.join("\n")
                $.setdata(JSON.stringify($.Neurogram.Dualsub),"Neurogram")
            }

            if (service == "Disney" && subtitles_data_link.match(/.+-MAIN.+/) && data.match(/,\nseg.+\.vtt/g)) {
                subtitles_data = data.match(/,\nseg.+\.vtt/g)
                let url_path = subtitles_data_link.match(/\/r\/(.+)/)[1].replace(/\w+\.m3u8/, "")
                $.Neurogram.Dualsub[service].t_subtitles_url = subtitles_data.join("\n").replace(/,\n/g, url_path)
                $.setdata(JSON.stringify($.Neurogram.Dualsub),"Neurogram")
            }

            $done({})
        })

    }

    if (!body.match(patt)) $done({})
}

if (url.match(/\.vtt/) || service == "Netflix") {
    if (service != "Netflix" && url == setting.s_subtitles_url && setting.subtitles != "null" && setting.subtitles_type == setting.type && setting.subtitles_sl == setting.sl && setting.subtitles_tl == setting.tl && setting.subtitles_line == setting.line) $done({ body: setting.subtitles })

    if (setting.type == "Official") {
        if (subtitles_urls_data == "null") $done({})
        subtitles_urls_data = subtitles_urls_data.match(/.+\.vtt/g)
        if (subtitles_urls_data) official_subtitles(subtitles_urls_data)
    }

    if (setting.type == "Google") machine_subtitles("Google")

    if (setting.type == "DeepL") machine_subtitles("DeepL")
}

async function machine_subtitles(type) {

    body = body.replace(/(\d+:\d\d:\d\d.\d\d\d -->.+line.+\n.+)\n(.+)/g, "$1 $2")
    body = body.replace(/(\d+:\d\d:\d\d.\d\d\d -->.+line.+\n.+)\n(.+)/g, "$1 $2")

    let dialogue = body.match(/\d+:\d\d:\d\d.\d\d\d -->.+line.+\n.+/g)

    if (!dialogue) $done({})

    let timeline = body.match(/\d+:\d\d:\d\d.\d\d\d -->.+line.+/g)

    let s_sentences = []
    for (var i in dialogue) {
        s_sentences.push(`${type == "Google" ? "~" + i + "~" : "&text="}${dialogue[i].replace(/<\/*(c\.[^>]+|i)>/g, "").replace(/\d+:\d\d:\d\d.\d\d\d -->.+line.+\n/, "")}`)
    }
    s_sentences = groupAgain(s_sentences, type == "Google" ? 80 : 50)

    let t_sentences = []
    let trans_result = []

    if (type == "Google") {
        for (var p in s_sentences) {
            let options = {
                url: `https://translate.google.com/translate_a/single?client=it&dt=qca&dt=t&dt=rmt&dt=bd&dt=rms&dt=sos&dt=md&dt=gt&dt=ld&dt=ss&dt=ex&otf=2&dj=1&hl=en&ie=UTF-8&oe=UTF-8&sl=${setting.sl}&tl=${setting.tl}`,
                headers: {
                    "User-Agent": "GoogleTranslate/6.29.59279 (iPhone; iOS 15.4; en; iPhone14,2)"
                },
                body: `q=${encodeURIComponent(s_sentences[p].join("\n"))}`
            }

            let trans = await send_request(options, "post")

            if (trans.sentences) {
                let sentences = trans.sentences
                for (var k in sentences) {
                    if (sentences[k].trans) trans_result.push(sentences[k].trans.replace(/\n$/g, "").replace(/\n/g, " ").replace(/〜|～/g, "~"))
                }
            }
        }

        if (trans_result.length > 0) {
            t_sentences = trans_result.join(" ").match(/~\d+~[^~]+/g)
        }

    }

    if (type == "DeepL") {
        for (var l in s_sentences) {
            let options = {
                url: "https://api-free.deepl.com/v2/translate",
                body: `auth_key=${setting.dkey}${setting.sl == "auto" ? "" : `&source_lang=${setting.sl}`}&target_lang=${setting.tl}${s_sentences[l].join("")}`
            }

            let trans = await send_request(options, "post")

            if (trans.translations) trans_result.push(trans.translations)
        }

        if (trans_result.length > 0) {
            for (var o in trans_result) {
                for (var u in trans_result[o]) {
                    t_sentences.push(trans_result[o][u].text.replace(/\n/g, " "))
                }
            }
        }
    }

    if (t_sentences.length > 0) {
        let g_t_sentences = t_sentences.join("\n").replace(/\s\n/g, "\n")

        for (var j in dialogue) {
            let patt = new RegExp(`(${timeline[j]})`)
            if (setting.line == "s") patt = new RegExp(`(${dialogue[j].replace(/(\[|\]|\(|\)|\?)/g, "\\$1")})`)

            let patt2 = new RegExp(`~${j}~\\s*(.+)`)

            if (g_t_sentences.match(patt2) && type == "Google") body = body.replace(patt, `$1\n${g_t_sentences.match(patt2)[1]}`)

            if (type == "DeepL") body = body.replace(patt, `$1\n${t_sentences[j]}`)

        }

        if (service != "Netflix") {
            $.Neurogram.Dualsub[service].s_subtitles_url = url
            $.Neurogram.Dualsub[service].subtitles = body
            $.Neurogram.Dualsub[service].subtitles_type = setting.type
            $.Neurogram.Dualsub[service].subtitles_sl = setting.sl
            $.Neurogram.Dualsub[service].subtitles_tl = setting.tl
            $.Neurogram.Dualsub[service].subtitles_line = setting.line
            $.setdata(JSON.stringify($.Neurogram.Dualsub),"Neurogram")
        }
    }

    $done({ body })

}

async function official_subtitles(subtitles_urls_data) {
    let result = []

    let subtitles_index = parseInt(url.match(/(\d+)\.vtt/)[1])

    let start = subtitles_index - 3 < 0 ? 0 : subtitles_index - 3

    subtitles_urls_data = subtitles_urls_data.slice(start, subtitles_index + 4)

    for (var k in subtitles_urls_data) {
        let options = {
            url: `${host ? host + "r/" : ""}${subtitles_urls_data[k]}`,
            headers: headers
        }
        result.push(await send_request(options, "get"))
    }

    body = body.replace(/(\d+:\d\d:\d\d.\d\d\d -->.+line.+\n.+)\n(.+)/g, "$1 $2")
    body = body.replace(/(\d+:\d\d:\d\d.\d\d\d -->.+line.+\n.+)\n(.+)/g, "$1 $2")

    let timeline = body.match(/\d+:\d\d:\d\d.\d\d\d -->.+line.+/g)

    for (var i in timeline) {
        let patt1 = new RegExp(`(${timeline[i]})`)
        if (setting.line == "s") patt1 = new RegExp(`(${timeline[i]}(\\n.+)+)`)

        let time = timeline[i].match(/^\d+:\d\d:\d\d/)[0]

        let patt2 = new RegExp(`${time}.\\d\\d\\d -->.+line.+(\\n.+)+`)

        let dialogue = result.join("\n\n").match(patt2)

        if (dialogue) body = body.replace(
            patt1,
            `$1\n${dialogue[0]
                .replace(/\d+:\d\d:\d\d.\d\d\d -->.+line.+\n/, "")
                .replace(/\n/, " ")}`
        )
    }

    $.Neurogram.Dualsub[service].s_subtitles_url = url
    $.Neurogram.Dualsub[service].subtitles = body
    $.Neurogram.Dualsub[service].subtitles_type = setting.type
    $.Neurogram.Dualsub[service].subtitles_sl = setting.sl
    $.Neurogram.Dualsub[service].subtitles_tl = setting.tl
    $.Neurogram.Dualsub[service].subtitles_line = setting.line
    $.setdata(JSON.stringify($.Neurogram.Dualsub),"Neurogram")

    $done({ body })
}

function send_request(options, method) {
    return new Promise((resolve, reject) => {

        if (method == "get") {
            $httpClient.get(options, function (error, response, data) {
                if (error) return reject('Error')
                resolve(data)
            })
        }

        if (method == "post") {
            $httpClient.post(options, function (error, response, data) {
                if (error) return reject('Error')
                resolve(JSON.parse(data))
            })
        }
    })
}

function groupAgain(data, num) {
    var result = []
    for (var i = 0; i < data.length; i += num) {
        result.push(data.slice(i, i + num))
    }
    return result
}

/***************** Env *****************/
// prettier-ignore
// https://github.com/chavyleung/scripts/blob/master/Env.min.js
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}isShadowrocket(){return"undefined"!=typeof $rocket}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){if(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:i,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:i,statusCode:r,headers:o,rawBody:h},s.decode(h,this.encoding))},t=>{const{message:i,response:r}=t;e(i,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let i=require("iconv-lite");this.initGotEnv(t);const{url:r,...o}=t;this.got[s](r,o).then(t=>{const{statusCode:s,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:s,statusCode:r,headers:o,rawBody:h},i.decode(h,this.encoding))},t=>{const{message:s,response:r}=t;e(s,r,r&&i.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl,i=rawOpts["update-pasteboard"]||rawOpts.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard":i}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
