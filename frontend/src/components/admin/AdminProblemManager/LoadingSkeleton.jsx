export const LoadingSkeleton = () => (
    <div className="container mx-auto animate-pulse p-4 md:px-6">
        <div className="mb-8">
            <div className="h-10 w-3/5 rounded-lg bg-gray-700"></div>
            <div className="mt-4 h-6 w-4/5 rounded-lg bg-gray-700"></div>
        </div>
        <div className="mb-6 h-16 rounded-lg bg-gray-800"></div>
        <div className="space-y-2 rounded-lg bg-gray-800 p-2">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 rounded-md bg-gray-700/50"></div>
            ))}
        </div>
    </div>
);