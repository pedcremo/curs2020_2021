module.exports = {
  "extends": [
    "eslint:recommended",
  ],
  "parser": "babel-eslint",
  "rules":{
    'no-console': 'off',
    'no-unused-vars':'off',
    'no-debugger':'off',
  },
  "env": {
    "browser": true,
    "es6":true,
    "node": true,
    "jasmine": true
  },
};

