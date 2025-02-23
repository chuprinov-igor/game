// Глобальные переменные
let gameStarted = false; // Изначально игра не запущена

const player = document.getElementById('player');
const bottles = [
    document.getElementById('champagne-bottle-1'),
    document.getElementById('champagne-bottle-2'),
    document.getElementById('champagne-bottle-3')
];
let playerX = window.innerWidth / 2 - 25; // Центр экрана
let playerY = 0;
let playerSpeed = 2; // Начальная скорость падения игрока
let bottleSpeed = 1; // Начальная скорость движения бутылок
let score = 0;
let startTime = Date.now();
let scoreInterval;
let passes = 0;
const maxPlayerSpeed = 64; // Максимальная скорость падения игрока
const maxBottleSpeed = 10; // Максимальная скорость движения бутылок
const gameOverModal = document.getElementById('game-over-modal');
const finalScoreText = document.getElementById('final-score-text');

/* Add this JavaScript to your script.js file */
function setViewportHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
// Set the height initially
setViewportHeight();

// Update the height on resize and orientation change
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', setViewportHeight);

// Функция для показа нужной страницы
function showPage(pageId) {
    // Скрываем все страницы
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.add('hidden'));
    pages.forEach(page => page.classList.remove('active'));

    // Показываем выбранную страницу
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.remove('hidden');
        selectedPage.classList.add('active');
    }
    
    // Если переключились с страницы игры, останавливаем игру
    if (pageId !== 'game') {
        gameStarted = false; // Останавливаем игру
        cancelAnimationFrame(gameLoop); // Останавливаем анимацию
        clearInterval(scoreInterval); // Останавливаем таймер счетчика
    }

}
function startGame() {
    showPage('game'); // Переключиться на страницу игры
    gameStarted = true; // Начинаем игру
    resetPlayer(); // Сбросить состояние игрока
    moveBottles(); // Запустить движение бутылок
    gameLoop(); // Запустить основной игровой цикл
    startScoreTimer(); // Запустить таймер для начисления очков
}

// Функция для перезапуска игры
function restartGame() {
    // Здесь добавьте логику для сброса игры

    showPage('game'); // Вернуться на страницу игры
}

function resetPlayer() {
    playerX = window.innerWidth / 2 - 25;
    playerY = 0;
    playerSpeed = 2; // Сброс скорости падения игрока до начальной
    bottleSpeed = 1; // Сброс скорости движения бутылок до начальной
    passes = 0; // Обнуление количества проходов
    clearInterval(scoreInterval); // Остановка таймера при сбросе
    startTime = Date.now(); // Сброс времени начала игры
    updateScore();
    hideGameOverModal(); // Скрыть модальное окно после перезапуска игры
    // Возвращаем стили игрока и бутылок в исходное состояние
    player.style.top = `${playerY}px`;
    player.style.left = `${playerX}px`;
    bottles.forEach(bottle => {
        bottle.style.left = '0px';
        bottle.style.bottom = '0px';
    });
}

function moveBottles() {
    const sections = [
        { start: 0, end: window.innerWidth / 3 * 1.25 },
        { start: window.innerWidth / 3 * 0.75, end: window.innerWidth / 3 * 2.25 },
        { start: window.innerWidth / 3 * 1.75, end: window.innerWidth }
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

            bottleX += direction * bottleSpeed;
            bottle.style.left = `${bottleX}px`;

            checkCollision(bottle);
            if (!gameOverModal.style.display || gameOverModal.style.display === 'none') {
                requestAnimationFrame(animateBottle);
            }
        }

        animateBottle();
    });
}

function checkCollision(bottle) {
    const playerRect = player.getBoundingClientRect();
    const bottleRect = bottle.getBoundingClientRect();
    // Проверяем столкновение между игроком и бутылкой
    if (
    playerRect.right > bottleRect.left &&
    playerRect.left < bottleRect.right &&
    playerRect.bottom > bottleRect.top &&
    playerRect.top < bottleRect.bottom
    ) {

        // Сохраняем текущую позицию
        player.style.setProperty('--collision-start-x', `${playerX}px`);
        player.style.setProperty('--collision-start-y', `${playerY}px`);


 // Устанавливаем новую целевую позицию
 const targetX = bottleRect.left + bottleRect.width / 2;
 const targetY = bottleRect.bottom - player.offsetHeight;
 
 player.style.setProperty('--collision-end-x', `${targetX}px`);
 player.style.setProperty('--collision-end-y', `${targetY}px`);
 
 // Добавляем класс анимации
 player.classList.add('player-collision');
 
  // Фиксируем финальную позицию после анимации
  setTimeout(() => {
    player.style.left = `${targetX}px`;
    player.style.top = `${targetY}px`;
    playerX = targetX;
    playerY = targetY;
    
    showGameOverModal();
    player.classList.remove('player-collision');
}, 500);
}
}


