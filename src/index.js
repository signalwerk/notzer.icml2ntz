const parseString = require("xml2js").parseString;
var Notzer = require("./ntz");

var ntz = new Notzer();
const R = require("ramda");

class Icml2ntz {
  constructor(icml) {
    this.icml = icml || "";

    parseString(this.icml, (err, result) => {
      this.xml = result;
    });
  }

  getParagraphStyleRanges() {
    return R.path(["Document", "Story", 0, "ParagraphStyleRange"], this.xml);
  }

  parse() {
    // return xml

    let paragraphStyleRanges = this.getParagraphStyleRanges();

    R.forEach(paragraphStyleRange => {
      ntz.addParagraph(
        paragraphStyleRange["$"].AppliedParagraphStyle.replace(
          /^ParagraphStyle\//,
          ""
        )
      );

      R.forEach(CharacterStyleRange => {
        ntz.addInline(
          CharacterStyleRange["$"].AppliedCharacterStyle.replace(
            /^CharacterStyle\//,
            ""
          )
        );
        if (
          CharacterStyleRange.Content &&
          CharacterStyleRange.Content.length === 1
        ) {
          ntz.addText(CharacterStyleRange.Content[0]);
        }
      }, paragraphStyleRange.CharacterStyleRange);
    }, paragraphStyleRanges);

    ntz.optimize();
    return ntz.getNtz();
  }
}

module.exports = Icml2ntz;
