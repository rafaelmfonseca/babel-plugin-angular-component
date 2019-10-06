# babel-plugin-angular-component

Babel plugin that adds require() declaration if file contains templateUrl and styleUrls properties.

## Example

Your `some.component.ts` that contains this code:

```js
@Component({
    templateUrl: "home.component.html",
    styleUrls: ["home.component.css"]
})
export class HomeComponent {}
```

will be transpiled into something like this:

```js
@Component({
    template: require("home.component.html").default,
    styles: [require("home.component.css").default]
})
export class HomeComponent {}
```

## Usage

* Install `babel-plugin-angular-component`.

```
npm install babel-plugin-angular-component --save-dev
```

* Add `babel-plugin-angular-component` into `webpack.config.js`.
* `webpack.config.js` example for Angular 8+:
```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');
const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        polyfill: __dirname + '/app/polyfill.ts',
        app: __dirname + '/app/main.ts'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        port: 80,
    },
    resolve: {
        extensions: ['.ts', '.js', '.html', '.css']
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    module: {
        rules: [
            {
                test: /\.ts/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: [ 'plugin-angular-template' ]
                        }
                    },
                    {
                        loader: 'ts-loader'
                    }
                ]
            },
            {
                test: /\.component\.(html|css)/,
                use: [
                    {
                        loader: 'raw-loader'
                    }
                ]
            },
            {
                test: /\.css/,
                exclude: /components/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            template: HtmlWebpackTemplate,
            headHtmlSnippet: '<base href="/">',
            bodyHtmlSnippet: '<app-root></app-root>'
        })
    ]
};
```