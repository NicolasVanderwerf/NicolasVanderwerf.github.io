let reverseTriggered = false;
let forwardTriggered = false;
let ticking = false;



window.addEventListener('scroll', function() {

    if (!ticking) {
        window.requestAnimationFrame(function() {
            var scrollPosition = window.scrollY / window.innerHeight * 100;
            var nameDiv = document.querySelector('.NameD');
            var newHeight = Math.max(100 - scrollPosition * 1.2, 10);
            // $('.slide:first-child').style.top = newHeight + 'vh';
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
            ticking = false
        });
        ticking = true;
    }
    requestAnimationFrame(animateSlides);
});



function animateSlides() {
    const slides = document.querySelectorAll('.slide');

    slides.forEach((slide, index) => {
        let offset = window.pageYOffset - slide.offsetTop;
        if (offset >= 0) {
            slide.style.transform = `translateY(${offset}px)`;
        }
    });

    requestAnimationFrame(animateSlides);
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
});






