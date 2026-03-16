import { motion } from 'framer-motion';
import { User, Calendar, CreditCard, Clock, LogOut, ShieldCheck, MapPin, Sparkles, ChevronRight } from 'lucide-react';
import useAuthStore from '../store/authStore';
import useBookingStore from '../store/bookingStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user, logout } = useAuthStore();
    const { myBookings, fetchMyBookings, isLoading } = useBookingStore();
    const navigate = useNavigate();

    useEffect(() => {
        fetchMyBookings();
    }, [fetchMyBookings]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="pt-40 pb-32 bg-[#020617] min-h-screen">
            <div className="container mx-auto px-6 max-w-6xl">
                {/* Header Profile Protocol */}
                <div className="bg-slate-900/50 backdrop-blur-3xl rounded-[3rem] p-12 shadow-2xl portal-shadow border border-white/5 flex flex-col md:flex-row items-center md:justify-between space-y-10 md:space-y-0 relative overflow-hidden mb-16 group transition-all duration-700 hover:border-emerald-500/20">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] -mr-32 -mt-32 opacity-30"></div>

                    <div className="flex items-center space-x-10 relative z-10">
                        <div className="w-28 h-28 rounded-[2.5rem] bg-emerald-500 text-white flex items-center justify-center font-serif text-4xl italic font-bold shadow-2xl emerald-glow border border-white/10">
                            {user?.name?.charAt(0)}
                        </div>
                        <div className="space-y-3">
                            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400">
                                <Sparkles size={10} />
                                <span className="text-[9px] font-black uppercase tracking-widest">Authenticated Legacy Member</span>
                            </div>
                            <h1 className="text-5xl font-serif text-white italic tracking-tighter">{user?.name}</h1>
                            <div className="flex items-center space-x-6 text-slate-500">
                                <div className="flex items-center space-x-2">
                                    <Clock size={12} className="text-emerald-500/50" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Protocol Active / node_v4.2</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10">
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-3 px-10 py-5 rounded-2xl border border-white/5 bg-white/5 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all duration-500 group shadow-xl"
                        >
                            <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
                            <span>Terminate Authentication</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Stats Sidebar Protocol */}
                    <div className="lg:col-span-1 space-y-10">
                        <div className="bg-slate-900/80 p-10 rounded-[2.5rem] border border-white/5 shadow-2xl portal-shadow space-y-10">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Identity Vault Metrics</h3>
                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Digital Registry</span>
                                    <p className="text-sm font-medium text-slate-200 tracking-wide">{user?.email}</p>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Physical Protocol</span>
                                    <p className="text-sm font-medium text-slate-200 tracking-wide">{user?.phone || 'Access Restricted'}</p>
                                </div>
                            </div>
                            <div className="pt-10 border-t border-white/5 flex items-center space-x-4 text-emerald-500/50">
                                <ShieldCheck size={16} className="text-emerald-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 group-hover:text-emerald-400">Identity Artifacts Vaulted</span>
                            </div>
                        </div>

                        <div className="bg-emerald-500/5 border border-emerald-500/10 p-10 rounded-[2.5rem] space-y-4">
                            <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Legacy Tip</span>
                            <p className="text-xs text-slate-400 font-light leading-relaxed">
                                Monitor your architectural allocation status regularly for the upcoming festival nodes.
                            </p>
                        </div>
                    </div>

                    {/* Recent Activities Archive */}
                    <div className="lg:col-span-2 space-y-12">
                        <div className="flex justify-between items-end mb-4 border-b border-white/5 pb-8">
                            <div className="space-y-2">
                                <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em]">The Ledger</span>
                                <h2 className="text-4xl font-serif text-white italic tracking-tighter">Reservation Archive</h2>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">{myBookings?.length || 0} Record Artifacts</span>
                        </div>

                        {isLoading ? (
                            <div className="space-y-8">
                                {[1, 2].map(i => (
                                    <div key={i} className="h-44 bg-slate-900 shadow-2xl rounded-[2rem] animate-pulse border border-white/5"></div>
                                ))}
                            </div>
                        ) : myBookings?.length > 0 ? (
                            <div className="space-y-8">
                                {myBookings.map((booking) => (
                                    <motion.div
                                        key={booking._id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-slate-900/50 p-10 rounded-[3rem] border border-white/5 shadow-2xl portal-shadow hover:shadow-emerald-500/5 hover:border-emerald-500/20 transition-all duration-700 group hover:translate-x-2"
                                    >
                                        <div className="flex flex-col md:flex-row justify-between md:items-center space-y-10 md:space-y-0">
                                            <div className="flex items-center space-x-10">
                                                <div className="w-20 h-20 rounded-3xl bg-emerald-500/5 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-700 shadow-xl border border-emerald-500/10 group-hover:emerald-glow">
                                                    <Calendar size={32} />
                                                </div>
                                                <div className="space-y-2">
                                                    <h4 className="text-2xl font-serif font-bold text-white italic leading-none group-hover:text-emerald-400 transition-colors uppercase tracking-[0.05em]">{booking.room?.name || 'Architectural Suite'}</h4>
                                                    <div className="flex items-center space-x-3">
                                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Chrono:</span>
                                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{booking.checkIn} — {booking.checkOut}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-12">
                                                <div className="text-right">
                                                    <span className="block text-[10px] text-slate-600 font-black uppercase tracking-widest mb-1">Settlement</span>
                                                    <span className="text-2xl font-bold text-white tracking-widest">{booking.totalPrice} <span className="text-xs text-slate-500">ETB</span></span>
                                                </div>
                                                <div className={`px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-xl ${booking.status === 'confirmed' ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-slate-800 text-slate-400 shadow-slate-900/50'}`}>
                                                    {booking.status}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-slate-900 p-24 text-center rounded-[4rem] border border-dashed border-white/5 space-y-10">
                                <div className="w-24 h-24 bg-white/5 rounded-full mx-auto flex items-center justify-center text-slate-700">
                                    <Calendar size={48} />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-serif text-white italic">Zero Ledger Entries Founding.</h3>
                                    <p className="text-slate-500 font-light max-w-sm mx-auto leading-relaxed">
                                        Your architectural footprint at Sunrise Grand has yet to be authored.
                                    </p>
                                </div>
                                <button
                                    onClick={() => navigate('/rooms')}
                                    className="btn-primary !px-16 shadow-2xl shadow-emerald-500/10"
                                >
                                    Browse the Inventory
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
