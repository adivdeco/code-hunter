const PolicySection = ({ title, children }) => {
    return (
        <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 border-b pb-2 mb-4">
                {title}
            </h2>
            {/* The `prose` class from @tailwindcss/typography handles all text styling */}
            <div className="prose prose-lg max-w-none prose-h3:font-semibold prose-h3:text-gray-600 prose-strong:text-gray-700">
                {children}
            </div>
        </section>
    );
};

export default PolicySection;