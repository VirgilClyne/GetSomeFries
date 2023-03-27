/**
 * Get Environment Variables
 * @link https://github.com/VirgilClyne/VirgilClyne/blob/main/function/getENV/getENV.full.js
 * @author VirgilClyne
 * @param {String} key - Persistent Store Key
 * @param {String} name - Platform Name
 * @param {Object} database - Default Database
 * @return {Object} { Settings, Caches, Configs }
 */
function getENV(key, name, database) {
	$.log(`⚠ ${$.name}, Get Environment Variables`, "");
	/***************** BoxJs *****************/
	// 包装为局部变量，用完释放内存
	// BoxJs的清空操作返回假值空字符串, 逻辑或操作符会在左侧操作数为假值时返回右侧操作数。
	let BoxJs = $.getjson(key, database);
	$.log(`🚧 ${$.name}, Get Environment Variables`, `BoxJs类型: ${typeof BoxJs}`, `BoxJs内容: ${JSON.stringify(BoxJs)}`, "");
	/***************** Argument *****************/
	let Argument = {};
	if (typeof $argument !== "undefined"){
		if (Boolean($argument)) {
			$.log(`🎉 ${$.name}, $Argument`);
			let arg = Object.fromEntries($argument.split("&").map((item) => item.split("=")));
			$.log(JSON.stringify(arg));
			for (let item in arg) setPath(Argument, item, arg[item]);
			$.log(JSON.stringify(Argument));
		};
	};
	$.log(`🎉 ${$.name}, Get Environment Variables`, `Argument类型: ${typeof Argument}`, `Argument内容: ${JSON.stringify(Argument)}`, "");
	/***************** Settings *****************/
	let Settings = { ...database?.Default?.Settings, ...database?.[name]?.Settings, ...BoxJs?.[name]?.Settings, ...Argument };
	$.log(`🎉 ${$.name}, Get Environment Variables`, `Settings: ${typeof Settings}`, `Settings内容: ${JSON.stringify(Settings)}`, "");
	let Configs = { ...database?.Default?.Configs, ...database?.[name]?.Configs, ...BoxJs?.[name]?.Configs };
	$.log(`🎉 ${$.name}, Get Environment Variables`, `Configs: ${typeof Configs}`, `Config内容: ${JSON.stringify(Configs)}`, "");
	let Caches = BoxJs?.[name]?.Caches || {};
	if (typeof Caches === "string") Caches = JSON.parse(Caches);
	$.log(`🎉 ${$.name}, Get Environment Variables`, `Caches: ${typeof Caches}`, `Caches内容: ${JSON.stringify(Caches)}`, "");
	return { Settings, Caches, Configs };
	/***************** setPath *****************/
	function setPath(object, path, value) { path.split(".").reduce((o, p, i) => o[p] = path.split(".").length === ++i ? value : o[p] || {}, object) }
};
