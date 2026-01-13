import React, { useState, useEffect } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import { useSearchParams } from 'react-router-dom';
import { 
  BarChart, Coffee, Users, ClipboardList, Plus, 
  Settings, Save, Trash2, CheckCircle, Clock, AlertCircle,
  Package, Star, Award, Quote, Image as ImageIcon, BookOpen, Send, Mail,
  Home, Info, Zap, MapPin, Globe, Phone
} from 'lucide-react';

import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { uploadToCloudinary } from '../../utils/cloudinary';

const ManagerDashboard = () => {
    const { user } = useUser();
    const { getToken } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const tabParam = searchParams.get('tab') || 'content';
    const [activeTab, setActiveTab] = useState(tabParam);
    const [contentSubTab, setContentSubTab] = useState('about');
    
    const [dataList, setDataList] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        setActiveTab(tabParam);
    }, [tabParam]);

    useEffect(() => {
        fetchData();
    }, [activeTab, contentSubTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const token = await getToken();
            const headers = { 'Authorization': `Bearer ${token}` };

            if (activeTab === 'content') {
                const endpointMap = {
                    about: 'about',
                    services: 'services',
                    products: 'products',
                    gallery: 'gallery',
                    blogs: 'blogs',
                    testimonials: 'testimonials',
                    certificates: 'certificates',
                    footer: 'contact-info'
                };
                const endpoint = endpointMap[contentSubTab];
                const res = await fetch(`${import.meta.env.VITE_API_URL}/ops/${endpoint}`);
                const data = await res.json();
                setDataList(Array.isArray(data) ? data : []);
            } else if (activeTab === 'tasks') {
                const [tasksRes, usersRes] = await Promise.all([
                    fetch(`${import.meta.env.VITE_API_URL}/ops/tasks/all`, { headers }),
                    fetch(`${import.meta.env.VITE_API_URL}/users`, { headers })
                ]);
                const tasksData = await tasksRes.json();
                const usersData = await usersRes.json();
                setTasks(Array.isArray(tasksData) ? tasksData : []);
                const allUsers = Array.isArray(usersData) ? usersData : (usersData.data || []);
                setEmployees(allUsers.filter(u => u.role === 'employee'));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateContent = async (e) => {
        e.preventDefault();
        setMessage('Processing...');
        const formData = new FormData(e.target);
        
        // Handle File Uploads
        const fileFields = ['image', 'bentoImage'];
        for (const field of fileFields) {
            const file = formData.get(field);
            if (file instanceof File && file.size > 0) {
                 try {
                    const url = await uploadToCloudinary(file);
                    formData.set(field, url);
                 } catch (error) {
                    console.error("Upload failed", error);
                    setMessage('Image upload failed');
                    return;
                 }
            } else if (file instanceof File) {
                // Remove empty file objects so they don't overwrite existing string URLs in specific update cases, 
                // though for create it might be fine.
                formData.delete(field);
            }
        }

        let payload = {};
        
        if (contentSubTab === 'footer') {
            payload = {
                phone: formData.get('phone'),
                email: formData.get('email'),
                address: formData.get('address'),
                city: formData.get('city'),
                country: formData.get('country'),
                socials: [
                    { platform: 'LinkedIn', url: formData.get('linkedin') },
                    { platform: 'Instagram', url: formData.get('instagram') },
                    { platform: 'Facebook', url: formData.get('facebook') },
                ].filter(s => s.url) 
            };
        } else {
            payload = Object.fromEntries(formData.entries());
        }
        
        try {
            const token = await getToken();
            const endpointMap = {
                about: 'about',
                services: 'services',
                products: 'products',
                gallery: 'gallery',
                blogs: 'blogs',
                testimonials: 'testimonials',
                certificates: 'certificates',
                footer: 'contact-info'
            };
            const endpoint = endpointMap[contentSubTab];
            
            const res = await fetch(`${import.meta.env.VITE_API_URL}/ops/${endpoint}`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                setMessage(`${contentSubTab} item created successfully!`);
                fetchData();
                e.target.reset();
                setTimeout(() => setMessage(''), 3000);
            } else {
                const errorData = await res.json();
                setMessage(`Error: ${errorData.message || 'Failed to create item'}`);
                console.error('API Error:', errorData);
            }
        } catch (err) { 
            console.error(err);
            setMessage(`Error: ${err.message || 'Something went wrong'}`);
        }
    };

    const handleDeleteContent = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        try {
            const token = await getToken();
            const endpointMap = {
                about: 'about',
                services: 'services',
                products: 'products',
                gallery: 'gallery',
                blogs: 'blogs',
                testimonials: 'testimonials',
                certificates: 'certificates',
                footer: 'contact-info'
            };
            const endpoint = endpointMap[contentSubTab];
            
            const res = await fetch(`${import.meta.env.VITE_API_URL}/ops/${endpoint}/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                setMessage('Item removed successfully');
                fetchData();
                setTimeout(() => setMessage(''), 3000);
            }
        } catch (err) { console.error(err); }
    };

    const handleAssignTask = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newTask = Object.fromEntries(formData.entries());
        
        try {
            const token = await getToken();
            const res = await fetch(`${import.meta.env.VITE_API_URL}/ops/tasks`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newTask)
            });
            if (res.ok) {
                setMessage('Task assigned successfully!');
                fetchData();
                e.target.reset();
                setTimeout(() => setMessage(''), 3000);
            }
        } catch (err) { console.error(err); }
    };

    const subTabs = [
        { id: 'about', label: 'About', icon: Info },
        { id: 'services', label: 'Services', icon: Coffee },
        { id: 'products', label: 'Products', icon: Package },
        { id: 'gallery', label: 'Gallery', icon: ImageIcon },
        { id: 'blogs', label: 'Blogs', icon: BookOpen },
        { id: 'testimonials', label: 'Reviews', icon: Quote },
        { id: 'certificates', label: 'Certs', icon: Award },
        { id: 'footer', label: 'Footer', icon: MapPin },
    ];

    return (
        <DashboardLayout>
            <div className="min-h-screen pb-12 text-gray-900 dark:text-white transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold flex items-center gap-3">
                            <BarChart className="text-red-600" /> 
                            {activeTab === 'content' ? 'Storefront Command Center' : 'Task Console'}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            {activeTab === 'content' ? 'Master control for every section of your public website.' : 
                             'Assign and monitor tasks for the operations team.'}
                        </p>
                    </div>
                </div>

                {message && <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-2xl border border-green-200 dark:border-green-800 flex items-center gap-2 shadow-sm font-bold animate-fade-in"><CheckCircle size={20} /> {message}</div>}

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    
                    {/* LEFT PANEL: Nav & Forms */}
                    <div className="lg:col-span-1 space-y-6">
                        {activeTab === 'content' && (
                            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Site Sections</h3>
                                </div>
                                <div className="p-2 space-y-1">
                                    {subTabs.map(tab => (
                                        <button 
                                            key={tab.id}
                                            onClick={() => setContentSubTab(tab.id)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                                                contentSubTab === tab.id 
                                                ? 'bg-red-600 text-white shadow-lg shadow-red-500/20' 
                                                : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'
                                            }`}
                                        >
                                            <tab.icon size={18} />
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* CENTER PANEL: Forms */}
                    <div className="lg:col-span-1 space-y-8">
                        {activeTab === 'content' && (
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 transition-all sticky top-24">
                                <h2 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2 dark:text-white">
                                    <Plus className="text-red-600" size={18} /> 
                                    Add {contentSubTab}
                                </h2>
                                
                                <form onSubmit={handleCreateContent} className="space-y-4">
                                    {contentSubTab === 'about' && (
                                        <>
                                            <div className="grid grid-cols-2 gap-2">
                                                <input name="name" placeholder="Name (Mr. Beri M)" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none text-sm" required />
                                                <input name="role" placeholder="Role (Founder & CEO)" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none text-sm" required />
                                            </div>
                                            <textarea name="quote" placeholder="Quote..." className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none text-sm h-20" />
                                            <textarea name="description" placeholder="Bio/Description" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none text-sm h-32" required />
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-400 uppercase">Upload Portrait</label>
                                                <input type="file" name="image" accept="image/*" className="w-full p-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 dark:file:bg-red-900/20 dark:file:text-red-400" />
                                            </div>
                                            <input name="tagline" placeholder="Tagline (optional)" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none text-sm" />
                                        </>
                                    )}
                                    {contentSubTab === 'services' && (
                                        <>
                                            <input name="title" placeholder="Service Title (e.g. Ethical Sourcing)" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none text-sm" required />
                                            <input name="features" placeholder="#Tags (Flashy bits)" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none text-sm" />
                                            <textarea name="description" placeholder="Service Details" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none text-sm h-32" required />
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-400 uppercase">Upload Service Image</label>
                                                <input type="file" name="image" accept="image/*" className="w-full p-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 dark:file:bg-red-900/20 dark:file:text-red-400" />
                                            </div>
                                        </>
                                    )}
                                    {contentSubTab === 'products' && (
                                        <>
                                            <div className="grid grid-cols-2 gap-2">
                                                <input name="name" placeholder="Product Name" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none text-sm" required />
                                                <input name="region" placeholder="Region (Guij, Sidamo...)" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none text-sm" />
                                            </div>
                                            <input name="type" placeholder="Process Type (e.g. Washed Process)" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none text-sm" />
                                            <textarea name="short_desc" placeholder="Short Catchy Description" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none text-sm h-20" required />
                                            <textarea name="long_desc" placeholder="Full Detailed Story" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none text-sm h-32" />
                                            <input name="profile" placeholder="Flavor Profile (Jasmine, Lemon, Honey...)" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none text-sm" />
                                            <div className="grid grid-cols-3 gap-2">
                                                <input name="elevation" placeholder="Elevation (m)" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none text-sm" />
                                                <input name="score" placeholder="SCA Score (89+)" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none text-sm" />
                                                <input name="tag" placeholder="Tag (Floral, Hot...)" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none text-sm" />
                                            </div>
                                            <div className="flex items-center gap-4 px-4 py-2 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                                                <label className="flex items-center gap-2 text-sm font-bold text-gray-500 cursor-pointer">
                                                    <input type="checkbox" name="isFeatured" className="w-4 h-4 accent-red-600" />
                                                    Show in Home Featured Collections
                                                </label>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-400 uppercase">Upload Product Image</label>
                                                <input type="file" name="image" accept="image/*" className="w-full p-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 dark:file:bg-red-900/20 dark:file:text-red-400" />
                                            </div>
                                        </>
                                    )}
                                    {/* ... Other subtabs forms ... */}
                                    {contentSubTab === 'gallery' && (
                                        <>
                                            <input name="title" placeholder="Image Title" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none text-sm" required />
                                            <input name="category" placeholder="Category" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none text-sm" required />
                                            <input name="description" placeholder="Caption" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none text-sm" />
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-400 uppercase">Upload Gallery Image</label>
                                                <input type="file" name="image" accept="image/*" className="w-full p-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 dark:file:bg-red-900/20 dark:file:text-red-400" />
                                            </div>
                                        </>
                                    )}
                                    {contentSubTab === 'blogs' && (
                                        <>
                                            <input name="title" placeholder="Blog Title" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none text-sm" required />
                                            <textarea name="description" placeholder="Short Excerpt" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none text-sm h-24" required />
                                            <input name="category" placeholder="Category" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none text-sm" required />
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-400 uppercase">Upload Cover Image</label>
                                                <input type="file" name="image" accept="image/*" className="w-full p-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 dark:file:bg-red-900/20 dark:file:text-red-400" />
                                            </div>
                                            <input name="author" placeholder="Author Name" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none text-sm" />
                                        </>
                                    )}
                                    {contentSubTab === 'testimonials' && (
                                        <>
                                            <input name="name" placeholder="Member/Partner Name" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none text-sm" required />
                                            <input name="role" placeholder="Job Role" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none text-sm" required />
                                            <input name="company" placeholder="Company" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none text-sm" required />
                                            <textarea name="feedback" placeholder="Message..." className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none text-sm h-32" required />
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-400 uppercase">Upload Avatar</label>
                                                <input type="file" name="image" accept="image/*" className="w-full p-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 dark:file:bg-red-900/20 dark:file:text-red-400" />
                                            </div>
                                        </>
                                    )}
                                    {contentSubTab === 'certificates' && (
                                        <>
                                            <input name="title" placeholder="Certificate Name" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none text-sm" required />
                                            <input name="description" placeholder="Issuing Body/Detail" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none text-sm" required />
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-400 uppercase">Upload Certificate</label>
                                                <input type="file" name="image" accept="image/*" className="w-full p-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 dark:file:bg-red-900/20 dark:file:text-red-400" />
                                            </div>
                                        </>
                                    )}
                                    {contentSubTab === 'footer' && (
                                        <>
                                            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl mb-4 text-xs text-yellow-700 dark:text-yellow-400">
                                                Editing Contact Info. This will update the site footer.
                                            </div>
                                            <input name="phone" defaultValue={dataList[0]?.phone} placeholder="Phone Number" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none text-sm" required />
                                            <input name="email" defaultValue={dataList[0]?.email} placeholder="Business Email" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none text-sm" required />
                                            <textarea name="address" defaultValue={dataList[0]?.address} placeholder="Full Address" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none text-sm h-20" required />
                                            <div className="grid grid-cols-2 gap-2">
                                                <input name="city" defaultValue={dataList[0]?.city} placeholder="City" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none text-sm" />
                                                <input name="country" defaultValue={dataList[0]?.country} placeholder="Country" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none text-sm" />
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-[10px] font-black uppercase text-gray-400">Social Links</p>
                                                {/* Pre-filling socials roughly if they exist or defaulting */}
                                                <input name="linkedin" defaultValue={dataList[0]?.socials?.find(s=>s.platform==='LinkedIn')?.url} placeholder="LinkedIn URL" className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none text-[10px]" />
                                                <input name="instagram" defaultValue={dataList[0]?.socials?.find(s=>s.platform==='Instagram')?.url} placeholder="Instagram URL" className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none text-[10px]" />
                                                <input name="facebook" defaultValue={dataList[0]?.socials?.find(s=>s.platform==='Facebook')?.url} placeholder="Facebook URL" className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none text-[10px]" />
                                            </div>
                                        </>
                                    )}
                                    <button type="submit" className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-lg shadow-red-500/30 transition-all transform hover:-translate-y-1">Publish Update</button>
                                </form>
                            </div>
                        )}

                        {activeTab === 'tasks' && (
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 transition-all sticky top-24">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 dark:text-white"><ClipboardList className="text-red-600" /> Assign Operation Task</h2>
                                <form onSubmit={handleAssignTask} className="space-y-4">
                                    <input name="title" placeholder="Task Title" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none" required />
                                    <textarea name="description" placeholder="Detailed Instructions" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none" required />
                                    <select name="assignedTo" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none" required>
                                        <option value="">Select Employee</option>
                                        {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
                                    </select>
                                    <input type="date" name="dueDate" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-500 dark:text-white outline-none" />
                                    <button type="submit" className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-500/30 transition-all">Send Task</button>
                                </form>
                            </div>
                        )}
                    </div>

                    {/* RIGHT PANEL: List Displays */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden h-full min-h-[500px]">
                            <div className="p-6 border-b border-gray-50 dark:border-gray-700 flex justify-between items-center">
                                <h3 className="font-bold text-lg dark:text-white capitalize">
                                    {activeTab === 'content' ? `${contentSubTab} Catalogue` : 'Active Tasks'}
                                </h3>
                                <div className="text-xs bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-gray-500">Live Production Asset</div>
                            </div>

                            <div className="p-0">
                                {loading ? (
                                    <div className="p-20 text-center flex flex-col items-center gap-4">
                                        <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                        <span className="text-gray-400 font-bold tracking-widest uppercase text-xs">Synchronizing DB...</span>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-gray-50 dark:divide-gray-700">
                                        {activeTab === 'content' && dataList.length === 0 && (
                                            <div className="p-20 text-center text-gray-400">No {contentSubTab} assets found. Add your first item.</div>
                                        )}
                                        {activeTab === 'content' && dataList.map(item => (
                                            <div key={item._id} className="p-6 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                                                <div className="flex gap-6 items-center">
                                                    {(item.image || item.icon) ? (
                                                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 dark:border-gray-700 flex items-center justify-center">
                                                            {item.image ? (
                                                                <img src={item.image} alt={item.name || item.title} className="w-full h-full object-cover" />
                                                            ) : (
                                                                <div className="text-red-600 font-black text-xs">{item.icon}</div>
                                                            )}
                                                        </div>
                                                    ) : contentSubTab === 'footer' ? (
                                                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-900 rounded-xl flex items-center justify-center text-red-600"><MapPin size={24}/></div>
                                                    ) : null}
                                                    
                                                    <div className="flex-grow">
                                                        <h4 className="font-bold dark:text-white flex items-center gap-2">
                                                            {item.name || item.title || item.email || 'Site Asset'}
                                                            {item.tag && <span className="text-[9px] px-2 py-0.5 bg-red-600 text-white rounded-full uppercase tracking-tighter">{item.tag}</span>}
                                                            {item.category && <span className="text-[9px] px-2 py-0.5 bg-gray-900 text-white rounded-full uppercase tracking-tighter">{item.category}</span>}
                                                        </h4>
                                                        <p className="text-xs text-gray-500 mt-1 line-clamp-2 italic">{item.description || item.feedback || item.address}</p>
                                                        <div className="flex gap-4 mt-3">
                                                            {item.price && <span className="text-xs font-black text-red-600">{item.price}</span>}
                                                            {item.rating && <span className="text-xs font-bold flex items-center gap-1"><Star size={12} className="fill-yellow-400 text-yellow-400"/> {item.rating}</span>}
                                                            {item.company && <span className="text-xs font-bold text-blue-500">{item.company}</span>}
                                                            {item.author && <span className="text-xs font-bold text-gray-400 flex items-center gap-1"><BookOpen size={12}/> {item.author}</span>}
                                                            {item.phone && <span className="text-xs font-bold text-gray-400 flex items-center gap-1"><Phone size={12}/> {item.phone}</span>}
                                                        </div>
                                                    </div>
                                                    <button onClick={() => handleDeleteContent(item._id)} className="text-gray-300 hover:text-red-600 p-2 transition-all opacity-0 group-hover:opacity-100"><Trash2 size={20}/></button>
                                                </div>
                                            </div>
                                        ))}

                                        {activeTab === 'tasks' && tasks.length === 0 && (
                                            <div className="p-20 text-center text-gray-400">No tasks assigned yet.</div>
                                        )}
                                        {activeTab === 'tasks' && tasks.map(t => (
                                            <div key={t._id} className="p-6 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-bold dark:text-white">{t.title}</h4>
                                                        <p className="text-xs text-gray-500 mt-1">Assigned to ID: <span className="font-bold text-gray-900 dark:text-gray-300">{t.assignedTo}</span></p>
                                                        <div className="flex items-center gap-4 mt-3">
                                                            <div className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg ${
                                                                t.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                                            }`}>
                                                                {t.status === 'completed' ? <CheckCircle size={14}/> : <Clock size={14}/>} {t.status}
                                                            </div>
                                                            {t.dueDate && <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1"><AlertCircle size={10}/> Due {new Date(t.dueDate).toLocaleDateString()}</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            </div>
        </DashboardLayout>
    );
};

export default ManagerDashboard;
