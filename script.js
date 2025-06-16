// =============================
// QUESTION LOGIC SECTION
// =============================

// Global flags and indices
let questionModalActive = false;
let skipQuestionCheck = false; // flag to skip question check during bonus/penalty moves
let currentQuestionIndex = 0;

// Define an array of 75 questions
const questions = [
  {
    text: "Which of the following is NOT one of the three primary domains of learning?",
    options: ["Cognitive", "Affective", "Psychomotor", "Social"],
    correctIndex: 3
  },
  {
    text: "The cognitive domain primarily deals with which aspect of learning?",
    options: ["Emotions", "Motor skills", "Knowledge", "Values"],
    correctIndex: 2
  },
  {
    text: "Which domain of learning involves attitudes, values, and feelings?",
    options: ["Cognitive", "Affective", "Psychomotor", "Sensory"],
    correctIndex: 1
  },
  {
    text: "The psychomotor domain is most concerned with:",
    options: ["Physical movement and skills", "Emotional responses", "Intellectual understanding", "Moral judgments"],
    correctIndex: 0
  },
  {
    text: "A common maxim of teaching is to 'make the learning meaningful'. This means teachers should:",
    options: ["Focus solely on memorisation", "Relate content to students’ real-life experiences", "Deliver information without context", "Enforce rote repetition"],
    correctIndex: 1
  },
  {
    text: "One educational maxim is to 'learn by doing'. This maxim emphasizes:",
    options: ["Passive absorption of facts", "Active engagement in tasks", "Teacher-centred lectures", "Strict discipline"],
    correctIndex: 1
  },
  {
    text: "Which statement best describes the objective of learning?",
    options: ["To impart knowledge and skills", "To merely entertain", "To simply test students", "To restrict inquiry"],
    correctIndex: 0
  },
  {
    text: "An effective educational objective should be:",
    options: ["Vague and general", "Specific and measurable", "Unattainable", "Too broad to evaluate"],
    correctIndex: 1
  },
  {
    text: "Bloom's Taxonomy is primarily associated with which domain?",
    options: ["Cognitive", "Affective", "Psychomotor", "None of the above"],
    correctIndex: 0
  },
  {
    text: "Which of the following is an example of a teaching maxim?",
    options: ["Teach as you are taught", "Ignore individual differences", "Control the class through fear", "Avoid simplifying complex topics"],
    correctIndex: 0
  },
  {
    text: "A well-defined educational objective typically includes which components?",
    options: ["Behaviour", "Condition", "Criterion", "All of the above"],
    correctIndex: 3
  },
  {
    text: "The affective domain in learning is most related to:",
    options: ["Factual recall", "Emotional development and attitudes", "Physical skill acquisition", "Analytical reasoning"],
    correctIndex: 1
  },
  {
    text: "Maxims of teaching often emphasise the importance of:",
    options: ["Student engagement and active learning", "Teacher domination of the classroom", "Rote learning only", "Strict memorisation"],
    correctIndex: 0
  },
  {
    text: "Developing critical thinking skills is an objective that falls under which domain?",
    options: ["Cognitive", "Affective", "Psychomotor", "None of the above"],
    correctIndex: 0
  },
  {
    text: "In setting learning objectives, the 'SMART' criteria stand for:",
    options: [
      "Simple, Meaningless, Achievable, Realistic, Timeless",
      "Specific, Measurable, Achievable, Relevant, Time-bound",
      "Special, Modest, Attainable, Reliable, Timely",
      "Standard, Manageable, Accessible, Reasonable, Tested"
    ],
    correctIndex: 1
  },
  {
    text: "Which of the following cognitive skills involves analysis and evaluation?",
    options: ["Remembering", "Understanding", "Analysing", "Recalling"],
    correctIndex: 2
  },
  {
    text: "The cognitive domain includes which of the following processes?",
    options: ["Perception, memory, and problem-solving", "Emotional regulation", "Physical movement", "Social interaction"],
    correctIndex: 0
  },
  {
    text: "What does the affective domain primarily measure?",
    options: ["Knowledge retention", "Emotional responses and attitudes", "Motor skills", "Logical reasoning"],
    correctIndex: 1
  },
  {
    text: "Which option best represents a psychomotor skill?",
    options: ["Writing an essay", "Performing a dance routine", "Solving a math problem", "Reciting a poem"],
    correctIndex: 1
  },
  {
    text: "In the cognitive domain, what is the highest level of thinking according to Bloom's taxonomy?",
    options: ["Remembering", "Understanding", "Evaluating", "Creating"],
    correctIndex: 3
  },
  {
    text: "Which domain is associated with performance-based outcomes?",
    options: ["Cognitive", "Affective", "Psychomotor", "None of the above"],
    correctIndex: 2
  },
  {
    text: "Which of the following is an example of a cognitive objective?",
    options: ["Analyse the causes of the French Revolution", "Express feelings about the French Revolution", "Demonstrate a dance representing the French Revolution", "Recite a poem about the French Revolution"],
    correctIndex: 0
  },
  {
    text: "What is the key focus of affective learning?",
    options: ["Knowledge acquisition", "Emotional and value development", "Physical skill practice", "Logical reasoning"],
    correctIndex: 1
  },
  {
    text: "Affective domain objectives often emphasise:",
    options: ["Memorisation of facts", "Demonstration of skills", "Development of attitudes and feelings", "Calculation of numbers"],
    correctIndex: 2
  },
  {
    text: "The psychomotor domain can be best measured by:",
    options: ["Written tests", "Observations of performance", "Interviews", "Self-assessments"],
    correctIndex: 1
  },
  {
    text: "What is an example of a task that falls under the psychomotor domain?",
    options: ["Completing a written exam", "Performing a surgical procedure", "Engaging in a debate", "Listening to a lecture"],
    correctIndex: 1
  },
  {
    text: "How does Bloom’s taxonomy classify learning objectives?",
    options: ["By content type only", "By difficulty level only", "By cognitive processes", "By student interest"],
    correctIndex: 2
  },
  {
    text: "Which learning domain is most associated with memorisation and recall?",
    options: ["Cognitive", "Affective", "Psychomotor", "Creative"],
    correctIndex: 0
  },
  {
    text: "Which domain would a teacher target when designing activities for empathy?",
    options: ["Cognitive", "Affective", "Psychomotor", "Logical"],
    correctIndex: 1
  },
  {
    text: "Which learning objective is more affective in nature?",
    options: ["List the capitals of European countries", "Describe your feelings about community service", "Calculate the area of a rectangle", "Perform a laboratory experiment"],
    correctIndex: 1
  },
  {
    text: "What does the 'evaluation' stage of the cognitive domain involve?",
    options: ["Remembering information", "Judging the value of material", "Performing physical tasks", "Experiencing emotions"],
    correctIndex: 1
  },
  {
    text: "Which of the following best defines psychomotor learning?",
    options: ["Learning through reflection", "Learning through doing", "Learning through reading", "Learning through listening"],
    correctIndex: 1
  },
  {
    text: "What skill is primarily developed in the cognitive domain?",
    options: ["Critical thinking", "Coordination", "Emotional intelligence", "Physical endurance"],
    correctIndex: 0
  },
  {
    text: "Which domain involves perceptual and motor skills?",
    options: ["Cognitive", "Affective", "Psychomotor", "Behavioural"],
    correctIndex: 2
  },
  {
    text: "The term 'cognition' refers to which process?",
    options: ["Physical movement", "Emotional experience", "Mental processing", "Sensory perception"],
    correctIndex: 2
  },
  {
    text: "Which domain of learning includes social skills and emotional intelligence?",
    options: ["Cognitive", "Affective", "Psychomotor", "None of the above"],
    correctIndex: 1
  },
  {
    text: "What kind of learning is improved through hands-on activities?",
    options: ["Auditory learning", "Visual learning", "Kinesthetic learning", "Conceptual learning"],
    correctIndex: 2
  },
  {
    text: "Which domain would be engaged by a practical science experiment?",
    options: ["Cognitive", "Affective", "Psychomotor", "Theoretical"],
    correctIndex: 2
  },
  {
    text: "What is the primary objective of cognitive learning?",
    options: ["To develop skills", "To understand and apply knowledge", "To express emotions", "To perform tasks"],
    correctIndex: 1
  },
  {
    text: "What does affective learning typically involve?",
    options: ["Physical performance", "Understanding concepts", "Emotional growth", "Logical reasoning"],
    correctIndex: 2
  },
  {
    text: "Which type of objective is targeted when a teacher wants to improve students’ problem-solving skills?",
    options: ["Cognitive", "Affective", "Psychomotor", "Social"],
    correctIndex: 0
  },
  {
    text: "What is an example of an objective in the psychomotor domain?",
    options: ["Analyse a theory", "Develop fine motor skills", "Express feelings", "Memorise vocabulary"],
    correctIndex: 1
  },
  {
    text: "Which statement best describes Bloom’s taxonomy in the cognitive domain?",
    options: ["It categorises levels of intellectual behaviour", "It measures physical skills", "It focuses on emotional response", "It outlines social interactions"],
    correctIndex: 0
  },
  {
    text: "Which domain would you associate with developing communication skills?",
    options: ["Cognitive", "Affective", "Psychomotor", "Interpersonal"],
    correctIndex: 1
  },
  {
    text: "What is the focus of psychomotor domain learning?",
    options: ["Mental processes", "Emotional responses", "Physical actions", "Verbal communication"],
    correctIndex: 2
  },
  {
    text: "In which domain would critical analysis be placed?",
    options: ["Cognitive", "Affective", "Psychomotor", "Practical"],
    correctIndex: 0
  },
  {
    text: "What type of learning outcome does a hands-on activity promote?",
    options: ["Cognitive development", "Emotional engagement", "Motor skills", "Abstract thinking"],
    correctIndex: 2
  },
  {
    text: "Which domain is most likely to involve performance-based assessments?",
    options: ["Cognitive", "Affective", "Psychomotor", "Conceptual"],
    correctIndex: 2
  },
  {
    text: "What is a characteristic of effective cognitive objectives?",
    options: ["They are vague", "They are specific and measurable", "They are subjective", "They are not testable"],
    correctIndex: 1
  },
  {
    text: "Which domain emphasises the development of attitudes and values?",
    options: ["Cognitive", "Affective", "Psychomotor", "Behavioural"],
    correctIndex: 1
  },
  {
    text: "Which of the following is NOT typically part of the affective domain?",
    options: ["Expressing emotions", "Attitude formation", "Knowledge recall", "Value internalisation"],
    correctIndex: 2
  },
  {
    text: "What is a key feature of learning objectives in the psychomotor domain?",
    options: ["They focus on mental skills", "They require physical performance", "They are assessed by exams", "They are measured by surveys"],
    correctIndex: 1
  },
  {
    text: "Which of these is most likely an objective in the cognitive domain?",
    options: ["Demonstrate a physical skill", "Analyse a case study", "Perform a dance routine", "Express a personal opinion"],
    correctIndex: 1
  },
  {
    text: "Which of these best describes the nature of psychomotor skills?",
    options: ["Mental processing", "Emotional understanding", "Physical coordination", "Creative thinking"],
    correctIndex: 2
  },
  {
    text: "What does the term 'affective' primarily relate to?",
    options: ["Mental processes", "Emotional responses", "Physical abilities", "Cognitive skills"],
    correctIndex: 1
  },
  {
    text: "Which objective is clearly measurable in the cognitive domain?",
    options: ["Recalling a fact", "Expressing an opinion", "Showing empathy", "Performing a physical task"],
    correctIndex: 0
  },
  {
    text: "Which domain would involve training for a sport?",
    options: ["Cognitive", "Affective", "Psychomotor", "Social"],
    correctIndex: 2
  },
  {
    text: "Which of the following is a hallmark of affective learning?",
    options: ["Critical analysis", "Skill demonstration", "Emotional engagement", "Physical coordination"],
    correctIndex: 2
  },
  {
    text: "Which domain is primarily concerned with critical thinking?",
    options: ["Cognitive", "Affective", "Psychomotor", "None of the above"],
    correctIndex: 0
  },
  {
    text: "Which option best represents an affective learning outcome?",
    options: ["Improved memory", "Enhanced empathy", "Better coordination", "Increased calculation speed"],
    correctIndex: 1
  },
  {
    text: "What does a practical exam in a laboratory typically assess?",
    options: ["Theoretical knowledge", "Physical skills", "Emotional responses", "Critical analysis"],
    correctIndex: 1
  },
  {
    text: "Which domain is targeted when assessing theoretical understanding?",
    options: ["Cognitive", "Affective", "Psychomotor", "Practical"],
    correctIndex: 0
  },
  {
    text: "Which learning domain focuses on feelings and emotions?",
    options: ["Cognitive", "Affective", "Psychomotor", "Intellectual"],
    correctIndex: 1
  },
  {
    text: "Which of these best describes a tactile learning activity?",
    options: ["Listening to a lecture", "Handling objects", "Reading a textbook", "Watching a video"],
    correctIndex: 1
  },
  {
    text: "What is a common teaching strategy for cognitive development?",
    options: ["Group discussion", "Hands-on experiments", "Drill and practice", "Role-playing"],
    correctIndex: 2
  },
  {
    text: "Which domain might include learning through role-playing?",
    options: ["Cognitive", "Affective", "Psychomotor", "Behavioural"],
    correctIndex: 1
  },
  {
    text: "Which of the following is an example of a sensory-motor activity?",
    options: ["Solving a puzzle", "Drawing a picture", "Performing a dance", "Reciting a speech"],
    correctIndex: 2
  },
  {
    text: "Which domain of learning includes subjective experiences and feelings?",
    options: ["Cognitive", "Affective", "Psychomotor", "Analytical"],
    correctIndex: 1
  },
  {
    text: "Which objective is clearly aligned with the psychomotor domain?",
    options: ["Describe a process", "Evaluate an argument", "Demonstrate a skill", "Analyse data"],
    correctIndex: 2
  },
  {
    text: "In the cognitive domain, which skill is associated with creating new ideas?",
    options: ["Remembering", "Understanding", "Evaluating", "Creating"],
    correctIndex: 3
  },
  {
    text: "Which domain would you target to develop teamwork and collaboration?",
    options: ["Cognitive", "Affective", "Psychomotor", "Interpersonal"],
    correctIndex: 3
  },
  {
    text: "What is an example of a cognitive process that involves summarising information?",
    options: ["Recalling details", "Synthesising information", "Repeating facts", "Demonstrating a procedure"],
    correctIndex: 1
  },
  {
    text: "Which of these objectives requires emotional involvement?",
    options: ["Solving an equation", "Writing a reflective essay", "Performing a physical task", "Analyzing data"],
    correctIndex: 1
  },
  {
    text: "Which domain is best for assessing manual dexterity?",
    options: ["Cognitive", "Affective", "Psychomotor", "Conceptual"],
    correctIndex: 2
  },
  {
    text: "What type of learning objective involves recalling factual information?",
    options: ["Cognitive", "Affective", "Psychomotor", "Creative"],
    correctIndex: 0
  }
];

