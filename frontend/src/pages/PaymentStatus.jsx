import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, Clock, FileText, ArrowRight, ShieldCheck, Download, Gem, RefreshCw, Zap, Terminal, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useBookingStore from '../store/bookingStore';

const PaymentStatus = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { bookingReference, resetBooking } = useBookingStore();
    const [status, setStatus] = useState('pending');

    useEffect(() => {
        const paymentStatus = searchParams.get('status') || 'success';
        setStatus(paymentStatus);
    }, [searchParams]);

    const handleDone = () => {
        resetBooking();
        navigate('/');
    };

    return (
        <div className="pt-32 pb-24 min-h-screen bg-[#020617] flex items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl w-full bg-slate-900 shadow-2xl portal-shadow rounded-[3rem] border border-white/5 p-12 md:p-16 text-center space-y-12 relative overflow-hidden group hover:border-emerald-500/20 transition-all duration-1000"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] -mr-32 -mt-32 opacity-30 group-hover:opacity-50 transition-opacity"></div>

                <AnimatePresence mode="wait">
                    {status === 'success' ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-12"
                        >
                            <div className="relative inline-block">
                                <div className="w-24 h-24 bg-[#020617] text-emerald-500 rounded-[2rem] border border-emerald-500/20 flex items-center justify-center mx-auto shadow-2xl relative z-10 emerald-glow">
                                    <Gem size={40} />
                                </div>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                                    className="absolute inset-0 border-2 border-dashed border-emerald-500/20 rounded-[2.5rem] -m-6"
                                ></motion.div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-4xl font-serif text-white italic tracking-tighter transition-colors group-hover:text-emerald-400">Reservation Secured</h2>
                                <p className="text-slate-500 font-light max-w-sm mx-auto text-sm leading-relaxed">Your architectural residency at Sunrise Grand has been officially recorded in our ledger protocols.</p>
                            </div>

                            <div className="bg-[#020617] p-8 rounded-[2rem] text-left space-y-6 border border-white/5 group-hover:border-emerald-500/10 transition-all">
                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-700">
                                    <span>Digital Reference</span>
                                    <span className="font-mono font-black text-emerald-500">{bookingReference || 'SGH_PENDING'}</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-700">
                                    <span>Settlement Status</span>
                                    <span className="font-bold text-emerald-500 tracking-widest">Confirmed</span>
                                </div>
                                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-slate-800">
                                    <div className="flex items-center space-x-2">
                                        <Zap size={10} className="text-emerald-500" />
                                        <span className="text-[9px] font-black uppercase tracking-widest italic">Node Sync Successful</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-center space-x-4 text-emerald-500/50">
                                <ShieldCheck size={16} className="text-emerald-500" />
                                <span className="text-[9px] font-black uppercase tracking-[0.4em]">Transaction Vaulted // AES-256</span>
                            </div>
                        </motion.div>
                    ) : status === 'failed' ? (
                        <motion.div
                            key="failed"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-12"
                        >
                            <div className="w-24 h-24 bg-red-500/10 text-red-500 rounded-[2.5rem] flex items-center justify-center mx-auto border border-red-500/20 shadow-2xl shadow-red-500/10">
                                <XCircle size={40} />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-4xl font-serif text-white italic tracking-tighter transition-colors hover:text-red-400 cursor-default">Terminal Disruption</h2>
                                <p className="text-slate-500 font-light max-w-sm mx-auto text-sm leading-relaxed">The financial infrastructure encountered an anomaly during settlement. No funds were captured during this protocol attempt.</p>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="pending"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-12"
                        >
                            <div className="w-24 h-24 bg-[#020617] text-slate-800 rounded-[2.5rem] flex items-center justify-center mx-auto border border-white/5 overflow-hidden relative shadow-2xl">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                    className="text-emerald-500/50"
                                >
                                    <RefreshCw size={40} />
                                </motion.div>
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-4xl font-serif text-white italic tracking-tighter animate-pulse">Verifying Token</h2>
                                <p className="text-slate-500 font-light max-w-sm mx-auto text-sm leading-relaxed uppercase tracking-widest text-[9px] font-black opacity-50">Synchronizing with global financial nodes to confirm your architectural allocation.</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex flex-col space-y-4 pt-12 border-t border-white/5">
                    <button
                        onClick={() => window.print()}
                        className="flex items-center justify-center space-x-4 py-5 bg-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-slate-700 rounded-2xl border border-white/5 hover:bg-white/10 hover:text-white transition-all group overflow-hidden relative shadow-xl"
                    >
                        <Download size={16} className="group-hover:-translate-y-0.5 transition-transform" />
                        <span>Export Credentials Artifact</span>
                    </button>
                    <button
                        onClick={handleDone}
                        className="btn-primary !py-6 flex items-center justify-center space-x-4 shadow-[0_0_50px_rgba(16,185,129,0.1)] group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] relative z-10">Return to Grand Lobby Portal</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform relative z-10" />
                    </button>
                </div>

                <div className="flex items-center justify-center space-x-4 pt-4 opacity-50">
                    <Terminal size={14} className="text-slate-800" />
                    <span className="text-[8px] font-black uppercase tracking-[0.5em] text-slate-800">SGH_TERMINAL_V4.2 // SECURITY_CLEARANCE_ALPHA</span>
                    <Activity size={14} className="text-slate-800" />
                </div>
            </motion.div>
        </div>
    );
};

export default PaymentStatus;
