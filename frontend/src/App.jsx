import { Routes, Route, Navigate, useLocation } from "react-router";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { checkAuth } from "./authSlice"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AdminPanel from "./components/admin/Add_que";
import AdminDelete from "./components/admin/AdminDelete";
// import AdminUpdate from "./components/ProblemUpdateComponent";
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
import AdminProblemManager from "@/components/admin/AdminVideoManager";
import AnalyticsDashboard from "@/components/admin/Platform_Analytics"
import DashboardPage from "./pages/DashboardPage";
import IssueReportingComponent from "./components/dashboard/IssueReportingComponent";
import FeedbackComponent from "./components/dashboard/FeedbackComponent"
import AllCode from "./components/dashboard/AllCode"


function App() {

  // code likhna isAuthentciated
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  const [showSplash, setShowSplash] = useState(false); // for first-time loader
  const [slideUp, setSlideUp] = useState(false);


  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

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
  // splash screen
  useEffect(() => {
    const splashAlreadyShown = sessionStorage.getItem("splashShown");
    const skipSplash = location.pathname === "/signup" || location.pathname === "/login";

    if (!splashAlreadyShown && !skipSplash) {
      setShowSplash(true);

      const slideTimer = setTimeout(() => {
        setSlideUp(true); // Start fading
      }, 6000);

      // const hideTimer = setTimeout(() => {
      //   setShowSplash(false);
      //   sessionStorage.setItem("splashShown", "true"); // set flag
      // }, 10000);
      return () => {
        clearTimeout(slideTimer);
        // clearTimeout(hideTimer);
      }
    };
  }, [location.pathname]);

  console.log(isAuthenticated);


  if (loading) {
    return <ThreeRingLoader />;
  }



  const handleSplashAnimationEnd = () => {
    if (slideUp) {
      setShowSplash(false);
      sessionStorage.setItem("splashShown", "true");
    }
  };


  if (showSplash) {
    return <Page1 slideUp={slideUp} onAnimationEnd={handleSplashAnimationEnd} />;
  }





  return (
    <>
      <Routes>
        <Route path="/" element={<Mainpg />} />
        <Route path="/problems" element={isAuthenticated ? <Homepage></Homepage> : <Navigate to="/login" />}></Route>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/problems" /> : <Login />}></Route>
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/problems" /> : <Signup></Signup>}></Route>
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
        <Route path="/dashbord" element={isAuthenticated ? <DashboardPage /> : <Homepage />} />
        <Route path="/report" element={isAuthenticated ? <IssueReportingComponent /> : <Homepage />} />
        <Route path="/feedback" element={isAuthenticated ? <FeedbackComponent /> : <Homepage />} />
        <Route path="/feedback" element={isAuthenticated ? <AllCode /> : <Homepage />} />


      </Routes>
    </>
  )
}
export default App