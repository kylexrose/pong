// Size of the game area (in px)
const GAME_AREA_WIDTH = 700;
const GAME_AREA_HEIGHT = 500;

// Size of the paddles (in px)
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 20;

// Size of the ball (in px)
const BALL_SIZE = 20;
let playerScore = 0;
let computerScore = 0;

// Get the computer paddle element
const computerPaddle = document.querySelector('.computer-paddle');
// get the ball element
const ball = document.querySelector('.ball');
// get the player paddle element
const playerPaddle = document.querySelector('.player-paddle');
// Initial computer paddle y-position and y-velocity
let computerPaddleYPosition = 0;
let computerPaddleYVelocity = 2;
let playerPaddleYPosition = 0;
let playerPaddleYVelocity = 0;

let ballYVelocity = 2;
let ballYPos = 0;
let ballXVelocity = 3;
let ballXPos = 20;

document.addEventListener('keydown', (e) => {
    if(e.key === "ArrowUp"){
        if(playerPaddleYPosition > 0){
            playerPaddleYVelocity = -2;
        }else{
            playerPaddleYVelocity = 0;
        }
    }else if(e.key === "ArrowDown"){
        if(playerPaddleYPosition < GAME_AREA_HEIGHT - PADDLE_HEIGHT){
            playerPaddleYVelocity = 2;
        }else{
            playerPaddleYVelocity = 0;
        }
    }
})

document.addEventListener('keyup', (e) => {
    if(e.key === "ArrowUp" || e.key === "ArrowDown"){
            playerPaddleYVelocity = 0;
    }});

// Update the pong world
function update() {
    
    //ballYVelocity = ballYVelocity < 15 ? ballYVelocity : 15;
    //computerPaddleYPosition += computerPaddleYVelocity;
    computerPaddleYPosition = ballYPos - 40;
    if(computerPaddleYPosition < 0){
        computerPaddleYPosition = 0;
    }else if(computerPaddleYPosition > GAME_AREA_HEIGHT - PADDLE_HEIGHT){
        computerPaddleYPosition = GAME_AREA_HEIGHT - PADDLE_HEIGHT;
    }
    
    //update player paddle
    playerPaddleYPosition += playerPaddleYVelocity;
    
    //stop player paddle from going out of bounds
    if (playerPaddleYPosition < 0){
        playerPaddleYPosition = 0;
    }
    if (playerPaddleYPosition > GAME_AREA_HEIGHT - PADDLE_HEIGHT){
        playerPaddleYPosition = GAME_AREA_HEIGHT - PADDLE_HEIGHT;
    }
    
    //update ball position variable
    ballYPos += ballYVelocity;
    ballXPos += ballXVelocity;

    //conditionals to bounce off of paddles
    paddleCollision();
    
    //for when the ball hits the top and bottom bounds
    if (computerPaddleYPosition >= (GAME_AREA_HEIGHT - PADDLE_HEIGHT) || computerPaddleYPosition < 0){
        computerPaddleYVelocity *= -1;
    }
    if(ballYPos >= GAME_AREA_HEIGHT - BALL_SIZE || ballYPos < 0){
        ballYVelocity *= -1;
    }

    //for when the ball hits a wall
    if(ballXPos >= GAME_AREA_WIDTH - BALL_SIZE){
        playerScore++;
        ballYVelocity = 2;
        ballYPos = 0;
        ballXVelocity = 2;
        ballXPos = 20;
    }else if(ballXPos < 0){
        computerScore++;
        ballYVelocity = 2;
        ballYPos = 0;
        ballXVelocity = 2;
        ballXPos = 20;
    }
    
    //Apply positions
    computerPaddle.style.top = `${computerPaddleYPosition}px`;
    playerPaddle.style.top = `${playerPaddleYPosition}px`;
    ball.style.top = `${ballYPos}px`;
    ball.style.left = `${ballXPos}px`;
}

// Call the update() function everytime the browser is ready to re-render
function loop() {
    update();
    window.requestAnimationFrame(loop);
}

function paddleCollision(){
    if (ballYPos + BALL_SIZE >= computerPaddleYPosition && 
        ballYPos <= computerPaddleYPosition + PADDLE_HEIGHT &&
        ballXPos + BALL_SIZE === GAME_AREA_WIDTH - PADDLE_WIDTH){
            //const velChange = ((ballYPos + (BALL_SIZE/2)) - (computerPaddleYPosition + (PADDLE_HEIGHT/2)))*.5;
            //ballYVelocity = velChange;
            console.log(ballYPos, BALL_SIZE, computerPaddleYPosition, PADDLE_HEIGHT)
            ballXVelocity *= -1;
    }else if (ballYPos >= playerPaddleYPosition && 
        ballYPos - BALL_SIZE <= playerPaddleYPosition + PADDLE_HEIGHT &&
        ballXPos === PADDLE_WIDTH){
            //const velChange = ((ballYPos + (BALL_SIZE/2)) - (computerPaddleYPosition + (PADDLE_HEIGHT/2)))*.5;
            //ballYVelocity = velChange;
            ballXVelocity *= -1;
        }
}

window.requestAnimationFrame(loop);