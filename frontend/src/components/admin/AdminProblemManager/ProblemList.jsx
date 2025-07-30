// import React from 'react';
// import { FiPlay, FiPlus, FiTrash2, FiEdit, FiChevronUp, FiChevronDown } from 'react-icons/fi';

// const getDifficultyBadgeColor = (difficulty) => {
//     switch ((difficulty || '').toLowerCase()) {
//         case 'easy': return 'border-green-400 bg-green-500/10 text-green-300';
//         case 'medium': return 'border-yellow-400 bg-yellow-400/10 text-yellow-300';
//         case 'hard': return 'border-red-500 bg-red-500/10 text-red-400';
//         default: return 'border-gray-500 bg-gray-600/10 text-gray-300';
//     }
// };

// const SortableHeader = ({ label, sortKey, sortConfig, requestSort }) => {
//     const isSorted = sortConfig.key === sortKey;
//     const Icon = sortConfig.direction === 'asc' ? FiChevronUp : FiChevronDown;
//     return (
//         <div
//             className="flex cursor-pointer items-center gap-2 transition-colors hover:text-white"
//             onClick={() => requestSort(sortKey)}
//         >
//             <span>{label}</span>
//             {isSorted && <Icon className="h-4 w-4" />}
//         </div>
//     );
// };


// export const ProblemList = ({ problems, sortConfig, requestSort, onDelete, onUploadClick }) => {
//     return (
//         <div className="overflow-hidden rounded-lg border border-gray-700 bg-gray-800 shadow-xl">
//             {/* Header */}
//             <div className="grid grid-cols-12 items-center bg-gray-700/50 p-4 font-semibold text-gray-400">
//                 <div className="col-span-12 md:col-span-5">
//                     <SortableHeader label="Problem Title" sortKey="title" sortConfig={sortConfig} requestSort={requestSort} />
//                 </div>
//                 <div className="hidden text-center md:col-span-2 md:block">
//                     <SortableHeader label="Difficulty" sortKey="difficulty" sortConfig={sortConfig} requestSort={requestSort} />
//                 </div>
//                 <div className="hidden text-center md:col-span-2 md:block">Status</div>
//                 <div className="hidden text-right md:col-span-3 md:block">Actions</div>
//             </div>
//             {/* Body */}
//             <div>
//                 {problems.length === 0 ? (
//                     <p className="p-8 text-center text-gray-500">No problems found.</p>
//                 ) : (
//                     problems.map((problem) => (
//                         <div key={problem._id} className="grid grid-cols-12 items-center border-t border-gray-700 p-4 transition-transform duration-200 hover:z-10 hover:scale-[1.02] hover:bg-gray-700/50">
//                             <div className="col-span-12 md:col-span-5">
//                                 <h3 className="font-medium text-blue-400">{problem.title}</h3>
//                                 <p className="mt-1 line-clamp-1 text-sm text-gray-400">{problem.description}</p>
//                             </div>
//                             <div className="col-span-6 mt-2 md:col-span-2 md:mt-0 md:text-center">
//                                 <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${getDifficultyBadgeColor(problem.difficulty)}`}>
//                                     {problem.difficulty || 'N/A'}
//                                 </span>
//                             </div>
//                             <div className="col-span-6 mt-2 md:col-span-2 md:mt-0 md:text-center">
//                                 {problem.videoSolution ? (
//                                     <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-300">
//                                         <span className="h-1.5 w-1.5 rounded-full bg-green-400"></span>
//                                         Video Added
//                                     </span>
//                                 ) : (
//                                     <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-500/10 px-2 py-1 text-xs font-medium text-gray-300">
//                                         <span className="h-1.5 w-1.5 rounded-full bg-gray-400"></span>
//                                         No Video
//                                     </span>
//                                 )}
//                             </div>
//                             <div className="col-span-12 mt-4 flex items-center justify-end gap-2 md:col-span-3 md:mt-0">
//                                 {problem.videoSolution ? (
//                                     <>
//                                         <a href={problem.videoSolution.url} target="_blank" rel="noopener noreferrer" className="action-button text-green-400 hover:bg-green-500/10" title="Play Video"><FiPlay /></a>
//                                         <button onClick={() => onUploadClick(problem)} className="action-button text-yellow-400 hover:bg-yellow-500/10" title="Edit Video Details"><FiEdit /></button>
//                                     </>
//                                 ) : (
//                                     <button onClick={() => onUploadClick(problem)} className="flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-2 text-xs font-semibold text-blue-300 transition-colors hover:bg-blue-500/20" title="Add Video Solution">
//                                         <FiPlus />
//                                         <span>Add Video</span>
//                                     </button>
//                                 )}
//                                 <button onClick={() => onDelete(problem._id)} className="action-button text-red-400 hover:bg-red-500/10" title="Delete Problem"><FiTrash2 /></button>
//                             </div>
//                         </div>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// };