//Adding Difficult Questions for Snakebite
const snakeBiteQuestions = [
  {
    text: "Which action verb is most suitable for the Responding level in the affective domain?",
    options: ["Assists", "Organizes", "Evaluates", "Generates"],
    correctIndex: 0
  },
  {
    text: "Which action verb aligns with the Valuing level in the affective domain?",
    options: ["Shares", "Locates", "Imitates", "Classifies"],
    correctIndex: 0
  },
  {
    text: "Which action verb best represents the Organization level in the affective domain?",
    options: ["Arranges", "Listens", "Repeats", "Practices"],
    correctIndex: 0
  },
  {
    text: "Which action verb is appropriate for the Characterization level in the affective domain?",
    options: ["Behaves", "Complies", "Defines", "Recalls"],
    correctIndex: 0
  },
  {
    text: "Which action verb best represents the Impulsion level in the psychomotor domain?",
    options: ["Initiates", "Adjusts", "Coordinates", "Calibrates"],
    correctIndex: 3
  },
  {
    text: "Which action verb is most suitable for the Imitation level in the psychomotor domain?",
    options: ["Copies", "Evaluates", "Constructs", "Demonstrates"],
    correctIndex: 0
  },
  {
    text: "Which action verb aligns with the Manipulation level in the psychomotor domain?",
    options: ["Adapts", "Observes", "Recalls", "Illustrates"],
    correctIndex: 0
  },
  {
    text: "Which action verb best represents the Coordination level in the psychomotor domain?",
    options: ["Balances", "Identifies", "States", "Explains"],
    correctIndex: 0
  },
  {
    text: "Which action verb is appropriate for the Control level in the psychomotor domain?",
    options: ["Tunes", "Compares", "Summarizes", "Recognizes"],
    correctIndex: 1
  },
  {
    text: "Which action verb is suitable for Habit Formation in the psychomotor domain?",
    options: ["Performs", "Points", "Labels", "Defines"],
    correctIndex: 0
  }
];

