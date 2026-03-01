import React from 'react';
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
                    <SidebarLink icon="assignment_turned_in" label="Attendance Mgmt" to="/staff-attendance" />
                    {/* Active Link */}
                    <SidebarLink icon="schedule" label="Schedule" to="/staff-schedule" active={true} />
                    <SidebarLink icon="person" label="Profile" to="/staff-profile" />
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

function Header() {
    return (
        <header className="bg-bg-main/90 backdrop-blur-md px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-glass-border z-40 shrink-0 shadow-sm animate-fade-in-up">
            <div className="flex items-center gap-6 mb-4 md:mb-0">
                <div>
                    <h2 className="text-lg font-bold text-main tracking-tight">Staff Schedule Manager</h2>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-muted text-[9px] font-mono uppercase tracking-wide">AY 2024-25</span>
                        <span className="size-1 rounded-full bg-muted"></span>
                        <span className="text-muted text-[9px] font-mono uppercase tracking-wide">Oct 21 - 25</span>
                    </div>
                </div>
                <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-lg border border-glass-border">
                    <select className="bg-transparent border-none text-[10px] font-bold text-body focus:ring-0 cursor-pointer py-0.5 pl-2 pr-6 rounded outline-none">
                        <option>Semester 1</option>
                        <option>Semester 2</option>
                    </select>
                    <div className="w-px h-3 bg-glass-border"></div>
                    <select className="bg-transparent border-none text-[10px] font-bold text-body focus:ring-0 cursor-pointer py-0.5 pl-2 pr-6 rounded outline-none">
                        <option>Batch 2024-A</option>
                        <option>Batch 2024-B</option>
                    </select>
                </div>
            </div>
            <div className="flex gap-2 items-center">
                <button className="px-2 py-1 text-muted rounded-md text-[11px] font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center gap-1 border border-transparent hover:border-glass-border cursor-pointer">
                    <span className="material-symbols-outlined text-[14px]">print</span>
                    Print
                </button>
                <button className="px-4 py-1.5 bg-orange text-white rounded-lg text-xs font-bold hover:brightness-110 transition-all flex items-center gap-2 shadow-sm cursor-pointer">
                    <span className="material-symbols-outlined text-[16px]">publish</span>
                    Publish Schedule
                </button>
            </div>
        </header>
    );
}

// Reusable Time Slot Component
function EmptyTimeSlot() {
    return (
        <div className="h-[60px] border-b border-glass-border relative group">
            <button className="opacity-0 group-hover:opacity-100 absolute inset-0 flex items-center justify-center bg-green/5 cursor-copy transition-opacity text-green w-full h-full border-none outline-none">
                <span className="material-symbols-outlined text-sm">add_circle</span>
            </button>
        </div>
    );
}

// Reusable Class Card Component
function ClassCard({ top, height, code, title, location, isMain = true }) {
    return (
        <div 
            className={`absolute left-1 right-1 rounded-md p-1.5 shadow-sm cursor-grab active:cursor-grabbing z-10 group transition-transform hover:scale-[1.02] border border-white/10 backdrop-blur-sm ${isMain ? 'bg-green text-white' : 'bg-orange text-white'}`}
            style={{ top: `${top}px`, height: `${height}px` }}
        >
            <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-[12px] opacity-50 group-hover:opacity-100 transition-opacity">drag_indicator</span>
                <span className="material-symbols-outlined text-[12px] cursor-pointer hover:scale-110 opacity-70 group-hover:opacity-100 transition-all">edit</span>
            </div>
            <span className="text-[8px] font-bold opacity-80 uppercase tracking-tighter block mt-0.5">{code}</span>
            <h4 className="font-bold text-[11px] leading-tight truncate">{title}</h4>
            {location && (
                <div className="flex items-center gap-1 mt-0.5 text-[8px] opacity-90 truncate">
                    <span className="material-symbols-outlined text-[10px]">location_on</span> {location}
                </div>
            )}
        </div>
    );
}

// --- Main Dashboard Component ---

