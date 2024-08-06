import { Node } from "./node";

class Tree {
  constructor(array) {
    this.array = this.linearSortWithoutDuplicates(array);
    this.root = this.buildTree(this.array);
  }

  buildTree(array) {
    if(array.length == 1){
        return new Node(array[0], null, null);
    }
    let rootNode;
    let middleIndex = Math.floor((array.length) / 2);
    if(middleIndex + 1 >= array.length){
        rootNode = new Node(array[middleIndex], this.buildTree(array.slice(0, middleIndex)), null);
    }
    else{
        rootNode = new Node(array[middleIndex], this.buildTree(array.slice(0, middleIndex)), this.buildTree(array.slice(middleIndex+1, array.length)));
    }
    return rootNode;
  }

  linearSortWithoutDuplicates(array) {
    for (let i = 0; i < array.length; i++) {
        let indexOfSmallest = i;
        for(let j=i+1; j<array.length; j++){
            if(array[j] < array[indexOfSmallest]){
                indexOfSmallest = j;
            }
        }
        let temp = array[i];
        array[i] = array[indexOfSmallest];
        array[indexOfSmallest] = temp;
    }
    let newArray = [];
    for(let i=0; i<array.length; i++){
        if(array[i] != array[i+1]){
            newArray.push(array[i]);
        }
    }
    console.log(newArray);
    return newArray;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true){
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
 
}

export { Tree };
