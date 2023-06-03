class Node {
  constructor(value = null, children = []) {
    this.value = value;
    this.children = children;
  }
}
class Board {
  constructor(position) {
    this.board = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ];
    this.knight = position;
    (() => {
      let [column, row] = position;
      if (column <= 7 && row <= 7 && column >= 0 && row >= 0) {
        this.board[-row + 7][column] = 'K';
      }
    })();
    this.history = [this.knight];
  }

  // move piece from current knight position to a specified possible move
  movePiece(position) {
    let [column, row] = position;
    if (column <= 7 && row <= 7 && column >= 0 && row >= 0) {
      this.board[-row + 7][column] = 'K';
      this.board[-this.knight[1] + 7][this.knight[0]] = 1;
      this.history.push(position);
      this.knight = position;
    }
  }

  // tells me if the position has been visited
  positionStatus(position) {
    let [column, row] = position;
    if (column <= 7 && row <= 7 && column >= 0 && row >= 0) {
      return this.board[-row + 7][column];
    }
    return null;
  }
}

function compareArrays(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

// return closest position from possible moves to end position
function shortestDistance(possiblesArr, endPosition) {
  let shortest = [Infinity, []];
  for (let i = 0; i < possiblesArr.length; i++) {
    let [x1, y1] = endPosition;
    let [x2, y2] = possiblesArr[i];
    let distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    if (compareArrays(possiblesArr[i], endPosition)) return endPosition;
    if (distance < shortest[0]) shortest = [distance, possiblesArr[i]];
  }
  return shortest[1];
}

function buildTree(rootPosition, currentBoard, endPosition) {
  let root = new Node(rootPosition);
  let possibles = possibleMoves(rootPosition, currentBoard);
  for (let i = 0; i < possibles.length; i++) {
    let newNode = new Node(possibles[i]);
    if (compareArrays(endPosition, possibles[i]))
      console.log(rootPosition, endPosition);

    let possibles2nd = possibleMoves(possibles[i], currentBoard);
    for (let j = 0; j < possibles2nd.length; j++) {
      let newNode2nd = new Node(possibles2nd[j]);

      if (compareArrays(endPosition, possibles2nd[j]))
        console.log(rootPosition, possibles[i], endPosition);

      let possibles3rd = possibleMoves(possibles2nd[j], currentBoard);
      for (let k = 0; k < possibles3rd.length; k++) {
        let newNode3rd = new Node(possibles3rd[k]);

        if (compareArrays(endPosition, possibles3rd[k]))
          console.log(rootPosition, possibles[i], possibles2nd[j], endPosition);

        newNode2nd.children.push(newNode3rd);
      }

      newNode.children.push(newNode2nd);
    }

    root.children.push(newNode);
  }
  return root;
}

function buildTree2(rootPosition, currentBoard, endPosition) {
  let root = new Node(rootPosition);
  let possibles = possibleMoves(rootPosition, currentBoard);

  // for (let i = 0; i < possibles.length; i++) {
  //   let newNode = new Node(possibles[i]);
  //   if (compareArrays(endPosition, possibles[i])) {
  //     console.log(rootPosition, endPosition);
  //   }
  //   root.children.push(newNode);
  // }

  let i = 0;
  while (possibles[i] != undefined) {
    let newNode = new Node(possibles[i]);

    if (compareArrays(endPosition, possibles[i]))
      console.log(rootPosition, endPosition, 'cm');

    root.children.push(newNode);
    i++;
  }

  return root;
}

function knightMoves(startPosition, endPosition) {
  let mainBoard = new Board(startPosition);

  // buildTree example(solve) inefficient tho
  // console.log(buildTree(startPosition, mainBoard, endPosition), 'bT');

  // buildTree2 example
  console.log(buildTree2(startPosition, mainBoard, endPosition), 'bT2');

  while (
    !compareArrays(endPosition, mainBoard.history[mainBoard.history.length - 1])
  ) {
    let possibles = possibleMoves(mainBoard.knight, mainBoard);
    let closest = shortestDistance(possibles, endPosition);
    mainBoard.movePiece(closest);
  }
  return mainBoard.history;
}
console.log(knightMoves([0, 0], [2, 1]), 'kM');

function possibleMoves(arrXY, currentBoard) {
  let [x, y] = arrXY;

  let move1 = x + 1 <= 7 && y + 2 <= 7 ? [x + 1, y + 2] : null;
  let move2 = x + 2 <= 7 && y + 1 <= 7 ? [x + 2, y + 1] : null;
  let move3 = x + 2 <= 7 && y - 1 >= 0 ? [x + 2, y - 1] : null;
  let move4 = x + 1 <= 7 && y - 2 >= 0 ? [x + 1, y - 2] : null;
  let move5 = x - 1 >= 0 && y - 2 >= 0 ? [x - 1, y - 2] : null;
  let move6 = x - 2 >= 0 && y - 1 >= 0 ? [x - 2, y - 1] : null;
  let move7 = x - 2 >= 0 && y + 1 <= 7 ? [x - 2, y + 1] : null;
  let move8 = x - 1 >= 0 && y + 2 <= 7 ? [x - 1, y + 2] : null;

  let moves = [move1, move2, move3, move4, move5, move6, move7, move8];
  let arr = [];
  for (let i = 0; i < moves.length; i++) {
    if (moves[i]) {
      if (currentBoard.positionStatus(moves[i]) === null) arr.push(moves[i]);
    }
  }
  return arr;
}

/**
 * goal: input 2 positions [x1, y1], [x2, y2]
 * output shortest path to get there [[x1, y1]...[x2, y2]]
 *
 * ideas:
 *  if the spot has been visited, add it to a queue??
 *  also don't search backwards
 *  try a bunch of random things
 *  create edges
 *    example: [[[0,0],[1,2]],[[0,0],[2,1]], [[1,2],[0,4]], [[1,2],[0,4]], etc]
 *  every node could be part of the same tree(64 total)
 *    like a binary search tree
 *      the root node is one with its children, they're just arranged
 *      all values can be flattend to one array
 *    some how have every board place in order
 *  check every level
 *    loop though all depth of 1 to see if there's a connection
 *    if there is, good
 *    if there isn't, check though depth of 2
 *    etc. keep checking at deeper levels
 *  possibly create a rewind() function
 *    moves knight one position back
 *    makes board spot null, removes history, etc.
 *  used queue for breath first search
 *  base case could be when lastChecked === endPosition
 *
 *  examples:
 *  knightMoves([0,0],[1,2]) == [[0,0],[1,2]]
 *  knightMoves([0,0],[3,3]) == [[0,0],[1,2],[3,3]]
 *  knightMoves([3,3],[0,0]) == [[3,3],[1,2],[0,0]]
 *  knightMoves([3,3],[4,3]) == [[3,3],[4,5],[2,4],[4,3]]
 *
 * Assignment:
 * 1. script that creates game board and knight
 * 2. have all possible moves as a children in tree
 *      total possible moves = 63??
 *      moves could be nodes??
 * 3. decide on a search algorithm(bfs or dfs??)
 * 4. find shortest path from starting to ending square
 */
