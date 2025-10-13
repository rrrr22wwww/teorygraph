import * as fs from "fs";

interface typeNode {
  key: number;
  left: typeNode | undefined;
  right: typeNode | undefined;
  size: number;
}

function readfile(path: string) {
  return fs.readFileSync(path, "utf8");
}

const [sizeData, Data] = readfile("test/task_3/sequence/epg_t3_001.txt").split(
  "\n",
);
const arrayData = Data.split(" ");

class Node {
  public key;
  public size;
  public left: Node | undefined;
  public right: Node | undefined;

  constructor(key: number) {
    this.key = key;
    this.left = undefined;
    this.right = undefined;
    this.size = 1;
  }
}

function updateSize(node: Node | undefined): void {
  if (node) {
    node.size = 1 + (node.left?.size || 0) + (node.right?.size || 0);
  }
}

function deletNode() {}

function find(tree: Node | undefined, target: number): Node | undefined {
  if (!tree) return undefined;
  if (tree.key === target) {
    console.log(
      `Element ${tree.key} found!, \n Left:${tree.left?.key ?? "None"} Right:${tree.right?.key ?? "None"}`,
    );
    return tree;
  }
  if (tree.key < target) {
    return find(tree.right, target);
  } else {
    return find(tree.left, target);
  }
}

function sliceTree(
  tree: Node | undefined,
  target: number,
): [Node | undefined, Node | undefined] {
  if (!tree) return [undefined, undefined];
  if (tree.key < target) {
    const [l, r] = sliceTree(tree.right, target);
    tree.right = l;
    updateSize(tree);
    return [tree, r];
  } else {
    const [l, r] = sliceTree(tree.left, target);
    tree.left = r;
    updateSize(tree);
    return [l, tree];
  }
}

function rebalancetree(tree: Node, newRoot: number): Node {
  const parent = new Node(newRoot);
  const [l, r] = sliceTree(tree, newRoot);
  parent.left = l;
  parent.right = r;
  updateSize(parent);
  return parent;
}

function insertNode(tree: Node, key: number, n: number): Node {
  if (1 / (n + 1) < Math.random()) {
    return rebalancetree(tree, key);
  } else {
    if (tree.key === key) {
      return tree;
    } else if (tree.key < key) {
      if (!tree.right) {
        tree.right = new Node(key);
      } else {
        tree.right = insertNode(tree.right, key, n + 1);
      }
    } else {
      if (!tree.left) {
        tree.left = new Node(key);
      } else {
        tree.left = insertNode(tree.left, key, n + 1);
      }
    }
    updateSize(tree);
    return tree;
  }
}

function CreateTree(m: string[], lenght: number): Node {
  let tree: Node = new Node(Number(m[0]));
  for (let i = 0; i < m.length - 1; i++) {
    tree = insertNode(tree, Number(m[i + 1]), i - 1); // {},-23,[23,1,2,4],1
  }
  return tree;
}

let a = CreateTree(arrayData, Number(sizeData)); //["10","20","5","15","25","52","30"] - test rebalance tree

console.log(a.key);

// Vizualiztion tree - Mermaid
let nodeId = 0;
function generateMermaid(
  tree: Node | undefined,
  parentId: number = 0,
  side: string = "",
): string {
  if (!tree) return "";

  nodeId++;
  const currentId = nodeId;
  let mermaid = `  node${currentId}["${tree.key}<br/>size: ${tree.size}"]\n`;

  if (parentId > 0) {
    const label = side === "L" ? "|L|" : "|R|";
    mermaid += `  node${parentId} -->${label} node${currentId}\n`;
  }

  if (tree.left) {
    mermaid += generateMermaid(tree.left, currentId, "L");
  }

  if (tree.right) {
    mermaid += generateMermaid(tree.right, currentId, "R");
  }

  return mermaid;
}

function saveMermaidToFile(tree: Node, title: string, filename: string): void {
  nodeId = 0;
  let content = `# ${title}\n\n`;
  content += "```mermaid\n";
  content += "graph TD\n";
  content += generateMermaid(tree);
  content += "```\n\n";

  fs.appendFileSync(filename, content);
  console.log(`✓ Диаграмма "${title}" сохранена в ${filename}`);
}

const outputFile = "tree_diagrams.md";
const outputFile2 = "tree_2diagrams.md";

if (fs.existsSync(outputFile)) {
  fs.unlinkSync(outputFile);
}
if (fs.existsSync(outputFile2)) {
  fs.unlinkSync(outputFile2);
}
fs.writeFileSync(outputFile, "# Binary Search Tree Diagrams\n\n");
fs.appendFileSync(
  outputFile,
  `*Сгенерировано: ${new Date().toLocaleString()}*\n\n---\n\n`,
);
saveMermaidToFile(a, "Исходное BST дерево", outputFile);

let b = rebalancetree(a, 22);
console.log(find(b, 22));
saveMermaidToFile(b, "Дерево после rebalance", outputFile2);
