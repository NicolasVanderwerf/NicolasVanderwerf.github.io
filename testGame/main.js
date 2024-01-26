let x, y;
let xRat;
let xVelocity, yVelocity;
let gravity;
let onGround;
let platforms;
let inputBox, answerInput, questionP, wrongAnswer;
let isGamePaused = false;
let characterImage
let facingDirection = 1;
let assetsLoaded = false;

let bgImageBuffer;
let ogImage;
let bgImage;
let bgY = 0;

let questionData;
let mySound;
let playing = false;


//Runs before Draw. Draw will not run until setup is finished I think.
function setup() {

    //Fixes max pixel issue on iphone
    let maxWidth = windowWidth;
    let maxHeight = windowHeight;
    const maxPixels = 16777200;

    // const aspectRatio = windowWidth / windowHeight;


    if (windowWidth * windowHeight > maxPixels) {
        const scaleFactor = Math.sqrt(maxPixels / (windowWidth * windowHeight));
        maxWidth = windowWidth * scaleFactor;
        maxHeight = windowHeight * scaleFactor;
    }
    console.log("Canvas Size:  " + maxWidth * maxHeight)
    createCanvas(maxWidth, maxHeight);

    loadAssets();

    // Loads DOM elements for the question/answer box
    inputBox = document.getElementById('inputBox');
    answerInput = document.getElementById('answerInput');
    questionP = document.getElementById('question');
    wrongAnswer = document.getElementById('wrongAnswer');


    //Checks for enter key for question answer
    answerInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            submitAnswer();
        }
    });
}

let curExpectedAnswer = 0;

// Retrieves answer from answer input box and makes sure its the currently expected
// Answer
function submitAnswer() {
    let answer = answerInput.value;
    console.log(answer);
    if(answer === curExpectedAnswer) {
        inputBox.style.display = 'none';
        isGamePaused = false;
        wrongAnswer.innerHTML = '';
        answerInput.value = '';
    } else {
        wrongAnswer.innerHTML = "Incorrect answer";
    }
}

//Main loop, runs for every frame.
//Needs work to run 30fps vs 60fps (chrome vs safari)
function draw() {
    if (!assetsLoaded) {
        // Loading Screen
        background(0);
        fill(255);
        textAlign(CENTER, CENTER);
        text("LOADING", width / 2, height / 2);
    } else {
        if (!isGamePaused) {
            clear();
            x += xVelocity;
            xRat = x/windowWidth
            if (!onGround) {
                yVelocity += gravity;
            } else {
                yVelocity = 0;
            }

            y += yVelocity;

            let yOffset = height * (.6) - y;

            for (let plat of platforms) {
                plat.y += yOffset;
            }
            bgY += yOffset
            let yPos = windowHeight * 1.5 - (bgImage.height) + bgY;
            image(bgImage, 0, yPos);

            y = height * (.6);

            checkGroundAndPlatforms();

            drawCharacter();

            drawPlatforms();
        }
    }
}


// Checks for collision with Platforms. Only checks if the character is moving
// down. If there is collision with a platform the character will stop falling.
// If the platform as a question that is not answered then the question will
// appear.
function checkGroundAndPlatforms() {
    let nextY = y + yVelocity;
    for (let plat of platforms) {
        if (yVelocity >= 0){
            if (x > plat.x && x < plat.x + plat.width) {
                if (nextY + 35 > plat.y && nextY + 35 < plat.y + plat.height) {
                    onGround = true;
                    yVelocity = 0;
                    if (!plat.answered) {
                        inputBox.style.display = 'block';
                        answerInput.focus();
                        curExpectedAnswer = plat.answer;
                        questionP.innerHTML = 'Question: ' + plat.question;
                        isGamePaused = true;
                        plat.answered = true;
                    }
                    break;
                }
            } else {
                onGround = false
            }
        }
    }
}

// Draws the Character. Scales the charecter in whatever direction it should be facing.
function drawCharacter() {

    push();
    translate(x, y);
    scale(facingDirection, 1); // Flip character based on facingDirection

    image(characterImage, -characterImage.width / 2, -characterImage.height / 2);

    pop();

}

