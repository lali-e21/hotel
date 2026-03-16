import { motion } from 'framer-motion';
import { Sparkles, Maximize2, Archive, Globe, ShieldCheck, Zap, Camera, Search, Filter } from 'lucide-react';
import { useState, useEffect } from 'react';
import useGalleryStore from '../store/galleryStore';

const Gallery = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const { galleryItems, fetchGalleryItems } = useGalleryStore();

    useEffect(() => {
        fetchGalleryItems();
    }, [fetchGalleryItems]);

    const categories = [
        { id: 'all', name: 'Global Archives' },
        { id: 'exterior', name: 'Structural' },
        { id: 'interior', name: 'Sanctuaries' },
        { id: 'amenities', name: 'Protocol Facilities' }
    ];

    const filteredImages = selectedCategory === 'all'
        ? (galleryItems || [])
        : (galleryItems || []).filter(img => img.category.toLowerCase() === selectedCategory.toLowerCase());

    return (
        <div className="pt-24 bg-[#020617] min-h-screen">
            {/* Gallery Header Protocol */}
            <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=82"
                        className="w-full h-full object-cover scale-110 opacity-30 blur-[2px]"
                        alt="Gallery Hero"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 space-y-8">
                    <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full border border-emerald-500/10 bg-emerald-500/5">
                        <Archive size={12} className="text-emerald-500" />
                        <span className="text-emerald-500 uppercase tracking-[0.4em] text-[10px] font-black">Visual Metadata Storage Node</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-serif text-white italic tracking-tighter shadow-2xl">
                        Architectural <br /> <span className="text-emerald-500 not-italic">Artifacts</span>
                    </h1>
                </div>
            </section>

            {/* Archive Taxonomy Control */}
            <section className="container mx-auto px-6 mb-24 relative z-20">
                <div className="bg-slate-900 shadow-2xl portal-shadow rounded-[2rem] border border-white/5 p-4 flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto overflow-x-auto no-scrollbar">
                    <div className="flex gap-2">
                        {categories.map(c => (
                            <button
                                key={c.id}
                                onClick={() => setSelectedCategory(c.id)}
                                className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${selectedCategory === c.id ? 'bg-emerald-500 text-white shadow-xl emerald-glow' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
                            >
                                {c.name}
                            </button>
                        ))}
                    </div>
                    <div className="hidden md:flex items-center space-x-4 pr-6 border-l border-white/10 pl-6 text-slate-500">
                        <Filter size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Taxonomy Type</span>
                    </div>
                </div>
            </section>

            {/* Visual Artifact Grid */}
            <section className="pb-40 container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredImages.map((image, i) => (
                        <motion.div
                            layout
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -10 }}
                            className="group relative h-[450px] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl portal-shadow"
                        >
                            <img
                                src={image.imageUrl}
                                alt={image.title}
                                className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-110"
                            />

                            {/* Overlay Artifact Information */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>

                            <div className="absolute top-8 right-8 z-10 opacity-0 group-hover:opacity-100 transition-all duration-700">
                                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white shadow-2xl emerald-glow flex items-center justify-center border border-white/10">
                                    <Maximize2 size={16} />
                                </div>
                            </div>

                            <div className="absolute bottom-10 left-10 space-y-3 z-10">
                                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-700">
                                    <Camera size={10} />
                                    <span className="text-[9px] font-black uppercase tracking-widest">{image.category}</span>
                                </div>
                                <h3 className="text-2xl font-serif text-white italic group-hover:text-emerald-400 transition-colors uppercase tracking-[0.05em] leading-none mb-1">{image.title}</h3>
                                <div className="flex items-center space-x-3 text-slate-700 opacity-50 group-hover:opacity-100 transition-all">
                                    <ShieldCheck size={12} className="text-emerald-500" />
                                    <span className="text-[9px] font-black uppercase tracking-widest italic leading-none pt-1">Unclassified Prop. v4.2</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Gallery;
