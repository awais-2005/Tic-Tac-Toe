import { brain_of_comp } from "./skills.js"

let boardState = ['',' ',' ',' ',' ',' ',' ',' ',' ',' ']
let pattern = Math.floor(Math.random()*10) % 3;
let turn = 0;
let godMode = false 
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

const threeDot = document.querySelector(".threeDot");
threeDot.addEventListener('click', function() {
    toss.style.transform = "scale(0) translate(110%)";
    setTimeout(() => {toss.style.display = "none";
        document.querySelector('.autoToss').style.display = 'flex';
        setTimeout(() => {requestAnimationFrame(() => {
            document.querySelector('.autoToss').style.transform = 'scale(1) translate(0%)';
        });}, 100);
    }, 300);
});
let toggled = false;
const _state = document.getElementById('state');
const tossToggle = document.querySelector('.outer');
tossToggle.addEventListener('click', function() {
    console.log("Toss toggle clicked"); // For debugging purposes
    let innerCircle = document.querySelector('.inner');
    innerCircle.style.position = 'absolute';
    if (!toggled) {
        toggled = true;
        innerCircle.style.left = 'calc(100% - 1.75rem - 2.5px)';
        innerCircle.style.backgroundColor = '#ffee00ff';
        innerCircle.style.boxShadow = '0px 0px 10px 2px #ffee00ff';
        _state.innerText = 'On';
        _state.style.position = 'absolute';
        _state.style.left = '65%';
        console.log("Toggled to ON"); // For debugging purposes
        return;
    }
    else {
        toggled = false;
        innerCircle.style.left = '2.5px';
        innerCircle.style.backgroundColor = '#E8FFD7';
        innerCircle.style.boxShadow = '5px 5px 10px 0px rgba(0, 0, 0, 0.404) inset';
        _state.innerText = 'Off';
        _state.style.position = 'absolute';
        _state.style.left = '85%';
        console.log("Toggled to OFF"); // For debugging purposes
        return;
    }
});

const backArrow = document.querySelector('.back');
backArrow.addEventListener('click', function() {
    console.log("Back arrow clicked"); // For debugging purposes
    const autoToss = document.querySelector('.autoToss');
    autoToss.style.transform = "scale(0) translate(-110%)";
    setTimeout(() => {autoToss.style.display = "none"}, 300);
    if(toggled) {
        tossfunc('', toggled); // Call tossfunc with toggled state
        showResult.style.display = "flex";
        showResult.style.padding = "0 10px 0 25px";
        showResult.style.fontSize = "1rem";
        setTimeout(() => {
            requestAnimationFrame(() => {
                showResult.style.transform = "scale(1) translate(0%)";
            });
        }, 300);
    }
    else {
        toss.style.display = "flex";
        setTimeout(() => {
            requestAnimationFrame(() => {
                toss.style.transform = "scale(1) translate(0%)";
            });
        }, 300);
    }
});

let toss = document.getElementById("toss");
let faces = document.querySelectorAll('.faces');
toss.addEventListener('click', function(details) {
    if (details.target.className === 'threeDot' || details.target.className === 'ri-more-2-fill') {
        return; // Ignore clicks on the three-dot icon
    }
    console.log(details.target.className, "\n", details.target); // For debugging purposes
    toss.style.transform = "scale(0) translate(-110%)";
    setTimeout(() => {
        toss.style.display = "none";
        faces.forEach((val) => {
            val.style.transform = "scale(0) translate(110%)";
            val.style.display = "block";
            requestAnimationFrame(() => {
                val.style.transform = "scale(1) translate(0%)";
            });
        });
    }, 300);
});

function tossfunc(choice = '', toggled = false) {
    if (toggled && choice === '') {
        choice = Math.floor(Math.random()*10) % 2 === 0 ? 'Heads' : 'Tails';
    }
    else {
        console.log("Something went wrong with the toss function");
        console.log("Choice:", choice, "\nToggled:", toggled); // For debugging purposes
    }
    let res = Math.floor(Math.random()*10) % 2 === 0 ? 'Heads' : 'Tails';
    if (choice === res) {
        tossResult = 'You won the toss!';
        tossWinner = 1; // Player wins the toss
    } else {
        tossResult = 'You lost the toss!';
        tossWinner = 0; // Computer wins the toss
        startComputerTurn(); // Start computer's turn immediately
    }

    faces.forEach((val) => {
        val.style.transform = "scale(0) translate(-110%)";
        setTimeout(() => {
            val.style.display = "none";
        }, 300);
    });
    showResult.style.padding = "0 10px 0 25px";
    showResult.style.fontSize = "1.2rem";
    showResult.innerText = tossResult;
    showResult.style.display = "flex";
    setTimeout(() => {
        requestAnimationFrame(() => {
            showResult.style.transform = "scale(1) translate(0%)";
        });
    }, 300);
    setTimeout(() => {
        showResult.innerText = "Go!";
        showResult.style.fontSize = "1.7rem";
    }, 2000);
}

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
    tossfunc(choice);
});

let board = document.querySelector('.main');
let ref = 0;
// Player's turn
    board.addEventListener('click', function(details) {
        
        if (showResult.innerText === 'Memes') {
            toss.style.transform = 'scale(1.2)';
            setTimeout(() => {toss.style.transform = 'scale(1)'}, 300);
            toss.style.fontSize = "1rem";
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
                return;
            }
            turn ++;
            tossWinner++;
            let repeat = true;
                
            while (repeat && turn < 10) {            
                let compMove = brain_of_comp(boardState, turn, ref, pattern, godMode);
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

const expert = document.getElementById("hard");
expert.addEventListener('click', function() {
    if (expert.innerText === 'Off'){
        godMode = true;
        expert.innerText = 'On';
        expert.style.backgroundColor = '#ffee00ff';
        expert.style.boxShadow = '0px 0px 10px 2px #ffee00ff';
    }
    else{
        godMode = false;
        expert.innerText = 'Off';
        expert.style.boxShadow = '0px 0px 0px 0px #ffee00ff';
        expert.style.backgroundColor = '#E8FFD7';
    }

});
const rematch = document.getElementById("rematch")
rematch.addEventListener('click', function(){
    document.querySelector('.gameover').style.transform = "translate(-50%, -50%) scale(0)";   
    boardState = ['',' ',' ',' ',' ',' ',' ',' ',' ',' ']
    turn = 0; // number of current turn
    tossWinner = 0; // Reset toss winner
    if(!toggled){
        showResult.innerText = 'Memes';
        showResult.style.transform = "scale(0) translate(110%)";
        setTimeout(() => {showResult.style.display = "none"}, 300);
        toss.style.display = "flex";
        requestAnimationFrame(() => {
            toss.style.transform = "scale(1) translate(0%)";
        });
    }
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
    if(toggled) {
        tossfunc('', toggled); // Reset toss function with toggled state
    }
});