//Adding function to shuffle the questions appearing on screen
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

let remainingQuestions = [...questions];

const questionLocations = [3, 8, 12, 17, 23, 34, 40, 45, 53, 59, 66, 72, 78, 86, 93, 97];

//New1: New Screen
function showScreen(screenId) {
  // Hide all screens
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => {
    screen.style.display = "none";
  });
  // Show the selected screen with a fadeIn effect if needed
  const target = document.getElementById(screenId);
  target.style.display = "block";
}

// Helper to check if a question should trigger at the current board value
function checkQuestionLocation(value, playerNumber) {
  if (!questionModalActive && questionLocations.includes(value)) {
    showQuestionModal(playerNumber, null);
  }
}

// Function to show the question modal and process the answer
function showQuestionModal(playerNumber, snakeIndex, isStart = false, snakeTail = null, isSnakeBite = false) {
  if (questionModalActive) return;
  questionModalActive = true;

  const questionModal = document.getElementById("questionModal");
  const questionText = document.getElementById("questionText");
  const optionsContainer = document.getElementById("optionsContainer");
  const submitBtn = document.getElementById("submitAnswer");
  const board = document.getElementById("board");
  
  if (!questionModal || !questionText || !optionsContainer || !submitBtn) {
    console.error("Modal elements missing in HTML.");
    questionModalActive = false;
    return;
  }

  questionModal.classList.remove("hidden");

  //New3: To get random questions from the Array
  let q = isSnakeBite ? getSnakeBiteQuestion() : getRandomQuestion();
  questionText.innerText = q.text;

  optionsContainer.innerHTML = "";
  q.options.forEach((opt, idx) => {
    optionsContainer.innerHTML += `
      <label>
        <input type="radio" name="questionOption" value="${idx}" />
        ${opt}
      </label><br/>
    `;
  });

  // Attach the click handler with the "once" option so it fires only once
  submitBtn.addEventListener("click", function handler() {
    console.log("Submit button clicked");
    const selected = document.querySelector('input[name="questionOption"]:checked');
    if (!selected) return;

    const userAnswer = parseInt(selected.value);
    questionModal.classList.add("hidden");

    // New3: To reshuffle questions once all questions have been appeared once
    currentQuestionIndex++;
	if (currentQuestionIndex >= questions.length) {
	  shuffle(questions);
	  currentQuestionIndex = 0;
	}
    questionModalActive = false;
	

    // New1: Start condition handling
	if (isStart) {
	  console.log("Start condition triggered");
	  let correctAnswerText = q.options[q.correctIndex]; // Define the correct answer text
	  if (userAnswer === q.correctIndex) {
		players[playerNumber - 1].correct++;
		correctSound.play(); // Play the correct answer sound
		showFeedback(`Correct Answer ${players[playerNumber - 1].name} 😀!, you can start the Game`, () => {
		  players[playerNumber - 1].hasStarted = true;
		  currentPlayer = playerNumber;
		  disableDices();
		});
	  } else {
		players[playerNumber - 1].incorrect++;
		incorrectSound.play(); // Play the incorrect answer sound
		showFeedback(`Incorrect Answer ${players[playerNumber - 1].name} 😢! <br> The correct answer is: ${correctAnswerText}. <br> Please try again in the next turn`, () => {
		  currentPlayer = (playerNumber % playersCount) + 1;
		  disableDices();
		});
	  }
	  submitBtn.removeEventListener("click", handler);
	  return;
	}
	//NEW1 End

	// Existing behavior for snakes and ladders:
    skipQuestionCheck = true;

    let currentScore = players[playerNumber - 1].score;

    // Function to show feedback then call the callback
	function showFeedback(message, callback) {
	  const feedbackModal = document.getElementById("feedbackModal");
	  const feedbackText = document.getElementById("feedbackText");
	  if (!feedbackModal || !feedbackText) {
		console.error("Feedback modal elements missing in HTML.");
		callback();
		return;
	  }
	  feedbackText.innerHTML = message;  // Use innerHTML instead of innerText
	  feedbackModal.classList.remove("hidden");
	  setTimeout(() => {
		feedbackModal.classList.add("hidden");
		callback();
	  }, 2000);
	}

		if (userAnswer === q.correctIndex) {
		  players[playerNumber - 1].correct++; // Increment correct counter
		  correctSound.play(); // Play the correct answer sound
		  correctSound.play();
		  let bonus = 2; // Default bonus for a correct answer

		  // Check if landing on a snake after bonus steps should increase bonus
			let futurePosition = players[playerNumber - 1].score + bonus;
			  if (snakes.some(snake => snake[0] === futurePosition)) {
				bonus = 3;
			  }
			  // Use the existing feedback modal to display the correct answer screen
			  showFeedback(`Correct Answer ${players[playerNumber - 1].name} 😀! Moving ${bonus} steps forward.`, () => {
				movePot(bonus, playerNumber);
			  });
			} else {
			  players[playerNumber - 1].incorrect++; 
			  let correctAnswerText = q.options[q.correctIndex];
			  incorrectSound.play(); // Play the incorrect answer sound
			  if (isSnakeBite && snakeTail !== null) {
				snake.play();
				showFeedback(
				  `Incorrect Answer ${players[playerNumber - 1].name} 😢! <br> The correct answer is: ${correctAnswerText}. <br> Moving directly to snake tail at position ${snakeTail}.`,
				  () => {
					players[playerNumber - 1].score = snakeTail;
					updateBoard();
				  }
				);
			  } else {
			let penalty = -2;
			if (ladders.some(ladder => ladder[0] === players[playerNumber - 1].score + penalty)) {
			  penalty = -3;
			}
			showFeedback(
			  `Incorrect Answer ${players[playerNumber - 1].name} 😢! <br> The correct answer is: ${correctAnswerText}. <br> Moving ${Math.abs(penalty)} steps backward.`,
			  () => {
				movePot(penalty, playerNumber);
			  }
			);
		  }
}
  }, { once: true });
}
// =============================
// END QUESTION LOGIC SECTION
// =============================


