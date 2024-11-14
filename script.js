const cardsArray = [
    '🍎', '🍎', '🍌', '🍌', '🍍', '🍍', '🍇', '🍇',
    '🍓', '🍓', '🍒', '🍒', '🍉', '🍉', '🍊', '🍊'
];

let flippedCards = [];
let matchedCards = [];
let moves = 0;
let timer;
let time = 0;

const gameBoard = document.getElementById('game-board');
const movesDisplay = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');
const restartButton = document.getElementById('restart');

// Função para embaralhar os cartões
function shuffleCards() {
    const shuffledArray = [...cardsArray].sort(() => Math.random() - 0.5);
    return shuffledArray;
}

// Função para atualizar o cronômetro
function startTimer() {
    timer = setInterval(() => {
        time++;
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}

// Função para parar o cronômetro
function stopTimer() {
    clearInterval(timer);
}

// Função para criar o tabuleiro de jogo
function createBoard() {
    const shuffledCards = shuffleCards();
    gameBoard.innerHTML = ''; // Limpar o tabuleiro antes de criar os novos cartões

    shuffledCards.forEach((cardValue, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = index;
        cardElement.dataset.value = cardValue;

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

// Função para girar os cartões
function flipCard() {
    if (flippedCards.length === 2) return; // Impede mais de dois cartões sendo virados ao mesmo tempo

    const card = this;
    if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

    card.classList.add('flipped');
    card.textContent = card.dataset.value;

    flippedCards.push(card);

    // Verificar se as cartas combinam
    if (flippedCards.length === 2) {
        moves++;
        movesDisplay.textContent = moves;
        checkMatch();
    }
}

// Função para verificar se as cartas viradas são iguais
function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
        flippedCards = [];

        if (matchedCards.length === cardsArray.length) {
            stopTimer();
            setTimeout(() => alert('Você ganhou!'), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
            flippedCards = [];
        }, 1000);
    }
}

// Função para reiniciar o jogo
function restartGame() {
    matchedCards = [];
    flippedCards = [];
    moves = 0;
    time = 0;
    movesDisplay.textContent = moves;
    timerDisplay.textContent = '00:00';
    createBoard();
    startTimer();
}

// Iniciar o jogo ao carregar a página
createBoard();
startTimer();

// Evento de reinício
restartButton.addEventListener('click', restartGame);
