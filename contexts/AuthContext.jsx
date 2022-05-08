import { createContext, useContext, useState, useEffect } from "react";
import {
  addUser,
  auth,
  getUserByUid,
  updateUserField,
} from "../config/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  getAdditionalUserInfo,
  updateProfile,
} from "firebase/auth";
import Loading from "../components/Main/Loading";
import FullScreenPopup from "../components/Common/FullScreenPopup";
import WelcomePopup from "../components/Homepage/Auth/WelcomePopup";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [firstSignIn, setFirstSignIn] = useState(false);
  const [displayName, setDisplayName] = useState("");

  // listen for token changes
  // call setUser
  useEffect(() => {
    setLoadingUser(true);
    return auth.onIdTokenChanged(async (user) => {
      setUser(user);
      setDisplayName(user?.displayName);
      setLoadingUser(false);
    });
  }, []);

  // AUTHENTICATION FUNCTIONS
  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    setLoadingUser(true);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const docs = await getUserByUid(user.uid);

      // If the user did not exist, add it
      if (docs.length === 0) {
        console.log("Adding user", user);
        await addUser(user.uid, user.email, user.displayName, user?.photoURL);
      }

      const details = getAdditionalUserInfo(res);
      setFirstSignIn(details.isNewUser);
      setLoadingUser(false);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const logInWithEmailAndPassword = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      addUser(user.uid, user.email, name);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const logout = () => {
    setUser(null);
    signOut(auth);
  };

  const changeUsername = async (username) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: username,
      });

      await updateUserField(
        "username",
        auth.currentUser.uid,
        username.toLowerCase()
      );

      await updateUserField("name", auth.currentUser.uid, username);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const value = {
    user,
    displayName,
    registerWithEmailAndPassword,
    logInWithEmailAndPassword,
    signInWithGoogle,
    logout,
    changeUsername,
  };

  return (
    <AuthContext.Provider value={value}>
      {firstSignIn && (
        <FullScreenPopup>
          <WelcomePopup onFormSubmit={() => setFirstSignIn(false)} />
        </FullScreenPopup>
      )}
      {loadingUser ? <Loading /> : children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
