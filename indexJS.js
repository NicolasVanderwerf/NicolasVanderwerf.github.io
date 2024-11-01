let reverseTriggered = false;
let forwardTriggered = false;
let ticking = false;
let nameDiv = null;

window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

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



document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);
    const navigation = document.querySelector('.navigation');
    const navItems = document.querySelectorAll('.navigation li');
    const slides = document.querySelectorAll('.slide');
    nameDiv = document.querySelector('.NameD');
    const calculateSlidePositions = () => {

        const temp = new Array(slides.length).fill(0);
        temp[0] = 0
        temp[1] = 150
        for (let i = 2; i < slides.length; i++) {
            temp[i] = temp[i-1] + 230
        }
        slidePositions = Array.from(temp).map(slide => (slide/100) * window.innerHeight);
    };

    let slidePositions = [];

    calculateSlidePositions();

    window.addEventListener('resize', calculateSlidePositions);

    navItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            window.scrollTo({
                top: slidePositions[index+1],
                behavior: 'smooth'
            });
        });
    });

    // Show navigation on first slide and highlight active slide
    window.addEventListener('scroll',function(){
        let sYRaw = window.scrollY;
        let windowHeight = window.innerHeight
        let sY = sYRaw / windowHeight * 100
        throttleG(() => {
            if (sY < 110) {
                // requestAnimationFrame(() => handleScroll(sY)); // Correct usage
                handleScroll(sY)
            }
            if (sYRaw > windowHeight) {
                navigation.classList.add('visible');
            } else {
                navigation.classList.remove('visible');
            }
            let selected = 1
            slides.forEach((slide, index) => {
                const slideTop = slide.getBoundingClientRect().top;
                if (slideTop < windowHeight * 0.5 && slideTop > -windowHeight * 0.5 && index >= selected) {
                    selected = index
                    navItems.forEach(item => item.classList.remove('tabSelected'));
                    navItems[selected-1].classList.add('tabSelected');
                }
            });
        });

    });
});




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






