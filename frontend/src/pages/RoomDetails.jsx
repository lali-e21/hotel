import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Users,
    Maximize2,
    Wifi,
    Coffee,
    Star,
    ChevronRight,
    Calendar,
    ShieldCheck,
    CreditCard,
    Sparkles,
    ArrowRight,
    MapPin,
    Clock,
    Gem
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useRoomStore from '../store/roomStore';
import useBookingStore from '../store/bookingStore';
import useAuthStore from '../store/authStore';

const RoomDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { rooms, fetchRooms, isLoading: isRoomLoading } = useRoomStore();
    const { setRoom, setDates } = useBookingStore();
    const { isAuthenticated } = useAuthStore();

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');

    const room = rooms.find((r) => r._id === id);

    useEffect(() => {
        if (rooms.length === 0) fetchRooms();
    }, [rooms.length, fetchRooms]);

    const handleBookingStart = () => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: { pathname: `/rooms/${id}` } } });
            return;
        }
        if (!checkIn || !checkOut) {
            alert('Please select allocation dates protocol.');
            return;
        }
        setRoom(room);
        setDates(checkIn, checkOut);
        navigate('/booking');
    };

    if (isRoomLoading || !room) {
        return (
            <div className="pt-40 pb-24 bg-[#020617] min-h-screen flex items-center justify-center">
                <div className="w-20 h-20 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-32 bg-[#020617]">
            {/* Immersive Gallery Mask */}
            <section className="relative h-[80vh] overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={room.images[0] || 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=82'}
                        className="w-full h-full object-cover transition-transform duration-[4s] hover:scale-105"
                        alt={room.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent"></div>
                </div>

                <div className="container mx-auto px-6 h-full flex flex-col justify-end pb-24 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 backdrop-blur-md">
                            <Sparkles size={12} className="text-emerald-400" />
                            <span className="text-emerald-400 uppercase tracking-[0.4em] text-[10px] font-black">Archive Identity: SGH_{room._id.slice(-6)}</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-serif text-white italic tracking-tighter leading-none">{room.name}</h1>
                        <div className="flex items-center space-x-8 text-slate-400">
                            <div className="flex items-center space-x-3">
                                <Maximize2 size={16} className="text-emerald-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest leading-none pt-1">{room.size || '450 SQ FT'} of Pure Architecture</span>
                            </div>
                            <div className="flex items-center space-x-3 border-l border-white/10 pl-8">
                                <Users size={16} className="text-emerald-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest leading-none pt-1">Capacity: {room.capacity} Inhabitants</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="container mx-auto px-6 mt-[-100px] relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Architectural Description */}
                    <div className="lg:col-span-7 space-y-16">
                        <div className="bg-slate-900 shadow-2xl portal-shadow rounded-[3rem] p-12 md:p-16 border border-white/5 space-y-10 group hover:border-emerald-500/20 transition-all duration-700">
                            <div className="space-y-4">
                                <h2 className="text-4xl font-serif text-white italic tracking-tighter group-hover:text-emerald-400 transition-colors">Manifesto</h2>
                                <p className="text-slate-500 leading-relaxed text-lg font-light">
                                    {room.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-white/5">
                                {[
                                    { icon: Wifi, label: 'GIGA_NET' },
                                    { icon: Coffee, label: 'ORIGIN_ETH' },
                                    { icon: ShieldCheck, label: 'VAULTED' },
                                    { icon: MapPin, label: 'CORE_CBD' }
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col items-center space-y-3 group/item">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-emerald-500 group-hover/item:bg-emerald-500 group-hover/item:text-white transition-all duration-500 shadow-xl border border-white/5">
                                            <item.icon size={20} />
                                        </div>
                                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-600">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Visual Artifacts Grid */}
                        <div className="grid grid-cols-2 gap-8">
                            {[1, 2].map((i) => (
                                <div key={i} className="rounded-[2.5rem] overflow-hidden aspect-video border border-white/5 group shadow-2xl portal-shadow">
                                    <img
                                        src={room.images[i] || `https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80`}
                                        alt="Artifact Detail"
                                        className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Booking Terminal */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-40 bg-slate-900 shadow-2xl portal-shadow rounded-[3rem] p-12 border border-white/5 space-y-10 group/terminal hover:border-emerald-500/30 transition-all duration-1000 overflow-hidden">
                            {/* Decorative Glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-[60px] -mr-16 -mt-16"></div>

                            <div className="space-y-4">
                                <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-2">Pricing Protocol</span>
                                <div className="flex items-baseline space-x-2">
                                    <span className="text-5xl font-bold text-white tracking-tighter">{room.pricePerNight}</span>
                                    <span className="text-xs text-slate-600 font-black uppercase tracking-widest">ETB / Digital Cycle</span>
                                </div>
                                <div className="flex items-center space-x-3 text-emerald-500/50">
                                    <ShieldCheck size={14} />
                                    <span className="text-[9px] font-black uppercase tracking-widest opacity-80">Rate Guaranteed on SGH_Node_v4.2</span>
                                </div>
                            </div>

                            <div className="space-y-8 pt-8 border-t border-white/5">
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-600 ml-4">Entry Protocol</label>
                                        <div className="relative flex items-center">
                                            <Calendar className="absolute left-6 text-slate-700" size={16} />
                                            <input
                                                type="date"
                                                value={checkIn}
                                                onChange={(e) => setCheckIn(e.target.value)}
                                                className="w-full bg-[#020617] border border-white/5 rounded-2xl py-5 px-14 text-[10px] uppercase font-bold tracking-widest text-white focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-600 ml-4">Exit Protocol</label>
                                        <div className="relative flex items-center">
                                            <Calendar className="absolute left-6 text-slate-700" size={16} />
                                            <input
                                                type="date"
                                                value={checkOut}
                                                onChange={(e) => setCheckOut(e.target.value)}
                                                className="w-full bg-[#020617] border border-white/5 rounded-2xl py-5 px-14 text-[10px] uppercase font-bold tracking-widest text-white focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleBookingStart}
                                    className="w-full btn-primary !py-6 flex items-center justify-center space-x-4 shadow-2xl relative overflow-hidden group/btn"
                                >
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Initialize Allocation</span>
                                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>

                                <div className="text-center">
                                    <p className="text-[9px] font-bold text-slate-700 uppercase tracking-widest italic group-hover/terminal:text-slate-500 transition-colors">
                                        "Excellence is not an act, but a habits_protocol"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RoomDetails;
