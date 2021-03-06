//HTML obtained constants
const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answerContainerIndicator = document.querySelector(".question-indicator");
const homeBox = document.querySelector(".home");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".results");
const timer1 = document.querySelector(".timer");
const backColor = document.getElementById('backColor')
const topResults = document.querySelector(".top");

//Question levels constants
const level1 = quiz1;
const level2 = quiz2;
const level3 = quiz3;
const level4 = quiz4;
const level5 = quiz5;

//Variables 
let questionCounter = 0;
let actualQuestion;
let availableQuestion = [];
let availableOption = [];
let rightAnswer=0;
let attemps = 1;
let level = 1;
let wrongAnswer = 0;
let quota = 200000;
let stopCounter = 6;
let names = [];
let prizes = [];

// Questions counter
function getNewQuestion(){
	// Question number
	questionNumber.innerHTML = "Pregunta " + (questionCounter + 1) + " de " + quiz1.length;
	// Get ramdomized question
	const questionIndex = availableQuestion[Math.floor(Math.random() * availableQuestion.length)]
	actualQuestion = questionIndex;
	questionText.innerHTML = actualQuestion.question;
	// Get array index position
	const index1 = availableQuestion.indexOf(questionIndex);
	// Remove the index question from the available questions array, the question will not be repeated
	availableQuestion.splice(index1,1);
	const optLen = actualQuestion.options.length
	// Push the options in the available questions array.
	for(let i=0;i<optLen; i++){
		availableOption.push(i);
	}
	// Create the options
	optionContainer.innerHTML = '';
	let animation = 0.2;
	// Create the options in HTML
	for(let i=0;i<optLen;i++){
		// Random option
		const optionIndex = availableOption[Math.floor(Math.random() * availableOption.length)];
		// Get 'optionIndex' from 'availableOption'
		const index2 = availableOption.indexOf(optionIndex);
		// Remove 'optionIndex' from 'availableQuestion', The option will not be repeated
		availableOption.splice(index2,1);
		const option = document.createElement("div");
		option.innerHTML = actualQuestion.options[optionIndex];
		option.id = optionIndex;
		option.style.animationDelay = animation + 's';
		animation = animation + 0.5;
		option.className = "option";
		optionContainer.appendChild(option)
		option.setAttribute("onclick","getResult(this)");
	}
	questionCounter++;
}
function getResult(element){
	const id = parseInt(element.id);
	if(id===actualQuestion.answer){
		// Change to green the right option and put a check mark
		element.classList.add("correct");
		updateAnswerIndicator("correct");
		rightAnswer++;
		level++;
		levelUp();

	}
	else{	
		//  Change to red the wrong option and put a check mark
		element.classList.add("wrong");
		updateAnswerIndicator("wrong");
		wrongAnswer++;
	}
	gameOver();
	stopClick();	
}
// No more options can be chosen
function stopClick(){
	const optLen = optionContainer.children.length;
	for(let i=0;i<optLen;i++){
		optionContainer.children[i].classList.add("answered");
	}
}
// Answer indicator
function answerIndicator(){
	answerContainerIndicator.innerHTML = '';
	const totalPregunta = quiz1.length;
	for(let i=0;i<totalPregunta;i++){
		const indicador = document.createElement("div");
		answerContainerIndicator.appendChild(indicador);
	}
}
function updateAnswerIndicator(markType){
	answerContainerIndicator.children[questionCounter-1].classList.add(markType);
}
// Next button function 
function next(){
	if(questionCounter === quiz1.length){
		quizEnd();
	} else{	
		getNewQuestion();
	}
}
function quizEnd(){
	// Hide the quiz box
	quizBox.classList.add("hide");
	// Show the results box
	resultBox.classList.remove("hide");
	swal("Felicitaciones! ", "Haz ganado el premio mayor"); 
	initConfetti();
	render();
	setTimeout(function(){
		canvas.parentNode.removeChild(canvas);
	},4000);
	quizResult();
}

// Get results
function quizResult(){
	resultBox.querySelector(".total-questions").innerHTML = quiz1.length;
	resultBox.querySelector(".total-attempts").innerHTML = attemps;
	const profits = rightAnswer * quota;
	prizes.push(profits);
	savePrize();
	resultBox.querySelector(".total-profits").innerHTML = "$ " + profits;
	resultBox.querySelector(".total-score").innerHTML = rightAnswer + " / " + quiz1.length;
	level=1;
	questionCounter=0;
	wrongAnswer=0;
}

// BOTON DE RENDIRSE
function giveUp(){	
	quizBox.classList.add("hide");
	resultBox.classList.remove("hide");
	savePrize();
	quizResult();
	swal("ohhh! ", "Rendirse tambi??n vale, intenta de nuevo"); 	
}

function returnToHome(){
	let resetAttemps = attemps;
	if(resetAttemps === 5){
		attemps=1;
		names = [];
		prizes = [];
	}else{attemps++;}
	resultBox.classList.add("hide");
	// OCULTA EL TOP FIVE
	topResults.classList.add("hide");
	// CAJA DE PREGUNTAS
	homeBox.classList.remove("hide");
	questionCounter = 0;
	rightAnswer=0;	
	level=1;
}
// FINALIZA EL JUEGO AL DAR CLICK EN LA PREGUNTA ERRONEA
function gameOver(){
	if(wrongAnswer === 1){
		swal("Oops! Pregunta Incorrecta, intenta de nuevo");
		rightAnswer = 0;
		quota = 200000;
		wrongAnswer = 0;
		questionCounter=0;
		setTimeout('document.location.reload()',1500);
		
	}
}
function topFive(){
	topResults.classList.remove("hide");
}

