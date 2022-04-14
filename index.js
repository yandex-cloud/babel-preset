
const env = process.env.BABEL_ENV || process.env.NODE_ENV || 'development';
const isEnvDevelopment = env === 'development';
const isEnvProduction = env === 'production';
const isEnvTest = env === 'test';

function getOption(value, defaultValue) {
    if (typeof value === 'undefined') {
        return defaultValue;
    }

    return value;
}

module.exports = function (context, options = {}) {
    const envOptions = getOption(options.env, {});
    const runtimeOptions = getOption(options.runtime, {});
    const isTypeScriptEnabled = getOption(options.typescript, false);
    const reactOptions = getOption(options.react, {});

    const presets = [
        // Latest stable ECMAScript features
        (isEnvDevelopment || isEnvProduction) && [require.resolve('@babel/preset-env'), envOptions],
        // ES features necessary for current Node version
        isEnvTest && [require.resolve('@babel/preset-env'), Object.assign({}, envOptions, {
            targets: {
                node: 'current',
            },
        })],
        // JSX
        [require.resolve('@babel/preset-react'), Object.assign({}, reactOptions, {
            development: isEnvDevelopment || isEnvTest,
            useBuiltIns: true,
        })],
        isTypeScriptEnabled && [require.resolve('@babel/preset-typescript')],
    ].filter(Boolean);

    const plugins = [
        isTypeScriptEnabled && [require.resolve('@babel/plugin-proposal-decorators'), {
            // @decorator
            // export class Foo {}
            decoratorsBeforeExport: true,
        }],
        // Polyfills the runtime needed for async/await and generators
        [require.resolve('@babel/plugin-transform-runtime'), runtimeOptions],
        isEnvProduction && [require.resolve('babel-plugin-transform-react-remove-prop-types'), {
            removeImport: true,
        }],
        // Compiles import() to a deferred require()
        isEnvTest && require.resolve('babel-plugin-dynamic-import-node'),
    ].filter(Boolean);

    return {
        presets,
        plugins,
    };
};
