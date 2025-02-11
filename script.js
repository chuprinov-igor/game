body {
    margin: 0;
    overflow: hidden;
    position: relative;
    background: url('images/background.svg') no-repeat center center fixed; /* Добавляем векторное изображение */
    background-size: cover; /* Масштабируем изображение, чтобы оно покрывало весь экран */
}
.player-image {
    position: absolute;
    right: 40px;
    bottom: 20px;
    width: 350px;
    height: auto;
    z-index: -1;
    animation: float 3s ease-in-out infinite;
}

@keyframes float {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
}

#game-container {
    position: absolute;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-start; /* Выравниваем элементы по верхней части контейнера */
    pointer-events: none; /* Убираем взаимодействие с контейнером, чтобы оно не мешало игре */
}

.sun {
    position: absolute;
    top: 50px;
    left: 50px;
    width: 100px;
    height: 100px;
    background: radial-gradient(circle, #FFD700, #FFA500); /* Градиент для солнца */
    border-radius: 50%;
    box-shadow: 0 0 50px rgba(255, 215, 0, 0.5); /* Добавляем светящийся эффект */
    z-index: 1; /* Убедитесь, что солнце находится поверх фона */
}

.bottle {
    position: absolute;
    bottom: 0; /* Бутылка прижата к нижней части экрана */
    width: 35px; /* Ширина бутылки */
    height: 150px; /* Высота бутылки */
    background: url('images/bottle.svg') no-repeat center center; /* Векторное изображение бутылки */
    background-size: contain; /* Масштабируем изображение */
    z-index: 2; /* Убедитесь, что бутылки находятся поверх фона */
    pointer-events: auto; /* Возвращаем взаимодействие для бутылок */
}

.player {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 200px; /* Ширина игрока */
    height: 300px; /* Высота игрока */
    background: url('images/player.svg') no-repeat center center; /* Векторное изображение игрока */
    background-size: contain; /* Масштабируем изображение */
    z-index: 3; /* Игрок поверх всех элементов */

}

#player, .bottle {
    outline: 2px solid red; /* Временная граница для отладки */
}

@keyframes collisionMove {
    from {
        left: var(--collision-start-x);
        top: var(--collision-start-y);
    }
    to {
        left: var(--collision-end-x);
        top: var(--collision-end-y);
    }
}

.player-collision {
    animation: collisionMove 0.5s ease-in-out forwards;
}


#score-panel {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #FFD700;
    font-family: 'Luckiest Guy', cursive;
    text-shadow: 
        3px 3px 0 #FF4500,
        -1px -1px 0 #FF4500, 
        1px -1px 0 #FF4500, 
        -1px 1px 0 #FF4500, 
        1px 1px 0 #FF4500;
    -webkit-text-stroke: 2px #000;
    letter-spacing: 2px;
    transform: rotate(-2deg);
    text-align: center;
    font-size: 60px;
  
    z-index: 4; /* Убедитесь, что панель счета находится поверх всех других элементов */
}

/* Стили для модального окна */
.modal {
    display: none; /* По умолчанию скрыто */
    position: fixed;
    z-index: 5; /* Убедитесь, что модальное окно находится поверх всех других элементов */
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
   /* background-color: rgba(255, 255, 0, 0.3); Яркий желтый фон с прозрачностью */
  background-color: rgba(139, 69, 19, 0.3);  /* Темно-коричневый с прозрачностью */
  /* background-color: rgba(210, 180, 140, 0.3);  Песочный коричневый с прозрачностью */
    justify-content: center;
    align-items: center;
}

.modal-content {
     background: linear-gradient(135deg, #ff7e5f, #feb47b); /* Градиент в стиле комиксов */
    padding: 30px;
    border-radius: 20px;
    text-align: center;
    box-shadow: 0 8px 16px rgba(255, 100, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 400px;
    width: 90%; /* Адаптивная ширина */
}

#game-over-text {
    font-size: 48px;
    font-weight: bold;
    color: #ffffff;
    text-shadow: 
        3px 3px 0 #ff4500,
        -1px -1px 0 #ff4500, 
        1px -1px 0 #ff4500, 
        -1px 1px 0 #ff4500, 
        1px 1px 0 #ff4500;
    margin-bottom: 20px;
    letter-spacing: 2px;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
}

#final-score-text {
    font-size: 24px;
    color: #ffffff;
    text-shadow: 2px 2px 0 #ff4500;
    margin-bottom: 20px;
}


#play-again-button {
    padding: 15px 30px;
    font-size: 25px;
    cursor: pointer;
    font-family: 'Luckiest Guy', cursive;
    background-color: #ff7e5f;
    color: white;
    border: none;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
}

#play-again-button:hover {
    background-color: #ff4500;
    transform: translateY(-3px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
}

.menu-button {
    padding: 15px 30px;
    font-size: 25px;
    cursor: pointer;
    font-family: 'Luckiest Guy', cursive;
    background-color: #feb47b;
    color: white;
    border: none;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    margin-top: 10px;
}

.menu-button:hover {
    background-color: #ff7e5f;
    transform: translateY(-3px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
}


.page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    transition: opacity 0.5s ease;
}

.hidden {
    display: none;
}

.active {
    display: flex;
}


