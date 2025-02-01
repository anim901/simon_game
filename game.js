var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
function nextSequence(){
    level += 1;
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut().fadeIn();
    playSound(randomChosenColour);
    userClickedPattern = [];
}
$(".btn").on("click", function handler(){
    var userChosenColour = $(this).attr("id");
    animatePress(userChosenColour);
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
        checkAns();
    

});
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(()=>{
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

$(document).on("keypress", ()=>{
    if (level == 0){
        gamePattern = [];
        nextSequence();
    }
});
function checkAns(){
    var flag = true;
    for( var i=0; i<userClickedPattern.length;  i++){
        if (gamePattern[i]!=userClickedPattern[i]){
            flag = false ;
        }
    }
    if (flag == true && gamePattern.length == userClickedPattern.length){
        nextSequence();
    }
    else if (flag == false){
        level = 0;
        $("h1").text("Game Over, Press Any Key To Restart");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(()=>{
            $("body").removeClass("game-over");
        }, 200);
    }
}