// =============================
// GAME LOGIC SECTION
// =============================

// For the movement of pots
const colorsPots = ["redPot", "bluePot", "greenPot", "yellowPot"];

// For Audio
const drop = document.querySelector("#drop");
const ladder = document.querySelector("#ladder");
const snake = document.querySelector("#snake");
const diceAudio = document.querySelector("#diceAudio");
const success = document.querySelector("#success");
const correctSound = document.querySelector("#correct");
const incorrectSound = document.querySelector("#incorrect");

// For showing the winner message
const modal = document.querySelector("#modal");
const wname = document.querySelector("#wname");
const wimg = document.querySelector("#wimg");

// Path of ladders
let ladders = [
  [4, 16, 17, 25],
  [21, 39],
  [29, 32, 33, 48, 53, 67, 74],
  [43, 57, 64, 76],
  [63, 62, 79, 80],
  [71, 89],
];
// Path for snakes
let snakes = [
  [30, 12, 13, 7],
  [47, 46, 36, 35, 27, 15],
  [56, 44, 38, 23, 19],
  [73, 69, 51],
  [82, 79, 62, 59, 42],
  [92, 88, 75],
  [98, 97, 83, 84, 85, 77, 64, 76, 65, 55],
];

// Dice probabilities array
const diceArray = [1, 2, 3, 4, 5, 6];

