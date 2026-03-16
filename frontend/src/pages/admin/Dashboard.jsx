import { useEffect } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    AreaChart,
    Area
} from 'recharts';
import { TrendingUp, Users, Calendar, DollarSign, Activity, Terminal, ShieldCheck, Sparkles, Images } from 'lucide-react';
import { motion } from 'framer-motion';
import useAdminStore from '../../store/adminStore';

const data = [
    { name: 'Jan', revenue: 4000, bookings: 24 },
    { name: 'Feb', revenue: 3000, bookings: 18 },
    { name: 'Mar', revenue: 2000, bookings: 12 },
    { name: 'Apr', revenue: 2780, bookings: 20 },
    { name: 'May', revenue: 1890, bookings: 15 },
    { name: 'Jun', revenue: 2390, bookings: 17 },
    { name: 'Jul', revenue: 3490, bookings: 21 },
];

const Dashboard = () => {
    const { stats, fetchStats } = useAdminStore();

    useEffect(() => {
        fetchStats();
    }, []);

    const statsCards = [
        { title: 'Gross Revenue', value: stats ? `${stats.totalRevenue.toLocaleString()} ETB` : '0 ETB', icon: TrendingUp, color: 'text-emerald-500', trend: '+12.5%', glow: 'emerald-glow' },
        { title: 'Total Ledgers', value: stats?.totalBookings || '0', icon: Calendar, color: 'text-blue-500', trend: '+3' },
        { title: 'Registered Inhabitants', value: stats?.totalUsers || '0', icon: Users, color: 'text-purple-500', trend: '+15%' },
        { title: 'Inventory Control', value: stats?.totalRooms || '0', icon: Activity, color: 'text-teal-500', trend: 'Steady' },
        { title: 'Active Services', value: stats?.totalServices || '0', icon: Sparkles, color: 'text-emerald-500', trend: 'Live' },
        { title: 'Visual Artifacts', value: stats?.totalGalleryItems || '0', icon: Images, color: 'text-amber-500', trend: 'Managed' },
    ];

    return (
        <div className="space-y-16 pb-24">
            {/* Header Terminal */}
            <div className="flex justify-between items-end space-y-6 md:space-y-0">
                <div className="space-y-3">
                    <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em]">Proprietor Overview</span>
                    <h1 className="text-5xl font-serif text-white italic tracking-tighter transition-colors">Executive <span className="text-emerald-500 not-italic uppercase tracking-widest text-4xl">Terminal</span></h1>
                    <p className="text-slate-600 text-xs font-black uppercase tracking-widest">Real-time Performance Synchronizer / Node SGH_Z01</p>
                </div>
                <div className="flex items-center space-x-6">
                    <div className="px-6 py-3 bg-white/5 rounded-xl border border-white/5 text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">
                        Archive: Last 30 Tidal Cycles
                    </div>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {statsCards.map((card, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-slate-900/50 p-10 rounded-[3rem] border border-white/5 shadow-2xl portal-shadow hover:shadow-emerald-500/5 hover:border-emerald-500/20 transition-all duration-700 group hover:translate-y-2"
                    >
                        <div className="flex justify-between items-start mb-8">
                            <div className={`p-5 rounded-2xl bg-white/5 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-700 shadow-xl border border-white/5 group-hover:border-white/10 ${card.glow}`}>
                                <card.icon size={24} className={card.color} />
                            </div>
                            <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${card.trend.startsWith('+') ? 'border-emerald-500/20 text-emerald-500 bg-emerald-500/5' : 'border-slate-800 text-slate-600'}`}>
                                {card.trend}
                            </span>
                        </div>
                        <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em] mb-3 group-hover:text-white transition-colors">{card.title}</p>
                        <p className="text-3xl font-serif text-white italic tracking-widest group-hover:text-emerald-400 transition-colors uppercase">{card.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Visual Archive Chart */}
                <div className="lg:col-span-2 bg-slate-900/80 p-12 rounded-[4rem] border border-white/5 shadow-2xl portal-shadow relative overflow-hidden group hover:border-emerald-500/20 transition-all duration-1000">
                    <div className="flex justify-between items-center mb-12">
                        <div className="space-y-2">
                            <h3 className="text-2xl font-serif text-white italic group-hover:text-emerald-400 transition-colors tracking-tighter">Revenue Distribution</h3>
                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-700">Analytical Artifact / Node v4.2</p>
                        </div>
                        <button className="px-6 py-2.5 rounded-xl border border-white/5 text-[9px] font-black uppercase tracking-[0.3em] text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all shadow-xl hover:emerald-glow">Export Ledger</button>
                    </div>
                    <div className="h-96 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#475569', fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}
                                    dy={15}
                                />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#111827',
                                        borderRadius: '24px',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                                        padding: '20px'
                                    }}
                                    itemStyle={{ color: '#10B981', fontSize: '10px', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '0.1em' }}
                                    labelStyle={{ color: '#ffffff', fontSize: '12px', fontWeight: 900, marginBottom: '8px' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#10B981"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorRev)"
                                    animationDuration={2500}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Infrastructure Manifest */}
                <div className="bg-slate-900 p-12 rounded-[4rem] text-slate-300 border border-white/5 shadow-2xl portal-shadow group hover:border-emerald-500/20 transition-all duration-1000 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-[60px] -mr-24 -mt-24"></div>

                    <div className="flex items-center space-x-4 mb-10">
                        <Terminal className="text-emerald-500" size={20} />
                        <h3 className="text-2xl font-serif text-white italic group-hover:text-emerald-400 transition-colors tracking-tighter leading-none mb-1">System Node Status</h3>
                    </div>

                    <div className="space-y-8 relative z-10">
                        {[
                            { label: 'Cloudinary API Gateway', status: 'Online', color: 'bg-emerald-500' },
                            { label: 'Stripe Settlement Node', status: 'Online', color: 'bg-emerald-500' },
                            { label: 'MongoDB Inhabitant Vault', status: 'Proprietary', color: 'bg-emerald-500' },
                            { label: 'Background Chrono Jobs', status: 'Executing', color: 'bg-teal-500' },
                        ].map((node, i) => (
                            <div key={i} className="flex items-center justify-between py-5 border-b border-white/5 group/node transition-all">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 group-hover/node:text-white transition-colors uppercase">{node.label}</span>
                                <div className="flex items-center space-x-3 bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
                                    <div className={`w-1.5 h-1.5 rounded-full ${node.color} animate-pulse shadow-2xl`}></div>
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em]">{node.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 bg-emerald-500/5 p-8 rounded-[2rem] border border-emerald-500/20 group-hover:emerald-glow transition-all duration-1000">
                        <div className="flex items-center space-x-3 mb-3">
                            <ShieldCheck size={14} className="text-emerald-500" />
                            <p className="text-[9px] text-emerald-500 font-black uppercase tracking-[0.3em]">Security Advisory</p>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-light italic">
                            High occupancy protocol detected for the upcoming festival nodes. Ensure all infrastructure is vaulted.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
