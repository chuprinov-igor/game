const game = document.getElementById('game');
const player = document.getElementById('player');
const scoreElement = document.getElementById('score');
let playerX = 50; // Начальная позиция игрока по X
let playerY = 0; // Начальная позиция игрока по Y
let speed = 2; // Скорость падения
let score = 0; // Счет
let bottles = []; // Массив для бутылок
let gameInterval;

// Создаем бутылки
function createBottles() {
  for (let i = 0; i < 3; i++) {
    const bottle = document.createElement('div');
    bottle.className = 'bottle';
    bottle.style.left = `${Math.random() * 80}vw`; // Случайная позиция по X
    bottle.style.bottom = '0';
    game.appendChild(bottle);
    bottles.push(bottle);
  }
}

// Движение бутылок
function moveBottles() {
  bottles.forEach(bottle => {
    let x = parseFloat(bottle.style.left);
    x += (Math.random() - 0.5) * 4; // Случайное движение влево/вправо
    if (x < 0) x = 0;
    if (x > 95) x = 95;
    bottle.style.left = `${x}vw`;
  });
}

// Падение игрока
function fallPlayer() {
  playerY += speed;
  player.style.top = `${playerY}px`;

  // Проверка столкновения
  bottles.forEach(bottle => {
    const bottleRect = bottle.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();
    if (
      playerRect.bottom >= bottleRect.top &&
      playerRect.top <= bottleRect.bottom &&
      playerRect.right >= bottleRect.left &&
      playerRect.left <= bottleRect.right
    ) {
      endGame();
    }
  });

  // Если игрок достиг низа
  if (playerY + 50 > window.innerHeight) {
    playerY = 0;
    speed += 0.5; // Увеличиваем скорость
    score += 1; // Увеличиваем счет
    scoreElement.innerText = `Счет: ${score}`;
  }
}

// Управление игроком
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && playerX > 0) {
    playerX -= 10;
  }
  if (e.key === 'ArrowRight' && playerX < window.innerWidth - 50) {
    playerX += 10;
  }
  player.style.left = `${playerX}px`;
});

// Завершение игры
function endGame() {
  alert(`Игра окончена! Ваш счет: ${score}`);
  clearInterval(gameInterval);
  location.reload(); // Перезагрузка страницы для новой игры
}

// Запуск игры
function startGame() {
  createBottles();
  gameInterval = setInterval(() => {
    fallPlayer();
    moveBottles();
  }, 20);
}

startGame();
