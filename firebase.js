import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyBI9MWRn783-kB8fVxSPKpSdExjKgNQJg4",
    authDomain: "twitter-clone-43277.firebaseapp.com",
    projectId: "twitter-clone-43277",
    storageBucket: "twitter-clone-43277.appspot.com",
    messagingSenderId: "187264338135",
    appId: "1:187264338135:web:102bff86fe7a52c96d8892"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };