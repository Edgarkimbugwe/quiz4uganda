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

/**
 * Timer is started for the specified number of seconds and displays it.
 * Moves to the next question if the time runs out. 
 * 
 * @param {number} seconds - The duration of the timer in seconds. 
 */
function startTimer(seconds) {
    // Display the timer and decrement it every second
    const timerElement = document.createElement('p');
    timerElement.id = 'timer';
    document.getElementById('question-container').appendChild(timerElement);

    let timerValue = seconds;

    questionTimer = setInterval(() => {
        timerElement.textContent = `Time remaining: ${timerValue} seconds`;

        if (timerValue === 0) {
            // Time's up, automatically move to the next question
            clearInterval(questionTimer);
            checkAnswer(''); // Passing an empty string as the answer to trigger the timeout message
        }

        timerValue--;
    }, 1000);
}

/**
 * Checks the player's answer, updates the score and moves to the next question
 * 
 * @param {string} userAnswer - The player's selected answer
 */
function checkAnswer(userAnswer) {
    // Clear the timer when the user answers the question
    clearInterval(questionTimer);

    // Disable all buttons after an answer is selected
    const currentQues = questions[currentQuestion];
    currentQues.options.forEach(option => {
        const button = document.getElementById(option);
        button.disabled = true;
    });

    // Check if the user's answer is correct and update the score
    const correctAnswer = currentQues.correctAnswer;

    userAnswers[currentQuestion] = userAnswer;

    if (userAnswer === correctAnswer) {
        score++;
        displayMessage('Correct!', true);
    } else {
        displayMessage(`Incorrect. The correct answer is ${correctAnswer}.`, false);
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        // Wait for a brief moment before moving to the next question
        setTimeout(() => {
            loadQuestion();
            displayMessage('');
        }, 2000); // 2000 milliseconds (2 seconds) delay to the next question
    } else {
        // Display final results for the last question
        setTimeout(() => {
            displayMessage("");
            showResults();
        }, 2000); // 2000 milliseconds (2 seconds) delay to the next question
    }
}

/**
 * Messages displayed to the player depeding on answer selected or other conditions.
 *  
 * @param {string} message - The message to display
 * @param {boolean} isCorrect - Shows if the user's answer is correct
 */
function displayMessage(message, isCorrect) {
    // Display messages to the user
    const messageContainer = document.getElementById('message-container');
    messageContainer.textContent = message;

    // Add style to display the message based on correctness
    if (message.includes('Please enter your name before starting the quiz.')) {
        messageContainer.style.color = 'white'; // Color for the specific message
        messageContainer.style.fontWeight = 'bold';
    } else if (isCorrect === true) {
        messageContainer.style.color = 'green'; // Correct answer message color
        messageContainer.style.fontWeight = 'bold';
    } else if (isCorrect === false) {
        messageContainer.style.color = 'Salmon'; // Incorrect answer message color
        messageContainer.style.fontWeight = 'bold';
    } else {
        // Reset the color and font weight for other messages
        messageContainer.style.color = '';
        messageContainer.style.fontWeight = '';
    }
}

/**
 * Shows the final results and score when the quiz is completed.
 * 
 * Retrieves the player's name, final score, and the number of correct and failed questions.
 * Updates the HTML elements by displaying the social media links for connections. 
 * The questions are hidden and the results container is displayed. 
 */
function showResults() {
    // Display final results and score at the end of the quiz
    const finalScoreElement = document.getElementById('final-score');
    finalScoreElement.textContent = `${playerName}, your final score is ${score}.`;

    const correctAnswers = questions.filter((q, index) => q.correctAnswer === userAnswers[index]).length;
    const incorrectAnswers = questions.length - correctAnswers;

    const resultInfoElement = document.getElementById('result-info');
    resultInfoElement.textContent = `Questions answered correctly: ${correctAnswers},\nFailed Questions: ${incorrectAnswers}`;

    document.getElementById('question-container').style.display = 'none';
    document.getElementById('results-container').style.display = 'block';

    // Add social media links
    const socialMediaContainer = document.getElementById('social-media-container');
    socialMediaContainer.innerHTML = `
        <p>Connect with us on social media:</p>
        <a href="https://youtube.com" target="_blank">YouTube</a>
        <a href="https://facebook.com" target="_blank">Facebook</a>
        <a href="https://instagram.com" target="_blank">Instagram</a>
    `;
}

/**
 * Restarts the quiz by resetting the quiz and loading the first question (in a shuffled format)
 */
function restartQuiz() {
    // Restart the quiz if the players wishes too
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    document.getElementById('results-container').style.display = 'none';
    document.getElementById('question-container').style.display = 'block';
    shuffleArray(questions);
    loadQuestion();
}