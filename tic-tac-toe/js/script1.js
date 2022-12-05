
var totalTurns = 0;
var turnA = true;
var gameOver = false;
var player1Total;
var player2Total;
var winningValues = [7,56,73,84,146,273,292,448];

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

function addMark(thisDiv,spaceValue){
    var currentPlayer;
    if(gameOver){}
    else if(thisDiv.innerText != ""){}
    else{
        if(turnA){
            currentPlayer = player1;
        }else{
            currentPlayer = player2;
        }
        thisDiv.innerText = currentPlayer.char;
        currentPlayer.gameValues += spaceValue;
        turnA = !turnA;
        totalTurns++;
        var winningGameValue = checkWinning(currentPlayer)
        if( winningGameValue > 0){
            document.getElementById("winner").innerText = currentPlayer.name + ' has WON!!!'
            gameOver = true;
            var winningGameValueBi = winningGameValue.toString(2).padStart(9,'0');
            console.log("WinningBinary: " + winningGameValueBi);
            var gridTiles = document.getElementsByClassName("gridTile")
            for(i=0;i<9;i++){
                if(winningGameValueBi[8-i] == '1'){
                    gridTiles[i].classList += " winningTiles"
                }
            }
              
        }else if(totalTurns > 8){
            document.getElementById("winner").innerText = "It's a TIE!!!"
            gameOver = true;
        }
    }
}