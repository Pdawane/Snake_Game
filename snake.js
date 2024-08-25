const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const boxSize = 20;
let snake = [{ x: 10 * boxSize, y: 10 * boxSize }];
let direction = 'right'; // Start moving to the right by default
let food = {
    x: Math.floor(Math.random() * 29) * boxSize,
    y: Math.floor(Math.random() * 29) * boxSize
};
let score = 0;
let highestScore = 0;

document.addEventListener('keydown', changeDirection);
document.getElementById('resetBtn').addEventListener('click', resetGame);

function changeDirection(event) {
    const keyPressed = event.keyCode;
    if (keyPressed === 37 && direction !== 'right') direction = 'left';
    if (keyPressed === 38 && direction !== 'down') direction = 'up';
    if (keyPressed === 39 && direction !== 'left') direction = 'right';
    if (keyPressed === 40 && direction !== 'up') direction = 'down';
}

function drawBox(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, boxSize, boxSize);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(x, y, boxSize, boxSize);
}

function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the food
    drawBox(food.x, food.y, 'green');

    // Move the snake's body
    for (let i = snake.length - 1; i > 0; i--) {
        snake[i] = { ...snake[i - 1] };
    }

    // Move the snake's head
    if (direction === 'left') snake[0].x -= boxSize;
    if (direction === 'up') snake[0].y -= boxSize;
    if (direction === 'right') snake[0].x += boxSize;
    if (direction === 'down') snake[0].y += boxSize;

    // Draw the snake
    snake.forEach((part, index) => {
        const color = index === 0 ? 'blue' : 'yellow';
        drawBox(part.x, part.y, color);
    });

    // Check collision with food
    if (snake[0].x === food.x && snake[0].y === food.y) {
        score += 10;
        if (score > highestScore) {
            highestScore = score;
        }
        snake.push({}); // Grow the snake

        // Reposition food
        food.x = Math.floor(Math.random() * 29) * boxSize;
        food.y = Math.floor(Math.random() * 29) * boxSize;
    }

    // Check collision with walls
    if (
        snake[0].x < 0 ||
        snake[0].x >= canvas.width ||
        snake[0].y < 0 ||
        snake[0].y >= canvas.height
    ) {
        resetGame();
    }

    // Check collision with itself
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            resetGame();
        }
    }

    // Update the scoreboard
    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('highestScore').innerText = `Highest Score: ${highestScore}`;

    setTimeout(draw, 100);
}

function resetGame() {
    snake = [{ x: 10 * boxSize, y: 10 * boxSize }];
    direction = 'stop';
    score = 0;
    food.x = Math.floor(Math.random() * 29) * boxSize;
    food.y = Math.floor(Math.random() * 29) * boxSize;
    draw();
}

// Start the game
draw();