// Used for looping players chances
const playerNumbers = [1, 2, 3, 4];

// Dice icon according to random dice value
const diceIcons = [
  "fa-dice-one",
  "fa-dice-two",
  "fa-dice-three",
  "fa-dice-four",
  "fa-dice-five",
  "fa-dice-six",
];

// Multiple screens on the page
const screen1 = document.querySelector("#screen1");
const screen2 = document.querySelector("#screen2");
const screen3 = document.querySelector("#screen3");

const players = [
  { name: "Player 1", image: 1, lastDice: 0, score: 0, lastMovement: 0, hasStarted: false,
    moves: 0, correct: 0, incorrect: 0, snakeBites: 0, laddersUsed: 0 },
  { name: "Player 2", image: 0, lastDice: 0, score: 0, lastMovement: 0, hasStarted: false,
    moves: 0, correct: 0, incorrect: 0, snakeBites: 0, laddersUsed: 0 },
  { name: "Player 3", image: 3, lastDice: 0, score: 0, lastMovement: 0, hasStarted: false,
    moves: 0, correct: 0, incorrect: 0, snakeBites: 0, laddersUsed: 0 },
  { name: "Player 4", image: 4, lastDice: 0, score: 0, lastMovement: 0, hasStarted: false,
    moves: 0, correct: 0, incorrect: 0, snakeBites: 0, laddersUsed: 0 },
];

