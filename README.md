broccoli-jscs
=============

[![Build Status](https://travis-ci.org/kellyselden/broccoli-jscs.svg?branch=master)](https://travis-ci.org/kellyselden/broccoli-jscs)

Broccoli plugin for [jscs](https://github.com/jscs-dev/node-jscs)

## Usage

```javascript
var jscs = require('broccoli-jscs');

// assuming someTree is a built up tree
var tree = jscs(someTree);
// or
var tree = jscs('folderName');
```

## Documentation

### `jscs(inputTree, options)`

---

`options.configPath` *{String}*

Will look in the root of the provided tree for a `.jscsrc`. Use this option if you would like to use a `.jscsrc`
file from a different path.

Default: **'.jscsrc'**

---

`options.enabled` *{true|false}*

This will eliminate processing altogether.

Default: **false**

---

`options.esnext` *{true|false}*

Support ES6 module syntax.

Default: **false**

---

`options.logError` *{Function}*

The function used to log to console. You can provide a custom function to log anywhere, perhaps a file or web service.

The function receives the following argument:

* `message` - A generated string of errors found.

---

`options.disableTestGenerator` *{true|false}*

If `true` tests will not be generated.

Default: **false**

---

`options.testGenerator` *{Function}*

The function used to generate test modules. You can provide a custom function for your client side testing framework of choice.

The function receives the following arguments:

* `relativePath` - The relative path to the file being tested.
* `errors` - A generated string of errors found.

Default generates QUnit style tests:

```javascript
var path = require('path');

function(relativePath, errors) {
  return "module('JSCS - " + path.dirname(relativePath) + "');\n" +
         "test('" + relativePath + " should pass jscs', function() {\n" +
         "  ok(" + !errors + ", '" + relativePath + " should pass jscs." + errors + "');\n" +
         "});\n";
};
```

## Tests

Running the tests:

```javascript
npm install
npm test
```
