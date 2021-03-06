const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.jsx',
	output: { path: __dirname + '/dist', publicPath: '/', filename: 'bundle.js' },
	devServer: {
		contentBase: './build',
		port: 8080,
		open: true,
		proxy: {
			'/api': 'http://localhost:5000',
		},
		historyApiFallback: { disableDotRule: true },
	},
	resolve: { extensions: ['.js', '.jsx'] },
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{ test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
			{
				test: /\.(png|jpg|gif|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'images/',
						},
					},
				],
			},
		],
	},
	plugins: [new HtmlWebpackPlugin({ template: path.resolve('./index.html') })],
	devtool: 'inline-source-map',
};
