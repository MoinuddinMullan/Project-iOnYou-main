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
                    {/* Active Link */}
                    <SidebarLink icon="school" label="My Classes" to="/staff-classes" active={true} />
                    <SidebarLink icon="assignment_turned_in" label="Attendance Mgmt" to="/staff-attendance" />
                    <SidebarLink icon="schedule" label="Schedule" to="/staff-schedule" />
                    <SidebarLink icon="person" label="Profile" to="/staff-profile" />
                </nav>
            </div>
            <div className="p-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-cover bg-center border-2 border-white/30" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCEqiRe-Sl_1_6KSkpOEvQ0E71YSkRpYoNGp-5sPXut5QPnEeCaMBwXFxMk4OXtG0TvsxUC5Hf_ZGWlGcUJoH5dm0YcLgJbaQ8scZRAHL1Pq-xt8KbWI7jzcdIpwH8g_gyHMjNbm3spWIoyvbmu9_y0UKhsbgv3V4JLlp6RMImwn3VEbtdSE0zT3dGUA8tCoqRQRNfTqNRn0J3e-JiQf4EQz5jmk7H3GozmJsjZA2M3poNXwv5WoxdEzyWFwqctovQ80fQP3nvep_s')" }}></div>
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
        <header className="sticky top-0 z-40 bg-bg-main/95 backdrop-blur-md px-8 py-6 flex justify-between items-start border-b border-glass-border shadow-sm">
            <div className="flex-1">
                <h2 className="text-2xl font-bold text-main tracking-tight">My Assigned Courses</h2>
                <p className="text-muted text-sm mt-1">View daily attendance statistics and manage records for your active sessions.</p>
            </div>
            <div className="flex gap-6 items-center">
                <div className="bg-black/5 dark:bg-white/5 rounded-lg p-3 px-5 border border-glass-border shadow-sm flex items-center gap-6 hidden xl:flex">
                    <div>
                        <p className="text-[10px] uppercase text-muted font-bold tracking-wider">Semester Hours</p>
                        <p className="text-xl font-bold text-main">142 <span className="text-sm font-normal text-muted">hrs</span></p>
                    </div>
                    <div className="w-px h-8 bg-glass-border"></div>
                    <div>
                        <p className="text-[10px] uppercase text-muted font-bold tracking-wider">Dept. Avg</p>
                        <p className="text-xl font-bold text-main">84%</p>
                    </div>
                    <div className="w-px h-8 bg-glass-border"></div>
                    <div>
                        <p className="text-[10px] uppercase text-muted font-bold tracking-wider">Active Students</p>
                        <p className="text-xl font-bold text-main">482</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button className="px-4 py-2 bg-orange text-white rounded-lg text-sm font-bold hover:brightness-110 transition-colors flex items-center gap-2 shadow-sm border border-orange/50 cursor-pointer">
                        <span className="material-symbols-outlined text-[18px]">download</span>
                        Export Report
                    </button>
                    <div className="h-8 w-px bg-glass-border mx-1"></div>
                    <button className="size-10 flex items-center justify-center rounded-full bg-transparent border border-glass-border text-body hover:bg-black/5 dark:hover:bg-white/5 transition-colors relative hover:scale-105 duration-300 cursor-pointer">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border border-bg-main animate-pulse"></span>
                    </button>
                    <button className="size-10 flex items-center justify-center rounded-full bg-transparent border border-glass-border text-body hover:bg-black/5 dark:hover:bg-white/5 transition-colors hover:rotate-45 duration-300 cursor-pointer">
                        <span className="material-symbols-outlined">settings</span>
                    </button>
                </div>
            </div>
        </header>
    );
}

