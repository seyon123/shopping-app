import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyAR7S1awI-whl6ygU8t7cZSR51WcqEUzEY",
	authDomain: "reactshoppy.firebaseapp.com",
	databaseURL: "https://reactshoppy.firebaseio.com",
	projectId: "reactshoppy",
	storageBucket: "reactshoppy.appspot.com",
	messagingSenderId: "794772090500",
	appId: "1:794772090500:web:98a042382537b014d6dcd1",
	measurementId: "G-PPLNQC1VBH",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
