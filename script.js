const player = document.getElementById('player');
const bottles = [
    document.getElementById('champagne-bottle-1'),
    document.getElementById('champagne-bottle-2'),
    document.getElementById('champagne-bottle-3')
];
let playerX = window.innerWidth / 2 - 25; // Центр экрана
let playerY = 0;
let speed = 1; // Начальная скорость
let score = 0;
let startTime = Date.now();

function resetPlayer() {
    playerX = window.innerWidth / 2 - 25;
    playerY = 0;
    speed = 1; // Сброс скорости до начальной
    score = 0; // Обнуление счета
    startTime = Date.now(); // Сброс времени начала игры
    updateScore();
}

function moveBottles() {
    const sections = [
        { start: 0, end: window.innerWidth / 3 },
        { start: window.innerWidth / 3, end: 2 * window.innerWidth / 3 },
        { start: 2 * window.innerWidth / 3, end: window.innerWidth }
    ];

    bottles.forEach((bottle, index) => {
        let bottleX = Math.random() * (sections[index].end - sections[index].start) + sections[index].start;
        bottle.style.left = `${bottleX}px`;
        bottle.style.bottom = '0';

        let direction = 1; // 1 для движения вправо, -1 для движения влево

        function animateBottle() {
            if (direction === 1 && bottleX >= sections[index].end - 50) {
                direction = -1;
            } else if (direction === -1 && bottleX <= sections[index].start) {
                direction = 1;
            }

            bottleX += direction * speed;
            bottle.style.left = `${bottleX}px`;

            checkCollision(bottle);
            requestAnimationFrame(animateBottle);
        }

        animateBottle();
    });
}

function checkCollision(bottle) {
    const playerRect = player.getBoundingClientRect();
    const bottleRect = bottle.getBoundingClientRect();

    if (
        playerRect.right > bottleRect.left &&
        playerRect.left < bottleRect.right &&
        playerRect.bottom > bottleRect.top &&
        playerRect.top < bottleRect.bottom
    ) {
        alert('Game Over!');
        resetPlayer();
    }
}

function gameLoop() {
    playerY += speed * 2; // Удвоенная скорость падения игрока
    player.style.top = `${playerY}px`;

    // Проверка перехода через левую и правую границы экрана
    if (playerX < -25) {
        playerX = window.innerWidth - 25;
    } else if (playerX > window.innerWidth - 25) {
        playerX = -25;
    }

    player.style.left = `${playerX}px`; // Обновляем стиль после проверки перехода

    if (playerY > window.innerHeight) {
        playerY = -50;
        resetPlayer();
        score++;
        updateScore();
    }

    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
        playerX -= 20;
    } else if (e.key === 'ArrowRight') {
        playerX += 20;
    }

    // Проверяем и корректируем координаты игрока с учетом переходов через границы
    if (playerX < -25) {
        playerX = window.innerWidth - 25;
    } else if (playerX > window.innerWidth - 25) {
        playerX = -25;
    }

    player.style.left = `${playerX}px`;
});

function updateScore() {
    const currentTime = (Date.now() - startTime) / 1000; // Время в секундах
    const scoreValue = Math.floor(currentTime * score); // Суммируется секунда игры умноженная на коэффициент
    document.getElementById('score-value').textContent = scoreValue;
}

// Инициализация игры
resetPlayer();
moveBottles();
gameLoop();
updateScore(); // Обновление начального значения счета
