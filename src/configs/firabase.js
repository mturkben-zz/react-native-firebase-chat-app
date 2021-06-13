import firebase from 'firebase/app'
import "firebase/firestore";
import "firebase/auth";

//import "firebase/database";
//import "firebase/functions";
//import "firebase/storage";

const config = {
	apiKey: "AIzaSyAXjGxvVHjfz-_K-eCpoo5_VxamsFKavYg",
	authDomain: "test-chat-app-firabase.firebaseapp.com",
	projectId: "test-chat-app-firabase",
	storageBucket: "test-chat-app-firabase.appspot.com",
	messagingSenderId: "504531447636",
	appId: "1:504531447636:web:d52a20ea62e75d373a62c1",
};

let app;
if(firebase.apps.length === 0) {
	app = firebase.initializeApp(config);
} else {
	app = firebase.app()
}


const db = app.firestore();
const auth = firebase.auth()

export {
	db,
	auth
}
