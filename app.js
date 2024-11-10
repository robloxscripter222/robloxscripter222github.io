let playerCards = [];
let dealerCards = [];
let playerScore = 0;
let dealerScore = 0;
let gameOver = false;

// Funkcija koja računa sumu kartica
function calculateScore(cards) {
    let score = 0;
    let aces = 0;
    cards.forEach(card => {
        if (card === 1) {
            score += 11;
            aces++;
        } else if (card > 10) {
            score += 10;
        } else {
            score += card;
        }
    });

    // Ako je ukupan broj kartica više od 21 i ima As, smanjite As sa 11 na 1
    while (score > 21 && aces > 0) {
        score -= 10;
        aces--;
    }

    return score;
}

// Prikazivanje rezultata na ekranu
function updateGame() {
    document.getElementById('player-cards-text').textContent = playerCards.join(", ");
    document.getElementById('dealer-cards-text').textContent = dealerCards.join(", ");
    document.getElementById('player-score-text').textContent = playerScore;
    document.getElementById('dealer-score-text').textContent = dealerScore;
}

// Da li je igrač izgubio ili pobedio
function checkGameOver() {
    if (playerScore > 21) {
        gameOver = true;
        document.getElementById('game-message').textContent = "Player busted! You lost.";
    } else if (dealerScore > 21) {
        gameOver = true;
        document.getElementById('game-message').textContent = "Dealer busted! You win!";
    } else if (dealerScore >= 17) {
        if (playerScore > dealerScore) {
            gameOver = true;
            document.getElementById('game-message').textContent = "You win!";
        } else if (playerScore < dealerScore) {
            gameOver = true;
            document.getElementById('game-message').textContent = "You lose!";
        } else {
            gameOver = true;
            document.getElementById('game-message').textContent = "It's a tie!";
        }
    }
}

// Funkcija koja pokreće igru
document.getElementById('deal-cards').addEventListener('click', () => {
    const playerCard1 = parseInt(document.getElementById('player-card-1').value);
    const playerCard2 = parseInt(document.getElementById('player-card-2').value);

    if (isNaN(playerCard1) || isNaN(playerCard2)) {
        alert("Please enter valid card values.");
        return;
    }

    playerCards = [playerCard1, playerCard2];
    playerScore = calculateScore(playerCards);

    dealerCards = [Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1];
    dealerScore = calculateScore(dealerCards);

    updateGame();

    document.getElementById('hit-btn').disabled = false;
    document.getElementById('stand-btn').disabled = false;
});

// Funkcija za "Hit" opciju
document.getElementById('hit-btn').addEventListener('click', () => {
    if (gameOver) return;

    let newCard = Math.floor(Math.random() * 10) + 1;
    playerCards.push(newCard);
    playerScore = calculateScore(playerCards);

    updateGame();
    checkGameOver();
});

// Funkcija za "Stand" opciju
document.getElementById('stand-btn').addEventListener('click', () => {
    if (gameOver) return;

    while (dealerScore < 17) {
        dealerCards.push(Math.floor(Math.random() * 10) + 1);
        dealerScore = calculateScore(dealerCards);
    }

    updateGame();
    checkGameOver();
});
