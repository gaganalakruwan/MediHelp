module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        alias: {
          components: './src/components',
          navigation: './src/navigation',
          screens: './src/screens',
          services: './src/services',
          utils: './src/utils',
          constant: './src/constant',
        },
      },
    ],
    'jest-hoist',
    'react-native-reanimated/plugin',
  ],
};
