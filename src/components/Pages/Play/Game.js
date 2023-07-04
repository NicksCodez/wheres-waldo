import React, { useState } from 'react';
import './Game.css';
import Masterpiece from '../../../assets/images/masterpiece-4K.jpg';
import Grenade from '../../../assets/images/grenade.png';
import Lilith from '../../../assets/images/lilith.png';
import Painting from '../../../assets/images/painting.png';
import { useParams } from 'react-router-dom';
import WinForm from '../../WinForm/WinForm';

export default function Game() {
  const [score, setScore] = useState(10000);
  const timeStarted = Date.now();
  const { id } = useParams();
  const jackpotCoords = [
    {
      name: 'Lilith',
      x: [269, 312],
      y: [893, 946],
    },
    {
      name: 'Grenade',
      x: [536, 576],
      y: [384, 436],
    },
    {
      name: 'Painting',
      x: [253, 390],
      y: [1192, 1299],
    },
  ];
  let lastClicked = '';
  const guessed = [];

  const getCoords = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return { x, y };
  };

  const handleClick = (event) => {
    const { x, y } = getCoords(event);
    const ulElement = document.getElementById('dropdown');
    if (ulElement.style.left === '-50%' || !ulElement.getAttribute('style')) {
      ulElement.style.left = `${x}px`;
      ulElement.style.top = `${y}px`;
    } else {
      ulElement.style.left = '-50%';
      ulElement.style.top = '-50%';
    }

    for (const element of jackpotCoords) {
      if (
        x > element.x[0] &&
        x < element.x[1] &&
        y > element.y[0] &&
        y < element.y[1]
      ) {
        return element.name;
      }
    }
    return '';
  };

  const handleChoice = () => {
    if (
      (event.target.getAttribute('alt') &&
        event.target.getAttribute('alt') === lastClicked.toLowerCase()) ||
      (event.target.firstChild &&
        event.target.firstChild.firstChild.getAttribute('alt') ==
          lastClicked.toLowerCase())
    ) {
      if (!guessed.includes(lastClicked)) {
        guessed.push(lastClicked);
        document.getElementById(
          'guessed'
        ).textContent = `You found ${lastClicked}`;
        document.getElementById('guessed').style.display = 'block';
        document.getElementById('guessed').style.opacity = 1;
        setTimeout(() => {
          document.getElementById('guessed').style.display = 'none';
          document.getElementById('guessed').style.opacity = 0;
        }, '1000');
      }

      if (guessed.length === 3) {
        guessed.pop();
        guessed.pop();
        guessed.pop();
        const timeEnded = Date.now();
        setScore(timeEnded - timeStarted);
        document.getElementById('WinForm').classList.add('active');
      }
    }

    const ulElement = document.getElementById('dropdown');
    ulElement.style.left = '-50%';
    ulElement.style.top = '-50%';
  };

  if (id === '1') {
    return (
      <div id="level1">
        <div id="guessed"></div>
        <WinForm score={score} />
        <img
          src={Masterpiece}
          onClick={() => {
            lastClicked = handleClick(event);
          }}
        ></img>

        <p className="copyright">
          Picture copyright:
          <a
            target="_blank"
            href="https://borderlands.com/en-US/news/2019-09-10-masterpiece-of-mayhem/"
          >
            Gearbox
          </a>
        </p>
        <ul id="dropdown">
          <li>
            <button onClick={handleChoice}>
              <div>
                <img src={Grenade} alt="grenade" />
              </div>
              Grenade
            </button>
          </li>
          <li>
            <button onClick={handleChoice}>
              <div>
                <img src={Lilith} alt="lilith" />
              </div>
              Lilith
            </button>
          </li>
          <li>
            <button onClick={handleChoice}>
              <div>
                <img src={Painting} alt="painting" />
              </div>
              Painting
            </button>
          </li>
        </ul>
      </div>
    );
  }
}
