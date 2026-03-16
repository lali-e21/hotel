import { useState } from 'react';
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    BedDouble,
    CalendarCheck,
    CreditCard,
    Tag,
    Settings,
    LogOut,
    Bell,
    Search,
    User,
    Menu,
    X,
    Sparkles,
    Images,
    ShieldCheck
} from 'lucide-react';
import useAuthStore from '../store/authStore';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = () => {
    const { logout, user } = useAuthStore();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { icon: LayoutDashboard, label: 'Executive Overview', path: '/admin', end: true },
        { icon: BedDouble, label: 'Inventory Ledger', path: '/admin/rooms' },
        { icon: CalendarCheck, label: 'Booking Archive', path: '/admin/bookings' },
        { icon: CreditCard, label: 'Payment Protocols', path: '/admin/payments' },
        { icon: Tag, label: 'Incentive Metadata', path: '/admin/promos' },
        { icon: Sparkles, label: 'Service Protocols', path: '/admin/services' },
        { icon: Images, label: 'Visual Archives', path: '/admin/gallery' },
    ];

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex h-screen bg-[#020617] text-slate-300 overflow-hidden relative">
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Protocol */}
            <aside className={`fixed lg:static inset-y-0 left-0 w-80 bg-[#020617] border-r border-white/5 flex flex-col z-40 transition-transform duration-500 ease-in-out lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-8 lg:p-12 flex justify-between items-center">
                    <Link to="/" className="flex flex-col space-y-2 group">
                        <span className="text-xl font-serif font-bold tracking-[0.2em] text-white">SUNRISE <span className="text-emerald-500 italic transition-colors group-hover:text-emerald-400">GRAND</span></span>
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-700">Proprietor Terminal v4.2</span>
                    </Link>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-500 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-grow px-6 space-y-2 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.end}
                            onClick={() => setIsSidebarOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center space-x-5 px-6 py-5 rounded-2xl transition-all group ${isActive
                                    ? 'bg-emerald-500 text-white shadow-2xl emerald-glow'
                                    : 'text-slate-500 hover:text-white hover:bg-white/5 border border-transparent'}`
                            }
                        >
                            <item.icon size={18} className="group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-8 mt-auto border-t border-white/5 space-y-8">
                    <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 group hover:border-emerald-500/20 transition-all duration-700">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-serif text-xl italic font-bold shadow-xl border border-white/10">
                                {user?.name?.charAt(0)}
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase text-white leading-none text-ellipsis overflow-hidden whitespace-nowrap max-w-[120px]">{user?.name}</p>
                                <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest leading-none">Security Grade A</p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center space-x-3 py-5 rounded-2xl border border-white/5 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all duration-500 group"
                    >
                        <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Sign Out Protocol</span>
                    </button>
                </div>
            </aside>

            {/* Main Infrastructure */}
            <main className="flex-grow flex flex-col overflow-hidden relative w-full">
                {/* Global Backdrop Blur Protocol */}
                <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[200px] -translate-x-1/2 -translate-y-1/2 -z-10 opacity-30"></div>

                {/* Top Terminal Strip */}
                <header className="h-24 bg-[#020617]/50 backdrop-blur-xl border-b border-white/5 px-6 lg:px-12 flex items-center justify-between sticky top-0 z-10">
                    <div className="flex items-center space-x-4 lg:space-x-10">
                        <button onClick={toggleSidebar} className="lg:hidden p-3 bg-white/5 rounded-xl text-slate-500 hover:text-white transition-colors">
                            <Menu size={20} />
                        </button>
                        <div className="hidden sm:flex items-center space-x-3 lg:space-x-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
                            <div className="flex items-center space-x-3">
                                <ShieldCheck size={14} className="text-emerald-500" />
                                <span className="text-emerald-500 hidden md:inline">Node Status: Operational</span>
                                <span className="text-emerald-500 md:hidden">Live</span>
                            </div>
                            <div className="flex items-center space-x-3 border-l border-white/5 pl-4 lg:pl-10 opacity-50">
                                <Bell size={14} />
                                <span className="hidden md:inline">Critical: 0</span>
                                <span className="md:hidden">0</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 lg:space-x-8">
                        <div className="relative group hidden sm:block">
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-emerald-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search Archives..."
                                className="bg-slate-900 border border-white/5 rounded-xl py-3 pl-12 pr-6 text-[10px] uppercase font-bold tracking-widest text-white focus:outline-none focus:border-emerald-500/30 w-32 md:w-64 transition-all"
                            />
                        </div>
                        <div className="w-px h-8 bg-white/5 hidden sm:block"></div>
                        <button className="p-3 bg-white/5 rounded-xl text-slate-500 hover:text-white transition-colors">
                            <Settings size={20} />
                        </button>
                        <button onClick={handleLogout} className="sm:hidden p-3 bg-white/5 rounded-xl text-red-500/50 hover:text-red-500 transition-colors">
                            <LogOut size={20} />
                        </button>
                    </div>
                </header>

                <div className="flex-grow overflow-y-auto custom-scrollbar">
                    <div className="p-6 lg:p-12 max-w-7xl mx-auto min-h-screen">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
