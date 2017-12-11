export class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfEmptySpaces = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard() {
    return this._playerBoard
  }

  hasNonBombEmptySpaces() {
    return this._numberOfBombs !== this._numberOfEmptySpaces;
  }

  getNumberOfSurroundingBombs(flipRow, flipColumn) {
    const offsets =[[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];

    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfSurroundingBombs = 0;
    offsets.forEach(offset => {
      const neighborRowIndex = flipRow + offset[0];
      const neighborColumnIndex = flipColumn + offset[1];

      if (neighborRowIndex >= 0 &&  neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
        if (this._bombBoard [neighborRowIndex][neighborColumnIndex] === 'B') {
          numberOfSurroundingBombs++;
      }
    }
  });

    return numberOfSurroundingBombs;
  }
  flipTile(flipRow, flipColumn) {
    if (this._playerBoard[flipRow][flipColumn] !== ' ') {
    return;
  }

    this._numberOfEmptySpaces--;
    if (this._bombBoard[flipRow][flipColumn] === 'B') {
      this._playerBoard[flipRow][flipColumn] = 'B';
    } else {
      this._playerBoard[flipRow][flipColumn] = this._getNumberOfSurroundingBombs(flipRow, flipColumn);
    }
  }

  print() {
    console.log(this._playerBoard.map (row => row.join(' | ')).join('\n'));
  }

  static generatePlayerBoard(numberOfRows, numberOfColumns){
    const board = [];
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
    const row = [];
    for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
      row.push('');
    }
    board.push(row);
    }
    return board;
  }

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    const board = [];
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
    const row = [];
    for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
      row.push(null);
    }
    board.push(row);
  }

    let numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced < numberOfBombs) {
      const randomRowIndex = Math.floor(Math.random() * numberOfRows);
      const randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

      if (board[randomRowIndex][randomColumnIndex] !== 'B') {
      board[randomRowIndex][randomColumnIndex] = 'B';
      numberOfBombsPlaced++;
      }
    }
  return board;
  }
};
