/*************************************************************************
Title:       app.js

Author:      Shane Lester

Created on:  September 1st 2018

Description: Creates objects for all items on the screen that are interactive.
             These include enemies (bugs), rocks, player, switching players, 
             the glow square, and the sidebar below the game screen. For 
             more information on the game please refer to the README 
             within this project.
             
 *************************************************************************/

/**
* @description Class that output enemy objects. These are represented as 
* bugs on the screen.
* @constructor Creates the object and assigns its current location (can
* be one of three tiles), speed, and its icon image.
* @param {Array} theLocation This is an array that contains the location
* of the object. Its x coordinate is always -50, but its y can be 220, 140
* or 60. These are the three tiles that the enemy location can occupy.
* @param {Array} theSpeed This will assign how fast the enemy moves across the
* field. The number 100 has no intrinsic value/ measurment, but it can be assumed
* that it is standardized elsewhere in the program so it
* runs the same across all browsers.
*/
class Enemy {
    constructor(theLocation = [-50,220] , theSpeed = 100) {
        // Assigns the image sprite
        this.sprite = 'images/enemy-bug.png';
        // Assigns the x and y location of the enemy
        this.x = theLocation[0];
        this.y = theLocation[1];
        // Assigns the speed of the enemy. Can be from 100-400.
        this.speed = theSpeed;
        // This is turned to true once the enemy object leaves the
        // right side of the screen. Then the object will be deleted
        // elsewhere in the program.
        this.offScreen = false;
    }

    /**
    * @description Updates the position of the enemy object.
    * @param {Number} dt This parameter standardizes movemenet to ensure
    * the game runs at the same speed across all browsers
    * @returns {Array} This array signifies the current square that the
    * enemy is on standarized so it can be compared to other objects.
    * Like for example, if the object is on an x location of 120, it will
    * return 100 as the x location so it can be compared to the other game 
    * objects which also have that as the game location.
    */
    update(dt) {
        // This will move the player across the screen as a function of 
        // the speed, the current x location, and the dt paramater
        if (this.x <= 505) {
            this.x += dt * this.speed;
        }
        // If the object is off the screen, update this member variable
        // so it is known this object is no longer usable
        else {
            this.offScreen = true;
        }
        // Returns a reference point to the current square to be compared
        // to other game objects. 
        return this.findSquare();
    };

    /**
    * @description Draw the enemy on the screen, required method for game
    */
    render() {
        // Will only render the object if it is still onscreen
        if (this.x <= 505) {
        // This will draw the image sprite to the correct location on the
        // canvas.
         ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        }
    };

    /**
    * @description Returns the exact location of the enemy object on the 
    * canvas element
    * @returns {Array} This function returns the exact location of the
    * enemy object. Note that this is nonstardized, so it cant be compared
    * to other game objects with any degree of accuracy
    */
    getRawLocation() {
        // Create an array thats empty.
    	const location = [];
        // Push the x and y location as is onto the array
    	location.push(this.x);
    	location.push(this.y);

        // Return the array
    	return location;
    }

