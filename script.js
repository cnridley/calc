// wait for the DOM to finish loading before running the game
//Get the button elements and add event listeners to them.
document.addEventListener("DOMContentLoade", function() {
    let buttons = document.getElementsByTagName('button'); //collects all buttons in HTML doc. 

    for (let button of buttons){
        button.addEventListener('click', function() {
            if(this.getAttribute('data-type') == "submit"){ //'this' refers to the button that was clicked.
                alert('You Clickec Submit!');
            } else {
                let gameType = this.getAttribute('data-type');
                alert(`You clicked ${gameType}`);
            }
        })
    }


})

// function runGame() {

// }

// function checkAnswer()

// function calculateCorrectAnswer()

// function incrementScore()

// function incrementWrongAnswer()

// function displayAdditionQuestion()

