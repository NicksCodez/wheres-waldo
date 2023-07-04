// firebase imports

import {
  collection,
  query,
  getDocs,
  getFirestore,
  doc,
  steDoc,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCDnjfJ_XQQWQeNvxskviJ-sw8F32Hpylg',
  authDomain: 'where-s-waldo-6b7f2.firebaseapp.com',
  projectId: 'where-s-waldo-6b7f2',
  storageBucket: 'where-s-waldo-6b7f2.appspot.com',
  messagingSenderId: '870843233961',
  appId: '1:870843233961:web:cf27266985fa5f262c5bb8',
};

const app = initializeApp(firebaseConfig);

export default getFirestore(app);
