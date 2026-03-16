import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, Mail, ChevronRight, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import useAuthStore from '../store/authStore';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    });
    const { login, register, isLoading, error } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        let success;
        if (isLogin) {
            success = await login(formData.email, formData.password);
        } else {
            success = await register(formData);
        }

        if (success) {
            // Get the updated user from store to determine redirect
            const currentUser = useAuthStore.getState().user;

            if (currentUser?.role === 'admin') {
                // If the user was trying to access a specific page (from), use that.
                // If they weren't (from is '/') or if 'from' is not an admin path, default to /admin.
                const redirectPath = (from && from !== '/') ? from : '/admin';
                navigate(redirectPath, { replace: true });
            } else {
                navigate(from, { replace: true });
            }
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setFormData({ name: '', email: '', phone: '', password: '' });
    };

    return (
        <div className="pt-32 pb-24 min-h-screen bg-[#020617] flex items-center justify-center px-6 relative overflow-hidden">
            {/* Background Protocol */}
            <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 opacity-20"></div>
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-xl w-full"
            >
                <div className="bg-slate-900/50 backdrop-blur-3xl p-12 md:p-16 rounded-[3rem] border border-white/5 shadow-2xl portal-shadow relative overflow-hidden group">
                    {/* Header Protocol */}
                    <div className="text-center mb-12 space-y-4">
                        <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl mx-auto flex items-center justify-center text-emerald-500 mb-6 border border-emerald-500/20 group-hover:emerald-glow transition-all duration-700">
                            {isLogin ? <Lock size={32} /> : <Sparkles size={32} />}
                        </div>
                        <h2 className="text-4xl font-serif text-white italic tracking-tighter transition-colors group-hover:text-emerald-400">
                            {isLogin ? 'Grand Lobby Access' : 'Residency Protocol'}
                        </h2>
                        <p className="text-slate-500 text-xs font-black uppercase tracking-[0.4em]">
                            {isLogin ? 'Authenticate Your Credentials' : 'Register New Inhabitant Card'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <AnimatePresence mode="wait">
                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-6"
                                >
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-4">Legal Name</label>
                                        <div className="relative flex items-center">
                                            <User className="absolute left-6 text-slate-600" size={16} />
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full bg-[#020617] border border-white/5 rounded-2xl py-5 px-14 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder-slate-700 font-light"
                                                placeholder="Johnathan Doe"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-4">Mobile Node</label>
                                        <div className="relative flex items-center">
                                            <span className="absolute left-6 text-slate-600 text-sm font-bold">+</span>
                                            <input
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full bg-[#020617] border border-white/5 rounded-2xl py-5 px-14 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder-slate-700 font-light"
                                                placeholder="0912 345 678"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-4">Digital Mailbox</label>
                                <div className="relative flex items-center">
                                    <Mail className="absolute left-6 text-slate-600" size={16} />
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-[#020617] border border-white/5 rounded-2xl py-5 px-14 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder-slate-700 font-light"
                                        placeholder="concierge@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-4">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Secure Token</label>
                                    {isLogin && <button type="button" className="text-[10px] text-emerald-500 font-black uppercase tracking-widest hover:text-emerald-400">Recover Key</button>}
                                </div>
                                <div className="relative flex items-center">
                                    <Lock className="absolute left-6 text-slate-600" size={16} />
                                    <input
                                        type="password"
                                        required
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full bg-[#020617] border border-white/5 rounded-2xl py-5 px-14 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder-slate-700 font-light"
                                        placeholder="••••••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-red-500/10 border border-red-500/20 text-red-500 py-4 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center"
                            >
                                {error}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full btn-primary !py-6 flex items-center justify-center space-x-3 shadow-2xl relative overflow-hidden group ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                                {isLoading ? 'Authenticating Protocol...' : isLogin ? 'Access The Grand Circle' : 'Register New Protocol'}
                            </span>
                            {!isLoading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                        </button>

                        <div className="pt-8 border-t border-white/5 text-center space-y-6">
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
                                {isLogin ? 'New to the Legacy Circle?' : 'Existing Member Protocol?'}
                                <button
                                    type="button"
                                    onClick={toggleMode}
                                    className="ml-2 text-emerald-500 hover:text-emerald-400 transition-colors"
                                >
                                    {isLogin ? 'Initialize Enrollment' : 'Authenticate Identity'}
                                </button>
                            </p>

                            <div className="flex items-center justify-center space-x-3 text-slate-700">
                                <ShieldCheck size={14} className="text-emerald-500 opacity-50" />
                                <span className="text-[9px] font-black uppercase tracking-widest opacity-50">Identity Vaulted & Encrypted (AES-256)</span>
                            </div>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
