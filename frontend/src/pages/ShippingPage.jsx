import PolicyPageLayout from '../components/PolicyPageLayout';
import PolicySection from '../components/PolicySection';
import ContactInfo from '../components/ContactInfo';

const ShippingTable = () => (
    <div className="overflow-x-auto my-6">
        <table className="min-w-full bg-white border border-gray-200 text-left">
            <thead className="bg-gray-100">
                <tr>
                    <th className="py-3 px-4 font-semibold text-gray-600">Shipping Method</th>
                    <th className="py-3 px-4 font-semibold text-gray-600">Estimated Delivery Time</th>
                    <th className="py-3 px-4 font-semibold text-gray-600">Cost</th>
                </tr>
            </thead>
            <tbody className="text-gray-700">
                <tr className="border-t">
                    <td className="py-3 px-4">Standard Shipping</td>
                    <td className="py-3 px-4">[5-7] Business Days</td>
                    <td className="py-3 px-4">[e.g., $5.99]</td>
                </tr>
                <tr className="border-t bg-gray-50">
                    <td className="py-3 px-4">Expedited Shipping</td>
                    <td className="py-3 px-4">[2-3] Business Days</td>
                    <td className="py-3 px-4">[e.g., $12.99]</td>
                </tr>
                <tr className="border-t">
                    <td className="py-3 px-4">International Shipping</td>
                    <td className="py-3 px-4">[10-20] Business Days</td>
                    <td className="py-3 px-4">Calculated at checkout</td>
                </tr>
                <tr className="border-t bg-gray-50">
                    <td className="py-3 px-4 font-semibold">Free Shipping</td>
                    <td className="py-3 px-4">On orders over [$XX]</td>
                    <td className="py-3 px-4 font-semibold text-green-600">Free</td>
                </tr>
            </tbody>
        </table>
    </div>
);


const ShippingPolicy = () => {
    const companyInfo = { email: '[contact@yourcompany.com]' };

    return (
        <PolicyPageLayout title="Shipping Policy" lastUpdated="October 26, 2023">
            <PolicySection title="Order Processing Time">
                <p>All orders are processed within <strong>1-3 business days</strong> (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.</p>
            </PolicySection>

            <PolicySection title="Shipping Rates & Delivery Estimates">
                <p>Shipping charges are calculated and displayed at checkout. Estimates are based on the shipping date, not the order date.</p>
                <ShippingTable />
                <p><em>Delivery delays can occasionally occur due to factors outside of our control (e.g., weather, carrier delays).</em></p>
            </PolicySection>

            <PolicySection title="Customs, Duties, and Taxes">
                <p>Our company is not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer.</p>
            </PolicySection>

            <ContactInfo email={companyInfo.email} />

        </PolicyPageLayout>
    );
};

export default ShippingPolicy;