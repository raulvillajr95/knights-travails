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
    this.knight;
    (() => {
      let [column, row] = position;
      if (column <= 7 && row <= 7 && column >= 0 && row >= 0) {
        this.board[-row + 7][column] = 'K';
        this.knight = [column, row];
      }
    })();
    this.history = [this.knight];
  }

  movePiece(position) {
    let [column, row] = position;
    if (column <= 7 && row <= 7 && column >= 0 && row >= 0) {
      this.board[-row + 7][column] = 'K';
      this.board[-this.knight[1] + 7][this.knight[0]] = 1;
      this.history.push(position);
      this.knight = position;
    }
  }

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

function shortestDistance(knightPosition, possiblesArr, endPosition) {
  // console.log(knightPosition, 'knightPosition');
  // console.log(possiblesArr, 'possiblesArr');

  let shortest = [Infinity, []];
  for (let i = 0; i < possiblesArr.length; i++) {
    // let [x1, y1] = knightPosition;
    let [x1, y1] = endPosition;
    let [x2, y2] = possiblesArr[i];
    let distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    console.log(distance);

    if (compareArrays(possiblesArr[i], endPosition)) {
      return endPosition;
    }

    if (distance < shortest[0]) {
      shortest = [distance, possiblesArr[i]];
    }
  }

  return shortest[1];
}

function knightMoves(startPosition, endPosition) {
  let mainBoard = new Board(startPosition);

  // let possibles = possibleMoves(mainBoard.knight, mainBoard);
  // console.log(shortestDistance(startPosition, possibles));

  /**
   * create shortestDistance function
   *  input knight position and array of possible moves
   *  output [x,y] position that's the closest
   *  use shortest distance formula
   *  i could build a arr of positions from shortest longest
   *    start at front
   *    test with .positionStatus()
   *      if it === null
   *        move
   *  restrictions:
   *    it can't be visited (!= 1)
   *
   * this may not give me the shortest path
   */

  while (
    !compareArrays(endPosition, mainBoard.history[mainBoard.history.length - 1])
  ) {
    // console.log(mainBoard.history, 'history1');
    let possibles = possibleMoves(mainBoard.knight, mainBoard);
    let closest = shortestDistance(mainBoard.knight, possibles, endPosition);
    mainBoard.movePiece(closest);
    console.log(closest, 'closest');
    // console.log(mainBoard.history, 'history');
    /**
     * the history aint adding up right
     */

    // if (
    //   compareArrays(
    //     mainBoard.knight,
    //     mainBoard.history[mainBoard.history.length - 1]
    //   )
    // ) {
    // console.log('say what');
    // console.log(mainBoard.history, 'history2');
    //   break;
    // }
  }

  return mainBoard.history;
}
console.log(knightMoves([3, 3], [4, 3]));

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
    // if status is null, add to arr
    if (moves[i]) {
      if (currentBoard.positionStatus(moves[i]) === null) arr.push(moves[i]);
    }
  }
  return arr;
}
// console.log(possibleMoves([6, 0], new Board([3, 3])));

// let possibles = possibleMoves([3, 3]);
// for (let i = 0; i < possibles.length; i++) {
//   // console.log(possibles[i]);
//   let possibles2 = possibleMoves(possibles[i]);
//   for (let j = 0; j < possibles2.length; j++) {
//     // console.log(possibles[i], possibles2[j]);
//     let possibles3 = possibleMoves(possibles2[j]);
//     for (let k = 0; k < possibles3.length; k++) {
//       // console.log(possibles[i], possibles2[j], possibles3[k]);
//     }
//   }
// }

/**
 * goal: input 2 positions [x1, y1], [x2, y2]
 * output shortest path to get there [[x1, y1]...[x2, y2]]
 *
 * ideas:
 * build a board
 *  maybe not build a board, just have limits to its position
 * build one piece and track it's position
 *  the positions would be x: 0-7 and y: 0-7
 * note down pieces that have been visited
 * note down pieces that haven't been visited
 * i'm limited by the board limits(8 x 8)
 * i'm also limited by where others have been
 *  if the spot has been visited, add it to a queue??
 *  also don't search backwards
 * to all possible moves,
 *  calculate distance
 *  shortest distance
 *    if not visited move
 *    else pick 2nd shortest distance
 *      check it hasn't been visited
 *      else pick 3rd shortest distance etc
 *  it has to not be visited
 *  it has to be the shortest distance(distance formu )
 *
 * Process: [1,2,3,4]
 * 1. script that creates game board and knight
 * 2. have all possible moves as a children in tree
 *      total possible moves = 63??
 *      moves could be nodes??
 * 3. decide on a search algorithm(bfs or dfs??)
 * 4. find shortest path from starting to ending square
 */
