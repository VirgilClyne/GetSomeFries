import json from '@rollup/plugin-json';
import commonjs from "@rollup/plugin-commonjs";
import terser from '@rollup/plugin-terser';

export default [
	{
		input: 'src/WeChat.response.js',
		output: {
			file: 'js/WeChat.response.js',
			banner: '/* README: https://github.com/VirgilClyne/GetSomeFries */',
			format: 'es'
		},
		plugins: [json(), commonjs(), terser()]
	},
	{
		input: 'src/TikTok.request.js',
		output: {
			file: 'js/TikTok.request.js',
			banner: '/* README: https://github.com/VirgilClyne/GetSomeFries */',
			format: 'es'
		},
		plugins: [json(), commonjs()],
		
	},
	{
		input: 'src/TikTok.response.js',
		output: {
			file: 'js/TikTok.response.js',
			banner: '/* README: https://github.com/VirgilClyne/GetSomeFries */',
			format: 'es'
		},
		plugins: [json(), commonjs()],
	},
];
