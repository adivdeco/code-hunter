import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'; // Path may vary

const PolicyPageLayout = ({ title, lastUpdated, children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 min-h-screen p-4 sm:p-6 md:p-8"
        >
            <div className="max-w-4xl mx-auto">
                <Card className="shadow-lg">
                    <CardHeader className="border-b">
                        <CardTitle className="text-3xl font-bold text-gray-800">{title}</CardTitle>
                        <p className="text-sm text-gray-500 pt-1">Last Updated: {lastUpdated}</p>
                    </CardHeader>
                    <CardContent className="pt-6">
                        {children}
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    );
};

export default PolicyPageLayout;