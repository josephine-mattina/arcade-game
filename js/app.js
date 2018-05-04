
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
	//can check if player reaches goal
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
		// Call reset function when player reaches top of board
		player.reset();
	}
}

// Collision check logic between player and enemies based on https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
Player.prototype.checkCollision = function() {
	for (let i = 0; i < allEnemies.length; i++) {
		if (player.x < allEnemies[i].x + 80 &&
			player.x + 80 > allEnemies[i].x &&
			player.y < allEnemies[i].y + 50 &&
			player.y + 50 > allEnemies[i].y) {
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
	new Enemy(0, 145, 200),
	new Enemy(0, 225, 300)
];

const player = new Player(205, 390);

// Listen for key presses and send keys to Player.handleInput() method, provided by Udacity
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
