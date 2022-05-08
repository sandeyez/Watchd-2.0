import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDxFkuhHoD2dgAdXB4wAHof4LjAuoP764A",
  authDomain: "watchd-3f02c.firebaseapp.com",
  projectId: "watchd-3f02c",
  storageBucket: "watchd-3f02c.appspot.com",
  messagingSenderId: "1016320188587",
  appId: "1:1016320188587:web:90e93b9d72a7790c0e17ee",
  measurementId: "G-5533CTS56V",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);

// USER FUNCTIONS

// Add a new user to the database
export async function addUser(
  uid,
  email,
  username,
  picture = "https://picsum.photos/200/200"
) {
  const dbUser = {
    createdAt: serverTimestamp(),
    email,
    followers: [],
    following: [],
    movies: [],
    name: username,
    picture,
    uid,
    username: username.toLowerCase(),
    watchlist: [],
  };

  await setDoc(doc(db, "Users", uid), dbUser);
}

// Add a value to an array field in the Users collection
export async function addValueToUserArray(key, uid, value) {
  const ref = doc(db, "Users", uid);
  const obj = {};
  obj[key] = arrayUnion(value);
  await updateDoc(ref, obj);
}

// Remove a value from an array field in the Users collection
export async function deleteValueFromUserArray(key, uid, value) {
  const ref = doc(db, "Users", uid);
  const obj = {};
  obj[key] = arrayRemove(value);

  await updateDoc(ref, obj);
}

// Get the field with key 'key' from the User with uid 'uid'
export async function getUserField(key, uid) {
  const ref = doc(db, "Users", uid);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    return snap.data()[key];
  } else return null;
}

// Add a review for the current user to the database
export async function addReview(uid, description, movieId, rating) {
  const obj = {
    createdAt: serverTimestamp(),
    description,
    likes: [],
    movieId,
    rating,
    uid,
  };

  await addDoc(collection(db, "Reviews"), obj);

  return obj;
}

// DATABASE FUNCTIONS
export async function getReviewedMovies(uid) {
  // Grab all user's reviews
  let reviews = await queryDatabase("Reviews", "uid", "==", uid);

  // Convert the Timestamp objects to JSON again
  reviews.forEach(async (result) => {
    result.createdAt = result.createdAt.toDate().toJSON();
  });

  // Sort reviews by rating
  reviews.sort((a, b) => (a.rating > b.rating ? -1 : 1));

  // Find all reviewed movies
  reviews = await Promise.all(
    reviews.map(async (review) => {
      const movieResponse = await getMovie(review.movieId);
      return { ...review, movie: movieResponse.data };
    })
  );

  return reviews;
}

export async function getUserByUsername(username) {
  // Find users with username
  let results = await queryDatabase(
    "Users",
    "username",
    "==",
    username.toLowerCase()
  );

  let user;

  if (results.length > 0) {
    user = results[0];
    // Convert Timestamp object to JSON
    user.createdAt = user.createdAt.toDate().toJSON();
  }
  return user;
}

export async function getUserByUid(uid) {
  // Find users with username
  let results = await queryDatabase("Users", "uid", "==", uid);

  return results;
}

// Query a collection for a field that matched value with operator
export async function queryDatabase(collectionName, field, operator, value) {
  const ref = collection(db, collectionName);
  const q = query(ref, where(field, operator, value));
  const snapshot = await getDocs(q);

  let results = [];

  snapshot.forEach((doc) => results.push(doc.data()));
  return results;
}

// Update the value of one of the user fields
export async function updateUserField(key, uid, value) {
  const ref = doc(db, "Users", uid);
  const obj = {};
  obj[key] = value;
  await updateDoc(ref, obj);
}
