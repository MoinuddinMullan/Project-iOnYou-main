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
                    <SidebarLink icon="calendar_today" label="Attendance" to="/attendance-history" />
                    <SidebarLink icon="map" label="Campus Map" to="/campus-map" />
                    <SidebarLink icon="schedule" label="Schedule" to="/schedule" />
                    {/* Active route */}
                    <SidebarLink icon="person" label="Profile" to="/profile" active />
                </nav>
            </div>
            <div className="p-6 border-t border-white/10">
                <button className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-orange text-white font-bold rounded-lg shadow-lg shadow-orange/20 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
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

// Reusable Profile Info Field Component
function InfoField({ label, value }) {
    return (
        <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted mb-1">{label}</p>
            <p className="text-base font-medium text-main">{value}</p>
        </div>
    );
}

// --- Main Student Profile Component ---
function StudentProfile() {
    const [student, setStudent] = useState(null);

    useEffect(() => {
        async function load() {
            try {
                const students = await api.getStudents();
                if (students && students.length) setStudent(students[0]);
            } catch (err) {
                console.error('Failed loading profile', err);
            }
        }
        load();
    }, []);

    return (
        <div className="fixed inset-0 w-full flex overflow-hidden bg-bg-main text-body font-display transition-colors duration-500">
            <Sidebar />

            <main className="ml-64 flex-1 h-full flex flex-col overflow-y-auto relative">
                
                {/* Header */}
                <header className="sticky top-0 z-40 px-10 py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-bg-main/90 backdrop-blur-md border-b border-glass-border gap-4">
                    <h2 className="text-3xl font-bold text-main tracking-tight">Student Profile</h2>
                    <div className="flex gap-3">
                        <button className="px-5 py-2.5 bg-orange text-white font-semibold rounded-lg shadow-sm hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer">
                            <span className="material-symbols-outlined text-xl">edit</span>
                            Edit Profile
                        </button>
                        <button className="px-5 py-2.5 bg-transparent border border-glass-border text-body font-semibold rounded-lg shadow-sm hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center gap-2 cursor-pointer">
                            <span className="material-symbols-outlined text-xl">lock_reset</span>
                            Change Password
                        </button>
                    </div>
                </header>

                <div className="px-10 py-8 space-y-6 max-w-7xl mx-auto w-full">
                    
                    {/* Top Hero Banner */}
                    <section className="bg-green rounded-2xl p-8 text-white shadow-lg flex flex-col md:flex-row items-center md:items-start gap-8 border border-white/10 animate-fade-in-up">
                        <div className="size-32 shrink-0 rounded-full border-4 border-white/20 overflow-hidden bg-white/10 flex items-center justify-center shadow-inner">
                            <img alt="Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBe5WIsCQ5pgXo4GdK_BPaoCiXXu7Hj4_N8Vd-jYBdLgffkDJAYcMqUtbIZ8XdlhFDUWQP8GTyNdpfZOrvkbFr3aalzlX5iXbXv0u4nbwwWdF-4ZBJgGad0EKqXNr9hlBD0IQAUytrmb3sweCxa7G4RqlXKddOvwcrDUK4Dcw6IiMgXaibtOxvOwT1U4UKECLnpfMxp8QRrOzsT0BKT7GteFmAj6Nc96jahSOcxJj3PYfIOs_Fk_tbJrKZjM0qY4n449iE6gdTvquA" />
                        </div>
                        <div className="text-center md:text-left flex-1">
                            <h3 className="text-4xl font-bold mb-1 tracking-tight">{student ? student.name : 'Dev'}</h3>
                            <p className="text-xl text-white/80 font-medium">{student ? `#${student.enrollmentNo}` : '#202504104610001'}</p>
                            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                                <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold uppercase tracking-widest border border-white/10 backdrop-blur-sm">Active Student</span>
                                <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold uppercase tracking-widest border border-white/10 backdrop-blur-sm">Semester 2</span>
                                <span className="px-3 py-1 bg-orange/20 text-orange-100 rounded-full text-xs font-semibold uppercase tracking-widest border border-orange/30 backdrop-blur-sm ml-auto md:ml-0 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">verified</span>
                                    Verified
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* Information Grids */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Personal Details Card */}
                        <section className="bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-xl shadow-sm border border-glass-border overflow-hidden animate-fade-in-up stagger-1">
                            <div className="px-6 py-4 border-b border-glass-border bg-black/5 dark:bg-white/5">
                                <h4 className="font-bold text-main flex items-center gap-2">
                                    <span className="material-symbols-outlined text-green">person</span>
                                    Personal Details
                                </h4>
                            </div>
                            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                                <InfoField label="Email Address" value={student?.email || 'dev.student@ionyou.edu'} />
                                <InfoField label="Phone Number" value={student?.phone || '+1 (555) 123-4567'} />
                                <InfoField label="Date of Birth" value={student?.dob || 'May 15, 2004'} />
                                <div className="sm:col-span-2">
                                    <InfoField label="Current Address" value="123 University Drive, Academic Quarter, Suite 402, Campus City, CA 90210" />
                                </div>
                            </div>
                        </section>

                        {/* Academic Information Card */}
                        <section className="bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-xl shadow-sm border border-glass-border overflow-hidden animate-fade-in-up stagger-2">
                            <div className="px-6 py-4 border-b border-glass-border bg-black/5 dark:bg-white/5">
                                <h4 className="font-bold text-main flex items-center gap-2">
                                    <span className="material-symbols-outlined text-green">school</span>
                                    Academic Information
                                </h4>
                            </div>
                            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                                <div className="sm:col-span-2">
                                    <InfoField label="Department" value={student?.course || 'Computer Science & Engineering'} />
                                </div>
                                <InfoField label="Current Semester" value={student?.year || 'Semester 2'} />
                                <InfoField label="Academic Year" value="2024 - 2025" />
                                <InfoField label="Advisor" value="Dr. Alistair Vance" />
                                <InfoField label="GPA" value="3.8 / 4.0" />
                            </div>
                        </section>
                    </div>

                    {/* Bottom Full-Width Card */}
                    <section className="bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-xl shadow-sm border border-glass-border overflow-hidden animate-fade-in-up stagger-3">
                        <div className="px-6 py-4 border-b border-glass-border bg-black/5 dark:bg-white/5">
                            <h4 className="font-bold text-main flex items-center gap-2">
                                <span className="material-symbols-outlined text-green">emergency_share</span>
                                Emergency Contact
                            </h4>
                        </div>
                        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
                            <InfoField label="Contact Name" value="Sarah J. Miller" />
                            <InfoField label="Relationship" value="Guardian" />
                            <InfoField label="Phone Number" value="+1 (555) 987-6543" />
                            <InfoField label="Alternate Email" value="sarah.miller@email.com" />
                        </div>
                    </section>

                </div>
            </main>
        </div>
    );
}

export default StudentProfile;