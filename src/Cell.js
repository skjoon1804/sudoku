import React, { useState } from 'react';
import './index.css';

const Cell = ({index, row, value, start, changeNumber}) => {
    const [val, setVal] = useState(value);

    const updateNumber = e => {
        let number = e.target.value;
        setVal(number);
        changeNumber(row, index, number);
    }

    return (
        <input id={`cell ${row}-${index}`} className="cell"
            style={index%3===0 ? {borderLeft: '1px solid black'} : null}
            value={val || ''}
            readOnly={start[row][index]!==0}
            onChange={updateNumber} maxLength={1} 
        />            
    )
}

export default Cell;