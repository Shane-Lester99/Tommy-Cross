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
    * @returns Returns a random discrete number from 100 - 400
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
    * @description: Changes the character sprite (total of 5 characters). The 
    * default character is Tommy Cross.
    */
    changeCharacter() {
        // If the index isnt equal to 4, move to the next character.
        if (this.charNumber !== 4) {
            // Increment index to next character.
            this.charNumber++;
        } else {
            // We have reached the last character, so return to default character sprite.
            this.charNumber = 0;
        }
        this.sprite = this.allChar[this.charNumber];
    }
     /**
    * @description: Changes the character sprite (total of 5 characters). The 
    * default character is Tommy Cross.
    * @param {Number} To normalize the game across browsers. Not used because
    * the player doesnt move across at a constant speed as does the Enemy
    */
    update(dt) {
        // If the character isnt alive, this means they have lost this turn
        if (this.alive === false){
            // Set a timeout event to reset the character and pop a life.
            setTimeout( () => {
                // Reset to default square.
                this.x = 200;
                this.y = 300;
                // Check if alive again, to prevent delay issues.
                if (this.alive === false) {
                    // Set another timeout to pop the life.
                    setTimeout( function popHeart() {
                        // Pop the life.
                        game.sidebar.allHearts.pop();
                        // If all out of lives, the game is over and the player loses.
                        if (game.sidebar.allHearts.length === 0) {
                            setTimeout( function endOfGame(){
                                game.loseGame();
                            }, 300);   
                        }
                    }, 300);
                }
                // After this code executes, set alive to true so the game 
                // can be updated again
                this.alive = true;
            }, 50);            
        } 
        // This is the location where the water is.
        if (this.y === -20) {
            // .toggleRoundOn is to keep win message from only executing once.
            if (this.toggleRoundOn) {
                // Set it to false to prevent multiple win messages
                this.toggleRoundOn = false;
                // Call the winGame() method.
                setTimeout( function gameWon() {
                    game.winGame();
                }, 0);
            }    
        }
        return;
    }

    /*
    * @description: Draws the image, updates the points if the player is on 
    * the glow stage square.
    */
    render() {
        // If player is on the glow stage, increment there points by 1 every time
        // the game is rendered
        if (game.items.glowStage.onGlowStage(this.x, this.y - 25)) {
            game.sidebar.gameScore.theScore += 1;
        }
        // Draw the game image
    	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    /*
    * @description: Getter method for the current location of the player
    * @returns The current location of the player
    */
    getLocation() {
    	const location = [];
    	location.push(this.x);
    	location.push(this.y);
    	return location;
    }
    
    /*
    * @description This method handles the movement of the player. It can block
    * it if the player's next location is unmovable. Also updates the game score
    * if the player hits a stone square. Also allows the user to change the character
    * if 'enter' is hit
    * @param { string } movement Indicates the direction. Can be left, right, down, up.
    * it reflects the keyboard input.
    * @param { Array } rocks Indicates a collection of locations (where boulders are present)
    * in which the player cannot move.
    * @param { bool } playerMovable This checks if the player is in a location thats usable
    */
    handleInput(movement, rocks, playerMovable) {
        // If the player isnt currently movable (like if a modal screen is present)
        if (playerMovable === false) {
            return;
        }
        // If input isnt valid then we exit this method
        let isInputValid = false;
        ['left','right','down','up','enter'].forEach( function checkInput(validMove) {
            if (movement === validMove) {
                isInputValid = true;
            }
        });
        if (isInputValid === false) {
            return;
        }
        // This boolean is to signify if for some reason, the player shouldnt 
        // go to the next location. This would be if the player is in a blocked 
        // location.
        let dontMove = false;
        // If the movement is left
    	if (movement === 'left') {
            // Check if the x location signifies they are not off the board.
    		if (this.x !== 0) {
                // If they are on the board, check if there is a rock
                rocks.forEach( (aRock) => {
                    // If theres a rock, dont move
                    if (aRock.isOccupied(this.x - 100, this.y - 20)) {
                        dontMove = true;
                    }
                });
                // If there isnt a rock, advance left one space
                if (dontMove === false) {
    			    this.x -= 100;
                }
            }
            // This signifies we hit the edge of the board
            else {
                dontMove = true;
            }
    	}
        // If the movement is right
    	else if (movement === 'right') {
            // Check if the player is trying to move off the board
    		if (this.x !== 400) {
                // Check for each rock if the current location is occupied
                rocks.forEach( (aRock) => {
                    // If there is a rock there, dont move
                    if (aRock.isOccupied(this.x + 100, this.y - 20)) {
                        dontMove = true;
                    }
                });
                // If there isnt, advance right one space
                if (dontMove === false) {
    			    this.x += 100;
                }
    		} else {
                // The user is off the board, so dont move.
                dontMove = true;
            }
    	}
        // The player tries to move in downward position.
    	else if (movement === 'down') {
            // Check if the movement is trying to go down off the board.
    		if (this.y !== 380) {
                // CHeck if a rock is in the requested location.
                rocks.forEach( (aRock) => {
                    // If there is a rock, dont move.
                    if (aRock.isOccupied(this.x, this.y + 80 - 20)) {
                        dontMove = true;
                    }
                });
                // The user can move, advance them down one sqaure
                if (dontMove === false) {
    			    this.y += 80;
                }
    		// The player is trying to move off the board, block the move.
    		} else {
                dontMove = true;
            }
    	}
        // The player tries to move up
    	else if (movement === 'up') {
            // Check if the player tries to move off the board
    		 if (this.y !== -20) {
                // Check if theres a rock in the requested location
                rocks.forEach( (aRock) => {
                    // If there is a rock, dont move
                    if (aRock.isOccupied(this.x, this.y - 80 - 20)) {
                       dontMove = true;
                    }
                });
                // If there isnt a rock, advance up one square.
                if (dontMove === false) {
                    this.y -= 80;
                }
            // The player is trying to move off the board, block the attempt.
	    	} else {
                dontMove = true;
            }
    	}
        // If the movement is the enter the key, change the character sprite
        else if (movement === 'enter') {
            this.changeCharacter();
            return;
        }
        // If the player did move, and the player is on a stone space, increment the score 
        // by 5
        if (dontMove === false) { 
            setTimeout(function stoneSpaceScore() {
                if (game.player.y === 60 || game.player.y === 140 || game.player.y ===  220) {
                    game.sidebar.gameScore.theScore += 5;
                }
            }, 0);
        }
        return;
    }

}

