import { useEffect, useState } from "react";
import { useUserStore } from "../store/userStore";
import api from "../utils/apiClient";
import { useNavigate, useLocation } from "react-router-dom";
import PageLoader from "../components/shared/PageLoader";

const ProtectedRoute = ({ children }) => {
  const { user, setUser, clearUser } = useUserStore();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initialize = async () => {
      try {
        const response = await api.get("/auth/me");
        setUser(response.data?.user);
      } catch {
        clearUser();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    if (!user) {
      initialize();
    } else {
      setLoading(false);
    }
  }, [user, setUser, clearUser, navigate]);

  useEffect(() => {
    if (user) {
      const onboardingCompleted = user.is_onboarding_completed;
      const currentPath = location.pathname;
      if (onboardingCompleted && currentPath.startsWith("/onboarding")) {
        navigate("/");
      } else if (!onboardingCompleted && !currentPath.startsWith("/onboarding")) {
        navigate("/onboarding");
      }
    }
  }, [user, location, navigate]);

  if (loading) {
    return <PageLoader />;
  }
  const onboardingCompleted = user?.is_onboarding_completed;
  const currentPath = location.pathname;
  if ((onboardingCompleted && currentPath === "/onboarding") || (!onboardingCompleted && currentPath !== "/onboarding")) {
    return <PageLoader />;
  }

  return children;
};

export default ProtectedRoute;
