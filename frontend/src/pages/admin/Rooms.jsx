import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Search, Filter, Maximize2, ShieldCheck, Database, Zap, ArrowRight, ChevronRight, Activity, X, Upload, Terminal, Save, Image as ImageIcon } from 'lucide-react';
import useRoomStore from '../../store/roomStore';
import { motion, AnimatePresence } from 'framer-motion';

const AdminRooms = () => {
    const { rooms, fetchRooms, createRoom, updateRoom, deleteRoom, isLoading } = useRoomStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRoom, setEditingRoom] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        pricePerNight: '',
        capacity: '',
        totalRooms: '',
        description: '',
        amenities: [],
        images: []
    });

    useEffect(() => {
        fetchRooms();
    }, [fetchRooms]);

    const openModal = (room = null) => {
        if (room) {
            setEditingRoom(room);
            setFormData({
                name: room.name,
                category: room.category,
                pricePerNight: room.pricePerNight,
                capacity: room.capacity,
                totalRooms: room.totalRooms,
                description: room.description || '',
                amenities: room.amenities || [],
                images: [] // images are not loaded back for now, only for new uploads
            });
        } else {
            setEditingRoom(null);
            setFormData({
                name: '',
                category: '',
                pricePerNight: '',
                capacity: '',
                totalRooms: '',
                description: '',
                amenities: [],
                images: []
            });
        }
        setIsModalOpen(true);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'images') {
                formData.images.forEach(img => data.append('images', img));
            } else if (key === 'amenities') {
                data.append('amenities', JSON.stringify(formData.amenities));
            } else {
                data.append(key, formData[key]);
            }
        });

        try {
            if (editingRoom) {
                await updateRoom(editingRoom._id, data);
            } else {
                await createRoom(data);
            }
            setIsModalOpen(false);
            fetchRooms();
        } catch (error) {
            console.error('Error architecting artifact:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Confirm deletion of this architectural artifact?')) {
            await deleteRoom(id);
            fetchRooms();
        }
    };

    const filteredRooms = (rooms || []).filter(room =>
        room.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-12">
            {/* Header Terminal */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                <div className="space-y-3">
                    <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em]">Proprietor Inventory Ledger</span>
                    <h1 className="text-3xl md:text-5xl font-serif text-white italic tracking-tighter leading-none transition-colors">Suite <br className="md:hidden" /> <span className="text-emerald-500 not-italic uppercase tracking-widest text-2xl md:text-4xl">Artifacts</span></h1>
                    <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest">Architectural Allocation Flow / node_v4.2</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="btn-primary !py-5 !px-10 flex items-center space-x-4 shadow-2xl group relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    <Plus size={18} className="group-hover:rotate-90 transition-transform relative z-10" />
                    <span className="relative z-10 text-[10px] font-black uppercase tracking-widest">Architect New Suite Artifact</span>
                </button>
            </div>

            {/* Filter & Terminal Input Protocol */}
            <div className="flex flex-col xl:flex-row gap-6">
                <div className="relative flex-grow group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-emerald-500 transition-colors" size={16} />
                    <input
                        type="text"
                        placeholder="Trace Suite Identity Artifact..."
                        className="w-full pl-16 pr-8 py-5 rounded-[2rem] border border-white/5 bg-slate-900 outline-none focus:border-emerald-500/30 text-[11px] font-bold uppercase tracking-widest text-white transition-all placeholder-slate-800 shadow-2xl portal-shadow"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex bg-slate-900 p-2 rounded-[2rem] border border-white/5 shadow-2xl portal-shadow overflow-x-auto no-scrollbar">
                    {['All Suites', 'Elite', 'Signature', 'Imperial'].map((cat) => (
                        <button key={cat} className="px-4 sm:px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-white hover:bg-white/5 transition-all whitespace-nowrap">
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-3xl rounded-[2rem] md:rounded-[3rem] border border-white/5 shadow-2xl portal-shadow overflow-x-auto group/ledger hover:border-emerald-500/10 transition-all duration-1000">
                <table className="w-full text-left min-w-[1000px]">
                    <thead>
                        <tr className="border-b border-white/5">
                            <th className="px-6 md:px-12 py-10 text-[10px] font-black text-slate-700 uppercase tracking-widest leading-none">Suite Identity Artifact</th>
                            <th className="px-6 md:px-12 py-10 text-[10px] font-black text-slate-700 uppercase tracking-widest leading-none">Architectural Tier</th>
                            <th className="px-6 md:px-12 py-10 text-[10px] font-black text-slate-700 uppercase tracking-widest leading-none">Settlement Model</th>
                            <th className="px-6 md:px-12 py-10 text-[10px] font-black text-slate-700 uppercase tracking-widest leading-none">Inventory Node</th>
                            <th className="px-6 md:px-12 py-10 text-[10px] font-black text-slate-700 uppercase tracking-widest leading-none">Status State</th>
                            <th className="px-6 md:px-12 py-10 text-right"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredRooms.map((room) => (
                            <tr key={room._id} className="group hover:bg-emerald-500/5 transition-all duration-500">
                                <td className="px-6 md:px-12 py-10">
                                    <div className="flex items-center space-x-6">
                                        <div className="w-16 h-16 rounded-2xl bg-[#020617] border border-white/5 overflow-hidden shadow-2xl relative group-hover:scale-110 transition-transform duration-700">
                                            {room.images?.[0] ? (
                                                <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-800"><Database size={24} /></div>
                                            )}
                                            <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </div>
                                        <div className="flex flex-col space-y-1">
                                            <span className="text-xl font-serif italic text-white leading-tight group-hover:text-emerald-400 transition-colors uppercase tracking-[0.05em]">{room.name}</span>
                                            <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">ID: {room._id.slice(-8)}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 md:px-12 py-10">
                                    <div className="px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-[9px] font-black uppercase tracking-widest text-slate-500 group-hover:border-emerald-500/20 group-hover:text-emerald-500 transition-all duration-500 w-fit">
                                        {room.category}
                                    </div>
                                </td>
                                <td className="px-6 md:px-12 py-10">
                                    <div className="flex flex-col space-y-1">
                                        <span className="text-lg font-bold text-white tracking-widest">{room.pricePerNight} <span className="text-xs text-slate-700">ETB</span></span>
                                        <span className="text-[9px] text-slate-800 uppercase tracking-[0.2em] font-black italic">Inclusive Tax protocol</span>
                                    </div>
                                </td>
                                <td className="px-6 md:px-12 py-10">
                                    <div className="flex items-center space-x-3 text-white">
                                        <Zap size={14} className="text-emerald-500/50" />
                                        <span className="text-[11px] font-bold uppercase tracking-widest">{room.totalRooms} Units</span>
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
                                        <button
                                            onClick={() => openModal(room)}
                                            className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-600 hover:text-white hover:border-emerald-500/20 transition-all duration-500 shadow-xl group/btn"
                                        >
                                            <Edit2 size={18} className="group-hover/btn:scale-110 transition-transform" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(room._id)}
                                            className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-600 hover:text-red-500 hover:border-red-500/20 transition-all duration-500 shadow-xl group/btn"
                                        >
                                            <Trash2 size={18} className="group-hover/btn:scale-110 transition-transform" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination / Terminal Footer Protocol */}
            <div className="flex flex-col md:flex-row justify-between items-center px-12 py-8 bg-slate-900/50 rounded-[2.5rem] border border-white/5 space-y-6 md:space-y-0">
                <div className="flex items-center space-x-4">
                    <Activity size={16} className="text-emerald-500" />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-700">
                        Registry Status: <span className="text-white">{filteredRooms.length} Artifacts Mapping</span> / Total: {rooms.length}
                    </p>
                </div>
                <div className="flex space-x-4">
                    <button className="w-12 h-12 rounded-2xl border border-white/5 bg-white/5 flex items-center justify-center text-slate-800 pointer-events-none opacity-20">
                        <ChevronRight size={16} className="rotate-180" />
                    </button>
                    <button className="w-12 h-12 rounded-2xl border border-white/5 bg-white/5 flex items-center justify-center text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all shadow-xl group/next">
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Architectural Creation Node (Modal) */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-[#020617]/90 backdrop-blur-xl"
                        ></motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className="w-full max-w-4xl bg-slate-900 border border-white/5 rounded-[2rem] md:rounded-[3.5rem] p-6 md:p-12 relative z-10 shadow-2xl portal-shadow overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>

                            <div className="flex justify-between items-start mb-12">
                                <div className="space-y-2">
                                    <span className="text-emerald-500 text-[9px] font-black uppercase tracking-[0.4em]">Artifact Architect Mode</span>
                                    <h2 className="text-4xl font-serif text-white italic tracking-tighter">{editingRoom ? 'Modify Epoch Artifact' : 'Architect New Suite'}</h2>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:bg-emerald-500 transition-all duration-500 shadow-xl group">
                                    <X size={24} className="group-hover:rotate-90 transition-transform" />
                                </button>
                            </div>

                            <form onSubmit={handleFormSubmit} className="space-y-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-700 ml-6">Suite Identity Label</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Enter Artifact Name..."
                                            className="w-full bg-[#020617] border border-white/5 rounded-[2rem] px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-white outline-none focus:border-emerald-500/50 transition-all"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-700 ml-6">Architectural Tier</label>
                                        <select
                                            required
                                            className="w-full bg-[#020617] border border-white/5 rounded-[2rem] px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-white outline-none focus:border-emerald-500/50 transition-all appearance-none"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            <option value="">Select Tier Protocol</option>
                                            <option value="Elite">Elite Tier</option>
                                            <option value="Signature">Signature Tier</option>
                                            <option value="Imperial">Imperial Tier</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-700 ml-6">Settlement Quantum (Price)</label>
                                        <input
                                            required
                                            type="number"
                                            placeholder="ETB per night cycle..."
                                            className="w-full bg-[#020617] border border-white/5 rounded-[2rem] px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-white outline-none focus:border-emerald-500/50 transition-all"
                                            value={formData.pricePerNight}
                                            onChange={(e) => setFormData({ ...formData, pricePerNight: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-700 ml-6">Occupant Capacity</label>
                                        <input
                                            required
                                            type="number"
                                            placeholder="Max Inhabitants..."
                                            className="w-full bg-[#020617] border border-white/5 rounded-[2rem] px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-white outline-none focus:border-emerald-500/50 transition-all"
                                            value={formData.capacity}
                                            onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-700 ml-6">Inventory Nodes (Total Rooms)</label>
                                        <input
                                            required
                                            type="number"
                                            placeholder="Unit Count..."
                                            className="w-full bg-[#020617] border border-white/5 rounded-[2rem] px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-white outline-none focus:border-emerald-500/50 transition-all"
                                            value={formData.totalRooms}
                                            onChange={(e) => setFormData({ ...formData, totalRooms: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-700 ml-6">Visual Artifacts (Images)</label>
                                        <div className="relative group">
                                            <input
                                                type="file"
                                                multiple
                                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                                onChange={(e) => setFormData({ ...formData, images: Array.from(e.target.files) })}
                                            />
                                            <div className="w-full bg-[#020617] border border-white/5 rounded-[2rem] px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-slate-800 transition-all flex items-center justify-between group-hover:border-emerald-500/20">
                                                <span>{formData.images.length > 0 ? `${formData.images.length} Nodes Loaded` : 'Upload Image Manifest'}</span>
                                                <Upload size={16} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-700 ml-6">SGH Artifact Manifesto (Description)</label>
                                    <textarea
                                        rows="4"
                                        placeholder="Enter the legacy narrative of this artifact..."
                                        className="w-full bg-[#020617] border border-white/5 rounded-[2.5rem] px-8 py-6 text-[11px] font-bold uppercase tracking-widest text-white outline-none focus:border-emerald-500/50 transition-all resize-none"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    ></textarea>
                                </div>

                                <div className="flex flex-col md:flex-row gap-6 pt-6">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="flex-grow btn-primary !py-6 flex items-center justify-center space-x-4 shadow-2xl shadow-emerald-500/10 group overflow-hidden relative"
                                    >
                                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                                        <Save size={18} className="relative z-10" />
                                        <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.4em]">{editingRoom ? 'Update Epoch Registry' : 'Provision Artifact Node'}</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="btn-outline !py-6 !px-12 !border-white/5 !text-slate-700 hover:!text-white hover:!bg-white/5"
                                    >
                                        Abort Protocol
                                    </button>
                                </div>
                            </form>

                            <div className="flex items-center justify-center space-x-4 pt-10 opacity-30">
                                <Terminal size={14} className="text-emerald-500" />
                                <span className="text-[8px] font-black uppercase tracking-[0.5em] text-white">sgh_architect_shell_v4.2 // encrypted_pipeline</span>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <div className="flex items-center justify-center space-x-4 pt-4 opacity-50">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span className="text-[9px] text-slate-700 font-black uppercase tracking-[0.4em]">Ledger Vaulted Under Proprietor Protocol AES-256</span>
            </div>
        </div>
    );
};

export default AdminRooms;
