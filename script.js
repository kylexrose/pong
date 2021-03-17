// Size of the game area (in px)
const GAME_AREA_WIDTH = 700;
const GAME_AREA_HEIGHT = 500;

// Size of the paddles (in px)
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 20;

//player speeds
const COMPUTER_SPEED = 4;
const PLAYER_SPEED = 4;

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
let ballXVelocity = 4;
let ballXPos = 20;

document.addEventListener('keydown', (e) => {
    if(e.key === "ArrowUp"){
        if(playerPaddleYPosition > 0){
            playerPaddleYVelocity = -1 * PLAYER_SPEED;
        }else{
            playerPaddleYVelocity = 0;
        }
    }else if(e.key === "ArrowDown"){
        if(playerPaddleYPosition < GAME_AREA_HEIGHT - PADDLE_HEIGHT){
            playerPaddleYVelocity = PLAYER_SPEED;
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
    //cap the max y velocity of ball 
    ballYVelocity = ballYVelocity < 8 ? ballYVelocity : 8;
    
    //update paddle position
    computerPaddleYPosition += computerPaddleYVelocity;
    //computerPaddleYPosition = ballYPos - 40;
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
    if((ballYPos >= GAME_AREA_HEIGHT - BALL_SIZE && ballYVelocity > 0) || ballYPos < 0 && ballYVelocity < 0){
        ballYVelocity *= -1; console.log(ballYPos, GAME_AREA_HEIGHT - BALL_SIZE, )
    }

    //for when the ball hits a wall
    if(ballXPos >= GAME_AREA_WIDTH - BALL_SIZE){
        playerScore++;
        ballYVelocity = 2;
        ballYPos = 0//.2 * GAME_AREA_HEIGHT;
        ballXVelocity = ((playerScore + computerScore) %2) ? 4 : -4;
        ballXPos = GAME_AREA_WIDTH / 2;
    }else if(ballXPos < 0){
        computerScore++;
        ballYVelocity = 2;
        ballYPos = 0//.2 * GAME_AREA_HEIGHT;
        ballXVelocity = ((playerScore + computerScore) %2) ? 4 : -4;
        ballXPos = 0//GAME_AREA_WIDTH / 2;
    }

    updateScore();
    
    //Apply positions
    computerPaddle.style.top = `${computerPaddleYPosition}px`;
    playerPaddle.style.top = `${playerPaddleYPosition}px`;
    ball.style.top = `${ballYPos}px`;
    ball.style.left = `${ballXPos}px`;

    //prep computer's next move
    if(computerPaddleYPosition + 50 < ballYPos){
        computerPaddleYVelocity = COMPUTER_SPEED;
    }else if(computerPaddleYPosition > ballYPos + 20){
        computerPaddleYVelocity = -COMPUTER_SPEED;
    }else{
        computerPaddleYVelocity = 0;
    }
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
            const velChange = ((ballYPos + (BALL_SIZE/2)) - (computerPaddleYPosition + (PADDLE_HEIGHT/2)))*.4;
            ballYVelocity = velChange;
            ballXVelocity *= -1;
    }else if (ballYPos + BALL_SIZE  >= playerPaddleYPosition && 
        ballYPos <= playerPaddleYPosition + PADDLE_HEIGHT &&
        ballXPos === PADDLE_WIDTH){
            const velChange = ((ballYPos + (BALL_SIZE/2)) - (playerPaddleYPosition + (PADDLE_HEIGHT/2)))*.4;
            ballYVelocity = velChange;
            ballXVelocity *= -1;
        }
}

function updateScore(){
    document.querySelector('#playerScore').innerHTML = playerScore;
    document.querySelector('#compScore').innerHTML = computerScore;
}
window.requestAnimationFrame(loop);