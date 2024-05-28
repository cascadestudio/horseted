import firebase_app from "../config";
import {
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  getAuth,
} from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function sendPasswordResetEmail(email) {
  let result = null,
    error = null;
  try {
    result = await firebaseSendPasswordResetEmail(auth, email);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
