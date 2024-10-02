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

    if (isLoading || !user) return <Spinner isFullScreen />;

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
