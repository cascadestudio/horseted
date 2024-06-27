import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../context/AuthContext";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { user, loading } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.replace("/");
      }
    }, [user, loading, router]);

    if (loading) {
      return <p>Loading...</p>;
    }

    if (!user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
