/***************** Function *****************/
/**
 * Set Environment Variables
 * @author VirgilClyne
 * @param {String} name - Persistent Store Key
 * @param {String} url - Request URL
 * @param {Object} database - Default DataBase
 * @return {Promise<*>}
 */
async function setENV(name, url, database) {
	//$.log(`⚠ ${$.name}, Set Environment Variables`, "");
	/***************** BoxJs *****************/
	// 包装为局部变量，用完释放内存
	// BoxJs的清空操作返回假值空字符串, 逻辑或操作符会在左侧操作数为假值时返回右侧操作数。
	let BoxJs = $.getjson(name, database) // BoxJs
	//$.log(`🚧 ${$.name}, Set Environment Variables`, `$.BoxJs类型: ${typeof $.BoxJs}`, `$.BoxJs内容: ${JSON.stringify($.BoxJs)}`, "");
	/***************** Cloudflare *****************/
	let WARP = BoxJs?.Cloudflare?.WARP || database.Cloudflare.WARP;
	//$.log(`🚧 ${$.name}, Set Environment Variables`, `WARP: ${JSON.stringify(WARP)}`, "");
	if (WARP?.Verify?.Mode == "Key") {
		WARP.Verify.Content = Array.from(WARP.Verify.Content.split("\n"))
		//$.log(JSON.stringify(WARP.Verify.Content))
	};
	/***************** WireGuard *****************/
	let WireGuard = BoxJs?.WireGuard || database?.WireGuard;
	//$.log(`🚧 ${$.name}, Set Environment Variables`, `WireGuard: ${JSON.stringify(WireGuard)}`, "");
	/***************** Argument *****************/
	if (typeof $argument != "undefined") {
		//$.log(`🎉 ${$.name}, $Argument`);
		let arg = Object.fromEntries($argument.split("&").map((item) => item.split("=")));
		//$.log(JSON.stringify(arg));
		WARP.Verify.License = arg.License;
		WARP.Verify.Mode = arg.Mode;
		WARP.Verify.Content = arg.AccessToken;
		WARP.Verify.Content = arg.ServiceKey;
		WARP.Verify.Content[0] = arg.Key;
		WARP.Verify.Content[1] = arg.Email;
		WARP.Verify.RegistrationId = arg.RegistrationId;
		WireGuard.PrivateKey = arg.PrivateKey;
		WireGuard.PublicKey = arg.PublicKey;
		WARP.env.Version = arg.Version;
		WARP.env.deviceType = arg.deviceType;
	};
	//$.log(`🚧 ${$.name}, Set Environment Variables`, `WARP类型: ${typeof WARP}`, `WARP内容: ${JSON.stringify(WARP)}`, "");
	/***************** Platform *****************/
	const Type = RegExp(`/reg/${WARP.Verify.RegistrationId}`, "i").test(url) ? "RegistrationId"
		: /reg/i.test(url) ? "Registration"
			: undefined
	//$.log(`🚧 ${$.name}, Set Environment Variables`, `Type: ${Type}`, "");
	return { Type, WARP, WireGuard };
};