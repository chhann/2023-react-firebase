// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// 인증을 위한 getAuth 가져옴
import { getAuth } from "firebase/auth";




// Your web app's Firebase configuration
const firebaseConfig = {
    // env를 사용하여 process.env.에 접근해서 가져올 수 있다
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH,
    projectId: "ex-firebase-b495a",
    storageBucket: "ex-firebase-b495a.appspot.com",
    messagingSenderId: "90393431289",
    appId: "1:90393431289:web:14a6f11dccafe02347e628"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 사용하고자하는 서비스를 들고와서 사용 
// 인증서비스에 관한 내용을 들고와서 사용
export const auth = getAuth(app);