/*
* @description This class contains all the functionality needed for the game items and
* is a container to hold the game items. These items include the boulders which occupy
* the screen, and the glow stage which appears on a stone square.
* @constructor Initializes an empty array of Rock objects and a glowStage object.
*/
class Items {
    constructor() {
        // Array which will contain rock objects.
        this.allRocks = [];
        // The glow stage square which will occupy a stone space.
        this.glowStage = new GlowStage();
    }

    /*
    * @description Returns a random tile location of the selected type
    * @parameter { String }
    * @return { Array } This corresponds to the tile location of the random square.
    * This array will always have two locations.
    */
    static getRandomLocationOf(squareType) {
        if (squareType === 'grass') {
            // Get the grass locations
            const grassSquares = Items.getGrassLocations();
            // Count of the grass square locations
            const numberOfGrassSquares = 10;
            // Randomize the index of the grassSquare locations
            const randomizedIndex = Math.floor(Math.random() * numberOfGrassSquares);
            // Return the location
            return grassSquares[randomizedIndex];

        }
        else if (squareType === 'stone') {
            // Get the stone locations
            const stoneSquares = Items.getStoneLocations();
            // Total number of square locations
            const numberOfStoneSquares = 15;
            // Randomize the index of the stoneSquare array
            const randomizedIndex = Math.floor(Math.random() * numberOfStoneSquares);
            // return that random square
            return stoneSquares[randomizedIndex];
        }

        else if (squareType === 'water') {
            // Get the water locations
            const waterSquares = Items.getWaterLocations();
            // The total number of water locations
            const numberOfWaterSquares = 5;
            // Return the randomized index of water locations
            const randomizedIndex = Math.floor(Math.random() * numberOfWaterSquares);
            // Return the location.
            return waterSquares[randomizedIndex];
        }
    }

