# binary_search_trees

This project implements a Binary Search Tree

![project](https://github.com/Kotovar/binary_search_trees/assets/77914431/4790e18e-ac49-49e5-bbe9-0dd7f73971eb)


## How to use

Open the file, open the console and run: node script.js

## How it works

This project implements the following methods:

`insert` - accepts a value to insert node

`delete` - accepts a value to delete node

`find` - accepts a value and returns the node with the given value

`height` - takes a node and returns its height. Height is defined as the number of edges on the longest path from a given node to a leaf node

`depth` - takes a node and returns its depth. Depth is defined as the number of edges on the path from a given node to the root node of the tree

`isBalanced` - check if the tree is balanced. A balanced tree is a tree in which the difference between the heights of the left and right subtrees of each node does not exceed 1

`rebalance` - ebalance an unbalanced tree

`levelOrder` - traversing the tree in width - visiting the root, then, from left to right, all the branches of the first level, then all the branches of the second level, etc

Traversing a tree in depth:

`inOrder` (symmetric) - traverse the left subtree, visit the root, traverse the right subtree

`preOrder` (direct)- visit the root, traverse the left subtree, traverse the right subtree 

`postOrder` (reversed) - traverse the left subtree, traverse the right subtree, visit the root

## Credits
This project was inspired by [The Odin Project](https://www.theodinproject.com/lessons/javascript-binary-search-trees), which is an open source curriculum for learning web development.
