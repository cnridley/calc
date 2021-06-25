// wait for the DOM to finish loading before running the game
//Get the button elements and add event listeners to them.
document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName('button'); //collects all buttons in HTML doc. 

    for (let button of buttons){
        button.addEventListener('click', function() {
            if(this.getAttribute('data-type') == "submit"){ //'this' refers to the button that was clicked.
                checkAnswer();
            } else {
                let gameType = this.getAttribute('data-type');
                runGame(gameType);
            }
        })
    }
    document.getElementById('answer-box').addEventListener('keydown', function(event){
        if (event.key === "Enter"){
            checkAnswer();
        }
    })
    runGame("addition");

})

function runGame(gameType) {
    //Generate a random number between 1 and 25 
    document.getElementById('answer-box').value = "";
    document.getElementById('answer-box').focus();

    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === 'addition'){
        displayAdditionQuestion(num1, num2);
    } else if (gameType === 'multiply'){
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === 'subtract'){
        displaySubtractQuestion(num1, num2);
    } else if (gameType === 'division'){
        displayDivideQuestion(num1, num2);
    } else {
        alert(`unknown game type ${gameType}`);
        throw `unknown game type ${gameType}`;
    }
}

function checkAnswer() {

    //check the answer against the first element in the calculateCorrectAnswer array. 

    let userAnswer = parseInt(document.getElementById('answer-box').value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect){
        alert ('CORRECT!');
        incrementScore();
    } else {
        alert(`Ooops, you put ${userAnswer}, the correct answer is ${calculatedAnswer[0]}`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);
}

function calculateCorrectAnswer(){
    // gets the operands and operator directly from the DOM

    //when collecting data from the DOM JS returms as a string. use parseInt to change to number.
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if (operator === '+'){
        return [operand1 + operand2, "addition"];
    } else if (operator === 'x'){
        return [operand1 * operand2, "multiply"];
    } else if (operator === '-'){
        return [operand1 - operand2, "subtract"];
    } else if (operator === '/'){
        return [Math.round(operand1 / operand2), "division"];
    } else {
        alert(`unimplemented operator ${operator}`);
        throw `unimplemented operator ${operator}, aborting!`
    }
}

function incrementScore() {
    //gets current score and increments it if correct. 
    let oldScore = parseInt(document.getElementById('score').innerText);
    document.getElementById('score').innerText = ++oldScore;

}

function incrementWrongAnswer() {
    //gets current score and decrements it if correct. 
    let oldScore = parseInt(document.getElementById('incorrect').innerText);
    document.getElementById('incorrect').innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x";
}

function displaySubtractQuestion(operand1, operand2){
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;;
    document.getElementById('operator').textContent = "-";
}

function displayDivideQuestion(operand1, operand2){
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;;
    document.getElementById('operator').textContent = "/";
}
