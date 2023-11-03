class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(this.sort(array));
  }

  sort(array) {
    return [...new Set(array)].sort((a, b) => a - b);
  }

  buildTree(array) {
    let start = 0;
    let end = array.length - 1;
    if (start > end) {
      return null;
    }
    let mid = parseInt((start + end) / 2);
    let node = new Node(array[mid]);
    let leftPart = array.splice(start, mid);
    let rightPart = array.splice(1);
    node.left = this.buildTree(leftPart);
    node.right = this.buildTree(rightPart);
    return node;
  }

  prettyPrint() {
    const prettyPrint = (node, prefix = "", isLeft = true) => {
      if (node === null) {
        return;
      }
      if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
      }
      console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
      if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
      }
    };
    prettyPrint(this.root);
  }

  insert(value) {
    if (!value || isNaN(value)) throw new Error("Please enter a valid value");
    if (!this.root) {
      this.root = new Node(value);
      return;
    }
    this.#insertCheck(value, this.root);
  }

  delete(value) {
    if (!this.#isNode(this.root)) {
      return null;
    }
    if (value === null || isNaN(value))
      throw new Error("Please enter a valid value");
    this.root = this.#deleteNode(this.root, value);
  }

  find(value) {
    if (!this.#isNode(this.root)) {
      return null;
    }
    if (value === null || isNaN(value))
      throw new Error("Please enter a valid value");
    console.log(this.#findNode(this.root, value));
    return this.#findNode(this.root, value);
  }

  #findNode(node, value) {
    if (!this.#isNode(node)) {
      return null;
    }
    if (value < node.data) {
      return this.#findNode(node.left, value);
    } else if (value > node.data) {
      return this.#findNode(node.right, value);
    }
    return node;
  }

  #isNode(node) {
    return !(node === null);
  }

  #deleteNode(node, value) {
    if (!this.#isNode(node)) {
      return null;
    }
    if (value < node.data) {
      node.left = this.#deleteNode(node.left, value);
    } else if (value > node.data) {
      node.right = this.#deleteNode(node.right, value);
    } else {
      if (node.left == null && node.right == null) {
        node = null;
      } else if (node.left == null) {
        node = node.right;
      } else if (node.right == null) {
        node = node.left;
      } else {
        let minRight = node.right;
        while (minRight.left != null) {
          minRight = minRight.left;
        }
        node.data = minRight.data;
        node.right = this.#deleteNode(node.right, minRight.data);
      }
    }
    return node;
  }

  #insertCheck(value, currentNode) {
    if (value < currentNode.data && currentNode.left !== null) {
      return this.#insertCheck(value, currentNode.left);
    } else if (value >= currentNode.data && currentNode.right !== null) {
      return this.#insertCheck(value, currentNode.right);
    }
    value < currentNode.data
      ? (currentNode.left = new Node(value))
      : (currentNode.right = new Node(value));
  }
}

const arr = [1, 7, 3, 23, 8, 9, 6, 3, 6, 7, 9, 67, 11, 12, 15, 17];
let testTree = new Tree(arr);
console.log(testTree);
// console.log(testTree.find(3));
testTree.prettyPrint();
//  testTree.delete(3);
