 var wordList = ["a", "bc", "def", "andrew", "knowles", "john", "sergio", "jeff"];
 var graveyard = [];
 
 var currentWord;
 var lettersRemaining;
 var lives = 10;
 var letterSelected;


currentWord = wordList[Math.floor(Math.random() * wordList.length)];

var answerKey = [];
for(var i = 0; i < currentWord.length; i++) {
    answerKey[i] = "_";
}

lettersRemaining = currentWord.length;



document.onkeyup = function(event){
    letterSelected = event.key;
        //check to see if char is part of current word
    for(var j = 0; j < currentWord.length; j++) {
        if(currentWord[j] === letterSelected) {
            answerKey[j] = letterSelected;
            lettersRemaining--;
        }
    }
    if( graveyard.indexOf(letterSelected) < 0)   {
        graveyard.push(letterSelected);
    } else {
        letterSelected = "already used letter";
    }

    var html =
    "<p>word: " + answerKey + "</p>" +
    "<p>letterSelected: " + letterSelected + "</p>" +
    "<p>graveyard: " + graveyard + "</p>";

    document.querySelector("#game").innerHTML = html;
};







