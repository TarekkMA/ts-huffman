const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

/**
 * @returns {webpack.Configuration}
 */
const config = (env) => {
  const isProd = env.PROD == "true";
  return {
    mode: isProd ? "production" : "development",
    entry: "./src/main.ts",
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "js/[name].[chunkhash:8].js",
      publicPath: isProd ? "/ts-huffman/" : "/",
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
      new CleanWebpackPlugin(),
      new webpack.ProvidePlugin({ Raphael: "raphael" }),
    ],
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.ttf$/,
          use: ["file-loader"],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: "file-loader",
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/i,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    },
  };
};

module.exports = config;
