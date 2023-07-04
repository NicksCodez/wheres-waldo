import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Home.css';
import Grenade from '../../../assets/images/grenade.png';
import Lilith from '../../../assets/images/lilith.png';
import Painting from '../../../assets/images/painting.png';

export default function Home() {
  return (
    <div className="home">
      <div>
        <p>Find the following 3 characters as fast as you can:</p>
        <ul>
          <li>
            <div>
              <img src={Grenade} alt="grenade" />
            </div>
            The Holy Grenade
          </li>
          <li>
            <div>
              <img src={Lilith} alt="lilith" />
            </div>
            Lilith
          </li>
          <li>
            <div>
              <img src={Painting} alt="painting" />
            </div>
            The Death of Socrates, but with psychos
          </li>
        </ul>
        <NavLink to="/game/1">Let's Play!</NavLink>
      </div>
    </div>
  );
}
