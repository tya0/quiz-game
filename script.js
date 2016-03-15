var app = {};

var timer;
var seconds;
app.counter="0";
app.earningsCounter="1";

var sciQuestions = [
	{question: "What is the most common gas in the Earth's atmosphere?", 
	answer: "Nitrogen", 
	one: "Nitrogen",
	two: "Carbon",
	three: "Oxygen",
	four:"Hydrogen"}, 

	{question: "Rocks are classified into 3 types: Igneous, sedimentary, and what?", 
	answer: "Metamorphic", 
	one: "Oceanic", 
	two: "Volcanic", 
	three: "Hard", 
	four: "Metamorphic"}, 

	{question: "In classical mechanics, what is defined as the product of an object's mass and velocity?", 
	answer: "Momentum", 
	one: "Kinetic Energy", 
	two: "Momentum", 
	three: "Acceleration", 
	four: "Force"}, 
	
	{question: "Which one of these is not a simple machine?", 
	answer: "Hammer", 
	one: "Pulley", 
	two: "Screw", 
	three: "Hammer", 
	four: "Wedge"}, 
	
	{question: "Where does sound travel fastest?", 
	answer: "Water", 
	one: "Air", 
	two: "Water", 
	three: "Space", 
	four: "Vacuum"}, 
	
	{question: "Approximately how long does it take light from the sun to reach the Earth?", 
	answer: "Eight minutes", 
	one: "Eight seconds", 
	two: "Eight hours", 
	three: "Instantaneous", 
	four: "Eight minutes"}, 
	
	{question: "Mars is often described as the 'Red Planet' because of the prevalence of what element mixed with oxygen on its surface?", 
	answer: "Iron", 
	one: "Iron", 
	two: "Copper", 
	three: "Zinc", 
	four: "Cadmium"}, 

	{question: "Pollen is produced in which part of the flower?", 
	answer: "Stamen", 
	one: "Stamen", 
	two: "Pistil", 
	three: "Pedel", 
	four: "Ovary"}, 
	
	{question: "Bony fish belong to which animal class?", 
	answer: "Osteichthyes", 
	one: "Amphibia", 
	two: "Cnidaria", 
	three: "Osteichthyes", 
	four: "Annelida"}, 
	
	{question: "What does photosynthesis produce?", 
	answer: "Oxygen and Glucose", 
	one: "Water and Sugar", 
	two: "Oxygen and Glucose", 
	three: "Oxygen and Proteins", 
	four: "Water and Oxygen"},

	{question: "How does energy from the sun travel to the Earth?", 
	answer: "Radiation", 
	one: "Conduction", 
	two: "Radiation", 
	three: "Convection", 
	four: "Microwave"},

];

app.gameOver = function(){
	$(".gameOver").fadeIn();
	app.disableButtons();
};

app.replay = function(){
	$(".replay").on("click", function(e){
		e.preventDefault();
    	location.reload();
	})
};

app.win = function(){
	$(".win").fadeIn();
	app.disableButtons();
};

app.countdown = function(){
	seconds = 30;
	timer = setInterval(function(){
		$("p.seconds").html(seconds);
		seconds--;
		if (seconds < 30 && seconds > 5) {
			$(".timer").css("background-color", "white");
		}
		if (seconds < 5 && seconds > 3) {
			$(".timer").css("background-color", "yellow");
		}
		if (seconds < 3 ) {
			$(".timer").css("background-color", "red");
		}
		if (seconds < 0) {
			app.gameOver();
			// window.clearInterval(timer);
			};
	},1000)
};

app.earnings = function(){
	$(".level" + app.earningsCounter).addClass("currentLevel");
};

app.game = function(){
	// console.log(app.counter);
	$("div.question").text(sciQuestions[app.counter].question);
	$("div.answer1").text(sciQuestions[app.counter].one);
	$("div.answer2").text(sciQuestions[app.counter].two);
	$("div.answer3").text(sciQuestions[app.counter].three);
	$("div.answer4").text(sciQuestions[app.counter].four);
};

app.cheat = function(){
	app.cheatAnswer = "";
	var selectAnswer = Math.random(); 

	if (selectAnswer < 0.25) {
		app.cheatAnswer = sciQuestions[app.counter].one;
	} else if (selectAnswer < 0.50) {
		app.cheatAnswer = sciQuestions[app.counter].two;
	} else if (selectAnswer < 0.75) {
		app.cheatAnswer = sciQuestions[app.counter].three;
	} else {
		app.cheatAnswer = sciQuestions[app.counter].four;
	}
};

app.peek = function(){
	app.cheat();
	var peekCheat = "<p>" + app.cheatAnswer + "</p>";
	$("#peek .back").html(peekCheat);

	$("#peek").on("click", function(){
		$("#peek .front").addClass("cheatFront");
		$("#peek .back").addClass("cheatBack");
	})
};

