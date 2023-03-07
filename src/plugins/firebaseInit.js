import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: 'AIzaSyCbhtniYzILMt5QOJ_Fk00YSRbwfBWtta4',
  authDomain: 'covid-c9e6d.firebaseapp.com',
  projectId: 'covid-c9e6d',
  storageBucket: 'covid-c9e6d.appspot.com',
  messagingSenderId: '971477595106',
  appId: '1:971477595106:web:8fcdca2cb96d2fe647bfbb'
}
initializeApp(firebaseConfig)
/* 
const db = getFirestore(app)
const auth = getAuth(app)
const db1 = getDatabase();

export { db, auth , db1}
 */