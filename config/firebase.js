import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBhXY3D0aP1CqFaPQWNkDAHfkugTTsuSHg",
  authDomain: "giftedchat-7ccf1.firebaseapp.com",
  databaseURL: "https://giftedchat-7ccf1.firebaseio.com",
  projectId: "giftedchat-7ccf1",
  storageBucket: "giftedchat-7ccf1.appspot.com",
  messagingSenderId: "122015404466",
  appId: "1:122015404466:web:5836c0d9633b16fce414ab"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };