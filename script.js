import { brain_of_comp } from "./skills.js"

let boardState = ['',' ',' ',' ',' ',' ',' ',' ',' ',' ']
let pattern = Math.floor(Math.random()*10) % 3;
let turn = 0;
let wins = 0, losts = 0, draws = 0; 
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
        document.querySelector('.gameover').style.transform = "translate(-50%, -50%) scale(1)";
        console.log(boardState);
        document.getElementById('ndrawn').innerText = ++draws ;
        return true; // Indicate that the game is over
    }
    else {
        return false; // Game is not over yet
    }
}

let toss = document.getElementById("toss");
let faces = document.querySelectorAll('.faces');
toss.addEventListener('click', function() {
    setTimeout(() => {
        toss.style.transform = "scale(0)"
        toss.style.display = "none";
    }, 50);
    setTimeout(() => {faces.forEach((val) => {
        setTimeout(() => {val.style.display = "block";}, 50);
        val.style.transform = "scale(1)";
    });}, 50);
});

let tossResult = '';
let tossBlock = document.querySelector('#status');
let showResult = document.getElementById('update');
let tossWinner = 0; // 0 for computer, 1 for player
tossBlock.addEventListener('click', function(details) {
    let choice = details.target;
    if (choice.className !== 'faces') {
        return; // Ensure we only handle clicks on the faces
    }
    choice = choice.innerText; // Get the text of the clicked face
    let res = Math.floor(Math.random()*10) % 2 == 0 ? 'Heads' : 'Tails';
    
    if (choice === res) {
        tossResult = 'You won the toss!';
        tossWinner = 1; // Player wins the toss
    }
    else {
        tossResult = 'You lost the toss!';
        tossWinner = 0; // Computer wins the toss
        startComputerTurn(); // Start computer's turn immediately
    }
    setTimeout(() => {faces.forEach((val) => {
        setTimeout(() => {val.style.transform = "scale(0)";}, 50);
        val.style.display = "none";
    });}, 300);
    showResult.innerText = tossResult;
    showResult.style.display = "flex";
    showResult.style.padding = "0 10px 0 25px";
    showResult.style.fontSize = "1.2rem";
    requestAnimationFrame(() => {
        showResult.style.transform = "scale(1)";
    });
    setTimeout(() => {
        showResult.innerText = "Go!";
        showResult.style.fontSize = "1.5rem";
    }, 2000);
});

let board = document.querySelector('.main');
let ref = 0;
// Player's turn
    board.addEventListener('click', function(details) {
        
        if (showResult.innerText === 'Memes') {
            toss.innerText = "Please toss first!";
            toss.style.fontSize = "1.2rem";
            toss.style.padding = "0 10px 0 25px";
            return;
        }
        else if (tossWinner % 2 === 0) {
            return; // If it's the computer's turn, ignore player clicks
        }

        let box = details.target;
        if (box.className != 'box' || box.textContent == '') {
            return; // Ensure we only handle clicks on the boxes those aren't clicked yet
        }
        turn++;
        tossWinner++;

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
            document.getElementById("result").innerText="You won!"
            document.getElementById('nwon').innerText = ++wins ;
            document.querySelector('.gameover').style.transform = "translate(-50%, -50%) scale(1)";
            return;
        }
        if (gameover(turn)) {
            return; // Stop further processing if the game is over
        }
        startComputerTurn();
    });
// Computer's turn
function startComputerTurn() {
    if(tossWinner % 2 === 0) {
        setTimeout(function () {
            if(showResult.innerText === 'Memes') {
                console.log(showResult.innerText);
                return;
            }
            console.log(showResult.innerText);
            turn ++;
            tossWinner++;
            let repeat = true;
                
            while (repeat && turn < 10) {            
                let compMove = brain_of_comp(boardState, turn, ref, pattern);
                const C_box = document.getElementById('box' + compMove);
                if (C_box.innerHTML === C_box.textContent) {
                    displayboard(C_box, turn, compMove);                
                        
                    if(checkWin()) {
                        document.getElementById("result").innerText="Computer won!"
                        document.getElementById('nlost').innerText = ++losts ;
                        document.querySelector('.gameover').style.transform = "translate(-50%, -50%) scale(1)";
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
    }
}
const rematch = document.getElementById("rematch")
rematch.addEventListener('click', function(){
    document.querySelector('.gameover').style.transform = "translate(-50%, -50%) scale(0)";   
    boardState = ['',' ',' ',' ',' ',' ',' ',' ',' ',' ']
    turn = 0; // number of current turn
    tossWinner = 0; // Reset toss winner
    showResult.innerText = 'Memes';
    showResult.style.transform = "scale(0)";
    showResult.style.display = "none";
    toss.innerText = "Click to Toss!";
    toss.style.display = "flex";
    requestAnimationFrame(() => {
        toss.style.transform = "scale(1)";
    });
    setTimeout(() => {
        document.getElementById('result').innerText = "Match is Drawn!";
    }, 300);
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