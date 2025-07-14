// =============================
// QUESTION LOGIC SECTION
// =============================

// Global flags and indices
let questionModalActive = false;
let skipQuestionCheck = false; // flag to skip question check during bonus/penalty moves
let currentQuestionIndex = 0;
let currentSnakeQuestionIndex = 0;

// Question banks for the selected module
let moduleQuestions = { easy: [], hard: [] };
let allQuestionsData = null;
let selectedModule = null;

// Load questions from JSON file
async function loadQuestions() {
  try {
    const response = await fetch('./questions/questions.json');
    allQuestionsData = await response.json();
    console.log('Questions loaded successfully:', allQuestionsData);
  } catch (error) {
    console.error('Error loading questions:', error);
    // Fallback to hardcoded questions if JSON fails to load
    allQuestionsData = getFallbackQuestions();
  }
}

// Set questions for the selected module
function setModuleQuestions(moduleId) {
  if (!allQuestionsData || !allQuestionsData[moduleId]) {
    console.error(`Module ${moduleId} not found in questions data`);
    return false;
  }
  
  const moduleData = allQuestionsData[moduleId];
  
  // Check if moduleData is an array (new format) or object with easy/hard (old format)
  if (Array.isArray(moduleData)) {
    // New format: array of questions with difficulty property
    const easyQuestions = moduleData.filter(q => q.difficulty === 'easy');
    const hardQuestions = moduleData.filter(q => q.difficulty === 'hard');
    
    // Convert to the format expected by the game
    moduleQuestions.easy = easyQuestions.map(q => ({
      text: q.question,
      options: q.options,
      correctIndex: q.correct
    }));
    
    moduleQuestions.hard = hardQuestions.map(q => ({
      text: q.question,
      options: q.options,
      correctIndex: q.correct
    }));
    
    console.log(`Loaded ${moduleQuestions.easy.length} easy and ${moduleQuestions.hard.length} hard questions for module: ${moduleId}`);
  } else {
    // Old format: object with easy/hard arrays
    moduleQuestions.easy = [...moduleData.easy]; // Copy arrays to avoid mutation
    moduleQuestions.hard = [...moduleData.hard];
    
    console.log(`Loaded ${moduleQuestions.easy.length} easy and ${moduleQuestions.hard.length} hard questions for module: ${moduleData.name}`);
  }
  
  // Shuffle both arrays
  shuffle(moduleQuestions.easy);
  shuffle(moduleQuestions.hard);
  
  // Reset indices
  currentQuestionIndex = 0;
  currentSnakeQuestionIndex = 0;
  
  return true;
}

// Fallback questions in case JSON loading fails
function getFallbackQuestions() {
  return {
    "dol": {
      "name": "Domains of Learning",
      "easy": [
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
        }
      ],
      "hard": [
        {
          text: "Which action verb is most suitable for the Responding level in the affective domain?",
          options: ["Assists", "Organizes", "Evaluates", "Generates"],
          correctIndex: 0
        }
      ]
    }
  };
}

// Get a random question from the easy questions for the selected module
function getRandomQuestion() {
  if (!moduleQuestions.easy || moduleQuestions.easy.length === 0) {
    console.error('No easy questions available for the selected module');
    return getFallbackQuestion();
  }
  
  const question = moduleQuestions.easy[currentQuestionIndex % moduleQuestions.easy.length];
  return question;
}

// Get a random hard question (for snake bites) from the selected module
function getSnakeBiteQuestion() {
  if (!moduleQuestions.hard || moduleQuestions.hard.length === 0) {
    console.error('No hard questions available for the selected module');
    return getFallbackQuestion();
  }
  
  const question = moduleQuestions.hard[currentSnakeQuestionIndex % moduleQuestions.hard.length];
  return question;
}

// Fallback question if module questions are not available
function getFallbackQuestion() {
  return {
    text: "What is the main purpose of education?",
    options: ["To entertain", "To facilitate learning", "To pass time", "To create rules"],
    correctIndex: 1
  };
}

