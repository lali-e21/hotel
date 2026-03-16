import { Phone, Mail, MapPin, Send, Globe, MessageSquare, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <div className="pt-24 bg-[#020617] min-h-screen">
            {/* Split Header Protocol */}
            <section className="relative h-[60vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=80"
                        className="w-full h-full object-cover opacity-40 grayscale-[0.5]"
                        alt="Contact Banner"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/60 to-transparent"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-white text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="space-y-6"
                    >
                        <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full border border-emerald-500/10 bg-emerald-500/5">
                            <Globe size={12} className="text-emerald-500" />
                            <span className="text-emerald-500 uppercase tracking-[0.4em] text-[10px] font-black">Global Concierge Node</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-serif italic tracking-tighter">Correspondence <br /> <span className="text-emerald-500 not-italic uppercase tracking-widest text-4xl md:text-5xl">Interface</span></h1>
                    </motion.div>
                </div>
            </section>

            <section className="py-32 container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">

                    {/* Contact Info Protocol */}
                    <div className="lg:col-span-5 space-y-20">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-serif text-white italic tracking-tighter leading-tight">"Our masters of hospitality are at your <span className="text-emerald-500">command node</span>."</h2>
                            <p className="text-slate-500 font-light leading-relaxed text-lg">
                                From bespoke room configurations to private dining arrangements, we are dedicated to orchestrating your perfect stay within the SGH architecture.
                            </p>
                        </div>

                        <div className="space-y-12">
                            {[
                                { icon: MapPin, label: 'Physical Coordinate', value: 'Bole Road, Central Business District, Addis Ababa, Ethiopia' },
                                { icon: Phone, label: 'Voice Protocol', value: '+251 911 000 000 / +251 116 000 000' },
                                { icon: Mail, label: 'Digital Mailbox', value: 'concierge@sunrisegrand.com' }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-start space-x-6 group"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-emerald-500 shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-700 shadow-xl group-hover:emerald-glow">
                                        <item.icon size={20} />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-700">{item.label}</h4>
                                        <p className="text-white font-medium group-hover:text-emerald-400 transition-colors uppercase tracking-[0.05em] text-sm">{item.value}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="pt-12 border-t border-white/5 flex items-center space-x-8">
                            <div className="flex -space-x-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-12 h-12 rounded-2xl border-4 border-slate-900 overflow-hidden shadow-2xl">
                                        <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="Team" className="w-full h-full object-cover grayscale" />
                                    </div>
                                ))}
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-1">Response Protocol</p>
                                <p className="text-[9px] text-emerald-500 font-black uppercase tracking-widest italic flex items-center space-x-2">
                                    <Sparkles size={8} />
                                    <span>Average 12 Minutes</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Correspondence Form Interface */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="bg-slate-900 shadow-2xl portal-shadow rounded-[3rem] p-12 md:p-16 border border-white/5 relative overflow-hidden group hover:border-emerald-500/20 transition-all duration-1000"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>

                            <form className="space-y-10 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-600 ml-4">Inhabitant Name</label>
                                        <input className="w-full px-8 py-5 rounded-2xl border border-white/5 bg-[#020617] outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all text-[11px] font-bold text-white uppercase tracking-widest placeholder-slate-800" placeholder="Distinguished Guest" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-600 ml-4">Digital Identity</label>
                                        <input className="w-full px-8 py-5 rounded-2xl border border-white/5 bg-[#020617] outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all text-[11px] font-bold text-white uppercase tracking-widest placeholder-slate-800" placeholder="Signature@Mail.com" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-600 ml-4">Allocation Subject</label>
                                    <div className="relative">
                                        <select className="w-full px-8 py-5 rounded-2xl border border-white/5 bg-[#020617] outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all text-[11px] font-bold text-white uppercase tracking-widest appearance-none">
                                            <option>Reservations & Availability</option>
                                            <option>Private Events & Weddings</option>
                                            <option>Concierge & Special Requests</option>
                                            <option>Feedback & Experience</option>
                                        </select>
                                        <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-slate-800 group-focus-within:text-emerald-500">
                                            <Send size={14} />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-600 ml-4">Message Log</label>
                                    <textarea rows="6" className="w-full px-8 py-5 rounded-2xl border border-white/5 bg-[#020617] outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all text-[11px] font-bold text-white uppercase tracking-widest resize-none placeholder-slate-800" placeholder="How may we serve your legacy?"></textarea>
                                </div>

                                <div className="pt-4">
                                    <button className="w-full btn-primary !py-6 flex items-center justify-center space-x-4 shadow-[0_0_50px_rgba(16,185,129,0.1)] group/btn relative overflow-hidden">
                                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] relative z-10">Invoke Correspondence Interface</span>
                                        <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform relative z-10" />
                                    </button>
                                </div>

                                <div className="flex items-center justify-center space-x-3 text-slate-800">
                                    <ShieldCheck size={12} className="text-emerald-500 opacity-50" />
                                    <span className="text-[9px] font-black uppercase tracking-widest opacity-50 italic">Correspondence Encrypted (SSL/v4.2)</span>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Premium Artifact Map */}
            <section className="h-[600px] w-full relative">
                <div className="absolute inset-0 grayscale contrast-[1.2] brightness-[0.4] invert">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126115.11548168243!2d38.7099!3d9.01!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24c49!2sAddis%20Ababa!5e0!3m2!1sen!2set!4v1700000000000!5m2!1sen!2set"
                        className="w-full h-full border-none opacity-80"
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>
                {/* Map Interface Overlay */}
                <div className="container mx-auto px-6 relative h-full flex items-center pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl border border-white/5 max-w-sm pointer-events-auto portal-shadow group hover:border-emerald-500/30 transition-all duration-1000"
                    >
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                                <MapPin size={20} />
                            </div>
                            <h4 className="text-2xl font-serif text-white italic group-hover:text-emerald-400 transition-colors">Sunrise Grand Node</h4>
                        </div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed mb-6">Located in the architectural heartbeat of Bole, 10 tidal cycles from the International Gateway.</p>
                        <button className="text-[10px] font-black uppercase tracking-widest text-emerald-500 flex items-center space-x-3 hover:text-emerald-400 transition-colors group/link">
                            <span>Get Directions Protocol</span>
                            <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
