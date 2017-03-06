module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "eslint-config-kyt"
  ],
  "env": {
    "es6": true,
    "node": true
  },
  "plugins": [
    'graphql',
  ],
  "globals": {
    "document": true,
    "navigator": false,
    "window": true
  },
  "rules": {
    "graphql/template-strings": ['error', {
      env: 'relay',
      schemaJson: require('./src/data/schema/schema.json')
    }],
  }
};
