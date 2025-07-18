import { brain_of_comp } from "./skills.js"

var boardState = ['',' ',' ',' ',' ',' ',' ',' ',' ',' ']
var pattern = Math.floor(Math.random()*10) % 3;
var turn = 0;

function checkWin() {
    if((boardState[1] == 'X' && boardState[2] == 'X' && boardState[3] == 'X')||(boardState[4] == 'X' && boardState[5] == 'X' && boardState[6] == 'X')
	||(boardState[7] == 'X' && boardState[8] == 'X' && boardState[9] == 'X')||(boardState[1] == 'X' && boardState[4] == 'X' && boardState[7] == 'X')
	||(boardState[2] == 'X' && boardState[5] == 'X' && boardState[8] == 'X')||(boardState[3] == 'X' && boardState[6] == 'X' && boardState[9] == 'X')
	||(boardState[1] == 'X' && boardState[5] == 'X' && boardState[9] == 'X')||(boardState[3] == 'X' && boardState[5] == 'X' && boardState[7] == 'X')){
        return true;
    }
    else if((boardState[1] == 'O' && boardState[2] == 'O' && boardState[3] == 'O')||(boardState[4] == 'O' && boardState[5] == 'O' && boardState[6] == 'O')
	||(boardState[7] == 'O' && boardState[8] == 'O' && boardState[9] == 'O')||(boardState[1] == 'O' && boardState[4] == 'O' && boardState[7] == 'O')
	||(boardState[2] == 'O' && boardState[5] == 'O' && boardState[8] == 'O')||(boardState[3] == 'O' && boardState[6] == 'O' && boardState[9] == 'O')
	||(boardState[1] == 'O' && boardState[5] == 'O' && boardState[9] == 'O')||(boardState[3] == 'O' && boardState[5] == 'O' && boardState[7]=='O')){
	    return true;

    }
    else{
        return false;
    }
}

function displayboard(C_box, turn, position) {
    if (turn % 2 === 0) {
        C_box.innerHTML = '<img src="/public/tick.svg" alt="O" width="60" color="white">';
        C_box.style.backgroundColor = '#42af54';
        boardState[position] = 'O';
    } else {
        C_box.innerHTML = '<img src="/public/cross.svg" alt="X" width="70" color="white">';
        C_box.style.backgroundColor = '#ff5858';
        boardState[position] = 'X';
    }
}

function gameover(turn) {
    if (turn >= 9) {
        const msg = document.querySelector('.gameover');
        setTimeout(() => {msg.style.visibility = 'visible';}, 300)
        console.log(boardState)
        return true; // Indicate that the game is over
    }
    else {
        return false; // Game is not over yet
    }
}

let board = document.querySelector('.main');
let ref = 0;

board.addEventListener('click', function(details) {
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
    displayboard(box, turn, position); // Display the board in the clicked box, also storing position
    
    if(checkWin()) {
        const msg = document.querySelector('.gameover');
        document.getElementById("result").innerText="You won!"
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
            let compboard = brain_of_comp(boardState, turn, ref, pattern);
            const C_box = document.getElementById('box' + compboard);
            if (C_box.innerHTML === C_box.textContent) {
                displayboard(C_box, turn, compboard);                
                
                if(checkWin()) {
                    const msg = document.querySelector('.gameover');
                    document.getElementById("result").innerText="Computer won!"
                    setTimeout(() => {
                        msg.style.visibility = 'visible';
                    }, 300)
                    return;
                }
                else if (gameover(turn)) {
                    return; // Stop further processing if the game is over
                }
                repeat = false; // Stop the loop after a valid board
                break; // Exit the loop once a valid board is made
            }
        }
    }, 300);
});

const rematch = document.getElementById("rematch")
rematch.addEventListener('click', function(){
    boardState = ['',' ',' ',' ',' ',' ',' ',' ',' ',' ']
    turn = 0;
    document.querySelector('.gameover').style.visibility = 'hidden';
    let boxes = document.querySelectorAll('.box')
    let i = 1;
    for (let box of boxes) {
        if(box.textContent === '') {
            box.innerHTML = '';
            box.textContent = `${i}`;
            box.style.backgroundColor = '#3E5F44' ;
        }
        i++;
    }
});