let reverseTriggered = false;
let forwardTriggered = false;
let lastKnownScrollPosition = 0;
let ticking = false;
window.addEventListener('scroll', function() {
    lastKnownScrollPosition = window.scrollY;

    if (!ticking) {
        window.requestAnimationFrame(function() {
            var scrollPosition = window.scrollY;
            var nameDiv = document.querySelector('.NameD');

            // Adjust this value to control how quickly the div shrinks
            var newHeight = Math.max(100 - scrollPosition*1.1,10);
            console.log("Scrolling: " + newHeight)
            nameDiv.style.height = newHeight + 'vh';
            if(newHeight == 10 && !reverseTriggered){
                console.log("Triggered Reverse")
                reverseTypeWriter();
                reverseTriggered = true;
                forwardTriggered = false;
            } else if (newHeight == 100 && !forwardTriggered) {
                console.log("Triggered Forward")
                typeWriter();
                reverseTriggered = false;
                forwardTriggered = true;
            }
            ticking = false;
        });

        ticking = true;
    }
});



// Inside your scroll event


var fullText = ['Nicolas','Keaton','Van der Werf'];
var currentLength = 13;
var speed = 50; // Time in milliseconds between each update

function reverseTypeWriter() {
    if (currentLength > 0) {
        for (let x = 0; x < 3; x++) {
            if (currentLength <= fullText[x].length) {
                document.getElementById("name" + (x + 1)).innerHTML = fullText[x].substring(0, currentLength);
            }
        }
        currentLength--;
        setTimeout(reverseTypeWriter, speed);
    }
}

function typeWriter() {
    if (currentLength < 13) {
        for (let x = 0; x < 3; x++) {
            if (currentLength <= fullText[x].length) {
                document.getElementById("name" + (x + 1)).innerHTML = fullText[x].substring(0, currentLength);
            }
        }
        currentLength++;
        setTimeout(typeWriter, speed);
    }
}

document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Tab is not active');
        alert('Left Page');
        // Your logic for when the tab is inactive
    } else {
        console.log('Tab is active');
        // Your logic for when the tab becomes active again
    }
});


