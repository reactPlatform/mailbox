
import {initializeApp} from "firebase/app";
import {getAuth} from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDh8ZLoVgtPRlyRV77k59nAU_dUhlBlr1E",
  authDomain: "mailboxclient-156f6.firebaseapp.com",
  projectId: "mailboxclient-156f6",
  storageBucket: "mailboxclient-156f6.appspot.com",
  messagingSenderId: "34933236868",
  appId: "1:34933236868:web:32249b73284632b8178ed1",
  databaseURL: "https://mailboxclient-156f6-default-rtdb.firebaseio.com/",
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


