import React, { useState } from 'react';
import Board from './Board';
import {template} from './Key';
import { COMPLETE, ERROR, ACTIVE } from './Status';

const App = () => {
  const initBoard = [
    [0, 0, 0, 2, 6, 0, 7, 0, 1],
    [6, 8, 0, 0, 7, 0, 0, 9, 0],
    [1, 9, 0, 0, 0, 4, 5, 0, 0],
    [8, 2, 0, 1, 0, 0, 0, 4, 0],
    [0, 0, 4, 6, 0, 2, 9, 0, 0],
    [0, 5, 0, 0, 0, 3, 0, 2, 8],
    [0, 0, 9, 3, 0, 0, 0, 7, 4],
    [0, 4, 0, 0, 5, 0, 0, 3, 6],
    [7, 0, 3, 0, 1, 8, 0, 0, 0]
  ];
  const TOTAL_COUNT = 405;

  const [board, setBoard] = useState(initBoard);
  const [status, setStatus] = useState(ACTIVE);

  const changeBoard = (row, column, number) => {
    board[row][column] = parseInt(number);
    setBoard(board);
  }

  const checkAnswers = () => {
    let duplicateRows = duplicateInRows();
    let duplicateCols = duplicateInCols();
    let duplicateSubGrids = duplicateInSubGrids();
    let boardComplete = checkCompleteBoard();
    if (duplicateRows || duplicateCols || duplicateSubGrids) {
      setStatus(ERROR);
    } else if (!duplicateRows && !duplicateCols && !duplicateSubGrids && boardComplete) {
      setStatus(COMPLETE);
    } else {
      setStatus(ACTIVE);
    }
  }

  const duplicateInRows = () => {
    let check = false;
    board.forEach(row => {
      row.forEach(num => {
        if (num !== 0) {
          let count = 0;
          for (let i=0; i<row.length; i++) {
            if (num === row[i]) count++;
          }
          if (count >= 2) check = true;
        }
      })
    })
    return check;
  }

  const duplicateInCols = () => {
    let check = false;
    for (let j=0; j<board[0].length; j++) {
      for (let i=0; i<board.length; i++) {
        let num = board[i][j];
        if (num !== 0) {
          let count = 0;
          for (let i=0; i<board[0].length; i++) {
            if (num === board[i][j]) count++;
          }
          if (count >= 2) check = true;
        }
      }
    }
    return check;
  }

  const duplicateInSubGrids = () => {
    let check = false;
    let centers = [[1,1], [1,4], [1,7], [4,1], [4,4], [4,7], [7,1], [7,4], [7,7]];
    let dirs = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,0],[0,1],[1,-1],[1,0],[1,1]];

    centers.forEach(center => {
      dirs.forEach(dir => {
        let num = board[center[0]+dir[0]][center[1]+dir[1]]
        if (num !== 0) {
          let count = 0;
          for (let i=0; i<dirs.length; i++) {
            let x = center[0] + dirs[i][0];
            let y = center[1] + dirs[i][1];
            if (num === board[x][y]) count++;
          }
          if (count >= 2) check = true;
        }
      })
    })
    return check;
  }

  const checkCompleteBoard = () => {
    let total = 0;
    board.forEach(row => {
      row.forEach(val => {
        total += val;
      })
    })
    return total === TOTAL_COUNT;
  }

  return (
    <div className="App">
        <div id="header">
          <h1 id="title">SUDOKU GAME</h1>
          <div>
            <button id="answer" onClick={checkAnswers}>Check Answers</button>
          </div>
        </div>
        <Board start={template} board={board} changeBoard={changeBoard}/>
        <div id="status">
          {
            status === ACTIVE
            ? null
            :
              status === COMPLETE
              ? <div className="status complete">Completed!</div>
              : <div className="status error">Check Answers</div>
          }
        </div>
    </div>
  );
}
export default App;
