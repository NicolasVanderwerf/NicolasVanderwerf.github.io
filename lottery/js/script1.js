var lottoSize = 9;

const map1 = new Map();

map1.set(1, "You will never win if you quit now!");
map1.set(2, "All losers quit right before they win!");
map1.set(3, "Money won is twice as sweet as money earned!");
map1.set(4, "The next one could be your big win!");
map1.set(5, "“Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.” - Thomas Edison");
map1.set(6, "“Never give up, for that is just the place and time that the tide will turn.” - Harriet Stowe");
map1.set(7, "“There is no failure except in no longer trying.” - Elbert Hubbard");
map1.set(8, "“Do not fear failure but rather fear not trying.” - Roy Bennett");


function welcome(){
    while(lottoSize > 8 || lottoSize < 1){
        lottoSize = prompt("Please enter a number 1 through 8");
        if(isNaN(lottoSize)){
            alert("Only enter numbers");
            lottoSize = 9;
        }else if(lottoSize <= 8 && lottoSize >= 1){
            const element = document.getElementById("myForm");
            const element2 = document.getElementById("genOutput")
            for(x=0;x<lottoSize;x++){
                element.innerHTML += '<input class="formInputs" name="'+x+'" type="text">';
                element2.innerHTML += '<p class="randomNumsP" id="random">xx</p>';
            }
        }
    }
}

function clearForm(){
    document.getElementById("myForm").reset();
}

function enterUserNums(){
    document.getElementById("winner").textContent = "";
    var x = document.getElementById("myForm").elements;
    var userNums = [lottoSize]
    for(z=0;z<lottoSize;z++){
        console.log("test test " + x[z].value);
        if(isNaN(x[z].value) || x[z].value > 99 || x[z].value < 0){
            alert("Only Enter Numbers 0-99");
            document.getElementById("myForm").reset();
            return;
        }
        userNums[z] = x[z].value
    }
    var randomNums = [lottoSize];
    var userWon = true;
    const element = document.getElementById("genOutput");
    element.innerHTML = "";
    for(z=0;z<lottoSize;z++){
        randomNums[z] = Math.floor(Math.random() * 100);
        if(randomNums[z] != userNums[z]){
            userWon = false;
        }
        console.log('<p id="random'+z+'>'+randomNums[z]+'</p>');
        element.innerHTML += '<p class="randomNumsP" id="random'+z+'">'+("0" + randomNums[z]).slice(-2)+'</p>';
    }
    
    console.log("User Numbers: " + userNums);
    console.log("Random numbers: " + randomNums);
    console.log("User Won: " + userWon);

    var currentNum = 0;
    let id = null;
    clearInterval(id);
    id = setInterval(rollingNumbers, 20);
    function rollingNumbers(){
        for(z=0;z<lottoSize;z++){
            if(currentNum <= randomNums[z]){
                document.getElementById("random"+z).innerText = currentNum;
            }
        }
        if(currentNum >= 100){
            clearInterval(id)
        }else{
            currentNum++;
        }
        
    }
    setTimeout(function() {
        if(userWon){
            document.getElementById("winner").textContent = "Winner!!!";
        }else{
            document.getElementById("winner").textContent = "You didn't win this time. Remember: " + map1.get(Math.floor(Math.random() * 8));
        }
    }, 2000);

    


}


