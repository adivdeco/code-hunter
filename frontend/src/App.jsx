// import { Routes, Route, Navigate, useLocation } from "react-router";
// import Homepage from "./pages/Homepage";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import { checkAuth } from "./authSlice"
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import AdminPanel from "./components/admin/Add_que";
// import AdminDelete from "./components/admin/AdminDelete";
// import ProblemUpdateComponent from './components/admin/ProblemUpdateComponent';
// import ProblemPage from "./pages/ProblemPage"
// import Admin from "./pages/Admin";
// import Page1 from "./pages/page1";
// import Mainpg from "./pages/Mainpg";
// import ThreeRingLoader from "@/components/ThreeRingLoader";
// import Pricing from "./pages/Pricing";
// import UserManagement from "@/components/admin/UserManagment"
// import ErrorBoundary from "./components/ErrorBoundary";
// import ProblemList from "@/components/user_video";
// // import AdminProblemManager from "@/components/admin/AdminVideoManager";
// import AnalyticsDashboard from "@/components/admin/Platform_Analytics"
// import DashboardPage from "./pages/DashboardPage";
// import IssueReportingComponent from "./components/dashboard/IssueReportingComponent";
// import FeedbackComponent from "./components/dashboard/FeedbackComponent"
// import AllCode from "./components/dashboard/AllCode"
// import ContestsPage from "@/components/layout/ContestsPage"
// import LeaderboardPage from "@/components/layout/LeaderboardPage";
// import ProfileSettingsPage from "@/components/layout/ProfileSettingsPage";
// import ContributionPage from "@/pages/ContributionPage";
// import GlobalChatPage from "@/pages/GlobalChatPage";
// import CancellationPage from '@/pages/CancellationPage'
// import TermsPage from '@/pages/TermsPage'
// import ShippingPage from "@/pages/ShippingPage"
// import PrivacyPage from "@/pages/PrivacyPage"
// import UPIFormSection from "@/components/UPIFormSection"
// import ShopPage from './pages/ShopPage';
// import ManualPaymentPage from '@/pages/ManualPaymentPage';
// import TawkManager from "@/components/TawkToWidget";
// import AdminProblemManager from "@/components/admin/AdminProblemManager";

// function App() {

//   const dispatch = useDispatch();
//   const location = useLocation();
//   const { isAuthenticated, user, loading } = useSelector((state) => state.auth);
//   const [showSplash, setShowSplash] = useState(false);
//   const [slideUp, setSlideUp] = useState(false);

//   // Authentication check
//   useEffect(() => {
//     dispatch(checkAuth());
//   }, [dispatch]);

//   // WebGL error handling
//   useEffect(() => {
//     const handleError = (event) => {
//       if (event.message.includes('WebGL')) {
//         console.warn('WebGL error detected, attempting recovery...');
//         window.location.reload();
//       }
//     };

//     window.addEventListener('error', handleError);
//     return () => window.removeEventListener('error', handleError);
//   }, []);

//   // Splash screen logic
//   useEffect(() => {
//     const splashAlreadyShown = sessionStorage.getItem("splashShown");
//     const skipSplashPaths = ["/signup", "/login"];
//     const shouldSkipSplash = skipSplashPaths.includes(location.pathname);

//     if (!splashAlreadyShown && !shouldSkipSplash) {
//       setShowSplash(true);

//       // Start slide up animation after 4 seconds (reduced from 6 for better UX)
//       const slideTimer = setTimeout(() => {
//         setSlideUp(true);
//       }, 8000);

//       return () => clearTimeout(slideTimer);
//     }
//   }, [location.pathname]);

//   const handleSplashAnimationEnd = () => {
//     if (slideUp) {
//       setShowSplash(false);
//       sessionStorage.setItem("splashShown", "true");
//     }
//   };

//   if (loading) {
//     return <ThreeRingLoader />;
//   }

//   // Render splash screen if needed
//   if (showSplash) {
//     return (
//       <Page1
//         slideUp={slideUp}
//         onAnimationEnd={handleSplashAnimationEnd}
//       />
//     );
//   }


//   // console.log(`User Role: ${user?.role}, Is Authenticated: ${isAuthenticated}`);

//   return (

