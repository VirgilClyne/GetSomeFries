/**
 * Get Environment Variables
 * @link https://github.com/VirgilClyne/GetSomeFries/blob/main/function/getENV/getENV.js
 * @author VirgilClyne
 * @param {String} key - Persistent Store Key
 * @param {Array} names - Platform Names
 * @param {Object} database - Default Database
 * @return {Object} { Settings, Caches, Configs }
 */
function getENV(key, names, database) {
	//$.log(`☑️ ${$.name}, Get Environment Variables`, "");
	/***************** BoxJs *****************/
	// 包装为局部变量，用完释放内存
	// BoxJs的清空操作返回假值空字符串, 逻辑或操作符会在左侧操作数为假值时返回右侧操作数。
	let BoxJs = $.getjson(key, database);
	//$.log(`🚧 ${$.name}, Get Environment Variables`, `BoxJs类型: ${typeof BoxJs}`, `BoxJs内容: ${JSON.stringify(BoxJs)}`, "");
	/***************** Argument *****************/
	let Argument = {};
	if (typeof $argument !== "undefined"){
		if (Boolean($argument)) {
			//$.log(`🎉 ${$.name}, $Argument`);
			let arg = Object.fromEntries($argument.split("&").map((item) => item.split("=")));
			//$.log(JSON.stringify(arg));
			for (let item in arg) setPath(Argument, item, arg[item]);
			//$.log(JSON.stringify(Argument));
		};
		//$.log(`✅ ${$.name}, Get Environment Variables`, `Argument类型: ${typeof Argument}`, `Argument内容: ${JSON.stringify(Argument)}`, "");
	};
	/***************** Store *****************/
	const Store = { Settings: database?.Default?.Settings || {}, Configs: database?.Default?.Configs || {}, Caches: {}};
	if (!Array.isArray(names)) names = [names];
	//$.log(`🚧 ${$.name}, Get Environment Variables`, `names类型: ${typeof names}`, `names内容: ${JSON.stringify(names)}`, "");
	for (let name of names) {
		Store.Settings = { ...Store.Settings, ...database?.[name]?.Settings, ...BoxJs?.[name]?.Settings, ...Argument };
		Store.Configs = { ...Store.Configs, ...database?.[name]?.Configs };
		if (BoxJs?.[name]?.Caches && typeof BoxJs?.[name]?.Caches === "string") BoxJs[name].Caches = JSON.parse(BoxJs?.[name]?.Caches);
		Store.Caches = { ...Store.Caches, ...BoxJs?.[name]?.Caches };
	};
	traverseObject(Store.Settings, (key, value) => {
		if (value === "true" || value === "false") value = JSON.parse(value); // 字符串转Boolean
		else if (typeof value === "string") {
			if (value?.includes(",")) value = value.split(","); // 字符串转数组
			else if (value && !isNaN(value)) value = parseInt(value, 10) // 字符串转数字
		};
		return value;
	});
	//$.log(`✅ ${$.name}, Get Environment Variables`, `Store: ${typeof Store.Caches}`, `Store内容: ${JSON.stringify(Store)}`, "");
	return Store;
	/***************** function *****************/
	function setPath(object, path, value) { path.split(".").reduce((o, p, i) => o[p] = path.split(".").length === ++i ? value : o[p] || {}, object) }
	function traverseObject(o,c){for(var t in o){var n=o[t];o[t]="object"==typeof n&&null!==n?traverseObject(n,c):c(t,n)}return o}
};
