import { brain_of_comp } from "./skills.js"

var board = ['',' ',' ',' ',' ',' ',' ',' ',' ',' ']
var pattern = Math.floor(Math.random()*10) % 3;

function checkWin() {
    if((board[1] == 'X' && board[2] == 'X' && board[3] == 'X')||(board[4] == 'X' && board[5] == 'X' && board[6] == 'X')
	||(board[7] == 'X' && board[8] == 'X' && board[9] == 'X')||(board[1] == 'X' && board[4] == 'X' && board[7] == 'X')
	||(board[2] == 'X' && board[5] == 'X' && board[8] == 'X')||(board[3] == 'X' && board[6] == 'X' && board[9] == 'X')
	||(board[1] == 'X' && board[5] == 'X' && board[9] == 'X')||(board[3] == 'X' && board[5] == 'X' && board[7] == 'X')){
        return true;
    }
    else if((board[1] == 'O' && board[2] == 'O' && board[3] == 'O')||(board[4] == 'O' && board[5] == 'O' && board[6] == 'O')
	||(board[7] == 'O' && board[8] == 'O' && board[9] == 'O')||(board[1] == 'O' && board[4] == 'O' && board[7] == 'O')
	||(board[2] == 'O' && board[5] == 'O' && board[8] == 'O')||(board[3] == 'O' && board[6] == 'O' && board[9] == 'O')
	||(board[1] == 'O' && board[5] == 'O' && board[9] == 'O')||(board[3] == 'O' && board[5] == 'O' && board[7]=='O')){
	    return true;

    }
    else{
        return false;
    }
}

function displayMove(C_box, turn, position) {
    if (turn % 2 === 0) {
        C_box.innerHTML = '<img src="/public/tick.svg" alt="O" width="60" color="white">';
        C_box.style.backgroundColor = '#42af54';
        board[position] = 'O';
    } else {
        C_box.innerHTML = '<img src="/public/cross.svg" alt="X" width="70" color="white">';
        C_box.style.backgroundColor = '#ff5858';
        board[position] = 'X';
    }
}

function gameover(turn) {
    if (turn >= 9) {
        const msg = document.querySelector('.gameover');
        setTimeout(() => {msg.style.visibility = 'visible';}, 300)
        console.log(board)
        return true; // Indicate that the game is over
    }
    else {
        return false; // Game is not over yet
    }
}

let move = document.querySelector('.main');
let turn = 0;
let box = ``;
let ref = 0;

move.addEventListener('click', function(details) {
    let box = details.target;
    if (box.className != 'box' || box.textContent == '') {
        return; // Ensure we only handle clicks on the boxes those aren't clicked yet
    }
    turn++;

    // Reading the clicked box by position
    let position = Number(box.textContent);
    if(position == 5 && turn == 1){
        ref == 1;
    }
    if(position == 5 && turn == 2){
        ref = 5;
    }
    box.textContent = ''; // Clear any existing text
    displayMove(box, turn, position); // Display the move in the clicked box, also storing position
    
    if(checkWin()) {
        const msg = document.querySelector('.gameover');
        msg.textContent += " Congrats You Won!"
        setTimeout(() => {
            msg.style.visibility = 'visible';
        }, 300)
        return;
    }
    if (gameover(turn)) {
        return; // Stop further processing if the game is over
    }
    turn ++;
    setTimeout(function () {
        let repeat = true;
        
        while (repeat && turn < 10) {
            let compMove = brain_of_comp(board, turn, ref, pattern);
            const C_box = document.getElementById('box' + compMove);
            if (C_box.innerHTML === C_box.textContent) {
                displayMove(C_box, turn, compMove);                
                
                if(checkWin()) {
                    const msg = document.querySelector('.gameover');
                    msg.textContent += "\nComputer Won!"
                    setTimeout(() => {
                        msg.style.visibility = 'visible';
                    }, 300)
                    return;
                }
                else if (gameover(turn)) {
                    return; // Stop further processing if the game is over
                }
                repeat = false; // Stop the loop after a valid move
                break; // Exit the loop once a valid move is made
            }
        }
    }, 300);
});