    /**
    * @description This function will return the location of the enemy object
    * standardized to be compared to other game objects.
    * @returns {Array} Will return the standardized x and y location. Although note
    * that the y comes standardized before this function is called (becaue it is discrete
    * (can only be 3 values) while the x location is continuous)
    */ 
    findSquare() {
        // Get the non stardized location of the object
        let location = this.getRawLocation();
        // Standardize the x location based on the range that the continuous
        // x value is on. 
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

    /**
    * @description Static function to return the three possible starting locations of any 
    * enemy object. Used to initialize the enemy object with a random value.
    * @param {Array} locNum This is the location number. 0 is the bottom stone tile, 1 is 
    * the stone tile directly above it and any other number is for the top stone tile. 
    * @returns {Array} Will return the standardized x and y location. Although note
    * that the y comes standardized before this function is called (becaue it is discrete
    * (can only be 3 values) while the x location is continuous)
    */ 
    static chooseLocation(locNum) {
        // Create an empty array that represents the objects location
        let location = [];
        // If 0 is the parameter, choose the bottom stone tile
        if (locNum === 0) {
            location = [-50,220];
        } 
        // If 1, choose the middle stone tile
        else if (locNum === 1) {
            location = [-50,140];
        }
        // If 2, choose the top stone tile
        else {
            location = [-50,60];
        }
        // We return the location specified in the parameter
        return location;
    };

    /**
    * @description This function will choose a random discrete speed from 100 - 400.
    */
    static randomSpeed() {
        return Math.floor(Math.random() * 301 + 100);
    }
};

/**
* @description This class creates the Player object. This is the single movable character
* on the screen.
* @constructor Chooses all the possible character sprites, initializes it to the boy (Tommy Cross)
* and marks his initial location. 
*/
class Player {
    constructor() {
        // This is the array that contains all the possible characters. 
        this.allChar = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png'];
        // This marks an index value to signify which character we will use
        this.charNumber = 0;
        // Initialize the image to the boy (Tommy Cross)
    	this.sprite = 'images/char-boy.png';
        // Choose his initial square in which he spawns
    	this.x = 200;
    	this.y = 300;
        // This signifies if he is still around for the current turn
    	this.alive = true;
        // This signifies when the turn ends or not
        this.toggleRoundOn = true;
    }
    /**
    * @description: 
    */
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
                        game.sidebar.allHearts.pop();
                        if (game.sidebar.allHearts.length === 0) {
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
            if (this.toggleRoundOn) {
                this.toggleRoundOn = false;
                setTimeout( function gameWon() {
                    game.winGame();
                }, 0);
            }
            
           
        }
        // console.log(this.alive);
        return;
    }
    render() {
        if (game.items.glowStage.onGlowStage(this.x, this.y - 25)) {
            game.sidebar.gameScore.theScore += 1;
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
        let isInputValid = false;
        ['left','right','down','up','enter'].forEach( function checkInput(validMove) {
            if (movement === validMove) {
                isInputValid = true;
            }
        });
        if (isInputValid === false) {
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
            return;
        }
        if (dontMove === false) { 
            setTimeout(function stoneSpaceScore() {
               // sound.pause();

                if (game.player.y === 60 || game.player.y === 140 || game.player.y ===  220) {
                    game.sidebar.gameScore.theScore += 5;
                }
            }, 0);
        }
        return;
    }

}

class Items {
    constructor() {
        // this.grassLocations = OtherItems.getGrassLocations();
        // this.stoneLocations = OtherItems.getStoneLocations();
        // this.waterLocations = OtherItems.getWaterLocations();
        this.allRocks = [];   
        this.glowStage = new GlowStage();
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
            const grassSquares = Items.getGrassLocations();
            const numberOfGrassSquares = 10;
            const randomizedIndex = Math.floor(Math.random() * numberOfGrassSquares);
            return grassSquares[randomizedIndex];

        }
        else if (squareType === 'stone') {
            const stoneSquares = Items.getStoneLocations();
            const numberOfStoneSquares = 15;
            const randomizedIndex = Math.floor(Math.random() * numberOfStoneSquares);
            return stoneSquares[randomizedIndex];
        }

