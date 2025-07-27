// src/pages/ManualPaymentPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// ADD useLocation to get the data passed during navigation
import { useLocation } from 'react-router-dom';
import { Zap, Crown, Sparkles, CheckCircle, ArrowRight, ShoppingBag, CreditCard, Copy } from 'lucide-react';
// ... (Your other imports, data, and variants)

// ... (Sub-components like PaymentStep, PlanCard etc. can remain the same) ...

const ManualPaymentPage = () => {
    // GET DATA PASSED FROM PREVIOUS PAGE
    const location = useLocation();
    const checkoutCart = location.state?.cartItems; // e.g., [{id: 1, name: 'Hoodie', ...}]

    // State management
    // If we have a cart, start in 'checkout' mode. Otherwise, 'selection' mode.
    const [paymentType, setPaymentType] = useState(checkoutCart ? 'merch_checkout' : null);
    const [selectedMerchId, setSelectedMerchId] = useState(null);
    const [selectedPlanId, setSelectedPlanId] = useState(null);

    // Calculate total from the checkout cart, or initialize to 0.
    const [totalAmount, setTotalAmount] = useState(() => {
        if (!checkoutCart) return 0;
        return checkoutCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    });

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', transactionId: '' });

    // ... (refs, upiId, other handlers remain the same) ...

    const upiId = 'your-upi-id@okhdfcbank';
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCopyUpiId = () => { /* ... */ };

    const handleSubmit = (e) => { /* ... */ };


    // If it's a checkout flow, show a simplified UI
    if (paymentType === 'merch_checkout') {
        return (
            <div className="relative min-h-screen w-full bg-gray-900 text-white font-sans">
                {/* ... Toaster, BackgroundDecorations ... */}
                <main className="relative z-10 pt-24 md:pt-32 pb-20">
                    <section className="text-center px-4">
                        <motion.h1 /* ... */ className="text-5xl md:text-6xl font-extrabold tracking-tighter">
                            Review Your <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">Order</span>
                        </motion.h1>
                        <motion.p /* ... */ className="mt-4 max-w-2xl mx-auto text-lg text-white/70">
                            Almost there! Please review your items and complete the payment.
                        </motion.p>
                    </section>

                    <div className="max-w-3xl mx-auto mt-16 px-4">
                        <motion.div variants={{}} initial="hidden" animate="visible" className="space-y-12">
                            {/* STEP 1: REVIEW ITEMS */}
                            <PaymentStep number="1" title="Order Summary">
                                <div className="space-y-3 p-4 bg-black/30 rounded-2xl border border-white/20">
                                    {checkoutCart.map(item => (
                                        <div key={item.id} className="flex justify-between items-center text-white">
                                            <span>{item.name} <span className="text-white/60">x {item.quantity}</span></span>
                                            <span className="font-semibold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                                        </div>
                                    ))}
                                </div>
                            </PaymentStep>

                            {/* STEPS 2 & 3: PAYMENT and CONFIRMATION */}
                            {/* This part can be copied from your original ManualPaymentPage component */}
                            <PaymentStep number="2" title="Make Payment">
                                {/* ... (The whole payment div with QR code, amount, and UPI ID) ... */}
                            </PaymentStep>
                            <PaymentStep number="3" title="Confirm Your Order">
                                {/* ... (The whole form for Name, Email, Transaction ID) ... */}
                            </PaymentStep>
                        </motion.div>
                    </div>
                </main>
            </div>
        );
    }


    // This is the original flow if a user lands on this page directly
    return (
        <div className="relative min-h-screen w-full bg-gray-900 text-white font-sans overflow-x-hidden">
            {/* The entire original JSX of your ManualPaymentPage */}
            {/* It will be used if location.state.cartItems is not present */}
        </div>
    );
};