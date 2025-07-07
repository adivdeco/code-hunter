import { useEffect, useRef, useState } from 'react';
// import { getCompanyBadgeColor } from '@/utils/getCompanyBadgeColor';

const CompanyBadgeCell = ({ companies = [] }) => {
    const [showAll, setShowAll] = useState(false);
    const dropdownRef = useRef(null);

    const visibleCompanies = companies.slice(0, 3);
    const hiddenCompanies = companies.slice(3);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowAll(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="relative flex flex-wrap gap-1 justify-center">
            {/* Visible Companies */}
            {visibleCompanies.map((company, index) =>
                company === 'Google' ? (
                    <span key={index} className="badge">
                        <span className="text-blue-600">G</span>
                        <span className="text-red-500">o</span>
                        <span className="text-yellow-500">o</span>
                        <span className="text-blue-600">g</span>
                        <span className="text-green-600">l</span>
                        <span className="text-red-500">e</span>
                    </span>
                ) : (
                    <span key={index} className={`badge ${getCompanyBadgeColor(company)}`}>
                        {company}
                    </span>
                )
            )}

            {/* +N Toggle Badge */}
            {hiddenCompanies.length > 0 && (
                <span
                    className="badge bg-gray-400 text-white cursor-pointer hover:bg-gray-600"
                    onClick={() => setShowAll(!showAll)}
                >
                    +{hiddenCompanies.length}
                </span>
            )}

            {/* Dropdown with animation */}
            {showAll && (
                <div
                    className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 bg-gray-800  rounded-md  shadow-lg p-2 w-36
          transition-all duration-200 transform origin-top scale-95 opacity-0 animate-fade_in"
                >
                    {hiddenCompanies.map((company, index) =>
                        company === 'Google' ? (
                            <div key={index} className="flex gap-0.5">
                                <span className="text-blue-600">G</span>
                                <span className="text-red-500">o</span>
                                <span className="text-yellow-500">o</span>
                                <span className="text-blue-600">g</span>
                                <span className="text-green-600">l</span>
                                <span className="text-red-500">e</span>
                            </div>
                        ) : (
                            <div key={index} className={` mb-2 badge ${getCompanyBadgeColor(company)}`}>
                                {company}
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default CompanyBadgeCell;




const getCompanyBadgeColor = (company) => {
    if (!company) return 'px-3 py-1 text-sm rounded-full bg-gray-500/10 text-gray-300 border border-gray-500 shadow-sm';

    switch (company.trim().toLowerCase()) {


        case 'amazon':
            return 'px-3 py-1 text-sm rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-400 shadow-md backdrop-blur-sm';

        case 'microsoft':
            return 'px-3 py-1 text-sm rounded-full bg-indigo-700/10 text-indigo-300 border border-indigo-500 shadow-md backdrop-blur-sm';

        case 'facebook':
            return 'px-3 py-1 text-sm rounded-full bg-blue-600/30 text-blue-300 border border-blue-400 shadow-md backdrop-blur-sm';

        case 'apple':
            return 'px-3 py-1 text-sm rounded-full bg-gray-800/10 text-gray-200 border border-gray-400 shadow-md backdrop-blur-sm';

        case 'goldman sachs':
            return 'px-3 py-1 text-sm rounded-full bg-yellow-300/10 text-yellow-300 border border-yellow-300 shadow-md backdrop-blur-sm';

        case 'flipkart':
            return 'px-3 py-1 text-sm rounded-full bg-blue-500/10 text-blue-300 border border-blue-300 shadow-md backdrop-blur-sm';

        case 'netflix':
            return 'px-3 py-1 text-sm rounded-full bg-red-600/10 text-red-500 border border-red-500 shadow-md backdrop-blur-sm font-semibold';

        case 'tcs':
            return 'px-3 py-1 text-sm rounded-full bg-orange-400/10 text-orange-300 border border-orange-300 shadow-md backdrop-blur-sm';

        default:
            return 'px-3 py-1 text-sm rounded-full bg-gray-600/10 text-gray-300 border border-gray-500 shadow-sm';
    }
};