        else if (squareType === 'water') {
            const waterSquares = Items.getWaterLocations();
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

class GlowStage {
    constructor(theLocation = [200,140]) {
        //super();
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

class Rock {
    constructor(theLocation = [0,380]) {
        //super();
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
        this.allHearts = [new Heart(0), new Heart(1), new Heart(2)];
        this.gameScore = new Score();
        this.resetButton = new ResetButton();
        this.helpButton = new HelpButton();
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

        this.resetButton.render();

        this.helpButton.render();
        
        this.allHearts.forEach(function(heart) {
            heart.render();
        });

        this.gameScore.render();
    }
}

class ResetButton  {
    constructor() {
        //super();
        this.symbol = '⟲';
        [this.x, this.y] = Sidebar.resetButtonLocation();
        //this.button = document.querySelector('.resetButton');
    }

    render() {
        ctx.font = '48px serif';
        ctx.fillText(this.symbol, this.x, this.y);
    }
    
}

class HelpButton {
    constructor() {
        //super();
        this.symbol = '?';
        [this.x, this.y] = Sidebar.helpButtonLocation();
        //this.button = document.querySelector('.resetButton');
    }

    render() {
        ctx.font = '56px serif';
        ctx.fillText(this.symbol, this.x, this.y);
    }
    
}

class Heart {
    constructor(theLocation = 0) {
       // super();
        this.sprite = 'images/Heart.png';
        this.x = Sidebar.heartLocations(theLocation)[0];
        this.y = Sidebar.heartLocations(theLocation)[1];
        this.theName = 'heart';

    }

     render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Score  {
    constructor() {
        //super();
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
        this.modalOpened = 'none';
        this.allEnemies = [];
        this.player = new Player();
        this.sidebar = new Sidebar();
        this.items = new Items();
        // let heart1 = new Heart(0);
        // let heart2 = new Heart(1);
        // let heart3 = new Heart(2);
       
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
            this.modalOpened = 'win';
           modal.childNodes[1].childNodes[1].innerHTML = GameVariables.getWinMessage(this.sidebar.gameScore.theScore);

    	}
    	else if (theEvent === 'loss') {
            this.modalOpened = 'loss';
            modal.childNodes[1].childNodes[1].innerHTML = GameVariables.getLossMessage();
        }

        else if (theEvent === 'help') {
            this.modalOpened = 'help';
            // const saveButton = modal.childNodes[1].innerHTML;
            modal.childNodes[1].childNodes[1].innerHTML = GameVariables.getHelpMessage();
            // alert(modal.childNodes[1])
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
        modal.childNodes[1].childNodes[1].innerHTML = '';
        modal.style.display = 'none';
        // alert(modal.childNodes[1].childNodes[1].innerHTML /*+ '<br>' + GameVariables.getHelpMessage()*/)
        if (this.modalOpened !== 'help') {
            this.resetGame();
        } else {
            this.isPlayerMoveable = true;
        }
        this.modalOpened = 'none';
    }

    resetGame() {
        this.isPlayerMoveable = true;
        this.allEnemies = [];
        this.items.allRocks = [];
        this.player.x = 200;
        this.player.y = 300;
        this.items.glowStage.x = 200;
        this.items.glowStage.y = 140 - 25;
        // let heart1 = new Heart(0);
        // let heart2 = new Heart(1);
        // let heart3 = new Heart(2);
        this.sidebar.allHearts = [new Heart(0), new Heart(1), new Heart(2)]; 
        this.sidebar.gameScore.theScore = 0;
        this.player.toggleRoundOn = true;
    }

    static getHelpMessage() {
        const message = '<aside class="help-menu-description"> <h1 class="help-title">Help:</h1> <h2 class="help-title-game">Game Description:</h2>' +
        `<div class='help-game-description> <p>Tommy Cross is the main character in the game and he needs to cross the road to reach the
        water safely.
        He spawns in the beginning of the game on safe grass tiles and has to cross the stone tiles to reach the water. 
        The stone tiles, however, are very dangerous for Tommy, because there are bugs moving at various speeds. 
        If Tommy collides with one of these bugs, he loses a 'life'. If he loses all three of his 'lives', the game ends 
        and he wont be able to go swimming (in other words, the user loses the game)! </p>` + 

        '<p>However, although the stone tiles are dangerous, they are also an incentive to spend time on them.' + 
        'Everytime he lands on a stone tile safely, he earns five points. If he lands on a special, glowing tile,' +
        ' he will gaina constant stream of points for however long he is on it safely. The goal of the game is to' +
        'reach the water and get the most possible points!</p>' +

        '<p>As gametime is elapsed, the game progressively gets harder. It gets harder because Tommy can safely walk on the grass'+
        'spaces to avoid the nasty bugs. However, a landslade occurs at random intervals, making some grass and water squares'+
        'unusable because a boulder has landed there. Although dont worry too much Tommy will remain safe from the landslide,'+
        'because they cant land on him. But they do make his life more inconvenient</p>' +
        '<p>So be careful, have fun, and help Tommy reach the end! </p> </div> </aside>' +

        '<aside class="help-menu-how-to-play"> <h2>How To Play:</h2>' +

            '<p> - Use the ```arrow``` keys to move Tommy Cross across the board.</p>' +

            '<p> - Use the ```enter``` key to change characters.</p>' +

            '<p> - Click ```?``` button to get instructions on how to play.</p>' +

            '<p> - Click reset button to reset gameplay.</p>' +

            // '<button class="modal-button">  Continue </button>' +
            

        '</aside>';
    	return message;
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
    let loc = Items.getRandomLocationOf('grass');

    let shouldWeSetRock = true;
    let playerLocation = game.player.getLocation();

    // Make only 6 rocks max appear in grass
    if (game.items.allRocks.length >= 6) {
        loc = Items.getRandomLocationOf('water');
        if (game.items.allRocks.length === 9) {
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
        game.items.allRocks.forEach( function(item) {
            if (item.isOccupied(loc[0], loc[1] - 20)) {
                shouldWeSetRock = false;
            }            
        });
    }

    if (shouldWeSetRock) {
        let newRock = new Rock(loc);
        game.items.allRocks.push(newRock);
    }

}, 10000); //10000

setInterval( function setGlowStage() {
    let loc = Items.getRandomLocationOf('stone');
    game.items.glowStage.x = loc[0];
    game.items.glowStage.y = loc[1] - 25;

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

    game.player.handleInput(allowedKeys[e.keyCode], game.items.allRocks, game.isPlayerMoveable);

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

const continueEvent = document.querySelector('.modal-button').addEventListener('click', continueButtonClicked);


    
