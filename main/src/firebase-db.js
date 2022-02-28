import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDB2gdWSQiVFqE_iiM9wCFlPfz_nsItwY4",
    authDomain: "expense-claim-app-619e1.firebaseapp.com",
    projectId: "expense-claim-app-619e1",
    storageBucket: "expense-claim-app-619e1.appspot.com",
    messagingSenderId: "1038930557644",
    appId: "1:1038930557644:web:7c08640f82709b73a6a069",
    measurementId: "G-Y2VMM0DBGB"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;