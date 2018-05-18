const wordList = ["javascript", "css", "html", "margin", "padding", "variable", "loop", "node", "ajax", "api", "string", "interger", "algorithim"];
const graveyard = [];
const answerKey = [];
let currentWord;
let lettersRemaining;
let lives;
let letterSelected;

startGame();  // Entry point of the game cycle

function startGame() { 
    // reset globals that kept track of progress and lives
    letterSelected = "";
    graveyard.length = 0;
    answerKey.length = 0;
    lives = 5;


    getRandWord(); 
}

function getRandWord() {
    currentWord = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(currentWord);
    lettersRemaining = currentWord.length;

    for(let i = 0; i < currentWord.length; i++) {
        answerKey[i] = "_";
    }


    updateScreen();
}

// Give the player some feedback on his current progress in the game.
function updateScreen() {
    if(lettersRemaining <= 0 && lives > 0 ) { // Win case
        var winHtml =
        '<h1 class="display-5 text-center"> Woot! You won!!</h1>'+
        '<h2 class="display-6 text-center"> The word was: '+currentWord+'</h2>'+
        '<button class="btn btn-dark justify-content-center reset" onclick="startGame()">Play Again</button>';
        document.querySelector("#game").innerHTML = winHtml;
    } else if (lettersRemaining > 0 && lives <= 0) { // Lose case
        var winHtml =
        '<h1 class="display-5 text-center"> Shoot! You lost!!<h1>'+
        '<h2 class="display-6 text-center"> The word was: '+currentWord+'<h2>'+
        '<button class="btn btn-dark" onclick="startGame()"> Play Again </button>';
        document.querySelector("#game").innerHTML = winHtml;
    } else { // the game must go on!!!
        var updateHtml =
        "<h2>word: " + answerKey.join(" ")  + "</h2>" +
        "<h2>graveyard: " + graveyard + "</h2>" +
        "<h3>lives: " + lives + "</h3>";
        document.querySelector("#game").innerHTML = updateHtml;
    }
   var keyHistory = answerKey;
}

// keyboard input
document.onkeyup = function(event){
    letterSelected = event.key;


    updateGame();
};

const updateGame = () => {
    var keyHistory;
    //check to see if char is part of current word
    for(var j = 0; j < currentWord.length; j++) {
        if(currentWord[j] === letterSelected.toLowerCase()) {
            answerKey[j] = letterSelected;
            lettersRemaining--;
            keyHistory = answerKey;
        }
    }
    if( graveyard.indexOf(letterSelected) < 0)   {
        graveyard.push(letterSelected);
    } else {
        letterSelected = "already used letter";
    }
    if( keyHistory != answerKey && graveyard.indexOf(letterSelected) >= 0) {
        lives--;
    }
    updateScreen();
}


// Button Generator and eventListener
const alphabetGen = () => {
    let letterHTML = "";
    const letterArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    letterArr.forEach(letter => {
        const letterString = letter.toString();
        const letterBtn = document.createElement("button");
        letterBtn.innerHTML = letter;
        letterBtn.setAttribute("id", letter);
        letterBtn.setAttribute("class", "btn btn-dark letter-btn");
        document.querySelector("#btns").appendChild(letterBtn);
        letterBtn.addEventListener("click", function() {
            letterSelected = this.id;
            updateGame();
        })
    })
}

alphabetGen();



