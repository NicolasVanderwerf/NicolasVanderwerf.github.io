
var totalMovement = 0;

const map1 = new Map();
map1.set(0, "Try not. Do or do not, there is no try. - Yoda");
map1.set(1, "Your eyes can desieve you; dont trust them. - Obi-Wan Kenobi");
map1.set(2, "The ability to speak does not make you intelligent. - Qui-Gon Jin");
map1.set(3, "I like firsts. Good or bad, they are always memorable - Ahsoka Tano");
map1.set(4, "Sometimes we must let go of our pride and do what is requested of us. - Anakin Skywalker");
map1.set(5, "Many of the truths that we cling to depend on our view point. - Obi-Wan Kenobi");
map1.set(6, "Train yourself to let go of everything you fear to lose. - Yoda");
map1.set(7, "No longer certain that one ever does win a war, I am. - Yoda");
map1.set(8, "The Dark Side leads to many abilities some would consider to be unatural. - Shiv");
function getQuote(){
    document.getElementById("reflectionSpan").innerHTML = 'Quote:';
    document.getElementById("reflectionP").innerText = map1.get(Math.floor(Math.random() * 8));
}

document.addEventListener('wheel',function(e) {
    if(Math.abs(e.deltaY) < 5){return;}
    totalMovement += e.deltaY/10;
    var min = false;
    if(totalMovement > 140){totalMovement = 140;min=true;}
    if(totalMovement < 0){totalMovement = 0;}
    const mainDiv = document.getElementById("mainName")
    if(min){
        mainDiv.style.transition = '300ms linear';
        mainDiv.style.width = '100%';
        mainDiv.style.height = '10vh';
        mainDiv.style.lineHeight = '10vh';
        mainDiv.style.textAlign = 'left';

        document.getElementById("nameSpan").style.fontSize = 40-(totalMovement/4) +'vmax';

        
    }else{
        mainDiv.style.textAlign = 'center';
        mainDiv.style.width = 90-(totalMovement/2) +'vw';
        mainDiv.style.transition = '0ms linear';
        mainDiv.style.height = 90-(totalMovement/2) +'vh';
        mainDiv.style.lineHeight = 90-(totalMovement/2) +'vh';
        document.getElementById("nameSpan").style.fontSize = 40-(totalMovement/4) +'vmax';
        // div.style.height = window.scrollY +'px';
    }
    if(Math.abs(e.deltaX) > 100){
        console.log(e.deltaX)
        let beat = new Audio('10942 S Pleasant Hill Cir.m4a');
        beat.play();
    }
});
