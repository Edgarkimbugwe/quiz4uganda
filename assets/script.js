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