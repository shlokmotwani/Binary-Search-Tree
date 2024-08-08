import { Tree } from "./tree";

function generateArray() {
  let array = [];
  let size = Math.random() * 100;
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * 100));
  }
  return array;
}

function fetchDataFromNode(node) {
  return node.data;
}

function doubleUp(node) {
  return node.data * 2;
}

function treeOperations() {
  let array = generateArray();

  let tree = new Tree(array);
  console.log("-------------------------------------------------------");
  tree.prettyPrint();
  console.log("-------------------------------------------------------");

  tree.insert(50);
  tree.prettyPrint();
  console.log("-------------------------------------------------------");

  tree.insert(25);
  tree.prettyPrint();
  console.log("-------------------------------------------------------");

  tree.insert(21);
  tree.prettyPrint();
  console.log("-------------------------------------------------------");

  tree.insert(26);
  tree.prettyPrint();
  console.log("-------------------------------------------------------");

  tree.insert(99);
  tree.prettyPrint();
  console.log("-------------------------------------------------------");

  tree.insert(100);
  tree.prettyPrint();
  console.log("-------------------------------------------------------");

  tree.insert(101);
  tree.prettyPrint();
  console.log("-------------------------------------------------------");

  //check for left-leaf-node deletion
  tree.deleteItem(17);
  tree.prettyPrint();
  console.log("-------------------------------------------------------");

  //check for right-leaf-node deletion
  tree.deleteItem(26);
  tree.prettyPrint();
  console.log("-------------------------------------------------------");

  //check for leaf-node-with-left-child deletion
  tree.deleteItem(13);
  tree.prettyPrint();
  console.log("-------------------------------------------------------");

  //check for leaf-node-with-right-child deletion
  tree.deleteItem(20);
  tree.prettyPrint();
  console.log("-------------------------------------------------------");

  //check for leaf-node-with-both-children deletion
  tree.deleteItem(11);
  tree.prettyPrint();
  console.log("-------------------------------------------------------");

  // console.log(tree.find(19));

  let BFSviaTraversal = tree.levelOrderViaIteration(fetchDataFromNode);
  console.log("--------------BFSviaTraversal----------------");
  console.log(BFSviaTraversal);

  let BFSviaRecursion = tree.levelOrderViaRecursion(doubleUp, tree.root);
  console.log(
    "--------------BFSviaRecursion (Prints doubled up values)----------------"
  );
  console.log(BFSviaRecursion);

  let inOrderTraversal = tree.inOrder(fetchDataFromNode, tree.root);
  console.log("--------------IN-ORDER Traversal----------------");
  console.log(inOrderTraversal);

  let preOrderTraversal = tree.preOrder(fetchDataFromNode, tree.root);
  console.log("--------------PRE-ORDER Traversal----------------");
  console.log(preOrderTraversal);

  let postOrderTraversal = tree.postOrder(fetchDataFromNode, tree.root);
  console.log("--------------POST-ORDER Traversal----------------");
  console.log(postOrderTraversal);

  console.log(`TREE HEIGHT = ${tree.height(tree.root)}`);

  console.log(`Depth of 5 is ${tree.depth(5)}`);
  console.log(`Depth of 18 is ${tree.depth(18)}`);
  console.log(`Depth of 555 is ${tree.depth(555)}`);

  console.log(`Is Tree balanced? : ${tree.isBalanced()}`);
}

treeOperations();
