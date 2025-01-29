const player = document.getElementById('player');
const bottles = [
    document.getElementById('champagne-bottle-1'),
    document.getElementById('champagne-bottle-2'),
    document.getElementById('champagne-bottle-3')
];

let playerX = window.innerWidth / 2 - 25; // Центр экрана
let playerY = 0;
let speed = 1; // Начальная скорость
let interval;

function resetPlayer() {
    playerX = window.innerWidth / 2 - 25;
    playerY = 0;
    speed += 0.1; // Увеличиваем скорость каждый раз при перезапуске
}

function moveBottles() {
    bottles.forEach(bottle => {
        let bottleX = Math.random() * (window.innerWidth - 50);
        bottle.style.left = `${bottleX}px`;
        bottle.style.bottom = '0';

        function animateBottle() {
            bottleX -= speed;
            if (bottleX < -50) {
                bottleX = window.innerWidth;
            }
            bottle.style.left = `${bottleX}px`;

            checkCollision(bottleX, 0);
            requestAnimationFrame(animateBottle);
        }

        animateBottle();
    });
}

function checkCollision(bottleX, bottleY) {
    if (
        playerX < bottleX + 50 &&
        playerX + 50 > bottleX &&
        playerY < bottleY + 100 &&
        playerY + 50 > bottleY
    ) {
        alert('Game Over!');
        resetPlayer();
    }
}

function gameLoop() {
    playerY += speed;
    player.style.top = `${playerY}px`;
    player.style.left = `${playerX}px`;

    if (playerY > window.innerHeight) {
        playerY = -50;
        resetPlayer();
    }

    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
        playerX = Math.max(playerX - 20, 0);
    } else if (e.key === 'ArrowRight') {
        playerX = Math.min(playerX + 20, window.innerWidth - 50);
    }
    player.style.left = `${playerX}px`;
});

// Инициализация игры
resetPlayer();
moveBottles();
gameLoop();
