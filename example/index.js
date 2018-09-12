var fs = require("fs");
const R = require("ramda");
const icml2ntz = require("../src/");
const Ntz2icml = require("notzer.ntz2icml");
const path = require("path");

let writeLog = content => {
  writeKey(R.keys(content));

  let output = JSON.stringify(content, null, 4);
  fs.writeFileSync(path.resolve(__dirname, "../example/data/log.json"), output);
};

let writeKey = content => {
  let output = JSON.stringify(content, null, 4);
  fs.writeFileSync(path.resolve(__dirname, "../example/data/key.json"), output);
};

// parse icml to ntz
const icml = fs.readFileSync(path.resolve(__dirname, "./data/index.icml"));
let notzer = new icml2ntz(icml);

writeLog(notzer.getParagraphStyleRanges()[0].CharacterStyleRange[0].Content);

let ntz = notzer.parse();
let output = JSON.stringify(ntz, null, 4);
// write notzer file
fs.writeFileSync(path.resolve(__dirname, "./data/index.ntz.json"), output);

// re-export
let ntz2icml = new Ntz2icml();
fs.writeFileSync(
  path.resolve(__dirname, "./data/re-export.icml"),
  ntz2icml.convert(ntz)
);
