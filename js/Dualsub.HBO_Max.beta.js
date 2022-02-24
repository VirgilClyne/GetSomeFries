/*
README:https://github.com/VirgilClyne/GetSomeFries
*/

// refer:https://raw.githubusercontent.com/Neurogram-R/Surge/master/Dualsub.js

const $ = new Env('Dualsub');

let url = $request.url
let headers = $request.headers
let body = $response.body
$.log(`🚧 ${$.name}, $response调试信息`, `body内容: ${body}`, "");
if (!body) $.done()

// Default Settings
$.Dualsub = {
    HBO_Max: {
        Settings: {
            type: "Official", // Official, Google, DeepL, Disable
            lang: "English CC",
            sl: "auto",
            tl: "en-US SDH",
            line: "s", // f, s
            dkey: "null", // DeepL API key
        },
        Cache: {
            s_subtitles_url: "null",
            t_subtitles_url: "null",
            subtitles: "null",
            subtitles_type: "null",
            subtitles_sl: "null",
            subtitles_tl: "null",
            subtitles_line: "null",
        }
    }
};
//$.setjson($.Dualsub, `@Neurogram.Dualsub`)
//$.log(`🚧 ${$.name}, setdata调试信息, $.Neurogram内容: ${JSON.stringify($.Neurogram)}`, "");
if (typeof $.Dualsub == "string") $.Dualsub = JSON.parse($.Dualsub)
// BoxJs Function Supported
if ($.getjson("Neurogram")) {
	$.log(`🎉 ${$.name}, BoxJs`);
	// load user prefs from BoxJs
	$.Dualsub = $.getjson("Neurogram")?.Dualsub ?? $.Dualsub;
	$.log(`🚧 ${$.name}, BoxJs调试信息`, `$.Dualsub类型: ${typeof $.Dualsub}`, `$.Dualsub内容: ${JSON.stringify($.Dualsub)}`, "");
}
// Argument Function Supported
else if (typeof $argument != "undefined") {
    $.log(`🎉 ${$.name}, Argument`);
	let arg = Object.fromEntries($argument.split("&").map((item) => item.split("=")));
	console.log(JSON.stringify(arg));
    $.argument = {
        HBO_Max: {
            Settings: {
                type: arg?.type ?? "Official", // Official, Google, DeepL, Disable
                lang: arg?.lang ?? "English CC",
                sl: arg?.sl ?? "auto",
                tl: arg?.tl ?? "en-US SDH",
                line: arg?.line ?? "s", // f, s
                dkey: arg?.dkey ?? "null", // DeepL API key
            }
        }
    };
    $.Dualsub = Object.assign($.Dualsub,$.argument)
    $.log(`🚧 ${$.name}, Argument调试信息`, `$.Dualsub类型: ${typeof $.Dualsub}`, `$.Dualsub内容: ${JSON.stringify($.Dualsub)}`, "");

};
//$.setdata($.Neurogram,"Neurogram")
$.log(`🚧 ${$.name}, 初始化完成调试信息`, `$.Dualsub内容: ${JSON.stringify($.Dualsub)}`, "");

/***************** Enviroment *****************/
const Platform = url.match(/(dssott|starott)\.com/i) ? "Disney_Plus"
: url.match(/\.(api\.hbo|hbomaxcdn)\.com/i) ? "HBO_Max"
: url.match(/\.nflxvideo\.net/i) ? "Netflix"
: url.match(/www\.youtube\.com/i) ? "YouTube"
: undefined
$.log(`🚧 ${$.name}, Enviroment调试信息`, `Platform内容: ${Platform}`, "");
const Settings = $.Dualsub[Platform].Settings
$.log(`🚧 ${$.name}, Enviroment调试信息`, `Settings内容: ${JSON.stringify($.Dualsub[Platform].Settings)}`, "");
var Cache = $.Dualsub[Platform].Cache
$.log(`🚧 ${$.name}, Enviroment调试信息`, `Cache内容: ${JSON.stringify($.Dualsub[Platform].Cache)}`, "");

