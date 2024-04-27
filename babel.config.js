module.exports = function(api) {
  api.cache(true);
  
  return {
    presets: [
      'babel-preset-expo',
    ],
    plugins: [
      // react-native-dotenv
      [
        'module:react-native-dotenv',
        {
          "envName": "APP_ENV",
          "moduleName": "@env",
          "path": ".env",
          "blocklist": null,
          "allowlist": null,
          "blacklist": null, 
          "whitelist": null, 
          "safe": false,
          "allowUndefined": true,
          "verbose": false
        },
      ],
      [
        "module-resolver",
        {
          extensions: [".tsx", ".ts", ".js", ".json"],
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