// Tracking the current player
let currentPlayer = 1;

// Create a board where pots are placed
const drawBoard = () => {
  let content = "";
  let boxCount = 101;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (i % 2 === 0) boxCount--;
      content += `<div class="box" id="potBox${boxCount}"></div>`;
      if (i % 2 !== 0) boxCount++;
    }
    boxCount -= 10;
  }
  board.innerHTML = content;
};

//New3: Get Random Questions
function getRandomQuestion() {
  if (remainingQuestions.length === 0) {
    // Refill the pool when all questions have been used
    remainingQuestions = [...questions];
  }
  const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
  const q = remainingQuestions.splice(randomIndex, 1)[0];
  return q;
}
//End

// Initial state at the beginning of the game
const initialState = () => {
  drawBoard();
  addQuestionIndicators();
  //New3: Adding for shuffling of questions
  shuffle(questions);
  currentQuestionIndex = 0;
  //New3: End
  screen2.style.display = "none";
  screen3.style.display = "none";
};

//Adding Welcome Screen
document.addEventListener("DOMContentLoaded", function() {
  // Show the welcome screen first
  showScreen("welcomeScreen");

  // Event listener for the Welcome Next button
  document.getElementById("welcomeNextBtn").addEventListener("click", function() {
    showScreen("rulesScreen");
  });

  // Event listener for the Rules Next button
  document.getElementById("rulesNextBtn").addEventListener("click", function() {
    showScreen("screen1");
  });
});


// Select players for game
let playersCount = 2;
const selectBox = document.getElementsByClassName("selectBox");
const selectPlayers = (value) => {
  selectBox[playersCount - 2].className = "selectBox";
  selectBox[value - 2].className = "selectBox selected";
  playersCount = value;
};

// To start the game
const start = () => {
  screen1.style.display = "none";
  screen2.style.display = "block";
  hideUnwantedPlayers();
};

// To back user to previous screen
const back = () => {
  screen2.style.display = "none";
  screen1.style.display = "block";
  resetPlayersCount();
};

const next = () => {
  screen2.style.display = "none";
  // Ensure the board is drawn before showing screen3
  drawBoard();
  addQuestionIndicators();
  screen3.style.display = "block";
  hideFinalPlayers();
  displayNames();
  disableDices();
};

// Reset the number of players in the add profile screen
const resetPlayersCount = () => {
  for (let i = 3; i < 5; i++) {
    let x = "card" + i;
    document.getElementById(x).style.display = "flex";
  }
};

// Hide unwanted Players according to the player count
const hideUnwantedPlayers = () => {
  for (let i = playersCount + 1; i < 5; i++) {
    let x = "card" + i;
    document.getElementById(x).style.display = "none";
  }
};

// Hide the final screen 3 players
const hideFinalPlayers = () => {
  for (let i = playersCount + 1; i < 5; i++) {
    let x = "playerCard" + i;
    document.getElementById(x).style.display = "none";
  }
};

// Display the name and profile icon for the users
const displayNames = () => {
  for (let i = 1; i < playersCount + 1; i++) {
    const baseURL = "images/avatars/";
    let x = "displayName" + i;
    let y = "avatar" + i;
    document.getElementById(x).innerHTML = players[i - 1].name;
    document.getElementById(y).src = baseURL + players[i - 1].image + ".png";
  }
};

