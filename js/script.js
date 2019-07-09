let questionContainer = document.getElementById('quizQuestion');
let btn = document.getElementById('btn');
let finish = document.getElementById('finish');
let continentArray = ['Africa', 'Asia', 'South America', 'North America', 'Europe', 'Oceania', 'Antarctica'];
let counter = 0;

//na klik dohvata JSON parsira ga i pokrece f-ju za ispisivanje
btn.addEventListener('click', function () {
    const myRequest = new XMLHttpRequest();

    myRequest.open('GET', 'https://api.myjson.com/bins/a6da9');
    myRequest.onload = function () {
        let myData = JSON.parse(myRequest.responseText);

        displayQuestion(myData);
    }

    myRequest.send();
});

//f-ja za ispisivanje
function displayQuestion(data) {
    let htmlString = '';

    let randomObject = data[Math.floor(Math.random() * data.length)];
    console.log(randomObject);
    let shuffledContinetArray = shuffle(continentArray);
    console.log(shuffledContinetArray);
    let newContinetArray = [];
    if (shuffledContinetArray[0] === randomObject.continent) {
        
        newContinetArray.splice(0, 0, `<button type = "button" class = "incorrect">${shuffledContinetArray[1]} <i class="fas fa-times "></i></button>`, 
                                      `<button type = "button" class = "incorrect">${shuffledContinetArray[2]} <i class="fas fa-times "></i></button>`, 
                                      `<button type = "button" class = "correct">${randomObject.continent} <i class="fas fa-check "></i></button>`);
        let shuffledNewContinentArray = shuffle(newContinetArray);
        
        htmlString = `<img src = "${randomObject.image}"> 
                     ${shuffledNewContinentArray[0]} 
                     ${shuffledNewContinentArray[1]}
                     ${shuffledNewContinentArray[2]}
                     <input type = "text" id = "score" value = "">`
        questionContainer.innerHTML = htmlString;
    
    } else if (shuffledContinetArray[1] === randomObject.continent) {
        
        newContinetArray.splice(0, 0, `<button type = "button" class = "incorrect">${shuffledContinetArray[0]} <i class="fas fa-times "></i></button>`, 
                                      `<button type = "button" class = "incorrect">${shuffledContinetArray[2]} <i class="fas fa-times "></i></button>`, 
                                      `<button type = "button" class = "correct">${randomObject.continent} <i class="fas fa-check "></i></button>`);
        
        let shuffledNewContinentArray = shuffle(newContinetArray);
        
        htmlString = `<img src = "${randomObject.image}"> 
                     ${shuffledNewContinentArray[0]} 
                     ${shuffledNewContinentArray[1]}
                     ${shuffledNewContinentArray[2]}
                     <input type = "text" id = "score" value = "">`
        questionContainer.innerHTML = htmlString;
    
    } else {
        
        newContinetArray.splice(0, 0, `<button type = "button" class = "incorrect">${shuffledContinetArray[0]} <i class="fas fa-times "></i></button>`, 
                                      `<button type = "button" class = "incorrect">${shuffledContinetArray[1]} <i class="fas fa-times "></i></button>`, 
                                      `<button type = "button" class = "correct">${randomObject.continent} <i class="fas fa-check "></i></button>`);
        
        let shuffledNewContinentArray = shuffle(newContinetArray);
        
        htmlString = `<img src = "${randomObject.image}"> 
                     ${shuffledNewContinentArray[0]} 
                     ${shuffledNewContinentArray[1]}
                     ${shuffledNewContinentArray[2]}
                     <input type = "text" id = "score" value = "">`
        questionContainer.innerHTML = htmlString;
    }

    let correctAnswer = document.querySelector('.correct');
    let incorrectAnswer = document.querySelector('.incorrect');

    correctAnswer.addEventListener('click', function () {
        addScore(correctAnswer);
        document.querySelector('.fa-check').style = ' visibility: visible;';
    });

    incorrectAnswer.addEventListener('click', function () {
        document.querySelector('.fa-times').style = ' visibility: visible;';
    });

    document.getElementById('score').value = counter;
}

// f-ja za nasumicno redjanje elemenata niza
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

//f-ja za dodavanje rezultata
function addScore(x) {
    
    if (x.className === 'correct') {
        counter += 750;
    }
    document.getElementById('score').value = counter;
}

// na klik dodaje finalni rezultat u local storage
finish.addEventListener('click', function() {
    let finalScore = document.getElementById('score').value;
    saveScore(finalScore);
    showScore();
    counter = 0;
})

// f-ja za dodavanje rezultata u local storage
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

// f-ja za prikazivanje rezultata
function showScore() {
    const scoreList = JSON.parse(localStorage.getItem('listOfScores'));
    if (scoreList) {
        const sortedList = scoreList.sort((a, b) => b - a);
        let scoreTableHtml = `<table><tr><td><span>#1</span></i>${sortedList[0]}</td></tr>
                                 <tr><td><span>#2</span></i>${sortedList[1]}</td></tr>
                                 <tr><td><span>#3</span></i>${sortedList[2]}</td></tr>`;
        document.getElementById('quizQuestion').innerHTML = scoreTableHtml;
    } else {
        document.getElementById('quizQuestion').innerHTML = `<p>You don't have any score!</p>`;
    }
}

showScore();
