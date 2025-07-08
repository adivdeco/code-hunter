import { Routes, Route, Navigate, useLocation } from "react-router";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { checkAuth } from "./authSlice"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AdminPanel from "./components/AdminPanel";
import AdminDelete from "./components/AdminDelete";
import ProblemPage from "./pages/ProblemPage"
import Admin from "./pages/Admin";
import Page1 from "./pages/page1";
import Mainpg from "./pages/Mainpg";
import ThreeRingLoader from "@/components/ThreeRingLoader";


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
        <Route path="/problem/:problemId" element={<ProblemPage />}></Route>

      </Routes>
    </>
  )
}
export default App