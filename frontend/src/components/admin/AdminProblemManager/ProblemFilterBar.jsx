import { FiSearch } from 'react-icons/fi';

const difficultyOptions = ['all', 'easy', 'medium', 'hard'];
const difficultyColors = {
    all: 'bg-blue-600',
    easy: 'bg-green-600',
    medium: 'bg-yellow-600',
    hard: 'bg-red-600',
};

export const ProblemFilterBar = ({ searchTerm, setSearchTerm, selectedDifficulty, setSelectedDifficulty }) => (
    <div className="mb-6 flex flex-col items-start justify-between gap-4 rounded-lg border border-gray-700 bg-gray-800/50 p-4 md:flex-row md:items-center">
        <div className="relative w-full md:w-80">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
                type="text"
                placeholder="Search by title..."
                className="w-full rounded-md border border-gray-600 bg-gray-900 py-2 pl-10 pr-4 text-white placeholder-gray-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        <div className="flex flex-wrap items-center gap-2 rounded-lg bg-gray-900 p-1">
            {difficultyOptions.map(diff => (
                <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`transform rounded-md px-4 py-1.5 text-sm font-medium capitalize transition-all duration-200 hover:scale-105 ${selectedDifficulty === diff
                            ? `${difficultyColors[diff]} text-white shadow-md`
                            : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/70'
                        }`}
                >
                    {diff}
                </button>
            ))}
        </div>
    </div>
);