// Enemies our player must avoid
class Enemy {
    constructor(theLocation = [0,220] , theSpeed = 1) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';

        this.x = theLocation[0];

        this.y = theLocation[1];

        this.speed = theSpeed;

    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    };

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    static getLocations(locNum) {
        let location = [];
        // Bottom Square
        if (locNum === 0) {
            location = [0,220];
        } 
        // Middle Square
        else if (locNum === 1) {
            location = [0,140];
        }
        // Top Square
        else {
            location = [0,60];
        }
        return location;
    }
};
// var Enemy = function() {
//     // Variables applied to each of our instances go here,
//     // we've provided one for you to get started

//     // The image/sprite for our enemies, this uses
//     // a helper we've provided to easily load images
//     this.sprite = 'images/enemy-bug.png';
// };

// // Update the enemy's position, required method for game
// // Parameter: dt, a time delta between ticks
// Enemy.prototype.update = function(dt) {
//     // You should multiply any movement by the dt parameter
//     // which will ensure the game runs at the same speed for
//     // all computers.
// };

// // Draw the enemy on the screen, required method for game
// Enemy.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {

    }
    update() {
        return;
    }
    render() {
        return;
    }
    handleInput() {
        return;
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemy1 = new Enemy(Enemy.getLocations(0));
const enemy2 = new Enemy(Enemy.getLocations(1));
const enemy3 = new Enemy(Enemy.getLocations(2));

let allEnemies = [enemy1, enemy2, enemy3];
let player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});