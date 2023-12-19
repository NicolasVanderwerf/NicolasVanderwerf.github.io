let reverseTriggered = false;
let forwardTriggered = false;
let ticking = false;
let nameDiv = null;

function throttle (timer) {
    let queuedCallback
    return callback => {
        if (!queuedCallback) {
            timer(() => {
                const cb = queuedCallback
                queuedCallback = null
                cb()
            })
        }
        queuedCallback = callback
    }
}
const throttleG = throttle(requestAnimationFrame)

window.addEventListener('scroll',function(){
    let sY = window.scrollY / window.innerHeight * 100
    throttleG(() => {
        animateSlides(sY)
    })
    if (sY < 110) {
        requestAnimationFrame(() => handleScroll(sY)); // Correct usage
    }

})



function handleScroll(sY){
    var newHeight = Math.max(100 - sY * 1.2, 10);
    nameDiv.style.height = newHeight + 'vh';

    if (newHeight <= 10 && !reverseTriggered) {
        reverseTriggered = true;
        reverseTypeWriter(() => {
            forwardTriggered = false;
        });
    } else if (newHeight >= 100 && !forwardTriggered) {
        forwardTriggered = true;
        typeWriter(() => {
            reverseTriggered = false;
        });
    }
}

let slides = []

slidesTop = [[100,false],[300,false],[500,false]]
function animateSlides(sY) {
    console.log("Animate Slides")
    for (let index = 0; index<3; index++) {
        if(slidesTop[index][0] < sY && slidesTop[index][1] === false){
            console.log(`Moving Slide: ${index}`)
            slidesTop[index][1] = true;
            slides[index].style.top = '0vh';
            slides[index].style.position = 'fixed'; // Or 'fixed' if you want it to stay in place on scroll
            // document.body.appendChild(slides[index]);
        }else if(slidesTop[index][0] > sY && slidesTop[index][1] === true){
            slidesTop[index][1] = false;
            slides[index].style.top = slidesTop[index][0] + 'vh';
            slides[index].style.position = 'absolute';
        }
    }
}



var fullText = ['Nicolas','Keaton','Van der Werf'];
var currentLength = 13;
var speed = 50; // Time in milliseconds between each update





function reverseTypeWriter(callback) {
    if (currentLength > 0) {
        for (let x = 0; x < 3; x++) {
            if (currentLength <= fullText[x].length) {
                document.getElementById("name" + (x + 1)).innerHTML = fullText[x].substring(0, currentLength);
            }
        }
        currentLength--;
        console.log("Expand")
        setTimeout(() => reverseTypeWriter(callback), speed);
    }else {
        if (callback) callback();
    }
}

function typeWriter(callback) {
    if (currentLength < 13) {
        for (let x = 0; x < 3; x++) {
            if (currentLength <= fullText[x].length) {
                document.getElementById("name" + (x + 1)).innerHTML = fullText[x].substring(0, currentLength);
            }
        }

        currentLength++;
        setTimeout(() => typeWriter(callback), speed);
    } else {
        if (callback) callback();
    }
}


jQuery(document).ready(function ($) {
    nameDiv = document.querySelector('.NameD');
    slides = document.querySelectorAll('.slide');
    // Cache some variables
    var links = $('.navigation').find('li');
    var htmlbody = $('html,body');

    htmlbody.animate({
        scrollTop: 0
    }, 1000, 'easeInOutQuint', function() {
        // Adjust positions of slides here if needed when scroll animation completes
    });

    // Function for smooth scrolling
    function goToByScroll(dataslide) {
        htmlbody.animate({
            scrollTop: ($(window).outerHeight() * (dataslide - 1) * 2)
        }, 1000,'linear', function() {
            // Adjust positions of slides here if needed when scroll animation completes
        });
    }

    // Click event handlers
    links.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);
    });

    console.log("Loaded")
});






