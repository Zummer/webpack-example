const pluginName = 'ConsoleLogOnBuildWebpackPlugin2';

class ConsoleLogOnBuildWebpackPlugin2 {
    apply(compiler) {
        compiler.hooks.run.tap(pluginName, compilation => {
            console.log('The webpack build process is starting!!!');
        });
    }
}

module.exports = ConsoleLogOnBuildWebpackPlugin2;
