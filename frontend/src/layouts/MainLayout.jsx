import { Outlet, Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, ArrowUpRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-[#020617]">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>

            <footer className="bg-[#020617] text-slate-400 relative overflow-hidden border-t border-white/5">
                {/* Background Accent */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>

                <div className="container mx-auto px-6 pt-32 pb-16 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                        {/* Brand Column */}
                        <div className="lg:col-span-4 space-y-10">
                            <Link to="/" className="inline-block group">
                                <span className="text-2xl font-serif font-bold tracking-widest text-white leading-none">SUNRISE <span className="text-emerald-500 italic transition-colors group-hover:text-emerald-400">GRAND</span></span>
                            </Link>
                            <p className="text-slate-500 font-light leading-relaxed max-w-sm">
                                Nestled in the vibrant heart of Addis Ababa, Sunrise Grand Hotel is an architectural anomaly where ancient Ethiopian hospitality meets emerald-grade contemporary luxury.
                            </p>
                            <div className="flex space-x-6">
                                {[Facebook, Instagram, Twitter].map((Icon, i) => (
                                    <button key={i} className="w-12 h-12 rounded-2xl border border-white/5 bg-white/5 flex items-center justify-center hover:bg-emerald-500 hover:border-emerald-500 hover:text-white transition-all duration-700 group shadow-xl hover:emerald-glow">
                                        <Icon size={18} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Columns */}
                        <div className="lg:col-span-2 space-y-8">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">The Hotel Protocol</h4>
                            <ul className="space-y-4">
                                {[
                                    { name: 'Rooms & Suites', path: '/rooms' },
                                    { name: 'Signature Dining', path: '/services' },
                                    { name: 'Spa & Wellness', path: '/services' },
                                    { name: 'Meetings', path: '/services' },
                                    { name: 'Gallery', path: '/gallery' }
                                ].map((link) => (
                                    <li key={link.name}>
                                        <Link to={link.path} className="text-sm font-light text-slate-500 hover:text-emerald-400 transition-colors flex items-center group">
                                            <span>{link.name}</span>
                                            <ArrowUpRight size={12} className="ml-2 opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="lg:col-span-2 space-y-8">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Legacy Portal</h4>
                            <ul className="space-y-4">
                                {['Special Offers', 'Local Guide', 'Sustainability', 'Careers', 'Contact'].map((link) => (
                                    <li key={link}>
                                        <Link to="/contact" className="text-sm font-light text-slate-500 hover:text-emerald-400 transition-colors uppercase tracking-widest text-[10px]">{link}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact/Newsletter Column */}
                        <div className="lg:col-span-4 space-y-10">
                            <div className="space-y-6">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Connect Protocol</h4>
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-4 text-slate-400">
                                        <MapPin size={18} className="text-emerald-500 shrink-0 mt-1" />
                                        <p className="text-sm font-light leading-relaxed">Bole Road, Central Business District<br />Addis Ababa, Ethiopia</p>
                                    </div>
                                    <div className="flex items-center space-x-4 text-slate-400">
                                        <Phone size={18} className="text-emerald-500 shrink-0" />
                                        <p className="text-sm font-light">+251 911 000 000</p>
                                    </div>
                                    <div className="flex items-center space-x-4 text-slate-400">
                                        <Mail size={18} className="text-emerald-500 shrink-0" />
                                        <p className="text-sm font-light underline underline-offset-4 decoration-white/10 hover:decoration-emerald-500 transition-all cursor-pointer">concierge@sunrisegrand.com</p>
                                    </div>
                                </div>
                            </div>

                            {/* Newsletter Protocol */}
                            <div className="pt-10 border-t border-white/5">
                                <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-4 flex items-center space-x-3">
                                    <Sparkles size={12} className="text-emerald-500" />
                                    <span>Join The Grand Circle</span>
                                </p>
                                <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5 hover:border-emerald-500/20 transition-all group overflow-hidden">
                                    <input
                                        type="email"
                                        placeholder="Identity signature (email)"
                                        className="bg-transparent border-none outline-none px-6 text-[10px] uppercase font-bold tracking-widest text-white placeholder-slate-700 flex-grow"
                                    />
                                    <button className="bg-emerald-500 text-white px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-all shadow-xl hover:emerald-glow">Authenticate</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Bottom */}
                    <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 text-center">
                        <p className="text-[9px] font-bold text-slate-700 uppercase tracking-[0.3em]">
                            &copy; {new Date().getFullYear()} Sunrise Grand Hotel. Re-engineered Identity Protocol v4.2 // Architectural Artifact from Ethiopia.
                        </p>
                        <div className="flex space-x-12">
                            {['Privacy Vault', 'Service Terms', 'Node Policy'].map((p) => (
                                <Link key={p} to="/" className="text-[9px] font-bold text-slate-700 uppercase tracking-[0.3em] hover:text-emerald-400 transition-colors uppercase">{p}</Link>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
