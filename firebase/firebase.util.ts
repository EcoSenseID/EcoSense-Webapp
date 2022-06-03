// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  getIdToken
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
const storage = getStorage();

// FOR LOG IN WITH GOOGLE
export const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app);
googleProvider.setCustomParameters({ prompt: 'select_account'});

export const logInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // const credential = GoogleAuthProvider.credentialFromResult(result);

    // The signed-in user info.
    const user = result.user;
    const idToken = await getIdToken(user, /* forceRefresh */ true);
    const apiResult = await fetch('https://ecosense-bangkit.uc.r.appspot.com/loginToWeb', {
    // const apiResult = await fetch('http://localhost:3001/loginToWeb', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + idToken
      },
    });
    const apiResultData = await apiResult.json();
    if (apiResultData.error) {
      return ({
        error: true,
        errorDetail: { name: 'API Error', message: apiResultData.message },
        user: {...user,  authProvider: 'google'}
      });
    } else {
      return ({
        error: false,
        message: apiResultData.message,
        user: {...user,  authProvider: 'google'}
      })
    }
    
  }
  catch(error: any) {
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

export const emailLogIn = async (userEmail: string, userPassword: string) => {
  try {
    const result =  await signInWithEmailAndPassword(auth, userEmail, userPassword);
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;
    return { error: false,  user: {...user, authProvider: 'local',} };
  }
  catch(err: any) {
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

type EmailSignUpProps = {
  displayName: string,
  email: string, 
  password: string
}

export const emailSignUp = async ({ displayName: name, email: userEmail, password: userPassword}: EmailSignUpProps) => {
  try {
    passwordStrengthChecker(userPassword);
    await createUserWithEmailAndPassword(auth, userEmail, userPassword);
    await updateProfile(auth.currentUser!, { displayName: name })
    const updatedUser = auth.currentUser;
    const idToken = await getIdToken(updatedUser!, /* forceRefresh */ true);
    const apiResult = await fetch('https://ecosense-bangkit.uc.r.appspot.com/loginToWeb', {
    // const apiResult = await fetch('http://localhost:3001/loginToWeb', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + idToken
      },
    });
    const apiResultData = await apiResult.json();
    if (apiResultData.error) {
      return ({
        error: true,
        errorDetail: { name: 'API Error', message: apiResultData.message },
        user: {...updatedUser,  authProvider: 'local'}
      });
    } else {
      return ({
        error: false,
        message: apiResultData.message,
        user: {...updatedUser,  authProvider: 'local'}
      })
    }
  } 
  catch (err: any) {
    return {
      error: true,
      errorDetail: err
    }
  }
}

export const forgotPassword = async (userEmail: string) => {
  try {
    await sendPasswordResetEmail(auth, userEmail);
    return {
      error: false, 
      message: 'Please check your email' 
    }
  }
  catch (err: any) {
    return { error: true, errorDetail: err }
  }
}

export const logOutFirebase = async (): Promise<{ error: boolean, message?: string, errorDetail?: any }> => {
  try {
    return await auth.signOut()
      .then(() => {
        return {
          error: false, 
          message: 'You have signed out successfully!' 
        }
      });
  }
  catch(error: any) {
    return { error: true, errorDetail: error }
  };
}

export const updateUserProfile = async (displayName: string) => {
  try {
    await updateProfile(auth.currentUser!, { displayName });
    return {
      error: false, 
      message: 'Profile updated successfully!',
      user: auth.currentUser
    }
  }
  catch (error) {
    return { error: true, errorDetail: error }
  }
}

export const updateUserProfilePicture = async (file: File) => {
  try {
    const profileRef = ref(storage, 'users/' + auth.currentUser!.uid + '/profile.jpg'); // make reference in firebase storage
    const snapshot = await uploadBytes(profileRef, file); // upload file to firebase storage
    const imgURL = await getDownloadURL(profileRef); // get download URL from uploaded file
    await updateProfile(auth.currentUser!, { photoURL: imgURL }); // update user profile using firebase/auth
    return {
      error: false, 
      message: 'Profile picture uploaded successfully!',
      snapshot: snapshot,
      user: auth.currentUser
    }
  }
  catch(err) {
    return { error: true, errorDetail: err }
  }
}

export const sendVerifyEmail = async () => {
  try {
    await sendEmailVerification(auth.currentUser!);
    return {
      error: false, 
      message: 'Verification link sent to your email. Kindly check to verify your account!'
    }
  }
  catch (err) {
    return { error: true, errorDetail: err }
  }
}

export const changePassword = async (oldPassword: string, newPassword: string) => {
  try {
    passwordStrengthChecker(newPassword);
    const user = auth.currentUser;
    if (user!.providerData[0].providerId === 'password'){
      const credential = EmailAuthProvider.credential(auth.currentUser!.email!, oldPassword);
      await reauthenticateWithCredential(auth.currentUser!, credential);
    } else {
      throw {
        code: 'auth/not-for-google-account',
        name: 'Not permitted',
        message: 'Change password only permitted for email and password login.',
        stack: `Not permitted: Change password only permitted for email and password login.`
      };
    }
    await updatePassword(auth.currentUser!, newPassword);
    return {
      error: false, 
      message: 'Password changed!'
    }
  }
  catch (err: any) {
    return { error: true, errorDetail: err }
  }
}

export default app;