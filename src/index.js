import { Tree } from "./tree";

let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
            11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
            21, 22, 33, 44, 35, 86, 107, 208, 119, 820,];

let tree = new Tree(array);
console.log("-------------------------------------------------------");
tree.prettyPrint();
console.log("-------------------------------------------------------");

function treeOperations(){
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
    
    // console.log(tree.find(19));
    
    let BFSviaTraversal = tree.levelOrderViaIteration();
    console.log("--------------BFSviaTraversal----------------");
    console.log(BFSviaTraversal);
    
    let BFSviaRecursion = tree.levelOrderViaRecursion(tree.root);
    console.log("--------------BFSviaRecursion----------------");
    console.log(BFSviaRecursion);
    
    let inOrderTraversal = tree.inOrder(tree.root);
    console.log("--------------IN-ORDER Traversal----------------");
    console.log(inOrderTraversal);
    
    let preOrderTraversal = tree.preOrder(tree.root);
    console.log("--------------PRE-ORDER Traversal----------------");
    console.log(preOrderTraversal);
    
    let postOrderTraversal = tree.postOrder(tree.root);
    console.log("--------------POST-ORDER Traversal----------------");
    console.log(postOrderTraversal);
    
    console.log(`TREE HEIGHT = ${tree.height(tree.root)}`);

    console.log(`Depth of 5 is ${tree.depth(5)}`);
    console.log(`Depth of 18 is ${tree.depth(18)}`);
    console.log(`Depth of 555 is ${tree.depth(555)}`);
    
}

treeOperations();