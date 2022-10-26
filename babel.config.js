module.exports = function( api ) {
	api.cache.never();
	return {
		plugins: [
			'macros',
			'@babel/plugin-proposal-class-properties',
			'@babel/plugin-transform-arrow-functions',
		],
		presets: [ '@babel/preset-env', '@babel/preset-react' ],
	};
};
