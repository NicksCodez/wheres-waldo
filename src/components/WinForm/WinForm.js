import React from 'react';
import { redirect } from 'react-router-dom';
import './WinForm.css';
import { Form } from 'react-router-dom';
import db from '../../firebase';
import { addDoc, serverTimestamp, collection } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

export default function WinForm(props) {
  const { score } = props;

  return (
    <div id="WinForm">
      <h3>Submit your score</h3>
      <Form method="post" action="/game">
        <label>
          <span>Your score:</span>
          <input type="text" name="score" readOnly value={`${score / 1000}`} />
        </label>
        <label>
          <span>Your nickname:</span>
          <input type="text" name="nickname" required />
        </label>
        <button>Submit</button>
      </Form>
    </div>
  );
}

export const winFormAction = async ({ request }) => {
  const data = await request.formData();

  const nickname = data.get('nickname');
  const score = data.get('score');

  try {
    await addDoc(collection(db, 'leaderboard'), {
      name: nickname,
      date: serverTimestamp(),
      id: uuidv4(),
      level: 0,
      score: parseInt(score * 1000, 10),
    });
  } catch (error) {
    console.error('Error writing to Firebase Database', error); // get better error handling
  }

  return redirect('/leaderboard');
};
