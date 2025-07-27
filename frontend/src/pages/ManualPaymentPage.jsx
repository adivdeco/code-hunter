


import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Crown,
    Sparkles,
    ChevronDown,
    CheckCircle,
    ArrowRight,
    ShoppingBag,
    CreditCard,
    Copy,
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import clsx from 'clsx';



const merchandiseData = [
    { id: 1, name: "Men's Cotton Hoodie", price: 1299 },
    { id: 2, name: 'Ceramic Coffee Mug (350ml)', price: 299 },
    { id: 3, name: 'Stainless Steel Water Bottle (1L)', price: 499 },
    { id: 4, name: 'Blue Light Blocking Glasses', price: 599 },
    { id: 5, name: "Men's Graphic Printed T-Shirt", price: 399 },
    { id: 6, name: 'Stainless Steel Thermos Flask (500ml)', price: 799 },
    { id: 7, name: 'Electronic Cleaning Kit', price: 349 },
    { id: 8, name: "Men's Baseball Cap", price: 249 },
    { id: 9, name: 'Funny Programmer Coffee Mug', price: 349 },
    { id: 10, name: 'Motivational Poster Set (Pack of 6)', price: 599 },
    { id: 11, name: 'Spiral Notebook (Set of 3)', price: 199 },
    { id: 12, name: 'Insulated Water Bottle (750ml)', price: 599 },
    { id: 13, name: 'Laptop Sleeve (15.6 inch)', price: 499 },
    { id: 14, name: 'Anti Glare Computer Glasses', price: 799 },
    { id: 15, name: 'Large Gaming Mouse Pad (900x400mm)', price: 399 },
    { id: 16, name: "Men's Pullover Hoodie", price: 899 },
    { id: 17, name: 'Vacuum Insulated Tumbler (500ml)', price: 699 },
    { id: 18, name: 'Stainless Steel Flask (450ml)', price: 649 },
    { id: 19, name: "Men's Casual T-Shirt (Pack of 3)", price: 799 },
    { id: 20, name: 'Leather Journal Notebook', price: 449 },
];

const plans = [
    // Freemium plan excluded as it's not a purchase
    { id: "pro", name: "Pro", price: 1999, originalPrice: 2999, description: "For serious coders and job seekers.", icon: <Sparkles className="w-5 h-5 language-icon text-purple-600" />, popular: true },
    { id: "premium", name: "Premium", price: 4999, originalPrice: 5999, description: "For elite coders to dominate the industry.", icon: <Crown className="w-5 h-5 language-icon text-amber-600" /> }
];


const containerVariants = {
    hidden: { opacity: 100, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const itemVariants = {
    hidden: { opacity: 100, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } }
};




const PaymentStep = ({ number, title, children }) => (
    <motion.div variants={itemVariants} className="relative pl-12">
        <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-purple-600/20 text-purple-400 font-bold border-2 border-purple-500/50">
            {number}
        </div>
        <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
        {children}
    </motion.div>
);

const SelectionCard = ({ icon, title, description, onClick, isSelected }) => (
    <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.03, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)" }}
        className={clsx("cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 backdrop-blur-sm", isSelected ? "bg-purple-600/30 border-purple-500 shadow-purple-500/20 shadow-lg" : "bg-white/5 border-white/10")}
        onClick={onClick}
    >
        <div className="flex items-center gap-4">
            <div className="bg-white/10 p-3 rounded-lg">{icon}</div>
            <div>
                <h4 className="text-lg font-bold text-white">{title}</h4>
                <p className="text-sm text-white/60">{description}</p>
            </div>
            <div className="ml-auto">
                <div className={clsx("h-6 w-6 rounded-full border-2 flex items-center justify-center", isSelected ? 'border-white bg-white' : 'border-white/20')}>
                    {isSelected && <CheckCircle className="h-4 w-4 text-purple-600" />}
                </div>
            </div>
        </div>
    </motion.div>
);

