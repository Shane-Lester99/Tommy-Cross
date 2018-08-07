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
        return this.findSquare();
                //console.log(this.findSquare());

    };

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    getRawLocation() {
    	const location = [];
    	location.push(this.x);
    	location.push(this.y);
    	return location;
    }

    findSquare() {
        let location = this.getRawLocation();
        if (this.x >= 0 && this.x < 60) {
            location[0] = 0;
        }
        else if (this.x >= 60 && this.x < 160) {
            location[0] = 100;
        }
        else if (this.x >= 160 && this.x < 260) {
            location[0] = 200;
        }
        else if (this.x >= 260 && this.x < 360) {
            location[0] = 300;
        }
        else if (this.x >= 360 && this.x <= 460) {
            location[0] = 400;
        }
        return location;
       // if (this.y === 60) {

       // }
       // else if (this.y === 140) {

       // }
       // else if (this.y === 220) {

       // }

    }

    static chooseLocation(locNum) {
        let location = [];
        // Bottom Square
        if (locNum === 0) {
            location = [-50,220];
        } 
        // Middle Square
        else if (locNum === 1) {
            location = [-50,140];
        }
        // Top Square
        else {
            location = [-50,60];
        }
        return location;
    };

    static randomSpeed() {
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
    constructor(theLocation = [200,300]) {
    	this.sprite = 'images/char-boy.png';
    	this.x = theLocation[0];
    	this.y = theLocation[1];
    	this.alive = true;

    }
    update(dt) {
        if (this.alive === false){
            setTimeout( () => {
                this.x = 200;
                this.y = 300;
                this.alive = true;
            }, 50);
            
        }
        if (this.y === -20) {
            setTimeout( () => {
                alert('You win!');
                this.x = 200;
                this.y = 300;
            }, 0);
           
        }
        // console.log(this.alive);
        return;
    }
    render() {
    	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    getLocation() {
    	const location = [];
    	location.push(this.x);
    	location.push(this.y);
    	return location;
    }
    
    handleInput(movement) {
    	if (movement === 'left') {
    		if (this.x !== 0) {
    			this.x -= 100;
            }
    	}
    	else if (movement === 'right') {
    		if (this.x !== 400) {
    			this.x += 100;
    		}
    	}
    	else if (movement === 'down') {
    		if (this.y !== 380) {
    			this.y += 80;
    			// console.log(this.y);
    		}
    		// console.log(this.y);

    	}
    	else if (movement === 'up') {
    		 if (this.y !== -20) {
	    		this.y -= 80;
	    		// console.log(this.y);
	    	}

    	}
         console.log(`x: ${this.x}, y: ${this.y}`);
        return;
    }
}

class OtherItems {
    constructor() {
        this.grassLocations = OtherItems.getGrassLocations();
        this.stoneLocations = OtherItems.getStoneLocations();
        this.waterLocations = OtherItems.getWaterLocations();

    }

    static getGrassLocations() {
        let allGrassLocations = [];
        for (let x = 0; x <= 400; x += 100) {
            allGrassLocations.push([x, 380]);
            allGrassLocations.push([x, 300]);
        }
        // console.log(allGrassLocations);
        return allGrassLocations;

    }

    static getStoneLocations() {
        let allStoneLocations = [];
        for (let x = 0; x <= 400; x += 100) {
            allStoneLocations.push([x, 60]);
            allStoneLocations.push([x, 140]);
            allStoneLocations.push([x, 220]);
        }
        // console.log(allStoneLocations);
        return allStoneLocations;
    }

    static getWaterLocations() {
        let allWaterLocations = [];
        for (let x = 0; x <= 400; x += 100) {
            allWaterLocations.push([x, -20]);
        }
        // console.log(allWaterLocations);
        return allWaterLocations;
    }

}

let test = new OtherItems();

// class Rocks extends OtherItems {
//     constructor() {
//         this.
//     }
// }


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
//let enemy1 = new Enemy(Enemy.chooseLocation(1), Enemy.chooseSpeed());

//for (let i = 0; i < 50; i++) {
//     console.log(Enemy.chooseSpeed());
// }

let allEnemies = [];
let player = new Player();

// We should change the interval to make it easier to harder. default at 1 second spawns 
//(about 4 to 6 enemies) each time
setInterval( function() {
    let loc = Enemy.chooseLocation(Math.floor(Math.random() * 3));
    let speed = Enemy.randomSpeed();

    // TODO: Makes it so that enemies dont bang into each other

    allEnemies.forEach( function(currentEnemy) {

        // Check if there are three enemies in that location, choose location

        if (loc[1] === currentEnemy.y) {
            while (speed > currentEnemy.speed) {
                speed = Enemy.randomSpeed();
            }
        }
    });
    const newEnemy = new Enemy(loc, speed);
    allEnemies.push(newEnemy);
    allEnemies = allEnemies.filter(allEnemies => allEnemies.offScreen === false);
    //console.log('number of objects on screen' + allEnemies.length);
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