function StaffSchedule() {
    // Generates an array for 10 empty rows per day to keep JSX clean
    const emptyRows = Array.from({ length: 10 });

    return (
        <div className="fixed inset-0 w-full flex overflow-hidden bg-bg-main text-body font-display transition-colors duration-500">
            <Sidebar />

            <main className="ml-64 flex-1 h-screen overflow-hidden flex flex-col relative">
                <Header />

                <div className="flex flex-1 overflow-hidden">
                    
                    {/* Center Schedule Area */}
                    <div className="flex-1 overflow-y-auto px-4 pb-4 pt-4 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent animate-fade-in-up stagger-1">
                        <div className="bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-xl shadow-sm border border-glass-border overflow-hidden relative">
                            
                            {/* Schedule Header */}
                            <div className="grid grid-cols-[60px_repeat(5,1fr)] bg-black/5 dark:bg-white/5 border-b border-glass-border sticky top-0 z-30">
                                <div className="p-2"></div>
                                <div className="p-2 text-center font-bold text-main text-[10px] border-l border-glass-border uppercase tracking-wider">Mon</div>
                                <div className="p-2 text-center font-bold text-main text-[10px] border-l border-glass-border uppercase tracking-wider">Tue</div>
                                <div className="p-2 text-center font-bold text-orange text-[10px] border-l border-glass-border bg-orange/10 uppercase tracking-wider">Wed</div>
                                <div className="p-2 text-center font-bold text-main text-[10px] border-l border-glass-border uppercase tracking-wider">Thu</div>
                                <div className="p-2 text-center font-bold text-main text-[10px] border-l border-glass-border uppercase tracking-wider">Fri</div>
                            </div>

                            {/* Schedule Body */}
                            <div className="grid grid-cols-[60px_repeat(5,1fr)] relative">
                                
                                {/* Time Column */}
                                <div className="flex flex-col bg-black/5 dark:bg-white/5 border-r border-glass-border">
                                    <div className="h-[60px] border-b border-glass-border p-1 text-[9px] font-mono text-muted text-right pr-2">08:00 AM</div>
                                    <div className="h-[60px] border-b border-glass-border p-1 text-[9px] font-mono text-muted text-right pr-2">09:00 AM</div>
                                    <div className="h-[60px] border-b border-glass-border p-1 text-[9px] font-mono text-muted text-right pr-2">10:00 AM</div>
                                    <div className="h-[60px] border-b border-glass-border p-1 text-[9px] font-mono text-muted text-right pr-2">11:00 AM</div>
                                    <div className="h-[60px] border-b border-glass-border p-1 text-[9px] font-mono text-muted text-right pr-2">12:00 PM</div>
                                    <div className="h-[60px] border-b border-glass-border p-1 text-[9px] font-mono text-muted text-right pr-2">01:00 PM</div>
                                    <div className="h-[60px] border-b border-glass-border p-1 text-[9px] font-mono text-muted text-right pr-2">02:00 PM</div>
                                    <div className="h-[60px] border-b border-glass-border p-1 text-[9px] font-mono text-muted text-right pr-2">03:00 PM</div>
                                    <div className="h-[60px] border-b border-glass-border p-1 text-[9px] font-mono text-muted text-right pr-2">04:00 PM</div>
                                    <div className="h-[60px] border-b border-glass-border p-1 text-[9px] font-mono text-muted text-right pr-2">05:00 PM</div>
                                </div>

                                {/* Mon Column */}
                                <div className="border-r border-glass-border relative">
                                    <div className="absolute inset-0">
                                        {emptyRows.map((_, i) => <EmptyTimeSlot key={`mon-${i}`} />)}
                                    </div>
                                    <ClassCard top={60} height={90} code="CS-304" title="Python for IOT" location="Lab 304" />
                                    <ClassCard top={300} height={60} code="CS-201" title="Database Systems" isMain={false} />
                                </div>

                                {/* Tue Column */}
                                <div className="border-r border-glass-border relative">
                                    <div className="absolute inset-0">
                                        {emptyRows.map((_, i) => <EmptyTimeSlot key={`tue-${i}`} />)}
                                    </div>
                                    <ClassCard top={120} height={120} code="CS-410" title="Advanced Networking" />
                                </div>

                                {/* Wed Column (Highlighted) */}
                                <div className="border-r border-glass-border relative bg-orange/5">
                                    <div className="absolute inset-0">
                                        {emptyRows.map((_, i) => <EmptyTimeSlot key={`wed-${i}`} />)}
                                    </div>
                                    <ClassCard top={60} height={90} code="CS-304" title="Python for IOT" />
                                </div>

                                {/* Thu Column */}
                                <div className="border-r border-glass-border relative">
                                    <div className="absolute inset-0">
                                        {emptyRows.map((_, i) => <EmptyTimeSlot key={`thu-${i}`} />)}
                                    </div>
                                    <ClassCard top={120} height={120} code="CS-410" title="Advanced Networking" />
                                </div>

                                {/* Fri Column */}
                                <div className="relative">
                                    <div className="absolute inset-0">
                                        {emptyRows.map((_, i) => <EmptyTimeSlot key={`fri-${i}`} />)}
                                    </div>
                                    <ClassCard top={60} height={60} code="CS-201" title="Database Systems" isMain={false} />
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Right Side Task Panel */}
                    <aside className="w-56 bg-black/5 dark:bg-white/5 border-l border-glass-border p-4 flex flex-col gap-4 shrink-0 overflow-y-auto animate-fade-in-up stagger-2">
                        <div>
                            <h3 className="text-xs font-bold text-main mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-orange text-base">event_note</span>
                                Deadlines
                            </h3>
                            <div className="space-y-2">
                                <div className="bg-white/50 dark:bg-black/20 p-2.5 rounded-lg border border-glass-border shadow-sm hover:border-green cursor-pointer group transition-colors">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="px-1 py-0.5 bg-red-500/20 text-red-500 text-[7px] font-bold rounded uppercase tracking-wider">Urgent</span>
                                        <span className="text-[8px] font-mono text-muted">Oct 25</span>
                                    </div>
                                    <h4 className="text-[10px] font-semibold text-main group-hover:text-green leading-tight transition-colors">Grading: CS-304 Quiz 2</h4>
                                </div>
                                <div className="bg-white/50 dark:bg-black/20 p-2.5 rounded-lg border border-glass-border shadow-sm hover:border-green cursor-pointer group transition-colors">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="px-1 py-0.5 bg-green/20 text-green text-[7px] font-bold rounded uppercase tracking-wider">Faculty</span>
                                        <span className="text-[8px] font-mono text-muted">Oct 26</span>
                                    </div>
                                    <h4 className="text-[10px] font-semibold text-main group-hover:text-green leading-tight transition-colors">Curriculum Meeting</h4>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-auto bg-green/10 p-3 rounded-xl border border-green/20">
                            <p className="text-[8px] text-green font-bold uppercase tracking-widest mb-1">Weekly Metrics</p>
                            <div className="flex justify-between items-end">
                                <div>
                                    <span className="text-base font-bold text-main">18</span>
                                    <span className="text-[9px] text-muted ml-0.5">Hours</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-base font-bold text-main">4</span>
                                    <span className="text-[9px] text-muted ml-0.5">Groups</span>
                                </div>
                            </div>
                        </div>
                    </aside>

                </div>
            </main>
        </div>
    );
}

export default StaffSchedule;