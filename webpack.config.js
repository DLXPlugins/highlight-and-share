const webpack = require( 'webpack' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
const path = require( 'path' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const inProduction = ('production' === process.env.NODE_ENV);
const BrowserSyncPlugin = require( 'browser-sync-webpack-plugin' );
const ImageminPlugin = require( 'imagemin-webpack-plugin' ).default;
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );
const WebpackRTLPlugin = require( 'webpack-rtl-plugin' );
const wpPot = require( 'wp-pot' );

const config = {
    // Ensure modules like magnific know jQuery is external (loaded via WP).
    externals: {
        $: 'jQuery',
        jquery: 'jQuery'
    },
    devtool: 'source-map',
    module: {
        rules: [

            // Use Babel to compile JS.
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: 'babel-loader',
                options: {
                    presets: ['es2015'],
                    plugins: ['transform-class-properties']
                }
            },

            // Create RTL styles.
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract( {
                    use: [ {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true,
                        }
                    } ]
                } )
            },

            // SASS to CSS.
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract( {
                    use: [ {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        }
                    } ]
                } )
            },

            // Image files.
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]',
                            publicPath: '../'
                        }
                    }
                ]
            }
        ]
    },

    // Plugins. Gotta have em'.
    plugins: [
        // Removes the "dist" folder before building.
        new CleanWebpackPlugin( [ 'resources/dist' ] ),

        new ExtractTextPlugin('../../assets/dist/css/[name].css' ),

        // Create RTL css.
        new WebpackRTLPlugin()
    ]
};

module.exports = [
    Object.assign({
		entry: {
			admin: ['idempotent-babel-polyfill', './blocks/load.js']
		},

        // Tell webpack where to output.
        output: {
            path: path.resolve( __dirname, './assets/dist/' ),
            filename: 'js/gutenberg.js'
        },
    }, config)
];

// inProd?
if ( inProduction ) {

    // POT file.
    wpPot( {
        package: 'ConvertKit',
        domain: 'post-type-archive-mapping',
        destFile: 'languages/post-type-archive-mapping.pot',
        relativeTo: './',
    } );

    // Uglify JS.
    config.plugins.push( new webpack.optimize.UglifyJsPlugin( { sourceMap: true } ) );

    // Minify CSS.
    config.plugins.push( new webpack.LoaderOptionsPlugin( { minimize: true } ) );
}