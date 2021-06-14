import firebase from 'firebase/app'
import "firebase/firestore";
import "firebase/auth";

//import "firebase/database";
//import "firebase/functions";
//import "firebase/storage";

const config = {
	// Four Firebase App Config
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
