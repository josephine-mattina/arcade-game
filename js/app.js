
// Set edges of game board to keep player on the board. 
const canvasEdge = {
	top: 83,
	right: 404,
	bottom: 390,
	left: 10
};

// Enemies our player must avoid
const Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < (canvasEdge.right + 100)) {
	    this.x = this.x + this.speed * dt;
    } else {
    	this.x = -100;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function(x, y) {
	this.sprite = 'images/char-horn-girl.png';
	this.x = x;
	this.y = y;
};

Player.prototype.update = function(dt) {
	//can check collisions
	// player.checkCollision();
	//can check if player reaches goal
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// handleInput method based on ideas from discussion forum: https://discussions.udacity.com/t/all-i-can-say-is-help/182155/7
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
		player.reset();
	}
}

Player.prototype.reset = function() {
	this.x = 205;
	this.y = 390;
}

// Now instantiate/call your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [
	new Enemy(0, 60, 400),
	new Enemy(0, 145, 200),
	new Enemy(0, 225, 300)
];


// Place the player object in a variable called player
const player = new Player(205, 390);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
