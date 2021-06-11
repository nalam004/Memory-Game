const deckCards = ["2hearts.png", "2hearts.png",
                    "3hearts.png", "3hearts.png",
                    "4hearts.png", "4hearts.png",
                    "5hearts.png", "5hearts.png",
                    "6hearts.png", "6hearts.png",
                    "7hearts.png", "7hearts.png",
                    "8hearts.png", "8hearts.png",
                    "9hearts.png", "9hearts.png",
                    "10hearts.png", "10hearts.png",
                    "queenhearts.png", "queenhearts.png",
                    "kinghearts.png", "kinghearts.png",
                    "jackhearts.png", "jackhearts.png",
                    "2spades.png", "2spades.png",
                    "3spades.png", "3spades.png",
                    "4spades.png", "4spades.png",
                    "5spades.png", "5spades.png",
                    "6spades.png", "6spades.png",
                    "7spades.png", "7spades.png",
                    "8spades.png", "8spades.png",
                    "9spades.png", "9spades.png",
                    "10spades.png", "10spades.png",
                    "queenspades.png", "queenspades.png",
                    "kingspades.png", "kingspades.png",
                    "jackspades.png", "jackspades.png",
                    "acespade.png", "acespade.png"];


let opened = [];
let matched = [];
let time;
let minutes = 0;
let seconds = 0;
let moves = 0;
let timeStart = false;

const deck = document.querySelector(".deck");
const modal = document.getElementById("modal");
const restart = document.querySelector(".restart");
const timeCounter = document.querySelector(".timer");
const movesCount = document.querySelector(".moves-counter");

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
  
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function start() {
    const shuffled = shuffle(deckCards); 
    for (let i = 0; i < shuffled.length; i++) {
      const liTag = document.createElement('LI');
      liTag.classList.add('card');
      const addImage = document.createElement("IMG");
      liTag.appendChild(addImage);
      addImage.setAttribute("src", "img/" + shuffled[i]);
      addImage.setAttribute("alt", "");
      deck.appendChild(liTag);
    }
}
  
start();

function reset() {
    clearInterval(time);
    while (deck.hasChildNodes()) {
        deck.removeChild(deck.firstChild);
    }
    timeStart = false;
    seconds = 0;
    minutes = 0;
    timeCounter.innerHTML = "Timer: 00:00";
    moves = 0;
    movesCount.innerHTML = 0 + " moves";
    matched = [];
    opened = [];
    start();
}
  
function compare() {
    if (opened.length === 2) document.body.style.pointerEvents = "none";
    
    if (opened.length === 2 && opened[0].src === opened[1].src) {
        setTimeout(function() {
            opened[0].parentElement.classList.add("match");
            opened[1].parentElement.classList.add("match");
            matched.push(...opened);
            document.body.style.pointerEvents = "auto";
            finish();
            opened = [];
        }, 800);
    }
    
    else if (opened.length === 2 && opened[0].src !== opened[1].src) {
        setTimeout(function() {
            opened[0].parentElement.classList.remove("flip");
            opened[1].parentElement.classList.remove("flip");
            document.body.style.pointerEvents = "auto";
            opened = [];
        }, 800);
    }
    movesCount.innerHTML = moves + " moves";
    moves ++;
}
  
function finish() {
    if (matched.length === deckCards.length) {
        clearInterval(time);
    
        const scoreElement = document.createElement("h2");
        const score = document.querySelector(".modal-content").appendChild(scoreElement);
        let h = score.querySelectorAll("h2");
        h.innerHTML = "You took " + moves + "moves to finish the game in " 
                        + minutes + " minutes and " + seconds + " seconds.";
        
        modal.style.display= "block";
        window.onclick = function(event) {
            if (event.target == modal) modal.style.display = "none";
        };
    }
}

function timer() {
    time = setInterval(function() {
      seconds++;
      if (seconds === 60) {
        minutes++;
        seconds = 0;
      }
      
      timeCounter.innerHTML = "Timer: " + minutes + ":" + seconds;
    }, 1000);
}
  
deck.addEventListener("click", function(evt) {
    if (evt.target.nodeName === "LI") {
      if (timeStart === false) {
        timeStart = true; 
        timer();
      }

      evt.target.classList.add("flip");
      
      // push card if opened has 0 or 1 card
      if (opened.length === 0 || opened.length === 1) {
        opened.push(evt.target.firstElementChild);
      }
      compare
    ();
    }
});
  
restart.addEventListener('click', function() {
    modal.style.display = "none";
    reset();
});

