import React, { useState, useEffect } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import { ClipboardList, CheckCircle, Clock, AlertCircle, Send, FileText, Coffee } from 'lucide-react';

import DashboardLayout from '../../components/dashboard/DashboardLayout';

const EmployeeDashboard = () => {
    const { user } = useUser();
    const { getToken } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        fetchMyTasks();
    }, []);

    const fetchMyTasks = async () => {
        setLoading(true);
        try {
            const token = await getToken();
            const res = await fetch(`${import.meta.env.VITE_API_URL}/ops/tasks/my`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            setTasks(Array.isArray(data) ? data : []);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleUpdateStatus = async (taskId, status, report = '') => {
        try {
            const token = await getToken();
            const res = await fetch(`${import.meta.env.VITE_API_URL}/ops/tasks/${taskId}/status`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status, report })
            });
            if (res.ok) {
                setMessage('Task status updated!');
                fetchMyTasks();
                setSelectedTask(null);
                setTimeout(() => setMessage(''), 3000);
            }
        } catch (err) { console.error(err); }
    };

    return (
        <DashboardLayout>
            <div className="min-h-screen pb-12">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <Coffee className="text-red-600" /> Employee Workspace
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Focus on task execution and reporting coffee operations.</p>
                </div>

                {message && <div className="mb-8 p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-2xl border border-green-200 dark:border-green-800/50 flex items-center gap-2 font-bold shadow-lg shadow-green-500/10 animate-fade-in"><CheckCircle size={20}/> {message}</div>}

                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                     <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">My Total Tasks</p>
                        <h3 className="text-3xl font-black dark:text-white">{tasks.length}</h3>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Pending</p>
                        <h3 className="text-3xl font-black text-amber-600">{tasks.filter(t => t.status === 'pending').length}</h3>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Completed</p>
                        <h3 className="text-3xl font-black text-green-600">{tasks.filter(t => t.status === 'completed').length}</h3>
                    </div>
                </div>

                {/* Task List */}
                <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="p-8 border-b border-gray-50 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-black/20">
                        <h2 className="text-xl font-bold dark:text-white flex items-center gap-2 italic"><ClipboardList className="text-red-600"/> Assigned Tasks</h2>
                        <span className="text-xs font-black uppercase tracking-tighter text-gray-400">Updates live</span>
                    </div>

                    <div className="divide-y divide-gray-50 dark:divide-gray-700">
                        {loading ? (
                            <div className="p-20 text-center text-gray-400 font-bold uppercase tracking-widest">
                                <span className="inline-block animate-bounce mr-2">☕</span> Loading tasks...
                            </div>
                        ) : tasks.length === 0 ? (
                            <div className="p-20 text-center">
                                <div className="w-16 h-16 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                                    <AlertCircle size={32}/>
                                </div>
                                <h3 className="text-lg font-bold dark:text-white">All caught up!</h3>
                                <p className="text-gray-500 font-medium mt-1">No tasks assigned to you at the moment.</p>
                            </div>
                        ) : tasks.map(t => (
                            <div key={t._id} className={`p-8 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors group ${selectedTask?._id === t._id ? 'bg-red-50/30 dark:bg-red-900/10' : ''}`}>
                                <div className="flex flex-col md:flex-row justify-between gap-6">
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                                                t.status === 'completed' 
                                                ? 'bg-green-100 text-green-700 border-green-200' 
                                                : 'bg-amber-100 text-amber-700 border-amber-200'
                                            }`}>
                                                {t.status}
                                            </span>
                                            {t.dueDate && (
                                                <span className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">
                                                    <Clock size={12}/> Due {new Date(t.dueDate).toLocaleDateString()}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-xl font-bold dark:text-white mb-2 group-hover:text-red-600 transition-colors capitalize">{t.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">{t.description}</p>
                                        
                                        {t.managerReport && (
                                            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-900 rounded-2xl text-xs font-medium border-l-4 border-red-600">
                                                <p className="text-gray-500 uppercase tracking-widest text-[9px] font-black mb-1">Feedback from manager:</p>
                                                <p className="dark:text-white text-gray-900 italic font-bold">"{t.managerReport}"</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col space-y-3 justify-center min-w-[200px]">
                                        {t.status === 'pending' ? (
                                            <button 
                                                onClick={() => setSelectedTask(t)}
                                                className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-red-600 dark:hover:bg-red-600 dark:hover:text-white transition-all shadow-lg hover:shadow-red-500/20 flex items-center justify-center gap-2"
                                            >
                                                Submit Report <Send size={14}/>
                                            </button>
                                        ) : (
                                            <button className="w-full py-4 bg-green-50 text-green-600 font-black uppercase tracking-widest text-xs rounded-2xl border border-green-100 flex items-center justify-center gap-2 cursor-default">
                                                Task Fixed <CheckCircle size={14}/>
                                            </button>
                                        )}
                                        {t.status === 'completed' && t.completionReport && (
                                             <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-red-600 transition-colors flex items-center justify-center gap-1">
                                                <FileText size={12}/> View my report
                                             </button>
                                        )}
                                    </div>
                                </div>

                                {/* Report Form Reveal */}
                                {selectedTask?._id === t._id && (
                                    <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700 max-w-2xl animate-fade-in">
                                        <h4 className="text-sm font-black uppercase tracking-widest text-red-600 mb-4 italic flex items-center gap-2">
                                            <FileText size={16}/> Completion Statement
                                        </h4>
                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            handleUpdateStatus(t._id, 'completed', e.target.report.value);
                                        }} className="space-y-4">
                                            <textarea 
                                                name="report" 
                                                placeholder="Describe how you completed this task..." 
                                                className="w-full p-5 rounded-[2rem] bg-gray-100 dark:bg-gray-900 border-none focus:ring-4 focus:ring-red-500/10 outline-none text-sm font-bold dark:text-white"
                                                required
                                            />
                                            <div className="flex gap-3">
                                                <button type="submit" className="flex-grow py-4 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-red-500/30 transition-all">
                                                    Submit To Manager
                                                </button>
                                                <button 
                                                    type="button" 
                                                    onClick={() => setSelectedTask(null)}
                                                    className="px-8 py-4 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-gray-300 transition-all"
                                                >
                                                    Discard
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            </div>
        </DashboardLayout>
    );
};

export default EmployeeDashboard;
