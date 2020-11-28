import "../vendor/treant/Treant.css";
import "./index.css";
import { getFreqMap, encode } from "./main";
import { Node } from "./node";

const questionVal = "       aaaaeeeefffhhiimmnnssttloprux";
document.getElementById("input").value = questionVal;

setTimeout(function () {
  console.log("page loads");
  encodeInput();
}, 100);
document.getElementById("encode-btn").onclick = function () {
  encodeInput();
};
function encodeInput() {
  const input = document.getElementById("input").value;
  const freqMap = getFreqMap(input);
  const root = encode(freqMap);
  displayTree(root);
}

function displayTree(huffnode) {
  var simple_chart_config = {
    chart: {
      container: "#tree-simple",
    },
    nodeStructure: getTreeNode(huffnode),
  };
  new Treant(simple_chart_config);
}

/**
 *
 * @param {Node} huffnode
 */
function getTreeNode(huffnode) {
  const node = {};
  node.text = {};
  if (huffnode.text != undefined) {
    node.text.name = huffnode.text;
    if (huffnode.text == " ") {
      node.text.name = "[space]";
    }
  }
  node.text.title = huffnode.freq;

  node.children = [];
  if (huffnode.left) {
    node.children.push(getTreeNode(huffnode.left));
  }
  if (huffnode.right) {
    node.children.push(getTreeNode(huffnode.right));
  }
  return node;
}
