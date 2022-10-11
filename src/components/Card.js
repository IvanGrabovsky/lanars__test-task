import classNames from 'classnames';
import './Card.scss'

export default function Card({ card, handleSelect, disabled, isCardTurned }) {

  const handleClick = () => {
    if (!disabled) {
      handleSelect(card);
    }
  }

  return (
    <div
      className={classNames(
        'cell',
        {
          'opened': card.matched
        },
      )}
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
