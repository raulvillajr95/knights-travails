function knightMoves() {}

function possibleMoves(arrXY) {
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
    if (moves[i]) arr.push(moves[i]);
  }
  return arr;
}
console.log(possibleMoves([6, 0]));

/**
 * goal: input 2 positions [x1, y1], [x2, y2]
 * output shortest path to get there [[x1, y1]...[x2, y2]]
 *
 * ideas:
 * find out how the knight moves
 *  twice(up, down, left, or right)
 *    then once(left or right)
 * build a board
 *  maybe not build a board, just have limits to its position
 * build one piece and track it's position
 *  the positions would be x: 0-7 and y: 0-7
 * depending on piece position, have all it's possible moves
 *  make a function for this
 *    input an array [x, y]
 *    output possibles [[x,y],[x,y],etc.]
 *    keep in mind board
 *    turn in nodes later
 * note down pieces that have been visited
 * note down pieces that haven't been visited
 *
 * Process: [1,2,3,4]
 * 1. script that creates game board and knight
 * 2. have all possible moves as a children in tree
 *      total possible moves = 63??
 *      moves could be nodes??
 * 3. decide on a search algorithm(bfs or dfs??)
 * 4. find shortest path from starting to ending square
 */