// Reusable Course Card Component
function CourseCard({ title, code, time, enrolled, total, present, absent, percentage, status, statusClass, isArchived, staggerDelay }) {
    const strokeDasharray = `${percentage}, 100`;
    const strokeColor = isArchived ? 'var(--color-ash)' : 'var(--color-orange)';

    return (
        <div className={`group bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-lg overflow-hidden shadow-sm border border-glass-border border-l-[6px] ${isArchived ? 'border-l-ash opacity-70 hover:opacity-100' : 'border-l-green'} hover:shadow-lg transition-all duration-300 animate-fade-in-up flex flex-col md:flex-row items-center p-0 ${staggerDelay}`}>
            
            {/* Info Section */}
            <div className="flex-1 p-5 border-b md:border-b-0 md:border-r border-glass-border w-full md:w-auto">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-lg font-bold text-main group-hover:text-green transition-colors">{title}</h3>
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${statusClass}`}>
                                {status === 'In Progress' && <span className="size-1.5 rounded-full bg-green-600"></span>}
                                {status === 'Starts in 15m' && <span className="material-symbols-outlined text-[12px]">timer</span>}
                                {status}
                            </span>
                        </div>
                        <p className="text-xs text-muted font-semibold uppercase tracking-wide">{code}</p>
                    </div>
                </div>
                <div className="mt-4 flex items-center gap-6 text-sm text-body">
                    <div className="flex items-center gap-1">
                        <span className={`material-symbols-outlined text-[18px] ${isArchived ? 'text-muted' : 'text-green'}`}>
                            {isArchived ? 'history' : 'schedule'}
                        </span>
                        <span>{time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className={`material-symbols-outlined text-[18px] ${isArchived ? 'text-muted' : 'text-green'}`}>group</span>
                        <span>{enrolled} Enrolled</span>
                    </div>
                </div>
            </div>

            {/* Circular Chart & Stats */}
            <div className="px-6 py-4 flex items-center justify-between gap-8 border-b md:border-b-0 md:border-r border-glass-border w-full md:w-auto bg-black/5 dark:bg-white/5">
                <div className="relative size-14 shrink-0">
                    <svg viewBox="0 0 36 36" style={{ display: 'block', margin: '0 auto', maxWidth: '100%', maxHeight: '250px' }}>
                        <path 
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                            style={{ fill: 'none', stroke: 'var(--border-glass-border, rgba(128,128,128,0.2))', strokeWidth: '3.8' }} 
                        />
                        <path 
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                            strokeDasharray={strokeDasharray} 
                            style={{ fill: 'none', stroke: strokeColor, strokeWidth: '2.8', strokeLinecap: 'round', transition: 'stroke-dasharray 1s ease-out' }} 
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-[10px] font-bold text-main leading-none">{percentage}%</span>
                    </div>
                </div>
                
                <div className="flex gap-8">
                    <div className="text-center">
                        <span className="block text-xl font-bold text-main">{total}</span>
                        <span className="text-[10px] uppercase text-muted font-bold tracking-tight">Total</span>
                    </div>
                    <div className="text-center">
                        <span className={`block text-xl font-bold ${isArchived ? 'text-main' : 'text-green'}`}>{present}</span>
                        <span className="text-[10px] uppercase text-muted font-bold tracking-tight">Present</span>
                    </div>
                    <div className="text-center">
                        <span className={`block text-xl font-bold ${isArchived ? 'text-main' : 'text-red-500'}`}>{absent}</span>
                        <span className="text-[10px] uppercase text-muted font-bold tracking-tight">Absent</span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="p-4 flex items-center gap-3 w-full md:w-auto justify-end bg-transparent">
                <button className="size-10 flex items-center justify-center rounded-lg border border-glass-border text-muted hover:bg-black/5 dark:hover:bg-white/5 hover:text-green hover:border-green transition-all cursor-pointer" title="View Student List">
                    <span className="material-symbols-outlined text-[20px]">person_search</span>
                </button>
                {isArchived ? (
                    <button className="px-4 py-2.5 bg-black/5 dark:bg-white/5 text-body font-medium rounded-lg shadow-sm border border-glass-border hover:bg-transparent hover:text-orange hover:border-orange transition-all flex items-center gap-2 text-sm whitespace-nowrap cursor-pointer">
                        <span className="material-symbols-outlined text-[18px]">history</span>
                        View History
                    </button>
                ) : (
                    <button className="px-4 py-2.5 bg-orange text-white font-bold rounded-lg shadow-sm hover:brightness-110 transition-all flex items-center gap-2 text-sm whitespace-nowrap cursor-pointer">
                        <span className="material-symbols-outlined text-[18px]">co_present</span>
                        Manage Attendance
                    </button>
                )}
            </div>
        </div>
    );
}

// --- Main Dashboard Component ---

function StaffClasses() {
    return (
        <div className="fixed inset-0 w-full flex overflow-hidden bg-bg-main text-body font-display transition-colors duration-500">
            <Sidebar />

            <main className="ml-64 flex-1 h-full overflow-y-auto relative scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                <Header />

                <div className="p-8 max-w-7xl mx-auto space-y-6 pb-20">
                    
                    {/* Filters & Search */}
                    <div className="bg-white/50 dark:bg-black/20 backdrop-blur-md p-4 rounded-xl shadow-sm border border-glass-border flex flex-col md:flex-row gap-4 items-center justify-between animate-fade-in-up">
                        <div className="flex items-center gap-2 w-full md:w-auto flex-1 max-w-lg relative text-muted focus-within:text-green transition-colors">
                            <span className="material-symbols-outlined absolute left-3">search</span>
                            <input 
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-black/5 dark:bg-white/5 border border-glass-border focus:border-green focus:ring-green transition-all placeholder:text-muted text-sm outline-none text-body" 
                                placeholder="Search by course name or code..." 
                                type="text"
                            />
                        </div>
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-body">Semester:</span>
                                <select className="border-glass-border rounded-lg text-sm text-body focus:border-green focus:ring-green bg-black/5 dark:bg-white/5 py-2 pl-3 pr-8 outline-none cursor-pointer">
                                    <option>Current (Fall 2024)</option>
                                    <option>Spring 2024</option>
                                    <option>Fall 2023</option>
                                </select>
                            </div>
                            <div className="flex bg-black/5 dark:bg-white/5 p-1 rounded-lg border border-glass-border">
                                <button className="p-1.5 text-muted hover:text-body cursor-pointer transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">grid_view</span>
                                </button>
                                <button className="p-1.5 bg-white dark:bg-black/40 rounded shadow-sm text-green cursor-pointer">
                                    <span className="material-symbols-outlined text-[20px]">view_list</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Course List */}
                    <div className="flex flex-col gap-4">
                        <CourseCard 
                            title="Python for IOT"
                            code="CS-304 • Fall 2024 • Lab A2"
                            time="Mon, Wed 10:00 AM"
                            enrolled="42"
                            total="42"
                            present="38"
                            absent="4"
                            percentage="90"
                            status="In Progress"
                            statusClass="bg-green/10 text-green border border-green/30 animate-pulse"
                            staggerDelay="stagger-1"
                        />
                        <CourseCard 
                            title="Database Systems"
                            code="CS-201 • Fall 2024 • Room 301"
                            time="Tue, Thu 02:00 PM"
                            enrolled="128"
                            total="128"
                            present="112"
                            absent="16"
                            percentage="88"
                            status="Starts in 15m"
                            statusClass="bg-orange/10 text-orange border border-orange/30"
                            staggerDelay="stagger-2"
                        />
                        <CourseCard 
                            title="Advanced Networking"
                            code="CS-410 • Fall 2024 • Lab B1"
                            time="Fri 09:00 AM"
                            enrolled="35"
                            total="35"
                            present="32"
                            absent="3"
                            percentage="91"
                            status="Scheduled"
                            statusClass="bg-black/5 dark:bg-white/5 text-muted border border-glass-border"
                            staggerDelay="stagger-3"
                        />
                        <CourseCard 
                            title="Intro to Algorithms"
                            code="CS-202 • Spring 2024"
                            time="Ended May 2024"
                            enrolled="110"
                            total="110"
                            present="--"
                            absent="--"
                            percentage="85"
                            status="Archived"
                            statusClass="bg-black/5 dark:bg-white/5 text-muted"
                            isArchived={true}
                            staggerDelay="stagger-4"
                        />
                        <CourseCard 
                            title="Software Engineering I"
                            code="SE-301 • Fall 2024 • Room 104"
                            time="Thu 01:00 PM"
                            enrolled="56"
                            total="56"
                            present="42"
                            absent="14"
                            percentage="76"
                            status="Scheduled"
                            statusClass="bg-black/5 dark:bg-white/5 text-muted border border-glass-border"
                            staggerDelay="stagger-5"
                        />
                    </div>

                </div>
            </main>
        </div>
    );
}

export default StaffClasses;