const question = document.getElementById('question') // to select the question element from html file and change it by Javascript file
const choices = Array.from(document.getElementsByClassName('choice-text')) //creates a constant variable choices that holds an array of all elements in the document with the class name choice-text. so You can manipulate this array using standard array methods
const progressText = document.getElementById('progressText') //Declaration of a Constant to accesses the <div> element with the id of progressText and changes its text content to reflect some progress.
const scoreText = document.getElementById('score') //Declaration of a Constant to accesses the <div> element with the id of score and changes its content to reflect the score after answer each question.
const progressBarFull = document.getElementById('progressBarFull') //Declaration of a Constant to accesses the <div> element with the id of progressBarFull and changes its content to reflect the progress bar after answer each question.
let currentQuestion = {} //Declaration of a variable with empty object to put the question inside it
let acceptingAnswers = false //Declaration of a variable with boolean value false to ensuring that user inputs are only processed at the right times
let score = 0 //Declaration of a variable to score and to make it increase as correct answer achieved
let questionCounter = 0 //Declaration of a variable to question counter start with 0 to make it increase as correct answer achieved
let availableQuestions = [] //declares a variable named availableQuestions that is intended to hold an array of questions

const questions = [
  {
    question: 'What does HTML stand for?',
    choice1: 'Hyper Trainer Markup Language',
    choice2: 'Hyper Text Markup Language',
    choice3: 'High-Level Text Markup Language',
    choice4: 'Hyper Text Markup Loop',
    answer: 2
  },
  {
    question: "Which tag is used to define an HTML document's heading?",
    choice1: '<head>',
    choice2: '<h1> to <h6>',
    choice3: '<title>',
    choice4: '<header>',
    answer: 2
  },
  {
    question:
      'Which of the following is a valid HTML element for creating a hyperlink?',
    choice1: '<link>',
    choice2: '<a>',
    choice3: '<href>',
    choice4: '<url>',
    answer: 2
  },
  {
    question:
      'Which property is used to change the background color of an element in CSS?',
    choice1: 'bg-color',
    choice2: 'background-color',
    choice3: 'color-background',
    choice4: 'background',
    answer: 2
  },
  {
    question:
      'Which CSS selector is used to select an element with a specific id?',
    choice1: '.id',
    choice2: '#id',
    choice3: '*id',
    choice4: 'id',
    answer: 2
  },
  {
    question: 'How do you apply a CSS style to all <p> elements on a webpage?',
    choice1: 'p { }',
    choice2: 'all p { }',
    choice3: '*p { }',
    choice4: '<p> { }',
    answer: 1
  },
  {
    question:
      'Which of the following is the correct way to define a variable in JavaScript?',
    choice1: 'let age = 30;',
    choice2: 'variable myVariable;',
    choice3: 'myVariable: var;',
    choice4: 'myVariable = var;',
    answer: 1
  },
  {
    question: 'How do you write a comment in JavaScript?',
    choice1: '// This is a comment',
    choice2: '/* This is a comment */',
    choice3: '# This is a comment',
    choice4: 'Both a and b',
    answer: 4
  },
  {
    question:
      'Which of the following is a clean way to link a CSS file to an HTML document?',
    choice1: "<link rel='stylesheet' href='style.css'>",
    choice2: '<stylesheet>style.css</stylesheet>',
    choice3: "<css src='style.css'>",
    choice4: "<link src='style.css'>",
    answer: 1
  },
  {
    question:
      'Which of the following keywords is used to create a function in JavaScript?',
    choice1: 'function',
    choice2: 'define',
    choice3: 'method',
    choice4: 'create',
    answer: 1
  }
]
//CONSTANTS
const CORRECT_BONUS = 2 //defines a constant to give each correct answer 2 points
const MAX_QUESTIONS = 10 //defines a constant to give number of questions 10

startGame = () => {
  //function to start the game and set the value of score and question counter to 0 and take the available questions for questions data
  questionCounter = 0
  score = 0
  availableQuestions = [...questions]
  getNewQuestion()
}

getNewQuestion = () => {
  //function checks if there are no more questions to display or if the user has reached the maximum number of questions allowed. If either condition is met, it redirects the user to an "end" page of the application.
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    return window.location.assign('/end.html')
  }
  questionCounter++ //to keep track of how many questions have been answered so far.
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

  const questionIndex = Math.floor(Math.random() * availableQuestions.length) //to generates a random index to select a question from questions array
  currentQuestion = availableQuestions[questionIndex] //uses the randomly generated index to select a specific question from the availableQuestions array and assigns it to the variable currentQuestion
  question.innerText = currentQuestion.question //updates HTML element to show the text of the current question.

  choices.forEach((choice) => {
    //to iterates over each choice element, retrieves a custom data attribute that indicates which choice it represents, uses this information to fetch the appropriate text from a question object (currentQuestion), and then updates the displayed text of the choice elements accordingly
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
  })

  availableQuestions.splice(questionIndex, 1) //indicates that when an when a question is answered, it first removes that question from a list of available questions to prevent it from being asked again, and then it updates the state to accept new answers, likely for the next question in a sequence or round.
  acceptingAnswers = true
}
// to sets up click event handlers for a set of answer choices in the quiz. It ensures that answers are only accepted when the acceptingAnswers variable is true, thereby controlling the flow of user interaction during certain states of the application
choices.forEach((choice) => {
  choice.addEventListener('click', (e) => {
    if (!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target //assigning the element that triggered the event to the variable selectedChoice.
    const selectedAnswer = selectedChoice.dataset['number']

    const classToApply =
      selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

    if (classToApply === 'correct') {
      incrementScore(CORRECT_BONUS)
    } //checks if it matches the correct answer for the current question, assigns a class based on that check ('correct' or 'incorrect'), and if the answer is correct, increments the user's score accordingly

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion()
    }, 1000) //selected choice by adding a class, waits for 1 second, then removes that class and retrieves a new question, enhancing the interactive experience of the user.
  })
})

incrementScore = (num) => {
  //function to increment score
  score += num
  scoreText.innerText = score
}

startGame()
