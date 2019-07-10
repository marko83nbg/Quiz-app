let questionContainer = document.getElementById('quizQuestion');
let btn = document.getElementById('btn');
let finish = document.getElementById('finish');
let continentArray = ['Africa', 'Asia', 'South America', 'North America', 'Europe', 'Oceania', 'Antarctica'];
let scoreCounter = 0;
let questionCounter = 1;

//na klik dohvata JSON parsira ga i pokrece f-ju za ispisivanje - on click parses JSON
btn.addEventListener('click', function () {
    const myRequest = new XMLHttpRequest();

    myRequest.open('GET', 'https://api.myjson.com/bins/a6da9');
    myRequest.onload = function () {
        let myData = JSON.parse(myRequest.responseText);

        displayQuestion(myData);
    }

    myRequest.send();
});

//f-ja za ispisivanje - function for displaying questions
function displayQuestion(data) {

    if (questionCounter <= 5) {
        btn.innerText = `NEXT`
        let htmlString = '';

        let randomObject = data[Math.floor(Math.random() * data.length)];
        let shuffledContinetArray = shuffle(continentArray);
        let newContinetArray = [];
        if (shuffledContinetArray[0] === randomObject.continent) {

            newContinetArray.splice(0, 0, `<button type = "button" class = "incorrect">${shuffledContinetArray[1]} <i class="fas fa-times "></i></button>`,
                `<button type = "button" class = "incorrect1">${shuffledContinetArray[2]} <i class="fas fa-times "></i></button>`,
                `<button type = "button" class = "correct">${randomObject.continent} <i class="fas fa-check "></i></button>`);
            let shuffledNewContinentArray = shuffle(newContinetArray);

            htmlString = `<h2> Question ${questionCounter} of 5 </h2>
                     <img src = "${randomObject.image}"> 
                     ${shuffledNewContinentArray[0]} 
                     ${shuffledNewContinentArray[1]}
                     ${shuffledNewContinentArray[2]}
                     <input type = "text" id = "score" value = "">`
            questionContainer.innerHTML = htmlString;

        } else if (shuffledContinetArray[1] === randomObject.continent) {

            newContinetArray.splice(0, 0, `<button type = "button" class = "incorrect">${shuffledContinetArray[0]} <i class="fas fa-times "></i></button>`,
                `<button type = "button" class = "incorrect1">${shuffledContinetArray[2]} <i class="fas fa-times "></i></button>`,
                `<button type = "button" class = "correct">${randomObject.continent} <i class="fas fa-check "></i></button>`);

            let shuffledNewContinentArray = shuffle(newContinetArray);

            htmlString = `<h2> Question ${questionCounter} of 5 </h2>
                     <img src = "${randomObject.image}"> 
                     ${shuffledNewContinentArray[0]} 
                     ${shuffledNewContinentArray[1]}
                     ${shuffledNewContinentArray[2]}
                     <input type = "text" id = "score" value = "">`
            questionContainer.innerHTML = htmlString;

        } else {

            newContinetArray.splice(0, 0, `<button type = "button" class = "incorrect">${shuffledContinetArray[0]} <i class="fas fa-times "></i></button>`,
                `<button type = "button" class = "incorrect1">${shuffledContinetArray[1]} <i class="fas fa-times "></i></button>`,
                `<button type = "button" class = "correct">${randomObject.continent} <i class="fas fa-check "></i></button>`);

            let shuffledNewContinentArray = shuffle(newContinetArray);

            htmlString = `<h2> Question ${questionCounter} of 5 </h2>
                     <img src = "${randomObject.image}"> 
                     ${shuffledNewContinentArray[0]} 
                     ${shuffledNewContinentArray[1]}
                     ${shuffledNewContinentArray[2]}
                     <input type = "text" id = "score" value = "">`
            questionContainer.innerHTML = htmlString;
        }

        let correctAnswer = document.querySelector('.correct');
        let incorrectAnswer = document.querySelector('.incorrect');
        let incorrectAnswer1 = document.querySelector('.incorrect1');
        
        correctAnswer.addEventListener('click', function () {
            addScore(correctAnswer);
            document.querySelector('.fa-check').style = ' visibility: visible;';
            incorrectAnswer.disabled = true;
            incorrectAnswer1.disabled = true;
            correctAnswer.disabled = true;
            correctAnswer.style = 'background: rgb(255, 187, 0);'
        });

        incorrectAnswer.addEventListener('click', function () {
            document.querySelector('.incorrect .fa-times').style = ' visibility: visible;';
            incorrectAnswer1.disabled = true;
            incorrectAnswer.disabled = true;
            correctAnswer.disabled = true;
            incorrectAnswer.style = 'background: rgb(255, 187, 0);'
            document.querySelector('.fa-check').style = ' visibility: visible;';
        });

        incorrectAnswer1.addEventListener('click', function () {
            document.querySelector('.incorrect1 .fa-times').style = ' visibility: visible;';
            incorrectAnswer1.disabled = true;
            incorrectAnswer.disabled = true;
            correctAnswer.disabled = true;
            incorrectAnswer1.style = 'background: rgb(255, 187, 0);'
            document.querySelector('.fa-check').style = ' visibility: visible;';
        });

        document.getElementById('score').value = scoreCounter;
        
        questionCounter++;
    } else {
        finish.style = 'display: inline';
        btn.style = 'display:none'
        questionContainer.innerHTML = `<h2> Your score is ${scoreCounter} pts </h2>`;
        // na klik dodaje finalni rezultat u local storage - on click adds final result to local storage
        finish.addEventListener('click', function () {
            let finalScore = scoreCounter;
            saveScore(finalScore);
            showScore();
            scoreCounter = 0;
            btn.style = 'display:inline';
            finish.style = 'display: none';
            questionCounter = 1;
            btn.innerText = `Play`;
        })
    }
}


