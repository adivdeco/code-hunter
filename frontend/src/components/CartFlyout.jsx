// // src/components/CartFlyout.jsx
// import { motion, AnimatePresence } from "framer-motion";
// import { X, Trash2, Plus, Minus } from "lucide-react";

// export const CartFlyout = ({ isOpen, onClose, cart, onUpdateQuantity, onRemoveFromCart }) => {
//     const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

//     return (
//         <AnimatePresence>
//             {isOpen && (
//                 <>
//                     {/* Backdrop */}
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         onClick={onClose}
//                         className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
//                     />

//                     {/* Flyout Panel */}
//                     <motion.div
//                         initial={{ x: '100%' }}
//                         animate={{ x: 0 }}
//                         exit={{ x: '100%' }}
//                         transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                         className="fixed top-0 right-0 h-full w-full max-w-md bg-gray-900/80 border-l border-white/10 shadow-2xl z-50 flex flex-col"
//                     >
//                         {/* Header */}
//                         <div className="flex justify-between items-center p-6 border-b border-white/10">
//                             <h2 className="text-2xl font-bold text-white">Your Cart</h2>
//                             <button onClick={onClose} className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors">
//                                 <X className="w-6 h-6" />
//                             </button>
//                         </div>

//                         {/* Cart Items */}
//                         <div className="flex-grow p-6 overflow-y-auto space-y-4">
//                             {cart.length === 0 ? (
//                                 <div className="text-center h-full flex flex-col justify-center items-center">
//                                     <img src="/empty-cart.png" alt="Empty Cart" className="w-72 h-52 opacity-50" />
//                                     <p className="text-white/60 mt-4 text-lg">Your armory is empty.</p>
//                                     <p className="text-white/40 text-sm">Add some gear to get started!</p>
//                                 </div>
//                             ) : (
//                                 cart.map(item => (
//                                     <motion.div
//                                         layout
//                                         key={item.id}
//                                         className="flex gap-4 p-4 rounded-lg bg-black/30 border border-white/5"
//                                     >
//                                         <img src={item.image} alt={item.name} className="w-20 h-20 rounded-md object-cover" />
//                                         <div className="flex-grow">
//                                             <p className="font-bold text-white truncate">{item.name}</p>
//                                             <p className="text-purple-400 text-sm">₹{item.price.toLocaleString('en-IN')}</p>
//                                             <div className="flex items-center gap-3 mt-2">
//                                                 <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="p-1 rounded-full bg-white/10 hover:bg-white/20"><Minus className="w-4 h-4" /></button>
//                                                 <span>{item.quantity}</span>
//                                                 <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="p-1 rounded-full bg-white/10 hover:bg-white/20"><Plus className="w-4 h-4" /></button>
//                                             </div>
//                                         </div>
//                                         <button onClick={() => onRemoveFromCart(item.id)} className="self-start text-white/50 hover:text-red-400">
//                                             <Trash2 className="w-5 h-5" />
//                                         </button>
//                                     </motion.div>
//                                 ))
//                             )}
//                         </div>

//                         {/* Footer */}
//                         {cart.length > 0 && (
//                             <div className="p-6 border-t border-white/10 bg-gray-900">
//                                 <div className="flex justify-between text-lg mb-4">
//                                     <span className="text-white/70">Subtotal</span>
//                                     <span className="font-bold text-white">₹{subtotal.toLocaleString('en-IN')}</span>
//                                 </div>
//                                 <button className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg hover:shadow-purple-500/30 transition-shadow">
//                                     Proceed to Checkout
//                                 </button>
//                             </div>
//                         )}
//                     </motion.div>
//                 </>
//             )}
//         </AnimatePresence>
//     );
// };

// src/components/CartFlyout.jsx
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingCart } from "lucide-react"; // Added ArrowRight and ShoppingCart for style

// Add `onCheckout` to the component's props
export const CartFlyout = ({ isOpen, onClose, cart, onUpdateQuantity, onRemoveFromCart, onCheckout }) => {
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                        aria-hidden="true"
                    />

                    {/* Flyout Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-gray-900/80 border-l border-white/10 shadow-2xl z-50 flex flex-col"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="cart-heading"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center p-6 border-b border-white/10 flex-shrink-0">
                            <h2 id="cart-heading" className="text-2xl font-bold text-white">Your Cart</h2>
                            <button
                                onClick={onClose}
                                className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                                aria-label="Close cart"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-grow p-6 overflow-y-auto space-y-4">
                            {cart.length === 0 ? (
                                <div className="text-center h-full flex flex-col justify-center items-center text-white/60">
                                    <ShoppingCart size={64} className="mb-4 opacity-30" />
                                    {/* You can replace the text with an image if you have one */}
                                    {/* <img src="/empty-cart.png" alt="Empty Cart" className="w-64 opacity-50" /> */}
                                    <p className="mt-4 text-lg font-semibold">Your armory is empty.</p>
                                    <p className="text-sm text-white/40">Add some gear to get started!</p>
                                </div>
                            ) : (
                                cart.map(item => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        key={item.id}
                                        className="flex gap-4 p-4 rounded-lg bg-black/30 border border-white/5"
                                    >
                                        <img src={item.image} alt={item.name} className="w-20 h-20 rounded-md object-cover flex-shrink-0" />
                                        <div className="flex-grow min-w-0">
                                            <p className="font-bold text-white truncate">{item.name}</p>
                                            <p className="text-purple-400 text-sm">₹{item.price.toLocaleString('en-IN')}</p>
                                            <div className="flex items-center gap-3 mt-2">
                                                <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors" aria-label={`Decrease quantity of ${item.name}`}>
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-6 text-center font-semibold">{item.quantity}</span>
                                                <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors" aria-label={`Increase quantity of ${item.name}`}>
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <button onClick={() => onRemoveFromCart(item.id)} className="self-start text-white/50 hover:text-red-400 p-1 transition-colors" aria-label={`Remove ${item.name} from cart`}>
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="p-6 border-t border-white/10 bg-gray-900/95 backdrop-blur-sm flex-shrink-0">
                                <div className="flex justify-between text-lg mb-4">
                                    <span className="text-white/70">Subtotal</span>
                                    <span className="font-bold text-white">₹{subtotal.toLocaleString('en-IN')}</span>
                                </div>
                                <button
                                    // Use the onCheckout function passed via props
                                    onClick={onCheckout}
                                    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300"
                                >
                                    Proceed to Checkout
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};