if (Settings.type == "Disable") $.done()
else if (Settings.type != "Official" && url.match(/\.m3u8/)) $.done()



let subtitles_urls_data = Cache.t_subtitles_url
$.log(`🚧 ${$.name}, subtitles_urls_data调试信息`, `Cache.t_subtitles_url内容: ${Cache.t_subtitles_url}`, "");
/***************** host *****************/
let host = url.match(/https.+media.(dss|star)ott.com\/ps01\/disney\/[^\/]+\//)
$.log(`🚧 ${$.name}, host调试信息, host内容: ${host}`, "");
host = host ? host[0] : ""
$.log(`🚧 ${$.name}, host调试信息, host内容: ${host}`, "");
/***************** Official Subtitle *****************/
if (Settings.type == "Official" && url.match(/\.m3u8/)) {
    $.log(`🚧 ${$.name}, Official Subtitle`, "");
    $.Dualsub[Platform].Cache.t_subtitles_url = "null"
    $.setjson($.Dualsub[Platform].Cache, `@Neurogram.Dualsub.Cache.${Platform}`)
    $.log(`🚧 ${$.name}, Official Subtitle调试信息`, `$.Dualsub内容: ${JSON.stringify($.Dualsub)}`, "");

    let patt = new RegExp(`TYPE=SUBTITLES.+NAME="${Settings.tl.replace(/(\[|\]|\(|\))/g, "\\$1")}.+URI="([^"]+)`)
    if (body.match(patt)) {
        let subtitles_data_link = `${host}${body.match(patt)[1]}`
        $.log(`🚧 ${$.name}, Official Subtitle调试信息, subtitles_data_link内容: ${subtitles_data_link}`, "");
        let options = {
            url: subtitles_data_link,
            headers: headers
        }
        $.log(`🚧 ${$.name}, Official Subtitle调试信息`, `options内容: ${JSON.stringify(options)}`, "");
        $httpClient.get(options, function (error, response, data) {
            $.log(`🚧 ${$.name}, $httpClient.get调试信息, response内容: ${response}`, "");
            let subtitles_data = data.match(/http.+\.vtt/g)
            if (Platform == "Disney") subtitles_data = data.match(/.+-MAIN.+\.vtt/g)
            if (subtitles_data) {
                $.Dualsub[Platform].Cache.t_subtitles_url = subtitles_data.join("\n")
                $.setjson($.Dualsub[Platform].Cache, `@Neurogram.Dualsub.Cache.${Platform}`)
                $.log(`🚧 ${$.name}, Official Subtitle调试信息`, `$.Dualsub.Cache${Platform}内容: ${JSON.stringify($.Dualsub[Platform].Cache)}`, "");
            }
            if (Platform == "Disney" && subtitles_data_link.match(/.+-MAIN.+/) && data.match(/,\nseg.+\.vtt/g)) {
                subtitles_data = data.match(/,\nseg.+\.vtt/g)
                let url_path = subtitles_data_link.match(/\/r\/(.+)/)[1].replace(/\w+\.m3u8/, "")
                $.Dualsub[Platform].Cache.t_subtitles_url = subtitles_data.join("\n").replace(/,\n/g, url_path)
                $.setjson($.Dualsub[Platform].Cache, `@Neurogram.Dualsub.Cache.${Platform}`)
                $.log(`🚧 ${$.name}, Official Subtitle调试信息`, `$.Dualsub.Cache${Platform}内容: ${JSON.stringify($.Dualsub[Platform].Cache)}`, "");
            }
            $.done()
        })
    } else $.done();
}

/***************** VTT Subtitle *****************/
else if (url.match(/\.vtt/) || Platform == "Netflix") {
    if (Platform != "Netflix" && url == Cache.s_subtitles_url && Cache.subtitles != "null" && Cache.subtitles_type == Settings.type && Cache.subtitles_sl == Settings.sl && Cache.subtitles_tl == Settings.tl && Cache.subtitles_line == Settings.line) $.done({ body: Cache.subtitles })

    if (Settings.type == "Official") {
        subtitles_urls_data = subtitles_urls_data.match(/.+\.vtt/g)
        if (subtitles_urls_data !== "null") official_subtitles(subtitles_urls_data)
        else $.done();
    }
    else if (Settings.type == "Google") machine_subtitles("Google")
    else if (Settings.type == "DeepL") machine_subtitles("DeepL")
    else $.log(`❗️${$.name}, 执行失败`, `type = ${Settings.type}`, '')
}

/***************** Fuctions *****************/
// Function 1
// machine_subtitles
async function machine_subtitles(type) {

    body = body.replace(/(\d+:\d\d:\d\d.\d\d\d -->.+line.+\n.+)\n(.+)/g, "$1 $2")
    body = body.replace(/(\d+:\d\d:\d\d.\d\d\d -->.+line.+\n.+)\n(.+)/g, "$1 $2")

    let dialogue = body.match(/\d+:\d\d:\d\d.\d\d\d -->.+line.+\n.+/g)

    if (!dialogue) $$.done()

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
                url: `https://translate.google.com/translate_a/single?client=it&dt=qca&dt=t&dt=rmt&dt=bd&dt=rms&dt=sos&dt=md&dt=gt&dt=ld&dt=ss&dt=ex&otf=2&dj=1&hl=en&ie=UTF-8&oe=UTF-8&sl=${Settings.sl}&tl=${Settings.tl}`,
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
                body: `auth_key=${Settings.dkey}${Settings.sl == "auto" ? "" : `&source_lang=${Settings.sl}`}&target_lang=${Settings.tl}${s_sentences[l].join("")}`
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
            if (Settings.line == "s") patt = new RegExp(`(${dialogue[j].replace(/(\[|\]|\(|\)|\?)/g, "\\$1")})`)

            let patt2 = new RegExp(`~${j}~\\s*(.+)`)

            if (g_t_sentences.match(patt2) && type == "Google") body = body.replace(patt, `$1\n${g_t_sentences.match(patt2)[1]}`)

            if (type == "DeepL") body = body.replace(patt, `$1\n${t_sentences[j]}`)

        }

        if (Platform != "Netflix") {
            $.Dualsub[Platform].Cache.s_subtitles_url = url
            $.Dualsub[Platform].Cache.subtitles = body
            $.Dualsub[Platform].Cache.subtitles_type = Settings.type
            $.Dualsub[Platform].Cache.subtitles_sl = Settings.sl
            $.Dualsub[Platform].Cache.subtitles_tl = Settings.tl
            $.Dualsub[Platform].Cache.subtitles_line = Settings.line
            $.setjson($.Dualsub[Platform].Cache, `@Neurogram.Dualsub.Cache.${Platform}`)
            $.log(`🚧 ${$.name}, BoxJs调试信息, $.Neurogram内容: ${JSON.stringify($.Neurogram)}`, "");
            $.log(`🚧 ${$.name}, BoxJs调试信息, $.Dualsub内容: ${JSON.stringify($.Dualsub)}`, "");
        }
    }

    $.done( body )

};

// Function 2
// official_subtitles
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
        if (Settings.line == "s") patt1 = new RegExp(`(${timeline[i]}(\\n.+)+)`)

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

    $.Dualsub[Platform].Cache.s_subtitles_url = url
    $.Dualsub[Platform].Cache.subtitles = body
    $.Dualsub[Platform].Cache.subtitles_type = Settings.type
    $.Dualsub[Platform].Cache.subtitles_sl = Settings.sl
    $.Dualsub[Platform].Cache.subtitles_tl = Settings.tl
    $.Dualsub[Platform].Cache.subtitles_line = Settings.line
    $.setjson($.Dualsub[Platform].Cache, `@Neurogram.Dualsub.Cache.${Platform}`)
    $.log(`🚧 ${$.name}, BoxJs调试信息, $.Neurogram内容: ${JSON.stringify($.Neurogram)}`, "");
    //$.log(`🚧 ${$.name}, BoxJs调试信息, $.Dualsub内容: ${JSON.stringify($.Dualsub)}`, "");

    $.done( body )
};

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

// Function 3
// groupAgain
function groupAgain(data, num) {
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
