import { useEffect, useState } from 'react';
import { Search, Download, ExternalLink, CreditCard, TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight, ShieldCheck, AlertCircle, Activity, Terminal, Clock } from 'lucide-react';
import useAdminStore from '../../store/adminStore';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const AdminPayments = () => {
    const { payments, fetchPayments, isLoading } = useAdminStore();
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchPayments();
    }, [fetchPayments]);

    const getStatusStyles = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed': return 'border-emerald-500/20 bg-emerald-500/5 text-emerald-500';
            case 'pending': return 'border-amber-500/20 bg-amber-500/5 text-amber-500';
            case 'failed': return 'border-red-500/20 bg-red-500/5 text-red-500';
            case 'refunded': return 'border-purple-500/20 bg-purple-500/5 text-purple-400';
            default: return 'border-slate-800 bg-slate-900 text-slate-600';
        }
    };

    const methodLabel = (method) => {
        switch (method) {
            case 'stripe': return 'Stripe Direct';
            case 'chapa': return 'Chapa Secure';
            case 'bank': return 'Bank Transfer';
            default: return method || 'Unknown';
        }
    };

    const filtered = (payments || []).filter((p) => {
        const matchFilter = filter === 'all' || p.status?.toLowerCase() === filter;
        const matchSearch = !search ||
            p.transactionId?.toLowerCase().includes(search.toLowerCase()) ||
            p.booking?.bookingReference?.toLowerCase().includes(search.toLowerCase());
        return matchFilter && matchSearch;
    });

    // Compute quick stats from real data
    const totalRevenue = (payments || [])
        .filter(p => p.status === 'completed')
        .reduce((acc, p) => acc + (p.amount || 0), 0);
    const successRate = payments?.length
        ? Math.round((payments.filter(p => p.status === 'completed').length / payments.length) * 100)
        : 0;
    const pendingAmount = (payments || [])
        .filter(p => p.status === 'pending')
        .reduce((acc, p) => acc + (p.amount || 0), 0);
    const refundedAmount = (payments || [])
        .filter(p => p.status === 'refunded')
        .reduce((acc, p) => acc + (p.amount || 0), 0);

    const statsCards = [
        { label: 'Net Revenue Ledger', value: `${totalRevenue.toLocaleString()} ETB`, trend: '+live', icon: DollarSign, color: 'text-emerald-500', up: true },
        { label: 'Success Velocity', value: `${successRate}%`, trend: 'Live', icon: TrendingUp, color: 'text-emerald-500', up: true },
        { label: 'Pending Liquidity', value: `${pendingAmount.toLocaleString()} ETB`, trend: 'Awaiting', icon: Clock, color: 'text-amber-500', up: null },
        { label: 'Terminal Refunds', value: `${refundedAmount.toLocaleString()} ETB`, trend: 'Processed', icon: AlertCircle, color: 'text-red-500', up: false },
    ];

    return (
        <div className="space-y-12">
            {/* Header Terminal */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                <div className="space-y-3">
                    <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em]">Proprietor Financial Ledger</span>
                    <h1 className="text-5xl font-serif text-white italic tracking-tighter leading-none">Revenue <br /> <span className="text-emerald-500 not-italic uppercase tracking-widest text-4xl">Architecture</span></h1>
                    <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest">Global Settlement Flow / node_v4.2</p>
                </div>
                <button className="btn-primary !py-5 !px-10 flex items-center space-x-4 shadow-2xl group relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    <Download size={16} className="relative z-10" />
                    <span className="relative z-10 text-[10px] font-black uppercase tracking-widest">Export Financial Artifact</span>
                </button>
            </div>

            {/* Live Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {statsCards.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-slate-900 p-8 rounded-[2.5rem] border border-white/5 shadow-2xl portal-shadow group hover:border-emerald-500/20 transition-all duration-700"
                    >
                        <div className="flex justify-between items-start mb-8">
                            <div className={`w-12 h-12 rounded-2xl bg-[#020617] border border-white/5 flex items-center justify-center transition-all duration-700 group-hover:bg-emerald-500 group-hover:text-white shadow-xl ${stat.color}`}>
                                <stat.icon size={20} />
                            </div>
                            <div className={`flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest ${stat.up ? 'text-emerald-500' : stat.up === false ? 'text-red-500' : 'text-amber-500'}`}>
                                {stat.up !== null ? (stat.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />) : null}
                                <span>{stat.trend}</span>
                            </div>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-700 mb-2">{stat.label}</p>
                        <p className="text-3xl font-serif text-white italic py-1 leading-none tracking-tighter">{isLoading ? '...' : stat.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Settlement Ledger Table */}
            <div className="bg-slate-900/50 backdrop-blur-3xl rounded-[3rem] border border-white/5 shadow-2xl portal-shadow overflow-hidden group/ledger hover:border-emerald-500/10 transition-all duration-1000">
                <div className="px-12 py-10 border-b border-white/5 flex flex-col xl:flex-row justify-between items-center gap-10">
                    <div className="flex bg-[#020617] p-2 rounded-2xl border border-white/5 shadow-inner">
                        {['all', 'completed', 'pending', 'failed', 'refunded'].map((s) => (
                            <button
                                key={s}
                                onClick={() => setFilter(s)}
                                className={`px-8 py-3 rounded-[1.2rem] text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${filter === s ? 'bg-emerald-500 text-white shadow-xl' : 'text-slate-600 hover:text-white hover:bg-white/5'}`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full md:w-[400px] group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-emerald-500 transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Trace Transaction ID or Booking Ref..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-16 pr-8 py-5 rounded-[2rem] border border-white/5 bg-[#020617] outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all text-[11px] font-bold text-white tracking-widest placeholder-slate-800"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="px-12 py-8 text-[10px] font-black text-slate-700 uppercase tracking-widest">Transaction ID</th>
                                <th className="px-12 py-8 text-[10px] font-black text-slate-700 uppercase tracking-widest">Booking Ref</th>
                                <th className="px-12 py-8 text-[10px] font-black text-slate-700 uppercase tracking-widest">Quantum Value</th>
                                <th className="px-12 py-8 text-[10px] font-black text-slate-700 uppercase tracking-widest">Settlement Node</th>
                                <th className="px-12 py-8 text-[10px] font-black text-slate-700 uppercase tracking-widest">Protocol State</th>
                                <th className="px-12 py-8 text-[10px] font-black text-slate-700 uppercase tracking-widest">Log Chronology</th>
                                <th className="px-12 py-8"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {isLoading ? (
                                [...Array(4)].map((_, i) => (
                                    <tr key={i}>
                                        {[...Array(7)].map((__, j) => (
                                            <td key={j} className="px-12 py-8">
                                                <div className="h-4 bg-slate-800/50 rounded-full animate-pulse w-24" />
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-12 py-20 text-center text-slate-700 text-[10px] font-black uppercase tracking-widest">
                                        No transaction artifacts found in the ledger.
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((txn) => (
                                    <tr key={txn._id} className="group hover:bg-emerald-500/5 transition-all duration-500">
                                        <td className="px-12 py-8">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-10 rounded-xl bg-[#020617] border border-white/5 flex items-center justify-center text-slate-700 group-hover:text-emerald-500 transition-all duration-500 shadow-xl">
                                                    <CreditCard size={16} />
                                                </div>
                                                <span className="font-mono text-[11px] text-slate-500 font-black tracking-widest group-hover:text-white transition-colors">
                                                    {txn.transactionId?.slice(0, 16) || '—'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-12 py-8">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/30 group-hover:bg-emerald-500 transition-all"></div>
                                                <span className="text-[11px] font-bold text-white uppercase tracking-widest">
                                                    {txn.booking?.bookingReference || txn.booking?._id?.slice(-8) || '—'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-12 py-8">
                                            <span className="text-lg font-bold text-white tracking-widest">{(txn.amount || 0).toLocaleString()} <span className="text-xs text-slate-600">ETB</span></span>
                                        </td>
                                        <td className="px-12 py-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.1em]">{methodLabel(txn.method)}</td>
                                        <td className="px-12 py-8">
                                            <div className={`px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest border text-center w-fit ${getStatusStyles(txn.status)}`}>
                                                {txn.status}
                                            </div>
                                        </td>
                                        <td className="px-12 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">
                                            {txn.createdAt ? format(new Date(txn.createdAt), 'dd MMM • HH:mm') : '—'}
                                        </td>
                                        <td className="px-12 py-8 text-right pr-12">
                                            <button title="View Details" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-700 hover:text-white hover:border-emerald-500/20 transition-all duration-500 shadow-xl group/ext">
                                                <ExternalLink size={18} className="group-hover/ext:scale-110 transition-transform" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Reconciliation Node */}
            <div className="bg-slate-900 shadow-2xl portal-shadow rounded-[3rem] p-12 flex flex-col md:flex-row justify-between items-center gap-10 hover:border-emerald-500/20 border border-white/5 transition-all duration-1000 relative overflow-hidden group">
                <div className="absolute inset-0 bg-emerald-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-1000 opacity-20"></div>
                <div className="flex items-center space-x-8 relative z-10">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-[#020617] border border-white/5 flex items-center justify-center text-emerald-500 shadow-2xl animate-[pulse_3s_infinite]">
                        <Activity size={24} />
                    </div>
                    <div>
                        <p className="text-xl font-serif text-white italic py-1 leading-none tracking-tighter">Automated Reconciliation Operational</p>
                        <p className="text-[10px] text-slate-600 uppercase tracking-[0.3em] font-black mt-1">Stripe & Chapa gateways live // Node 4.2</p>
                    </div>
                </div>
                <button className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.4em] hover:text-white transition-all flex items-center space-x-4 group/audit relative z-10">
                    <span>Audit Global Node History</span>
                    <ArrowUpRight size={16} className="group-hover/audit:translate-x-1 group-hover/audit:-translate-y-1 transition-transform" />
                </button>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-center space-x-6 opacity-50">
                <ShieldCheck size={16} className="text-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-700">Financial Ledger Vaulted // proprietary_AES_256</span>
                <div className="w-px h-6 bg-white/5"></div>
                <Terminal size={16} className="text-slate-800" />
            </div>
        </div>
    );
};

export default AdminPayments;
