import "./App.css";
import { useState } from "react";

const images = [
  "pics/alien.png",
  "pics/burger.png",
  "pics/car.png",
  "pics/cat.png",
  "pics/donut.png",
  "pics/flower.png",
  "pics/house.png",
  "pics/robot.png",
  "pics/rocket.png",
  "pics/soda.png",
];

function shuffleArray(array) {
  let shuffledArray = [...array];
  for (let i = 0; i < shuffledArray.length; i++) {
    const randomIndex = Math.floor(Math.random() * shuffledArray.length);
    [shuffledArray[i], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[i],
    ];
  }
  return shuffledArray;
}

function generateShuffledCards() {
  const selectedImages = shuffleArray(images).slice(0, 8);
  const pairedImages = [...selectedImages, ...selectedImages];
  return shuffleArray(pairedImages).map((image, index) => ({
    id: index,
    image,
    isFlipped: false,
    isMatched: false,
  }));
}

function App() {
  const [cards, setCards] = useState(generateShuffledCards());
  const [flippedCards, setFlippedCards] = useState([]);

  const handleCardClick = (id) => {
    const newCards = [...cards];
    const cardIndex = newCards.findIndex((card) => card.id === id);

    if (newCards[cardIndex].isFlipped || newCards[cardIndex].isMatched) return;

    newCards[cardIndex].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, newCards[cardIndex]];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setTimeout(() => {
        if (newFlippedCards[0].image === newFlippedCards[1].image) {
          const updatedCards = newCards.map((card) =>
            card.image === newFlippedCards[0].image
              ? { ...card, isMatched: true }
              : card
          );
          setCards(updatedCards);
        } else {
          const updatedCards = newCards.map((card) =>
            card.isFlipped && !card.isMatched
              ? { ...card, isFlipped: false }
              : card
          );
          setCards(updatedCards);
        }
        setFlippedCards([]);
      }, 1000);
    }
  };

  return (
    <div className="game-board">
      {cards.map((card) => (
        <div
          key={card.id}
          className={`card ${card.isFlipped ? "flipped" : ""}`}
          onClick={() => handleCardClick(card.id)}
        >
          {card.isFlipped || card.isMatched ? (
            <img src={card.image} alt="memory card" />
          ) : (
            <div className="card-back"></div>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
