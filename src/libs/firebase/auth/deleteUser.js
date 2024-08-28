import { getAuth } from "firebase/auth";

export const deleteFirebaseUser = async () => {
  const auth = getAuth();

  auth.currentUser
    .delete()
    .then(() => {
      console.log("User account deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
    });
};
