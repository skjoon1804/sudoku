import React from 'react';
import Cell from './Cell';

const Board = ({start, board, changeBoard}) => {

    return (
        <div id="board">
            {board.map((row, x) => (
                <div key={x} style={x!==0 && x%3===0 ? {borderTop: '1px black solid'} : null}>
                    {row.map((value, y) => (
                        <Cell key={y} index={y} row={x} value={value} start={start} changeNumber={changeBoard}/>
                    ))}
                </div>
            ))}
        </div>
    )
}
export default Board;