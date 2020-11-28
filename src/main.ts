import { Node } from "./node";
import { PriorityQueue } from "./priority-queue";
import "../vendor/treant/Treant.js";
import "./index.js";

export function getFreqMap(input: string) {
  const freqMap = new Map<string, number>();

  for (const char of input) {
    const charFreq = freqMap.get(char);
    if (charFreq == undefined) {
      freqMap.set(char, 1);
    } else {
      freqMap.set(char, charFreq + 1);
    }
  }
  return freqMap;
}

export function encode(freqMap: Map<string, number>): Node {
  const queue = new PriorityQueue<Node>((a, b) => {
    return b.freq - a.freq;
  });

  for (const charFreq of freqMap.entries()) {
    const char = charFreq[0];
    const freq = charFreq[1];
    queue.insert(new Node(freq, char));
  }

  while (queue.size > 1) {
    const node1 = queue.pop();
    const node2 = queue.pop();

    const newNode = new Node(node1.freq + node2.freq, "", node1, node2);
    queue.insert(newNode);
  }
  const root = queue.pop();
  return root;
}

function printCode(node: Node, s = "") {
  if (node.left == undefined || node.right == undefined) {
    console.log(node.text, s);
    return;
  }
  printCode(node.left!!, s + "0");
  printCode(node.right!!, s + "1");
}

// const node = encode(
//   new Map([
//     [" ", 7],
//     ["a", 4],
//     ["e", 4],
//     ["f", 3],
//     ["h", 2],
//     ["i", 2],
//     ["m", 2],
//     ["n", 2],
//     ["s", 2],
//     ["t", 2],
//     ["l", 1],
//     ["o", 1],
//     ["p", 1],
//     ["r", 1],
//     ["u", 1],
//     ["x", 1],
//   ])
// );
// printCode(node);