// Update the name and profile icon for the users
const updateUserProfile = (playerNo, value) => {
  const baseURL = "images/avatars/";
  if (value === 1) {
    players[playerNo - 1].image = (players[playerNo - 1].image + 1) % 8;
  } else {
    players[playerNo - 1].image = players[playerNo - 1].image === 0 ? 7 : Math.abs((players[playerNo - 1].image - 1) % 8);
  }
  let x = "profile" + playerNo;
  document.getElementById(x).src = baseURL + players[playerNo - 1].image + ".png";
};

// Change the name of the player from input box
const changeName = (playerNo) => {
  let x = "name" + playerNo;
  let value = document.getElementById(x).value;
  players[playerNo - 1].name = value.length > 0 ? value : "Player" + playerNo;
};

// Clean the board with no pots
const resetBoard = () => {
  for (let i = 0; i < 100; i++) {
    let x = i + 1;
    document.getElementById("potBox" + x).innerHTML = "";
  }
};

// Refresh the board after every dice roll
const updateBoard = () => {
  resetBoard();
  for (let i = 0; i < playersCount; i++) {
    if (players[i].score !== 0) {
      let x = "potBox" + players[i].score;
      document.getElementById(x).innerHTML += `<div class="pot ${colorsPots[i]}"></div>`;
    }
  }
};

// Used for moving pot from one place to another
const movePot = (value, playerNumber) => {
	// Increment moves by the absolute number of steps taken
  players[playerNumber - 1].moves += Math.abs(value);
  const playerValue = players[playerNumber - 1].score;
  let end = playerValue + value;
  if (end < 101) {
		if (end === 100) {
		  setTimeout(() => {
			modal.className = "modal"; // Ensure modal is displayed
			success.play();
			const baseURL = "images/avatars/";
			wimg.src = baseURL + players[playerNumber - 1].image + ".png";
			wname.innerHTML = players[playerNumber - 1].name;

			// Fade out the winner modal and show scoreboard
			setTimeout(() => {
			  modal.classList.remove("show"); // Hide winner modal
			  modal.classList.add("hide"); // Hide with animation
			  // Trigger final scoreboard calculation and display
			  showFinalscoreboard();
			}, 3000);
		  }, Math.abs(value) * 400);
		}
    var t = setInterval(() => {
      players[playerNumber - 1].score += (value > 0 ? 1 : -1);
      drop.currentTime = 0;
      drop.play();
      updateBoard();
      if ((value > 0 && players[playerNumber - 1].score === end) ||
          (value < 0 && players[playerNumber - 1].score === end)) {
        clearInterval(t);
      }
    }, 400);
    setTimeout(() => {
      checkLadder(players[playerNumber - 1].score, playerNumber);
      checkSnake(players[playerNumber - 1].score, playerNumber);
      if (!skipQuestionCheck) {
        checkQuestionLocation(players[playerNumber - 1].score, playerNumber);
      } else {
        skipQuestionCheck = false;
      }
    }, Math.abs(value) * 400);
  }
};

// For random dice value
const rollDice = (playerNo) => {
  if (playerNo === currentPlayer) {
    diceAudio.play();
    const diceNumber = diceArray[Math.floor(Math.random() * diceArray.length)];
    let x = "dice" + playerNo;
    document.getElementById(x).innerHTML = `<i class="diceImg fas ${diceIcons[diceNumber - 1]}"></i>`;
	
	// NEW1: Check if game hasn't started (score is 0)
    if (players[playerNo - 1].score === 0 && !players[playerNo - 1].hasStarted) {
		  if (diceNumber === 1) {
			// Start game normally without question, and mark as started
			players[playerNo - 1].hasStarted = true;
			movePot(1, playerNo);
			return;
		  } else {
			// Trigger the question modal for start condition
			showQuestionModal(playerNo, null, true);
			return; // Exit early so normal movePot isn't called
		  }
		}
	//NEW1 End
	
    let tempCurrentPlayer = currentPlayer;
    currentPlayer = 0;
    setTimeout(() => {
      movePot(diceNumber, tempCurrentPlayer);
    }, 1000);
    setTimeout(() => {
      currentPlayer = playerNumbers[tempCurrentPlayer % playersCount];
      document.getElementById("dice" + currentPlayer).style.color = "";
      disableDices();
    }, 2000 + diceNumber * 400);
  }
};

// New1: Disable dice for non-current players
const disableDices = () => {
  for (let i = 1; i < playersCount + 1; i++) {
    let diceElement = document.getElementById("dice" + i);
    if (currentPlayer === i) {
      // Set active die to normal color (or simply remove the inline style)
      diceElement.style.color = "";
    } else {
      diceElement.style.color = "grey";
    }
  }
};
//New1 End

// Check if on a ladder
const checkLadder = (value, playerNumber) => {
  for (let i = 0; i < ladders.length; i++) {
    if (ladders[i][0] === value) {
      specialMove(i, playerNumber);
    }
  }
};

// Check if on a snake and trigger question modal
function checkSnake(value, playerNumber) {
  for (let i = 0; i < snakes.length; i++) {
    if (snakes[i][0] === value) {
      let snakeTail = snakes[i][snakes[i].length - 1]; // Get tail position
      showQuestionModal(playerNumber, value, false, snakeTail, true); // `true` marks a snake bite
    }
  }
};

