import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
    Utensils, Waves, Dumbbell, Coffee, Martini, Sparkles,
    ChevronRight, Zap, Target, Globe, Car, Briefcase
} from 'lucide-react';
import { Link } from 'react-router-dom';
import useServiceStore from '../store/serviceStore';

const Services = () => {
    const { t } = useTranslation();
    const { services, fetchServices } = useServiceStore();

    useEffect(() => {
        fetchServices();
    }, [fetchServices]);

    const icons = {
        Utensils, Waves, Dumbbell, Coffee, Martini, Sparkles, Globe, Car, Briefcase
    };

    return (
        <div className="pt-24 bg-[#020617] min-h-screen">
            {/* Services Banner */}
            <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
                        className="w-full h-full object-cover scale-110 opacity-30 blur-sm"
                        alt="Services Hero"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 space-y-8">
                    <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full border border-emerald-500/10 bg-emerald-500/5">
                        <Sparkles size={12} className="text-emerald-500" />
                        <span className="text-emerald-500 uppercase tracking-[0.4em] text-[10px] font-black">Amenity Infrastructure Profile</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-serif text-white italic tracking-tighter">
                        Executive <br /> <span className="text-emerald-500 not-italic">Protocols</span>
                    </h1>
                </div>
            </section>

            {/* Services Collection */}
            <section className="pb-40 container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {services.map((service, i) => {
                        const Icon = icons[service.icon] || Sparkles;
                        return (
                            <motion.div
                                key={service._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group"
                            >
                                <div className="block card-premium flex flex-col group relative overflow-hidden h-[750px] hover:border-emerald-500/20 transition-all duration-1000">
                                    <div className="relative h-[450px] overflow-hidden">
                                        <img
                                            src={service.image || 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80'}
                                            alt={service.name}
                                            className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110 ease-out grayscale-[0.4] group-hover:grayscale-0"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent opacity-90"></div>
                                        <div className="absolute bottom-10 left-10 flex items-center space-x-6">
                                            <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-2xl emerald-glow border border-white/10 group-hover:scale-110 transition-transform duration-700">
                                                <Icon size={28} />
                                            </div>
                                            <div>
                                                <h3 className="text-4xl font-serif text-white group-hover:text-emerald-400 transition-colors italic leading-none">{service.name}</h3>
                                                <p className="text-emerald-500/50 text-[10px] font-black uppercase tracking-widest mt-2 flex items-center space-x-2">
                                                    <Target size={10} />
                                                    <span>Active Node / {service.category}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-12 flex-grow flex flex-col justify-between">
                                        <p className="text-slate-500 text-sm font-light leading-relaxed mb-8 max-w-sm">
                                            {service.description}
                                        </p>

                                        <div className="space-y-4">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-700 block mb-6 px-4 py-2 border-b border-white/5">Settlement Required</span>
                                            <div className="flex items-center space-x-4">
                                                <div className="px-6 py-2.5 bg-white/5 rounded-xl border border-white/5">
                                                    <span className="text-xl font-bold text-white tracking-widest">{service.price} <span className="text-[10px] text-slate-500 uppercase">ETB</span></span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-12 flex items-center justify-between pt-8 border-t border-white/5 opacity-50 group-hover:opacity-100 transition-all">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Access Restricted</span>
                                            <Link to="/contact" className="w-12 h-12 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-700 shadow-xl group-hover:emerald-glow">
                                                <ChevronRight size={20} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default Services;