app.copy = function(){
	app.cheat();
	var copyCheat = "<p>" + app.cheatAnswer + "</p>";
	$("#copy .back").html(copyCheat);

	$("#copy").on("click", function(){
		$("#copy .front").addClass("cheatFront");
		$("#copy .back").addClass("cheatBack");
		$("div.answer").removeClass("userAnswer");
		if (app.cheatAnswer === sciQuestions[app.counter].one) {
			$("div.answer1").addClass("userAnswer");
		} else if (app.cheatAnswer === sciQuestions[app.counter].two) {
			$("div.answer2").addClass("userAnswer");
		} else if (app.cheatAnswer === sciQuestions[app.counter].three) {
			$("div.answer3").addClass("userAnswer");
		} else if (app.cheatAnswer === sciQuestions[app.counter].four) {
			$("div.answer4").addClass("userAnswer");
		}
		$("div.answer").off("click");
	})
};

app.usedPeek = function(){
	if ($("#peek .back").hasClass("cheatBack")){
		$("#peek .front").removeClass("cheatFront").addClass("usedCheat");
		$("#peek .back").removeClass("cheatBack");
		$("#peek").off("click");
	}
};

app.usedCopy = function() {
	if ($("#copy .back").hasClass("cheatBack")){
		$("#copy .front").removeClass("cheatFront").addClass("usedCheat");
		$("#copy .back").removeClass("cheatBack");
		$("#copy").off("click");
	}
};

app.quit = function(){
	$(".quitButton").on("click", function(){
		if ( app.earningsCounter === "1" ) {
			// console.log(app.earningsCounter);
			var quitEarnings = "$0";
			$("span.winnings").text(quitEarnings);
			// console.log(quitEarnings);
			$(".quit").fadeIn();
			app.disableButtons();
		} else {
		var quitEarnings = $(".level" + (app.earningsCounter-1)).html();	
		$("span.winnings").text(quitEarnings);
		// console.log(quitEarnings);
		$(".quit").fadeIn();
		app.disableButtons();
		}
	})
};

app.answerHover = function(){
	$("div.answer") 
	.mouseenter(function(){
		$(this).addClass("answerHover");
		if($(this).hasClass("userAnswer")) {
			$(this).removeClass("answerHover");
		}
	})
	.mouseleave(function(){
		$(this).removeClass("answerHover");
	})
};

app.userAnswer = function(){
	$("div.answer").on("click", function(){
		$(this).toggleClass("userAnswer").siblings().removeClass("userAnswer");
		if ($("div.answer").hasClass("userAnswer")) {
			$(this).removeClass("answerHover");
		}
	});
};

app.submitAnswer = function(){
	$("a.submit").on("click", function(event){
		event.preventDefault();
		var userAnswer = $("div.userAnswer").html();
		if ((app.counter === 10) && (userAnswer === sciQuestions[10].answer)){
			$("div.userAnswer").addClass("correctAnswer").removeClass("userAnswer");
			$(".level" + app.earningsCounter).addClass("earned");
			app.win();
		} else if (userAnswer === sciQuestions[app.counter].answer) {
			$("div.userAnswer").addClass("correctAnswer").removeClass("userAnswer");
			$("div.answer").off("click");
			$(".level" + app.earningsCounter).addClass("earned");
			window.clearInterval(timer);
		}  else if ((userAnswer != sciQuestions[app.counter].answer) && ($("div.answer").hasClass("userAnswer"))){
			$("div.userAnswer").addClass("wrongAnswer");
			app.gameOver();
			window.clearInterval(timer);
		}
	});	
};

app.nextQuestion = function(){
	$("a.next").on("click", function(event){
		event.preventDefault();
		app.userAnswer();
		// $("div.answer").on("click", function(){
		// 	$(this).toggleClass("userAnswer").siblings().removeClass("userAnswer");
		// 	if ($("div.answer").hasClass("userAnswer")) {
		// 		$(this).removeClass("answerHover");
		// 	}
		// });
		if ($("div.answer").hasClass("correctAnswer")) {
			// $(this).removeClass("correctAnswer");
			$("div.answer").removeClass("correctAnswer");
			$(".earningsLevel").removeClass(".currentLevel");
			app.usedPeek();
			app.usedCopy();
			app.counter++;
			app.earningsCounter++;
			app.game();
			app.earnings(app.earningsCounter);
			app.peek();
			app.copy();
			window.clearInterval(timer);
			seconds=30;
			app.countdown(seconds);
		} else {
			alert("Please submit an answer first");
		}
	});
};

// app.submitError = function(){
// 	$(".submitAnswer").fadeIn();
// 	$(".submitAnswer").addClass("show")
// 	$(".closeSubmitAnswer").on("click", function(){
// 		// $(".submitAnswer").fadeOut();
// 		$(".submitAnswer").removeClass("show")
// 		app.userAnswer();
// 	})
// }

app.disableButtons = function(){
	$("div.answer").off("click");
	$(".cheat").off("click");
	$(".quitButton").off("click");
	// $("a.next").off("click");
	$("a.next").on("click", function(e){
		e.preventDefault();
		return false;
	});
	$("a.submit").on("click", function(){
		return false;
	});
	window.clearInterval(timer);
};

app.startGame = function() {
	$(".begin").on("click", function(e){
		$(".how-to").hide();
		e.preventDefault();
		app.countdown();
		app.earnings();
		app.cheat();
		app.peek();
		app.copy();
		app.quit();
		app.answerHover();
		app.userAnswer();
		app.submitAnswer();
		app.nextQuestion();
		app.game();
		app.replay();
	})
};

app.init = function(){
	app.startGame();
};

$(function() { // begin document ready
	app.init();	  
}); // end document ready


	