    /*
    * @description Static function that returns all the grass tile locations
    * @returns {Array} All the grass tile locations
    */
    static getGrassLocations() {
        let allGrassLocations = [];
        for (let x = 0; x <= 400; x += 100) {
            allGrassLocations.push([x, 380]);
            allGrassLocations.push([x, 300]);
        }
        return allGrassLocations;

    }

    /*
    * @description Static function that returns all the stone tile locations
    * @returns {Array} All the stone tile locations
    */
    static getStoneLocations() {
        let allStoneLocations = [];
        for (let x = 0; x <= 400; x += 100) {
            allStoneLocations.push([x, 60]);
            allStoneLocations.push([x, 140]);
            allStoneLocations.push([x, 220]);
        }
        return allStoneLocations;
    }

    /*
    * @description Static function that returns all the water tile locations
    * @returns {Array} All the water tile locations
    */    
    static getWaterLocations() {
        let allWaterLocations = [];
        for (let x = 0; x <= 400; x += 100) {
            allWaterLocations.push([x, -20]);
        }
        return allWaterLocations;
    }
}

/*
* @description This class creates the glow stage object, which makes one stone square
* to be the 
* @constructor Initializes an empty array of Rock objects and a glowStage object.
* @param {Array} Initializes to the default stone square (the middle one)
*/
class GlowStage {
    constructor(theLocation = [200,140]) {
        // Selects the image that we use for the glow stage. Its called 
        // 'Selector', as in it selects a stone stage.
        this.sprite = 'images/Selector.png';
        // Place glowStage in the proper location
        this.x = theLocation[0];
        this.y = theLocation[1] - 25;
        // Give it a name to identify it
        this.theName = 'glow';
    }

    /*
    *@description Draws the object on the screen
    */
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    /*
    * @description Give a location, this function checks if the location
    * is the same as the current glow stage
    * @param { Number } xLocation The x location of the glowstage
    * @param { Number } yLocation The y location of the glowstage
    */
    onGlowStage(xLocation, yLocation) {
        if (xLocation === this.x && yLocation === this.y) {
            return true;
        }
    }
}

/*
* @description This class creates a Rock object, which shows itself to be a boulder
* on the screen.
* @constructor Initializes the rock object with an image sprite, a location, and a
* name.
* @param { Array } theLocation Gives a default location to a rock, which is on the lower
* corner of the screen. This is never used in the program, however. It is kept, therefore
* to be consistent with the other objects that are considered 'Items'
*/
class Rock {
    constructor(theLocation = [0,380]) {
        // Sprite image for the object
        this.sprite = 'images/Rock.png';
        // Location of the image on the canvas
        this.x = theLocation[0];
        this.y = theLocation[1] - 20;
        // Name of the object
        this.theName = 'rock';
    }

    /*
    * @description This draws the rock on the screen
    */
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    /*
    * @description Getter function for rocks name and location
    * @return { Array } This array returns the rocks name and location
    */
    getItemInfo() {
        return [this.theName, this.x, this.y];
    }

    /*
    * @description Tests if a location (specified in the parameters)
    * is the same as the rocks current location.
    * @param { Number } locX X coordinate 
    * @param { Number } locY Y cooridinate
    * @return bool This function returns true iff the location of this rock 
    * in the same location as the location specified in the parameters
    */
    isOccupied(locX, locY) {
        let test = false;
        // Check if the coordinates are identical
        if (this.x === locX && this.y === locY) {
            test = true;
        }
        // If they are, return true
        return test;
    }
}

/*
* @description Creates the sidebar that contains the lives (hearts), the players
* score, the reset button, and the help menu
* @constructor Initializes the game with three lives, a score of 0, a reset button.
* and a help button
*/
class Sidebar {
    constructor() { 
        // Initialize the game lives, score, reset button, and help button
        this.allHearts = [new Heart(0), new Heart(1), new Heart(2)];
        this.gameScore = new Score();
        this.resetButton = new ResetButton();
        this.helpButton = new HelpButton();
    }

