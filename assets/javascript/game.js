$(document).ready(function(){




function liBuilder(str, itm, index){ 
            var theLI = ['<li class="btn btn-primary btn-block" data-ind="', index,'">',itm,'</li>' ].join(""); 
            console.log('theLI', theLI);
            str += theLI;
            return str; 
};
var choicesUL = document.getElementById("choicesUL");
var questionsPrompt = document.querySelector("#question");
var choiceIMG = document.getElementById('choiceIMG');
var game = {
  seen: 0, 
  correct: 0,
  wrong: 0,
  currentQ: null,
  questions: [
    {   imgSrc: "http://bronxbaseballdaily.com/wp-content/uploads/2012/09/wee-willie-keeler1-462x540.jpg",
        choices: ["Ty Cobb with 40", "Pete Rose with 44", "Willie Keeler with 45", "Rogers Hornsby with 49"],
        q: "After Joe DiMaggio with 56 consecutive games with a hit, who is 2nd and how many games?", 
        a: 2,
    },
    {   imgSrc: "https://marinersblog.files.wordpress.com/2012/05/perry-gaylord-1614-2001_c2a9bhof.jpg",
        choices: ["Gaylord Perry","Roger Clemens","Babe Ruth","Andy Pettite"],
        q:"Name the first pitcher to win the Cy Young Award in both leagues.",
        a: 0,
    },
    {   imgSrc: "http://sports.mearsonlineauctions.com/ItemImages/000052/52831a_lg.jpeg",
        choices: ["Mickey Mantle","Jack Robinson","Lou Gehrig","Babe Ruth"],
        q: "Whose number was the first ever retired by an MLB team?",
        a: 2,
    },
    {   imgSrc: "http://content.sportslogos.net/logos/53/59/full/6n8ewtl7lzamf20eohyv4aav2.png",
        choices:["Cincinnati Reds","Boston Red Sox","New York Yankees","Detroit Tigers"],
        q:"Who did the Chicago Cubs play in the 1908  World Series?",
        a: 3,
    }
    ],
    fillChoices: function(choices){
        console.log('in fillChoices choices', choices)
        return choices.reduce(liBuilder, "");
    },

    startGame: function(){
        var currentQuestion = game.questions[game.seen];
        console.log('currentQuestion', currentQuestion);
        var theChoiceLIs = game.fillChoices(currentQuestion.choices)
        console.log('in fillQuestion: theChoiceLIs', theChoiceLIs);
        choicesUL.innerHTML = theChoiceLIs;
        choiceIMG.src = currentQuestion.imgSrc;
        questionsPrompt.innerHTML = currentQuestion.q;
        game.currentQ = currentQuestion;

    }, 
    fillQuestion: function(){
        var currentQuestion = game.questions[game.seen];
        console.log('currentQuestion', currentQuestion);
        $('.a-view').hide();
        $('.q-view').show();
        var theChoiceLIs = game.fillChoices(currentQuestion.choices)
        console.log('in fillQuestion: theChoiceLIs', theChoiceLIs);
        choicesUL.innerHTML = theChoiceLIs;
        choiceIMG.src = currentQuestion.imgSrc;
        questionsPrompt.innerHTML = currentQuestion.q;
        game.currentQ = currentQuestion;
        
    },
    checkAnswer: function(liIndex){
        if(parseInt(liIndex) === game.currentQ.a){
            $("#resText").html("RIGHT!")
            game.correct += 1;
            $("#correctScore").html("Correct: " + game.correct);
        }else{
           $("#resText").html("Wrong!")
           game.wrong += 1;
           $("#wrongScore").html("Wrong: " + game.wrong);  

        }
        $('.a-view').show();
        $('.q-view').hide();
        
        game.seen = game.seen + 1;
        
        setTimeout(function(){
            game.fillQuestion();
        }, 1000);
    }

};//game
window.q = game.questions;
window.game = game;
var ind = 0;
var startBtn = document.querySelector("#startButton");
$("#startButton").on('click', function(){
  game.seen = 0;
  game.correct = 0;
  game.wrong = 0;
 
  console.log(this)
  if(startBtn.className === "btn-info"){
    startBtn.innerHTML = "restart";
    startBtn.className = "btn-danger";

  }
   game.startGame();


// refresh page if you click restart //
$("#startButton").on('click',function(){
        if(startBtn.innerHTML === "restart"){
                window.location.reload();
        };
});



});
choicesUL.onclick = function(event){
   console.log('event', event);
   if(event.target.dataset.ind){
         game.checkAnswer(event.target.dataset.ind);
   }
  
}
console.log('choicesUL', choicesUL);
console.log('question', question);
});

