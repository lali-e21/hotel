import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, Sparkles, ShieldCheck, Globe } from 'lucide-react';
import { useEffect } from 'react';
import useRoomStore from '../store/roomStore';

const Home = () => {
    const { t } = useTranslation();
    const { rooms, fetchRooms, isLoading } = useRoomStore();

    useEffect(() => {
        fetchRooms();
    }, []);

    return (
        <div className="flex flex-col bg-[#020617] text-slate-200">
            {/* Hero Section */}
            <section className="relative h-[95vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=80"
                        alt="Hotel Lobby"
                        className="w-full h-full object-cover scale-105 opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/20 via-[#020617]/60 to-[#020617]"></div>
                </div>

                <div className="container mx-auto px-6 z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-md">
                            <Sparkles size={12} className="text-emerald-400" />
                            <span className="text-emerald-400 uppercase tracking-[0.4em] text-[10px] font-black">
                                Now Unveiling The Future of Luxury
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-6xl md:text-9xl font-serif text-white leading-[0.9] max-w-5xl mx-auto text-balance tracking-tighter italic">
                            {t('hero.title')}
                        </h1>
                        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                            {t('hero.subtitle')}
                        </p>
                        <div className="pt-10 flex flex-col md:flex-row items-center justify-center gap-6">
                            <Link to="/rooms" className="btn-primary !px-12 !py-6 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                                {t('hero.cta')}
                            </Link>
                            <Link to="/gallery" className="text-[10px] font-black uppercase tracking-[0.3em] text-white hover:text-emerald-400 transition-colors flex items-center space-x-3">
                                <span>Visual Artifacts</span>
                                <ChevronRight size={14} />
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#020617] to-transparent z-10"></div>
            </section>

            {/* Philosophy Section */}
            <section className="py-24 md:py-40 bg-[#020617] relative overflow-hidden">
                <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div className="space-y-10">
                            <div className="space-y-4">
                                <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em]">Our Legacy Protocol</span>
                                <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight italic">
                                    Synthesized <br />
                                    <span className="text-emerald-500 not-italic">Ethiopian</span> Excellence
                                </h1>
                            </div>
                            <p className="text-slate-400 leading-relaxed text-xl font-light max-w-xl">
                                Sunrise Grand Hotel is an architectural anomaly in the heart of Addis Ababa.
                                We've re-engineered the hospitality experience through a lens of deep-slate aesthetics and emerald-grade service.
                            </p>
                            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                                <div className="space-y-2">
                                    <span className="text-2xl font-serif text-emerald-500">150+</span>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Bespoke Residencies</p>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-2xl font-serif text-emerald-500">Michelin</span>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Standard Dining</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="rounded-[3rem] overflow-hidden aspect-[4/5] shadow-2xl portal-shadow border border-white/5">
                                <img
                                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
                                    alt="Hotel Exterior"
                                    className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-emerald-500 rounded-[2rem] hidden md:flex flex-col items-center justify-center p-8 text-white shadow-2xl emerald-glow">
                                <ShieldCheck size={32} className="mb-4" />
                                <p className="text-[10px] font-black uppercase tracking-widest text-center leading-relaxed">
                                    Vaulted Security Standards
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Curated Collection */}
            <section className="py-24 md:py-40 bg-[#0b0f1a] relative">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-24 space-y-6 md:space-y-0">
                        <div className="space-y-4">
                            <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em]">The Registry</span>
                            <h2 className="text-5xl md:text-6xl font-serif text-white italic">{t('rooms.title')}</h2>
                        </div>
                        <Link to="/rooms" className="text-[10px] font-black tracking-[0.4em] text-slate-500 hover:text-emerald-400 transition-colors uppercase">
                            Access Full Collection →
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {isLoading ? (
                            [...Array(3)].map((_, i) => (
                                <div key={i} className="card-premium h-[600px] animate-pulse bg-slate-900/50"></div>
                            ))
                        ) : (
                            rooms.slice(0, 3).map((room) => (
                                <motion.div
                                    key={room._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="group"
                                >
                                    <Link to={`/rooms/${room._id}`} className="block card-premium overflow-hidden group">
                                        <div className="relative h-96 overflow-hidden">
                                            <img
                                                src={room.images[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'}
                                                alt={room.name}
                                                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent opacity-80"></div>
                                            <div className="absolute top-8 left-8 bg-emerald-500 text-white px-4 py-1.5 rounded-full shadow-2xl">
                                                <span className="text-[9px] font-black uppercase tracking-widest">Available Artifact</span>
                                            </div>
                                        </div>
                                        <div className="p-10 space-y-6 flex-grow flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-3xl font-serif text-white mb-2 italic group-hover:text-emerald-400 transition-colors">{room.name}</h3>
                                                <p className="text-slate-500 text-sm font-light leading-relaxed line-clamp-2">
                                                    {room.description}
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-between pt-8 border-t border-white/5">
                                                <div className="space-y-1">
                                                    <span className="block text-[10px] text-slate-600 font-black uppercase tracking-widest">Allocation Rate</span>
                                                    <span className="text-xl font-bold text-white">{room.pricePerNight} <span className="text-xs text-slate-500">ETB/N</span></span>
                                                </div>
                                                <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 shadow-xl group-hover:emerald-glow">
                                                    <ChevronRight size={24} />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
