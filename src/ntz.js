const R = require("ramda");

class ntz {
  constructor() {
    this.ntz = [];
  }

  optimize() {
    this.concatinateInline();
    this.concatinateText();
  }

  // search the whole tree and check if
  // children of type text can be concatinated
  concatinateText() {
    // const reducer = (acc, nxt, id) => R.concat(acc, [{ nxt, id }])
    const reduceIndexed = R.addIndex(R.reduce);
    const reducer = (acc, _val, idx, list) => {
      let val = _val;

      if (val.children) {
        val.children = reduceIndexed(reducer, [], val.children);
      }

      if (idx > 0) {
        let lastItem = acc[acc.length - 1];
        if (
          val.processor.type === "text" &&
          R.equals(val.processor, lastItem.processor)
        ) {
          lastItem.value = `${lastItem.value}${val.value}`;
        } else {
          acc.push(val);
        }
      } else {
        acc.push(val);
      }

      return acc;
    };

    return reduceIndexed(reducer, [], this.ntz);
  }

  // search the whole tree and check if
  // children of type inline of the same kind
  // can be concatinated
  concatinateInline() {
    // const reducer = (acc, nxt, id) => R.concat(acc, [{ nxt, id }])
    const reduceIndexed = R.addIndex(R.reduce);
    const reducer = (acc, _val, idx, list) => {
      let val = _val;

      if (val.children) {
        val.children = reduceIndexed(reducer, [], val.children);
      }

      if (idx > 0) {
        let lastItem = acc[acc.length - 1];
        if (
          val.processor.type === "inline" &&
          R.equals(val.processor, lastItem.processor)
        ) {
          lastItem.children.push(...val.children);
        } else {
          acc.push(val);
        }
      } else {
        acc.push(val);
      }

      return acc;
    };

    return reduceIndexed(reducer, [], this.ntz);
  }

  addParagraph(title) {
    this.ntz.push({
      processor: {
        type: "paragraph",
        "content-after": "RETURN",
        node: "p",
        title
      },
      children: []
    });
  }

  addInline(title) {
    this.ntz[this.ntz.length - 1].children.push({
      processor: {
        type: "inline",
        title
      },
      children: []
    });
  }

  addText(text) {
    let lastPragrpah = this.ntz[this.ntz.length - 1];
    lastPragrpah.children[lastPragrpah.children.length - 1].children.push({
      processor: {
        type: "text"
      },
      value: text
    });
  }

  getNtz() {
    return this.ntz;
  }
}

module.exports = ntz;
