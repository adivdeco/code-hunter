// import { useEffect } from 'react';

// export default function useTawkTo() {
//     useEffect(() => {
//         if (!window.Tawk_API) {
//             const script = document.createElement('script');
//             script.async = true;
//             script.src = 'https://embed.tawk.to/687f799ab325321919f6ef1e/1j0ov61p8';
//             script.charset = 'UTF-8';
//             script.setAttribute('crossorigin', '*');
//             document.body.appendChild(script);

//             return () => {
//                 // Cleanup if needed
//                 document.body.removeChild(script);
//             };
//         }
//     }, []);
// }
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function useTawkTo() {
    const location = useLocation();

    useEffect(() => {
        let script = null;
        let timeoutId = null;

        if (location.pathname === '/') {
            timeoutId = setTimeout(() => {
                script = document.createElement('script');
                script.async = true;
                script.src = 'https://embed.tawk.to/687f799ab325321919f6ef1e/1j0ov61p8';
                script.charset = 'UTF-8';
                script.setAttribute('crossorigin', '*');
                document.body.appendChild(script);
            }, 6000); // delay by 6 seconds
        }

        return () => {
            clearTimeout(timeoutId);

            const tawkFrame = document.querySelector("iframe[src*='tawk.to']");
            if (tawkFrame) tawkFrame.remove();

            if (script) {
                document.body.removeChild(script);
            }

            if (window.Tawk_API) {
                delete window.Tawk_API;
            }
        };
    }, [location.pathname]);
}
