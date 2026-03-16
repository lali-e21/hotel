import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Search, Database, Activity, X, Upload, Terminal, Image as ImageIcon } from 'lucide-react';
import useGalleryStore from '../../store/galleryStore';
import { motion, AnimatePresence } from 'framer-motion';

const AdminGallery = () => {
    const { galleryItems, fetchGalleryItems, createGalleryItem, updateGalleryItem, deleteGalleryItem, isLoading } = useGalleryStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        category: 'Exterior',
        imageFile: null
    });

    useEffect(() => {
        fetchGalleryItems();
    }, [fetchGalleryItems]);

    const openModal = (item = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                title: item.title,
                category: item.category,
                imageFile: null
            });
        } else {
            setEditingItem(null);
            setFormData({
                title: '',
                category: 'Exterior',
                imageFile: null
            });
        }
        setIsModalOpen(true);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('category', formData.category);
        if (formData.imageFile) {
            data.append('imageUrl', formData.imageFile);
        }

        try {
            if (editingItem) {
                await updateGalleryItem(editingItem._id, data);
            } else {
                await createGalleryItem(data);
            }
            setIsModalOpen(false);
            fetchGalleryItems();
            setFormData({ title: '', category: 'Exterior', imageFile: null });
            setEditingItem(null);
        } catch (error) {
            console.error('Error synchronizing visual artifact:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Erase this visual artifact from memory?')) {
            await deleteGalleryItem(id);
            fetchGalleryItems();
        }
    };

    const filteredGallery = (galleryItems || []).filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                <div className="space-y-3">
                    <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em]">Visual Archive Registry</span>
                    <h1 className="text-3xl md:text-5xl font-serif text-white italic tracking-tighter leading-none transition-colors">Gallery <br className="md:hidden" /> <span className="text-emerald-500 not-italic uppercase tracking-widest text-2xl md:text-4xl">Artifacts</span></h1>
                    <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest">Aesthetic Asset Flow / node_v4.2</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="btn-primary !py-5 !px-10 flex items-center space-x-4 shadow-2xl group relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    <Plus size={18} className="group-hover:rotate-90 transition-transform relative z-10" />
                    <span className="relative z-10 text-[10px] font-black uppercase tracking-widest">Archive New Visual Artifact</span>
                </button>
            </div>

            <div className="flex flex-col xl:flex-row gap-6">
                <div className="relative flex-grow group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-emerald-500 transition-colors" size={16} />
                    <input
                        type="text"
                        placeholder="Trace Visual Identity..."
                        className="w-full pl-16 pr-8 py-5 rounded-[2rem] border border-white/5 bg-slate-900 outline-none focus:border-emerald-500/30 text-[11px] font-bold uppercase tracking-widest text-white transition-all placeholder-slate-800 shadow-2xl portal-shadow"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredGallery.map((item) => (
                    <motion.div key={item._id} layout className="group relative bg-slate-900/50 rounded-[2rem] overflow-hidden border border-white/5 hover:border-emerald-500/20 transition-all duration-700 shadow-2xl portal-shadow aspect-square">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-8 space-y-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">{item.category}</span>
                            <h3 className="text-xl font-serif italic text-white leading-tight">{item.title}</h3>
                            <button onClick={() => handleDelete(item._id)} className="absolute top-8 right-8 w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white">
                                <Trash2 size={18} />
                            </button>
                            <button onClick={() => openModal(item)} className="absolute top-8 right-24 w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-emerald-500 hover:text-white">
                                <Edit2 size={18} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-[#020617]/90 backdrop-blur-xl"></motion.div>
                        <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }} className="w-full max-w-2xl bg-slate-900 border border-white/5 rounded-[2rem] md:rounded-[3.5rem] p-6 md:p-12 relative z-10 shadow-2xl">
                            <div className="flex justify-between items-start mb-12">
                                <div className="space-y-2">
                                    <span className="text-emerald-500 text-[9px] font-black uppercase tracking-[0.4em]">Visual Provision Node</span>
                                    <h2 className="text-4xl font-serif text-white italic tracking-tighter">Archive New Artifact</h2>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-slate-500 hover:text-white"><X size={24} /></button>
                            </div>

                            <form onSubmit={handleFormSubmit} className="space-y-10">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-700 ml-6">Artifact Title</label>
                                    <input required type="text" placeholder="Visual Designation..." className="w-full bg-[#020617] border border-white/5 rounded-[2rem] px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-white outline-none focus:border-emerald-500/50" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-700 ml-6">Category Partition</label>
                                    <select required className="w-full bg-[#020617] border border-white/5 rounded-[2rem] px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-white outline-none focus:border-emerald-500/50 appearance-none" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                                        <option value="Exterior">Exterior</option>
                                        <option value="Interior">Interior</option>
                                        <option value="Dining">Dining</option>
                                        <option value="Pool">Pool</option>
                                        <option value="Rooms">Rooms</option>
                                        <option value="Events">Events</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-700 ml-6">Visual Source (Image)</label>
                                    <div className="relative">
                                        <input required type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={(e) => setFormData({ ...formData, imageFile: e.target.files[0] })} />
                                        <div className="w-full bg-[#020617] border border-white/5 rounded-[2rem] px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-slate-800 flex items-center justify-between">
                                            <span>{formData.imageFile ? formData.imageFile.name : 'Select Image Protocol...'}</span>
                                            <Upload size={16} />
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" disabled={isLoading} className="w-full btn-primary !py-6 flex items-center justify-center space-x-4 shadow-2xl relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                                    <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.4em]">Archive Artifact</span>
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminGallery;