function showTop(){
	switch(attemps){
		case 1:
			topUsers1.innerHTML = names[0];
			break;
		case 2:
			topUsers2.innerHTML = names[1];
			break;
		case 3:
			topUsers3.innerHTML = names[2];
			break;
		case 4:
			topUsers4.innerHTML = names[3];
			break;
		case 5:
			topUsers5.innerHTML = names[4];
			break;
	}
}

function savePrize(){
	switch(attemps){
		case 1:
			topPrize1.innerHTML = prizes[0] + " $";
			break;
		case 2:
			topPrize2.innerHTML = prizes[1] + " $";
			break;
		case 3:
			topPrize3.innerHTML = prizes[2] + " $";
			break;
		case 4:
			topPrize4.innerHTML = prizes[3] + " $";
			break;
		case 5:
			topPrize5.innerHTML = prizes[4] + " $";
			break;
	}
}

function startQuiz(){

	var txtValue = document.getElementById("txtName").value;
	names.push(txtValue);
	showTop();
	gameOver();
	// Hide the home box
	homeBox.classList.add("hide");
	// Show the quiz box
	quizBox.classList.remove("hide");
	// Change all the array questions
	levelUp();
	// Get new question
	getNewQuestion();
	// Create answer indicator
	answerIndicator();
}

// Push the available questions in the array
function levelUp(){
	const category = level1.length;
	availableQuestion = [];
	switch(level){
		case 1:
			for(let i=0;i<category;i++){
				availableQuestion.push(level1[i]);
				}
			break;
		case 2:
			for(let i=0;i<category;i++){
				availableQuestion.push(level2[i]);
			}
			break;
		case 3:
			for(let i=0;i<category;i++){
				availableQuestion.push(level3[i]);
				}
			break;
		case 4:
			for(let i=0;i<category;i++){
				availableQuestion.push(level4[i]);
				}
			break;
		case 5:
			for(let i=0;i<category;i++){
				availableQuestion.push(level5[i]);
				}
			break;
	}
}

//confeti
//-----------Var Inits--------------
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
cx = ctx.canvas.width / 2;
cy = ctx.canvas.height / 2;

let confetti = [];
const confettiCount = 300;
const gravity = 0.5;
const terminalVelocity = 5;
const drag = 0.075;
const colors = [
{ front: 'red', back: 'darkred' },
{ front: 'green', back: 'darkgreen' },
{ front: 'blue', back: 'darkblue' },
{ front: 'yellow', back: 'darkyellow' },
{ front: 'orange', back: 'darkorange' },
{ front: 'pink', back: 'darkpink' },
{ front: 'purple', back: 'darkpurple' },
{ front: 'turquoise', back: 'darkturquoise' }];


//-----------Functions--------------
resizeCanvas = () => {
	canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cx = ctx.canvas.width / 2;
  cy = ctx.canvas.height / 2;
};

// resize to 0
closeCanvas = () => {
  canvas.width = 0;
  canvas.height = 0;
  canvas.x = 0;
  canvas.y = 0;
};

randomRange = (min, max) => Math.random() * (max - min) + min;

initConfetti = () => {
  for (let i = 0; i < confettiCount; i++) {
    confetti.push({
      color: colors[Math.floor(randomRange(0, colors.length))],
      dimensions: {
        x: randomRange(10, 20),
        y: randomRange(10, 30) },

      position: {
        x: randomRange(0, canvas.width),
        y: canvas.height - 1 },

      rotation: randomRange(0, 2 * Math.PI),
      scale: {
        x: 1,
        y: 1 },

      velocity: {
        x: randomRange(-25, 25),
        y: randomRange(0, -50) } });
  }
};

//---------Render-----------
render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confetti.forEach((confetto, index) => {
    let width = confetto.dimensions.x * confetto.scale.x;
    let height = confetto.dimensions.y * confetto.scale.y;

    // Move canvas to position and rotate
    ctx.translate(confetto.position.x, confetto.position.y);
    ctx.rotate(confetto.rotation);

    // Apply forces to velocity
    confetto.velocity.x -= confetto.velocity.x * drag;
    confetto.velocity.y = Math.min(confetto.velocity.y + gravity, terminalVelocity);
    confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();

    // Set position
    confetto.position.x += confetto.velocity.x;
    confetto.position.y += confetto.velocity.y;

    // Delete confetti when out of frame
    if (confetto.position.y >= canvas.height) confetti.splice(index, 1);

    // Loop confetto x position
    if (confetto.position.x > canvas.width) confetto.position.x = 0;
    if (confetto.position.x < 0) confetto.position.x = canvas.width;

    // Spin confetto by scaling y
    confetto.scale.y = Math.cos(confetto.position.y * 0.1);
    ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;

    // Draw confetti
    ctx.fillRect(-width / 2, -height / 2, width, height);

    // Reset transform matrix
    ctx.setTransform(1, 0, 0, 1, 0, 0);
});

window.requestAnimationFrame(render);

};

//----------Resize----------
window.addEventListener('resize', function () {
  resizeCanvas();
});
