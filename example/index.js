var fs = require("fs");
const R = require("ramda");
const icml2ntz = require("../src/");
const path = require("path");

const derBesuch = [
  "./articles/Der Besuch/export-0166.icml",
  "./articles/Der Besuch/export-0170.icml",
  "./articles/Der Besuch/export-0175.icml",
  "./articles/Der Besuch/export-0176.icml"
];

// parse icml to ntz
let result = [];

derBesuch.forEach(filePath => {
  console.log(`processing ${filePath}`)
  const icml = fs.readFileSync(path.resolve(__dirname, filePath));
  let notzer = new icml2ntz(icml);

  let ntz = notzer.parse();
  // result.push(...ntz);
  result = ntz
});

let output = JSON.stringify(result, null, 4);
// write notzer file
fs.writeFileSync(path.resolve(__dirname, "./articles/Der Besuch/index.ntz.json"), output);
