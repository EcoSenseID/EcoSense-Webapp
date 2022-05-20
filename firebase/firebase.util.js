// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword 
} from "firebase/auth";
import { getAnalytics, logEvent } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAc4QY6mKoZbYYmvtLc-IWuMxi-STretoY",
  authDomain: "ecosense-bangkit.firebaseapp.com",
  projectId: "ecosense-bangkit",
  storageBucket: "ecosense-bangkit.appspot.com",
  messagingSenderId: "700975405784",
  appId: "1:700975405784:web:ec7f991347396a758e55ad",
  measurementId: "G-FNMDYMVP14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
logEvent(analytics, 'login');
logEvent(analytics, 'search');
logEvent(analytics, 'select_content');
logEvent(analytics, 'share');
logEvent(analytics, 'sign_up');

// FOR LOG IN WITH GOOGLE
const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app);
googleProvider.setCustomParameters({ prompt: 'select_account'});

export const logInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
    return ({
      status: 200,
      user: user
    })
  }
  catch(error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    return ({
      status: errorCode, 
      message: errorMessage, 
      email,
      credential
    });
  }
}

export const emailLogIn = async (userEmail, userPassword) => {
  try {
    return await signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then(userCredential => {
        const user = userCredential.user;
        return ({
          status: 200,
          user: user
        });
      })
  }
  catch(error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return ({
      status: errorCode,
      message: errorMessage
    })
  }
}

export const emailSignUp = async ({ displayName: name, email: userEmail, password: userPassword}) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, userEmail, userPassword);
    const user = res.user;

    // Save user data in database
    const userData = {
      uid: user.uid,
      name,
      authProvider: "local",
      email: userEmail
    }
    // console.log(userData);
  } 
  catch (err) {
    // console.error(err);
    alert(err.message);
  }
}

export const logOutFirebase = async () => {
  try {
    return await auth.signOut()
      .then(() => {
        return ({
          status: 200,
          message: 'Signed Out!'
        })
      });
  }
  catch(error) {
    console.log(error);
    return ({
      status: error.code,
      message: error.message
    })
  };
}

export default app;