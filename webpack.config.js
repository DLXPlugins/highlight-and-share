const TerserPlugin = require( 'terser-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const FixStyleOnlyEntriesPlugin = require( 'webpack-fix-style-only-entries' );

module.exports = [
	{
		mode: process.env.NODE_ENV,
		entry: {
			'has-cts': [ './src/blocks.js' ],
			'has-cts-editor': './src/block/editor.scss',
			'has-cts-style': './src/block/style.scss',
			'has-admin-style': './src/admin.scss',
		},
		output: {
			filename: '[name].js',
			sourceMapFilename: '[name].js.map',
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /(node_modules|bower_components)/,
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-env', '@babel/preset-react' ],
						plugins: [
							'@babel/plugin-proposal-class-properties',
							'@babel/plugin-transform-arrow-functions',
						],
					},
				},
				{
					test: /\.scss$/,
					exclude: /(node_modules|bower_components)/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
						},
						{
							loader: 'css-loader',
							options: {
								sourceMap: true,
							},
						},
						'sass-loader',
					],
				},
			],
		},
		optimization: {
			minimize: true,
			minimizer: [
				new TerserPlugin( {
					terserOptions: {
						ecma: undefined,
						parse: {},
						compress: true,
						mangle: false,
						module: false,
						output: null,
						toplevel: false,
						nameCache: null,
						ie8: false,
						keep_classnames: undefined,
						keep_fnames: false,
						safari10: false,
					},
				} ),
			],
		},
		plugins: [
			new FixStyleOnlyEntriesPlugin(),
			new MiniCssExtractPlugin(),
		],
	},

];
