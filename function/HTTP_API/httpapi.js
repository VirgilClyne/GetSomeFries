async function checkHTTPAPI() {
    if (isSurge) {
        if (typeof ($httpAPI) === 'undefined') $.log();$.done();
    } else if (isLoon) {
        if (typeof ($config) === 'undefined') $.log();$.done();
    } else if (isQuanX) {
        if (typeof ($configuration) === 'undefined') $.log();$.done();
    } else $.log()
}

async function getPolicy(groupName) {
    if (isSurge) {
        $httpAPI("GET", "v1/policy_groups/select", { group_name: encodeURIComponent(groupName) }, (result));
        return result.policy
    }
    if (isLoon) {
        return $config.getPolicy(groupName);
    }
    if (isQuanX) {
        result = $configuration.sendMessage({ action: "get_policy_state" })
        if (result.ret && result.ret[groupName]) return (result.ret[groupName][1]);
    }
}




// https://github.com/NobyDa/Script
const getPolicy = (groupName) => {
	if (isSurge) {
		if (typeof($httpAPI) === 'undefined') return 3;
		return new Promise((resolve) => {
			$httpAPI("GET", "v1/policy_groups/select", {
				group_name: encodeURIComponent(groupName)
			}, (b) => resolve(b.policy || 2))
		})
	}
	if (isLoon) {
		if (typeof($config.getPolicy) === 'undefined') return 3;
		const getName = $config.getPolicy(groupName);
		return getName || 2;
	}
	if (isQuanX) {
		if (typeof($configuration) === 'undefined') return 3;
		return new Promise((resolve) => {
			$configuration.sendMessage({
				action: "get_policy_state"
			}).then(b => {
				if (b.ret && b.ret[groupName]) {
					resolve(b.ret[groupName][1]);
				} else resolve(2);
			}, () => resolve());
		})
	}
}
const setPolicy = (group, policy) => {
	if (isSurge && typeof($httpAPI) !== 'undefined') {
		return new Promise((resolve) => {
			$httpAPI("POST", "v1/policy_groups/select", {
				group_name: group,
				policy: policy
			}, (b) => resolve(!b.error || 0))
		})
	}
	if (isLoon && typeof($config.getPolicy) !== 'undefined') {
		const set = $config.setSelectPolicy(group, policy);
		return set || 0;
	}
	if (isQuanX && typeof($configuration) !== 'undefined') {
		return new Promise((resolve) => {
			$configuration.sendMessage({
				action: "set_policy_state",
				content: {
					[group]: policy
				}
			}).then((b) => resolve(!b.error || 0), () => resolve());
		})
	}
}