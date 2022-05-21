// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import passwordStrengthChecker from './passwordStrengthChecker';

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
      error: false,
      user: {...user, authProvider: 'google'}
    })
  }
  catch(error) {
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);

    if (error.code == 'auth/popup-closed-by-user') return { 
      error: true, 
      errorDetail: {...error, name: 'Popup Closed by User', message: 'You closed the Google Account login popup unexpectedly.'} 
    }
    return ({
      error: true, 
      errorDetail: error, 
      email,
      credential
    });
  }
}

export const emailLogIn = async (userEmail, userPassword) => {
  try {
    const res =  await signInWithEmailAndPassword(auth, userEmail, userPassword);
    const user = res.user;
    return { error: false,  user: {...user, authProvider: 'local',} };
  }
  catch(err) {
    if (err.code == 'auth/user-not-found') {
      return { error: true, errorDetail: {...err, name: 'Email not Found', message: 'Make sure you enter the correct email.'} }
    } else if (err.code == 'auth/wrong-password') {
      return { error: true, errorDetail: {...err, name: 'Wrong Password', message: 'Make sure you enter the correct password.'} }
    }
    return {
      error: true,
      errorDetail: err
    }
  }
}

export const emailSignUp = async ({ displayName: name, email: userEmail, password: userPassword}) => {
  try {
    passwordStrengthChecker(userPassword);
    await createUserWithEmailAndPassword(auth, userEmail, userPassword);
    await updateProfile(auth.currentUser, { displayName: name })
    const updatedUser = auth.currentUser;
    return { error: false, user: { ...updatedUser, authProvider: "local" } }
  } 
  catch (err) {
    return {
      error: true,
      errorDetail: err
    }
  }
}

export const forgotPassword = (userEmail) => {
  firebase.auth().sendPasswordResetEmail(userEmail)
      .then(() => {
          alert('Please check your email...');
      }).catch((e) => {
          console.log(e);
      }) 
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