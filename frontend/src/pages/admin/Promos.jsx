import { useState, useEffect } from 'react';
import { Plus, Tag, Calendar, Copy, Trash2, CheckCircle, XCircle, Gift, Sparkles, Clock, ArrowRight, ShieldCheck, Zap, Activity, Terminal, Database, X, Save, ToggleLeft, ToggleRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useAdminStore from '../../store/adminStore';

const AdminPromos = () => {
    const { promos, fetchPromos, createPromo, togglePromo, deletePromo, isLoading } = useAdminStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        code: '',
        discountType: 'percentage',
        discountValue: '',
        expirationDate: '',
    });

    useEffect(() => {
        fetchPromos();
    }, [fetchPromos]);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await createPromo(formData);
            setIsModalOpen(false);
            setFormData({ code: '', discountType: 'percentage', discountValue: '', expirationDate: '' });
            fetchPromos();
        } catch (error) {
            console.error('Promo creation anomaly:', error);
        }
    };

    const handleToggle = async (id) => {
        try {
            await togglePromo(id);
            fetchPromos();
        } catch (error) {
            console.error('Promo toggle anomaly:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Revoke this campaign artifact from the registry?')) {
            try {
                await deletePromo(id);
                fetchPromos();
            } catch (error) {
                console.error('Promo deletion anomaly:', error);
            }
        }
    };

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code);
    };

    return (
        <div className="space-y-12 pb-20">
            {/* Header Terminal */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                <div className="space-y-3">
                    <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em]">Proprietor Incentive Registry</span>
                    <h1 className="text-5xl font-serif text-white italic tracking-tighter leading-none transition-colors">Campaign <br /> <span className="text-emerald-500 not-italic uppercase tracking-widest text-4xl">Incentives</span></h1>
                    <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest">Global Value Propositions / node_v4.2</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn-primary !py-5 !px-10 flex items-center space-x-4 shadow-2xl group relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    <Sparkles size={18} className="group-hover:animate-pulse relative z-10" />
                    <span className="relative z-10 text-[10px] font-black uppercase tracking-widest">Engrave New Promo Artifact</span>
                </button>
            </div>

            {/* Campaign Grid Protocol */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <AnimatePresence>
                    {(promos || []).map((promo, idx) => (
                        <motion.div
                            key={promo._id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: idx * 0.07 }}
                            className="bg-slate-900/50 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/5 shadow-2xl portal-shadow space-y-10 relative overflow-hidden group hover:border-emerald-500/20 transition-all duration-700 h-full flex flex-col justify-between"
                        >
                            <div className={`absolute top-0 right-0 w-48 h-48 blur-[80px] opacity-20 -mr-24 -mt-24 transition-all duration-700 ${promo.isActive ? 'bg-emerald-500 group-hover:opacity-40' : 'bg-slate-700'}`}></div>

                            <div className="flex justify-between items-center relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-[#020617] border border-white/5 flex items-center justify-center text-slate-700 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-700 shadow-xl group-hover:emerald-glow">
                                    <Gift size={24} />
                                </div>
                                <button
                                    onClick={() => handleToggle(promo._id)}
                                    className={`inline-flex items-center space-x-3 px-6 py-2.5 rounded-full border shadow-xl transition-all duration-500 ${promo.isActive ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-500 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20' : 'border-slate-800 bg-slate-900 text-slate-700 hover:bg-emerald-500/10 hover:text-emerald-500 hover:border-emerald-500/20'}`}
                                >
                                    <div className={`w-1.5 h-1.5 rounded-full ${promo.isActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-800'}`}></div>
                                    <span className="text-[9px] font-black uppercase tracking-[0.3em]">{promo.isActive ? 'Active' : 'Revoked'}</span>
                                </button>
                            </div>

                            <div className="space-y-6 relative z-10">
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-4">
                                        <span className="text-3xl font-mono font-black text-white tracking-widest uppercase group-hover:text-emerald-400 transition-colors">{promo.code}</span>
                                        <button
                                            onClick={() => handleCopy(promo.code)}
                                            className="text-slate-800 hover:text-emerald-500 transition-all group/copy"
                                            title="Copy Code"
                                        >
                                            <Copy size={16} className="group-hover/copy:scale-110 transition-transform" />
                                        </button>
                                    </div>
                                    <p className="text-[9px] text-slate-700 font-black uppercase tracking-[0.4em]">Artifact Identity Signature</p>
                                </div>

                                <div className="p-6 bg-[#020617] rounded-[1.5rem] border border-white/5 flex items-center justify-between group-hover:border-emerald-500/10 transition-all">
                                    <p className="text-lg font-serif italic text-emerald-500 font-bold uppercase tracking-tight">
                                        {promo.discountType === 'percentage' ? `${promo.discountValue}% Reduction` : `${promo.discountValue} ETB Fixed Credit`}
                                    </p>
                                    <Zap size={16} className="text-emerald-500/30" />
                                </div>
                            </div>

                            <div className="space-y-6 pt-8 border-t border-white/5 relative z-10">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3 text-slate-700">
                                        <Clock size={14} className="text-emerald-500/50" />
                                        <span className="text-[10px] font-black uppercase tracking-widest leading-none">Termination Window</span>
                                    </div>
                                    <span className="text-xs font-bold text-white uppercase tracking-widest">
                                        {new Date(promo.expirationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3 text-slate-700">
                                        <Activity size={14} className="text-emerald-500/50" />
                                        <span className="text-[10px] font-black uppercase tracking-widest leading-none">Registered</span>
                                    </div>
                                    <span className="text-[10px] font-mono text-slate-500 tracking-widest">{promo._id.slice(-8)}</span>
                                </div>
                            </div>

                            <div className="flex space-x-4 relative z-10 pt-4">
                                <button
                                    onClick={() => handleDelete(promo._id)}
                                    className="flex-1 py-5 px-6 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-slate-700 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all duration-500 shadow-xl"
                                >
                                    Revoke & Delete
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Creation Placeholder Node */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setIsModalOpen(true)}
                    className="rounded-[3rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center p-12 bg-slate-900/10 hover:bg-emerald-500/5 transition-all group min-h-[400px] relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="w-20 h-20 rounded-[2rem] bg-[#020617] border border-white/5 text-slate-800 flex items-center justify-center mb-10 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-700 shadow-2xl relative z-10">
                        <Plus size={32} />
                    </div>
                    <div className="space-y-3 relative z-10">
                        <span className="text-xs font-black uppercase tracking-[0.4em] text-slate-700 group-hover:text-white transition-colors text-center block leading-loose">Architect New<br />Campaign Protocol</span>
                        <div className="flex items-center justify-center space-x-2 text-emerald-500/30 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ShieldCheck size={12} />
                            <span className="text-[8px] font-black uppercase tracking-widest">AEC-256 Provisioning</span>
                        </div>
                    </div>
                </motion.button>
            </div>

            {/* Terminal Status Footer */}
            <div className="flex items-center justify-center space-x-8 pt-12 border-t border-white/5 opacity-50">
                <div className="flex items-center space-x-3 text-slate-700">
                    <Database size={16} />
                    <span className="text-[9px] font-black uppercase tracking-[0.4em]">Registry Mapping: SGH_PROMO_INDEX</span>
                </div>
                <div className="w-px h-6 bg-white/5"></div>
                <div className="flex items-center space-x-3 text-slate-800">
                    <Terminal size={16} />
                    <span className="text-[9px] font-black uppercase tracking-[0.4em]">Proprietor Terminal v4.2 // SSL_VAULTED_AES_256</span>
                </div>
            </div>

            {/* Create Promo Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-[#020617]/90 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className="w-full max-w-2xl bg-slate-900 border border-white/5 rounded-[3.5rem] p-12 relative z-10 shadow-2xl portal-shadow overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] -mr-32 -mt-32" />

                            <div className="flex justify-between items-start mb-12">
                                <div className="space-y-2">
                                    <span className="text-emerald-500 text-[9px] font-black uppercase tracking-[0.4em]">Campaign Registry Inscription</span>
                                    <h2 className="text-4xl font-serif text-white italic tracking-tighter">Architect Promo Artifact</h2>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:bg-emerald-500 transition-all duration-500 group">
                                    <X size={24} className="group-hover:rotate-90 transition-transform" />
                                </button>
                            </div>

                            <form onSubmit={handleCreate} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-700 ml-6">Promo Code Artifact</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="e.g. GRAND_ACCESS_20"
                                            className="w-full bg-[#020617] border border-white/5 rounded-[2rem] px-8 py-5 text-[11px] font-black uppercase tracking-widest text-white outline-none focus:border-emerald-500/50 transition-all"
                                            value={formData.code}
                                            onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-700 ml-6">Discount Protocol</label>
                                        <select
                                            required
                                            className="w-full bg-[#020617] border border-white/5 rounded-[2rem] px-8 py-5 text-[11px] font-black uppercase tracking-widest text-white outline-none focus:border-emerald-500/50 transition-all appearance-none"
                                            value={formData.discountType}
                                            onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                                        >
                                            <option value="percentage">Percentage Reduction</option>
                                            <option value="fixed">Fixed ETB Credit</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-700 ml-6">
                                            Reduction Quantum ({formData.discountType === 'percentage' ? '%' : 'ETB'})
                                        </label>
                                        <input
                                            required
                                            type="number"
                                            min="1"
                                            placeholder={formData.discountType === 'percentage' ? '10' : '500'}
                                            className="w-full bg-[#020617] border border-white/5 rounded-[2rem] px-8 py-5 text-[11px] font-black uppercase tracking-widest text-white outline-none focus:border-emerald-500/50 transition-all"
                                            value={formData.discountValue}
                                            onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-700 ml-6">Termination Window</label>
                                        <input
                                            required
                                            type="date"
                                            className="w-full bg-[#020617] border border-white/5 rounded-[2rem] px-8 py-5 text-[11px] font-black uppercase tracking-widest text-white outline-none focus:border-emerald-500/50 transition-all"
                                            value={formData.expirationDate}
                                            onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-6 pt-4">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="flex-grow btn-primary !py-6 flex items-center justify-center space-x-4 shadow-2xl shadow-emerald-500/10 group overflow-hidden relative"
                                    >
                                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                        <Save size={18} className="relative z-10" />
                                        <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.4em]">
                                            {isLoading ? 'Provisioning...' : 'Inscribe Artifact'}
                                        </span>
                                    </button>
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="btn-outline !py-6 !px-12">
                                        Abort
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminPromos;
