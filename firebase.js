
// Import the functions you need from the SDKs you need
import {getAuth} from 'firebase/auth'
import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBQE00prWFM07-gevPDeENRsmwDB23mucg',
	authDomain: 'whatsapp-72f57.firebaseapp.com',
	projectId: 'whatsapp-72f57',
	storageBucket: 'whatsapp-72f57.appspot.com',
	messagingSenderId: '77345218381',
	appId: '1:77345218381:web:a9f8da4c876a4e271aa104'
};

// Initialize Firebase

const app = initializeApp(firebaseConfig)
const auth = getAuth();
const db = getFirestore()

export {auth, app,db};
