import { Node } from "./node";

class Tree {
  constructor(array) {
    this.array = this.linearSortWithoutDuplicates(array);
    this.root = this.buildTree(this.array);
  }

  buildTree(array) {
    if (array.length == 1) {
      return new Node(array[0], null, null);
    }
    let rootNode;
    let middleIndex = Math.floor(array.length / 2);
    if (middleIndex + 1 >= array.length) {
      rootNode = new Node(
        array[middleIndex],
        this.buildTree(array.slice(0, middleIndex)),
        null
      );
    } else {
      rootNode = new Node(
        array[middleIndex],
        this.buildTree(array.slice(0, middleIndex)),
        this.buildTree(array.slice(middleIndex + 1, array.length))
      );
    }
    return rootNode;
  }

  linearSortWithoutDuplicates(array) {
    for (let i = 0; i < array.length; i++) {
      let indexOfSmallest = i;
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] < array[indexOfSmallest]) {
          indexOfSmallest = j;
        }
      }
      let temp = array[i];
      array[i] = array[indexOfSmallest];
      array[indexOfSmallest] = temp;
    }
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i] != array[i + 1]) {
        newArray.push(array[i]);
      }
    }
    console.log(newArray);
    return newArray;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  insert(value) {
    console.log(`insertValue ${value} called.`);
    if (!value) {
      console.log("Enter a valid value");
      return;
    }
    let temp = this.root;
    let newNode = new Node(value, null, null);
    console.log("value = " + value);
    console.log("temp node = " + temp.data);
    while (true) {
      if (value == temp.data) {
        console.log("Value already exists in the tree!");
        return;
      }
      if (value < temp.data) {
        if (!temp.left) {
          temp.left = newNode;
          return;
        }
        temp = temp.left;
      } else {
        if (!temp.right) {
          temp.right = newNode;
          return;
        }
        temp = temp.right;
      }
    }
  }

  deleteItem(value) {
    console.log(`deleteItem ${value} called.`);
    let temp = this.root;
    let prev;
    let isNodeALeftChild = undefined;

    //search for target node
    while (true) {
      //if temp reaches null, TARGET NODE NOT FOUND in the tree
      if (!temp) {
        console.log("Item does not exist in the tree.");
        return;
      }
      //temp traverses the tree to reach target node
      if (temp.data > value) {
        //move temp towards the left
        prev = temp;
        temp = temp.left;
        isNodeALeftChild = true;
      } else if (temp.data < value) {
        //move temp towards the right
        prev = temp;
        temp = temp.right;
        isNodeALeftChild = false;
      } else {
        // TARGET NODE FOUND
        // if target node is a leaf node
        if (!temp.left && !temp.right) {
          if (prev.left == temp) {
            prev.left = null;
          } else {
            prev.right = null;
          }
          return;
        } else {
          //if target node has ONLY a left child
          if (!temp.right) {
            if (isNodeALeftChild) {
              prev.left = temp.left;
            } else {
              prev.right = temp.left;
            }
            temp.left = null;
          }
          //if target node has ONLY a right child
          else if (!temp.left) {
            if (isNodeALeftChild) {
              prev.left = temp.right;
            } else {
              prev.right = temp.right;
            }
            temp.right = null;
          }
          //if target node has BOTH a left AND a right child
          else {
            let targetNode = temp;
            prev = temp;
            temp = temp.right;
            while (temp.left) {
              prev = temp;
              temp = temp.left;
            }
            prev.left = temp.right;
            temp.right = null;
            targetNode.data = temp.data;
          }
        }
        return;
      }
    }
  }

  find(value) {
    console.log(`find ${value} called.`);
    let temp = this.root;

    while (temp) {
      if (temp.data > value) {
        temp = temp.left;
      } else if (temp.data < value) {
        temp = temp.right;
      } else {
        return temp;
      }
    }
    //if temp reaches null, TARGET NODE NOT FOUND in the tree
    console.log("Item does not exist in the tree.");
    return;
  }
}

export { Tree };
