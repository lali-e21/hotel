import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Maximize2, Users, Wifi, Coffee, ChevronRight, LayoutGrid, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import useRoomStore from '../store/roomStore';

const Rooms = () => {
    const { t } = useTranslation();
    const { rooms, fetchRooms, isLoading } = useRoomStore();
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchRooms();
    }, [fetchRooms]);

    return (
        <div className="pt-24 bg-[#020617] min-h-screen">
            {/* Banner Section */}
            <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=80"
                        className="w-full h-full object-cover scale-110 opacity-30 blur-sm"
                        alt="Background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 space-y-8">
                    <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full border border-emerald-500/10 bg-emerald-500/5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-emerald-500 uppercase tracking-[0.4em] text-[10px] font-black">Private Sanctuary Collection</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-serif text-white italic tracking-tighter">
                        Architectural <br /> <span className="text-emerald-500 not-italic">Allocation</span>
                    </h1>
                    <div className="p-2 border-b border-white/5 max-w-xs mx-auto"></div>
                </div>
            </section>

            {/* Filter & Inventory Control */}
            <section className="container mx-auto px-6 mb-24 relative z-20">
                <div className="bg-slate-900 shadow-2xl portal-shadow rounded-[2rem] border border-white/5 p-4 flex flex-col md:flex-row items-center justify-between gap-6 max-w-2xl mx-auto overflow-hidden">
                    <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto">
                        {['All', 'Suites', 'Deluxe', 'Executive'].map(c => (
                            <button
                                key={c}
                                onClick={() => setFilter(c.toLowerCase())}
                                className={`px-6 sm:px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${filter === c.toLowerCase() ? 'bg-emerald-500 text-white shadow-xl emerald-glow' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                    <div className="hidden md:flex items-center space-x-4 pr-6 border-l border-white/10 pl-6">
                        <Filter size={14} className="text-slate-600" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Inventory Status</span>
                    </div>
                </div>
            </section>

            {/* Inventory Grid */}
            <section className="pb-40 container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {isLoading ? (
                        [...Array(6)].map((_, i) => (
                            <div key={i} className="card-premium h-[650px] animate-pulse bg-slate-900/50"></div>
                        ))
                    ) : (
                        rooms.map((room) => (
                            <motion.div
                                key={room._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="group h-full"
                            >
                                <Link to={`/rooms/${room._id}`} className="block card-premium h-full flex flex-col group relative overflow-hidden">
                                    {/* Availability Protocol Icon */}
                                    <div className="absolute top-8 right-8 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                        <div className="w-12 h-12 rounded-full bg-emerald-500 text-white shadow-2xl emerald-glow flex items-center justify-center">
                                            <Maximize2 size={16} />
                                        </div>
                                    </div>

                                    <div className="relative h-[400px] overflow-hidden">
                                        <img
                                            src={room.images[0] || 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80'}
                                            alt={room.name}
                                            className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110 ease-out grayscale-[0.5] group-hover:grayscale-0"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent opacity-90"></div>
                                        <div className="absolute bottom-10 left-10 space-y-2">
                                            <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-2">{room.category || 'Elite Artifact'}</span>
                                            <h3 className="text-4xl font-serif text-white group-hover:text-emerald-400 transition-colors italic leading-none">{room.name}</h3>
                                        </div>
                                    </div>

                                    <div className="p-10 flex-grow flex flex-col space-y-8">
                                        <p className="text-slate-500 text-sm font-light leading-relaxed mb-6 line-clamp-3">
                                            {room.description}
                                        </p>

                                        <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                                            <div className="space-y-1">
                                                <span className="block text-[10px] text-slate-600 font-black uppercase tracking-widest">Digital Allocation Rate</span>
                                                <span className="text-2xl font-bold text-white tracking-widest">{room.pricePerNight} <span className="text-xs text-slate-500 uppercase">ETB/N</span></span>
                                            </div>
                                            <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-700 shadow-xl group-hover:emerald-glow translate-x-4">
                                                <ChevronRight size={24} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
};

export default Rooms;
