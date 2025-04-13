import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    signInWithPopup,
    onAuthStateChanged,
    updateProfile 
  } from "firebase/auth";
  import { auth, googleProvider } from "../config/FirebaseConfig";
  
  // Register with email/password
  export const registerWithEmail = async (email, password, fullName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update profile with the user's name
      await updateProfile(userCredential.user, {
        displayName: fullName
      });                                      //later use for user dashboard
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };
  
  // Login with email/password
  export const loginWithEmail = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };
  
  // Login with Google
  export const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('result received afterm google', result.user);
      return result.user;
    } catch (error) {
      throw error;
    }
  };
  
  // Logout
  export const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  };
  
  // Auth state observer
  export const observeAuthState = (callback) => {
    return onAuthStateChanged(auth, callback);
  };