class PLISTs {
	constructor(opts = []) {
		this.name = "Plist v1.0.0";
		this.opts = opts;
		this.request = {
			"url": "https://json2plist-production.up.railway.app/convert.php",
			"headers": {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
				"Accept": "text/javascript, text/html, application/xml, text/xml, */*",
			}
		}
	};

	parse(xml) {
		this.request.body = "do=plist2json&content=" + encodeURIComponent(xml);
		return await $.http.post(this.request).then(v => JSON.parse(v.body));
	};

	stringify(json) {
		this.request.body = "do=json2plist&content=" + encodeURIComponent(JSON.stringify(json));
		return await $.http.post(this.request).then(v => v.body);
	};
}