//     <>
//       <TawkManager />
//       <Routes>
//         <Route path="/" element={<Mainpg />} />
//         <Route path="/problems" element={isAuthenticated ? <Homepage></Homepage> : <Navigate to="/login" />}></Route>
//         <Route path="/login" element={isAuthenticated ? <Navigate to="/dashbord" /> : <Login />}></Route>
//         <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashbord" /> : <Signup></Signup>}></Route>
//         <Route path="/admin" element={isAuthenticated && user?.role === "admin" ? <Admin /> : <Navigate to="/" />}></Route>
//         <Route path="/admin/create" element={isAuthenticated && user?.role === "admin" ? <AdminPanel /> : <Navigate to="/" />}></Route>
//         <Route path="/admin/delete" element={isAuthenticated && user?.role === "admin" ? <AdminDelete /> : <Navigate to="/" />}></Route>
//         <Route path="/admin/update/:id" element={isAuthenticated && user?.role === "admin" ? <ProblemUpdateComponent /> : <Navigate to={"/"} />} />
//         <Route path="/admin/allusers" element={isAuthenticated && user?.role === "admin" ? <ErrorBoundary> <UserManagement /> </ErrorBoundary> : <Navigate to="/" />} />
//         <Route path="/admin/video" element={isAuthenticated && user?.role === "admin" ? <AdminProblemManager /> : <Navigate to="/" />} />
//         <Route path="/admin/analytics" element={isAuthenticated && user?.role === "admin" ? <AnalyticsDashboard /> : <Navigate to="/" />} />
//         <Route path="/user/video" element={isAuthenticated ? <ProblemList /> : <Navigate to="/" />} />
//         <Route path="/problem/:problemId" element={<ProblemPage />}></Route>
//         <Route path="/pricing" element={<Pricing />} />
//         <Route path="/dashbord" element={isAuthenticated ? <DashboardPage /> : <Mainpg />} />
//         <Route path="/report" element={isAuthenticated ? <IssueReportingComponent /> : <Mainpg />} />
//         <Route path="/feedback" element={isAuthenticated ? <FeedbackComponent /> : <Mainpg />} />
//         <Route path="/shots" element={isAuthenticated ? <AllCode /> : <Mainpg />} />
//         <Route path="/contest" element={isAuthenticated ? <ContestsPage /> : <Mainpg />} />
//         <Route path="/leaderbord" element={isAuthenticated ? <LeaderboardPage /> : <Mainpg />} />
//         <Route path="/setting" element={isAuthenticated ? <ProfileSettingsPage /> : <Mainpg />} />
//         <Route path="/contribution" element={isAuthenticated ? <ContributionPage /> : <Navigate to="/" />} />
//         <Route path="/duscission" element={<GlobalChatPage />} />
//         <Route path="/cancellation-and-refunds" element={<CancellationPage />} />
//         <Route path="/terms-and-conditions" element={<TermsPage />} />
//         <Route path="/shipping" element={<ShippingPage />} />
//         <Route path="/privacy" element={<PrivacyPage />} />
//         <Route path="/upiform" element={<UPIFormSection />} />
//         <Route path="/shop" element={<ShopPage />} />
//         <Route path="/pay" element={<ManualPaymentPage />} />
//       </Routes>
//     </>
//   )
// }
// export default App


