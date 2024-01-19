let listOfDrawndNumbers = [];
let maxNumber = 10;
let secretNumber = createAleatoryNumber();
let attempts = 1;

function showTextOnScreen(tag, text) {
    let field = document.querySelector(tag);
    field.innerHTML = text;
    responsiveVoice.speak(text, 'US English Female', {rate:1.2});
}

function showInitialMessage() {
    showTextOnScreen('h1', 'Game of Secret Number');
    showTextOnScreen('p', 'Escolha um número entre 1 e 10');    
}

showInitialMessage();

function verifyGuess() {
    let userKick = document.querySelector('input').value;
    
    if (userKick == secretNumber) {
        showTextOnScreen('h1', 'Acertou!');
        let attemptWord = attempts > 1 ? 'tentativas' : 'tentativa';
        let attemptsMessage = `Você acertou o número secreto com ${attempts} ${attemptWord}`;
        showTextOnScreen('p', attemptsMessage);
        document.getElementById('restart').removeAttribute('disabled');
    } else {
        if (userKick > secretNumber) {
            showTextOnScreen('p', 'O número secreto é menor');
        } else {
            showTextOnScreen('p', 'O número secreto é maior');
        }
        attempts++;
        cleanField();
    }
}

function createAleatoryNumber() {
    let chosenNumber = parseInt(Math.random() * maxNumber + 1);
    let numberOfListElement = listOfDrawndNumbers.length;

    if (numberOfListElement == maxNumber) {
        listOfDrawndNumbers = [];
    }

    if (listOfDrawndNumbers.includes(chosenNumber)) {
        return createAleatoryNumber();
    } else {
        listOfDrawndNumbers.push(chosenNumber);
        console.log(listOfDrawndNumbers);
        return chosenNumber;
    }
}

function cleanField() {
    userKick = document.querySelector('input');
    userKick.value = '';
}

function restartGame() {
    secretNumber = createAleatoryNumber();
    cleanField();
    attempts = 1;
    showInitialMessage();
    document.getElementById('restart').setAttribute('disabled', true);
}