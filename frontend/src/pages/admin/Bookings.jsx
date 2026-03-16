import { useEffect, useState } from 'react';
import { Search, Filter, MoreVertical, CheckCircle, XCircle, Clock, Calendar, User, Hash, ChevronRight, LayoutGrid, List, ShieldCheck, Activity, Terminal, ArrowRight, UserCheck, LogOut, Check } from 'lucide-react';
import useAdminStore from '../../store/adminStore';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

const AdminBookings = () => {
    const { bookings, fetchBookings, updateBookingStatus, isLoading } = useAdminStore();
    const [filter, setFilter] = useState('All');
    const [viewMode, setViewMode] = useState('table');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    const handleStatusUpdate = async (id, status) => {
        try {
            await updateBookingStatus(id, status);
            fetchBookings();
        } catch (error) {
            console.error('Status modulation anomaly:', error);
        }
    };

    const getStatusStyles = (status) => {
        switch (status?.toLowerCase()) {
            case 'confirmed': return 'border-emerald-500/20 bg-emerald-500/5 text-emerald-500 shadow-xl emerald-glow';
            case 'pending': return 'border-amber-500/20 bg-amber-500/5 text-amber-500 shadow-xl';
            case 'cancelled': return 'border-red-500/20 bg-red-500/5 text-red-500 shadow-xl';
            case 'checked-in': return 'border-blue-500/20 bg-blue-500/5 text-blue-500 shadow-xl';
            case 'checked-out': return 'border-slate-500/20 bg-slate-500/5 text-slate-500 shadow-xl';
            default: return 'border-slate-800 bg-slate-900 text-slate-600 shadow-xl';
        }
    };

    const displayBookings = (bookings || []).filter(booking =>
        (booking.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.bookingReference?.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filter === 'All' || booking.status === filter)
    );

    return (
        <div className="space-y-12">
            {/* Header Terminal */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                <div className="space-y-3">
                    <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em]">Proprietor Reservation Archive</span>
                    <h1 className="text-5xl font-serif text-white italic tracking-tighter leading-none transition-colors">Occupancy <br /> <span className="text-emerald-500 not-italic uppercase tracking-widest text-4xl">Ledger</span></h1>
                    <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest">Real-time Allocation Flow / node_v4.2</p>
                </div>
                <div className="flex items-center bg-slate-900 p-2 rounded-2xl border border-white/5 shadow-2xl portal-shadow">
                    <button
                        onClick={() => setViewMode('table')}
                        className={`p-4 rounded-xl transition-all duration-500 ${viewMode === 'table' ? 'bg-emerald-500 text-white shadow-xl emerald-glow' : 'text-slate-500 hover:text-white'}`}
                    >
                        <List size={18} />
                    </button>
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-4 rounded-xl transition-all duration-500 ${viewMode === 'grid' ? 'bg-emerald-500 text-white shadow-xl emerald-glow' : 'text-slate-500 hover:text-white'}`}
                    >
                        <LayoutGrid size={18} />
                    </button>
                </div>
            </div>

            {/* Filter & Search Protocol Bar */}
            <div className="flex flex-col xl:flex-row gap-6">
                <div className="flex-grow flex bg-slate-900 p-2 rounded-[2.5rem] border border-white/5 shadow-2xl portal-shadow overflow-x-auto no-scrollbar">
                    {['All', 'Pending', 'Confirmed', 'Checked-in', 'Checked-out', 'Cancelled'].map((s) => (
                        <button
                            key={s}
                            onClick={() => setFilter(s)}
                            className={`px-10 py-4 rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all duration-500 ${filter === s ? 'bg-emerald-500 text-white shadow-xl emerald-glow' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
                <div className="relative flex-grow max-w-md group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-emerald-500 transition-colors" size={16} />
                    <input
                        type="text"
                        placeholder="Search Artifact Ref or Inhabitant..."
                        className="w-full pl-16 pr-8 py-5 rounded-[2rem] border border-white/5 bg-slate-900 focus:bg-[#020617] focus:border-emerald-500 outline-none text-[11px] font-bold uppercase tracking-widest text-white transition-all shadow-2xl portal-shadow placeholder-slate-800"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Content Protocol Area */}
            {viewMode === 'table' ? (
                <div className="bg-slate-900/50 backdrop-blur-3xl rounded-[3rem] border border-white/5 shadow-2xl portal-shadow overflow-hidden group/ledger hover:border-emerald-500/10 transition-all duration-1000">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="px-12 py-10 text-[10px] font-black text-slate-700 uppercase tracking-widest leading-none">Inhabitant Profile</th>
                                <th className="px-12 py-10 text-[10px] font-black text-slate-700 uppercase tracking-widest leading-none">Architectural Allocation</th>
                                <th className="px-12 py-10 text-[10px] font-black text-slate-700 uppercase tracking-widest leading-none">Registry Ref ID</th>
                                <th className="px-12 py-10 text-[10px] font-black text-slate-700 uppercase tracking-widest leading-none">Temporal Window</th>
                                <th className="px-12 py-10 text-[10px] font-black text-slate-700 uppercase tracking-widest leading-none">Status State</th>
                                <th className="px-12 py-10 text-[10px] font-black text-slate-700 uppercase tracking-widest text-right leading-none">Modulation</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {displayBookings.map((booking) => (
                                <tr key={booking._id} className="group hover:bg-emerald-500/5 transition-all duration-500">
                                    <td className="px-12 py-10">
                                        <div className="flex items-center space-x-6">
                                            <div className="w-14 h-14 rounded-2xl bg-[#020617] border border-white/5 flex items-center justify-center text-slate-700 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-700 shadow-xl group-hover:emerald-glow">
                                                <User size={18} />
                                            </div>
                                            <div className="flex flex-col space-y-1">
                                                <span className="text-lg font-serif italic text-white leading-tight group-hover:text-emerald-400 transition-colors uppercase tracking-[0.05em]">{booking.user?.name}</span>
                                                <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest font-bold mt-0.5">{booking.user?.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-12 py-10">
                                        <div className="flex items-center space-x-3 text-white">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                            <span className="text-[11px] font-bold uppercase tracking-widest">{booking.room?.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-12 py-10">
                                        <div className="flex items-center space-x-3">
                                            <Hash size={14} className="text-emerald-500/50" />
                                            <span className="text-[11px] font-mono font-black text-emerald-500/40 uppercase tracking-widest">{booking.bookingReference}</span>
                                        </div>
                                    </td>
                                    <td className="px-12 py-10 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                                        {format(new Date(booking.checkIn), 'dd MMM yyyy')} <br />
                                        <span className="text-slate-700">TO</span> <br />
                                        {format(new Date(booking.checkOut), 'dd MMM yyyy')}
                                    </td>
                                    <td className="px-12 py-10">
                                        <div className={`px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest border text-center ${getStatusStyles(booking.status)}`}>
                                            {booking.status}
                                        </div>
                                    </td>
                                    <td className="px-12 py-10 text-right">
                                        <div className="flex justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {booking.status === 'Pending' && (
                                                <button onClick={() => handleStatusUpdate(booking._id, 'Confirmed')} className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all shadow-xl hover:emerald-glow" title="Confirm Reservation">
                                                    <Check size={16} />
                                                </button>
                                            )}
                                            {booking.status === 'Confirmed' && (
                                                <button onClick={() => handleStatusUpdate(booking._id, 'Checked-in')} className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 hover:bg-blue-500 hover:text-white transition-all shadow-xl" title="Protocol Check-in">
                                                    <UserCheck size={16} />
                                                </button>
                                            )}
                                            {booking.status === 'Checked-in' && (
                                                <button onClick={() => handleStatusUpdate(booking._id, 'Checked-out')} className="w-10 h-10 rounded-xl bg-slate-500/10 border border-slate-500/20 flex items-center justify-center text-slate-500 hover:bg-slate-500 hover:text-white transition-all shadow-xl" title="Protocol Check-out">
                                                    <LogOut size={16} />
                                                </button>
                                            )}
                                            {['Pending', 'Confirmed'].includes(booking.status) && (
                                                <button onClick={() => handleStatusUpdate(booking._id, 'Cancelled')} className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-xl" title="Abort Protocol">
                                                    <XCircle size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                    {displayBookings.map((booking) => (
                        <motion.div
                            key={booking._id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-slate-900/50 p-10 rounded-[3rem] border border-white/5 shadow-2xl portal-shadow hover:shadow-emerald-500/5 hover:border-emerald-500/20 transition-all group relative overflow-hidden h-full flex flex-col justify-between"
                        >
                            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-[80px] -mr-24 -mt-24 opacity-30"></div>

                            <div className="flex justify-between items-start mb-10">
                                <div className="w-16 h-16 rounded-[1.5rem] bg-[#020617] border border-white/5 flex items-center justify-center text-slate-700 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-700 shadow-xl group-hover:emerald-glow">
                                    <User size={24} />
                                </div>
                                <div className={`px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusStyles(booking.status)}`}>
                                    {booking.status}
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-3xl font-serif text-white italic py-1 leading-none group-hover:text-emerald-400 transition-colors uppercase tracking-[0.05em]">{booking.user?.name}</h3>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mt-2">{booking.user?.email}</p>
                                </div>

                                <div className="space-y-4 pt-10 border-t border-white/5">
                                    <div className="flex justify-between items-center bg-[#020617] p-4 rounded-xl border border-white/5">
                                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-700">Allocation</span>
                                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">{booking.room?.name}</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-[#020617] p-4 rounded-xl border border-white/5">
                                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-700">Chrono Window</span>
                                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">{format(new Date(booking.checkIn), 'dd MMM')} — {format(new Date(booking.checkOut), 'dd MMM')}</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-[#020617] p-4 rounded-xl border border-white/5">
                                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-700">Registry ID</span>
                                        <span className="text-[10px] font-mono font-black text-emerald-500 tracking-widest">{booking.bookingReference}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex space-x-3 mt-10">
                                {booking.status === 'Pending' && (
                                    <button onClick={() => handleStatusUpdate(booking._id, 'Confirmed')} className="flex-grow py-5 rounded-2xl bg-emerald-500 text-white text-[10px] font-black uppercase tracking-[0.3em] shadow-xl emerald-glow transition-all hover:bg-emerald-600 active:scale-95">
                                        Confirm
                                    </button>
                                )}
                                {booking.status === 'Confirmed' && (
                                    <button onClick={() => handleStatusUpdate(booking._id, 'Checked-in')} className="flex-grow py-5 rounded-2xl bg-blue-500 text-white text-[10px] font-black uppercase tracking-[0.3em] shadow-xl transition-all hover:bg-blue-600 active:scale-95">
                                        Check-in
                                    </button>
                                )}
                                {booking.status === 'Checked-in' && (
                                    <button onClick={() => handleStatusUpdate(booking._id, 'Checked-out')} className="flex-grow py-5 rounded-2xl bg-slate-800 text-white text-[10px] font-black uppercase tracking-[0.3em] shadow-xl transition-all hover:bg-slate-700 active:scale-95">
                                        Check-out
                                    </button>
                                )}
                                {['Pending', 'Confirmed'].includes(booking.status) && (
                                    <button onClick={() => handleStatusUpdate(booking._id, 'Cancelled')} className="aspect-square w-16 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center transition-all hover:bg-red-500 hover:text-white">
                                        <XCircle size={20} />
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Terminal Status Protocol */}
            <div className="flex items-center justify-center space-x-6 pt-12 border-t border-white/5">
                <div className="flex items-center space-x-3 text-emerald-500/50">
                    <ShieldCheck size={16} className="text-emerald-500" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Protocol Node Operational</span>
                </div>
                <div className="w-px h-10 bg-white/5"></div>
                <div className="flex items-center space-x-3 text-slate-700">
                    <Terminal size={16} />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Proprietor Terminal v4.2 // SSL_VAULTED</span>
                </div>
            </div>
        </div>
    );
};

export default AdminBookings;
