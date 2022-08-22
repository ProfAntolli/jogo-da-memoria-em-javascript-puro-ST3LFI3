const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard 
let secondCard;

let lockBoard = false;
let numberWin = 0;


function flipCard(){
    if(lockBoard) return;

    if (this === firstCard) return;

    this.classList.add('flip')

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard      = this;
        return ;
    }

    secondCard     = this;

    checkForMatch();
}

function checkForMatch(){
    firstCard.dataset.suplemento === secondCard.dataset.suplemento ? disabledCards() : unflipCards();

    handleWin()
}

function disabledCards(){
    firstCard.removeEventListener('click',  flipCard)
    secondCard.removeEventListener('click', flipCard)

    numberWin++;

    resetBoard();
}

function unflipCards(){
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard,     secondCard] = [null,   null];
}

function shuffle() {
    cards.forEach(card => {
      let ramdomPos = Math.floor(Math.random() * 12);
      card.style.order = ramdomPos;
    });
}

shuffle();

function handleWin(){
    if(numberWin < 6) return;

    setTimeout(() => {
        document.querySelector('.box-win').classList.add('show');
    }, 2000)
    
}

function resetGame(){
    window.location.reload()
}

cards.forEach(card => card.addEventListener('click', flipCard))