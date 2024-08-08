/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Tree: () => (/* binding */ Tree)
/* harmony export */ });
/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


class Tree {
  constructor(array) {
    this.root = this.buildTree(this.linearSortWithoutDuplicates(array));
  }

  buildTree(array) {
    if (array.length == 1) {
      return new _node__WEBPACK_IMPORTED_MODULE_0__.Node(array[0], null, null);
    }
    let rootNode;
    let middleIndex = Math.floor(array.length / 2);
    if (middleIndex + 1 >= array.length) {
      rootNode = new _node__WEBPACK_IMPORTED_MODULE_0__.Node(
        array[middleIndex],
        this.buildTree(array.slice(0, middleIndex)),
        null
      );
    } else {
      rootNode = new _node__WEBPACK_IMPORTED_MODULE_0__.Node(
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
    let newNode = new _node__WEBPACK_IMPORTED_MODULE_0__.Node(value, null, null);
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

  levelOrderViaIteration(callback) {
    if(!callback){
      throw new Error("Callback required.");
    }
    let array = [];
    array.push(this.root);
    let index = 0;
    let arraySize = 1;
    while (index < arraySize) {
      if (array[index].left) {
        array.push(array[index].left);
        arraySize++;
      }
      if (array[index].right) {
        array.push(array[index].right);
        arraySize++;
      }
      array[index] = callback(array[index]);
      index++;
    }
    return array;
  }

  levelOrderViaRecursion(callback, node = null, array = [], queue = []) {
    if(!callback){
      throw new Error("Callback required.");
    }
    if (!node) {
      return;
    }
    //push root node's data to array
    if (array.length == 0) {
      array.push(callback(node));
    }
    if (node.left) {
      array.push(callback(node.left));
      queue.push(node.left);
    }
    if (node.right) {
      array.push(callback(node.right));
      queue.push(node.right);
    }
    this.levelOrderViaRecursion(callback, queue.shift(), array, queue);
    return array;
  }

  inOrder(callback, node = null, array = []) {
    if (!node) {
      return;
    }
    this.inOrder(callback, node.left, array);
    array.push(callback(node));
    this.inOrder(callback, node.right, array);

    return array;
  }

  preOrder(callback, node = null, array = []) {
    if (!node) {
      return;
    }
    array.push(callback(node));
    this.preOrder(callback, node.left, array);
    this.preOrder(callback, node.right, array);

    return array;
  }

  postOrder(callback, node = null, array = []) {
    if (!node) {
      return;
    }
    this.postOrder(callback, node.left, array);
    this.postOrder(callback, node.right, array);
    array.push(callback(node));

    return array;
  }

  height(node, count = 0) {
    if (!node || (!node.left && !node.right)) {
      return 0;
    }

    count++;

    let leftChildHeight = this.height(node.left);
    let rightChildHeight = this.height(node.right);

    if (leftChildHeight > rightChildHeight) {
      count += leftChildHeight;
    } else {
      count += rightChildHeight;
    }
    return count;
  }

  depth(value) {
    let temp = this.root;
    let count = 0;

    while (temp) {
      if (temp.data > value) {
        temp = temp.left;
        count++;
      } else if (temp.data < value) {
        temp = temp.right;
        count++;
      } else {
        return count;
      }
    }
    return -1;
  }

  isBalanced(node = this.root){
    if(!node){
      return true;
    }
    let leftSubTreeHeight = this.height(node.left);
    let rightSubTreeHeight = this.height(node.right);
    let subTreeHeightDiff = (leftSubTreeHeight>rightSubTreeHeight)
     ? (leftSubTreeHeight-rightSubTreeHeight) :
     (rightSubTreeHeight-leftSubTreeHeight);
    if(subTreeHeightDiff>1){
      return false;
    }
    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  rebalance(){
    let nodes = this.levelOrderViaRecursion((node)=>{
      return node.data;
    }, this.root);
    nodes = this.linearSortWithoutDuplicates(nodes);
    let balancedTree = new Tree(nodes);
    return balancedTree;
  }
}




/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Node: () => (/* binding */ Node)
/* harmony export */ });
class Node{
    constructor(data, left, right){
        this.data = data;
        this.left = left;
        this.right = right;
    }
}



/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


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

  let tree = new _tree__WEBPACK_IMPORTED_MODULE_0__.Tree(array);
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

  let BFSviaIteration = tree.levelOrderViaIteration(fetchDataFromNode);
  console.log("--------------BFSviaIteration----------------");
  console.log(BFSviaIteration);

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
  let balancedTree = tree.rebalance();
  console.log("--------------BALANCED TREE----------------");
  balancedTree.prettyPrint();
  console.log("-------------------------------------------------------");
}

treeOperations();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUE4Qjs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQix1Q0FBSTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1Q0FBSTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixxQkFBcUIsdUNBQUk7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0Isa0JBQWtCO0FBQ3RDO0FBQ0EsMEJBQTBCLGtCQUFrQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isa0JBQWtCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPLEVBQUUseUJBQXlCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixPQUFPLEVBQUUseUJBQXlCLEVBQUUsVUFBVTtBQUNqRTtBQUNBLHFDQUFxQyxPQUFPLEVBQUUseUJBQXlCO0FBQ3ZFO0FBQ0E7O0FBRUE7QUFDQSwrQkFBK0IsT0FBTztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHVDQUFJO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4QkFBOEIsT0FBTztBQUNyQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QixPQUFPO0FBQy9COztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVnQjs7Ozs7Ozs7Ozs7QUN6VWhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDTkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7QUNOOEI7O0FBRTlCO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixVQUFVO0FBQzVCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQkFBaUIsdUNBQUk7QUFDckI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSwrQkFBK0IsdUJBQXVCOztBQUV0RCwrQkFBK0IsY0FBYztBQUM3QyxnQ0FBZ0MsZUFBZTtBQUMvQyxpQ0FBaUMsZ0JBQWdCOztBQUVqRCxxQ0FBcUMsa0JBQWtCO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iaW5hcnktc2VhcmNoLXRyZWUvLi9zcmMvdHJlZS5qcyIsIndlYnBhY2s6Ly9iaW5hcnktc2VhcmNoLXRyZWUvLi9zcmMvbm9kZS5qcyIsIndlYnBhY2s6Ly9iaW5hcnktc2VhcmNoLXRyZWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmluYXJ5LXNlYXJjaC10cmVlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iaW5hcnktc2VhcmNoLXRyZWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iaW5hcnktc2VhcmNoLXRyZWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iaW5hcnktc2VhcmNoLXRyZWUvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTm9kZSB9IGZyb20gXCIuL25vZGVcIjtcblxuY2xhc3MgVHJlZSB7XG4gIGNvbnN0cnVjdG9yKGFycmF5KSB7XG4gICAgdGhpcy5yb290ID0gdGhpcy5idWlsZFRyZWUodGhpcy5saW5lYXJTb3J0V2l0aG91dER1cGxpY2F0ZXMoYXJyYXkpKTtcbiAgfVxuXG4gIGJ1aWxkVHJlZShhcnJheSkge1xuICAgIGlmIChhcnJheS5sZW5ndGggPT0gMSkge1xuICAgICAgcmV0dXJuIG5ldyBOb2RlKGFycmF5WzBdLCBudWxsLCBudWxsKTtcbiAgICB9XG4gICAgbGV0IHJvb3ROb2RlO1xuICAgIGxldCBtaWRkbGVJbmRleCA9IE1hdGguZmxvb3IoYXJyYXkubGVuZ3RoIC8gMik7XG4gICAgaWYgKG1pZGRsZUluZGV4ICsgMSA+PSBhcnJheS5sZW5ndGgpIHtcbiAgICAgIHJvb3ROb2RlID0gbmV3IE5vZGUoXG4gICAgICAgIGFycmF5W21pZGRsZUluZGV4XSxcbiAgICAgICAgdGhpcy5idWlsZFRyZWUoYXJyYXkuc2xpY2UoMCwgbWlkZGxlSW5kZXgpKSxcbiAgICAgICAgbnVsbFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcm9vdE5vZGUgPSBuZXcgTm9kZShcbiAgICAgICAgYXJyYXlbbWlkZGxlSW5kZXhdLFxuICAgICAgICB0aGlzLmJ1aWxkVHJlZShhcnJheS5zbGljZSgwLCBtaWRkbGVJbmRleCkpLFxuICAgICAgICB0aGlzLmJ1aWxkVHJlZShhcnJheS5zbGljZShtaWRkbGVJbmRleCArIDEsIGFycmF5Lmxlbmd0aCkpXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gcm9vdE5vZGU7XG4gIH1cblxuICBsaW5lYXJTb3J0V2l0aG91dER1cGxpY2F0ZXMoYXJyYXkpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgaW5kZXhPZlNtYWxsZXN0ID0gaTtcbiAgICAgIGZvciAobGV0IGogPSBpICsgMTsgaiA8IGFycmF5Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmIChhcnJheVtqXSA8IGFycmF5W2luZGV4T2ZTbWFsbGVzdF0pIHtcbiAgICAgICAgICBpbmRleE9mU21hbGxlc3QgPSBqO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsZXQgdGVtcCA9IGFycmF5W2ldO1xuICAgICAgYXJyYXlbaV0gPSBhcnJheVtpbmRleE9mU21hbGxlc3RdO1xuICAgICAgYXJyYXlbaW5kZXhPZlNtYWxsZXN0XSA9IHRlbXA7XG4gICAgfVxuICAgIGxldCBuZXdBcnJheSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChhcnJheVtpXSAhPSBhcnJheVtpICsgMV0pIHtcbiAgICAgICAgbmV3QXJyYXkucHVzaChhcnJheVtpXSk7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKG5ld0FycmF5KTtcbiAgICByZXR1cm4gbmV3QXJyYXk7XG4gIH1cblxuICBwcmV0dHlQcmludChub2RlID0gdGhpcy5yb290LCBwcmVmaXggPSBcIlwiLCBpc0xlZnQgPSB0cnVlKSB7XG4gICAgaWYgKG5vZGUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG5vZGUucmlnaHQgIT09IG51bGwpIHtcbiAgICAgIHRoaXMucHJldHR5UHJpbnQoXG4gICAgICAgIG5vZGUucmlnaHQsXG4gICAgICAgIGAke3ByZWZpeH0ke2lzTGVmdCA/IFwi4pSCICAgXCIgOiBcIiAgICBcIn1gLFxuICAgICAgICBmYWxzZVxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCLilJTilIDilIAgXCIgOiBcIuKUjOKUgOKUgCBcIn0ke25vZGUuZGF0YX1gKTtcbiAgICBpZiAobm9kZS5sZWZ0ICE9PSBudWxsKSB7XG4gICAgICB0aGlzLnByZXR0eVByaW50KG5vZGUubGVmdCwgYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCIgICAgXCIgOiBcIuKUgiAgIFwifWAsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGluc2VydCh2YWx1ZSkge1xuICAgIGNvbnNvbGUubG9nKGBpbnNlcnRWYWx1ZSAke3ZhbHVlfSBjYWxsZWQuYCk7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgY29uc29sZS5sb2coXCJFbnRlciBhIHZhbGlkIHZhbHVlXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgdGVtcCA9IHRoaXMucm9vdDtcbiAgICBsZXQgbmV3Tm9kZSA9IG5ldyBOb2RlKHZhbHVlLCBudWxsLCBudWxsKTtcbiAgICBjb25zb2xlLmxvZyhcInZhbHVlID0gXCIgKyB2YWx1ZSk7XG4gICAgY29uc29sZS5sb2coXCJ0ZW1wIG5vZGUgPSBcIiArIHRlbXAuZGF0YSk7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGlmICh2YWx1ZSA9PSB0ZW1wLmRhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJWYWx1ZSBhbHJlYWR5IGV4aXN0cyBpbiB0aGUgdHJlZSFcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh2YWx1ZSA8IHRlbXAuZGF0YSkge1xuICAgICAgICBpZiAoIXRlbXAubGVmdCkge1xuICAgICAgICAgIHRlbXAubGVmdCA9IG5ld05vZGU7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRlbXAgPSB0ZW1wLmxlZnQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIXRlbXAucmlnaHQpIHtcbiAgICAgICAgICB0ZW1wLnJpZ2h0ID0gbmV3Tm9kZTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGVtcCA9IHRlbXAucmlnaHQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZGVsZXRlSXRlbSh2YWx1ZSkge1xuICAgIGNvbnNvbGUubG9nKGBkZWxldGVJdGVtICR7dmFsdWV9IGNhbGxlZC5gKTtcbiAgICBsZXQgdGVtcCA9IHRoaXMucm9vdDtcbiAgICBsZXQgcHJldjtcbiAgICBsZXQgaXNOb2RlQUxlZnRDaGlsZCA9IHVuZGVmaW5lZDtcblxuICAgIC8vc2VhcmNoIGZvciB0YXJnZXQgbm9kZVxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAvL2lmIHRlbXAgcmVhY2hlcyBudWxsLCBUQVJHRVQgTk9ERSBOT1QgRk9VTkQgaW4gdGhlIHRyZWVcbiAgICAgIGlmICghdGVtcCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkl0ZW0gZG9lcyBub3QgZXhpc3QgaW4gdGhlIHRyZWUuXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvL3RlbXAgdHJhdmVyc2VzIHRoZSB0cmVlIHRvIHJlYWNoIHRhcmdldCBub2RlXG4gICAgICBpZiAodGVtcC5kYXRhID4gdmFsdWUpIHtcbiAgICAgICAgLy9tb3ZlIHRlbXAgdG93YXJkcyB0aGUgbGVmdFxuICAgICAgICBwcmV2ID0gdGVtcDtcbiAgICAgICAgdGVtcCA9IHRlbXAubGVmdDtcbiAgICAgICAgaXNOb2RlQUxlZnRDaGlsZCA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKHRlbXAuZGF0YSA8IHZhbHVlKSB7XG4gICAgICAgIC8vbW92ZSB0ZW1wIHRvd2FyZHMgdGhlIHJpZ2h0XG4gICAgICAgIHByZXYgPSB0ZW1wO1xuICAgICAgICB0ZW1wID0gdGVtcC5yaWdodDtcbiAgICAgICAgaXNOb2RlQUxlZnRDaGlsZCA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVEFSR0VUIE5PREUgRk9VTkRcbiAgICAgICAgLy8gaWYgdGFyZ2V0IG5vZGUgaXMgYSBsZWFmIG5vZGVcbiAgICAgICAgaWYgKCF0ZW1wLmxlZnQgJiYgIXRlbXAucmlnaHQpIHtcbiAgICAgICAgICBpZiAocHJldi5sZWZ0ID09IHRlbXApIHtcbiAgICAgICAgICAgIHByZXYubGVmdCA9IG51bGw7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByZXYucmlnaHQgPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy9pZiB0YXJnZXQgbm9kZSBoYXMgT05MWSBhIGxlZnQgY2hpbGRcbiAgICAgICAgICBpZiAoIXRlbXAucmlnaHQpIHtcbiAgICAgICAgICAgIGlmIChpc05vZGVBTGVmdENoaWxkKSB7XG4gICAgICAgICAgICAgIHByZXYubGVmdCA9IHRlbXAubGVmdDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHByZXYucmlnaHQgPSB0ZW1wLmxlZnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0ZW1wLmxlZnQgPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvL2lmIHRhcmdldCBub2RlIGhhcyBPTkxZIGEgcmlnaHQgY2hpbGRcbiAgICAgICAgICBlbHNlIGlmICghdGVtcC5sZWZ0KSB7XG4gICAgICAgICAgICBpZiAoaXNOb2RlQUxlZnRDaGlsZCkge1xuICAgICAgICAgICAgICBwcmV2LmxlZnQgPSB0ZW1wLnJpZ2h0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcHJldi5yaWdodCA9IHRlbXAucmlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0ZW1wLnJpZ2h0ID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy9pZiB0YXJnZXQgbm9kZSBoYXMgQk9USCBhIGxlZnQgQU5EIGEgcmlnaHQgY2hpbGRcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCB0YXJnZXROb2RlID0gdGVtcDtcbiAgICAgICAgICAgIHByZXYgPSB0ZW1wO1xuICAgICAgICAgICAgdGVtcCA9IHRlbXAucmlnaHQ7XG4gICAgICAgICAgICB3aGlsZSAodGVtcC5sZWZ0KSB7XG4gICAgICAgICAgICAgIHByZXYgPSB0ZW1wO1xuICAgICAgICAgICAgICB0ZW1wID0gdGVtcC5sZWZ0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJldi5sZWZ0ID0gdGVtcC5yaWdodDtcbiAgICAgICAgICAgIHRlbXAucmlnaHQgPSBudWxsO1xuICAgICAgICAgICAgdGFyZ2V0Tm9kZS5kYXRhID0gdGVtcC5kYXRhO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZmluZCh2YWx1ZSkge1xuICAgIGNvbnNvbGUubG9nKGBmaW5kICR7dmFsdWV9IGNhbGxlZC5gKTtcbiAgICBsZXQgdGVtcCA9IHRoaXMucm9vdDtcblxuICAgIHdoaWxlICh0ZW1wKSB7XG4gICAgICBpZiAodGVtcC5kYXRhID4gdmFsdWUpIHtcbiAgICAgICAgdGVtcCA9IHRlbXAubGVmdDtcbiAgICAgIH0gZWxzZSBpZiAodGVtcC5kYXRhIDwgdmFsdWUpIHtcbiAgICAgICAgdGVtcCA9IHRlbXAucmlnaHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGVtcDtcbiAgICAgIH1cbiAgICB9XG4gICAgLy9pZiB0ZW1wIHJlYWNoZXMgbnVsbCwgVEFSR0VUIE5PREUgTk9UIEZPVU5EIGluIHRoZSB0cmVlXG4gICAgY29uc29sZS5sb2coXCJJdGVtIGRvZXMgbm90IGV4aXN0IGluIHRoZSB0cmVlLlwiKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXZlbE9yZGVyVmlhSXRlcmF0aW9uKGNhbGxiYWNrKSB7XG4gICAgaWYoIWNhbGxiYWNrKXtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbGxiYWNrIHJlcXVpcmVkLlwiKTtcbiAgICB9XG4gICAgbGV0IGFycmF5ID0gW107XG4gICAgYXJyYXkucHVzaCh0aGlzLnJvb3QpO1xuICAgIGxldCBpbmRleCA9IDA7XG4gICAgbGV0IGFycmF5U2l6ZSA9IDE7XG4gICAgd2hpbGUgKGluZGV4IDwgYXJyYXlTaXplKSB7XG4gICAgICBpZiAoYXJyYXlbaW5kZXhdLmxlZnQpIHtcbiAgICAgICAgYXJyYXkucHVzaChhcnJheVtpbmRleF0ubGVmdCk7XG4gICAgICAgIGFycmF5U2l6ZSsrO1xuICAgICAgfVxuICAgICAgaWYgKGFycmF5W2luZGV4XS5yaWdodCkge1xuICAgICAgICBhcnJheS5wdXNoKGFycmF5W2luZGV4XS5yaWdodCk7XG4gICAgICAgIGFycmF5U2l6ZSsrO1xuICAgICAgfVxuICAgICAgYXJyYXlbaW5kZXhdID0gY2FsbGJhY2soYXJyYXlbaW5kZXhdKTtcbiAgICAgIGluZGV4Kys7XG4gICAgfVxuICAgIHJldHVybiBhcnJheTtcbiAgfVxuXG4gIGxldmVsT3JkZXJWaWFSZWN1cnNpb24oY2FsbGJhY2ssIG5vZGUgPSBudWxsLCBhcnJheSA9IFtdLCBxdWV1ZSA9IFtdKSB7XG4gICAgaWYoIWNhbGxiYWNrKXtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbGxiYWNrIHJlcXVpcmVkLlwiKTtcbiAgICB9XG4gICAgaWYgKCFub2RlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vcHVzaCByb290IG5vZGUncyBkYXRhIHRvIGFycmF5XG4gICAgaWYgKGFycmF5Lmxlbmd0aCA9PSAwKSB7XG4gICAgICBhcnJheS5wdXNoKGNhbGxiYWNrKG5vZGUpKTtcbiAgICB9XG4gICAgaWYgKG5vZGUubGVmdCkge1xuICAgICAgYXJyYXkucHVzaChjYWxsYmFjayhub2RlLmxlZnQpKTtcbiAgICAgIHF1ZXVlLnB1c2gobm9kZS5sZWZ0KTtcbiAgICB9XG4gICAgaWYgKG5vZGUucmlnaHQpIHtcbiAgICAgIGFycmF5LnB1c2goY2FsbGJhY2sobm9kZS5yaWdodCkpO1xuICAgICAgcXVldWUucHVzaChub2RlLnJpZ2h0KTtcbiAgICB9XG4gICAgdGhpcy5sZXZlbE9yZGVyVmlhUmVjdXJzaW9uKGNhbGxiYWNrLCBxdWV1ZS5zaGlmdCgpLCBhcnJheSwgcXVldWUpO1xuICAgIHJldHVybiBhcnJheTtcbiAgfVxuXG4gIGluT3JkZXIoY2FsbGJhY2ssIG5vZGUgPSBudWxsLCBhcnJheSA9IFtdKSB7XG4gICAgaWYgKCFub2RlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuaW5PcmRlcihjYWxsYmFjaywgbm9kZS5sZWZ0LCBhcnJheSk7XG4gICAgYXJyYXkucHVzaChjYWxsYmFjayhub2RlKSk7XG4gICAgdGhpcy5pbk9yZGVyKGNhbGxiYWNrLCBub2RlLnJpZ2h0LCBhcnJheSk7XG5cbiAgICByZXR1cm4gYXJyYXk7XG4gIH1cblxuICBwcmVPcmRlcihjYWxsYmFjaywgbm9kZSA9IG51bGwsIGFycmF5ID0gW10pIHtcbiAgICBpZiAoIW5vZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYXJyYXkucHVzaChjYWxsYmFjayhub2RlKSk7XG4gICAgdGhpcy5wcmVPcmRlcihjYWxsYmFjaywgbm9kZS5sZWZ0LCBhcnJheSk7XG4gICAgdGhpcy5wcmVPcmRlcihjYWxsYmFjaywgbm9kZS5yaWdodCwgYXJyYXkpO1xuXG4gICAgcmV0dXJuIGFycmF5O1xuICB9XG5cbiAgcG9zdE9yZGVyKGNhbGxiYWNrLCBub2RlID0gbnVsbCwgYXJyYXkgPSBbXSkge1xuICAgIGlmICghbm9kZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnBvc3RPcmRlcihjYWxsYmFjaywgbm9kZS5sZWZ0LCBhcnJheSk7XG4gICAgdGhpcy5wb3N0T3JkZXIoY2FsbGJhY2ssIG5vZGUucmlnaHQsIGFycmF5KTtcbiAgICBhcnJheS5wdXNoKGNhbGxiYWNrKG5vZGUpKTtcblxuICAgIHJldHVybiBhcnJheTtcbiAgfVxuXG4gIGhlaWdodChub2RlLCBjb3VudCA9IDApIHtcbiAgICBpZiAoIW5vZGUgfHwgKCFub2RlLmxlZnQgJiYgIW5vZGUucmlnaHQpKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBjb3VudCsrO1xuXG4gICAgbGV0IGxlZnRDaGlsZEhlaWdodCA9IHRoaXMuaGVpZ2h0KG5vZGUubGVmdCk7XG4gICAgbGV0IHJpZ2h0Q2hpbGRIZWlnaHQgPSB0aGlzLmhlaWdodChub2RlLnJpZ2h0KTtcblxuICAgIGlmIChsZWZ0Q2hpbGRIZWlnaHQgPiByaWdodENoaWxkSGVpZ2h0KSB7XG4gICAgICBjb3VudCArPSBsZWZ0Q2hpbGRIZWlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvdW50ICs9IHJpZ2h0Q2hpbGRIZWlnaHQ7XG4gICAgfVxuICAgIHJldHVybiBjb3VudDtcbiAgfVxuXG4gIGRlcHRoKHZhbHVlKSB7XG4gICAgbGV0IHRlbXAgPSB0aGlzLnJvb3Q7XG4gICAgbGV0IGNvdW50ID0gMDtcblxuICAgIHdoaWxlICh0ZW1wKSB7XG4gICAgICBpZiAodGVtcC5kYXRhID4gdmFsdWUpIHtcbiAgICAgICAgdGVtcCA9IHRlbXAubGVmdDtcbiAgICAgICAgY291bnQrKztcbiAgICAgIH0gZWxzZSBpZiAodGVtcC5kYXRhIDwgdmFsdWUpIHtcbiAgICAgICAgdGVtcCA9IHRlbXAucmlnaHQ7XG4gICAgICAgIGNvdW50Kys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY291bnQ7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbiAgfVxuXG4gIGlzQmFsYW5jZWQobm9kZSA9IHRoaXMucm9vdCl7XG4gICAgaWYoIW5vZGUpe1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGxldCBsZWZ0U3ViVHJlZUhlaWdodCA9IHRoaXMuaGVpZ2h0KG5vZGUubGVmdCk7XG4gICAgbGV0IHJpZ2h0U3ViVHJlZUhlaWdodCA9IHRoaXMuaGVpZ2h0KG5vZGUucmlnaHQpO1xuICAgIGxldCBzdWJUcmVlSGVpZ2h0RGlmZiA9IChsZWZ0U3ViVHJlZUhlaWdodD5yaWdodFN1YlRyZWVIZWlnaHQpXG4gICAgID8gKGxlZnRTdWJUcmVlSGVpZ2h0LXJpZ2h0U3ViVHJlZUhlaWdodCkgOlxuICAgICAocmlnaHRTdWJUcmVlSGVpZ2h0LWxlZnRTdWJUcmVlSGVpZ2h0KTtcbiAgICBpZihzdWJUcmVlSGVpZ2h0RGlmZj4xKXtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaXNCYWxhbmNlZChub2RlLmxlZnQpICYmIHRoaXMuaXNCYWxhbmNlZChub2RlLnJpZ2h0KTtcbiAgfVxuXG4gIHJlYmFsYW5jZSgpe1xuICAgIGxldCBub2RlcyA9IHRoaXMubGV2ZWxPcmRlclZpYVJlY3Vyc2lvbigobm9kZSk9PntcbiAgICAgIHJldHVybiBub2RlLmRhdGE7XG4gICAgfSwgdGhpcy5yb290KTtcbiAgICBub2RlcyA9IHRoaXMubGluZWFyU29ydFdpdGhvdXREdXBsaWNhdGVzKG5vZGVzKTtcbiAgICBsZXQgYmFsYW5jZWRUcmVlID0gbmV3IFRyZWUobm9kZXMpO1xuICAgIHJldHVybiBiYWxhbmNlZFRyZWU7XG4gIH1cbn1cblxuZXhwb3J0IHsgVHJlZSB9O1xuIiwiY2xhc3MgTm9kZXtcbiAgICBjb25zdHJ1Y3RvcihkYXRhLCBsZWZ0LCByaWdodCl7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMubGVmdCA9IGxlZnQ7XG4gICAgICAgIHRoaXMucmlnaHQgPSByaWdodDtcbiAgICB9XG59XG5cbmV4cG9ydCB7IE5vZGUgfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgVHJlZSB9IGZyb20gXCIuL3RyZWVcIjtcblxuZnVuY3Rpb24gZ2VuZXJhdGVBcnJheSgpIHtcbiAgbGV0IGFycmF5ID0gW107XG4gIGxldCBzaXplID0gTWF0aC5yYW5kb20oKSAqIDEwMDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICBhcnJheS5wdXNoKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkpO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuZnVuY3Rpb24gZmV0Y2hEYXRhRnJvbU5vZGUobm9kZSkge1xuICByZXR1cm4gbm9kZS5kYXRhO1xufVxuXG5mdW5jdGlvbiBkb3VibGVVcChub2RlKSB7XG4gIHJldHVybiBub2RlLmRhdGEgKiAyO1xufVxuXG5mdW5jdGlvbiB0cmVlT3BlcmF0aW9ucygpIHtcbiAgbGV0IGFycmF5ID0gZ2VuZXJhdGVBcnJheSgpO1xuXG4gIGxldCB0cmVlID0gbmV3IFRyZWUoYXJyYXkpO1xuICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIik7XG4gIHRyZWUucHJldHR5UHJpbnQoKTtcbiAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xuXG4gIHRyZWUuaW5zZXJ0KDUwKTtcbiAgdHJlZS5wcmV0dHlQcmludCgpO1xuICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIik7XG5cbiAgdHJlZS5pbnNlcnQoMjUpO1xuICB0cmVlLnByZXR0eVByaW50KCk7XG4gIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcblxuICB0cmVlLmluc2VydCgyMSk7XG4gIHRyZWUucHJldHR5UHJpbnQoKTtcbiAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xuXG4gIHRyZWUuaW5zZXJ0KDI2KTtcbiAgdHJlZS5wcmV0dHlQcmludCgpO1xuICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIik7XG5cbiAgdHJlZS5pbnNlcnQoOTkpO1xuICB0cmVlLnByZXR0eVByaW50KCk7XG4gIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcblxuICB0cmVlLmluc2VydCgxMDApO1xuICB0cmVlLnByZXR0eVByaW50KCk7XG4gIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcblxuICB0cmVlLmluc2VydCgxMDEpO1xuICB0cmVlLnByZXR0eVByaW50KCk7XG4gIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcblxuICAvL2NoZWNrIGZvciBsZWZ0LWxlYWYtbm9kZSBkZWxldGlvblxuICB0cmVlLmRlbGV0ZUl0ZW0oMTcpO1xuICB0cmVlLnByZXR0eVByaW50KCk7XG4gIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcblxuICAvL2NoZWNrIGZvciByaWdodC1sZWFmLW5vZGUgZGVsZXRpb25cbiAgdHJlZS5kZWxldGVJdGVtKDI2KTtcbiAgdHJlZS5wcmV0dHlQcmludCgpO1xuICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIik7XG5cbiAgLy9jaGVjayBmb3IgbGVhZi1ub2RlLXdpdGgtbGVmdC1jaGlsZCBkZWxldGlvblxuICB0cmVlLmRlbGV0ZUl0ZW0oMTMpO1xuICB0cmVlLnByZXR0eVByaW50KCk7XG4gIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcblxuICAvL2NoZWNrIGZvciBsZWFmLW5vZGUtd2l0aC1yaWdodC1jaGlsZCBkZWxldGlvblxuICB0cmVlLmRlbGV0ZUl0ZW0oMjApO1xuICB0cmVlLnByZXR0eVByaW50KCk7XG4gIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcblxuICAvL2NoZWNrIGZvciBsZWFmLW5vZGUtd2l0aC1ib3RoLWNoaWxkcmVuIGRlbGV0aW9uXG4gIHRyZWUuZGVsZXRlSXRlbSgxMSk7XG4gIHRyZWUucHJldHR5UHJpbnQoKTtcbiAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xuXG4gIC8vIGNvbnNvbGUubG9nKHRyZWUuZmluZCgxOSkpO1xuXG4gIGxldCBCRlN2aWFJdGVyYXRpb24gPSB0cmVlLmxldmVsT3JkZXJWaWFJdGVyYXRpb24oZmV0Y2hEYXRhRnJvbU5vZGUpO1xuICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tQkZTdmlhSXRlcmF0aW9uLS0tLS0tLS0tLS0tLS0tLVwiKTtcbiAgY29uc29sZS5sb2coQkZTdmlhSXRlcmF0aW9uKTtcblxuICBsZXQgQkZTdmlhUmVjdXJzaW9uID0gdHJlZS5sZXZlbE9yZGVyVmlhUmVjdXJzaW9uKGRvdWJsZVVwLCB0cmVlLnJvb3QpO1xuICBjb25zb2xlLmxvZyhcbiAgICBcIi0tLS0tLS0tLS0tLS0tQkZTdmlhUmVjdXJzaW9uIChQcmludHMgZG91YmxlZCB1cCB2YWx1ZXMpLS0tLS0tLS0tLS0tLS0tLVwiXG4gICk7XG4gIGNvbnNvbGUubG9nKEJGU3ZpYVJlY3Vyc2lvbik7XG5cbiAgbGV0IGluT3JkZXJUcmF2ZXJzYWwgPSB0cmVlLmluT3JkZXIoZmV0Y2hEYXRhRnJvbU5vZGUsIHRyZWUucm9vdCk7XG4gIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS1JTi1PUkRFUiBUcmF2ZXJzYWwtLS0tLS0tLS0tLS0tLS0tXCIpO1xuICBjb25zb2xlLmxvZyhpbk9yZGVyVHJhdmVyc2FsKTtcblxuICBsZXQgcHJlT3JkZXJUcmF2ZXJzYWwgPSB0cmVlLnByZU9yZGVyKGZldGNoRGF0YUZyb21Ob2RlLCB0cmVlLnJvb3QpO1xuICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tUFJFLU9SREVSIFRyYXZlcnNhbC0tLS0tLS0tLS0tLS0tLS1cIik7XG4gIGNvbnNvbGUubG9nKHByZU9yZGVyVHJhdmVyc2FsKTtcblxuICBsZXQgcG9zdE9yZGVyVHJhdmVyc2FsID0gdHJlZS5wb3N0T3JkZXIoZmV0Y2hEYXRhRnJvbU5vZGUsIHRyZWUucm9vdCk7XG4gIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS1QT1NULU9SREVSIFRyYXZlcnNhbC0tLS0tLS0tLS0tLS0tLS1cIik7XG4gIGNvbnNvbGUubG9nKHBvc3RPcmRlclRyYXZlcnNhbCk7XG5cbiAgY29uc29sZS5sb2coYFRSRUUgSEVJR0hUID0gJHt0cmVlLmhlaWdodCh0cmVlLnJvb3QpfWApO1xuXG4gIGNvbnNvbGUubG9nKGBEZXB0aCBvZiA1IGlzICR7dHJlZS5kZXB0aCg1KX1gKTtcbiAgY29uc29sZS5sb2coYERlcHRoIG9mIDE4IGlzICR7dHJlZS5kZXB0aCgxOCl9YCk7XG4gIGNvbnNvbGUubG9nKGBEZXB0aCBvZiA1NTUgaXMgJHt0cmVlLmRlcHRoKDU1NSl9YCk7XG5cbiAgY29uc29sZS5sb2coYElzIFRyZWUgYmFsYW5jZWQ/IDogJHt0cmVlLmlzQmFsYW5jZWQoKX1gKTtcbiAgbGV0IGJhbGFuY2VkVHJlZSA9IHRyZWUucmViYWxhbmNlKCk7XG4gIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS1CQUxBTkNFRCBUUkVFLS0tLS0tLS0tLS0tLS0tLVwiKTtcbiAgYmFsYW5jZWRUcmVlLnByZXR0eVByaW50KCk7XG4gIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcbn1cblxudHJlZU9wZXJhdGlvbnMoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==