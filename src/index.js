import "../vendor/treant/Treant.css";
import "./index.css";
import { getFreqMap, encode, getCodes } from "./main";
import { Node } from "./node";

const questionVal = "       aaaaeeeefffhhiimmnnssttloprux";
document.getElementById("input").value = questionVal;
const tableContainre = document.getElementById("table-container");

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
  tableContainre.innerHTML = "";
  const root = encode(freqMap);
  const codeMap = new Map();
  getCodes(root, codeMap);
  displayFreqTable(freqMap, codeMap);
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
 * @param {Map<string,number>} freqMap
 * @param {Map<string,string>} codeMap
 */
function displayFreqTable(freqMap, codeMap) {
  const table = document.createElement("table");
  const head = table.createTHead();
  const headRow = head.insertRow();

  const th1 = document.createElement("th");
  th1.appendChild(document.createTextNode("Character"));
  headRow.appendChild(th1);
  const th2 = document.createElement("th");
  th2.appendChild(document.createTextNode("Frequency"));
  headRow.appendChild(th2);
  const th3 = document.createElement("th");
  th3.appendChild(document.createTextNode("Code"));
  headRow.appendChild(th3);

  for (const entry of freqMap) {
    const row = table.insertRow();
    for (const i of entry) {
      const cell = row.insertCell();
      cell.appendChild(document.createTextNode(`${i.toString()}`));
    }
    const cell = row.insertCell();
    cell.appendChild(document.createTextNode(codeMap.get(entry[0])));
  }

  tableContainre.appendChild(table);
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
