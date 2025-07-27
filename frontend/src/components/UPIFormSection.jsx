import React from "react";

export default function UPIFormSection() {
    return (
        <div className="min-h-screen bg-gray-100 p-6 md:p-12">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10 text-center space-y-8">
                <h1 className="text-3xl font-bold text-purple-700">Support CodeHunter</h1>
                <p className="text-gray-600 text-lg">
                    Fill out the form and pay via UPI to complete your order.
                </p>

                <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                    <div>
                        <img
                            src="/your-upi-qr-code.png" // replace with your actual path
                            alt="UPI QR"
                            className="w-56 h-56 object-contain border rounded-xl shadow-md"
                        />
                        <p className="mt-2 font-semibold text-gray-700">Scan & Pay to: <br /><code>sadiv120@okaxis</code></p>
                    </div>

                    <iframe
                        src="https://docs.google.com/forms/d/e/your-form-id/viewform?embedded=true"
                        width="80%"
                        height="600"
                        frameBorder="0"
                        marginHeight="0"
                        marginWidth="0"
                        title="Google Form"
                        className="rounded-xl border shadow-md flex-grow"
                    >
                        Loading…
                    </iframe>
                </div>

                <p className="text-sm text-gray-500">We will confirm your order manually once payment is verified. You’ll get an email shortly.</p>
            </div>
        </div>
    );
}