// f-ja za nasumicno redjanje elemenata niza - function for shuffle array
function shuffle(arra1) {
    var ctr = arra1.length, temp, index;

    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}

//f-ja za dodavanje rezultata - function for adding score
function addScore(x) {
    
    if (x.className === 'correct') {
        scoreCounter += 750;
    }
    document.getElementById('score').value = scoreCounter;
}

// f-ja za dodavanje rezultata u local storage - function for adding final score to local storage
function saveScore(y) {
    let scoreList = [];
    const newScore = y;

    if (localStorage.getItem('listOfScores')) {
        scoreList = JSON.parse(localStorage.getItem('listOfScores'));

        scoreList.push(newScore);
        localStorage.setItem('listOfScores', JSON.stringify(scoreList));
    }else {
        scoreList.push(newScore);
        localStorage.setItem('listOfScores', JSON.stringify(scoreList));
    }
}

// f-ja za prikazivanje rezultata - function for displaying results
function showScore() {
    const scoreList = JSON.parse(localStorage.getItem('listOfScores'));
    if (scoreList) {
        const sortedList = scoreList.sort((a, b) => b - a);
        if (sortedList[1] === undefined) {
            let scoreTableHtml = `<h1>Youre Score</h1>
                              <table><tr><td><span>#1</span></i>${sortedList[0]} pts</td></tr>
                              <tr><td><span>#2</span></i>No pts</td></tr>
                              <tr><td><span>#3</span></i>No pts</td></tr>`;
            document.getElementById('quizQuestion').innerHTML = scoreTableHtml;
        } else if (sortedList[2] === undefined) {
            let scoreTableHtml = `<h1>Youre Score</h1>
                              <table><tr><td><span>#1</span></i>${sortedList[0]} pts</td></tr>
                              <tr><td><span>#2</span></i>${sortedList[1]} pts</td></tr>
                              <tr><td><span>#3</span></i>No pts</td></tr>`;
            document.getElementById('quizQuestion').innerHTML = scoreTableHtml;
        } else {
            let scoreTableHtml = `<h1>Youre Score</h1>
                                <table><tr><td><span>#1</span></i>${sortedList[0]} pts</td></tr>
                                <tr><td><span>#2</span></i>${sortedList[1]} pts</td></tr>
                                <tr><td><span>#3</span></i>${sortedList[2]} pts</td></tr>`;
            document.getElementById('quizQuestion').innerHTML = scoreTableHtml;
        }

    } else {
        document.getElementById('quizQuestion').innerHTML = `<h1>You don't have any score!</h1>`;
    }
}

showScore();