//Adding function to shuffle the questions appearing on screen
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

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
  const closeBtn = document.getElementById("closeQuestion");
  
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
      <label class="option-label">
        <input type="radio" name="questionOption" value="${idx}" />
        <span class="option-text">${opt}</span>
      </label>
    `;
  });

  // Function to handle closing the modal
  const closeModal = () => {
    questionModal.classList.add("hidden");
    questionModalActive = false;
    
    if (isStart) {
      // If closing during start, move to next player
      currentPlayer = (playerNumber % playersCount) + 1;
      disableDices();
    } else if (isSnakeBite && snakeTail !== null) {
      // If closing snake question, apply penalty
      players[playerNumber - 1].score = snakeTail;
      updateBoard();
    } else {
      // For regular questions, just continue the game
      skipQuestionCheck = false;
    }
  };

  // Add event listener for close button
  const closeHandler = () => closeModal();
  
  if (closeBtn) closeBtn.addEventListener("click", closeHandler, { once: true });

  // Submit button handler with better validation
  const submitHandler = () => {
    console.log("Submit button clicked");
    const selected = document.querySelector('input[name="questionOption"]:checked');
    
    if (!selected) {
      // Show alert if no option is selected
      alert("Please select an option before submitting.");
      return;
    }

    const userAnswer = parseInt(selected.value);
    questionModal.classList.add("hidden");

    // Clean up event listeners
    if (closeBtn) closeBtn.removeEventListener("click", closeHandler);

    // Update question indices for cycling through questions
    if (isSnakeBite) {
      currentSnakeQuestionIndex++;
      if (currentSnakeQuestionIndex >= moduleQuestions.hard.length) {
        shuffle(moduleQuestions.hard);
        currentSnakeQuestionIndex = 0;
      }
    } else {
      currentQuestionIndex++;
      if (currentQuestionIndex >= moduleQuestions.easy.length) {
        shuffle(moduleQuestions.easy);
        currentQuestionIndex = 0;
      }
    }
    questionModalActive = false;
	

    // New1: Start condition handling
	if (isStart) {
	  console.log("Start condition triggered");
	  let correctAnswerText = q.options[q.correctIndex]; // Define the correct answer text
	  if (userAnswer === q.correctIndex) {
		players[playerNumber - 1].correct++;
		correctSound.play(); // Play the correct answer sound
		showFeedback(`Correct Answer ${players[playerNumber - 1].name} 😀!<br><strong>Answer:</strong> ${correctAnswerText}<br>You can start the Game!`, () => {
		  players[playerNumber - 1].hasStarted = true;
		  currentPlayer = playerNumber;
		  disableDices();
		}, 4000); // Increased time to 4 seconds
	  } else {
		players[playerNumber - 1].incorrect++;
		incorrectSound.play(); // Play the incorrect answer sound
		showFeedback(`Incorrect Answer ${players[playerNumber - 1].name} 😢!<br><strong>Correct Answer:</strong> ${correctAnswerText}<br>Please try again in the next turn`, () => {
		  currentPlayer = (playerNumber % playersCount) + 1;
		  disableDices();
		}, 4000); // Increased time to 4 seconds
	  }
	  return;
	}
	//NEW1 End

	// Existing behavior for snakes and ladders:
    skipQuestionCheck = true;

    let currentScore = players[playerNumber - 1].score;

    // Function to show feedback then call the callback - Updated with longer display time
	function showFeedback(message, callback, duration = 3500) {
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
		if (callback) callback();
	  }, duration); // Use the duration parameter (default 3.5 seconds)
	}

		if (userAnswer === q.correctIndex) {
		  players[playerNumber - 1].correct++; // Increment correct counter
		  correctSound.play(); // Play the correct answer sound
		  let bonus = 2; // Default bonus for a correct answer
		  let correctAnswerText = q.options[q.correctIndex];

		  // Check if landing on a snake after bonus steps should increase bonus
			let futurePosition = players[playerNumber - 1].score + bonus;
			  if (snakes.some(snake => snake[0] === futurePosition)) {
				bonus = 3;
			  }
			  // Use the existing feedback modal to display the correct answer screen
			  showFeedback(`Correct Answer ${players[playerNumber - 1].name} 😀!<br><strong>Answer:</strong> ${correctAnswerText}<br>Moving ${bonus} steps forward.`, () => {
				movePot(bonus, playerNumber);
			  }, 4000); // 4 seconds to read the correct answer
			} else {
			  players[playerNumber - 1].incorrect++; 
			  let correctAnswerText = q.options[q.correctIndex];
			  incorrectSound.play(); // Play the incorrect answer sound
			  if (isSnakeBite && snakeTail !== null) {
				snake.play();
				showFeedback(
				  `Incorrect Answer ${players[playerNumber - 1].name} 😢!<br><strong>Correct Answer:</strong> ${correctAnswerText}<br>Moving directly to snake tail at position ${snakeTail}.`,
				  () => {
					players[playerNumber - 1].score = snakeTail;
					updateBoard();
				  },
				  4000 // 4 seconds to read the correct answer
				);
			  } else {
			let penalty = -2;
			if (ladders.some(ladder => ladder[0] === players[playerNumber - 1].score + penalty)) {
			  penalty = -3;
			}
			showFeedback(
			  `Incorrect Answer ${players[playerNumber - 1].name} 😢!<br><strong>Correct Answer:</strong> ${correctAnswerText}<br>Moving ${Math.abs(penalty)} steps backward.`,
			  () => {
				movePot(penalty, playerNumber);
			  },
			  4000 // 4 seconds to read the correct answer
			);
		  }
		}
  };

  // Attach the submit handler
  submitBtn.addEventListener("click", submitHandler, { once: true });
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

// Initial state at the beginning of the game
const initialState = () => {
  drawBoard();
  addQuestionIndicators();
  screen2.style.display = "none";
  screen3.style.display = "none";
};

// Initialize the game on page load
document.addEventListener("DOMContentLoaded", async function() {
  // Load questions from JSON file
  await loadQuestions();
  
  // Show the welcome screen first
  showScreen("welcomeScreen");

  // Event listener for the Welcome Next button
  document.getElementById("welcomeNextBtn").addEventListener("click", function() {
    showScreen("rulesScreen");
  });

  // Event listener for the Rules Next button
  document.getElementById("rulesNextBtn").addEventListener("click", function() {
    showScreen("moduleScreen");
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

// =============================
// MODULE SELECTION LOGIC
// =============================

// Function to select a module
function selectModule(moduleId) {
  console.log(`Selecting module: ${moduleId}`);
  console.log('Available questions data:', allQuestionsData ? Object.keys(allQuestionsData) : 'No data');
  
  // Remove selection from all cards
  const allCards = document.querySelectorAll('.module-card');
  allCards.forEach(card => card.classList.remove('selected'));
  
  // Add selection to clicked card
  const selectedCard = document.querySelector(`[data-module="${moduleId}"]`);
  if (selectedCard) {
    selectedCard.classList.add('selected');
    selectedModule = moduleId;
    
    // Load questions for the selected module
    const success = setModuleQuestions(moduleId);
    if (success) {
      console.log(`Successfully loaded questions for module: ${moduleId}`);
      console.log(`Easy questions: ${moduleQuestions.easy.length}, Hard questions: ${moduleQuestions.hard.length}`);
      
      // Enable the next button
      const nextBtn = document.getElementById('moduleNextBtn');
      if (nextBtn) {
        nextBtn.disabled = false;
        nextBtn.classList.remove('disabled');
        nextBtn.style.opacity = '1';
        nextBtn.style.cursor = 'pointer';
        nextBtn.style.backgroundColor = '#ff6b35';
        console.log('Next button enabled');
      } else {
        console.error('Next button not found!');
      }
    } else {
      console.error(`Failed to load questions for module: ${moduleId}`);
    }
  } else {
    console.error(`Module card not found for: ${moduleId}`);
  }
}

// Function to go back to rules screen
function backToRules() {
  showScreen("rulesScreen");
}

// Function to proceed to player selection after module is selected
function proceedToPlayerSelection() {
  if (selectedModule && moduleQuestions.easy.length > 0) {
    console.log(`Proceeding with module: ${selectedModule}`);
    console.log(`Easy questions: ${moduleQuestions.easy.length}, Hard questions: ${moduleQuestions.hard.length}`);
    // Navigate to player selection screen
    showScreen("screen1");
  } else {
    console.error('No module selected or no questions loaded');
  }
}
