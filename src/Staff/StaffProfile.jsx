import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// --- Shared Functional Components ---

function Sidebar() {
    return (
        <aside className="w-64 bg-green flex flex-col justify-between h-full fixed left-0 top-0 z-50 transition-all duration-300 shadow-xl">
            <div className="p-6">
                <div className="flex items-center gap-3 mb-10">
                    <div className="flex items-center justify-center size-10 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
                        <span className="material-symbols-outlined text-white text-2xl">visibility</span>
                    </div>
                    <div>
                        <h1 className="text-white text-xl font-bold tracking-tight">iOnYou</h1>
                        <p className="text-white/60 text-xs font-medium uppercase tracking-wider">Staff Portal</p>
                    </div>
                </div>
                <nav className="flex flex-col gap-2">
                    <SidebarLink icon="dashboard" label="Dashboard" to="/staff-dashboard" />
                    <SidebarLink icon="school" label="My Classes" to="/staff-classes" />
                    <SidebarLink icon="assignment_turned_in" label="Attendance Mgmt" to="/staff-ledger" />
                    <SidebarLink icon="schedule" label="Schedule" to="/staff-schedule" />
                    {/* Active Link */}
                    <SidebarLink icon="person" label="Profile" to="/staff-profile" active={true} />
                </nav>
            </div>
            <div className="p-6 border-t border-white/10">
                <button className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-orange text-white font-bold rounded-lg shadow-lg shadow-orange/20 hover:brightness-110 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
                    <span className="material-symbols-outlined text-[20px]">play_circle</span>
                    Start Session
                </button>
                <div className="mt-6 flex items-center gap-3">
                    <div className="size-10 rounded-full bg-cover bg-center border-2 border-white/30" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAn7FZkWLEhGeQ7h2KrXawY0WFOtjJ4uJHEvmXB8SaBLzlkTNosgXH1kVvRw6gZmpO32Td8OnEGoqXpeJYo6OK7TbwBwg59dLGAZ6lp2MOG4TdwY7Rhb67V-wfocjzoiwVC-jgldeK8iks-2aqZ9U9yZn6eqGNe3zo0O-TiIBUhjAwHXjnhTCgxrfye3vgF8So4keSTOhOOu4JEnEfYNvbKcpxIndz7c77xqr4U0Areb4X8IxfupoUXF1rRRF5DAQd3XkRV5PVBS48')" }}></div>
                    <div className="flex flex-col">
                        <span className="text-white text-sm font-medium">Prof. Dev</span>
                        <span className="text-white/60 text-xs">Staff ID: 20250410461</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}

function SidebarLink({ icon, label, to = "#", active = false }) {
    return (
        <Link
            to={to}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group cursor-pointer ${active
                    ? 'bg-white/10 text-white shadow-sm ring-1 ring-white/10'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
        >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform duration-300">{icon}</span>
            <span className="font-medium">{label}</span>
        </Link>
    );
}

function Header({ onEditClick, onSecurityClick }) {
    return (
        <header className="bg-bg-main/90 backdrop-blur-md px-8 py-6 flex justify-between items-center border-b border-glass-border shrink-0 sticky top-0 z-40 animate-fade-in-up">
            <div>
                <h2 className="text-2xl font-bold text-main tracking-tight">Staff Profile</h2>
                <nav className="flex text-[10px] uppercase tracking-widest text-muted font-bold mt-1">
                    <Link to="/staff-dashboard" className="hover:text-green transition-colors">Dashboard</Link>
                    <span className="mx-2">/</span>
                    <span className="text-green">Profile</span>
                </nav>
            </div>
            <div className="flex gap-3 items-center">
                <button onClick={onSecurityClick} className="px-5 py-2.5 bg-transparent border border-glass-border text-body rounded-lg text-xs font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center gap-2 cursor-pointer shadow-sm">
                    <span className="material-symbols-outlined text-[18px]">lock</span>
                    Security Settings
                </button>
                {/* Attached onClick event here */}
                <button onClick={onEditClick} className="px-6 py-2.5 bg-orange text-white rounded-lg text-xs font-bold hover:brightness-110 transition-all flex items-center gap-2 shadow-sm cursor-pointer">
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                    Edit Profile
                </button>
            </div>
        </header>
    );
}

// Reusable Info Field Component
function InfoField({ label, value, fullWidth = false }) {
    return (
        <div className={fullWidth ? "col-span-2" : ""}>
            <label className="text-[10px] font-bold text-muted uppercase tracking-widest block mb-1">{label}</label>
            <span className="text-sm font-medium text-main">{value}</span>
        </div>
    );
}

// --- Main Profile Component ---

function StaffProfile() {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);

    return (
        <div className="fixed inset-0 w-full flex overflow-hidden bg-bg-main text-body font-display transition-colors duration-500">
            <Sidebar />

            <main className="ml-64 flex-1 h-screen overflow-y-auto flex flex-col relative scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                <Header onEditClick={() => setIsEditModalOpen(true)} onSecurityClick={() => setIsSecurityModalOpen(true)} />

                <div className="p-8 max-w-6xl w-full mx-auto space-y-8 pb-20">
                    
                    {/* Hero Section */}
                    <section className="bg-white/50 dark:bg-black/20 backdrop-blur-md border border-glass-border rounded-xl p-8 shadow-sm flex flex-col md:flex-row items-center gap-8 animate-fade-in-up stagger-1">
                        <div className="relative">
                            <div className="size-32 rounded-full border-4 border-bg-main overflow-hidden shadow-sm bg-black/5 dark:bg-white/5">
                                <img alt="Prof. Dev" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAn7FZkWLEhGeQ7h2KrXawY0WFOtjJ4uJHEvmXB8SaBLzlkTNosgXH1kVvRw6gZmpO32Td8OnEGoqXpeJYo6OK7TbwBwg59dLGAZ6lp2MOG4TdwY7Rhb67V-wfocjzoiwVC-jgldeK8iks-2aqZ9U9yZn6eqGNe3zo0O-TiIBUhjAwHXjnhTCgxrfye3vgF8So4keSTOhOOu4JEnEfYNvbKcpxIndz7c77xqr4U0Areb4X8IxfupoUXF1rRRF5DAQd3XkRV5PVBS48" />
                            </div>
                            <div className="absolute bottom-1 right-1 size-8 bg-green rounded-full border-4 border-bg-main flex items-center justify-center">
                                <span className="material-symbols-outlined text-white text-[14px]">verified</span>
                            </div>
                        </div>
                        <div className="text-center md:text-left flex-1">
                            <h3 className="text-3xl font-bold text-main">Prof. Dev</h3>
                            <p className="text-green font-semibold text-lg">Department of Computer Science</p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-4">
                                <span className="flex items-center gap-1.5 text-xs text-muted font-medium">
                                    <span className="material-symbols-outlined text-[16px] text-green">mail</span> dev.prof@university.edu
                                </span>
                                <span className="flex items-center gap-1.5 text-xs text-muted font-medium">
                                    <span className="material-symbols-outlined text-[16px] text-green">location_on</span> Block C, Room 402
                                </span>
                                <div className="flex gap-4 border-l border-glass-border pl-6">
                                    <a className="text-orange hover:brightness-110 transition-all" href="#">
                                        <svg className="size-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                                    </a>
                                    <a className="text-orange hover:brightness-110 transition-all" href="#">
                                        <span className="material-symbols-outlined text-[20px]">school</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Profile Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Personal Information */}
                        <section className="bg-white/50 dark:bg-black/20 backdrop-blur-md border border-glass-border rounded-xl p-8 shadow-sm h-full animate-fade-in-up stagger-2">
                            <div className="flex items-center gap-2 mb-6 border-b border-glass-border pb-4">
                                <span className="material-symbols-outlined text-green">person</span>
                                <h4 className="text-sm font-bold text-main uppercase tracking-wider">Personal Information</h4>
                            </div>
                            <div className="grid grid-cols-2 gap-y-6">
                                <InfoField label="Employee ID" value="20250410461" />
                                <InfoField label="Joining Date" value="August 12, 2018" />
                                <InfoField label="Phone Number" value="+1 (555) 012-3456" />
                                <InfoField label="Email Address" value="dev.prof@uni.edu" />
                                <InfoField label="Office Address" value="123 University Ave, Science Wing, Floor 4" fullWidth />
                            </div>
                        </section>

                        {/* Academic Specialization */}
                        <section className="bg-white/50 dark:bg-black/20 backdrop-blur-md border border-glass-border rounded-xl p-8 shadow-sm h-full animate-fade-in-up stagger-3">
                            <div className="flex items-center gap-2 mb-6 border-b border-glass-border pb-4">
                                <span className="material-symbols-outlined text-green">school</span>
                                <h4 className="text-sm font-bold text-main uppercase tracking-wider">Academic Specialization</h4>
                            </div>
                            <div className="grid grid-cols-2 gap-y-6">
                                <InfoField label="Designation" value="Associate Professor" />
                                <InfoField label="Qualifications" value="PhD in Computer Science" />
                                <div className="col-span-2">
                                    <label className="text-[10px] font-bold text-muted uppercase tracking-widest block mb-2">Subjects Expertise</label>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-2 py-1 bg-black/5 dark:bg-white/5 text-body text-[10px] font-bold border border-glass-border rounded uppercase">Internet of Things (IOT)</span>
                                        <span className="px-2 py-1 bg-black/5 dark:bg-white/5 text-body text-[10px] font-bold border border-glass-border rounded uppercase">Python Programming</span>
                                        <span className="px-2 py-1 bg-black/5 dark:bg-white/5 text-body text-[10px] font-bold border border-glass-border rounded uppercase">MERN Stack</span>
                                    </div>
                                </div>
                                <InfoField label="Research Areas" value="Distributed Systems, Embedded Intelligence, Cloud Computing" fullWidth />
                            </div>
                        </section>

                        {/* Publications & Research */}
                        <section className="bg-white/50 dark:bg-black/20 backdrop-blur-md border border-glass-border rounded-xl p-8 shadow-sm h-full animate-fade-in-up stagger-4">
                            <div className="flex items-center gap-2 mb-6 border-b border-glass-border pb-4">
                                <span className="material-symbols-outlined text-green">menu_book</span>
                                <h4 className="text-sm font-bold text-main uppercase tracking-wider">Publications & Research</h4>
                            </div>
                            <ul className="space-y-4">
                                <li className="border-l-2 border-green pl-4 py-1">
                                    <p className="text-xs font-bold text-main leading-tight">Towards Decentralized Privacy in University Attendance Systems</p>
                                    <p className="text-[10px] text-muted mt-1 uppercase font-semibold">IEEE Journal of IoT • 2023</p>
                                </li>
                                <li className="border-l-2 border-green pl-4 py-1">
                                    <p className="text-xs font-bold text-main leading-tight">Optimizing Neural Networks for Low-Power Embedded Edge Devices</p>
                                    <p className="text-[10px] text-muted mt-1 uppercase font-semibold">ACM Transactions • 2022</p>
                                </li>
                                <li className="border-l-2 border-glass-border pl-4 py-1">
                                    <p className="text-xs font-bold text-body leading-tight">Hybrid Cloud Architectures for Academic Institution Management</p>
                                    <p className="text-[10px] text-muted mt-1 uppercase font-semibold">Intl. Conference on CS • 2021</p>
                                </li>
                            </ul>
                        </section>

                        {/* Current Projects */}
                        <section className="bg-white/50 dark:bg-black/20 backdrop-blur-md border border-glass-border rounded-xl p-8 shadow-sm h-full animate-fade-in-up stagger-5">
                            <div className="flex items-center gap-2 mb-6 border-b border-glass-border pb-4">
                                <span className="material-symbols-outlined text-green">rocket_launch</span>
                                <h4 className="text-sm font-bold text-main uppercase tracking-wider">Current Projects</h4>
                            </div>
                            <div className="space-y-5">
                                <div className="flex items-start gap-3">
                                    <div className="size-8 bg-black/5 dark:bg-white/5 rounded-lg flex items-center justify-center shrink-0 border border-glass-border">
                                        <span className="material-symbols-outlined text-orange text-[20px]">smart_toy</span>
                                    </div>
                                    <div>
                                        <h5 className="text-xs font-bold text-main">Project AI-Sentinel</h5>
                                        <p className="text-[11px] text-muted leading-relaxed mt-1">Autonomous campus monitoring using computer vision and edge-AI controllers.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="size-8 bg-black/5 dark:bg-white/5 rounded-lg flex items-center justify-center shrink-0 border border-glass-border">
                                        <span className="material-symbols-outlined text-orange text-[20px]">router</span>
                                    </div>
                                    <div>
                                        <h5 className="text-xs font-bold text-main">iOnYou Mesh Network</h5>
                                        <p className="text-[11px] text-muted leading-relaxed mt-1">Next-gen LoraWAN infrastructure for low-latency student tracking on campus.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Office Hours */}
                        <section className="bg-white/50 dark:bg-black/20 backdrop-blur-md border border-glass-border rounded-xl p-8 shadow-sm md:col-span-2 animate-fade-in-up stagger-6">
                            <div className="flex items-center gap-2 mb-6 border-b border-glass-border pb-4">
                                <span className="material-symbols-outlined text-green">event_available</span>
                                <h4 className="text-sm font-bold text-main uppercase tracking-wider">Contact Hours & Consultations</h4>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <div className="bg-black/5 dark:bg-white/5 p-4 border border-glass-border rounded-lg">
                                    <label className="text-[10px] font-bold text-green uppercase tracking-widest block mb-1">Monday & Wednesday</label>
                                    <span className="text-sm font-medium text-main">10:00 AM - 12:00 PM</span>
                                    <span className="block text-[10px] mt-1 text-muted">Walk-in consultations</span>
                                </div>
                                <div className="bg-black/5 dark:bg-white/5 p-4 border border-glass-border rounded-lg">
                                    <label className="text-[10px] font-bold text-green uppercase tracking-widest block mb-1">Friday</label>
                                    <span className="text-sm font-medium text-main">02:00 PM - 04:00 PM</span>
                                    <span className="block text-[10px] mt-1 text-muted">Project guidance (By Appt)</span>
                                </div>
                                <div className="bg-black/5 dark:bg-white/5 p-4 border border-glass-border rounded-lg">
                                    <label className="text-[10px] font-bold text-green uppercase tracking-widest block mb-1">Office Location</label>
                                    <span className="text-sm font-medium text-main">C-402, Block C</span>
                                    <span className="block text-[10px] mt-1 text-muted">Main Campus</span>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>

                {/* --- EXACT REPLICA EDIT PROFILE POPUP --- */}
                {isEditModalOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in-up">
                        <div className="bg-bg-main border border-glass-border shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col rounded-none md:rounded-lg">
                            
                            {/* Modal Header */}
                            <div className="px-6 py-4 bg-green flex justify-between items-center text-white">
                                <h3 className="text-lg font-bold flex items-center gap-2 tracking-wide">
                                    <span className="material-symbols-outlined text-[20px]">edit_square</span>
                                    Edit Professor Details
                                </h3>
                                <button onClick={() => setIsEditModalOpen(false)} className="hover:opacity-80 transition-opacity cursor-pointer">
                                    <span className="material-symbols-outlined text-2xl">close</span>
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-8 space-y-8 overflow-y-auto max-h-[75vh] scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                                
                                {/* 1. Personal Information */}
                                <div>
                                    <div className="flex items-center gap-2 mb-4 border-b border-glass-border pb-2">
                                        <span className="material-symbols-outlined text-green text-[18px]">contact_page</span>
                                        <h4 className="text-[11px] font-bold text-green uppercase tracking-widest">Personal Information</h4>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[9px] font-bold text-muted uppercase tracking-widest">Phone Number</label>
                                            <input type="text" defaultValue="+1 (555) 012-3456" className="bg-black/5 dark:bg-white/5 border border-glass-border text-main rounded px-4 py-3 text-sm outline-none focus:border-green focus:ring-1 focus:ring-green transition-all" />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[9px] font-bold text-muted uppercase tracking-widest">Email Address</label>
                                            <input type="email" defaultValue="dev.prof@uni.edu" className="bg-black/5 dark:bg-white/5 border border-glass-border text-main rounded px-4 py-3 text-sm outline-none focus:border-green focus:ring-1 focus:ring-green transition-all" />
                                        </div>
                                        <div className="flex flex-col gap-1.5 md:col-span-2">
                                            <label className="text-[9px] font-bold text-muted uppercase tracking-widest">Office Address</label>
                                            <input type="text" defaultValue="123 University Ave, Science Wing, Floor 4 c" className="bg-black/5 dark:bg-white/5 border border-glass-border text-main rounded px-4 py-3 text-sm outline-none focus:border-green focus:ring-1 focus:ring-green transition-all" />
                                        </div>
                                    </div>
                                </div>

                                {/* 2. Academic Specialization */}
                                <div>
                                    <div className="flex items-center gap-2 mb-4 border-b border-glass-border pb-2">
                                        <span className="material-symbols-outlined text-green text-[18px]">workspace_premium</span>
                                        <h4 className="text-[11px] font-bold text-green uppercase tracking-widest">Academic Specialization</h4>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[9px] font-bold text-muted uppercase tracking-widest">Designation</label>
                                            <input type="text" defaultValue="Associate Professor" className="bg-black/5 dark:bg-white/5 border border-glass-border text-main rounded px-4 py-3 text-sm outline-none focus:border-green focus:ring-1 focus:ring-green transition-all" />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[9px] font-bold text-muted uppercase tracking-widest">Qualifications</label>
                                            <input type="text" defaultValue="PhD in Computer Science" className="bg-black/5 dark:bg-white/5 border border-glass-border text-main rounded px-4 py-3 text-sm outline-none focus:border-green focus:ring-1 focus:ring-green transition-all" />
                                        </div>
                                        <div className="flex flex-col gap-1.5 md:col-span-2">
                                            <label className="text-[9px] font-bold text-muted uppercase tracking-widest">Subjects Expertise</label>
                                            <input type="text" defaultValue="Internet of Things (IoT), Python Programming, MERN Stack" className="bg-black/5 dark:bg-white/5 border border-glass-border text-main rounded px-4 py-3 text-sm outline-none focus:border-green focus:ring-1 focus:ring-green transition-all" />
                                            <span className="text-[9px] font-bold text-muted uppercase tracking-widest mt-0.5">Separate expertise areas with commas</span>
                                        </div>
                                    </div>
                                </div>

                                {/* 3. Research & Projects */}
                                <div>
                                    <div className="flex items-center gap-2 mb-4 border-b border-glass-border pb-2">
                                        <span className="material-symbols-outlined text-green text-[18px]">science</span>
                                        <h4 className="text-[11px] font-bold text-green uppercase tracking-widest">Research & Projects</h4>
                                    </div>
                                    <div className="grid grid-cols-1 gap-6">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[9px] font-bold text-muted uppercase tracking-widest">Current Research Areas</label>
                                            <textarea rows="3" defaultValue="Distributed Systems, Embedded Intelligence, Cloud Computing, and Decentralized Privacy in University Attendance Systems." className="bg-black/5 dark:bg-white/5 border border-glass-border text-main rounded px-4 py-3 text-sm outline-none focus:border-green focus:ring-1 focus:ring-green transition-all resize-none"></textarea>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[9px] font-bold text-muted uppercase tracking-widest">Project Descriptions</label>
                                            <textarea rows="4" defaultValue="Project AI-Sentinel: Autonomous campus monitoring using computer vision and edge-AI controllers.
iOnYou Mesh Network: Next-gen LoraWAN infrastructure for low-latency student tracking on campus." className="bg-black/5 dark:bg-white/5 border border-glass-border text-main rounded px-4 py-3 text-sm outline-none focus:border-green focus:ring-1 focus:ring-green transition-all resize-none"></textarea>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>

                            {/* Modal Footer */}
                            <div className="px-8 py-5 border-t border-glass-border bg-black/5 dark:bg-white/5 flex justify-end gap-4">
                                <button onClick={() => setIsEditModalOpen(false)} className="px-8 py-3 text-xs font-bold text-green border-2 border-green hover:bg-green hover:text-white transition-colors cursor-pointer uppercase tracking-widest">
                                    Cancel
                                </button>
                                <button onClick={() => setIsEditModalOpen(false)} className="px-8 py-3 bg-orange text-white text-xs font-bold border-2 border-orange hover:brightness-110 transition-all shadow-sm cursor-pointer uppercase tracking-widest">
                                    Save Changes
                                </button>
                            </div>

                        </div>
                    </div>
                )}
                
                {/* --- ADDED SECURITY SETTINGS POPUP --- */}
                {isSecurityModalOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in-up">
                        <div className="bg-bg-main border border-glass-border rounded-xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col">
                            
                            {/* Modal Header */}
                            <div className="bg-green px-8 py-5 flex justify-between items-center shrink-0">
                                <h3 className="text-white font-bold text-lg tracking-tight uppercase">Security Settings</h3>
                                <button onClick={() => setIsSecurityModalOpen(false)} className="text-white/80 hover:text-white transition-colors cursor-pointer">
                                    <span className="material-symbols-outlined text-[24px]">close</span>
                                </button>
                            </div>
                            
                            {/* Modal Body */}
                            <div className="p-8 space-y-6">
                                <div className="space-y-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] font-bold text-muted uppercase tracking-widest pl-1">Current Password</label>
                                        <input className="bg-black/5 dark:bg-white/5 border border-glass-border text-main rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green focus:ring-1 focus:ring-green transition-all" placeholder="Enter current password" type="password" />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] font-bold text-muted uppercase tracking-widest pl-1">New Password</label>
                                        <input className="bg-black/5 dark:bg-white/5 border border-glass-border text-main rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green focus:ring-1 focus:ring-green transition-all" placeholder="Enter new password" type="password" />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] font-bold text-muted uppercase tracking-widest pl-1">Confirm Password</label>
                                        <input className="bg-black/5 dark:bg-white/5 border border-glass-border text-main rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green focus:ring-1 focus:ring-green transition-all" placeholder="Confirm new password" type="password" />
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3 py-2">
                                    <input className="w-4 h-4 text-green border-glass-border bg-black/5 dark:bg-white/5 rounded focus:ring-green cursor-pointer" id="two-factor" type="checkbox" />
                                    <label className="text-sm font-medium text-main cursor-pointer" htmlFor="two-factor">Enable Two-Factor Authentication</label>
                                </div>
                                
                                <div className="pt-2 border-t border-glass-border">
                                    <p className="text-[11px] font-bold text-muted uppercase tracking-widest">Last Login: 10 Oct 2024, 10:30 AM</p>
                                </div>
                            </div>
                            
                            {/* Modal Footer */}
                            <div className="px-8 pb-8 flex flex-col gap-3">
                                <button onClick={() => setIsSecurityModalOpen(false)} className="w-full py-3 bg-orange text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:brightness-110 transition-all shadow-sm cursor-pointer">
                                    Update Security
                                </button>
                                <button onClick={() => setIsSecurityModalOpen(false)} className="w-full py-3 border border-green text-green font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer">
                                    Cancel
                                </button>
                            </div>
                            
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}

export default StaffProfile;