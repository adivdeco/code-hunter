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
                    className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 bg-gray-800  rounded-md  shadow-lg p-2 w-32
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




const getCompanyBadgeColor = (companies) => {
    if (!companies) return null;


    switch (companies) {
        // case 'Google':
        //   return 'badge-rainbow'; // custom class
        case 'Amazon':
            return 'badge-warning';
        case 'Microsoft':
            return 'bg-indigo-800';
        case 'Facebook':
            return 'badge-info';
        case 'Apple':
            return 'bg-gray-700';
        case 'Goldman sachs':
            return 'bg-yellow-500';
        case 'Flipkart':
            return 'badge-warning';
        default:
            return 'badge-ghost';
    }
};