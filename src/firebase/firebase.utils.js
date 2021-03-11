import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
        apiKey: "AIzaSyDAXZOW1kFoxWqabNw6iaR-DODyNfME47k",
        authDomain: "ibmdemo-e4946.firebaseapp.com",
        projectId: "ibmdemo-e4946",
        storageBucket: "ibmdemo-e4946.appspot.com",
        messagingSenderId: "9956866674",
        appId: "1:9956866674:web:61d0f795ce5e5b851260eb",
        measurementId: "G-4FJX8RH1VD"
}

export const createUserProfileDocument = async (userAuth , additionData) => {
    if(!userAuth) return;

      const userref = firestore.doc(`users/${userAuth.uid}`);
      const snapshot = await userref.get();
    console.log(snapshot);
   

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);


export default firebase;