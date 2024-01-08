import { useState } from 'react';


function Square({
  value,
  onClick
}) {
  return <>
    <button
      className="square"
      onClick={ onClick }
    >
      { value }
    </button>
  </>
}


export default function Board() {
  const [ xIsNext, setXIsNext ] = useState(true);
  const [ squares, setSquares ] = useState(Array(9).fill(null));

  function handleClick(index) {
    if (squares[index]) {
      return;
    }

    const nextSquares = squares.slice();

    nextSquares[index] = xIsNext ? "X" : "O";

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }


  return <>
    <div className="board-row">
      <Square value={ squares[0] } onClick={ () => handleClick(0) } />
      <Square value={ squares[1] } onClick={ () => handleClick(1) } />
      <Square value={ squares[2] } onClick={ () => handleClick(2) } />
    </div>
    <div className="board-row">
      <Square value={ squares[3] } onClick={ () => handleClick(3) } />
      <Square value={ squares[4] } onClick={ () => handleClick(4) } />
      <Square value= {squares[5] } onClick={ () => handleClick(5) } />
    </div>
    <div className="board-row">
      <Square value={ squares[6] } onClick={ () => handleClick(6) } />
      <Square value={ squares[7] } onClick={ () => handleClick(7) } />
      <Square value={ squares[8] } onClick={ () => handleClick(8) } />
    </div>
  </>
}
