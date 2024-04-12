import json from '@rollup/plugin-json';
import commonjs from "@rollup/plugin-commonjs";

export default [
	{
		input: 'src/WeChat.request.beta.js',
		output: {
			file: 'js/WeChat.request.beta.js',
			banner: '/* README: https://github.com/VirgilClyne/GetSomeFries */',
			format: 'es'
		},
		plugins: [json(), commonjs()],
		
	},
	{
		input: 'src/WeChat.response.beta.js',
		output: {
			file: 'js/WeChat.response.beta.js',
			banner: '/* README: https://github.com/VirgilClyne/GetSomeFries */',
			format: 'es'
		},
		plugins: [json(), commonjs()],
	},
	{
		input: 'src/TikTok.request.beta.js',
		output: {
			file: 'js/TikTok.request.beta.js',
			banner: '/* README: https://github.com/VirgilClyne/GetSomeFries */',
			format: 'es'
		},
		plugins: [json(), commonjs()],
		
	},
	{
		input: 'src/TikTok.response.beta.js',
		output: {
			file: 'js/TikTok.response.beta.js',
			banner: '/* README: https://github.com/VirgilClyne/GetSomeFries */',
			format: 'es'
		},
		plugins: [json(), commonjs()],
	},
];
