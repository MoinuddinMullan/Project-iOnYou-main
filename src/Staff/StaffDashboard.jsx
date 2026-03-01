import { useEffect, useState } from 'react';
import api from '../api';

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
                    {/* Active Link */}
                    <a className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 text-white shadow-sm ring-1 ring-white/10 transition-all hover:bg-white/20 group cursor-pointer">
                        <span className="material-symbols-outlined group-hover:scale-110 transition-transform">dashboard</span>
                        <span className="font-medium">Dashboard</span>
                    </a>
                    {/* Inactive Links */}
                        <SidebarLink icon="school" label="My Classes" to="/staff-classes" />
                        <SidebarLink icon="assignment_turned_in" label="Attendance Mgmt" to="/staff-attendance" />
                        <SidebarLink icon="schedule" label="Schedule" to="/staff-schedule"  />
                        <SidebarLink icon="person" label="Profile" to="/staff-profile" />
                </nav>
            </div>
            <div className="p-6 border-t border-white/10">
                <button className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-orange text-white font-bold rounded-lg shadow-lg shadow-orange/20 hover:brightness-110 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
                    <span className="material-symbols-outlined text-[20px]">play_circle</span>
                    Start Session
                </button>
                <div className="mt-6 flex items-center gap-3">
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

function SidebarLink({ icon, label, to = "#" }) {
    return (
        <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-all group cursor-pointer" href={to}>
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">{icon}</span>
            <span className="font-medium">{label}</span>
        </a>
    );
}

function Header() {
    return (
        <header className="sticky top-0 z-40 bg-bg-main/90 backdrop-blur-md px-8 py-6 flex justify-between items-center border-b border-glass-border">
            <div>
                <h2 className="text-2xl font-bold text-main tracking-tight">Welcome back, Prof. Dev</h2>
                <p className="text-muted text-sm mt-1">Manage your classes and track student attendance.</p>
            </div>
            <div className="flex items-center gap-4">
                <button className="size-10 flex items-center justify-center rounded-full bg-transparent border border-glass-border text-body hover:bg-black/5 dark:hover:bg-white/5 transition-colors relative cursor-pointer">
                    <span className="material-symbols-outlined">notifications</span>
                    <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border border-bg-main"></span>
                </button>
                <button className="size-10 flex items-center justify-center rounded-full bg-transparent border border-glass-border text-body hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer">
                    <span className="material-symbols-outlined">settings</span>
                </button>
                <div className="h-8 w-px bg-glass-border mx-2"></div>
                <div className="text-right hidden md:block">
                    <p className="text-sm font-bold text-main">Sept 24, 2023</p>
                    <p className="text-xs text-muted">Academic Year 2023/24</p>
                </div>
            </div>
        </header>
    );
}

function StatsCard({ icon, label, value, subIcon, subLabel, subColorClass, progressBar }) {
    return (
        <div className="bg-green rounded-xl p-6 text-white shadow-lg shadow-black/10 border border-white/10 relative overflow-hidden group hover:-translate-y-1 transition-transform">
            <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined text-6xl">{icon}</span>
            </div>
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-white/20 rounded-lg">
                        <span className="material-symbols-outlined text-white">{subIcon}</span>
                    </div>
                    {subLabel && (
                        <span className={`text-xs font-medium px-2 py-1 rounded ${subColorClass}`}>{subLabel}</span>
                    )}
                </div>
                <h3 className="text-white/80 text-sm font-medium mb-1">{label}</h3>
                <p className="text-3xl font-bold truncate">{value}</p>
                {progressBar && (
                    <div className="w-full bg-black/20 h-1.5 rounded-full mt-4 overflow-hidden">
                        <div className="bg-orange h-full rounded-full" style={{ width: progressBar }}></div>
                    </div>
                )}
            </div>
        </div>
    );
}

