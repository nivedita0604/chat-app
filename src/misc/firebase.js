import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyDk4DCl7x2ozHq5Du-I_byz4JfQxvQicos',
  authDomain: 'chat-web-app-a6282.firebaseapp.com',
  projectId: 'chat-web-app-a6282',
  storageBucket: 'chat-web-app-a6282.appspot.com',
  messagingSenderId: '651434146898',
  appId: '1:651434146898:web:5b3a040e7d8921a07b338b',
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