    /*
    * @description get the locations where the heart can be placed on the screen
    * @param { Number } The location of life 1,2, or 3 on the screen
    * @return { Array } returns the location on the screen where the heart will
    * be placed
    */
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

    /*
    * @description get the locations where the score can be placed on the screen/
    * this method adds responsivness to the score font so it stays in the bounding
    * box to keep the UI nice.
    * @param { range } Based on how large the score gets, the font will adapt
    * to stay within the drawn box so the UI doesnt look awkward
    * @return { Array } returns the location on the screen where the score will
    * be placed
    */
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
        // score > 99,999
        else {
            return [310, 660]
        }    
    }

    /*
    * @description get the location of the reset button
    * @return { Array } returns the location on the screen where the reset button 
    * will be placed
    */
    static resetButtonLocation() {
        return [430, 645];
    }

    /*
    * @description get the location of the help button
    * @return { Array } returns the location on the screen where the help button 
    * will be placed
    */
    static helpButtonLocation() {
        return [443, 700];
    }


    /*
    * @description Draw the box on the screen which will contain the game data
    */
    render() {
        //Draws the outside box
        ctx.strokeRect(0, 600, 505, 110);
        //Draws the first line seperating the hearts and the score
        ctx.beginPath()
        ctx.moveTo(305, 600);
        ctx.lineTo(305, 710);
        ctx.stroke();
        // Draws the line sperating the  score and the buttons 
        ctx.moveTo(405, 655);
        ctx.lineTo(550, 655);
        ctx.stroke();
        // Draws the line seperating the two buttons
        ctx.moveTo(405, 600);
        ctx.lineTo(405, 710);
        ctx.stroke();
        // Render all the buttons
        this.resetButton.render();
        this.helpButton.render();
        this.allHearts.forEach(function(heart) {
            heart.render();
        });
        this.gameScore.render();
    }
}

/*
* @description Class for the reset button object
* @constructor Assigns the symbol and the location for the reset button
*/
class ResetButton  {
    constructor() {
        this.symbol = '⟲';
        [this.x, this.y] = Sidebar.resetButtonLocation();
    }
    /*
    * @description Draw the reset button at a particular font and size
    */
    render() {
        ctx.font = '48px serif';
        ctx.fillText(this.symbol, this.x, this.y);
    }
    
}

/*
* @description Class for the help button object
* @constructor Assigns the symbol and the location for the help button
*/
class HelpButton {
    constructor() {
        this.symbol = '?';
        [this.x, this.y] = Sidebar.helpButtonLocation();
    }
    /*
    * @description Draw the help button at a particular font and size
    */
    render() {
        ctx.font = '56px serif';
        ctx.fillText(this.symbol, this.x, this.y);
    }
    
}

