import PolicyPageLayout from '../components/PolicyPageLayout';
import PolicySection from '../components/PolicySection';
import ContactInfo from '../components/ContactInfo';

const CancellationRefundPolicy = () => {
    const companyInfo = {
        name: '[Acodev]',
        email: '[sadiv120@gmail.com]',
        returnWindow: '30',
        cancelWindow: '24',
    };

    return (
        <PolicyPageLayout title="Cancellation & Refund Policy" lastUpdated="October 26, 2023">

            <PolicySection title="Cancellation Policy">
                <p>You can request an order cancellation <strong>within {companyInfo.cancelWindow} hours</strong> of placing it, provided it has not yet been processed for shipping.</p>
                <ul>
                    <li><strong>How to Cancel:</strong> To cancel your order, please contact our support team immediately at <strong>{companyInfo.email}</strong> with your order number.</li>
                    <li><strong>After Shipping:</strong> If the request is made after {companyInfo.cancelWindow} hours or after shipping, we cannot cancel it. You may follow our return process once you receive the item.</li>
                </ul>
            </PolicySection>

            <PolicySection title="Refund Policy">
                <p>We have a <strong>{companyInfo.returnWindow}-day return policy</strong>, which means you have {companyInfo.returnWindow} days after receiving your item to request a return.</p>

                <h3>Eligibility for a Refund</h3>
                <p>To be eligible, your item must meet the following conditions:</p>
                <ul>
                    <li>In the same condition that you received it: <strong>unworn, unused, and undamaged.</strong></li>
                    <li>In its <strong>original packaging</strong> with all original tags attached.</li>
                    <li>Accompanied by the <strong>receipt or proof of purchase.</strong></li>
                </ul>
                <p><em>Items not eligible for return include: [e.g., gift cards, downloadable products, sale items, personal care goods].</em></p>

                <h3>Return Process</h3>
                <ol>
                    <li><strong>Initiate Return:</strong> Email us at <strong>{companyInfo.email}</strong> with your order number and reason for the return.</li>
                    <li><strong>Receive Instructions:</strong> If accepted, we’ll send you a return shipping label and instructions.</li>
                    <li><strong>Ship Item:</strong> Securely pack and ship the item to the provided address.</li>
                </ol>

                <h3>Refund Approval</h3>
                <p>Once we receive and inspect your return, we will notify you of the approval or rejection. If approved, you’ll be automatically refunded on your original payment method within <strong>5-10 business days</strong>.</p>
            </PolicySection>

            <ContactInfo email={companyInfo.email} />

        </PolicyPageLayout>
    );
};

export default CancellationRefundPolicy;