let questionContainer = document.getElementById('quizQuestion');
let btn = document.getElementById('btn');
let continentArray = ['Africa', 'Asia', 'South America', 'North America', 'Europe', 'Oceania', 'Antarctica'];

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
    let randomContinent1 = continentArray[Math.floor(Math.random() * continentArray.length)];
    let randomContinent2 = continentArray[Math.floor(Math.random() * continentArray.length)];
    console.log(randomContinent1, randomContinent2);

    if ((randomObject.continent !== randomContinent1) && (randomObject.continent !== randomContinent2) && (randomContinent1 !== randomContinent2)) {
        htmlString = `<img src = "${randomObject.image}"> 
                      <p class = "correct">${randomObject.continent} <i class="fas fa-check fa-2x"></i></p> 
                      <p class = "incorrect">${randomContinent1} <i class="fas fa-times fa-2x"></i></p> 
                      <p class = "incorrect">${randomContinent2} <i class="fas fa-times fa-2x"></i></p>`
        questionContainer.innerHTML = htmlString;// +=ispisuje sva pitanja koliko god puta pritisnem dugme
    }else {
        return;
    }

    let correctAnswer = document.querySelector('.correct');
let incorrectAnswer = document.querySelector('.incorrect');

correctAnswer.addEventListener('click', function() {
    document.querySelector('.fa-check').style = ' visibility: visible;';
    document.querySelector('.fa-times').setAttribute('disabled', true);
});

incorrectAnswer.addEventListener('click', function() {
    document.querySelector('.fa-times').style = ' visibility: visible;';
    document.querySelector('.fa-check').setAttribute('disabled', true);
});
}


