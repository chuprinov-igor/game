// Глобальные переменные
let gameStarted = false;
const player = document.getElementById('player');
const bottles = [
    document.getElementById('champagne-bottle-1'),
    document.getElementById('champagne-bottle-2'),
    document.getElementById('champagne-bottle-3')
];
let playerX = window.innerWidth / 2 - 25;
let playerY = 0;
let playerSpeed = 2;
let bottleSpeed = 1;
let score = 0;
let startTime = Date.now();
let scoreInterval;
let passes = 0;
const maxPlayerSpeed = 64;
const maxBottleSpeed = 10;
const gameOverModal = document.getElementById('game-over-modal');
const finalScoreText = document.getElementById('final-score-text');
let isGamePaused = false;
let animationFrameId = null;
let bottleAnimationIds = [];

// Установка высоты viewport
function setViewportHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setViewportHeight();
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', setViewportHeight);

// Показ страницы
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.add('hidden');
        page.classList.remove('active');
    });
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.remove('hidden');
        selectedPage.classList.add('active');
    }
}

// Проверка ориентации
function checkOrientation() {
    const isPortrait = window.innerHeight > window.innerWidth;
    if (isPortrait) {
        bottles[1].style.display = 'none'; // Скрываем вторую бутылку
        bottles[2].style.display = 'none'; // Скрываем третью бутылку
    } else {
        bottles[1].style.display = 'block'; // Показываем вторую бутылку
        bottles[2].style.display = 'block'; // Показываем третью бутылку
    }
}

// Старт игры
function startGame() {
    showPage('game');
    gameStarted = true;
    resetPlayer();
    moveBottles();
    animationFrameId = requestAnimationFrame(gameLoop);
    startScoreTimer();
    checkOrientation();
}

// Перезапуск игры
function restartGame() {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    bottleAnimationIds.forEach(id => cancelAnimationFrame(id));
    bottleAnimationIds = [];
    resetPlayer();
    gameStarted = true;
    isGamePaused = false;
    moveBottles();
    animationFrameId = requestAnimationFrame(gameLoop);
    startScoreTimer();
    updateScore();
    checkOrientation();
}

// Сброс игрока
function resetPlayer() {
    playerX = window.innerWidth / 2 - 25;
    playerY = 0;
    playerSpeed = 2;
    bottleSpeed = 1;
    passes = 0;
    score = 0;
    startTime = Date.now();
    isGamePaused = false;
    updateScore();
    hideGameOverModal();
    player.style.top = `${playerY}px`;
    player.style.left = `${playerX}px`;
    player.style.transform = 'translateX(-50%)';
    bottles.forEach(bottle => {
        bottle.style.left = '0px';
        bottle.style.bottom = '0px';
    });
}

// Движение бутылок
function moveBottles() {
    const isPortrait = window.innerHeight > window.innerWidth;
    const activeBottles = isPortrait ? bottles.slice(0, 1) : bottles; // В портретном режиме только 1 бутылка
    const bottleCount = activeBottles.length;

    const sections = [];
    for (let i = 0; i < bottleCount; i++) {
        sections.push({
            start: (window.innerWidth / bottleCount) * i * 0.75,
            end: (window.innerWidth / bottleCount) * (i + 1) * 1.25
        });
    }

    activeBottles.forEach((bottle, index) => {
        let bottleX = Math.random() * (sections[index].end - sections[index].start) + sections[index].start;
        bottle.style.left = `${bottleX}px`;
        bottle.style.bottom = '0';

        let direction = 1;

        function animateBottle() {
            if (gameStarted && !isGamePaused && gameOverModal.style.display === 'none') {
                if (direction === 1 && bottleX >= sections[index].end - 50) {
                    direction = -1;
                } else if (direction === -1 && bottleX <= sections[index].start) {
                    direction = 1;
                }

                bottleX += direction * bottleSpeed;
                bottle.style.left = `${bottleX}px`;

                checkCollision(bottle);
            }
            if (gameStarted) {
                bottleAnimationIds[index] = requestAnimationFrame(animateBottle);
            }
        }

        bottleAnimationIds[index] = requestAnimationFrame(animateBottle);
    });
}

