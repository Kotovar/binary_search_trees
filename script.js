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
    return this.#findNode(this.root, value);
  }

  levelOrder(arr = [], queue = [], root = this.root) {
    if (!this.#isNode(root)) {
      return null;
    }
    arr.push(root.data);
    queue.push(root.left);
    queue.push(root.right);
    while (queue.length) {
      const level = queue[0];
      queue.shift();
      this.levelOrder(arr, queue, level);
    }
    return arr;
  }

  inOrder(root = this.root, arr = []) {
    if (root) {
      this.inOrder(root.left, arr);
      arr.push(root.data);
      this.inOrder(root.right, arr);
    }
    return arr;
  }

  preOrder(root = this.root, arr = []) {
    if (!this.#isNode(root)) {
      return null;
    }
    arr.push(root.data);
    this.preOrder(root.left, arr);
    this.preOrder(root.right, arr);
    return arr;
  }

  postOrder(root = this.root, arr = []) {
    if (!this.#isNode(root)) {
      return null;
    }
    this.postOrder(root.left, arr);
    this.postOrder(root.right, arr);
    arr.push(root.data);
    return arr;
  }

  height(node = this.root) {
    if (!node) {
      return -1;
    }
    return Math.max(this.height(node.left), this.height(node.right)) + 1;
  }

  depth(value = this.root.data, node = this.root) {
    if (!node) {
      return -1;
    }
    if (node.data === value) return 0;
    if (value < node.data) {
      return this.depth(value, node.left) + 1;
    }
    if (value > node.data) {
      return this.depth(value, node.right) + 1;
    }
  }

  isBalanced() {
    if (!this.root) {
      return true;
    }
    let leftHeight = this.height(this.root.left);
    let rightHeight = this.height(this.root.right);
    return Math.abs(leftHeight - rightHeight) <= 1;
  }

  rebalance() {
    let newArray = this.inOrder();
    this.root = this.buildTree(this.sort(newArray));
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
      if (node.left === null && node.right === null) {
        node = null;
      } else if (node.left === null) {
        node = node.right;
      } else if (node.right === null) {
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

function randomArray(num = 5, width = 100) {
  const array = [];
  for (let i = 0; i < num; i++) {
    array.push(Math.floor(Math.random() * width) + 1);
  }
  return array;
}

const randomArr = randomArray(10, 50);

let testTree = new Tree(randomArr);

console.log(`is the tree balanced? - ${testTree.isBalanced()}`);
testTree.prettyPrint();
testTree.insert(68);
testTree.insert(69);
testTree.insert(70);
console.log(`is the tree balanced? - ${testTree.isBalanced()}`);
testTree.prettyPrint();
console.log("use rebalance");
testTree.rebalance();
console.log(`is the tree balanced? - ${testTree.isBalanced()}`);
testTree.prettyPrint();

console.log(`${testTree.levelOrder()} : levelOrder`);
console.log(`${testTree.inOrder()} : inOrder`);
console.log(`${testTree.preOrder()} : preOrder`);
console.log(`${testTree.postOrder()} : postOrder`);
console.log(`${testTree.height()} : height`);
// console.log(`${testTree.height(testTree.find(67))} : height to node '67'`);
// console.log(`${testTree.depth(3)} : depth to node '3'`);
// console.log(testTree.find(68));
// testTree.delete(3);
