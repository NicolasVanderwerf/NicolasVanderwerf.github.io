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
        // console.log(`Scroll Function: ${sY}`)
        if (sY < 110) {
            // requestAnimationFrame(() => handleScroll(sY)); // Correct usage
            handleScroll(sY)
        }
        animateSlides(sY)
    })

})



function handleScroll(sY){
    let newHeight = Math.max(100 - sY * 1.2, 10);
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
    // Check if sY is within 5 units of any multiple of 100
    if (Math.abs(sY % 100) <= 20 || Math.abs(sY % 100) >= 80) {
        // console.log("Animate Slides")
        for (let index = 0; index < 3; index++) {
            if(slidesTop[index][0] < sY && slidesTop[index][1] === false){
                console.log(`Moving Slide: ${index}`)
                slidesTop[index][1] = true;
                slides[index].style.top = '0vh';
                slides[index].style.position = 'fixed';
            } else if(slidesTop[index][0] > sY && slidesTop[index][1] === true){
                console.log(`Resetting Slide: ${index}`)
                slidesTop[index][1] = false;
                slides[index].style.top = slidesTop[index][0] + 'vh';
                slides[index].style.position = 'absolute';
            }
        }
    }
}



let fullText = ['Nicolas','Keaton','Van der Werf'];
let currentLength = 13;
let speed = 50; // Time in milliseconds between each update





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
    let links = $('.navigation').find('li');
    let htmlBody = $('html,body');

    $(window).scrollTop(0);
    function goToByScroll(dataslide) {
        htmlBody.animate({
            scrollTop: ($(window).outerHeight() * (dataslide - 1) * 2)
        }, 1000,'linear', function() {
            // Adjust positions of slides here if needed when scroll animation completes
        });
    }

    // Click event handlers
    links.click(function (e) {
        e.preventDefault();
        let dataSlide = $(this).attr('data-slide');
        goToByScroll(dataSlide);
    });

    console.log("Loaded")
});






