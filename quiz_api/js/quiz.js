let correctAnswer,
correctNumber = (localStorage.getItem('quiz_game_correct') ? localStorage.getItem('quiz_game_correct') : 0),
incorrectNumber = (localStorage.getItem('quiz_game_incorrect') ? localStorage.getItem('quiz_game_incorrect') : 0);;

document.addEventListener('DOMContentLoaded', function(){
    loadQuestions();
    eventListners()
})

const eventListners = () => {
    document.querySelector('#check-answer').addEventListener('click', validateAnswer)
    document.querySelector('#clear-storage').addEventListener('click', clearResult)
}

function loadQuestions(){
    const url = 'https://opentdb.com/api.php?amount=1'
    fetch(url)
    .then(data => data.json())
    .then(result => displayQuestions(result.results));
}


displayQuestions = (questions) => {



    const questionHTML = document.createElement('div');
    questionHTML.classList.add('col-12');

    questions.forEach(question => {
        // Read correct answer
        correctAnswer = question.correct_answer

        // injecting correct in al possible answers
        let possibleAnswer = question.incorrect_answers;
        possibleAnswer.splice(Math.floor(Math.random() * 3), 0, correctAnswer)

        // Questions for HTML...

        questionHTML.innerHTML = `
        <div class = 'row justify-content-between heading'> 
            <p class='text-center'>Category : ${question.category}</p>
            <div class="totals">
                <span class="badge badge-success">${correctNumber}</span>
                <span class="badge badge-danger">${incorrectNumber}</span>
            </div>
            </div>
        <h1 class = 'text-center'> ${question.question}`


        // generate the HTML for answers...
        const answerDiv = document.createElement('div');
        answerDiv.classList.add('questions', 'row', 'justify-content-around', 'mt-4');
        possibleAnswer.forEach((answer) => {
            const answerHtml = document.createElement('li');
            answerHtml.classList.add('col-12', 'col-md-5');
            answerHtml.textContent = answer;
            answerHtml.onclick = selectAnswer;
            answerDiv.appendChild(answerHtml)
        })
        questionHTML.appendChild(answerDiv);
        document.querySelector('#app').appendChild(questionHTML);
    });
}


selectAnswer = (e) =>{

    if(document.querySelector('.active')){
        const activeAnswer = document.querySelector('.active');
        activeAnswer.classList.remove('active');
    };
    e.target.classList.add('active')
}


validateAnswer = () =>{
    if(document.querySelector('.questions .active')){
        checkAnswer()
    } else{
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('alert', 'alert-danger', 'col-md-6');
        errorDiv.textContent = 'please selece 1 answer'
        const questionDiv = document.querySelector('.questions');
        questionDiv.appendChild(errorDiv);

        setTimeout(() => {
            document.querySelector('.alert-danger').remove();
       }, 1000);
        
    }
}

// chekc the answers


checkAnswer = () => {
    const userAnswer = document.querySelector('.questions .active');
    console.log(userAnswer.textContent)
    if(userAnswer.textContent === correctAnswer){
        correctNumber++;
    }else{
        incorrectNumber++;
    }


    saveIntoStorage();

    const app = document.querySelector('#app');
    while(app.firstChild){
        app.removeChild(app.firstChild);
    }


    loadQuestions()
}

    saveIntoStorage = () => {
        localStorage.setItem('quiz_game_correct', correctNumber);
        localStorage.setItem('quiz_game_incorrect', incorrectNumber);
    }



clearResult = () =>{
        localStorage.setItem('quiz_game_correct', 0);
        localStorage.setItem('quiz_game_incorrect', 0);


        setTimeout(() =>{
            window.location.reload()
        },100)
}    