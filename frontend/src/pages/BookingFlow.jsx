import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Calendar,
    User,
    CreditCard,
    ShieldCheck,
    ArrowRight,
    ChevronLeft,
    Sparkles,
    Lock,
    Globe,
    Zap,
    MapPin,
    Terminal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useBookingStore from '../store/bookingStore';
import useAuthStore from '../store/authStore';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const BookingFlow = () => {
    const navigate = useNavigate();
    const { room, checkIn, checkOut, totalPrice, setBookingReference } = useBookingStore();
    const { user, token } = useAuthStore();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [error, setError] = useState('');

    if (!room) {
        navigate('/rooms');
        return null;
    }

    const steps = [
        { id: 1, name: 'Chronology', icon: Calendar },
        { id: 2, name: 'Inhabitant Card', icon: User },
        { id: 3, name: 'Settlement Node', icon: CreditCard },
        { id: 4, name: 'Identity Seal', icon: ShieldCheck },
    ];

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    const handleFinalize = async () => {
        setIsLoading(true);
        setError('');
        try {
            // Step 1: Create the booking
            const bookingRes = await axios.post(`${API}/bookings`, {
                roomId: room._id,
                checkIn,
                checkOut,
                guests: { adults: 1, children: 0 }
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (bookingRes.data.status !== 'success') {
                throw new Error('Booking creation failed');
            }

            const booking = bookingRes.data.data.booking;
            setBookingReference(booking.bookingReference);

            // Step 2: Initiate payment gateway
            if (paymentMethod === 'card') {
                const payRes = await axios.post(`${API}/payments/stripe-initiate`, {
                    bookingId: booking._id,
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (payRes.data.data?.paymentUrl) {
                    window.location.href = payRes.data.data.paymentUrl;
                    return;
                }
            }

            // Fallback for bank transfer
            navigate('/payment-status?status=pending');
        } catch (err) {
            console.error('Booking/Payment anomaly:', err);
            setError(err.response?.data?.message || 'Booking initiation failed');
            navigate('/payment-status?status=failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="pt-32 pb-24 min-h-screen bg-[#020617] flex flex-col items-center px-6">
            {/* Architectural Timeline */}
            <div className="w-full max-w-4xl mb-20">
                <div className="flex justify-between items-center relative">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -z-10"></div>
                    {steps.map((s) => (
                        <div key={s.id} className="flex flex-col items-center space-y-4">
                            <motion.div
                                initial={false}
                                animate={{
                                    backgroundColor: step >= s.id ? '#10B981' : '#111827',
                                    scale: step === s.id ? 1.2 : 1,
                                    boxShadow: step === s.id ? '0 0 30px rgba(16,185,129,0.3)' : 'none'
                                }}
                                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white border border-white/5 transition-all duration-700 relative z-10 ${step >= s.id ? 'emerald-glow' : ''}`}
                            >
                                <s.icon size={20} className={step >= s.id ? 'text-white' : 'text-slate-700'} />
                                {step > s.id && (
                                    <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-0.5 bg-emerald-500/50 hidden md:block"></div>
                                )}
                            </motion.div>
                            <span className={`text-[9px] font-black uppercase tracking-[0.3em] ${step >= s.id ? 'text-emerald-500' : 'text-slate-700'} hidden sm:block`}>
                                {s.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* Main Interaction Node */}
                <div className="lg:col-span-7">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-slate-900 shadow-2xl portal-shadow rounded-[3rem] p-12 md:p-16 border border-white/5 min-h-[500px] flex flex-col justify-between group hover:border-emerald-500/20 transition-all duration-1000"
                        >
                            {step === 1 && (
                                <div className="space-y-10">
                                    <div className="space-y-4">
                                        <h2 className="text-4xl font-serif text-white italic tracking-tighter transition-colors group-hover:text-emerald-400">Temporal Verification</h2>
                                        <p className="text-slate-500 text-xs font-black uppercase tracking-[0.4em]">Node Chronology: SGH_GRID_01</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="bg-[#020617] p-8 rounded-3xl border border-white/5 group-hover:border-emerald-500/10 transition-all">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 block mb-4">Entry Vector</span>
                                            <p className="text-xl font-serif text-emerald-500 italic font-bold">{checkIn}</p>
                                            <span className="text-[10px] font-bold text-slate-800 uppercase tracking-widest block mt-2">Check-in Protocol 14:00</span>
                                        </div>
                                        <div className="bg-[#020617] p-8 rounded-3xl border border-white/5 group-hover:border-emerald-500/10 transition-all">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 block mb-4">Exit Vector</span>
                                            <p className="text-xl font-serif text-emerald-500 italic font-bold">{checkOut}</p>
                                            <span className="text-[10px] font-bold text-slate-800 uppercase tracking-widest block mt-2">Check-out Protocol 11:00</span>
                                        </div>
                                    </div>
                                    <div className="pt-10 border-t border-white/5 flex items-center space-x-4 text-slate-600">
                                        <Zap size={14} className="text-emerald-500" />
                                        <span className="text-[9px] font-black uppercase tracking-widest italic tracking-[0.3em]">Real-time Chrono-sync Established</span>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-10">
                                    <div className="space-y-4">
                                        <h2 className="text-4xl font-serif text-white italic tracking-tighter transition-colors group-hover:text-emerald-400">Inhabitant Registry</h2>
                                        <p className="text-slate-500 text-xs font-black uppercase tracking-[0.4em]">Identity Artifact Vaulting Protocol</p>
                                    </div>
                                    <div className="space-y-8 bg-[#020617] p-10 rounded-[2.5rem] border border-white/5">
                                        <div className="flex items-center space-x-6">
                                            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                                                <User size={24} />
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-serif text-white italic py-1 leading-none">{user.name}</h4>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">{user.email}</span>
                                            </div>
                                        </div>
                                        <div className="pt-8 border-t border-white/5 flex items-center justify-between text-slate-500">
                                            <div className="flex items-center space-x-3">
                                                <ShieldCheck size={14} className="text-emerald-500" />
                                                <span className="text-[9px] font-black uppercase tracking-widest italic tracking-widest">AEC-256 Identification Validated</span>
                                            </div>
                                            <button className="text-[9px] font-black uppercase tracking-widest text-emerald-500 hover:text-emerald-400">Modify Identity</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-10">
                                    <div className="space-y-4">
                                        <h2 className="text-4xl font-serif text-white italic tracking-tighter transition-colors group-hover:text-emerald-400">Settlement Gateway</h2>
                                        <p className="text-slate-500 text-xs font-black uppercase tracking-[0.4em]">Financial Metadata Encryptor</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {[
                                            { id: 'card', name: 'Credit Artifact', icon: CreditCard, desc: 'Visa / Mastercard via Stripe' },
                                            { id: 'transfer', name: 'Internal Link', icon: Globe, desc: 'Bank Transfer Protocol' }
                                        ].map((method) => (
                                            <button
                                                key={method.id}
                                                onClick={() => setPaymentMethod(method.id)}
                                                className={`p-10 rounded-[2.5rem] border transition-all duration-700 text-left relative overflow-hidden group ${paymentMethod === method.id ? 'bg-emerald-500/10 border-emerald-500/50 shadow-2xl emerald-glow' : 'bg-[#020617] border-white/5 hover:border-emerald-500/20'}`}
                                            >
                                                <div className={`p-4 rounded-xl inline-block mb-6 transition-colors ${paymentMethod === method.id ? 'bg-emerald-500 text-white shadow-xl' : 'bg-white/5 text-slate-500'}`}>
                                                    <method.icon size={24} />
                                                </div>
                                                <h4 className={`text-lg font-serif italic py-1 leading-none transition-colors ${paymentMethod === method.id ? 'text-emerald-400' : 'text-white font-bold'}`}>{method.name}</h4>
                                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-600 mt-2">{method.desc}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {step === 4 && (
                                <div className="space-y-10">
                                    <div className="space-y-4 text-center">
                                        <div className="w-24 h-24 bg-emerald-500/10 rounded-full mx-auto flex items-center justify-center text-emerald-500 border border-emerald-500/20 shadow-2xl emerald-glow mb-8 animate-[pulse_2s_infinite]">
                                            <ShieldCheck size={48} />
                                        </div>
                                        <h2 className="text-4xl font-serif text-white italic tracking-tighter group-hover:text-emerald-400 transition-colors">Manifesto Seal</h2>
                                        <p className="text-slate-500 text-xs font-black uppercase tracking-[0.4em]">Final Identity Verification Required</p>
                                    </div>
                                    <div className="bg-[#020617] p-10 rounded-[2.5rem] border border-white/5 space-y-6 text-center">
                                        <p className="text-slate-400 text-sm font-light leading-relaxed">By authorizing this seal, you confirm the allocation of the <span className="text-emerald-500 font-bold uppercase tracking-widest text-[10px]">{room.name}</span> artifact for the specified chronology.</p>
                                        <div className="flex items-center justify-center space-x-3 text-slate-700">
                                            <Lock size={12} className="text-emerald-500 opacity-50" />
                                            <span className="text-[9px] font-black uppercase tracking-widest opacity-50 italic">Digital Signature Verified (v4.2)</span>
                                        </div>
                                    </div>
                                    {error && (
                                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 py-4 px-8 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center">
                                            {error}
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="flex justify-between items-center pt-16 mt-16 border-t border-white/5">
                                {step > 1 ? (
                                    <button onClick={handleBack} className="flex items-center space-x-3 px-8 py-4 rounded-xl border border-white/5 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-white hover:bg-white/5 transition-all">
                                        <ChevronLeft size={16} />
                                        <span>Re-verify Step</span>
                                    </button>
                                ) : <div />}

                                <button
                                    onClick={step === 4 ? handleFinalize : handleNext}
                                    disabled={isLoading}
                                    className={`btn-primary !px-12 !py-5 flex items-center space-x-4 shadow-2xl relative overflow-hidden group/btn ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                                >
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                                        {isLoading ? 'Encrypting Node...' : step === 4 ? 'Authorize Identity Seal' : 'Synchronize Next Step'}
                                    </span>
                                    {!isLoading && <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />}
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Artifact Summary Node */}
                <div className="lg:col-span-5">
                    <div className="sticky top-40 bg-slate-900 shadow-2xl portal-shadow rounded-[3rem] p-12 border border-white/5 space-y-12 overflow-hidden group/summary hover:border-emerald-500/30 transition-all duration-1000">
                        <div className="space-y-6 overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-[60px] -mr-16 -mt-16"></div>
                            <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-2">Ledger Summary</span>
                            <div className="flex items-center space-x-6">
                                <div className="w-20 h-20 rounded-3xl overflow-hidden shadow-2xl border border-white/5 group-hover/summary:emerald-glow transition-all duration-700">
                                    <img
                                        src={room.images?.[0] || 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=400&q=80'}
                                        className="w-full h-full object-cover grayscale-[0.5] group-hover/summary:grayscale-0 transition-all duration-700"
                                        alt="Room Artifact"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-serif text-white italic py-1 leading-none group-hover/summary:text-emerald-400 transition-colors uppercase tracking-[0.05em]">{room.name}</h3>
                                    <div className="flex items-center space-x-2 text-slate-600 mt-2">
                                        <MapPin size={12} className="text-emerald-500/50" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Sunrise Grand Hotel</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8 pt-8 border-t border-white/5">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
                                <span className="text-slate-600">Artifact Tier</span>
                                <span className="text-white">{room.category || 'Elite'}</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
                                <span className="text-slate-600">Inventory Status</span>
                                <span className="text-emerald-500 flex items-center space-x-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                    <span>Allocated Artifact</span>
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
                                <span className="text-slate-600">Settlement Method</span>
                                <span className="text-white capitalize">{paymentMethod === 'card' ? 'Stripe / Credit Artifact' : 'Bank Transfer'}</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
                                <span className="text-slate-600">Digital Tax Protocol</span>
                                <span className="text-slate-400 font-bold tracking-widest">Included</span>
                            </div>
                            <div className="pt-8 border-t border-white/5 flex flex-col items-center justify-center space-y-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-700">Executive Settlement</span>
                                <div className="flex items-baseline space-x-3">
                                    <span className="text-5xl font-bold text-white tracking-tighter shadow-2xl">{totalPrice || room.pricePerNight}</span>
                                    <span className="text-xs text-slate-800 font-black uppercase tracking-widest">ETB Total</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#020617] p-8 rounded-2xl flex items-center space-x-4 border border-white/5 group-hover/summary:border-emerald-500/10 transition-all duration-700">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/5 flex items-center justify-center text-emerald-500">
                                <ShieldCheck size={18} />
                            </div>
                            <div className="space-y-1">
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-600 leading-none">Global Resilience System</p>
                                <p className="text-[10px] font-bold text-emerald-500 tracking-widest uppercase leading-none">Secured Node v4.2</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingFlow;