// Draws all the platforms in the list of platforms.
function drawPlatforms() {
    fill(100, 100, 100);
    for (let plat of platforms) {
        rect(plat.x, plat.y, plat.width, plat.height);
    }
}

// Logic for key presses. Gives velocity left right or up.
// Left or Right change the direction the character is facing.
// First up arrow plays love sosa. This should not be changed
function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        xVelocity = -10;
        facingDirection = 1;
    } else if (keyCode === RIGHT_ARROW) {
        xVelocity = 10;
        facingDirection = -1;
    } else if (keyCode === UP_ARROW && onGround) {
        yVelocity = -12;
        onGround = false;
        if(!playing){
            document.getElementById('touchOverlay').style.opacity = 0;
            playing = true;
            mySound.play();
        }
    }
}

//Resets x velocity when key is released.
//Needs to be changed
function keyReleased() {
    if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
        xVelocity = 0;
    }
}

function touchStarted() {
    console.log(mouseX)
    if(mouseX < windowWidth / 4){
        xVelocity = -10;
        facingDirection = 1;
    }else if(mouseX < windowWidth / 2){
        xVelocity = 10;
        facingDirection = -1;
    }else if((mouseX > windowWidth / 2) && onGround){
        yVelocity = -12;
        onGround = false;
        if(!playing){
            document.getElementById('touchOverlay').style.opacity = 0;
            playing = true;
            mySound.play();
        }
    }

    return false;
}

function touchEnded(){
    if(mouseX < windowWidth / 2){
        xVelocity = 0;
    }
}





//Loads Assets for the game.
function loadAssets() {
    let assetsToLoad = 4; // Update the count as needed
    let assetsLoadedCount = 0;

    function assetLoaded() {
        assetsLoadedCount++;
        if (assetsLoadedCount === assetsToLoad) {
            assetsReady(); // Call assetsReady once all assets are loaded
        }
    }

    ogImage = loadImage('forestBackground.jpeg', assetLoaded);
    questionData = loadJSON('problemSet1.json', assetLoaded);
    characterImage = loadImage('pandaCharacter.png', assetLoaded); // Replace with your image path
    mySound = loadSound('SOSA.mp3', assetLoaded);
}

//Runs when all assets are loaded
function assetsReady() {
    bgImageBuffer = createGraphics(ogImage.width, ogImage.height);
    bgImageBuffer.image(ogImage, 0, 0);
    bgImage = bgImageBuffer.get();
    bgImage.resize(windowWidth, 0);
    characterImage.resize(150,0);
    x = width / 2;
    y = height * (.9);
    xVelocity = 0;
    yVelocity = 0;
    gravity = 0.5;
    onGround = false;

    //Builds the platforms with their questions dynamicaly based on json data.
    //To be fetched in the future.
    let questionSet = questionData["Questions"];
    platforms = [
        { x: 0, y: windowHeight, width: windowWidth, height: 20, question: "", answer: '', answered: true},
    ];
    let i = 120;
    for(let question of questionSet){
        console.log(question);
        //Sory about this line. Change the boolian at the end to false if you want the question
        //On each platform
        let cur = { xRat: question.xRatio, x: question.xRatio * windowWidth, y: windowHeight - i, width: windowWidth/4, height: 20, question: question.question, answer: question.answer, answered: true}
        platforms.push(cur);
        i += 120
    }
    //Show tap instructions
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        document.getElementById('touchOverlay').style.display = "flex";
    } else {
        document.getElementById('touchOverlay').style.display = "flex";
    }

    assetsLoaded = true;


}


//Ressizes game as window size changes.
//Needs work for elements other then background
function windowResized() {
    console.log("Resizing")
    x = xRat * windowWidth
    bgImage = bgImageBuffer.get();
    bgImage.resize(windowWidth, 0);
    for (let i = 0; i < platforms.length; i++){
        if(i !== 0){
            platforms[i].x = (platforms[i].xRat * windowWidth)
            platforms[i].width = windowWidth/4
        }else{
            platforms[i].width = windowWidth
        }
    }
    resizeCanvas(windowWidth, windowHeight);
}

