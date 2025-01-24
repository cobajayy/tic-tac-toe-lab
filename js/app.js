//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.

/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]
]

/*---------------------------- Variables (state) ----------------------------*/

let board = ["", "", "", "", "", "", "", "", ""];
let turn = "X"
let winner = false;
let tie = false;

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll(".sqr")

const messageEl = document.querySelector("#message")

const boardEl = document.querySelector(".board")

const resetBtnEl = document.querySelector('#reset');

/*-------------------------------- Functions --------------------------------*/
const updateBoard = () => {
  
    board.forEach((sqrValue, idx) => {
        const square = squareEls[idx];
        square.textContent = sqrValue 
    });    
};   
   
const updateMessage = () => {
    if(winner === false && tie === false){
        messageEl.textContent = `Its Player ${turn}'s turn`
    } else if(winner === false && tie === true) {
        messageEl.textContent =  "It's a tie!"
    } else{
        messageEl.textContent = `Player ${turn} wins!`
    }
}

const render = () => {
    updateBoard()
    updateMessage()
}


const placePiece = (index) => {
    board[index] = turn;
}

const checkForWinner = () => {
    for (let i = 0; i < winningCombos.length; i++) 
        if(board[winningCombos[i][0]] && board[winningCombos[i][0]] === board[winningCombos[i][1]] && board[winningCombos[i][0]] === board[winningCombos[i][2]]) {
            winner = true
        } 
}

const checkForTie = () => {
    if(winner === true) {
        return;
    }  else if(!board.includes("")) {
        tie = true;
    }
}

const switchPlayerTurn = () => {
    if(winner === true) {
        return;
    }  if(turn === "X") {
        turn = "O"
    } else{
        turn = "X"
    } 
}

const handleClick = (event) => {
    const squareIdx = event.target.id

    if(board[squareIdx] === "X" || board[squareIdx] === "O" || winner) {
        return;
    } 
    placePiece(squareIdx)
    checkForWinner()
    checkForTie()
    switchPlayerTurn()
    render()
}

const init = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    turn = "X"
    winner = false;
    tie = false;
    render()
}

/*----------------------------- Event Listeners -----------------------------*/
window.onload = init;

resetBtnEl.addEventListener("click", init)
boardEl.addEventListener("click", handleClick)
