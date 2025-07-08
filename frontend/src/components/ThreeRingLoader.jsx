// components/ThreeRingLoader.jsx
import "../page1.css";

const ThreeRingLoader = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black space-y-6">
            {/* Loader Animation */}
            <div className="loader">
                <div className="inner one"></div>
                <div className="inner two"></div>
                <div className="inner three"></div>
            </div>

            {/* Glowing Gradient Heading */}
            <h2 className="text-2xl font-bold font-chango bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-pulse tracking-wide">
                Hunting...
            </h2>

            {/* Subtext */}
            <p className="text-sm text-gray-400 italic">
                Fetching data, please wait...
            </p>
        </div>

    );
};

export default ThreeRingLoader;
