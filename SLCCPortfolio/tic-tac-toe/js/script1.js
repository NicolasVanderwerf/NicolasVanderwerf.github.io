
var totalTurns = 0;
var turnA = true;
var gameOver = true;
var player1Total;
var player2Total;
var winningValues = [7,56,73,84,146,273,292,448];
var ai = false;

class player{
    constructor(char,name){
    this.char = char;
    this.name = name;
    this.gameValues = 0;
    }
}

function checkWinning(player){
    for(i = 0;i<8;i++){
        var winningValue = winningValues[i];
        if((winningValue & player.gameValues) == winningValue){
            return winningValue;
        }
    }
    return 0;
}

var player1 = new player('X','Default1');
var player2 = new player('O','Default2');

async function addMark(thisDiv,spaceValue){
    var currentPlayer;
    if(gameOver){
        document.getElementById("playGame").style.transform = "scale(1.2)";
        await sleep(100);
        document.getElementById("playGame").style.transform = "scale(1.0)";
        await sleep(100);
        document.getElementById("playGame").style.transform = "scale(1.2)";
        await sleep(100);
        document.getElementById("playGame").style.transform = "scale(1.0)";
    }
    else if(thisDiv.innerText != ""){}
    else{
        if(turnA){
            currentPlayer = player1;
            document.getElementById("whosTurn").innerText = "It's " + player2.name +"'s turn!";
        }else if(!ai){
            currentPlayer = player2;
            document.getElementById("whosTurn").innerText = "It's " + player1.name +"'s turn!";
        }
        thisDiv.innerText = currentPlayer.char;
        currentPlayer.gameValues += spaceValue;
        turnA = !turnA;
        totalTurns++;
        var winningGameValue = checkWinning(currentPlayer);
        if( winningGameValue > 0){
            document.getElementById("whosTurn").innerText = currentPlayer.name + ' has WON!!!'
            gameOver = true;
            var winningGameValueBi = winningGameValue.toString(2).padStart(9,'0');
            console.log("WinningBinary: " + winningGameValueBi);
            var gridTiles = document.getElementsByClassName("gridTile")
            for(i=0;i<9;i++){
                if(winningGameValueBi[8-i] == '1'){
                    gridTiles[i].classList += " winningTiles"
                }else{
                    gridTiles[i].classList += " losingTiles"
                }
            }
              
        }else if(totalTurns > 8){
            document.getElementById("whosTurn").innerText = "It's a TIE!!!"
            gameOver = true;
        }
        if(ai && !gameOver){
            currentPlayer = player2;
            aiMove();
            turnA = !turnA;
            totalTurns++;
            var winningGameValue = checkWinning(currentPlayer);
            document.getElementById("whosTurn").innerText = "It's " + player1.name +"'s turn!";
            if( winningGameValue > 0){
                document.getElementById("whosTurn").innerText = currentPlayer.name + ' has WON!!!'
                gameOver = true;
                var winningGameValueBi = winningGameValue.toString(2).padStart(9,'0');
                console.log("WinningBinary: " + winningGameValueBi);
                var gridTiles = document.getElementsByClassName("gridTile")
                for(i=0;i<9;i++){
                    if(winningGameValueBi[8-i] == '1'){
                        gridTiles[i].classList += " winningTiles"
                    }else{
                        gridTiles[i].classList += " losingTiles"
                    }
                }
                  
            }else if(totalTurns > 8){
                document.getElementById("whosTurn").innerText = "It's a TIE!!!"
                gameOver = true;
            }
        }
        
    }
}

function showPlayerDiv(){
    var checkBox2Player = document.getElementById("realPlayerSelect");
    if (checkBox2Player.checked == true){
      document.getElementById("gameSettingsTwoPlayer").style.display = "block";
      document.getElementById("gameSettingsVSAI").style.display = "none";
      document.getElementById("playGame").style.display = "block";
      ai = false;
    } else {
        document.getElementById("gameSettingsTwoPlayer").style.display = "none";
        document.getElementById("gameSettingsVSAI").style.display = "block";
        document.getElementById("playGame").style.display = "block";
        ai = true;
    }
}

function resetGame(){
    gameOver = false;
    turnA = true;
    player1.gameValues = 0;
    player2.gameValues = 0;
    totalTurns = 0;
    var gridTiles = document.getElementsByClassName("gridTile")
    for(i=0;i<9;i++){
        gridTiles[i].innerText = " ";
        gridTiles[i].classList = "gridTile";
    }
    board = [[0,0,0],[0,0,0],[0,0,0]];
    document.getElementById("playGame").innerText = 'Reset';
    
    if(document.getElementById("realPlayerSelect").checked){
        player1.name = document.getElementById("player1Name").value;
        player2.name = document.getElementById("player2Name").value;
    }else{
        player1.name = document.getElementById("player1NameAI").value;
        player2.name = 'Chuck Norris';
    }
    document.getElementById("whosTurn").innerText = "It's " + player1.name +"'s turn!";
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

let board = [[0,0,0],[0,0,0],[0,0,0]];
const positionValues = [[1,2,4],[8,16,32],[64,128,256]];
function aiMove(){
    
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            var currentChar = document.getElementById("tile"+i+j).innerText
            if(currentChar == " "){board[i][j] = 0;}
            else if(currentChar == "X"){board[i][j] = 1;}
            else if(currentChar == "O"){board[i][j] = 2;}
            console.log(board[i][j]);
        }
    }
    console.log("Board: \n" + board[0]+"\n"+board[1]+"\n"+board[2]);
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == 0) {
                board[i][j] = 2;
                let score = minimax(board, 0, false);
                board[i][j] = 0;
                if (score > bestScore) {
                    bestScore = score;
                    move = { i, j };
                }
            }
        }
    }
    document.getElementById("tile"+move.i+move.j).innerText = 'O';
    player2.gameValues += positionValues[move.i][move.j]
    console.log("Game values: "+ player2.gameValues);
}




  
let scores = {
    2: 10,
    1: -10,
    tie: 0
};
  
function minimax(board, depth, isMaximizing) {
    let result = checkWinner();
    if (result !== null) {
      return scores[result];
    }
  
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Is the spot available?
          if (board[i][j] == 0) {
            board[i][j] = 2;
            
            let score = minimax(board, depth + 1, false);
            board[i][j] = 0;
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Is the spot available?
          if (board[i][j] == 0) {
            board[i][j] = 1;
            let score = minimax(board, depth + 1, true);
            board[i][j] = 0;
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  }

  function checkWinner() {
    let winner = null;
  
    // horizontal
    for (i = 0; i < 3; i++) {
      if (equals3(board[i][0], board[i][1], board[i][2])) {
        winner = board[i][0];
      }
    }
  
    // Vertical
    for (i = 0; i < 3; i++) {
      if (equals3(board[0][i], board[1][i], board[2][i])) {
        winner = board[0][i];
      }
    }
  
    // Diagonal
    if (equals3(board[0][0], board[1][1], board[2][2])) {
      winner = board[0][0];
    }
    if (equals3(board[2][0], board[1][1], board[0][2])) {
      winner = board[2][0];
    }
  
    let openSpots = 0;
    for (i = 0; i < 3; i++) {
      for (j = 0; j < 3; j++) {
        if (board[i][j] == 0) {
          openSpots++;
        }
      }
    }
  
    if (winner == null && openSpots == 0) {
      return 'tie';
    } else {
      return winner;
    }
  }

  function equals3(a, b, c) {
    return a == b && b == c && a != 0;
  }