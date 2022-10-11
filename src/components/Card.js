import { useState } from 'react';
import './Card.scss'

export default function Card({ card, handleSelect, isCardTurned }) {
  const [isOpen, setOpen] = useState(true);

  const handleClick = () => {
    handleSelect(card);
    setOpen(!isOpen);
  }

  return (
    <div
      className='cell'
      onClick={handleClick}
    >
      <span
        className={isCardTurned ? 'visible' : 'hidden'}
      >
        {card.number}
      </span>
    </div>
  )
}
