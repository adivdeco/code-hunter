import PolicyPageLayout from '../components/PolicyPageLayout';
import PolicySection from '../components/PolicySection';
import ContactInfo from '../components/ContactInfo';

const PrivacyPolicy = () => {
    const companyInfo = {
        name: 'ACODEV',
        website: 'sadiv120@gmail.com',
        email: 'sadiv120@gmail.com',
        paymentProcessor: '[e.g., Stripe, PayPal]'
    };

    return (
        <PolicyPageLayout title="Privacy Policy" lastUpdated="October 26, 2023">

            <PolicySection title="Introduction">
                <p>{companyInfo.name} ("us", "we", or "our") operates the {companyInfo.website} website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service. By using the Service, you agree to the collection and use of information in accordance with this policy.</p>
            </PolicySection>

            <PolicySection title="Information We Collect">
                <h3>1. Information You Provide</h3>
                <ul>
                    <li><strong>Personal Identification:</strong> Name, email address, shipping/billing address, phone number.</li>
                    <li><strong>Payment Information:</strong> Credit card details, processed securely by our payment gateway, <strong>{companyInfo.paymentProcessor}</strong>. We do not store your full card details.</li>
                </ul>
                <h3>2. Information Collected Automatically</h3>
                <p>We use cookies and similar tracking technologies to track activity on our Service and hold certain information, including IP address, browser type, and pages visited.</p>
            </PolicySection>

            <PolicySection title="How We Use Your Information">
                <p>We use your data for several purposes:</p>
                <ul>
                    <li>To process and fulfill your orders.</li>
                    <li>To communicate with you.</li>
                    <li>To maintain and improve our website.</li>
                    <li>To prevent fraud and enhance security.</li>
                </ul>
                <p><strong>We will never sell your personal information to third parties.</strong></p>
            </PolicySection>

            <ContactInfo email={companyInfo.email} />

        </PolicyPageLayout>
    );
};

export default PrivacyPolicy;