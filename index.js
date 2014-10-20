var Filter = require('broccoli-filter');
var jscs = require('jscs');
var config = require('jscs/lib/cli-config');

var JscsFilter = function(inputTree, options) {
  if (!(this instanceof JscsFilter)) return new JscsFilter(inputTree, options);

  this.inputTree = inputTree;

  var rules = config.load(options.configPath);
  if (rules) {
    var checker = new jscs({esnext: options && !!options.esnext});
    checker.registerDefaultRules();
    checker.configure(rules);
    this.checker = checker;
  }
  this.bypass = !rules;
};

JscsFilter.prototype = Object.create(Filter.prototype);
JscsFilter.prototype.constructor = JscsFilter;
JscsFilter.prototype.extensions = ['js'];
JscsFilter.prototype.targetExtension = 'js';
JscsFilter.prototype.processString = function(content, relativePath) {
  if (!this.bypass) {
    var errors = this.checker.checkString(content, relativePath);
    errors.getErrorList().forEach(function (err) {
      console.log(errors.explainError(err, true));
    });
  }

  return content;
};

module.exports = JscsFilter;