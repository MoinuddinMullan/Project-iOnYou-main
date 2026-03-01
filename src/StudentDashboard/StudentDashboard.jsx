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
                    {/* Active route */}
                    <SidebarLink icon="dashboard" label="Dashboard" to="/dashboard" active />
                    <SidebarLink icon="calendar_today" label="Attendance" to="/attendance-history" />
                    
                    {/* Placeholder routes */}
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
                        src={currentStudent ? `https://ui-avatars.com/api/?name=${encodeURIComponent(currentStudent.name)}&background=random` : "https://ui-avatars.com/api/?name=Alex+Student&background=random"}
                        alt={currentStudent ? currentStudent.name : 'Alex Student'}
                        className="size-10 rounded-full border-2 border-white/30"
                    />
                    <div className="flex flex-col">
                        <span className="text-white text-sm font-medium">{currentStudent ? currentStudent.name : 'Alex Student'}</span>
                        <span className="text-white/60 text-xs">Enrollment: {currentStudent ? currentStudent.enrollmentNo : 'ENR-482910'}</span>
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

function Header() {
    return (
        <header className="sticky top-0 z-40 bg-bg-main/90 backdrop-blur-md px-8 py-6 flex justify-between items-center border-b border-glass-border">
            <div>
                <h2 className="text-2xl font-bold text-main tracking-tight">Welcome back, Dev</h2>
                <p className="text-muted text-sm mt-1">Here is your campus activity overview.</p>
            </div>
            <div className="flex items-center gap-4">
                <button className="size-10 flex items-center justify-center rounded-full bg-transparent border border-glass-border text-body hover:bg-black/5 dark:hover:bg-white/5 transition-colors relative cursor-pointer">
                    <span className="material-symbols-outlined">notifications</span>
                    <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border border-bg-main"></span>
                </button>
                <button className="size-10 flex items-center justify-center rounded-full bg-transparent border border-glass-border text-body hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer">
                    <span className="material-symbols-outlined">settings</span>
                </button>
                <div className="h-8 w-px bg-glass-border mx-2 hidden md:block border-l border-glass-border"></div>
                <div className="text-right hidden md:block">
                    <p className="text-sm font-bold text-main">Sept 24, 2023</p>
                    <p className="text-xs text-muted">Fall Semester</p>
                </div>
            </div>
        </header>
    );
}

function StatsCard({ icon, label, value, subtext, subLabel, subColorClass, staggerDelay }) {
    return (
        <div className={`bg-green rounded-xl p-6 text-white shadow-lg shadow-black/10 animate-fade-in-up hover:-translate-y-1 transition-all border border-white/10 relative overflow-hidden group ${staggerDelay}`}>
            <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500 select-none">
                <span className="material-symbols-outlined text-6xl">{icon}</span>
            </div>
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-white/20 rounded-lg">
                        <span className="material-symbols-outlined text-white">
                            {icon === 'school' ? 'schedule' : icon === 'location_on' ? 'my_location' : icon === 'notifications_active' ? 'warning' : 'percent'}
                        </span>
                    </div>
                    {subLabel && (
                        <span className={`text-xs font-medium px-2 py-1 rounded flex items-center gap-1 ${subColorClass}`}>
                            {subLabel}
                        </span>
                    )}
                </div>
                <h3 className="text-white/80 text-sm font-medium mb-1">{label}</h3>
                <p className="text-2xl md:text-3xl font-bold truncate">{value}</p>
                {subtext}
            </div>
        </div>
    );
}

