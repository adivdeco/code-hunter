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
// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

// export default function TawkManager() {
//     const location = useLocation();

//     useEffect(() => {
//         const isHomePage = location.pathname === "/";

//         if (isHomePage) {
//             // Inject Tawk.to script
//             if (!document.querySelector("script[src*='tawk.to']")) {
//                 const script = document.createElement("script");
//                 script.src = "https://embed.tawk.to/687f799ab325321919f6ef1e/1j0ov61p8";
//                 script.async = true;
//                 script.charset = "UTF-8";
//                 script.setAttribute("crossorigin", "*");
//                 script.id = "tawk-script";
//                 document.body.appendChild(script);
//             }
//         } else {
//             // Remove widget + script on non-home routes
//             const iframe = document.querySelector("iframe[src*='tawk.to']");
//             if (iframe) iframe.remove();

//             const script = document.getElementById("tawk-script");
//             if (script) script.remove();

//             if (window.Tawk_API) {
//                 delete window.Tawk_API;
//             }
//         }
//     }, [location.pathname]);

//     return null;
// }

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function TawkManager() {
    const location = useLocation();

    useEffect(() => {
        let tawkScript;
        let timeoutId;

        // --- Cleanup function ---
        // This is the most important part. It runs *every time* you navigate to a new page.
        const cleanup = () => {
            // 1. Clear any pending timer to prevent the widget from loading after you've navigated away.
            clearTimeout(timeoutId);

            // 2. Remove the Tawk.to script from the DOM.
            const scriptElement = document.getElementById('tawk-to-script');
            if (scriptElement) {
                scriptElement.remove();
            }

            // 3. Forcefully remove any Tawk.to widget elements (like the iframe).
            // This is a robust way to find the widget container.
            const widget = document.querySelector('div[data-tawk-id]');
            if (widget) {
                widget.remove();
            }

            // 4. Clean up global variables that Tawk.to creates.
            if (window.Tawk_API) {
                delete window.Tawk_API;
            }
            if (window.Tawk_LoadStart) {
                delete window.Tawk_LoadStart;
            }
        };

        // --- Main Logic ---
        if (location.pathname === '/') {
            // If we are on the homepage, start a timer to load the script.
            // This gives your page animations (like the splash screen) time to finish.
            timeoutId = setTimeout(() => {
                // Prevent adding the script if it somehow already exists.
                if (document.getElementById('tawk-to-script')) {
                    return;
                }

                // Create and inject the Tawk.to script.
                tawkScript = document.createElement('script');
                tawkScript.id = 'tawk-to-script'; // Give it an ID for easy removal.
                tawkScript.async = true;
                tawkScript.src = 'https://embed.tawk.to/687f799ab325321919f6ef1e/1j0ov61p8'; // Your Script URL
                tawkScript.charset = 'UTF-8';
                tawkScript.setAttribute('crossorigin', '*');
                document.body.appendChild(tawkScript);
            }, 6000); // 6-second delay as you had before.
        }

        // This tells React to run the cleanup function when the component is unmounted
        // OR when the `location.pathname` changes before the effect runs again.
        // This is the magic that solves the "refresh" issue.
        return cleanup;

    }, [location.pathname]); // This dependency array ensures the effect re-runs on every route change.

    // This component does not render any visible HTML.
    return null;
}

export default TawkManager;