// // Add a little CSS for the action buttons in your global CSS file if needed:
// // .action-button {
// //   @apply rounded-full p-2 transition-colors;
// // }


import React from 'react';
import { FiChevronUp, FiChevronDown, FiFilm, FiSettings, FiTrash2 } from 'react-icons/fi';

const getDifficultyBadgeColor = (difficulty) => {
    switch ((difficulty || '').toLowerCase()) {
        case 'easy': return 'border-green-400 bg-green-500/10 text-green-300';
        case 'medium': return 'border-yellow-400 bg-yellow-400/10 text-yellow-300';
        case 'hard': return 'border-red-500 bg-red-500/10 text-red-400';
        default: return 'border-gray-500 bg-gray-600/10 text-gray-300';
    }
};

const SortableHeader = ({ label, sortKey, sortConfig, requestSort }) => {
    const isSorted = sortConfig.key === sortKey;
    const Icon = sortConfig.direction === 'asc' ? FiChevronUp : FiChevronDown;
    return (
        <div className="flex cursor-pointer items-center gap-2 transition-colors hover:text-white" onClick={() => requestSort(sortKey)}>
            <span>{label}</span>
            {isSorted && <Icon className="h-4 w-4" />}
        </div>
    );
};

export const ProblemList = ({ problems, sortConfig, requestSort, onDeleteProblem, onManageVideosClick }) => {
    return (
        <div className="overflow-hidden rounded-lg border border-gray-700 bg-gray-800 shadow-xl">
            {/* Header */}
            <div className="grid grid-cols-12 items-center bg-gray-700/50 p-4 font-semibold text-gray-400">
                <div className="col-span-12 md:col-span-5">
                    <SortableHeader label="Problem Title" sortKey="title" sortConfig={sortConfig} requestSort={requestSort} />
                </div>
                <div className="hidden text-center md:col-span-2 md:block">
                    <SortableHeader label="Difficulty" sortKey="difficulty" sortConfig={sortConfig} requestSort={requestSort} />
                </div>
                <div className="hidden text-center md:col-span-2 md:block">Videos</div>
                <div className="hidden text-right md:col-span-3 md:block">Actions</div>
            </div>

            {/* Body */}
            <div>
                {problems.length === 0 ? (
                    <p className="p-8 text-center text-gray-500">No problems found matching your criteria.</p>
                ) : (
                    problems.map((problem) => (
                        <div key={problem._id} className="grid grid-cols-12 items-center border-t border-gray-700 p-4 transition-transform duration-200 hover:z-10 hover:scale-[1.02] hover:bg-gray-700/50">
                            <div className="col-span-12 md:col-span-5">
                                <h3 className="font-medium text-blue-400">{problem.title}</h3>
                                <p className="mt-1 line-clamp-1 text-sm text-gray-400">{problem.description}</p>
                            </div>
                            <div className="col-span-6 mt-2 md:col-span-2 md:mt-0 md:text-center">
                                <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${getDifficultyBadgeColor(problem.difficulty)}`}>
                                    {problem.difficulty || 'N/A'}
                                </span>
                            </div>
                            <div className="col-span-6 mt-2 md:col-span-2 md:mt-0 md:text-center">
                                <span className="inline-flex items-center gap-2 rounded-full bg-gray-600/50 px-3 py-1 text-sm font-medium text-gray-300">
                                    <FiFilm />
                                    {problem.videoSolutions?.length || 0} Video(s)
                                </span>
                            </div>
                            <div className="col-span-12 mt-4 flex items-center justify-end gap-2 md:col-span-3 md:mt-0">
                                <button
                                    onClick={() => onManageVideosClick(problem)}
                                    className="flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700 hover:scale-105"
                                    title="Manage Video Solutions">
                                    <FiSettings />
                                    <span>Manage Videos</span>
                                </button>
                                <button
                                    onClick={() => onDeleteProblem(problem._id)}
                                    className="action-button text-red-400 hover:bg-red-500/10"
                                    title="Delete Problem">
                                    <FiTrash2 />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};