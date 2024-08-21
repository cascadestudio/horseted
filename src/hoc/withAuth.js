import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import Spinner from "@/components/Spinner";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { user, loading } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.replace("/");
      }
    }, [user, loading, router]);

    if (loading)
      return (
        <div className="h-[calc(100vh_-_var(--header-height)-120px)]">
          <Spinner />;
        </div>
      );

    if (!user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
