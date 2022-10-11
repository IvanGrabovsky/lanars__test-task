import { useEffect, useState } from 'react';
import './App.scss';
import Card from './components/Card';

const App = () => {
  const [cards, setCards] = useState([]);
  const [openedCards, setOpenedCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);


  const mixCards = () => {
    const cardsAmount = 16;
    let mixedCards = [];
    
    for (let i = 0; i < cardsAmount; i++) {
      mixedCards[i] = {
        number: Math.round(Math.random() * 60),
        matched: false,
      }
    }

    mixedCards = [...mixedCards, ...mixedCards]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))

    setCards(mixedCards);
    setOpenedCards(0);
  }

  const handleSelect = (card) => {
    firstCard ? setSecondCard(card) : setFirstCard(card);
  }

  useEffect(() => {
    if (firstCard && secondCard) {
      if (firstCard.number === secondCard.number) {
        setCards(prevCards => prevCards.map(card => {
          if (card.number === firstCard.number) {
            return { ...card, matched: true };
          }

          return card;
        }));

        clearOpenedCards();
      } else {
        clearOpenedCards();
      }
    }
  }, [firstCard, secondCard]);

  console.log(cards);

  const clearOpenedCards = () => {
    setFirstCard(null);
    setSecondCard(null);
    setOpenedCards(prev => prev + 1);
  }

  return (
    <div className="App">
      <h1>Mahjong</h1>
      <button
        onClick={mixCards}
        className='button_start'
      >
        New game
      </button>
      <div className='board'>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card} 
            handleSelect={handleSelect}
            isCardTurned={
              card.matched === true
              || card === firstCard
              || card === secondCard
            }
          />
        ))}
      </div>
    </div>
  );
}

export default App;
