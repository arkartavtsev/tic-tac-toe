import { useState } from 'react';


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [ a, b, c ] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}


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


function Board({
  xIsNext,
  squares,
  onPlay
}) {
  const winner = calculateWinner(squares);
  const nextPlayer = xIsNext ? "X" : "O";
  const status = winner ? `Winner: ${ winner }` : `Next player: ${ nextPlayer }`;


  function handleClick(index) {
    if (squares[index] || winner) {
      return;
    }

    const nextSquares = squares.slice();

    nextSquares[index] = nextPlayer;

    onPlay(nextSquares);
  }


  return <>
    <div className="status">{ status }</div>

    <div className="board-row">
      <Square value={ squares[0] } onClick={ () => handleClick(0) } />
      <Square value={ squares[1] } onClick={ () => handleClick(1) } />
      <Square value={ squares[2] } onClick={ () => handleClick(2) } />
    </div>

    <div className="board-row">
      <Square value={ squares[3] } onClick={ () => handleClick(3) } />
      <Square value={ squares[4] } onClick={ () => handleClick(4) } />
      <Square value={ squares[5] } onClick={ () => handleClick(5) } />
    </div>

    <div className="board-row">
      <Square value={ squares[6] } onClick={ () => handleClick(6) } />
      <Square value={ squares[7] } onClick={ () => handleClick(7) } />
      <Square value={ squares[8] } onClick={ () => handleClick(8) } />
    </div>
  </>
}


export default function Game() {
  const [ history, setHistory ] = useState([Array(9).fill(null)]);
  const [ currentMove, setCurrentMove ] = useState(0);

  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;


  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }


  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={ xIsNext }
          squares={ currentSquares }
          onPlay={ handlePlay }
        />
      </div>

      <div className="game-info">
        <ol>
          {
            history.map((squares, move) => (
              <li key={ move } >
                <button onClick={ () => jumpTo(move) }>
                  { move > 0 ? `Go to move #${ move }` : `Go to game start` }
                </button>
              </li>
            ))
          }
        </ol>
      </div>
    </div>
  );
}
