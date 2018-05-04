/**
 * @description Set edges of game board to keep player on the board
 * If the canvas size is changed in engine.js the values can be changed accordingly
 */
const canvasEdge = {
	top: 83,
	right: 404,
	bottom: 390,
	left: 10
};

/** 
 * @description Enemies our player must avoid
 * @constructor
 * @param {number} x - Set x co-ordinate of enemy image on canvas
 * @param {number} y - Set y co-ordinate of enemy image on canvas
 * @param {number} speed - set speed an enemy moves across screen in milliseconds
 */
const Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

/**
 * @description Update the enemy's position, required method for game
 * @param {number} dt - A time delta between ticks to ensure the game runs at the same speed for all computers
 */
Enemy.prototype.update = function(dt) {
    if (this.x < (canvasEdge.right + 100)) {
	    this.x = this.x + this.speed * dt;
    } else {
    	this.x = -100;
    }

};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/** 
 * @description The player character
 * @constructor
 * @param {number} x - Set x co-ordinate of player image on canvas
 * @param {number} y - Set y co-ordinate of player image on canvas
 */
const Player = function(x, y) {
	this.sprite = 'images/char-horn-girl.png';
	this.x = x;
	this.y = y;
};

// Update game status
Player.prototype.update = function() {
	//Check for collisions with enemies
	player.checkCollision();
}

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

/**
 * @description Update player movement around game board, limit by canvasEdge values
 * Based on ideas from discussion forum: https://discussions.udacity.com/t/all-i-can-say-is-help/182155/7
 * @param {string} key - Takes key press from event listener
*/
Player.prototype.handleInput = function(key) {
	if (key === 'up' && this.y > canvasEdge.top) {
		this.y = this.y - 85;
	} else if (key === 'down' && this.y < canvasEdge.bottom) {
		this.y = this.y + 85;
	} else if (key === 'left' && this.x > canvasEdge.left) {
		this.x = this.x - 101;
	} else if (key === 'right' && this.x < canvasEdge.right) {
		this.x = this.x + 101;
	} else if (key === 'up' && this.y <= canvasEdge.top) {
		// Call gameWin function when player reaches top of board
		gameWin();
	}
}

// Collision check logic between player and enemies based on https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
Player.prototype.checkCollision = function() {
	for (let i = 0; i < allEnemies.length; i++) {
		if (player.x < allEnemies[i].x + 80 &&
			player.x + 80 > allEnemies[i].x &&
			player.y < allEnemies[i].y + 45 &&
			player.y + 45 > allEnemies[i].y) {
				player.reset();
		}
	}
}

// Reset player to start position
Player.prototype.reset = function() {
	this.x = 205;
	this.y = 390;
}

// Instantiate enemy and player objects
const allEnemies = [
	new Enemy(0, 60, 400),
	new Enemy(-50, 145, 200),
	new Enemy(-100, 225, 300),
	new Enemy(0, 145, 500),
	new Enemy(-25, 225, 350)
];

const player = new Player(205, 390);

// Listen for allowed key presses to control player movement
document.addEventListener('keyup', keys);

// Define keys to control player movement
function keys(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    // Send keys to Player.handleInput() method
    player.handleInput(allowedKeys[e.keyCode]);
}

// Game win modal
const winModal = document.querySelector('.win-modal');
const gameHeader = document.querySelector('header');
// const winTime = document.querySelector('.win-time');
// const winMessage = document.querySelector('.win-stats');
const playAgain = document.querySelector('.play-again');
// Toggle to control motion of enemies in gameWin() function
let gameStop = false;

function gameWin() {
	// Stop motion of bugs when player wins game
	gameStop = true;

	// Prevent player movement after winning
	document.removeEventListener('keyup', keys);

	// Display win modal
	winModal.style.display = 'block';
	gameHeader.style.color = '#fff';
	// TODO:
	// winTime.innerHTML = timerText.innerHTML;
	// winMessage.innerHTML = 'You won with ' + moves.innerHTML + ' moves and ' + stars.length + ' stars';
	playAgain.addEventListener('click', restartGame);

	// TODO: enter key event listener - make button aria-focused?
	winModal.addEventListener('keyup', function(e) {
		const keyPress = e.keyCode;
		console.log(keyPress);
		if (keyPress === 13) {
			restartGame();
		}
	});
}

// Restart game 
function restartGame() {
	location.reload();
}
