"use strict";

var p1 = document.getElementById("p1");
var p2 = document.getElementById("p2");
var choice = document.getElementById("choice");
var cross = document.getElementById("x");
var zero = document.getElementById("o");
var reset = document.getElementById("reset");
var isGameStarted = false;
var result = document.getElementById("result");
var cell1 = document.getElementById("r1c1");
var cell2 = document.getElementById("r1c2");
var cell3 = document.getElementById("r1c3");
var cell4 = document.getElementById("r2c1");
var cell5 = document.getElementById("r2c2");
var cell6 = document.getElementById("r2c3");
var cell7 = document.getElementById("r3c1");
var cell8 = document.getElementById("r3c2");
var cell9 = document.getElementById("r3c3");

var cells = [[cell1, cell2, cell3], [cell4, cell5, cell6], [cell7, cell8, cell9]];
var board = [[0,0,0], [0,0,0],[0,0,0]];
var turn = 1;

p1.classList.add("selected");

cross.addEventListener('click', function() {
    p1.setAttribute('data-before', 'X');
    document.documentElement.style.setProperty('--p1-color', "rgb(245, 46, 46)");
    p2.setAttribute('data-before', 'O');
    document.documentElement.style.setProperty('--p2-color', "rgb(0, 200, 0)");
    startGame();
})

zero.addEventListener('click', function() {
    p1.setAttribute('data-before', 'O');
    document.documentElement.style.setProperty('--p1-color', "rgb(0, 200, 0)");
    p2.setAttribute('data-before', 'X');
    document.documentElement.style.setProperty('--p2-color', "rgb(245, 46, 46)");
    startGame();
})

reset.addEventListener('click', function() {
    location.reload();
})

function startGame() {
    choice.style.visibility = "hidden";
    isGameStarted = true;

    for (var row in cells) {
        for (var cell in cells[row]) {
            cells[row][cell].addEventListener("click", function() {
                makeTurn(this);
            });
        }
    }
}

function makeTurn(cell) {

    let row = cell.id[1] - 1;
    let col = cell.id[3] - 1;
    if (board[row][col] != 0) return;

    if (turn == 1) {
        cell.innerHTML = p1.getAttribute('data-before');
        board[row][col] = p1.getAttribute('data-before');
        turn = 2;
        p1.classList.remove("selected");
        p2.classList.add("selected");
    } else {
        cell.innerHTML = p2.getAttribute('data-before');
        board[row][col] = p2.getAttribute('data-before');
        turn = 1;
        p2.classList.remove("selected");
        p1.classList.add("selected");
    }

    checkWin();

}

function checkWin() {
    let winner = "";

    // Check rows
    for (var row in board) {
        if (board[row][0] == board[row][1] && board[row][1] == board[row][2] && board[row][0] != 0) {
            winner = board[row][0];
        }
    }
    // Check columns
    for (var col in board) {
        if (board[0][col] == board[1][col] && board[1][col] == board[2][col] && board[0][col] != 0) {
            winner = board[0][col];
        }
    }
    // Check diagonals
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != 0) {
        winner = board[0][0];
    }
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != 0) {
        winner = board[0][2];
    }

    // Check if there is a winner
    if (!winner) {
        let isDraw = true;
        for (var row in board) {
            for (var col in board[row]) {
                if (board[row][col] == 0) {
                    isDraw = false;
                }
            }
        }
        if (!isDraw) {
            return false;
        } else {
            winner = -1;
        }
    }
    if (winner == -1) {
        result.innerHTML = "It's a draw! <br> 🤨 😐 😂";

    } else if (winner == p1.getAttribute('data-before')) {
        p1.style.color = "green";
        result.innerHTML = "🥇 <br> Player 1 won! 🎉";
    } else {
        p2.style.color = "green";
        result.innerHTML = "🥇 <br> Player 2 won! 🎉";

    }
    result.style.visibility = "visible";
    window.setTimeout(() => {
        result.style.visibility = "hidden";
        reset.click();
        }, 
    5000);
}
