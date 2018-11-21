module.exports = {
    entry: './src/app.js',
    output: {
        filename: './dist/flaunt.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
};
