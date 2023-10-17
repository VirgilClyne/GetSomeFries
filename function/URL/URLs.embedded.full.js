function URLs(opts) {
	return new (class {
		constructor(opts = []) {
			this.name = "URL v1.2.3";
			this.opts = opts;
			this.json = { scheme: "", host: "", path: "", type: "", query: {} };
		};

		parse(url) {
			const URLRegex = /(?:(?<scheme>.+):\/\/(?<host>[^/]+))?\/?(?<path>[^?]+)?\??(?<query>[^?]+)?/;
			let json = url.match(URLRegex)?.groups ?? null;
			console.log(`🚧 ${console.name}, URLSearch, url.match(URLRegex)?.groups: ${JSON.stringify(json)}`, "");
			if (json?.path) json.paths = json?.path?.split("/"); else json.path = "";
			if (json?.paths) json.type = json?.paths?.[json?.paths?.length - 1]?.split(".")?.at(-1);
			if (json?.query) json.query = Object.fromEntries(json.query.split("&").map((param) => param.split("=")));
			console.log(`🚧 ${console.name}, URLSearch, Object.fromEntries(json.query.split("&").map((item) => item.split("="))): ${JSON.stringify(json?.query)}`, "");
			console.log(`🚧 ${console.name}, URLSearch, json: ${JSON.stringify(json)}`, "");
			return json
		};

		stringify(json = this.json) {
			let url = "";
			if (json?.scheme && json?.host) url += json.scheme + "://" + json.host;
			console.log(`🚧 ${console.name}, URLSearch, url: ${url}`, "");
			if (json?.path) url += (json?.host) ? "/" + json.path : json.path;
			console.log(`🚧 ${console.name}, URLSearch, url: ${url}`, "");
			if (json?.query) url += "?" + Object.entries(json.query).map(param => param.join("=")).join("&");
			/*
			const url = (json?.query) ? json.scheme + "://" + json.host + "/" + json.path + "?" + Object.entries(json.query).map(param => param.join("=")).join("&")
				: json.scheme + "://" + json.host + "/" + json.path;
			*/
			console.log(`🚧 ${console.name}, URLSearch, url: ${url}`, "");
			return url
		};
	})(opts)
}