function ActivityRow({ title, subtext, statusText, statusClass }) {
    return (
        <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors group">
            <td className="px-6 py-4 border-t border-glass-border">
                <p className="text-sm font-semibold text-main">{title}</p>
                <p className="text-xs text-muted">{subtext}</p>
            </td>
            <td className="px-6 py-4 border-t border-glass-border">
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass}`}>
                    {statusText}
                </span>
            </td>
            <td className="px-6 py-4 border-t border-glass-border text-right">
                <div className="flex justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded text-muted hover:text-blue-500 cursor-pointer transition-colors" title="Edit">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded text-muted hover:text-red-500 cursor-pointer transition-colors" title="Delete">
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                </div>
            </td>
        </tr>
    );
}

function ScheduleItemNow() {
    return (
        <div className="relative pl-8 group">
            <span className="absolute -left-[9px] top-1 h-5 w-5 rounded-full border-4 border-green/20 bg-green shadow-sm"></span>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-1">
                <div>
                    <h4 className="text-lg font-bold text-main">Intro to IOT</h4>
                    <span className="inline-flex items-center rounded-md bg-green/10 px-2 py-1 text-xs font-medium text-green ring-1 ring-inset ring-green/20 mt-1">Now: 10:00 AM - 11:30 AM</span>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs font-bold text-muted hover:text-orange cursor-pointer">
                    <span className="material-symbols-outlined text-[16px]">edit_calendar</span>
                    Modify
                </button>
            </div>
            <div className="bg-black/5 dark:bg-white/5 rounded-lg p-4 border border-glass-border shadow-sm">
                <div className="flex items-center gap-4 text-sm text-body mb-3">
                    <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[18px] text-green">location_on</span>
                        <span>Room 304</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[18px] text-green">groups</span>
                        <span>32 Students</span>
                    </div>
                </div>
                <div className="w-full bg-black/10 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-green h-full rounded-full" style={{ width: '45%' }}></div>
                </div>
                <p className="text-xs text-muted mt-2">Class is currently in session. Recording attendance...</p>
            </div>
        </div>
    );
}

function ScheduleItemUpcoming() {
    return (
        <div className="relative pl-8 group">
            <span className="absolute -left-[9px] top-1 h-5 w-5 rounded-full border-4 border-white dark:border-black bg-orange shadow-sm"></span>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-1">
                <div>
                    <h4 className="text-lg font-bold text-main">Database Systems</h4>
                    <span className="inline-flex items-center rounded-md bg-orange/10 px-2 py-1 text-xs font-medium text-orange ring-1 ring-inset ring-orange/20 mt-1">Upcoming: 01:00 PM - 02:30 PM</span>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs font-bold text-muted hover:text-orange cursor-pointer">
                    <span className="material-symbols-outlined text-[16px]">edit_calendar</span>
                    Modify
                </button>
            </div>
            <div className="bg-transparent rounded-lg p-4 border border-glass-border hover:border-orange/50 hover:shadow-md transition-all">
                <div className="flex items-center gap-4 text-sm text-body">
                    <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[18px] text-muted">location_on</span>
                        <span>Lab 201</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[18px] text-muted">groups</span>
                        <span>28 Students</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ScheduleItemFuture() {
    return (
        <div className="relative pl-8 group">
            <span className="absolute -left-[7px] top-1 h-4 w-4 rounded-full border-2 border-white dark:border-black bg-muted"></span>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-1">
                <div>
                    <h4 className="text-base font-semibold text-body">Faculty Research Meeting</h4>
                    <span className="text-sm text-muted block mt-0.5">03:30 PM - 04:30 PM</span>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs font-bold text-muted hover:text-orange cursor-pointer">
                    <span className="material-symbols-outlined text-[16px]">edit_calendar</span>
                    Modify
                </button>
            </div>
            <div className="bg-transparent rounded-lg p-3 border border-dashed border-glass-border hover:border-body/30 transition-colors">
                <div className="flex items-center gap-4 text-sm text-muted">
                    <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[18px] opacity-70">location_on</span>
                        <span>Conference Hall B</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- Main Dashboard Component ---

function StaffDashboard() {
    const [stats, setStats] = useState({ classes: 0, students: 0 });

    useEffect(() => {
        async function load() {
            try {
                const classes = await api.getClasses();
                const students = await api.getStudents();
                setStats({ classes: classes.length || 0, students: students.length || 0 });
            } catch (err) {
                console.error('Failed loading staff dashboard', err);
            }
        }
        load();
    }, []);

    return (
        <div className="fixed inset-0 w-full flex overflow-hidden bg-bg-main text-body font-display transition-colors duration-500">
            <Sidebar />

            <main className="ml-64 flex-1 h-full overflow-y-auto relative">
                <Header />

                <div className="p-8 max-w-7xl mx-auto space-y-8">
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up">
                        <StatsCard
                            icon="analytics"
                            label="Avg. Class Attendance"
                            value="78%"
                            subIcon="query_stats"
                            subLabel="+1.2%"
                            subColorClass="bg-white/20 text-white"
                            progressBar="78%"
                        />
                        <StatsCard
                            icon="meeting_room"
                            label="Current Session"
                            value="Intro to IOT"
                            subIcon="sensors"
                            subLabel="Active"
                            subColorClass="bg-orange text-white font-bold"
                        />
                        <StatsCard
                            icon="groups"
                            label="Total Students"
                            value={stats.students || 0}
                            subIcon="person_search"
                        />
                        <StatsCard
                            icon="pending_actions"
                            label="Pending Approvals"
                            value="5"
                            subIcon="notification_important"
                            subLabel="Urgent"
                            subColorClass="bg-red-500/80 text-white"
                        />
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-xl shadow-sm border border-glass-border p-6 relative overflow-hidden animate-fade-in-up stagger-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-bold text-main flex items-center gap-2">
                                    <span className="material-symbols-outlined text-green">bolt</span>
                                    Quick Actions & Resource Center
                                </h3>
                                <p className="text-muted text-sm mt-1">Manage your academic resources efficiently.</p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <button className="flex items-center gap-2 px-4 py-2 bg-black/5 dark:bg-white/5 text-body rounded-lg border border-glass-border hover:border-orange hover:text-orange transition-colors text-sm font-medium cursor-pointer">
                                    <span className="material-symbols-outlined text-[18px]">upload_file</span>
                                    Upload Lecture Notes
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-black/5 dark:bg-white/5 text-body rounded-lg border border-glass-border hover:border-orange hover:text-orange transition-colors text-sm font-medium cursor-pointer">
                                    <span className="material-symbols-outlined text-[18px]">campaign</span>
                                    Post Announcement
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-orange text-white rounded-lg shadow-md hover:brightness-110 transition-all text-sm font-bold cursor-pointer">
                                    <span className="material-symbols-outlined text-[18px]">monitoring</span>
                                    View Analytics
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in-up stagger-2">
                        
                        {/* Recent Activity */}
                        <div className="lg:col-span-5 flex flex-col gap-6">
                            <div className="bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-xl shadow-sm border border-glass-border overflow-hidden flex flex-col h-full">
                                <div className="px-6 py-5 border-b border-glass-border flex justify-between items-center bg-transparent">
                                    <h3 className="text-lg font-bold text-main flex items-center gap-2">
                                        <span className="material-symbols-outlined text-green">history</span>
                                        Recent Activity
                                    </h3>
                                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-orange/10 text-orange text-xs font-bold rounded-md hover:bg-orange hover:text-white transition-colors border border-orange/20 cursor-pointer">
                                        <span className="material-symbols-outlined text-[16px]">add</span>
                                        Add Record
                                    </button>
                                </div>
                                <div className="flex-1 overflow-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-black/5 dark:bg-white/5 text-muted text-xs uppercase font-semibold">
                                            <tr>
                                                <th className="px-6 py-3">Student / Event</th>
                                                <th className="px-6 py-3">Status</th>
                                                <th className="px-6 py-3 text-right">Manage</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-glass-border">
                                            <ActivityRow title="Attendance Submitted" subtext="Intro to IOT • 10:15 AM" statusText="Completed" statusClass="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" />
                                            <ActivityRow title="Leave: Alex Chen" subtext="Pending Review • 08:30 AM" statusText="Action Req." statusClass="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" />
                                            <ActivityRow title="Manual Entry: Sarah M." subtext="Correction • Y'day 3:45 PM" statusText="Updated" statusClass="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" />
                                            <ActivityRow title="Leave: John Doe" subtext="Pending Review • Y'day 11:00 AM" statusText="Action Req." statusClass="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" />
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* My Teaching Schedule */}
                        <div className="lg:col-span-7 flex flex-col h-full min-h-[400px]">
                            <div className="bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-xl shadow-sm border border-glass-border overflow-hidden flex flex-col h-full relative group">
                                <div className="px-6 py-5 border-b border-glass-border flex justify-between items-center bg-transparent z-10 relative">
                                    <h3 className="text-lg font-bold text-main flex items-center gap-2">
                                        <span className="material-symbols-outlined text-green">calendar_month</span>
                                        My Teaching Schedule
                                    </h3>
                                    <div className="flex gap-2">
                                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium bg-black/5 dark:bg-white/5 text-body border border-glass-border cursor-pointer">
                                            Today
                                        </span>
                                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium bg-transparent text-muted border border-glass-border cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                            Tomorrow
                                        </span>
                                    </div>
                                </div>
                                <div className="relative flex-1 bg-transparent p-6 overflow-y-auto">
                                    <div className="relative border-l-2 border-glass-border ml-3 space-y-8 pb-4">
                                        <ScheduleItemNow />
                                        <ScheduleItemUpcoming />
                                        <ScheduleItemFuture />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}

export default StaffDashboard;