// Проверка столкновений
function checkCollision(bottle) {
    const playerRect = player.getBoundingClientRect();
    const bottleRect = bottle.getBoundingClientRect();
    if (
        gameStarted && !isGamePaused && gameOverModal.style.display === 'none' &&
        playerRect.right > bottleRect.left &&
        playerRect.left < bottleRect.right &&
        playerRect.bottom > bottleRect.top &&
        playerRect.top < bottleRect.bottom
    ) {
        player.style.setProperty('--collision-start-x', `${playerX}px`);
        player.style.setProperty('--collision-start-y', `${playerY}px`);
        
        const bottleCenterX = bottleRect.left + (bottleRect.width / 2);
        const targetX = bottleCenterX;
        const targetY = bottleRect.bottom - player.offsetHeight;
        
        player.style.setProperty('--collision-end-x', `${targetX}px`);
        player.style.setProperty('--collision-end-y', `${targetY}px`);
        player.classList.add('player-collision');
        setTimeout(() => {
            player.style.left = `${targetX}px`;
            player.style.top = `${targetY}px`;
            playerX = targetX;
            playerY = targetY;
            player.classList.remove('player-collision');
            showGameOverModal();
        }, 500);
    }
}

// Игровой цикл
function gameLoop() {
    if (!gameStarted || isGamePaused || gameOverModal.style.display !== 'none') {
        return;
    }
    playerY += playerSpeed * 2;
    player.style.top = `${playerY}px`;

    if (playerX < -25) {
        playerX = window.innerWidth - 25;
    } else if (playerX > window.innerWidth - 25) {
        playerX = -25;
    }

    player.style.left = `${playerX}px`;

    if (playerY > window.innerHeight) {
        playerY = -50;
        passes++;
        if (playerSpeed < maxPlayerSpeed) playerSpeed *= 1.4;
        if (bottleSpeed < maxBottleSpeed) bottleSpeed *= 1.2;
        updateScore();
    }

    animationFrameId = requestAnimationFrame(gameLoop);
}

// Управление клавишами
document.addEventListener('keydown', e => {
    if (!isGamePaused && (!gameOverModal.style.display || gameOverModal.style.display === 'none')) {
        if (e.key === 'ArrowLeft') playerX -= 20;
        else if (e.key === 'ArrowRight') playerX += 20;

        if (playerX < -25) playerX = window.innerWidth - 25;
        else if (playerX > window.innerWidth - 25) playerX = -25;

        player.style.left = `${playerX}px`;
    }
});

// Обновление счета
function updateScore() {
    const currentTime = (Date.now() - startTime) / 1000;
    score = Math.floor(currentTime * (passes + 1));
    document.getElementById('score-value').textContent = score;
}

function startScoreTimer() {
    clearInterval(scoreInterval);
    scoreInterval = setInterval(() => {
        if (!isGamePaused && (!gameOverModal.style.display || gameOverModal.style.display === 'none')) {
            updateScore();
        }
    }, 1000);
}

// Модальное окно
function showGameOverModal() {
    finalScoreText.textContent = `YOUR SCORES: ${score}`;
    gameOverModal.style.display = 'flex';
    pauseGame();
}

function hideGameOverModal() {
    gameOverModal.style.display = 'none';
}

// Управление паузой
function pauseGame() {
    isGamePaused = true;
    gameStarted = false;
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    bottleAnimationIds.forEach(id => cancelAnimationFrame(id));
    bottleAnimationIds = [];
    clearInterval(scoreInterval);
}

function resumeGame() {
    if (!isGamePaused) return;
    isGamePaused = false;
    gameStarted = true;
    moveBottles();
    animationFrameId = requestAnimationFrame(gameLoop);
    startScoreTimer();
}

// События изменения ориентации и размера окна
window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);
window.addEventListener('load', checkOrientation);

// Управление касаниями
let touchStartX = 0;
document.addEventListener('touchstart', e => {
    if (!isGamePaused && (!gameOverModal.style.display || gameOverModal.style.display === 'none')) {
        touchStartX = e.touches[0].clientX;
    }
});

document.addEventListener('touchend', e => {
    if (!isGamePaused && (!gameOverModal.style.display || gameOverModal.style.display === 'none')) {
        const touchEndX = e.changedTouches[0].clientX;
        const deltaX = touchEndX - touchStartX;
        const SWIPE_THRESHOLD = 50;
        if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
            if (deltaX > 0) playerX += 40;
            else playerX -= 40;

            if (playerX < -25) playerX = window.innerWidth - 25;
            else if (playerX > window.innerWidth - 25) playerX = -25;

            player.style.left = `${playerX}px`;
        }
    }
});

// Привязка кнопок
document.querySelector('#play-again-button').addEventListener('click', () => {
    hideGameOverModal();
    restartGame();
});
