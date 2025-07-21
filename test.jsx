// function App() {

//     // code likhna isAuthentciated
//     const dispatch = useDispatch();
//     const location = useLocation();
//     const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

//     const [showSplash, setShowSplash] = useState(false); // for first-time loader
//     const [slideUp, setSlideUp] = useState(false);


//     useEffect(() => {
//         dispatch(checkAuth());
//     }, [dispatch]);

//     useEffect(() => {
//         const handleError = (event) => {
//             if (event.message.includes('WebGL')) {
//                 console.warn('WebGL error detected, attempting recovery...');
//                 window.location.reload();
//             }
//         };
//         window.addEventListener('error', handleError);
//         return () => window.removeEventListener('error', handleError);
//     }, []);
//     // splash screen
//     useEffect(() => {
//         const splashAlreadyShown = sessionStorage.getItem("splashShown");
//         const skipSplash = location.pathname === "/signup" || location.pathname === "/login";

//         if (!splashAlreadyShown && !skipSplash) {
//             setShowSplash(true);

//             const slideTimer = setTimeout(() => {
//                 setSlideUp(true); // Start fading
//             }, 6000);

//             // const hideTimer = setTimeout(() => {
//             //   setShowSplash(false);
//             //   sessionStorage.setItem("splashShown", "true"); // set flag
//             // }, 10000);
//             return () => {
//                 clearTimeout(slideTimer);
//                 // clearTimeout(hideTimer);
//             }
//         };
//     }, [location.pathname]);

//     console.log(isAuthenticated);


//     if (loading) {
//         return <ThreeRingLoader />;
//     }



//     const handleSplashAnimationEnd = () => {
//         if (slideUp) {
//             setShowSplash(false);
//             sessionStorage.setItem("splashShown", "true");
//         }
//     };


//     if (showSplash) {
//         return <Page1 slideUp={slideUp} onAnimationEnd={handleSplashAnimationEnd} />;
//     }
// }