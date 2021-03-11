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

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;