function gameLoop() {
    if (!gameStarted || gameOverModal.style.display !== 'none') {
        // Если игра не запущена или показано окно Game Over, выходим из функции
        return;
    }
    playerY += playerSpeed * 2; // Удвоенная скорость падения игрока
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
        passes++;
        if (playerSpeed < maxPlayerSpeed) {
            playerSpeed *= 1.4; // Увеличиваем скорость падения игрока после каждого прохода через экран, если она меньше максимальной
        }
        if (bottleSpeed < maxBottleSpeed) {
            bottleSpeed *= 1.2; // Увеличиваем скорость движения бутылок после каждого прохода через экран, если она меньше максимальной
        }
        updateScore();
    }

    if (gameStarted && !gameOverModal.style.display || gameOverModal.style.display === 'none') {
        //if (gameStarted && !gameOverModal.style.display) {
        requestAnimationFrame(gameLoop);
    }
}

document.addEventListener('keydown', e => {
    if (!gameOverModal.style.display || gameOverModal.style.display === 'none') {
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
    }
});

function updateScore() {
    const currentTime = (Date.now() - startTime) / 1000; // Время в секундах
    score = Math.floor(currentTime * (passes + 1)); // Обновляем счет
    document.getElementById('score-value').textContent = score; // Обновляем счет на экране
}

function startScoreTimer() {
    scoreInterval = setInterval(() => {
        if (!gameOverModal.style.display || gameOverModal.style.display === 'none') {
            updateScore();
        }
    }, 1000);
}

// Функции для работы с модальным окном
function showGameOverModal() {
    const finalScore = score;
    finalScoreText.textContent = `YOUR SCORES: ${finalScore}`;
    
    // Remove collision animation class before showing modal
    player.classList.remove('player-collision');
    
    gameOverModal.style.display = 'flex';
    cancelAnimationFrame(gameLoop);
    clearInterval(scoreInterval);
}



function hideGameOverModal() {
    gameOverModal.style.display = 'none';
}

document.getElementById('play-again-button').addEventListener('click', () => {
    hideGameOverModal();
    resetPlayer();
    moveBottles();
    gameLoop();
    startScoreTimer();
    updateScore();
});
// Глобальные переменные для отслеживания касаний
let touchStartX = 0;
let touchEndX = 0;

// Обработчик начала касания
document.addEventListener('touchstart', (e) => {
    if (!gameOverModal.style.display || gameOverModal.style.display === 'none') {
        touchStartX = e.touches[0].clientX; // Сохраняем начальную координату X
    }
});

// Обработчик окончания касания
document.addEventListener('touchend', (e) => {
    if (!gameOverModal.style.display || gameOverModal.style.display === 'none') {
        touchEndX = e.changedTouches[0].clientX; // Сохраняем конечную координату X
        handleSwipe();
    }
});

// Функция для обработки свайпа
function handleSwipe() {
    const deltaX = touchEndX - touchStartX; // Разница между начальной и конечной точками
    const SWIPE_THRESHOLD = 50; // Минимальное расстояние для считывания свайпа

    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
        if (deltaX > 0) {
            // Свайп вправо
            playerX += 40; // Перемещаем игрока вправо
        } else {
            // Свайп влево
            playerX -= 40; // Перемещаем игрока влево
        }

        // Проверяем границы экрана
        if (playerX < -25) {
            playerX = window.innerWidth - 25;
        } else if (playerX > window.innerWidth - 25) {
            playerX = -25;
        }

        player.style.left = `${playerX}px`; // Обновляем позицию игрока
    }
}

// Add this script to your JS file or in a <script> tag
function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Set on load and resize
window.addEventListener('load', setVH);
window.addEventListener('resize', setVH);


/*// Инициализация игры
resetPlayer();
moveBottles();
gameLoop();
startScoreTimer(); // Запуск таймера для начисления очков
updateScore(); // Обновление начального значения счета
*/
