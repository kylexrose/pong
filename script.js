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
let computerPaddleYVelocity = 3;
let playerPaddleYPosition = 0;


let ballYVelocity = 2;
let ballYPos = 0;
let ballXVelocity = 2;
let ballXPos = 20;



// Update the pong world
function update() {
    ballYVelocity = Math.abs(ballYVelocity) < 10 ? ballYVelocity : 10
    // Update the computer paddle's position
    //computerPaddleYPosition += computerPaddleYVelocity;
    computerPaddleYPosition = ballYPos - 40;
    if(computerPaddleYPosition < 0){
        computerPaddleYPosition = 0;
    }else if(computerPaddleYPosition > GAME_AREA_HEIGHT - PADDLE_HEIGHT){
        computerPaddleYPosition = GAME_AREA_HEIGHT - PADDLE_HEIGHT;
    }
    
    ballYPos += ballYVelocity;
    ballXPos += ballXVelocity;

    paddleCollision();

    if (computerPaddleYPosition >= (GAME_AREA_HEIGHT - PADDLE_HEIGHT) || computerPaddleYPosition < 0){
        computerPaddleYVelocity *= -1;
    }
    if(ballYPos >= GAME_AREA_HEIGHT - BALL_SIZE || ballYPos < 0){
        ballYVelocity *= -1;
    }
    
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
            const velChange = ((ballYPos + (BALL_SIZE/2)) - (computerPaddleYPosition + (PADDLE_HEIGHT/2))) * .25;
            ballYVelocity += velChange;
            ballXVelocity *= -1
            return true;
    }else if (ballYPos >= playerPaddleYPosition && 
        ballYPos <= playerPaddleYPosition + PADDLE_HEIGHT &&
        ballXPos === PADDLE_WIDTH){
            const velChange = ((ballYPos + (BALL_SIZE/2)) - (computerPaddleYPosition + (PADDLE_HEIGHT/2))) * .25;
            ballYVelocity += velChange;
            ballXVelocity *= -1;
            return true;
        }
}

window.requestAnimationFrame(loop);