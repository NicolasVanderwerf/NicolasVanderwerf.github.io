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

    events = 0;
    console.log("HandleScroll")
    // requestAnimationFrame(animateSlides)
    // requestAnimationFrame(animateSlides)
    let sY = window.scrollY / window.innerHeight * 100
    throttleG(() => {
        animateSlides()
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

// function animateSlides() {
//     const viewportTop = window.pageYOffset;
//     // Read layout properties first
//     const offsets = Array.from(slides).map(slide => viewportTop - slide.offsetTop);
//
//     // Update DOM in a separate loop, iterating backwards
//     for (let index = offsets.length - 1; index >= 0; index--) {
//         let offset = offsets[index];
//         if (offset >= 0) {
//             slides[index].style.transform = `translate3d(0, ${offset}px, 0)`;
//             break;
//         }
//     }
// }

function animateSlides() {
    const viewportTop = window.pageYOffset;
    // Read layout properties first
    const offsets = Array.from(slides).map(slide => viewportTop - slide.offsetTop);

    // Update DOM in a separate loop, iterating backwards
    for (let index = offsets.length - 1; index >= 0; index--) {
        let offset = offsets[index];
        if (offset >= 0) {
            slides[index].style.transform = `translate3d(0, ${offset}px, 0)`;
            break;
        }
    }
}




// Inside your scroll event


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
    slides = Array.from(document.querySelectorAll('.slide'));
    // Cache some variables
    var links = $('.navigation').find('li');
    var slide = $('.slide');
    var mywindow = $(window);
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






