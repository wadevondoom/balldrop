// Set up canvas and context
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Set up ball and paddle
const ball = { x: 50, y: 50, radius: 10, speed: 5 };
const paddle = { x: 0, y: 280, width: 80, height: 10 };
const paddleSpeed = 8; // Paddle movement speed

// Set up score
let score = 0;

// Draw ball and paddle
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'red'; // Set ball color to red
    ctx.fill();

    // Draw paddle
    ctx.fillStyle = 'black'; // Set paddle color to black
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

    // Display score
    ctx.fillStyle = 'black'; // Set font color to black
    ctx.font = '16px Arial'; // Set font style
    ctx.fillText('Score: ' + score, 10, 20);
}

// Move ball down canvas
function move() {
    ball.y += ball.speed;
}

// Detect collisions with paddle
function collide() {
    if (ball.y + ball.radius >= paddle.y && ball.x >= paddle.x && ball.x <= paddle.x + paddle.width) {
        score++;
        ball.speed += 0.1;
        ball.y = 50;
        ball.x = Math.random() * (canvas.width - ball.radius * 2) + ball.radius;
    }
}

// Move paddle with arrow keys
function movePaddle() {
    // Move left
    if (leftArrowPressed && paddle.x > 0) {
        paddle.x -= paddleSpeed;
    }
    // Move right
    if (rightArrowPressed && paddle.x + paddle.width < canvas.width) {
        paddle.x += paddleSpeed;
    }
}

// Set up game loop
let leftArrowPressed = false;
let rightArrowPressed = false;
let gameStarted = false;

function loop() {
    if (gameStarted) {
        draw();
        move();
        collide();
        movePaddle();
        if (ball.y + ball.radius < canvas.height) { // If ball has not reached bottom of canvas
            requestAnimationFrame(loop);
        } else { // Game over
            ctx.fillStyle = 'black'; // Set font color to black
            ctx.font = '24px Arial'; // Set font style
            ctx.fillText('Game Over!', canvas.width / 2 - 70, canvas.height / 2);
            ctx.fillText('Final Score: ' + score, canvas.width / 2 - 95, canvas.height / 2 + 30);
        }
    } else {
        // Display start button
        ctx.fillStyle = 'black'; // Set font color to black
        ctx.font = '24px Arial'; // Set font style
        ctx.fillText('Click to start', canvas.width / 2 - 80, canvas.height / 2 - 10);
    }
}

// Start game loop
requestAnimationFrame(loop);


// Handle arrow key input
document.addEventListener('keydown', function (event) {
    if (event.keyCode === 37) { // left arrow
        leftArrowPressed = true;
    } else if (event.keyCode === 39) { // right arrow
        rightArrowPressed = true;
    }
});

document.addEventListener('keyup', function (event) {
    if (event.keyCode === 37) { // left arrow
        leftArrowPressed = false;
    } else if (event.keyCode === 39) { // right arrow
        rightArrowPressed = false;
    }
});

// Handle click on start button
canvas.addEventListener('click', function (event) {
    if (!gameStarted) { // Start game if not already started
        gameStarted = true;

        // Start countdown timer
        let countdown = 3;
        ctx.fillStyle = 'black'; // Set font color to black
        ctx.font = '24px Arial'; // Set font style

        function startCountdown() {
            if (countdown > 0) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillText(countdown, canvas.width / 2 - 10, canvas.height / 2);
                countdown--;
                setTimeout(startCountdown, 1000); // Call startCountdown again after 1 second
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                requestAnimationFrame(loop); // Start game loop
            }
        }

        startCountdown();
    }
});
