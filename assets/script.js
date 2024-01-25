//To store user's answers to each question
let userAnswers = [];

// Questions to the quiz with 4 options and correct answer
let questions = [
    { question: "What is the capital of Uganda?", options: ["Kampala", "Nairobi", "Dar es Salaam", "Kigali"], correctAnswer: "Kampala" },
    { question: "Which lake is the largest in Uganda?", options: ["Lake Albert", "Lake Tanganyika", "Lake Victoria", "Lake Turkana"], correctAnswer: "Lake Victoria" },
    { question: "What is the official language of Uganda?", options: ["Runyankole", "Swahili", "Luganda", "English"], correctAnswer: "English" },
    { question: "In what year did Uganda gain independence?", options: ["1957", "1962", "1968", "1971"], correctAnswer: "1962" },
    { question: "What language is widely used in the country?", options: ["Luganda", "Luo", "Lusonga", "Karamojong"], correctAnswer: "Luganda" },
    { question: "Which mountain is the highest in Uganda?", options: ["Mount Elgon", "Rwenzori Mountains", "Mount Moroto", "Mount Kadam"], correctAnswer: "Rwenzori Mountains" },
    { question: "What is the largest national park in Uganda?", options: ["Murchison Falls National Park", "Bwindi Impenetrable National Park", "Queen Elizabeth National Park", "Kidepo Valley National Park"], correctAnswer: "Murchison Falls National Park" },
    { question: "Which river forms part of the border between Uganda and the Democratic Republic of the Congo?", options: ["Nile River", "Congo River", "Semliki River", "Kagera River"], correctAnswer: "Semliki River" },
    { question: "What is the traditional dance of the Baganda people in Uganda?", options: ["Gazebo Dance", "Kakilambe Dance", "Gishora Dance", "Kiganda Dance"], correctAnswer: "Kiganda Dance" },
    { question: "Estimate the number of languages spoken in Uganda.", options: ["60+", "3 - 20", "20 - 40", "40 - 60"], correctAnswer: "60+" }
];

let currentQuestion = 0;
let score = 0;
let playerName = '';

/**
 * To shuffle the questions whenever the quiz is initiated
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/**
 * Initiates the quiz by retrieving the player's name and starting the quiz.
 * Hides the welcome container and displays the first question.
 */
function startQuiz() {
    // Retrieve player name
    const playerNameInput = document.getElementById('player-name');
    playerName = playerNameInput.value.trim();
    console.log('Start Quiz function called');
    console.log('Player name input:', playerNameInput);

    // Check if the player name is empty
    if (playerName === '') {
        displayMessage('Please enter your name.');
        return;  // Exit the function if the name is empty
    }

    // If the name is not empty, proceed with quiz initiation
    playerNameInput.value = playerName;  // Update the input field with the trimmed name

    // Hide welcome container and show question container
    document.getElementById('welcome-container').style.display = 'none';
    document.getElementById('question-container').style.display = 'block';

    // Shuffle questions and load the first question
    shuffleArray(questions);
    loadQuestion();;
}

/**
 * Loads the next question in the quiz.
 */
function loadQuestion() {
    // Load the current question into the question container
    const questionContainer = document.getElementById('question-container');
    const messageContainer = document.getElementById('message-container');

    messageContainer.innerHTML = '';

    const currentQues = questions[currentQuestion];

    questionContainer.innerHTML = `
        <h2>${currentQues.question}</h2>
        <div class="options">
            ${currentQues.options.map(option => `<button id="${option}" onclick="checkAnswer('${option}')">${option}</button>`).join('')}
        </div>
        <p>Score: ${score}</p>
    `;

    // Start the timer for 10 seconds
    startTimer(10);
}