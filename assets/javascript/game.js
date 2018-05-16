 const wordList = ["Devin", "car", "bat", "andrew", "knowles", "john", "sergio", "jeff"];
 const graveyard = [];
 const answerKey = [];
 let currentWord;
 let lettersRemaining;
 let lives = 10;
 let letterSelected = "";

function startGame() {
    letterSelected = "";
    graveyard.length = 0;
    answerKey.length = 0;
    lives = 10;


    function getRandWord() {
        currentWord = wordList[Math.floor(Math.random() * wordList.length)];
        console.log(currentWord);
        lettersRemaining = currentWord.length;

        for(let i = 0; i < currentWord.length; i++) {
            answerKey[i] = "_";
        }
        updateGame();
    }
    console.log("game started!");
    getRandWord();

    
}

startGame();


function updateGame() {
    if(lettersRemaining <= 0 && lives > 0 ) {
        var winHtml =
        '<h1 class="display-3 text-center"> Woot! You won!!</h1>'+
        '<h2 class="display-4 text-center"> The word was: '+currentWord+'</h2>'+
        '<button class="btn btn-dark justify-content-center reset" onclick="startGame()">Play Again</button>';
        document.querySelector("#game").innerHTML = winHtml;
        // var playAgain = document.querySelector(".reset");
        // playAgain.addEventListener("click", startGame, false);        
    }else if (lettersRemaining > 0 && lives <= 0) {
        var winHtml =
        '<h1 class="display-3 text-center"> Shoot! You lost!!<h1>'+
        '<h2 class="display-4 text-center"> The word was: '+currentWord+'<h2>'+
        '<button class="btn btn-dark" onclick="startGame()"> Play Again </button>';
        document.querySelector("#game").innerHTML = winHtml;
    } else {
        var updateHtml =
        "<h2> press a key to choose a letter </h2>" +
        "<h3>word: " + answerKey.join(" ")  + "</p>" +
        "<h3>letterSelected: " + letterSelected + "</p>" +
        "<h3>graveyard: " + graveyard + "</p>" +
        "<h3>lives: " + lives + "</h3>";
        document.querySelector("#game").innerHTML = updateHtml;
    }
   var keyHistory = answerKey;
}



document.onkeyup = function(event){
    letterSelected = event.key;
    var keyHistory;
        //check to see if char is part of current word
    for(var j = 0; j < currentWord.length; j++) {
        if(currentWord[j] === letterSelected) {
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
    updateGame();
};