// Ladder movement
const specialMove = (value, playerNumber) => {
  players[playerNumber - 1].laddersUsed++;
  let i = 0;
  var t = setInterval(() => {
    players[playerNumber - 1].score = ladders[value][i];
    ladder.play();
    updateBoard();
    i++;
    if (i === ladders[value].length) {
      clearInterval(t);
    }
  }, 400);
};

// Snake movement
const specialMoveSnake = (value, playerNumber) => {
  players[playerNumber - 1].snakeBites++;
  let i = 0;
  snake.play();
  var t = setInterval(() => {
    players[playerNumber - 1].score = snakes[value][i];
    updateBoard();
    i++;
    if (i === snakes[value].length) {
      clearInterval(t);
    }
  }, 400);
};

// For adding question indicators on the board
function addQuestionIndicators() {
  questionLocations.forEach(loc => {
    const cell = document.getElementById("potBox" + loc);
    if (cell) {
      cell.classList.add("question-indicator");
    }
  });
}

// =============================
// Final Scoreboard Section
// =============================
function showFinalscoreboard() {
  // Get only the players that were active during the game
  let activePlayers = players.slice(0, playersCount);

  // Find the winner (player with score 100)
  // If more than one reached 100 (unlikely), choose the one with the fewest moves.
  let winningPlayers = activePlayers.filter(p => p.score === 100);
  let winner = null;
  if (winningPlayers.length > 0) {
    winner = winningPlayers.sort((a, b) => a.moves - b.moves)[0];
  }

  // Remove the winner from the list of active players
  let remainingPlayers = activePlayers.filter(p => p !== winner);

  // Sort remaining players:
  // Primary: higher board position (score)
  // Secondary: more correct answers
  // Tertiary: fewer incorrect answers
  remainingPlayers.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    } else if (b.correct !== a.correct) {
      return b.correct - a.correct;
    } else {
      return a.incorrect - b.incorrect;
    }
  });

  // Combine winner at the top and then the rest
  let sortedPlayers = winner ? [winner, ...remainingPlayers] : remainingPlayers;

  // Update the scoreboard container (assumes an element with id="scoreboard" exists)
  let scoreboardContainer = document.getElementById('scoreboard');
  scoreboardContainer.innerHTML = "";

  // Define medal emojis (you can adjust or add more as needed)
  let medalImages = ['🥇', '🥈', '🥉', '🎖️', '🏅'];
  // Define some background colours for each rank (optional)
  const quadrantColours = ['#FFF8DC', '#F0FFF0', '#F5F5DC', '#F0F8FF'];

  sortedPlayers.forEach((player, index) => {
    let medal = index < medalImages.length ? medalImages[index] + " " : "";
    scoreboardContainer.innerHTML += `
      <div class="scoreboard-quadrant" id="rank${index + 1}" style="background-color: ${quadrantColours[index % quadrantColours.length]};">
        <h3>${medal}Rank ${index + 1}</h3>
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Position</th>
              <th>Moves</th>
              <th>Correct Answers</th>
              <th>Incorrect Answers</th>
              <th>Snake Bites</th>
              <th>Ladders Used</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${player.name}</td>
              <td>${player.score}</td>
              <td>${player.moves}</td>
              <td>${player.correct}</td>
              <td>${player.incorrect}</td>
              <td>${player.snakeBites}</td>
              <td>${player.laddersUsed}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  });

  // Optionally adjust the layout
  scoreboardContainer.style.gridTemplateColumns = '1fr';

  // Show the scoreboard screen (assuming you have a screen with id="finalscoreboardScreen")
  showScreen("finalscoreboardScreen");
};

function updatescoreboard(playerStats) {
  // Assume playerStats is an array of objects sorted by ranking.
  // Each object could have properties: name, moves, correct, incorrect, snakeBites, laddersUsed.
  playerStats.forEach((player, index) => {
    const rank = index + 1;
    document.getElementById(`playerRank${rank}`).innerText = player.name;
    document.getElementById(`movesRank${rank}`).innerText = player.moves;
    document.getElementById(`correctRank${rank}`).innerText = player.correct;
    document.getElementById(`incorrectRank${rank}`).innerText = player.incorrect;
    document.getElementById(`snakeRank${rank}`).innerText = player.snakeBites;
    document.getElementById(`ladderRank${rank}`).innerText = player.laddersUsed;
  });
}

function getSnakeBiteQuestion() {
  if (snakeBiteQuestions.length === 0) {
    // Optionally, refill the pool if needed
    // snakeBiteQuestions = [ ...initialSnakeBiteQuestions ];
  }
  const randomIndex = Math.floor(Math.random() * snakeBiteQuestions.length);
  const q = snakeBiteQuestions.splice(randomIndex, 1)[0];
  return q;
};