function AttendanceTable({ attendanceRows }) {
    const rows = attendanceRows || [];

    return (
        <div className="bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-xl shadow-sm border border-glass-border overflow-hidden flex flex-col h-full">
            <div className="px-6 py-5 border-b border-glass-border flex justify-between items-center bg-transparent">
                <h3 className="text-lg font-bold text-main flex items-center gap-2">
                    <span className="material-symbols-outlined text-body">history</span>
                    Recent Attendance
                </h3>
                <button className="text-sm text-body font-medium hover:text-orange transition-colors cursor-pointer">View All</button>
            </div>
            <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-black/5 dark:bg-white/5 text-muted text-xs uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-3">Course</th>
                            <th className="px-6 py-3">Date/Time</th>
                            <th className="px-6 py-3 text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-glass-border">
                        {rows.map((item, idx) => (
                            <tr key={idx} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4">
                                    <p className="text-sm font-semibold text-main">{item.course || 'Class'}</p>
                                    <p className="text-xs text-muted">{item.room || ''}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm text-body">{item.date}</p>
                                    <p className="text-xs text-muted">{item.time}</p>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === 'Present' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : item.status === 'Absent' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' : 'bg-orange/20 text-orange-700'}`}>
                                        <span className={`size-1.5 rounded-full ${item.status === 'Present' ? 'bg-green-600' : item.status === 'Absent' ? 'bg-red-600' : 'bg-orange-600'}`}></span>
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function ScheduleItem({ title, time, location, person, type, percentage }) {
    const isNow = type === 'now';
    const isUpcoming = type === 'upcoming';

    let dotClass = 'border-glass-border bg-glass-border'; 
    let badge = null;

    if (isNow) {
        dotClass = 'border-green/20 bg-green h-5 w-5 -left-[9px]';
        badge = <span className="inline-flex items-center rounded-md bg-green/10 px-2 py-1 text-xs font-medium text-green ring-1 ring-inset ring-green/20">Now: {time}</span>;
    } else if (isUpcoming) {
        dotClass = 'border-white dark:border-black bg-orange h-5 w-5 -left-[9px]';
        badge = <span className="inline-flex items-center rounded-md bg-orange/10 px-2 py-1 text-xs font-medium text-orange ring-1 ring-inset ring-orange/20">Upcoming: {time}</span>;
    } else {
        dotClass = 'border-white dark:border-black bg-muted h-4 w-4 -left-[7px]';
        badge = <span className="text-sm text-muted">{time}</span>;
    }

    return (
        <div className="relative pl-8 group pb-2">
            <span className={`absolute top-1 rounded-full border-2 shadow-sm ${dotClass}`}></span>

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-1">
                <h4 className={`text-base ${isNow || isUpcoming ? 'font-bold text-main text-lg' : 'font-semibold text-body'}`}>{title}</h4>
                {badge}
            </div>

            <div className={`rounded-lg p-4 border transition-all ${isNow ? 'bg-black/5 dark:bg-white/5 border-glass-border shadow-sm hover:shadow-md' :
                    isUpcoming ? 'bg-transparent border-glass-border hover:border-orange/50 hover:shadow-md' :
                        'bg-transparent p-3 border-dashed border-glass-border hover:border-body/30'
                }`}>
                <div className="flex items-center gap-4 text-sm text-body mb-2">
                    <div className="flex items-center gap-1">
                        <span className={`material-symbols-outlined text-[18px] ${isNow ? 'text-main' : 'text-muted'}`}>location_on</span>
                        <span>{location}</span>
                    </div>
                    {person && (
                        <div className="flex items-center gap-1">
                            <span className={`material-symbols-outlined text-[18px] ${isNow ? 'text-main' : 'text-muted'}`}>person</span>
                            <span>{person}</span>
                        </div>
                    )}
                </div>

                {isNow && percentage && (
                    <>
                        <div className="w-full bg-black/10 dark:bg-white/10 h-1.5 rounded-full overflow-hidden mt-3">
                            <div className="bg-green h-full rounded-full" style={{ width: `${percentage}%` }}></div>
                        </div>
                        <p className="text-xs text-muted mt-2">Class is currently in session. {percentage}% complete.</p>
                    </>
                )}
            </div>
        </div>
    );
}

// --- Main Dashboard Page Component ---

function StudentDashboard() {
    const [currentStudent, setCurrentStudent] = useState(null);
    const [attendanceRows, setAttendanceRows] = useState([]);

    useEffect(() => {
        async function load() {
            try {
                // Ensure user is authenticated (demo login stored token)
                const students = await api.getStudents();
                const student = students && students.length ? students[0] : null;
                setCurrentStudent(student);
                if (student) {
                    const att = await api.getAttendanceByStudent(student._id);
                    // Map attendance records to table rows
                    const rows = att.map(a => {
                        const dt = new Date(a.timestamp || a.class?.timestamp || Date.now());
                        return {
                            course: a.class?.subject || `Subject ${a.class?._id}`,
                            room: '',
                            date: dt.toLocaleDateString(),
                            time: dt.toLocaleTimeString(),
                            status: a.status
                        };
                    });
                    setAttendanceRows(rows.slice(0, 10));
                }
            } catch (err) {
                console.error('Failed loading student dashboard data', err);
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatsCard
                            icon="analytics"
                            label="Overall Attendance"
                            value="85%"
                            subLabel="+2%"
                            subColorClass="bg-white/20 text-white"
                            staggerDelay="stagger-1"
                            subtext={
                                <div className="w-full bg-black/20 h-1.5 rounded-full mt-4 overflow-hidden">
                                    <div className="bg-orange h-full rounded-full" style={{ width: '85%' }}></div>
                                </div>
                            }
                        />
                        <StatsCard
                            icon="school"
                            label="Next Lecture"
                            value="Intro to IOT"
                            subLabel="In 15m"
                            subColorClass="bg-orange text-white font-bold"
                            staggerDelay="stagger-2"
                            subtext={<p className="text-white/60 text-sm mt-1">Room 304 • Prof. Smith</p>}
                        />
                        <StatsCard
                            icon="location_on"
                            label="Current Location"
                            value="Library Zone B"
                            staggerDelay="stagger-3"
                            subLabel={
                                <>
                                    <span className="relative flex h-2 w-2 mr-1">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange"></span>
                                    </span>
                                    Live
                                </>
                            }
                            subColorClass="bg-white/20 text-white"
                            subtext={<p className="text-white/60 text-sm mt-1">Quiet Study Area</p>}
                        />
                        <StatsCard
                            icon="notifications_active"
                            label="Active Alerts"
                            value="2 New"
                            subLabel="Action Needed"
                            subColorClass="bg-red-500/80 text-white"
                            staggerDelay="stagger-4"
                            subtext={<p className="text-white/60 text-sm mt-1">1 Assignment Due Today</p>}
                        />
                    </div>

                    {/* Main Dashboard Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in-up stagger-4" style={{ animationDelay: '600ms' }}>

                        {/* Recent Attendance */}
                        <div className="lg:col-span-5 flex flex-col gap-6">
                            <AttendanceTable />
                        </div>

                        {/* Daily Schedule */}
                        <div className="lg:col-span-7 flex flex-col h-full min-h-[400px]">
                            <div className="bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-xl shadow-sm border border-glass-border overflow-hidden flex flex-col h-full relative group">
                                <div className="px-6 py-5 border-b border-glass-border flex justify-between items-center bg-transparent z-10 relative">
                                    <h3 className="text-lg font-bold text-main flex items-center gap-2">
                                        <span className="material-symbols-outlined text-body">calendar_month</span>
                                        Daily Schedule
                                    </h3>
                                    <div className="flex gap-2">
                                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium bg-black/5 dark:bg-white/5 text-body border border-glass-border cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition-colors">Today</span>
                                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium bg-transparent text-muted border border-glass-border cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors">Tomorrow</span>
                                    </div>
                                </div>

                                <div className="relative flex-1 bg-transparent p-6 overflow-y-auto">
                                    <div className="relative border-l-2 border-glass-border ml-3 space-y-8 pb-4">
                                        <ScheduleItem
                                            title="Intro to IOT"
                                            time="10:00 AM - 11:30 AM"
                                            location="Room 304"
                                            person="Prof. Smith"
                                            type="now"
                                            percentage={45}
                                        />
                                        <ScheduleItem
                                            title="Database Systems"
                                            time="01:00 PM - 02:30 PM"
                                            location="Lab 201"
                                            person="Dr. Johnson"
                                            type="upcoming"
                                        />
                                        <ScheduleItem
                                            title="Group Study Session"
                                            time="03:00 PM - 04:00 PM"
                                            location="Library Zone B"
                                            type="future"
                                        />
                                        <ScheduleItem
                                            title="Web Development Workshop"
                                            time="04:30 PM - 06:00 PM"
                                            location="Innovation Center"
                                            person="Guest Lecturer"
                                            type="future"
                                        />
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

export default StudentDashboard;