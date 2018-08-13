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
        if (this.x <= 505) { //505
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
        if (this.x <= 505) {
         ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        }
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
    constructor() {
        this.allChar = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png'];
        this.charNumber = 0;
    	this.sprite = 'images/char-boy.png';
    	this.x = 200;
    	this.y = 300;
    	this.alive = true;
        this.toggleGameOn = true;
    }
    changeCharacter() {
        if (this.charNumber !== 4) {
            this.charNumber++;
        } else {
            this.charNumber = 0;
        }
        this.sprite = this.allChar[this.charNumber];
    }
    update(dt) {
        if (this.alive === false){
            setTimeout( () => {
                this.x = 200;
                this.y = 300;
                if (this.alive === false) {
                    setTimeout( function popHeart() {
                        game.allHearts.pop();
                        if (game.allHearts.length === 0) {
                            setTimeout( function endOfGame(){
                                game.loseGame();
                            }, 300);
                            
                        }
                    }, 300);
                }
                this.alive = true;
            }, 50);            
        } 
        if (this.y === -20) {
            if (this.toggleGameOn) {
                setTimeout( function gameWon() {
                    this.toggleGameOn = false;
                    game.winGame();
            }, 0);
            }
            
           
        }
        // console.log(this.alive);
        return;
    }
    render() {
        if (game.glowStage.onGlowStage(this.x, this.y - 25)) {
            game.gameScore.theScore += 1;
        }
    	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    getLocation() {
    	const location = [];
    	location.push(this.x);
    	location.push(this.y);
    	return location;
    }
    
    handleInput(movement, rocks, playerMovable) {
        if (playerMovable === false) {
            return;
        }
        let dontMove = false;
    	if (movement === 'left') {
    		if (this.x !== 0) {
                rocks.forEach( (aRock) => {
                    if (aRock.isOccupied(this.x - 100, this.y - 20)) {
                        dontMove = true;
                    }
                });
                if (dontMove === false) {
    			    this.x -= 100;
                }
            }
            else {
                dontMove = true;
            }
    	}
    	else if (movement === 'right') {
    		if (this.x !== 400) {
                rocks.forEach( (aRock) => {
                    if (aRock.isOccupied(this.x + 100, this.y - 20)) {
                        dontMove = true;
                    }
                });
                if (dontMove === false) {
    			    this.x += 100;
                }
    		} else {
                dontMove = true;
            }
    	}
    	else if (movement === 'down') {
    		if (this.y !== 380) {
                rocks.forEach( (aRock) => {
                    if (aRock.isOccupied(this.x, this.y + 80 - 20)) {
                        dontMove = true;
                    }
                });
                if (dontMove === false) {
    			    this.y += 80;
                }
    			// console.log(this.y);
    		} else {
                dontMove = true;
            }
    		// console.log(this.y);

    	}
    	else if (movement === 'up') {
    		 if (this.y !== -20) {
                rocks.forEach( (aRock) => {
                    if (aRock.isOccupied(this.x, this.y - 80 - 20)) {
                       dontMove = true;
                    }
                });
                if (dontMove === false) {
                    this.y -= 80;
                }
	    		// console.log(this.y);
	    	} else {
                dontMove = true;
            }

    	}
        else if (movement === 'enter') {
            this.changeCharacter();
        }
        if (dontMove === false) {
            setTimeout(function stoneSpaceScore() {
                if (game.player.y === 60 || game.player.y === 140 || game.player.y ===  220) {
                    game.gameScore.theScore += 5;
                }
            }, 0);
        }
        return;
    }

}

class OtherItems {
    constructor() {
        // this.grassLocations = OtherItems.getGrassLocations();
        // this.stoneLocations = OtherItems.getStoneLocations();
        // this.waterLocations = OtherItems.getWaterLocations();
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

    static getRandomLocationOf(squareType) {
        if (squareType === 'grass') {
            const grassSquares = OtherItems.getGrassLocations();
            const numberOfGrassSquares = 10;
            const randomizedIndex = Math.floor(Math.random() * numberOfGrassSquares);
            return grassSquares[randomizedIndex];

        }
        else if (squareType === 'stone') {
            const stoneSquares = OtherItems.getStoneLocations();
            const numberOfStoneSquares = 15;
            const randomizedIndex = Math.floor(Math.random() * numberOfStoneSquares);
            return stoneSquares[randomizedIndex];
        }

        else if (squareType === 'water') {
            const waterSquares = OtherItems.getWaterLocations();
            const numberOfWaterSquares = 5;
            const randomizedIndex = Math.floor(Math.random() * numberOfWaterSquares);
            return waterSquares[randomizedIndex];
        }
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

class GlowStage extends OtherItems {
    constructor(theLocation = [200,140]) {
        super();
        this.sprite = 'images/Selector.png';
        this.x = theLocation[0];
        this.y = theLocation[1] - 25;
        this.theName = 'glow';
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    onGlowStage(xLocation, yLocation) {
        if (xLocation === this.x && yLocation === this.y) {
            return true;
        }
    }

    // getItemInfo() {
    //     return [this.theName, this.x, this.y];
    // }

    // isOccupied(locX, locY) {
    //     let test = false;
    //     if (this.x === locX && this.y === locY) {
    //         test = true;
    //     }
    //     return test;
    // }
}

class Rock extends OtherItems {
    constructor(theLocation = [0,380]) {
        super();
        this.sprite = 'images/Rock.png';
        this.x = theLocation[0];
        this.y = theLocation[1] - 20;
        this.theName = 'rock';
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    getItemInfo() {
        return [this.theName, this.x, this.y];
    }

    isOccupied(locX, locY) {
        let test = false;
        if (this.x === locX && this.y === locY) {
            test = true;
        }
        return test;
    }

}

class Sidebar {
    constructor() { 
    }
   
    static heartLocations(number = 0) {
        if (number === 0) {
            return [0,560];
        } 
        else if (number === 1) {
            return [100, 560];

        } 
        else if (number === 2) {
            return [200, 560];
        }
    }

    static scoreLocation(range = 0) {
        // 0 - 9
        if (range >= 0 && range <= 9) {
            return [340, 670];
        }
        //10 - 99
        else if (range >= 10 && range <= 99 ) {
            return [330, 670];
        }
        //100-999
        else if (range >= 100 && range <= 999) {
            return [320, 670];
        }
        // 1000 - 9999
        else if (range >= 1000 && range <= 9999) {
            return [307, 670];
        }
        // 10,000 - 99,999
        else if (range >= 10000 && range <= 99999) {
            return [310, 665]
        }
        else {
            return [310, 660]
        }    
    }

    static resetButtonLocation() {
        return [430, 645];
    }

    static helpButtonLocation() {
        return [443, 700];
    }

    render() {
        ctx.strokeRect(0, 600, 505, 110);
        ctx.beginPath()
        ctx.moveTo(305, 600);
        ctx.lineTo(305, 710);
        ctx.stroke();

        ctx.moveTo(405, 655);
        ctx.lineTo(550, 655);
        ctx.stroke();

        ctx.moveTo(405, 600);
        ctx.lineTo(405, 710);
        ctx.stroke();
    }
}

class ResetButton extends Sidebar {
    constructor() {
        super();
        this.symbol = '⟲';
        [this.x, this.y] = Sidebar.resetButtonLocation();
        //this.button = document.querySelector('.resetButton');
    }

    render() {
        ctx.font = '48px serif';
        ctx.fillText(this.symbol, this.x, this.y);
    }
    
}

class HelpButton extends Sidebar {
    constructor() {
        super();
        this.symbol = '?';
        [this.x, this.y] = Sidebar.helpButtonLocation();
        //this.button = document.querySelector('.resetButton');
    }

    render() {
        ctx.font = '56px serif';
        ctx.fillText(this.symbol, this.x, this.y);
    }
    
}

class Heart extends Sidebar {
    constructor(theLocation = 0) {
        super();
        this.sprite = 'images/Heart.png';
        this.x = Sidebar.heartLocations(theLocation)[0];
        this.y = Sidebar.heartLocations(theLocation)[1];
        this.theName = 'heart';

    }

     render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Score extends Sidebar {
    constructor() {
        super();
        this.theScore = 0;
        this.x = Sidebar.scoreLocation(0)[0];
        this.y = Sidebar.scoreLocation(0)[1];
        this.theName = 'score';

    }

    render() {
        if (this.theScore < 10000) {
            ctx.font = '48px serif';
        } 
        else if (this.theScore >= 10000 && this.theScore <= 99999) {
            ctx.font = '36px serif';
        }
        else if (this.theScore >= 100000 && this.theScore <= 999999) {
            ctx.font = '30px serif';
        }
        else {
             ctx.font = '20px serif';
        }

        [this.x, this.y] = Sidebar.scoreLocation(this.theScore);

        ctx.fillText(`${this.theScore}`, this.x, this.y);
    }
}

class GameVariables {
    constructor() {
        this.allEnemies = [];
        this.allRocks = [];
        this.player = new Player();
        this.glowStage = new GlowStage();
        this.sidebar = new Sidebar();
        // let heart1 = new Heart(0);
        // let heart2 = new Heart(1);
        // let heart3 = new Heart(2);
        this.allHearts = [new Heart(0), new Heart(1), new Heart(2)];
        this.gameScore = new Score();
        this.resetButton = new ResetButton();
        this.helpButton = new HelpButton();
        this.isPlayerMoveable = true;
    }

    loseGame() {

        this.openModal('loss');
        // alert('You Lose');
        // this.allEnemies = [];
        // this.allRocks = [];
        // this.player.x = 200;
        // this.player.y = 300;
        // this.glowStage.x = 200;
        // this.glowStage.y = 140 - 25;
        // // let heart1 = new Heart(0);
        // // let heart2 = new Heart(1);
        // // let heart3 = new Heart(2);
        // this.allHearts = [new Heart(0), new Heart(1), new Heart(2)]; 
        // this.gameScore.theScore = 0;
    }

    winGame() {
        // setTimeout( function displayWinModal() {

        // }
        
        this.openModal('win');
        // this.allEnemies = [];
        // this.allRocks = [];
        // this.player.x = 200;
        // this.player.y = 300;
        // this.glowStage.x = 200;
        // this.glowStage.y = 140 - 25;
        // // let heart1 = new Heart(0);
        // // let heart2 = new Heart(1);
        // // let heart3 = new Heart(2);
        // this.allHearts = [new Heart(0), new Heart(1), new Heart(2)]; 
        // this.gameScore.theScore = 0;
    }

    openModal(theEvent = 'win') {
        this.isPlayerMoveable = false;
    	const modal = document.querySelector('.modal');
    	modal.style.display = 'block';

        ///const textOfModal = modal.firstChild;

        //alert(textOfModal);
       // buttonOfModal.innerHTML = 'continue';
        //modal.firstChild.innerHTML = 'Continue';
    	if (theEvent === 'win') {
           modal.firstChild.textContent = GameVariables.getWinMessage(this.gameScore.theScore);

    	}
    	else if (theEvent === 'loss') {
            modal.firstChild.textContent = GameVariables.getLossMessage();
        }

        else if (theEvent === 'help') {
            modal.firstChild.textContent = GameVariables.getHelpMessage();
        }
     //    const button = modal.childNodes[3];

        // alert(button.outerHTML);


        // button.addEventListener('click', function() {
        //     alert('button clicked');
        // });
     //    alert(textOfModal);
    	// else if (theEvent === 'help') {

    	// }
    }

    closeModal() {
        const modal = document.querySelector('.modal');
        modal.style.display = 'none';
        if (modal.firstChild.textContent != GameVariables.getHelpMessage()) {
            this.resetGame();
        } else {
            this.isPlayerMoveable = true;
        }
    }

    resetGame() {
        this.isPlayerMoveable = true;
        this.allEnemies = [];
        this.allRocks = [];
        this.player.x = 200;
        this.player.y = 300;
        this.glowStage.x = 200;
        this.glowStage.y = 140 - 25;
        // let heart1 = new Heart(0);
        // let heart2 = new Heart(1);
        // let heart3 = new Heart(2);
        this.allHearts = [new Heart(0), new Heart(1), new Heart(2)]; 
        this.gameScore.theScore = 0;
        this.toggleGameOn = true;
    }

    static getHelpMessage() {
    	return 'Lets Help!';
    }

    static getWinMessage(score = 0) {
    	return `You Win with score ${score}`;

    }

    static getLossMessage() {
    	return 'You Lose!'
    }
}


//allItems.push(testRock);

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

const game = new GameVariables();

// let allEnemies = [];
// let allRocks = [];
// let player = new Player();
// let testGlow = new GlowStage();
// let sidebar = new Sidebar();
// let allHearts = [];
// let heart1 = new Heart(0);
// let heart2 = new Heart(1);
// let heart3 = new Heart(2);
// allHearts.push(heart1, heart2, heart3);

// // let sidebar = new Sidebar(false);
// setTimeout(function addSidebar() {
//     sidebar = new Sidebar(false);

// }, 0);

    //let heart = new Heart();




// We should change the interval to make it easier to harder. default at 1 second spawns 
//(about 4 to 6 enemies) each time
setInterval( function setEnemies() {
    let loc = Enemy.chooseLocation(Math.floor(Math.random() * 3));
    let speed = Enemy.randomSpeed();

    game.allEnemies.forEach( function(currentEnemy) {

        // Check if there are three enemies in that location, choose location

        if (loc[1] === currentEnemy.y) {
            while (speed > currentEnemy.speed) {
                speed = Enemy.randomSpeed();
            }
        }
    });
    const newEnemy = new Enemy(loc, speed);
    game.allEnemies.push(newEnemy);
    game.allEnemies = game.allEnemies.filter(allEnemies => allEnemies.offScreen === false);
    //console.log('number of objects on screen' + allEnemies.length);
}, 1000);

//console.log(OtherItems.grassLocations);

setInterval( function setRocks() {
    let loc = OtherItems.getRandomLocationOf('grass');

    let shouldWeSetRock = true;
    let playerLocation = game.player.getLocation();

    // Make only 6 rocks max appear in grass
    if (game.allRocks.length >= 6) {
        loc = OtherItems.getRandomLocationOf('water');
        if (game.allRocks.length === 9) {
            shouldWeSetRock = false;
        }
    }


    else if (loc[0] === 200 && loc[1] === 300) {
        shouldWeSetRock = false;
    }

    else if (loc[0] === game.player.x && loc[1] === game.player.y) {
        shouldWeSetRock = false;
    } 

    if (shouldWeSetRock) {
        game.allRocks.forEach( function(item) {
            if (item.isOccupied(loc[0], loc[1] - 20)) {
                shouldWeSetRock = false;
            }            
        });
    }

    if (shouldWeSetRock) {
        let newRock = new Rock(loc);
        game.allRocks.push(newRock);
    }

}, 10000); //10000

setInterval( function setGlowStage() {
    let loc = OtherItems.getRandomLocationOf('stone');
    game.glowStage.x = loc[0];
    game.glowStage.y = loc[1] - 25;

}, 5000); // 5000

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        13: 'enter',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
     };

    game.player.handleInput(allowedKeys[e.keyCode], game.allRocks, game.isPlayerMoveable);

    //document.body.style = 'overflow:scroll';

    
    
});

document.addEventListener('keydown', function disableKeyScrolling(e) {
    e.preventDefault();
});

setTimeout(function () {
    let canvas = document.querySelector('canvas');
    canvas.addEventListener('click', function setupResetButton(event) {
        let boundingRect = canvas.getBoundingClientRect();
        const xLoc = event.clientX - boundingRect.left;
        const yLoc = event.clientY - boundingRect.top;
        // console.log(`Reset clicked at ${xLoc}, ${yLoc}`);
       
        if (  xLoc >= 425 && xLoc <= 485) {
            if (yLoc >= 605 && yLoc <= 650) {
                setTimeout(function() {
                    game.resetGame();
                   // console.log(`Reset clicked at ${xLoc}, ${yLoc}`);
                }, 100);
               
            }
        }
       
    });

   canvas.addEventListener('click', function setupHelpButton(event) {
        let boundingRect = canvas.getBoundingClientRect();
        const xLoc = event.clientX - boundingRect.left;
        const yLoc = event.clientY - boundingRect.top;
        // console.log(`Reset clicked at ${xLoc}, ${yLoc}`);
        // console.log(`Help clicked at ${xLoc}, ${yLoc}`);
        if (  xLoc >= 435 && xLoc <= 480) {
            if (yLoc >= 660 && yLoc <= 705) {
                setTimeout(function() {
                    game.openModal('help');
                   //alert('Help Clicked');
                   // console.log(`Reset clicked at ${xLoc}, ${yLoc}`);
                }, 100);
               
            }
        }
       
    });
    
}, 0);

function continueButtonClicked(event) {
    event.preventDefault();
    game.closeModal();

}

document.querySelector('.modal-button').addEventListener('click', continueButtonClicked);
    
