import { useEffect, useState } from 'react';
import Card from './components/Card';
import './App.scss';

const isPrime = (number) => {
  for (let i = 2; i < number; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

const generateArrayOfRandomNumbers = (count) => {
  const resultArray = [];

  while (resultArray.length < count) {
    let randomNumber = Math.round(Math.random() * (60 - 2) + 2);

    if (isPrime(randomNumber) && !resultArray.includes(randomNumber)) {
      resultArray[resultArray.length] = randomNumber;
    }
  }

  return resultArray;
}

const App = () => {
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [openedCards, setOpenedCards] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const mixCards = () => {
    const generateRandomCards = generateArrayOfRandomNumbers(16)
      .map(card => ({ number: card, matched: false }))
    const mixedCards = [...generateRandomCards, ...generateRandomCards]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
    const visibleMixedCards = mixedCards.map(card => {
      return {...card, matched: true}
    })

    setFirstCard(null);
    setSecondCard(null);
    setCards(visibleMixedCards);
    setTimeout(() => setCards(mixedCards), 5000);
    setOpenedCards(0);
  }

  const handleSelect = (card) => {
    firstCard ? setSecondCard(card) : setFirstCard(card);
  }

  useEffect(() => {
    if (firstCard && secondCard) {
      setDisabled(true);

      if (firstCard.number === secondCard.number) {
        setCards(prevCards => prevCards.map(card => {
          if (card.number === firstCard.number) {
            return { ...card, matched: true };
          }

          return card;
        }));

        setTimeout(() => clearOpenedCards(), 1000);
      } else {
        setTimeout(() => clearOpenedCards(), 1000);
      }
    }
  }, [firstCard, secondCard]);

  const clearOpenedCards = () => {
    setFirstCard(null);
    setSecondCard(null);
    setOpenedCards(prev => prev + 1);
    setDisabled(false);
  }

  useEffect(() => {
    mixCards();
  }, []);

  return (
    <div className="App">
      <h1>Mahjong</h1>
      <button
        onClick={mixCards}
        className='button_start'
      >
        START NEW GAME
      </button>
      <div className='board'>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleSelect={handleSelect}
            disabled={disabled}
            isCardTurned={
              card.matched === true
              || card === firstCard
              || card === secondCard
            }
          />
        ))}
      </div>
      <span>Count of the opened pairs: {openedCards}</span>
    </div>
  );
}

export default App;
