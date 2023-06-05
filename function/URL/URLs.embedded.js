function URLs(opts) {
	return new (class {
		constructor(opts = []) {
			this.name = "URL v1.1.0";
			this.opts = opts;
			this.json = { scheme: "", host: "", path: "", type: "", query: {} };
		};

		parse(url) {
			const URLRegex = /(?:(?<scheme>.+):\/\/(?<host>[^/]+)\/)?(?<path>[^?]+(?:\.(?<type>[^?]+)))?\??(?<query>.*)?/;
			let json = url.match(URLRegex)?.groups ?? null;
			//console.log(`🚧 ${console.name}, URLSearch`, `url.match(URLRegex)?.groups: ${JSON.stringify(json)}`, "");
			if (!json?.path) json.path = "";
			if (json?.query) json.query = Object.fromEntries(json.query.split("&").map((param) => param.split("=")));
			//console.log(`🚧 ${console.name}, URLSearch`, `Object.fromEntries(json.query.split("&").map((item) => item.split("="))): ${JSON.stringify(json?.query)}`, "");
			//console.log(`🚧 ${console.name}, URLSearch`, `json: ${JSON.stringify(json)}`, "");
			return json
		};

		stringify(json = this.json) {
			let url = "";
			if (json?.scheme && json?.host) url += json.scheme + "://" + json.host;
			if (json?.path) url += (json?.host) ? "/" + json.path : json.path;
			if (json?.query) url += "?" + Object.entries(json.query).map(param => param.join("=")).join("&");
			//console.log(`🚧 ${console.name}, URLSearch`, `url: ${url}`, "");
			return url
		};
	})(opts)
}
