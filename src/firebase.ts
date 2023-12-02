import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCwlx4UKUlpYDp9gADDGLGHQkOUcVOVYrs",
  authDomain: "x-mas-218be.firebaseapp.com",
  projectId: "x-mas-218be",
  storageBucket: "x-mas-218be.appspot.com",
  messagingSenderId: "694659358332",
  appId: "1:694659358332:web:4c4805bb0eb1317a0af3f9",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
