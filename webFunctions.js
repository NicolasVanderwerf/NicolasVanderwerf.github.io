
var totalMovement = 0;


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
});
