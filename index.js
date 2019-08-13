const esqueryRule = require("./rules/esquery");

module.exports = {
  rules: {
    esquery: esqueryRule,
    "esquery-warn": Object.assign({}, esqueryRule),
    "esquery-error": Object.assign({}, esqueryRule),
  },
};