h1 {
    position: relative;
    top: -50px;
    font-size: 6.0rem;
    margin-bottom: 20px;
    color: #FFD700;
    font-family: 'Luckiest Guy', cursive;
    text-shadow: 
        3px 3px 0 #FF4500,
        -1px -1px 0 #FF4500, 
        1px -1px 0 #FF4500, 
        -1px 1px 0 #FF4500, 
        1px 1px 0 #FF4500;
    -webkit-text-stroke: 2px #000;
    letter-spacing: 2px;
    transform: rotate(-2deg);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    white-space: nowrap;
}

h1 span {
    display: block;
}

/* Мобильная версия */
@media screen and (max-width: 768px) {
    .player-image {
        width: 80%; /* Ширина картинки равна 30% ширины экрана */
        height: auto; /* Высота автоматически масштабируется пропорционально ширине */
        right: -40%; /* Расположение по оси X: 5% от правого края экрана */
        bottom: 10%; /* Расположение по оси Y: 10% от нижнего края экрана */
        z-index: -1; /* Картинка за текстом */
        position: absolute; /* Абсолютное позиционирование относительно родителя */
    }

    h1 {
        font-size: 18vw; /* Размер шрифта равен 9% от ширины экрана */
        text-shadow: 
            2px 2px 0 #FF4500, 
            -1px -1px 0 #FF4500, 
            1px -1px 0 #FF4500, 
            -1px 1px 0 #FF4500, 
            1px 1px 0 #FF4500;
        -webkit-text-stroke: 1px #000;
        transform: rotate(0);
        z-index: 2; /* Заголовок поверх картинки */
        max-width: 90%; /* Ограничиваем ширину заголовка 90% ширины экрана */
        text-align: center; /* Центрируем текст */
    }
}

/* Landscape mode adjustments */
@media screen and (max-height: 500px) {
    #home-page {
        justify-content: space-around;
    }
    
    h1 {
        margin-bottom: 10px;
    }
}


/* button {
    width: 80%; 
    max-width: 300px;
    margin: 10px 0;
    padding: 15px 20px;
    font-size: 1rem;
    border: none;
    border-radius: 10px;
    font-family: 'Luckiest Guy';
    background-color: #4a4e69;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}*/


/* button:hover {
    background-color: #5a6b8c;
    transform: translateY(-3px);
    box-shadow: 0 6px 8px rgba(0,0,0,0.2);
}*/

/* button:active {
    transform: translateY(1px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}*/


button {
    width: 80%; /* Ширина кнопок */
    max-width: 300px;
    margin: 15px 0; /* Отступы между кнопками */
    padding: 20px;
    font-size: 1.5rem; /* Размер шрифта */
    border: none;
    border-radius: 15px; /* Скругленные углы */
    font-family: 'Luckiest Guy', cursive; /* Шрифт в стиле комиксов */
    text-transform: uppercase; /* Текст заглавными буквами */
    letter-spacing: 2px; /* Промежутки между буквами */
    transition: all 0.3s ease; /* Плавные переходы */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* Тень для объемности */
    cursor: pointer; /* Указатель при наведении */
}

/* Основной стиль кнопок */
button.start-button {
    background: linear-gradient(135deg, #ff7e5f, #feb47b); /* Яркий градиент в стиле комиксов */
    color: white;
    text-shadow: 2px 2px 0 #ff4500; /* Тень текста для драматичности */
}

button.start-button:hover {
    background: linear-gradient(135deg, #ff4500, #ff7e5f); /* Более насыщенный градиент при наведении */
    transform: scale(1.05); /* Легкое увеличение размера */
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3); /* Более сильная тень */
}

button.start-button:active {
    transform: scale(0.95); /* Сжатие при клике */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Слабая тень */
}


/* Стиль для кнопки "О игре" */
button.about-button {
    background: linear-gradient(135deg, #8B0000, #FF4500); /* Красно-коричневый градиент */
    color: white;
    text-shadow: 2px 2px 0 #8B0000;
}

button.about-button:hover {
    background: linear-gradient(135deg, #FF4500, #8B0000); /* Перевернутый градиент при наведении */
    transform: scale(1.05);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
}

button.about-button:active {
    transform: scale(0.95);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Основной стиль кнопок */
button.start-button {
    background: linear-gradient(135deg, #ff7e5f, #feb47b); /* Яркий градиент в стиле комиксов */
    color: white;
    text-shadow: 2px 2px 0 #ff4500; /* Тень текста для драматичности */
}

button.start-button:hover {
    background: linear-gradient(135deg, #ff4500, #ff7e5f); /* Более насыщенный градиент при наведении */
    transform: scale(1.05); /* Легкое увеличение размера */
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3); /* Более сильная тень */
}

button.start-button:active {
    transform: scale(0.95); /* Сжатие при клике */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Слабая тень */
}
/* Стиль для кнопки "Выход" */
button.exit-button {
    background: linear-gradient(135deg, #4B0082, #8B0080); /* Фиолетово-бордовый градиент */
    color: white;
    text-shadow: 2px 2px 0 #4B0082;
}

button.exit-button:hover {
    background: linear-gradient(135deg, #8B0080, #4B0082); /* Перевернутый градиент при наведении */
    transform: scale(1.05);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
}

button.exit-button:active {
    transform: scale(0.95);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
