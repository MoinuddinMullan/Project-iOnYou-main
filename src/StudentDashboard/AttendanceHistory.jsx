import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

// --- Shared Sidebar Component ---
function Sidebar() {
    return (
        <aside className="w-64 bg-green flex flex-col justify-between h-full fixed left-0 top-0 z-50 shadow-xl">
            <div className="p-6">
                <div className="flex items-center gap-3 mb-10">
                    <div className="flex items-center justify-center size-10 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
                        <span className="material-symbols-outlined text-white text-2xl">visibility</span>
                    </div>
                    <div>
                        <h1 className="text-white text-xl font-bold tracking-tight">iOnYou</h1>
                        <p className="text-white/60 text-xs font-medium uppercase tracking-wider">Student Portal</p>
                    </div>
                </div>
                <nav className="flex flex-col gap-2">
                    <SidebarLink icon="dashboard" label="Dashboard" to="/dashboard" />
                    {/* Active route */}
                    <SidebarLink icon="calendar_today" label="Attendance" to="/attendance-history" active />
                    <SidebarLink icon="map" label="Campus Map" to="/campus-map" />
                    <SidebarLink icon="schedule" label="Schedule" to="/schedule" />
                    <SidebarLink icon="person" label="Profile" to="#" />
                </nav>
            </div>
            <div className="p-6 border-t border-white/10">
                <button className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-orange text-white font-bold rounded-lg shadow-lg shadow-orange/20 hover:shadow-orange/40 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                    Check-In
                </button>
                <div className="mt-6 flex items-center gap-3">
                    <img
                        src="https://ui-avatars.com/api/?name=Alex+Student&background=random"
                        alt="Alex Student"
                        className="size-10 rounded-full border-2 border-white/30"
                    />
                    <div className="flex flex-col">
                        <span className="text-white text-sm font-medium">Alex Student</span>
                        <span className="text-white/60 text-xs">Enrollment: ENR-482910</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}

// Reusable SidebarLink Component
function SidebarLink({ icon, label, to = "#", active = false }) {
    return (
        <Link
            to={to}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${active
                    ? 'bg-white/10 text-white shadow-sm ring-1 ring-white/10 hover:bg-white/20'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
        >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">{icon}</span>
            <span className="font-medium">{label}</span>
        </Link>
    );
}

// --- Main Attendance History Component ---
function AttendanceHistory() {
    const [tableData, setTableData] = useState([]);
    const [stats, setStats] = useState({ total: 0, present: 0, absent: 0, leave: 0 });

    useEffect(() => {
        async function load() {
            try {
                const students = await api.getStudents();
                const student = students && students.length ? students[0] : null;
                if (!student) return;
                const attendance = await api.getAttendanceByStudent(student._id);
                const rows = attendance.map(a => {
                    const dt = new Date(a.timestamp || a.class?.timestamp || Date.now());
                    return {
                        date: dt.toLocaleDateString(),
                        course: a.class?.subject || `Class ${a.class?._id}`,
                        prof: '',
                        type: '',
                        typeIcon: 'menu_book',
                        typeBg: 'bg-purple-50 text-purple-700',
                        time: dt.toLocaleTimeString(),
                        status: a.status,
                        statusStyle: a.status === 'Present' ? 'bg-green-100 text-green-700' : a.status === 'Absent' ? 'bg-red-100 text-red-700' : 'bg-orange/20 text-orange-700'
                    };
                });
                setTableData(rows);
                const total = rows.length;
                const present = rows.filter(r => r.status === 'Present').length;
                const absent = rows.filter(r => r.status === 'Absent').length;
                setStats({ total: total || 0, present, absent, leave: 0 });
            } catch (err) {
                console.error('Failed loading attendance history', err);
            }
        }
        load();
    }, []);

    // Array map for the monthly chart - switched 'bg-onyx' to 'bg-green' to match new theme
    const chartData = [
        { month: 'Apr', value: 85, color: 'bg-green' },
        { month: 'May', value: 92, color: 'bg-green' },
        { month: 'Jun', value: 78, color: 'bg-green' },
        { month: 'Jul', value: 45, color: 'bg-orange' },
        { month: 'Aug', value: 88, color: 'bg-green' },
        { month: 'Sep', value: 95, color: 'bg-green' },
    ];

    return (
        <div className="fixed inset-0 w-full flex overflow-hidden bg-bg-main text-body font-display transition-colors duration-500">
            <Sidebar />

            <main className="ml-64 flex-1 h-full overflow-y-auto relative">
                
                {/* Header */}
                <header className="sticky top-0 z-40 bg-bg-main/90 backdrop-blur-md px-8 py-6 flex justify-between items-center border-b border-glass-border">
                    <div>
                        <h2 className="text-2xl font-bold text-main tracking-tight">Attendance History - 202504104610001 Dev</h2>
                        <p className="text-muted text-sm mt-1">Detailed record of your academic presence.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="size-10 flex items-center justify-center rounded-full bg-transparent border border-glass-border text-body hover:bg-black/5 dark:hover:bg-white/5 transition-colors relative cursor-pointer">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border border-bg-main"></span>
                        </button>
                        <button className="size-10 flex items-center justify-center rounded-full bg-transparent border border-glass-border text-body hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer">
                            <span className="material-symbols-outlined">print</span>
                        </button>
                        <div className="h-8 w-px bg-glass-border mx-2"></div>
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-bold text-main">Sept 24, 2023</p>
                            <p className="text-xs text-muted">Fall Semester</p>
                        </div>
                    </div>
                </header>

                <div className="p-8 max-w-7xl mx-auto space-y-8">
                    
                    {/* Top Stats Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-green rounded-xl p-6 text-white shadow-lg shadow-black/10 animate-fade-in-up hover:-translate-y-1 transition-all border border-white/10 stagger-1 relative overflow-hidden">
                            <div className="absolute right-0 top-0 p-4 opacity-10">
                                <span className="material-symbols-outlined text-6xl">school</span>
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-white/80 text-sm font-medium mb-1">Total Lectures</h3>
                                <p className="text-3xl font-bold">{stats.total || 0}</p>
                                <p className="text-white/60 text-xs mt-2">Scheduled this semester</p>
                            </div>
                        </div>
                        <div className="bg-green rounded-xl p-6 text-white shadow-lg shadow-black/10 animate-fade-in-up hover:-translate-y-1 transition-all border border-white/10 stagger-2 relative overflow-hidden">
                            <div className="absolute right-0 top-0 p-4 opacity-10">
                                <span className="material-symbols-outlined text-6xl">check_circle</span>
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-white/80 text-sm font-medium mb-1">Present</h3>
                                <p className="text-3xl font-bold">{stats.present || 0}</p>
                                <p className="text-green-200 text-xs mt-2 font-medium">{stats.total ? Math.round((stats.present / stats.total) * 100) : 0}% Attendance Rate</p>
                            </div>
                        </div>
                        <div className="bg-green rounded-xl p-6 text-white shadow-lg shadow-black/10 animate-fade-in-up hover:-translate-y-1 transition-all border border-white/10 stagger-3 relative overflow-hidden">
                            <div className="absolute right-0 top-0 p-4 opacity-10">
                                <span className="material-symbols-outlined text-6xl">cancel</span>
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-white/80 text-sm font-medium mb-1">Absent</h3>
                                <p className="text-3xl font-bold">{stats.absent || 0}</p>
                                <p className="text-red-200 text-xs mt-2 font-medium">Without notice</p>
                            </div>
                        </div>
                        <div className="bg-green rounded-xl p-6 text-white shadow-lg shadow-black/10 animate-fade-in-up hover:-translate-y-1 transition-all border border-white/10 stagger-4 relative overflow-hidden">
                            <div className="absolute right-0 top-0 p-4 opacity-10">
                                <span className="material-symbols-outlined text-6xl">flag</span>
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-white/80 text-sm font-medium mb-1">Leave</h3>
                                <p className="text-3xl font-bold">{stats.leave || 0}</p>
                                <p className="text-orange text-xs mt-2 font-medium">Approved requests</p>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in-up stagger-4" style={{ animationDelay: '600ms' }}>
                        
                        {/* Table Section */}
                        <div className="lg:col-span-8 flex flex-col gap-6">
                            
                            {/* Filters */}
                            <div className="bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-xl shadow-sm border border-glass-border p-4 flex flex-wrap items-center gap-4">
                                <div className="flex items-center gap-2 text-body">
                                    <span className="material-symbols-outlined">filter_list</span>
                                    <span className="text-sm font-semibold">Filters:</span>
                                </div>
                                <div className="relative group">
                                    <select className="appearance-none bg-black/5 dark:bg-white/5 border border-glass-border text-body text-sm rounded-lg focus:ring-orange focus:border-orange block w-full p-2.5 pr-8 cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                                        <option>Fall Semester 2023</option>
                                        <option>Spring Semester 2023</option>
                                    </select>
                                    <span className="material-symbols-outlined absolute right-2 top-2.5 text-muted pointer-events-none text-sm">expand_more</span>
                                </div>
                                <div className="relative group">
                                    <select className="appearance-none bg-black/5 dark:bg-white/5 border border-glass-border text-body text-sm rounded-lg focus:ring-orange focus:border-orange block w-full p-2.5 pr-8 cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                                        <option>All Courses</option>
                                        <option>Computer Science 101</option>
                                        <option>Advanced Calculus</option>
                                        <option>Data Structures</option>
                                    </select>
                                    <span className="material-symbols-outlined absolute right-2 top-2.5 text-muted pointer-events-none text-sm">expand_more</span>
                                </div>
                                <div className="relative group flex-grow max-w-xs">
                                    <input className="bg-black/5 dark:bg-white/5 border border-glass-border text-body placeholder:text-muted text-sm rounded-lg focus:ring-orange focus:border-orange block w-full p-2.5 pl-9 outline-none transition-colors" placeholder="Search date..." type="text" />
                                    <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-muted pointer-events-none text-sm">calendar_month</span>
                                </div>
                                <button className="ml-auto px-4 py-2.5 bg-orange text-white text-sm font-medium rounded-lg hover:brightness-110 transition-all shadow-sm cursor-pointer">
                                    Apply Filter
                                </button>
                            </div>

                            {/* Attendance Table */}
                            <div className="bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-xl shadow-sm border border-glass-border overflow-hidden flex flex-col">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-black/5 dark:bg-white/5 border-b border-glass-border text-muted text-xs uppercase font-semibold">
                                            <tr>
                                                <th className="px-6 py-4">Date</th>
                                                <th className="px-6 py-4">Course Name</th>
                                                <th className="px-6 py-4">Lecture Type</th>
                                                <th className="px-6 py-4">Time Slot</th>
                                                <th className="px-6 py-4 text-right">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-glass-border">
                                            {tableData.map((row, index) => (
                                                <tr key={index} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors group">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-body">
                                                        {row.date}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-sm font-bold text-main">{row.course}</p>
                                                        <p className="text-xs text-muted">{row.prof}</p>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-body">
                                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${row.typeBg}`}>
                                                            <span className="material-symbols-outlined text-[14px]">{row.typeIcon}</span>
                                                            {row.type}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-muted">
                                                        {row.time}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${row.statusStyle}`}>
                                                            {row.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                
                                {/* Pagination */}
                                <div className="p-4 border-t border-glass-border bg-transparent flex justify-between items-center">
                                    <p className="text-xs text-muted">Showing 1 to 5 of 100 entries</p>
                                    <div className="flex gap-2">
                                        <button className="px-3 py-1 border border-glass-border bg-transparent rounded text-xs text-body hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50 cursor-pointer transition-colors">Previous</button>
                                        <button className="px-3 py-1 border border-glass-border bg-transparent rounded text-xs text-body hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors">Next</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Charts & Progress */}
                        <div className="lg:col-span-4 flex flex-col gap-6">
                            
                            {/* Monthly Trends Chart */}
                            <div className="bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-xl shadow-sm border border-glass-border p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-bold text-main">Monthly Trends</h3>
                                    <select className="text-xs border-none bg-black/5 dark:bg-white/5 rounded px-2 py-1 text-body cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition-colors focus:outline-none">
                                        <option>Last 6 Months</option>
                                        <option>This Year</option>
                                    </select>
                                </div>
                                <div className="h-64 flex items-end justify-between gap-2 px-2">
                                    {chartData.map((data, index) => (
                                        <div key={index} className="flex flex-col items-center gap-2 w-full group">
                                            <div className="w-full bg-black/5 dark:bg-white/5 rounded-t-md relative h-48 flex items-end justify-center overflow-hidden">
                                                <div className={`w-full mx-1 ${data.color} rounded-t-sm transition-all duration-500 ease-out group-hover:brightness-110`} style={{ height: `${data.value}%` }}></div>
                                            </div>
                                            <span className="text-xs text-muted font-medium">{data.month}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 flex justify-center gap-4 text-xs">
                                    <div className="flex items-center gap-1.5">
                                        <span className="size-2.5 rounded-full bg-green"></span>
                                        <span className="text-muted">Standard</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="size-2.5 rounded-full bg-orange"></span>
                                        <span className="text-muted">Low Attendance</span>
                                    </div>
                                </div>
                            </div>

                            {/* Course Breakdown */}
                            <div className="bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-xl shadow-sm border border-glass-border p-6 flex-1">
                                <h3 className="text-lg font-bold text-main mb-4">Course Breakdown</h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between items-end mb-1">
                                            <span className="text-sm font-medium text-body">Intro to IOT</span>
                                            <span className="text-xs font-bold text-green">95%</span>
                                        </div>
                                        <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-2">
                                            <div className="bg-green h-2 rounded-full" style={{ width: '95%' }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-end mb-1">
                                            <span className="text-sm font-medium text-body">Data Structures</span>
                                            <span className="text-xs font-bold text-green">88%</span>
                                        </div>
                                        <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-2">
                                            <div className="bg-green h-2 rounded-full" style={{ width: '88%' }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-end mb-1">
                                            <span className="text-sm font-medium text-body">Advanced Calculus</span>
                                            <span className="text-xs font-bold text-green">82%</span>
                                        </div>
                                        <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-2">
                                            <div className="bg-green h-2 rounded-full" style={{ width: '82%' }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-end mb-1">
                                            <span className="text-sm font-medium text-body">Software Eng.</span>
                                            <span className="text-xs font-bold text-orange">70%</span>
                                        </div>
                                        <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-2">
                                            <div className="bg-orange h-2 rounded-full" style={{ width: '70%' }}></div>
                                        </div>
                                        <p className="text-[10px] text-red-500 mt-1 italic">Warning: Attendance below 75%</p>
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

export default AttendanceHistory;