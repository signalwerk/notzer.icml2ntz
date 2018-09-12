# Notzer → icml2ntz
Convert a ICML-File to the Notzer-Fileformat.


## install
```sh
npm install notzer.icml2ntz --save
```

## usage
```js
var fs = require("fs");
const icml2ntz = require("notzer.icml2ntz");

var icml = String(fs.readFileSync("./index.idml")); // the general HTML

// parse html to ntz
let notzer = new icml2ntz(icml);


// write notzer file
let output = JSON.stringify(notzer.parse(), null, 4);
fs.writeFileSync("./test.ntz.json", output);
```
