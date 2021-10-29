import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyB0UTJ_L74LyscFNkCCaqiJan0GBXbwsyo",
  authDomain: "next-firestore-bba9c.firebaseapp.com",
  projectId: "next-firestore-bba9c",
  storageBucket: "next-firestore-bba9c.appspot.com",
  messagingSenderId: "335801513647",
  appId: "1:335801513647:web:2b6b44110822207edc065a",
  measurementId: "G-9CHVG4VGN7"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
};

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export async function getUserWithUsername(username) {
  const usersRef = firestore.collection('users');
  const query = usersRef.where('username', '==', username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}

export const fromMillis = firebase.firestore.Timestamp.fromMillis;
