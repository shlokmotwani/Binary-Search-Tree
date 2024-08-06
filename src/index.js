import { Tree } from "./tree";

let array1 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let array2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

let tree1 = new Tree(array1);
let tree2 = new Tree(array2);



tree1.prettyPrint();
// tree2.prettyPrint();

tree1.insert(-500);

tree1.prettyPrint();