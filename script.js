class Node {
  constructor(date = null, left = null, right = null) {
    this.date = date;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  sort(array) {
    let sortArray = [...new Set(array)].sort((a, b) => a - b);
    return sortArray;
  }

  buildTree(array) {
    return root;
  }
}

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
