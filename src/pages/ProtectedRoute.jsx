import { useEffect } from "react";
import { useUserStore } from "../store/userStore";
import api from "../utils/apiClient";
import { useNavigate } from "react-router-dom";
import PageLoader from "../components/shared/PageLoader";

const ProtectedRoute = ({ children }) => {
  const { user, setUser, clearUser } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    const initialize = async () => {
      try {
        const response = await api.get("/auth/me");
        setUser(response.data?.user);
      } catch {
        clearUser();
        navigate("/login");
      }
    };

    if (!user) {
      initialize();
    }
  }, [user, setUser, clearUser, navigate]);

  if (user) {
    return children;
  } else {
    return <PageLoader />;
  }
};

export default ProtectedRoute;
