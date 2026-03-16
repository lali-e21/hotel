import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, User, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import useAuthStore from '../../store/authStore';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { isAuthenticated, user, logout } = useAuthStore();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'am' : 'en';
        i18n.changeLanguage(newLang);
    };

    const navLinks = [
        { name: t('nav.home'), path: '/' },
        { name: t('nav.rooms'), path: '/rooms' },
        { name: t('nav.services'), path: '/services' },
        { name: t('nav.gallery'), path: '/gallery' },
        { name: t('nav.contact'), path: '/contact' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-700 ${scrolled ? 'nav-blur py-4 shadow-2xl' : 'bg-transparent py-8'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2 group">
                    <span className={`text-xl font-serif font-bold tracking-widest text-white`}>
                        SUNRISE <span className="text-emerald-500 italic transition-colors group-hover:text-emerald-400">GRAND</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center space-x-12">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `text-[10px] font-bold uppercase tracking-[0.3em] transition-all hover:text-emerald-400 ${isActive ? 'text-emerald-500' : 'text-white/70 hover:text-white'}`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>

                <div className="hidden lg:flex items-center space-x-8">
                    <button onClick={toggleLanguage} className={`flex items-center space-x-2 text-white/50 hover:text-emerald-400 transition-colors`}>
                        <Globe size={16} />
                        <span className="text-[10px] uppercase font-black tracking-widest">{i18n.language}</span>
                    </button>

                    {isAuthenticated ? (
                        <div className="flex items-center space-x-6">
                            <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className={`text-white hover:text-emerald-400 transition-colors`}>
                                <User size={18} />
                            </Link>
                            <button
                                onClick={logout}
                                className={`text-[10px] font-black uppercase tracking-widest text-white hover:text-red-400 transition-colors`}
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className={`btn-primary !py-3 !px-6 !text-[10px]`}>
                            {t('nav.book_now')}
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden flex items-center space-x-6">
                    <button onClick={toggleLanguage} className={`text-white`}>
                        <Globe size={20} />
                    </button>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`text-white`}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="lg:hidden absolute top-full left-0 w-full bg-[#020617] border-t border-white/5 py-12 px-8 flex flex-col space-y-8 text-center shadow-2xl"
                    >
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) =>
                                    `text-lg font-serif ${isActive ? 'text-emerald-500' : 'text-white'}`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}

                        <div className="pt-8 border-t border-white/5 space-y-6">
                            {isAuthenticated ? (
                                <>
                                    <Link
                                        to={user.role === 'admin' ? '/admin' : '/dashboard'}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center justify-center space-x-3 text-white"
                                    >
                                        <User size={18} />
                                        <span className="text-sm font-bold uppercase tracking-widest">{user.name}</span>
                                    </Link>
                                    <button
                                        onClick={() => {
                                            logout();
                                            setIsOpen(false);
                                        }}
                                        className="text-sm font-black uppercase tracking-widest text-red-500 w-full"
                                    >
                                        Sign Out Protocol
                                    </button>
                                </>
                            ) : (
                                <Link to="/login" onClick={() => setIsOpen(false)} className="btn-primary !w-full">
                                    {t('nav.book_now')}
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
