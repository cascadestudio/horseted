import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import Spinner from "@/components/Spinner";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { user, isLoading } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !user) {
        router.replace("/");
      }
    }, [user, isLoading, router]);

    if (isLoading) return <Spinner isFullScreen />;

    if (!user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
