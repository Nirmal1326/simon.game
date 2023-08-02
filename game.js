var buttonColor=["red","blue","green","yellow"];

var gamePattern=[];
var userClickedPattern=[];
var level=0;
var start=false;

$(document).keypress(function(){
   if(!start){
    $("#level-title").text("level "+level);
    $("#level-title2").text("level "+level);
    nextSequence();
    start=true;
   }
});
$(".go").click(function(){
    if(!start){
     $("#level-title").text("level "+level);
     $("#level-title2").text("level "+level);
     nextSequence();
     start=true;
    }
 });
function startOver(){
    level=0;
    gamePattern=[];
    start=false;
}

$(".btn").click(function(){
var useChoosenColor=$(this).attr("id");
userClickedPattern.push(useChoosenColor);
animatePress(useChoosenColor);
playSound(useChoosenColor);
checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){

    userClickedPattern=[];

    level++;
    $("#level-title").text("level "+level);
    $("#level-title2").text("level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColor[randomNumber];
    gamePattern.push(randomChosenColour); 

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    animatePress(randomChosenColour);
    playSound(randomChosenColour);

}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        console.log("wrong");
        var audio=new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("#level-title2").text("Game Over, Press Go Key to Restart");
        startOver();
    }
}

function playSound(name){
    var audio= new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}