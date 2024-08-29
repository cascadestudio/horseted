import { getAuth } from "firebase/auth";

export const deleteFirebaseUser = async () => {
  const auth = getAuth();

  auth.currentUser
    .delete()
    .then(() => {
      console.log("Firebase user account deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting Firebase user:", error);
    });
};
