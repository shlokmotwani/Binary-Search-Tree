import { Tree } from "./tree";

let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

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