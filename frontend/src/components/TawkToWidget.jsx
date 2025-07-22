// import { useEffect } from 'react';

// export default function TawkToWidget() {
//     useEffect(() => {
//         // Only add the script if we're on the homepage
//         if (window.location.pathname === '/') {
//             const script = document.createElement('script');
//             script.async = true;
//             script.src = 'https://embed.tawk.to/687f799ab325321919f6ef1e/1j0ov61p8';
//             script.charset = 'UTF-8';
//             script.setAttribute('crossorigin', '*');
//             document.body.appendChild(script);

//             return () => {
//                 // Cleanup on unmount
//                 document.body.removeChild(script);
//                 if (window.Tawk_API) {
//                     window.Tawk_API = undefined;
//                 }
//             };
//         }
//     }, []);

//     return null;
// }

// 2.

// "use client";
// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

// export default function TawkToWidget() {
//     const location = useLocation();

//     useEffect(() => {
//         // Only run on homepage
//         if (location.pathname === "/") {
//             const script = document.createElement("script");
//             script.src = "https://embed.tawk.to/687f799ab325321919f6ef1e/1j0ov61p8";
//             script.async = true;
//             script.charset = "UTF-8";
//             script.setAttribute("crossorigin", "*");
//             document.body.appendChild(script);

//             return () => {
//                 // Cleanup Tawk script
//                 const tawkFrame = document.querySelector("iframe[src*='tawk.to']");
//                 if (tawkFrame) {
//                     tawkFrame.remove();
//                 }
//                 script.remove();
//                 if (window.Tawk_API) {
//                     delete window.Tawk_API;
//                 }
//             };
//         }
//     }, [location.pathname]); // Reacts to route changes

//     return null;
// }

// 3.

// src/components/TawkManager.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function TawkManager() {
    const location = useLocation();

    useEffect(() => {
        const isHomePage = location.pathname === "/";

        if (isHomePage) {
            // Inject Tawk.to script
            if (!document.querySelector("script[src*='tawk.to']")) {
                const script = document.createElement("script");
                script.src = "https://embed.tawk.to/687f799ab325321919f6ef1e/1j0ov61p8";
                script.async = true;
                script.charset = "UTF-8";
                script.setAttribute("crossorigin", "*");
                script.id = "tawk-script";
                document.body.appendChild(script);
            }
        } else {
            // Remove widget + script on non-home routes
            const iframe = document.querySelector("iframe[src*='tawk.to']");
            if (iframe) iframe.remove();

            const script = document.getElementById("tawk-script");
            if (script) script.remove();

            if (window.Tawk_API) {
                delete window.Tawk_API;
            }
        }
    }, [location.pathname]);

    return null;
}
