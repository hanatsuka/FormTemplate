var path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}
let publicPath = './'
module.exports = {
    publicPath: publicPath,
    outputDir: 'dist',
    lintOnSave: true,
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@components', resolve('src/components'))
            .set('@page', resolve('src/page'))
            .set('@assets', resolve('src/assets'))
            .set('@style', resolve('src/assets/styles'))
    },
    configureWebpack: (config) => {},
    devServer: {}
}