const ItemSelector = ({ items, selectedId, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedItem = items.find(item => item.id === selectedId);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left p-4 rounded-xl bg-black/30 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            >
                {selectedItem ? (<div><span className="font-bold text-white">{selectedItem.name}</span><span className="text-purple-400 ml-2"> (₹{selectedItem.price})</span></div>) : <span className="text-white/50">Select an item...</span>}
                <ChevronDown className={clsx("transition-transform duration-300", isOpen && "rotate-180")} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.ul initial={{ opacity: 100, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 100, y: -10 }} className="absolute z-10 w-full mt-2 p-2 max-h-60 overflow-y-auto bg-[#1a1a2e] rounded-xl border border-white/20 shadow-2xl">
                        {items.map(item => (<li key={item.id} onClick={() => { onSelect(item.id); setIsOpen(false); }} className="p-3 flex justify-between rounded-lg cursor-pointer hover:bg-purple-600/30 text-white/80 hover:text-white transition-colors"><span>{item.name}</span><span className="font-semibold text-purple-400">₹{item.price}</span></li>))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

const PlanCard = ({ plan, onSelect, isSelected }) => (
    <motion.div variants={itemVariants} onClick={() => onSelect(plan.id)} className={clsx("relative cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 backdrop-blur-sm", isSelected ? 'bg-purple-600/30 border-purple-500 shadow-purple-500/20 shadow-lg' : 'bg-white/5 border-white/10')}>
        {plan.popular && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-md">POPULAR</div>}
        <div className="flex items-start gap-4">
            <div className="bg-white/10 p-2 rounded-lg">{plan.icon}</div>
            <div className="flex-1">
                <h4 className="text-lg font-bold text-white">{plan.name}</h4>
                <p className="text-sm text-white/60 mt-1">{plan.description}</p>
                <div className="mt-3 flex items-baseline gap-2"><p className="text-2xl font-semibold text-white">₹{plan.price}</p><p className="line-through text-white/50">₹{plan.originalPrice}</p></div>
            </div>
            <div className={clsx("h-6 w-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1", isSelected ? 'border-white bg-white' : 'border-white/20')}>
                {isSelected && <CheckCircle className="h-4 w-4 text-purple-600" />}
            </div>
        </div>
    </motion.div>
);

const BackgroundDecorations = () => (
    <>
        <div className="absolute inset-0 z-0 opacity-40">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
        <div className="absolute inset-0 z-0 bg-[radial-gradient(#ffffff1a_1px,transparent_1px)] [background-size:2rem_2rem]"></div>
    </>
);

// --- MAIN COMPONENT ---
const ManualPaymentPage = () => {
    // --- STATE & HOOKS ---
    const location = useLocation();
    const navigate = useNavigate();
    const checkoutCart = location.state?.cartItems;

    const paymentFlow = checkoutCart ? 'checkout' : 'selection';

    const [paymentType, setPaymentType] = useState(null);
    const [selectedMerchId, setSelectedMerchId] = useState(null);
    const [selectedPlanId, setSelectedPlanId] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', transactionId: '' });

    const step2Ref = useRef(null);
    const step3Ref = useRef(null);


    const upiId = import.meta.env.VITE_UPI_ID;
    const upiQrCodePath = import.meta.env.VITE_UPI_QR_CODE;



    useEffect(() => {
        if (paymentFlow === 'checkout') {
            const amount = checkoutCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
            setTotalAmount(amount);
        } else {
            let amount = 0;
            if (paymentType === 'merch' && selectedMerchId) {
                amount = merchandiseData.find(item => item.id === selectedMerchId)?.price || 0;
            } else if (paymentType === 'subscription' && selectedPlanId) {
                amount = plans.find(plan => plan.id === selectedPlanId)?.price || 0;
            }
            setTotalAmount(amount);
        }
    }, [paymentFlow, paymentType, selectedMerchId, selectedPlanId, checkoutCart]);

    // Scroll effect
    useEffect(() => {
        if (totalAmount > 0) {
            step3Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (paymentType) {
            step2Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [totalAmount, paymentType]);

    // --- HANDLERS ---
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCopyUpiId = () => {
        navigator.clipboard.writeText(upiId);
        toast.success("UPI ID Copied!", { icon: '📋' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would send the data to your backend
        const orderDetails = paymentFlow === 'checkout'
            ? checkoutCart.map(item => `${item.name} (x${item.quantity})`).join(', ')
            : (selectedMerchId ? merchandiseData.find(i => i.id === selectedMerchId)?.name : plans.find(p => p.id === selectedPlanId)?.name);

        console.log("Form submitted:", {
            flow: paymentFlow,
            purchase: orderDetails,
            amount: totalAmount,
            customerDetails: formData,
        });

        // Clear the cart from local storage if this was a checkout
        if (paymentFlow === 'checkout') {
            localStorage.removeItem('shoppingCart');
        }

        toast.success("Order confirmed! We'll verify and be in touch.", { duration: 4000 });
        setFormSubmitted(true);
    };


    // --- RENDER LOGIC ---

    if (formSubmitted) {
        return (
            <div className="relative min-h-screen w-full flex items-center justify-center bg-gray-900 text-white font-sans p-4">
                <BackgroundDecorations />
                <motion.div
                    initial={{ opacity: 100, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10 text-center p-8 bg-black/40 border border-white/10 rounded-2xl backdrop-blur-lg"
                >
                    <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold">Thank You!</h2>
                    <p className="text-white/70 mt-2 max-w-sm">Your order has been recorded. We will manually verify your payment and send a confirmation email shortly.</p>
                    <button
                        onClick={() => navigate('/shop')}
                        className="mt-6 flex items-center justify-center gap-2 py-2 px-6 font-bold bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                        Back to Shop <ShoppingBag size={18} />
                    </button>
                </motion.div>
            </div>
        );
    }

    // --- Universal Payment and Confirmation Steps ---
    const PaymentAndConfirmationSteps = (
        <>
            <AnimatePresence>
                {totalAmount > 0 && (
                    <motion.div
                        key="payment-steps-wrapper" ref={step3Ref}
                        initial={{ opacity: 100 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}
                        className="space-y-12"
                    >
                        <PaymentStep number={paymentFlow === 'checkout' ? 2 : 3} title="Make Payment">
                            <div className="flex flex-col md:flex-row gap-8 items-center bg-black/30 p-6 rounded-2xl border border-white/20">
                                <div className="text-center">
                                    <img src={upiQrCodePath} alt="UPI QR Code" className="w-48 h-48 rounded-lg bg-white p-2" />
                                    <p className="mt-2 font-mono text-white/80">Scan to Pay</p>
                                </div>
                                <div className="flex-1 w-full">
                                    <p className="text-white/60">Total Amount</p>
                                    <p className="text-4xl font-bold text-purple-400 mb-4">₹{totalAmount.toLocaleString('en-IN')}</p>
                                    <p className="text-white/60">Or Pay to UPI ID</p>
                                    <div className="flex items-center gap-2 mt-1 p-3 rounded-lg bg-white/5 border border-white/10">
                                        <span className="font-mono text-white/90 overflow-hidden text-ellipsis">{upiId}</span>
                                        <button onClick={handleCopyUpiId} className="ml-auto p-1.5 rounded hover:bg-white/10 text-white/60 hover:text-white transition-colors flex-shrink-0"><Copy size={16} /></button>
                                    </div>
                                </div>
                            </div>
                        </PaymentStep>

                        <PaymentStep number={paymentFlow === 'checkout' ? 3 : 4} title="Confirm Your Order">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div><label htmlFor="name" className="block text-sm font-medium text-white/70 mb-1">Your Name</label><input type="text" name="name" id="name" required onChange={handleFormChange} className="w-full p-3 rounded-lg bg-black/30 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-white" /></div>
                                <div><label htmlFor="email" className="block text-sm font-medium text-white/70 mb-1">Your Email</label><input type="email" name="email" id="email" required onChange={handleFormChange} className="w-full p-3 rounded-lg bg-black/30 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-white" /></div>
                                <div><label htmlFor="transactionId" className="block text-sm font-medium text-white/70 mb-1">UPI Transaction ID / Ref. No.</label><input type="text" name="transactionId" id="transactionId" required onChange={handleFormChange} placeholder="e.g., 230012345678" className="w-full p-3 rounded-lg bg-black/30 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-white" /></div>
                                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full flex items-center justify-center gap-2 py-3 px-6 font-bold bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300">Submit & Confirm Order <ArrowRight size={18} /></motion.button>
                            </form>
                        </PaymentStep>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );

    return (
        <div className="relative min-h-screen w-full bg-gray-900 text-white font-sans overflow-x-hidden">
            <Toaster position="bottom-right" toastOptions={{ style: { background: '#1a1a2e', color: '#e0e0e0', border: '1px solid rgba(255, 255, 255, 0.1)' } }} />
            <BackgroundDecorations />

            <main className="relative z-10 pt-24 md:pt-32 pb-20">
                <section className="text-center px-4">
                    <motion.h1 initial={{ opacity: 100, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl md:text-6xl font-extrabold tracking-tighter">
                        {paymentFlow === 'checkout' ? 'Review Your ' : 'Complete Your '}<span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">{paymentFlow === 'checkout' ? 'Order' : 'Purchase'}</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 100, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-4 max-w-2xl mx-auto text-lg text-white/70">
                        {paymentFlow === 'checkout' ? 'Almost there! Please review your items and complete the payment.' : 'Follow these simple steps to pay via UPI and secure your order.'}
                    </motion.p>
                </section>

                <div className="max-w-3xl mx-auto mt-16 px-4">
                    {paymentFlow === 'checkout' ? (

                        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12">
                            <PaymentStep number="1" title="Order Summary">
                                <div className="space-y-3 p-4 bg-black/40 rounded-2xl border border-white/10 backdrop-blur-sm">
                                    {checkoutCart.map(item => (
                                        <div key={item.id} className="flex justify-between items-center text-white">
                                            <span>{item.name} <span className="text-white/60">x {item.quantity}</span></span>
                                            <span className="font-semibold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                                        </div>
                                    ))}
                                    <div className="pt-3 mt-3 border-t border-white/10 flex justify-between items-baseline">
                                        <span className="font-bold text-lg">Subtotal</span>
                                        <span className="font-bold text-xl text-purple-400">₹{totalAmount.toLocaleString('en-IN')}</span>
                                    </div>
                                </div>
                            </PaymentStep>
                            {PaymentAndConfirmationSteps}
                        </motion.div>

                    ) : (
                        // --- SELECTION FLOW UI ---
                        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12">
                            <PaymentStep number="1" title="Choose What You're Buying">
                                <div className="space-y-4">
                                    <SelectionCard icon={<ShoppingBag className="w-7 h-7 text-purple-400" />} title="Merchandise" description="Get your hands on exclusive swag." onClick={() => { setPaymentType('merch'); setSelectedPlanId(null); setTotalAmount(0); }} isSelected={paymentType === 'merch'} />
                                    <SelectionCard icon={<CreditCard className="w-7 h-7 text-purple-400" />} title="Subscription" description="Unlock premium coding features." onClick={() => { setPaymentType('subscription'); setSelectedMerchId(null); setTotalAmount(0); }} isSelected={paymentType === 'subscription'} />
                                </div>
                            </PaymentStep>
                            <AnimatePresence>
                                {paymentType && (
                                    <motion.div key="step2-wrapper" ref={step2Ref} initial={{ opacity: 100, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 100, scale: 0.95 }} transition={{ duration: 0.5, ease: "easeInOut" }}>
                                        <PaymentStep number="2" title="Select Your Item">
                                            {paymentType === 'merch' ? <ItemSelector items={merchandiseData} selectedId={selectedMerchId} onSelect={setSelectedMerchId} /> : <div className="space-y-4">{plans.map(plan => <PlanCard key={plan.id} plan={plan} onSelect={setSelectedPlanId} isSelected={selectedPlanId === plan.id} />)}</div>}
                                        </PaymentStep>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            {PaymentAndConfirmationSteps}
                        </motion.div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ManualPaymentPage;