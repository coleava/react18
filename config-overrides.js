const {
    override,
    fixBabelImports, // 按需加载配置函数
    addBabelPlugins // babel插件配置函数
} = require('customize-cra')

module.exports = override(
    addBabelPlugins( // 支持装饰器
        [
            '@babel/plugin-proposal-decorators',
            {
                legacy: true
            }
        ]
    )
)