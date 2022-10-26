const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require( 'webpack-remove-empty-scripts' );
const path = require( 'path' );

module.exports = [
	{
		...defaultConfig,
		module: {
			...defaultConfig.module,
			rules: [ ...defaultConfig.module.rules ],
		},
		mode: env.mode,
		devtool: 'source-map',
	},
	{
		mode: env.mode,
		entry: {
			"has-cts": ["./src/blocks.js"],
			"has-cts-editor": "./src/block/editor.scss",
			"has-cts-style": "./src/block/style.scss",
			"has-admin-style": "./src/admin.scss",
			"has-admin": ["./src/admin.js"],
		},
		output: {
			filename: "[name].js",
			sourceMapFilename: "[name].js.map",
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /(node_modules|bower_components)/,
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
						plugins: [
							"@babel/plugin-proposal-class-properties",
							"@babel/plugin-transform-arrow-functions",
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
							loader: "css-loader",
							options: {
								sourceMap: true,
							},
						},
						"sass-loader",
					],
				},
				{
					test: /\.css$/,
					include: [
						path.resolve(
							__dirname,
							'node_modules/photoswipe/dist/photoswipe.css'
						),
						path.resolve(
							__dirname,
							'./src/photoswipe-caption.css'
						),
					],
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
		plugins: [
			new RemoveEmptyScriptsPlugin(),
			new MiniCssExtractPlugin(),
		],
	},
	
];
