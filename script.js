const squareBtns = document.querySelectorAll(".square");
const gameStateContainer = document.querySelector(".game-state");
const restartBtn = document.querySelector(".restart-btn");
const squareOne = document.querySelector(".game-table .square:nth-child(1)");
const squareTwo = document.querySelector(".game-table .square:nth-child(2)");
const squareThree = document.querySelector(".game-table .square:nth-child(3)");
const squareFour = document.querySelector(".game-table .square:nth-child(4)");
const squareFive = document.querySelector(".game-table .square:nth-child(5)");
const squareSix = document.querySelector(".game-table .square:nth-child(6)");
const squareSeven = document.querySelector(".game-table .square:nth-child(7)");
const squareEight = document.querySelector(".game-table .square:nth-child(8)");
const squareNine = document.querySelector(".game-table .square:nth-child(9)");

let currentTurn = 1;

function turnChange() {
    if (currentTurn % 2 != 0) {
        gameStateContainer.innerHTML = "X turn";
    } else {
        gameStateContainer.innerHTML = "O turn";
    }
}
turnChange();

// checks if a player has won by checking if squares in specific patterns have the same inner html
// couldnt figure out a way to check the specific square patterns to win in tic tac toe dynamically, so i hard coded said patterns to be checked 
function winCheck() {
    function sameHtml(item1, item2, item3) {
        if (item1.innerHTML == item2.innerHTML && item2.innerHTML == item3.innerHTML) {
            return true;
        }
    }
    if (sameHtml(squareOne, squareTwo, squareThree) || sameHtml(squareOne, squareFour, squareSeven) || sameHtml(squareOne, squareFive, squareNine)) {
        return squareOne.innerHTML;
    } else if (sameHtml(squareTwo, squareFive, squareEight)) {
        return squareTwo.innerHTML;
    } else if (sameHtml(squareThree, squareSix, squareNine) || sameHtml(squareThree, squareFive, squareSeven)) {
        return squareThree.innerHTML;
    } else if (sameHtml(squareFour, squareFive, squareSix)) {
        return squareFour.innerHTML;
    } else if (sameHtml(squareSeven, squareEight, squareNine)) {
        return squareSeven.innerHTML;
    }
}

function gameFinish() {
    if (winCheck()) {
        gameStateContainer.innerHTML = winCheck() + " wins";
    }
}


// adds click funtionality to squares
function markSquare(e) {
    // if the clicked square is empty there isn't a winner yet, an O or X is added to the said square
    if (!winCheck()) {
        if (e.target.innerHTML == "") {
            if (currentTurn % 2 != 0) {
                e.target.innerHTML += "X";
                currentTurn++;
            } else {
                e.target.innerHTML += "O";
                currentTurn++;
            }
        }

        // this boolean variable exists to account for draws
        const allSquaresMarked = Array.from(squareBtns).every(item => {
            return item.innerHTML != "";
        })

        // continues the game normally if there isn't a draw
        if (!allSquaresMarked) {
            turnChange();
        } else {
            gameStateContainer.innerHTML = "Draw"
        }
    } 
}

// the gameFinish function is ran everytime a square is clicked in order to check for a winner
squareBtns.forEach(item => {
    item.addEventListener("click", markSquare);
    item.addEventListener("click", gameFinish);
})

function restart() {
    currentTurn = 1;
    turnChange();
    squareBtns.forEach(item => {
        item.innerHTML = "";
    })
}

restartBtn.addEventListener("click", restart);