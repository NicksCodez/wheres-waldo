import React from 'react';
import { useLoaderData } from 'react-router-dom';
import './Leaderboard.css';

// import app from '../../../firebase';
import db from '../../../firebase';

import { collection, getDocs, query, orderBy } from 'firebase/firestore';

function Leaderboard() {
  const leaderboard = useLoaderData();

  return (
    <div id="leaderboard">
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Place</th>
            <th>Name</th>
            <th>Time</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{formatTime(item.score)}</td>
              <td>{item.date.toDate().toDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const leaderboardLoader = async () => {
  const q = query(collection(db, 'leaderboard'), orderBy('score'));
  const querySnapshot = await getDocs(q);
  const leaderboard = [];
  querySnapshot.forEach((doc) => {
    leaderboard.push(doc.data());
  });

  return leaderboard;

  // testing with json server
  // const res = await fetch('http://localhost:4000/leaderboard');
  // if (!res.ok) {
  //   throw Error('Could not fetch the leaderboard');
  // }
  // return res.json();
};

const formatTime = (time) => {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time - hours * 3600000) / 60000);
  const seconds = Math.floor((time - hours * 3600000 - minutes * 60000) / 1000);
  const miliseconds = time % 1000;
  return `${hours > 9 ? hours : '0' + hours}:${
    minutes > 9 ? minutes : '0' + minutes
  }:${seconds > 9 ? seconds : '0' + seconds}:${
    miliseconds > 9
      ? miliseconds > 99
        ? miliseconds
        : '0' + miliseconds
      : '00' + miliseconds
  }`;
};

export default Leaderboard;
