import { Mail, HelpCircle } from 'lucide-react';

const ContactInfo = ({ email }) => {
    return (
        <div className="mt-12 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
            <div className="flex items-center mb-2">
                <HelpCircle className="h-6 w-6 text-blue-700 mr-3" />
                <h3 className="text-xl font-semibold text-blue-800">Questions?</h3>
            </div>
            <p className="text-gray-700">
                If you have any questions, please don't hesitate to contact us.
            </p>
            <a href={`mailto:${email}`} className="mt-3 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors">
                <Mail className="h-4 w-4 mr-2" />
                {email}
            </a>
        </div>
    );
};

export default ContactInfo;