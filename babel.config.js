module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Required for expo-router
   
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel',],
      },
    },
  };
};