import { Routes, Route, Navigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { checkAuth } from "./authSlice";
import ThreeRingLoader from "@/components/ThreeRingLoader";
import ErrorBoundary from "./components/ErrorBoundary";
import TawkManager from "@/components/TawkToWidget";

// Pages
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";
import Page1 from "./pages/page1";
import Mainpg from "./pages/Mainpg";
import Pricing from "./pages/Pricing";
import ProblemPage from "./pages/ProblemPage";
import DashboardPage from "./pages/DashboardPage";
import ContributionPage from "@/pages/ContributionPage";
import GlobalChatPage from "@/pages/GlobalChatPage";
import CancellationPage from '@/pages/CancellationPage';
import TermsPage from '@/pages/TermsPage';
import ShippingPage from "@/pages/ShippingPage";
import PrivacyPage from "@/pages/PrivacyPage";
import ShopPage from './pages/ShopPage';
import ManualPaymentPage from '@/pages/ManualPaymentPage';
import AuthSuccess from "./pages/AuthSuccess";

// Admin Components
import AdminPanel from "./components/admin/Add_que";
import AdminDelete from "./components/admin/AdminDelete";
import ProblemUpdateComponent from './components/admin/ProblemUpdateComponent';
import UserManagement from "@/components/admin/UserManagment";
import AdminProblemManager from "@/components/admin/AdminProblemManager";
import AnalyticsDashboard from "@/components/admin/Platform_Analytics";

// Dashboard Components
import IssueReportingComponent from "./components/dashboard/IssueReportingComponent";
import FeedbackComponent from "./components/dashboard/FeedbackComponent";
import AllCode from "./components/dashboard/AllCode";

// Layout Components
import ContestsPage from "@/components/layout/ContestsPage";
import LeaderboardPage from "@/components/layout/LeaderboardPage";
import ProfileSettingsPage from "@/components/layout/ProfileSettingsPage";
import UPIFormSection from "@/components/UPIFormSection";

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
      const slideTimer = setTimeout(() => setSlideUp(true), 8000);
      return () => clearTimeout(slideTimer);
    }
  }, [location.pathname]);

  const handleSplashAnimationEnd = () => {
    if (slideUp) {
      setShowSplash(false);
      sessionStorage.setItem("splashShown", "true");
    }
  };

  if (loading) return <ThreeRingLoader />;
  if (showSplash) return <Page1 slideUp={slideUp} onAnimationEnd={handleSplashAnimationEnd} />;

  // Route protection helpers
  const requireAuth = (element) => isAuthenticated ? element : <Navigate to="/" />;
  const requireAdmin = (element) => isAuthenticated && user?.role === "admin" ? element : <Navigate to="/" />;
  const redirectIfAuth = (element) => isAuthenticated ? <Navigate to="/dashboard" /> : element;

  return (
    <>
      <TawkManager />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Mainpg />} />
        <Route path="/login" element={redirectIfAuth(<Login />)} />
        <Route path="/signup" element={redirectIfAuth(<Signup />)} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/problem/:problemId" element={<ProblemPage />} />

        {/* Legal Pages */}
        <Route path="/cancellation-and-refunds" element={<CancellationPage />} />
        <Route path="/terms-and-conditions" element={<TermsPage />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />

        {/* Payment Routes */}
        <Route path="/upiform" element={<UPIFormSection />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/pay" element={<ManualPaymentPage />} />

        {/* Authenticated Routes */}
        <Route path="/problems" element={requireAuth(<Homepage />)} />
        <Route path="/dashbord" element={requireAuth(<DashboardPage />)} />
        <Route path="/report" element={requireAuth(<IssueReportingComponent />)} />
        <Route path="/feedback" element={requireAuth(<FeedbackComponent />)} />
        <Route path="/shots" element={requireAuth(<AllCode />)} />
        <Route path="/contest" element={requireAuth(<ContestsPage />)} />
        <Route path="/leaderbord" element={requireAuth(<LeaderboardPage />)} />
        <Route path="/setting" element={requireAuth(<ProfileSettingsPage />)} />
        <Route path="/contribution" element={requireAuth(<ContributionPage />)} />
        <Route path="/duscission" element={<GlobalChatPage />} />
        {/* <Route path="/user/video" element={requireAuth(<ProblemList />)} /> */}
        <Route path="/auth-success" element={<AuthSuccess />} />


        {/* Admin Routes */}
        <Route path="/admin" element={requireAdmin(<Admin />)} />
        <Route path="/admin/create" element={requireAdmin(<AdminPanel />)} />
        <Route path="/admin/delete" element={requireAdmin(<AdminDelete />)} />
        <Route path="/admin/update/:id" element={requireAdmin(<ProblemUpdateComponent />)} />
        <Route path="/admin/allusers" element={requireAdmin(<ErrorBoundary><UserManagement /></ErrorBoundary>)} />
        <Route path="/admin/video" element={requireAdmin(<AdminProblemManager />)} />
        <Route path="/admin/analytics" element={requireAdmin(<AnalyticsDashboard />)} />
      </Routes>
    </>
  );
}

export default App;