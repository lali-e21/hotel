import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Search, Database, Zap, Activity, X, Terminal, Save, Sparkles, Coffee, Dumbbell, Car, Briefcase, Upload } from 'lucide-react';
import useServiceStore from '../../store/serviceStore';
import { motion, AnimatePresence } from 'framer-motion';

const AdminServices = () => {
    const { services, fetchServices, createService, updateService, deleteService, isLoading } = useServiceStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        icon: 'Sparkles',
        price: 0,
        category: 'Leisure',
        imageFile: null
    });

    useEffect(() => {
        fetchServices();
    }, [fetchServices]);

    const openModal = (service = null) => {
        if (service) {
            setEditingService(service);
            setFormData({
                name: service.name,
                description: service.description,
                icon: service.icon || 'Sparkles',
                price: service.price || 0,
                category: service.category || 'Leisure',
                imageFile: null
            });
        } else {
            setEditingService(null);
            setFormData({
                name: '',
                description: '',
                icon: 'Sparkles',
                price: 0,
                category: 'Leisure',
                imageFile: null
            });
        }
        setIsModalOpen(true);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('icon', formData.icon);
        data.append('price', formData.price);
        data.append('category', formData.category);
        if (formData.imageFile) {
            data.append('image', formData.imageFile);
        }

        try {
            if (editingService) {
                await updateService(editingService._id, data);
            } else {
                await createService(data);
            }
            setIsModalOpen(false);
            fetchServices();
        } catch (error) {
            console.error('Error architecting service:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Confirm deletion of this service artifact?')) {
            await deleteService(id);
            fetchServices();
        }
    };

    const icons = {
        Sparkles: Sparkles,
        Coffee: Coffee,
        Dumbbell: Dumbbell,
        Car: Car,
        Briefcase: Briefcase
    };

    const filteredServices = (services || []).filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                <div className="space-y-3">
                    <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em]">Proprietor Service Ledger</span>
                    <h1 className="text-3xl md:text-5xl font-serif text-white italic tracking-tighter leading-none transition-colors">Amenities <br className="md:hidden" /> <span className="text-emerald-500 not-italic uppercase tracking-widest text-2xl md:text-4xl">Protocols</span></h1>
                    <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest">Experience Allocation Flow / node_v4.2</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="btn-primary !py-5 !px-10 flex items-center space-x-4 shadow-2xl group relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    <Plus size={18} className="group-hover:rotate-90 transition-transform relative z-10" />
                    <span className="relative z-10 text-[10px] font-black uppercase tracking-widest">Provision New Service</span>
                </button>
            </div>

            <div className="flex flex-col xl:flex-row gap-6">
                <div className="relative flex-grow group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-emerald-500 transition-colors" size={16} />
                    <input
                        type="text"
                        placeholder="Trace Service Identity Artifact..."
                        className="w-full pl-16 pr-8 py-5 rounded-[2rem] border border-white/5 bg-slate-900 outline-none focus:border-emerald-500/30 text-[11px] font-bold uppercase tracking-widest text-white transition-all placeholder-slate-800 shadow-2xl portal-shadow"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-3xl rounded-[2rem] md:rounded-[3rem] border border-white/5 shadow-2xl portal-shadow overflow-x-auto group/ledger hover:border-emerald-500/10 transition-all duration-1000">
                <table className="w-full text-left min-w-[1000px]">
                    <thead>
                        <tr className="border-b border-white/5">
                            <th className="px-6 md:px-12 py-10 text-[10px] font-black text-slate-700 uppercase tracking-widest leading-none">Service Identity</th>
                            <th className="px-6 md:px-12 py-10 text-[10px] font-black text-slate-700 uppercase tracking-widest leading-none">Category Node</th>
                            <th className="px-6 md:px-12 py-10 text-[10px] font-black text-slate-700 uppercase tracking-widest leading-none">Settlement Quantum</th>
                            <th className="px-6 md:px-12 py-10 text-[10px] font-black text-slate-700 uppercase tracking-widest leading-none">Status State</th>
                            <th className="px-6 md:px-12 py-10 text-right"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredServices.map((service) => {
                            const Icon = icons[service.icon] || Sparkles;
                            return (
                                <tr key={service._id} className="group hover:bg-emerald-500/5 transition-all duration-500">
                                    <td className="px-6 md:px-12 py-10">
                                        <div className="flex items-center space-x-6">
                                            <div className="w-16 h-16 rounded-2xl bg-[#020617] border border-white/5 flex items-center justify-center text-emerald-500 shadow-2xl group-hover:scale-110 transition-transform duration-700">
                                                <Icon size={24} />
                                            </div>
                                            <div className="w-16 h-16 rounded-2xl bg-[#020617] border border-white/5 overflow-hidden shadow-2xl relative">
                                                {service.image ? (
                                                    <img src={service.image} alt={service.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-slate-800"><Database size={24} /></div>
                                                )}
                                            </div>
                                            <div className="flex flex-col space-y-1">
                                                <span className="text-xl font-serif italic text-white leading-tight group-hover:text-emerald-400 transition-colors uppercase tracking-[0.05em]">{service.name}</span>
                                                <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">ID: {service._id.slice(-8)}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 md:px-12 py-10">
                                        <div className="px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-[9px] font-black uppercase tracking-widest text-slate-500 group-hover:border-emerald-500/20 group-hover:text-emerald-500 transition-all duration-500 w-fit">
                                            {service.category}
                                        </div>
                                    </td>
                                    <td className="px-6 md:px-12 py-10">
                                        <div className="flex flex-col space-y-1">
                                            <span className="text-lg font-bold text-white tracking-widest">{service.price} <span className="text-xs text-slate-700">ETB</span></span>
                                        </div>
                                    </td>
                                    <td className="px-6 md:px-12 py-10">
                                        <div className="flex items-center space-x-3 text-emerald-500">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-[pulse_2s_infinite] emerald-glow"></div>
                                            <span className="text-[9px] font-black uppercase tracking-widest">Active Protocol</span>
                                        </div>
                                    </td>
                                    <td className="px-6 md:px-12 py-10 text-right">
                                        <div className="flex justify-end space-x-3">
                                            <button onClick={() => openModal(service)} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-600 hover:text-white hover:border-emerald-500/20 transition-all duration-500 group/btn">
                                                <Edit2 size={18} className="group-hover/btn:scale-110" />
                                            </button>
                                            <button onClick={() => handleDelete(service._id)} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-600 hover:text-red-500 hover:border-red-500/20 transition-all duration-500 group/btn">
                                                <Trash2 size={18} className="group-hover/btn:scale-110" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-[#020617]/90 backdrop-blur-xl"></motion.div>
                        <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }} className="w-full max-w-4xl bg-slate-900 border border-white/5 rounded-[2rem] md:rounded-[3.5rem] p-6 md:p-12 relative z-10 shadow-2xl overflow-y-auto max-h-[90vh]">
                            <div className="flex justify-between items-start mb-12">
                                <div className="space-y-2">
                                    <span className="text-emerald-500 text-[9px] font-black uppercase tracking-[0.4em]">Service Provision Mode</span>
                                    <h2 className="text-4xl font-serif text-white italic tracking-tighter">{editingService ? 'Modify Service Artifact' : 'Provision New Service'}</h2>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:bg-emerald-500 transition-all duration-500">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleFormSubmit} className="space-y-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-700 ml-6">Service Label</label>
                                        <input required type="text" placeholder="Enter Service Name..." className="w-full bg-[#020617] border border-white/5 rounded-[2rem] px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-white outline-none focus:border-emerald-500/50" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-700 ml-6">Category Node</label>
                                        <select required className="w-full bg-[#020617] border border-white/5 rounded-[2rem] px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-white outline-none focus:border-emerald-500/50 appearance-none" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                                            <option value="Wellness">Wellness</option>
                                            <option value="Dining">Dining</option>
                                            <option value="Leisure">Leisure</option>
                                            <option value="Transport">Transport</option>
                                            <option value="Business">Business</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-700 ml-6">Settlement Quantum (Price)</label>
                                        <input required type="number" placeholder="Cost in ETB..." className="w-full bg-[#020617] border border-white/5 rounded-[2rem] px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-white outline-none focus:border-emerald-500/50" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-700 ml-6">Visual Identifier (Icon)</label>
                                        <select required className="w-full bg-[#020617] border border-white/5 rounded-[2rem] px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-white outline-none focus:border-emerald-500/50 appearance-none" value={formData.icon} onChange={(e) => setFormData({ ...formData, icon: e.target.value })}>
                                            <option value="Sparkles">Sparkles</option>
                                            <option value="Coffee">Coffee</option>
                                            <option value="Dumbbell">Dumbbell</option>
                                            <option value="Car">Car</option>
                                            <option value="Briefcase">Briefcase</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-700 ml-6">Visual Artifact (Image)</label>
                                        <div className="relative group">
                                            <input
                                                type="file"
                                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                                onChange={(e) => setFormData({ ...formData, imageFile: e.target.files[0] })}
                                            />
                                            <div className="w-full bg-[#020617] border border-white/5 rounded-[2rem] px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-slate-800 transition-all flex items-center justify-between group-hover:border-emerald-500/20">
                                                <span>{formData.imageFile ? formData.imageFile.name : 'Upload Feature Image...'}</span>
                                                <Upload size={16} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-700 ml-6">Service Manifesto (Description)</label>
                                    <textarea rows="4" placeholder="Legacy narrative..." className="w-full bg-[#020617] border border-white/5 rounded-[2.5rem] px-8 py-6 text-[11px] font-bold uppercase tracking-widest text-white outline-none focus:border-emerald-500/50 resize-none" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
                                </div>

                                <div className="flex flex-col md:flex-row gap-6 pt-6">
                                    <button type="submit" disabled={isLoading} className="flex-grow btn-primary !py-6 flex items-center justify-center space-x-4 group overflow-hidden relative">
                                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                                        <Save size={18} className="relative z-10" />
                                        <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.4em]">{editingService ? 'Update Service Node' : 'Initialize Service Artifact'}</span>
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

export default AdminServices;
