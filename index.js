
var colors=["blue", "red", "green", "yellow"];
var towers=[["blue", "red", "green", "yellow"],[],[]];
var selectedTower=0;
var selectedColor="";
var numOfMoves=0;
var 
selected= new Boolean(false);

$(".tower1").click(function(event){
	towerClicked(1);
});
$(".tower2").click(function(event){
	towerClicked(2);
});
	
$(".tower3").click(function(event){
	towerClicked(3);
});


function towerClicked(towerNum){
	playMusic();
	
	displayNumOfMoves(numOfMoves);
	if (selected==true){ 
		// clicked to shift an already selected block to this tower 
		selected=false;
		// Checking if move is allowed
		if (validMove(selectedColor, towers[towerNum-1][0],  towers[towerNum-1].length))
		{
			// Valid Move: display block in new tower and hide the block from previous tower
			displayBlock(towerNum, selectedColor);
			removeBlock(selectedTower, selectedColor);
			towers[towerNum-1].unshift(selectedColor);
			selectedTower=0;
			numOfMoves++;
			displayNumOfMoves(numOfMoves);
			if (towerNum===3 && gameWin()){
				document.getElementById("myAudio").pause();
				playSound("win.mp3");
				setTimeout(function(){
					$('h1').text("Total Number of Moves is "+numOfMoves);
				}, 3000);
				setTimeout(
			 		function() 
			  		{
			   		 resetGame();
			  		}, 5000);

				
			}
		}
		else{
			// Move is not allowed
			invalidMove(selectedTower, selectedColor);
			
		}
	}
	else{
			// clicked to select a block from tower 1
		if (towers[towerNum-1].length>0){
			// Tower is not empty
			selectTopBlock(towerNum, towers[towerNum-1][0]);
		
		}else{
			// empty tower
			emptyTower();
		
	}
	}
}


function displayBlock(towerNum, blockColor){
	$(".tower"+towerNum+" ."+blockColor).removeClass("hidden selected");
}
function removeBlock(towerNum, blockColor){
	$(".tower"+towerNum+" ."+blockColor).addClass("hidden");
		towers[towerNum-1].shift();
	
}
function validMove(blockColor, towerColor, towerLength){
	if ((colors.indexOf(blockColor)<colors.indexOf(towerColor)) || towerLength===0){
		playSound("correct.mp3");
		
	return(true);
	}else
	{ 
		return(false);
	}
}
function invalidMove(towerNum, blockColor){
		playSound("wrong.mp3");
		$("h1 span").text("invalid move, try again");
		$(".tower"+towerNum+" ."+blockColor).removeClass("selected");
	}
function displayNumOfMoves(numOfMoves){
	$("h1 span").text("Number of Moves = "+ numOfMoves);
}
function selectTopBlock(towerNum, blockColor){
	$(".tower"+towerNum+" ."+blockColor).addClass("selected");
		selected=true;
		selectedTower=towerNum;
		selectedColor=blockColor;
}
function emptyTower(){
	playSound("wrong.mp3");
	$("h1 span").text("Tower is empty, try again");
}
function playMusic(){
	document.getElementById("myAudio").play();
}
function playSound(path){
	var sound=new Audio(path);
	sound.play();
}
function gameWin(){
	if (towers[2].length===colors.length){
		$('h1 span').text("YOU HAVE WON THIS GAME");
		$("i").addClass("fas fa-trophy fa-2x");
		$("i").css("color","red");
		return(true);
	} else return(false);
}
function resetGame(){
	window.location.reload();
}