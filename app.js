const question = document.getElementById('question') // to select the question element from html file and change it by Javascript file
const choices = Array.from(document.getElementsByClassName('choice-text'))
const progressText = document.getElementById('progressText')
const scoreText = document.getElementById('score')
const progressBarFull = document.getElementById('progressBarFull')
let currentQuestion = {}
let acceptingAnswers = false
let score = 0
let questionCounter = 0
let availableQuesions = []

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
const CORRECT_BONUS = 2
const MAX_QUESTIONS = 10

startGame = () => {
  questionCounter = 0
  score = 0
  availableQuesions = [...questions]
  getNewQuestion()
}

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score)
    //go to the end page
    return window.location.assign('/end.html')
  }
  questionCounter++
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

  const questionIndex = Math.floor(Math.random() * availableQuesions.length)
  currentQuestion = availableQuesions[questionIndex]
  question.innerText = currentQuestion.question

  choices.forEach((choice) => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
  })

  availableQuesions.splice(questionIndex, 1)
  acceptingAnswers = true
}

choices.forEach((choice) => {
  choice.addEventListener('click', (e) => {
    if (!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']

    const classToApply =
      selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

    if (classToApply === 'correct') {
      incrementScore(CORRECT_BONUS)
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion()
    }, 1000)
  })
})

incrementScore = (num) => {
  score += num
  scoreText.innerText = score
}

startGame()
