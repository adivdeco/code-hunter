import { Routes, Route, Navigate, useLocation } from "react-router";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { checkAuth } from "./authSlice"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AdminPanel from "./components/admin/Add_que";
import AdminDelete from "./components/admin/AdminDelete";
import ProblemUpdateComponent from './components/admin/ProblemUpdateComponent';
import ProblemPage from "./pages/ProblemPage"
import Admin from "./pages/Admin";
import Page1 from "./pages/page1";
import Mainpg from "./pages/Mainpg";
import ThreeRingLoader from "@/components/ThreeRingLoader";
import Pricing from "./pages/Pricing";
import UserManagement from "@/components/admin/UserManagment"
import ErrorBoundary from "./components/ErrorBoundary";
import ProblemList from "@/components/user_video";
// import AdminProblemManager from "@/components/admin/AdminVideoManager";
import AnalyticsDashboard from "@/components/admin/Platform_Analytics"
import DashboardPage from "./pages/DashboardPage";
import IssueReportingComponent from "./components/dashboard/IssueReportingComponent";
import FeedbackComponent from "./components/dashboard/FeedbackComponent"
import AllCode from "./components/dashboard/AllCode"
import ContestsPage from "@/components/layout/ContestsPage"
import LeaderboardPage from "@/components/layout/LeaderboardPage";
import ProfileSettingsPage from "@/components/layout/ProfileSettingsPage";
import ContributionPage from "@/pages/ContributionPage";
import GlobalChatPage from "@/pages/GlobalChatPage";
import CancellationPage from '@/pages/CancellationPage'
import TermsPage from '@/pages/TermsPage'
import ShippingPage from "@/pages/ShippingPage"
import PrivacyPage from "@/pages/PrivacyPage"
import UPIFormSection from "@/components/UPIFormSection"
import ShopPage from './pages/ShopPage';
import ManualPaymentPage from '@/pages/ManualPaymentPage';
import TawkManager from "@/components/TawkToWidget";
import AdminProblemManager from "@/components/admin/AdminProblemManager";

function App() {

  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);
  const [showSplash, setShowSplash] = useState(false);
  const [slideUp, setSlideUp] = useState(false);

  // Authentication check
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // WebGL error handling
  useEffect(() => {
    const handleError = (event) => {
      if (event.message.includes('WebGL')) {
        console.warn('WebGL error detected, attempting recovery...');
        window.location.reload();
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  // Splash screen logic
  useEffect(() => {
    const splashAlreadyShown = sessionStorage.getItem("splashShown");
    const skipSplashPaths = ["/signup", "/login"];
    const shouldSkipSplash = skipSplashPaths.includes(location.pathname);

    if (!splashAlreadyShown && !shouldSkipSplash) {
      setShowSplash(true);

      // Start slide up animation after 4 seconds (reduced from 6 for better UX)
      const slideTimer = setTimeout(() => {
        setSlideUp(true);
      }, 8000);

      return () => clearTimeout(slideTimer);
    }
  }, [location.pathname]);

  const handleSplashAnimationEnd = () => {
    if (slideUp) {
      setShowSplash(false);
      sessionStorage.setItem("splashShown", "true");
    }
  };

  if (loading) {
    return <ThreeRingLoader />;
  }

  // Render splash screen if needed
  if (showSplash) {
    return (
      <Page1
        slideUp={slideUp}
        onAnimationEnd={handleSplashAnimationEnd}
      />
    );
  }


  // console.log(`User Role: ${user?.role}, Is Authenticated: ${isAuthenticated}`);

  return (

    <>
      <TawkManager />
      <Routes>
        <Route path="/" element={<Mainpg />} />
        <Route path="/problems" element={isAuthenticated ? <Homepage></Homepage> : <Navigate to="/login" />}></Route>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashbord" /> : <Login />}></Route>
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashbord" /> : <Signup></Signup>}></Route>
        <Route path="/admin" element={isAuthenticated && user?.role === "admin" ? <Admin /> : <Navigate to="/" />}></Route>
        <Route path="/admin/create" element={isAuthenticated && user?.role === "admin" ? <AdminPanel /> : <Navigate to="/" />}></Route>
        <Route path="/admin/delete" element={isAuthenticated && user?.role === "admin" ? <AdminDelete /> : <Navigate to="/" />}></Route>
        <Route path="/admin/update/:id" element={isAuthenticated && user?.role === "admin" ? <ProblemUpdateComponent /> : <Navigate to={"/"} />} />
        <Route path="/admin/allusers" element={isAuthenticated && user?.role === "admin" ? <ErrorBoundary> <UserManagement /> </ErrorBoundary> : <Navigate to="/" />} />
        <Route path="/admin/video" element={isAuthenticated && user?.role === "admin" ? <AdminProblemManager /> : <Navigate to="/" />} />
        <Route path="/admin/analytics" element={isAuthenticated && user?.role === "admin" ? <AnalyticsDashboard /> : <Navigate to="/" />} />
        <Route path="/user/video" element={isAuthenticated ? <ProblemList /> : <Navigate to="/" />} />
        <Route path="/problem/:problemId" element={<ProblemPage />}></Route>
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/dashbord" element={isAuthenticated ? <DashboardPage /> : <Mainpg />} />
        <Route path="/report" element={isAuthenticated ? <IssueReportingComponent /> : <Mainpg />} />
        <Route path="/feedback" element={isAuthenticated ? <FeedbackComponent /> : <Mainpg />} />
        <Route path="/shots" element={isAuthenticated ? <AllCode /> : <Mainpg />} />
        <Route path="/contest" element={isAuthenticated ? <ContestsPage /> : <Mainpg />} />
        <Route path="/leaderbord" element={isAuthenticated ? <LeaderboardPage /> : <Mainpg />} />
        <Route path="/setting" element={isAuthenticated ? <ProfileSettingsPage /> : <Mainpg />} />
        <Route path="/contribution" element={isAuthenticated ? <ContributionPage /> : <Navigate to="/" />} />
        <Route path="/duscission" element={<GlobalChatPage />} />
        <Route path="/cancellation-and-refunds" element={<CancellationPage />} />
        <Route path="/terms-and-conditions" element={<TermsPage />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/upiform" element={<UPIFormSection />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/pay" element={<ManualPaymentPage />} />
      </Routes>
    </>
  )
}
export default App