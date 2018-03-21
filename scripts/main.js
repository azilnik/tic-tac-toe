(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

let turn = 0; // Variable to determine if it's Xs or Os turn
let gameState = new Array(9); // State of the game
let xTally = 0; // How many times the X team has won
let oTally = 0; // How many times the O team has won
let xIcon = `<i class="fas fa-times"></i>`; // Icon for Xs
let oIcon = `<i class="fas fa-circle"></i>`; // Icon for Os
let winMesage; // Message for winning state

// Function to set up the game
function setup(){

  // Get the #grid element and find its children
  let grid = document.getElementById("grid");
  let children = grid.children;

  // Add an event listener to the game reset button
  document.getElementById('reset').addEventListener("click",function(){
    resetGame();
  });

  // Add event listeners to each tile, to track moves/clicks
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    child.setAttribute("id", `${i}`);
    child.addEventListener("click",function(){
      tileClick(i);
    });
  };

  //Start the game!
  startGame();
};

// Function to wipe the slate clean, so to speak
function startGame(){

  // Loop through all of the board positions.
  for (let j = 0, max = gameState.length; j < max; j++){
    //Reset the gameState array
    gameState[j] = j;

    //Kill the icons from the UI.
    document.getElementById(j).innerHTML='';
  };
};

//Function for whem a tile is clicked
function tileClick(e){

  // Get the tile from the grid
  let tile = document.getElementById(`${e}`)

  // Check if the tile is blank. If it is, take a turn.
  tile.children.length == 0 ? takeTurn(`${e}`) :  console.log(`NOT blank!`);

};

//Function for when a turn is valid
function takeTurn(f){
  // Get the clicked tile
  let tile = document.getElementById(`${f}`)

  // Check who's turn it is.
  if(turn==0){

    // If it's X's turn, add an X to the tile
    tile.innerHTML = `${xIcon} <!-- I'm an X -->`;
    // Make it O's turn
    gameState[f]=`x`;
    turn = 1;

  } else {
    // If it's O's turn, add an O to the tile
    tile.innerHTML = `${oIcon}<!-- I'm an O -->`;
    gameState[f]=`o`;
    // Make it X's turn
    turn = 0;
  };

  // console.log(gameState);
  // After a turn, check if a winning condition has been met.
  checkWin();
};

// Function to check if there was a tie
function checkTie(){

  let checkNumber = 0; // Check to see if there are any remaining turns

  // If there are any remaining values in the gameState that are not selected, increment the checkNumber
  for (let i = 0, max = gameState.length; i < max; i++){
    if(typeof gameState[i] == 'number'){
      checkNumber++
    };

  };

  // If no tiles are remaining to be selected, looks like it's a tie!
  // Display that.
  if (checkNumber == 0){
      winMesage = `You tied! Nice work, smarty-pants.`;
      showWinner();
      checkNumber = 0;
  };
};

// Function to check for winning condition
// This probably needs to be refactored
function checkWin(){

  // ROWS

  // Top Row
  if(gameState[0] == gameState[1]){
    if(gameState[1] == gameState[2]){
      winAlert();
    };
  };

  // Middle Row
  if(gameState[3] == gameState[4]){
    if(gameState[4] == gameState[5]){
      winAlert();
    };
  };

  // Bottom Row
  if(gameState[6] == gameState[7]){
    if(gameState[7] == gameState[8]){
      winAlert();
    };
  };

  // COLUMNS

  // Left Column
  if(gameState[0] == gameState[3]){
    if(gameState[3] == gameState[6]){
      winAlert();
    };
  };

  // Middle Column
  if(gameState[1] == gameState[4]){
    if(gameState[4] == gameState[7]){
      winAlert();
    };
  };

  // Right Column
  if(gameState[2] == gameState[5]){
    if(gameState[5] == gameState[8]){
      winAlert();
    };
  };

  // DIAGONALS

  // First Diagonal
  if(gameState[0] == gameState[4]){
    if(gameState[4] == gameState[8]){
      winAlert();
    };
  };

  // Second Diagonal
  if(gameState[2] == gameState[4]){
    if(gameState[4] == gameState[6]){
      winAlert();
    };
  };

  // Check if there was a tie
  checkTie();

};

// Function to alert the players that a winner has been determined
function winAlert(){
  
  // Determine who the winner is
  let winner = '';
  turn == 0 ? winner = `${oIcon}` : winner = `${xIcon}`;

  // Set the win message to reflect who won the round
  winMesage = `${winner} wins this round!`;

  // Show the winning message
  showWinner();

  // Tally up the scores
  tally();
};


// Function to display the winning/tie message
function showWinner(){
  document.getElementById('content').innerHTML = winMesage;
  document.getElementById('win-notifer').style.display ='flex';
  document.getElementById('block').style.visibility='visible';
};

// Function to tally the score of all the games.
function tally(){

  // Check who went last to determine the winner
  turn == 0 ? oTally++ : xTally++;

  // Update the scoreboard to reflect number of wins.
  let scoreboard = document.getElementById('winners');
  let currentScore = `${xIcon} has won ${xTally} times. ${oIcon} has won ${oTally} times.`;
  scoreboard.innerHTML = currentScore;
};

// Function to reset the game back to default state
function resetGame(){

  document.getElementById('win-notifer').style.display ='none'; // Hide the winner notifier
  document.getElementById('block').style.visibility='hidden'; // Hide the cover
  turn = 0; //Reset turn back to X
  startGame(); // Start over
};

// When the page loads, run the setup.
setup();

},{}]},{},[1])

//# sourceMappingURL=main.js.map
