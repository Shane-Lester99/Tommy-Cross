// Enemies our player must avoid
class Enemy {
    constructor(theLocation = [0,220] , theSpeed = 50) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';

        this.x = theLocation[0];

        this.y = theLocation[1];

        this.speed = theSpeed;

        this.offScreen = false;

    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
        if (this.x <= 505) {
            this.x += dt * this.speed;
        }
        else {
            this.offScreen = true;
        }

    };

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    static chooseLocation(locNum) {
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
    };

    static randomSpeed() {
    //     // if (speedLvl === 0) {

    //     // }
    //     // else if (speedLvl === 1) {

    //     // }
    //     // else if (speedLvl === 2) {

    //     // }
    //     // else if (speedLvl === 3) {

    //     // }
    //     // else if (speedLvl === 4) {

    //     // }
    //     // else if (speedLvl === 5) 
        return Math.floor(Math.random() * 301 + 100);
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
//let enemy1 = new Enemy(Enemy.chooseLocation(1), Enemy.chooseSpeed());

//for (let i = 0; i < 50; i++) {
//     console.log(Enemy.chooseSpeed());
// }



let allEnemies = []; 
let player = new Player();

setInterval( function() {
    const loc = Enemy.chooseLocation(Math.floor(Math.random() * 3));
    let speed = Enemy.randomSpeed();
    allEnemies.forEach( function(currentEnemy) {
        if (loc[1] === currentEnemy.y) {
            while (speed > currentEnemy.speed) {
                speed = Enemy.randomSpeed();
            }
        }
    });
    const newEnemy = new Enemy(loc, speed);
    allEnemies.push(newEnemy);
    allEnemies = allEnemies.filter(allEnemies => allEnemies.offScreen === false);
    console.log('number of objects on screen' + allEnemies.length);
}, 1000);



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
