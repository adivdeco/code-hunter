import PolicyPageLayout from '../components/PolicyPageLayout';
import PolicySection from '../components/PolicySection';
import ContactInfo from '../components/ContactInfo';

const TermsAndConditions = () => {
    const companyInfo = {
        name: '[Your Company Name]',
        website: '[yourwebsite.com]',
        email: '[contact@yourcompany.com]',
        address: '[Your Company Address]',
        state: '[Your Country/State]'
    };

    return (
        <PolicyPageLayout title="Terms and Conditions" lastUpdated="October 26, 2023">

            <PolicySection title="1. Introduction">
                <p>Welcome to {companyInfo.name}. These Terms and Conditions outline the rules and regulations for the use of {companyInfo.name}'s Website, located at {companyInfo.website}. By accessing this website, we assume you accept these terms. Do not continue to use {companyInfo.website} if you do not agree to all terms stated here.</p>
            </PolicySection>

            <PolicySection title="2. Intellectual Property">
                <p>All content on our site, including text, logos, graphics, and images, is the property of {companyInfo.name} and its creators and is protected by copyright laws.</p>
            </PolicySection>

            <PolicySection title="3. User Obligations">
                <p>You agree to use our website for legitimate purposes only and not for any illegal or unauthorized purpose. You must be at least the age of majority in your state or province of residence to use this site.</p>
            </PolicySection>

            <PolicySection title="4. Limitation of Liability">
                <p>{companyInfo.name} and its directors will not be liable for any damages resulting from your use of, or inability to use, our website or services.</p>
            </PolicySection>

            <PolicySection title="5. Governing Law">
                <p>These Terms shall be governed by and construed in accordance with the laws of {companyInfo.state}, without regard to its conflict of law provisions.</p>
            </PolicySection>

            <ContactInfo email={companyInfo.email} />

        </PolicyPageLayout>
    );
};

export default TermsAndConditions;