module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    parserOptions:{
        parser: "babel-eslint"
    },
    extends: [
      // add more generic rulesets here, such as:
    //   'eslint:recommended',
      'plugin:vue/base',
      'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
    ],
    rules: {
      // override/add rules settings here, such as:
      // 'vue/no-unused-vars': 'error'
    }
  }