/*
* @description Class for the heart object
* @constructor Assigns the image, the location, and assigns a name to it
* @param { Number } This will select one of the three heart locations
*/
class Heart {
    constructor(theLocation = 0) {
        this.sprite = 'images/Heart.png';
        this.x = Sidebar.heartLocations(theLocation)[0];
        this.y = Sidebar.heartLocations(theLocation)[1];
        this.theName = 'heart';
    }
    /*
    * @description Draw the heart objects
    */
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

/*
* @description Class for the score object
* @constructor Assigns the image, holds the score of the game, 
* contains a loaction and assigns a name to it
*/
class Score  {
    constructor() {
        this.theScore = 0;
        this.x = Sidebar.scoreLocation(0)[0];
        this.y = Sidebar.scoreLocation(0)[1];
        this.theName = 'score';

    }
    /*
    * @description Draws the score in the correct location and font.
    * This is based on the number the score is. This makes sure that
    * if the score gets very large, it doesnt beging to mess up the UI
    */
    render() {
        // Picks the size of the font based on the current score range
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
        // Assigns the score from the static function
        [this.x, this.y] = Sidebar.scoreLocation(this.theScore);
        // Renders the score
        ctx.fillText(`${this.theScore}`, this.x, this.y);
    }
}

/*
* @description This class holds all the enteties of the game. These incluse
* the player, the enemies, the objects in the sidebar, and the items in the game.
* It also incoudes the game modal which displays when needing help, or when the 
* user wins or loses.
* @constructor The constructor initializes a state of the modal ('none'), an enemies array,
* a player object, a sidebar for game data, and the items in the game.
*/
class GameVariables {
    constructor() {
        // This becomes false when the modal is open to prevent player movement when
        // the modal is open.
        this.isPlayerMoveable = true;
        // The modal can have four states: 'win', 'loss', 'help', and 'none'
        this.modalOpened = 'none';
        // This is the enemy array which holds the enemy objects that are currently on
        // the screen.
        this.allEnemies = [];
        // This is the player object, data sidebar, and the items that appear on the screen
        this.player = new Player();
        this.sidebar = new Sidebar();
        this.items = new Items();  
    }
    /*
    * @description calls the method openModal which displays the modal with the
    * message that the user lost the game.
    */
    loseGame() {
        this.openModal('loss');
    }
    /*
    * @description calls the method openModal which displays the modal with the
    * message that the user won the game.
    */
    winGame() {
        this.openModal('win');
    }
    /*
    * @description Opens the modal with the appropriate message displayed to the user.
    * @param { String } theEvent This parameter displays a modal state
    */
    openModal(theEvent = 'win') {
        // The player becomes immovable
        this.isPlayerMoveable = false;
        // The modal is searched for and displayed
    	const modal = document.querySelector('.modal');
    	modal.style.display = 'block';
        // Depending on the state of the modal (given by the parameter), the correct message is displayed.
    	if (theEvent === 'win') {
            // Modal changes state to win and displays the proper message (given the game score)
            this.modalOpened = 'win';
           modal.childNodes[1].childNodes[1].innerHTML = GameVariables.getWinMessage(this.sidebar.gameScore.theScore);

    	}
    	else if (theEvent === 'loss') {
            // Modal changes state to loss and displays the proper message
            this.modalOpened = 'loss';
            modal.childNodes[1].childNodes[1].innerHTML = GameVariables.getLossMessage();
        }
        else if (theEvent === 'help') {
            // Modal changes state to loss and displays the proper message
            this.modalOpened = 'help';
            modal.childNodes[1].childNodes[1].innerHTML = GameVariables.getHelpMessage();
        }
    }
    /*
    * @description Closes the game modal and resets the state to 'none.' If the game
    * is over, this is where the game resets
    */
    closeModal() {
        // Finds the modal and empties the message and changes the state to none
        const modal = document.querySelector('.modal');
        modal.childNodes[1].childNodes[1].innerHTML = '';
        modal.style.display = 'none';
        // If the modal isnt in its help state, reset the game
        if (this.modalOpened !== 'help') {
            this.resetGame();
        } else {
            // Now that the game is playable again, allow the player to be movable
            this.isPlayerMoveable = true;
        }
        // Reset the modal state to none
        this.modalOpened = 'none';
    }
    /*
    * @description Resets and reintitialzies all the game variables
    */
    resetGame() {
        this.isPlayerMoveable = true;
        this.allEnemies = [];
        this.items.allRocks = [];
        this.player.x = 200;
        this.player.y = 300;
        this.items.glowStage.x = 200;
        this.items.glowStage.y = 140 - 25;
        this.sidebar.allHearts = [new Heart(0), new Heart(1), new Heart(2)]; 
        this.sidebar.gameScore.theScore = 0;
        this.player.toggleRoundOn = true;
    }
    /*
    * @description Creates and returns the game information if the help button is clicked.
    * @return { String } The whole menu is returned as html
    */
    static getHelpMessage() {
        const message = '<aside class="help-menu-description"> <h1 class="help-title">Game Information:</h1>' + 
        '<h2 class="help-title-game">What is Going On?</h2>' +
        '<div class="help-game-description"> <p>Our hero Tommy Cross wants to go swimming and' +
        ' he needs your help to cross the road safely. He begins the game' +
        ' on a safe grass tile and has to cross the stone tiles to reach the water. ' +
        'The stone tiles, however, are very dangerous for Tommy, because there are bugs moving' +
        ' across the tiles that are poisonous! If Tommy collides with one of these bugs, he loses a "life". If he loses' +
        ' all three of his "lives", the game ends  and he will not be able to go swimming! </p>' + 

        '<p>However, although the stone tiles are dangerous, Tommy Cross does not mind landing on them.' + 
        ' This is not just because he is a rebel, but also because every time he lands on a ' + 
        'stone tile safely, he earns five points! If he lands on a special, glowing tile,' +
        ' he will gain a whole bunch of points. The goal of the game is to help Tommy' +
        ' reach the water safely while also grabbing him the most points! (because he really' +
        ' like points for some reason...)</p>' +

        '<p>As our hero courageously collects points while allowing time to elapse, it becomes harder and harder for him to reach' + 
        ' the water safely! This is because Tommy can safely walk on all of the grass'+
        ' spaces to avoid the nasty bugs in the beginning of the game. At random times' +
        ' during the game, however, a landslide occurs that' +
        ' takes out some of the safe grass and water spaces Tommy could have roamed!' + 
        ' However do not worry too much about Tommy being crushed by a ' +
        'boulder. After all, this is a family friendly game so the boulders can not land on him.' + 
        ' But they do make his life more inconvenient, and that in itself is a tragedy. </p>' +
        '<p>So be careful, have fun, and help Tommy reach the water safely! </p> </div> </aside>' +

        '<aside class="help-menu-how-to-play"> <h2>How to Play:</h2>' +

            '<p> - Use the arrow keys to move Tommy Cross across the board.</p>' +

            '<p> - Use the enter key to change characters.</p>' +

            '<p> - Click the button labelled "?" in the sidebar to display this help menu.</p>' +

            '<p> - Click the button labelled "⟲" in the sidebar to reset gameplay.</p>' + 

            '<p> - Lastly, note that this game is not yet playable on touch devices. Will be with some future update! </p>' +           

        '</aside>'
    	return message;
    }
    /*
    * @description Creates and returns the win message.
    * @param { Number } The game score to be displayed in the win message
    * @return { String } The win message is returned as html.
    */
    static getWinMessage(score = 0) {
    	return `<aside class="win-description game-end"> <p> <span class="win-message"> 
        You win! </span> <br>  <span class='emojis'> 😎 😎 </span> <br> With a score of ${score}! <br> Good job!</p> </aside>`;
    }
    /*
    * @description Creates and returns the loss message.
    * @return { String } The loss message is returned as html.
    */
    static getLossMessage() {
        return `<aside class="loss-description game-end"> <p> <span class="loss-message"> 
        You Lose! </span> <br> <span class='emojis'> 😵 😵 </span> <br> Better luck next time! </p> </aside>`
    }
}

// Create the variable game which is a wrapper for all the data for the game. 
// It interfaces between the intervals which add new items to the screen/ the 
// event listeners and the game data that will affect the game.
const game = new GameVariables();

// This interval every second will spawn enemies or delete the ones that are off the
// screen.
setInterval( function setEnemies() {
    // Choose an enemy location at random
    let loc = Enemy.chooseLocation(Math.floor(Math.random() * 3));
    // Choose a random enemy speed
    let speed = Enemy.randomSpeed();
    // Make sure that the enemy cannot go past an enemy that is currently
    // ahead of them on the same tile. 
    game.allEnemies.forEach( function(currentEnemy) {
        // If an enemy is on the same tile
        if (loc[1] === currentEnemy.y) {
            // keep resetting the enemies speed until its lower then that enemy
            while (speed > currentEnemy.speed) {
                speed = Enemy.randomSpeed();
            }
        }
    });
    // Create the new enemy object
    const newEnemy = new Enemy(loc, speed);
    // Push it to join the other enemy objects so they can be displayed on screen
    game.allEnemies.push(newEnemy);
    // Filter out the enemies that are already off the screen.
    game.allEnemies = game.allEnemies.filter(allEnemies => allEnemies.offScreen === false);
}, 1000);

// Sets the location of a new rock every 10 seconds. One location cant be
// held by multiple rocks. The spawning square cant be occupied by a rock.
// Also the player cannot have a rock spawn in there current location.
// Only grass and water locations can have a rock spawn on them.
// There will spawn a max of 6 rocks in the grass. Once all the grass locations
// are filled, a max of 3 rocks will spawn on water. Once all those are filled, 
// there will be no more rocks spawned.
setInterval( function setRocks() {
    // Find a random grass location
    let loc = Items.getRandomLocationOf('grass');
    // Create a test variable to see if its a valid rock setting locaiton
    let shouldWeSetRock = true;
    // Find the players location.
    let playerLocation = game.player.getLocation();
    // Make only 6 rocks max appear in grass
    if (game.items.allRocks.length >= 6) {
        // If there are 6 or above, get a random water location.
        loc = Items.getRandomLocationOf('water');
        // If there is 9, another rock cant spawn
        if (game.items.allRocks.length === 9) {
            shouldWeSetRock = false;
        }
    }
    // If the location is the players spawning location, dont set the rock.
    else if (loc[0] === 200 && loc[1] === 300) {
        shouldWeSetRock = false;
    }
    // If the spawning location of a rock is the same as the player, dont set rock.
    else if (loc[0] === game.player.x && loc[1] === game.player.y) {
        shouldWeSetRock = false;
    } 
    // Test if the rock should be set to test it against other rock locations
    if (shouldWeSetRock) {
        // Check if the rock wed like to set 
        game.items.allRocks.forEach( function(item) {
            // If there is a rock in that location already, dont set it
            if (item.isOccupied(loc[0], loc[1] - 20)) {
                shouldWeSetRock = false;
            }            
        });
    }
    // If the rock still should be set, add the rock to all the other current rocks
    // so it can displaye on screen.
    if (shouldWeSetRock) {
        let newRock = new Rock(loc);
        game.items.allRocks.push(newRock);
    }
}, 10000);

// Sets the location of the glow stage periodically (every 5 seconds)
setInterval( function setGlowStage() {
    // Get a random stone location
    let loc = Items.getRandomLocationOf('stone');
    // Display the glowstage in that potentially new location
    game.items.glowStage.x = loc[0];
    game.items.glowStage.y = loc[1] - 25;
}, 5000);

// Add an event listener for the keyup event which will allow the Player object to move
document.addEventListener('keyup', function(e) {
    // Accept only enter, left, up, right, down
    let allowedKeys = {
        13: 'enter',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
     };
     // This sends the key value, the rock locations, and if the player is currently movable
     // (i.e. meaning no modal is currently displayed)
    game.player.handleInput(allowedKeys[e.keyCode], game.items.allRocks, game.isPlayerMoveable);
});

// Disable the keydown scrolling, so that everytime we press down or up key the screen
// wont move.
document.addEventListener('keydown', function disableKeyScrolling(e) {
    e.preventDefault();
});

setTimeout(function () {
    // Select the canvas element
    let canvas = document.querySelector('canvas');
    // Add an event listener to create the reset buttons clickability rectangle
    canvas.addEventListener('click', function setupResetButton(event) {
        // Create bounding box
        let boundingRect = canvas.getBoundingClientRect();
        const xLoc = event.clientX - boundingRect.left;
        const yLoc = event.clientY - boundingRect.top;
        // If location in the bounding box is clicked, reset the game 
        if (  xLoc >= 425 && xLoc <= 485) {
            if (yLoc >= 605 && yLoc <= 650) {
                setTimeout(function() {
                    game.resetGame();
                }, 100);  
            }
        }
    });
    // Add an event listener to the help buttons clickability rectangle
    canvas.addEventListener('click', function setupHelpButton(event) {
        // Create bounding box
        let boundingRect = canvas.getBoundingClientRect();
        const xLoc = event.clientX - boundingRect.left;
        const yLoc = event.clientY - boundingRect.top;
        // If bounding location is click, open the help menu
        if (  xLoc >= 435 && xLoc <= 480) {
            if (yLoc >= 660 && yLoc <= 705) {
                setTimeout(function() {
                    game.openModal('help');
                }, 100);
            }
        }
    });
}, 0);

/*
* @description closes the modal when the event button is clicked
* @param { Event } event object to prevent button defaults
*/
function continueButtonClicked(event) {
    event.preventDefault();
    game.closeModal();
}

// Creates an event listener for the continue button being clicked
const continueEvent = document.querySelector('.modal-button').addEventListener('click', continueButtonClicked);