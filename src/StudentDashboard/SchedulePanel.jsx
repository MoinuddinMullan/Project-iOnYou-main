import React from 'react';
import { Link } from 'react-router-dom';

function SchedulePanel() {
    return (
        // FIXED: Changed "h-screen" to "fixed inset-0" to completely override Vite's default centering CSS
        <div className="fixed inset-0 w-full flex overflow-hidden bg-bg-main text-body font-display transition-colors duration-500">
            
            {/* Sidebar */}
            <aside className="w-64 bg-green flex flex-col justify-between h-full fixed left-0 top-0 z-50 shadow-xl">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="flex items-center justify-center size-10 bg-white/10 rounded-full border border-white/20">
                            <span className="material-symbols-outlined text-white text-2xl">visibility</span>
                        </div>
                        <div>
                            <h1 className="text-white text-xl font-bold tracking-tight">iOnYou</h1>
                            <p className="text-white/60 text-xs font-medium uppercase tracking-wider">Student Portal</p>
                        </div>
                    </div>
                    <nav className="flex flex-col gap-2">
                        <Link className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-all group" to="/dashboard">
                            <span className="material-symbols-outlined">dashboard</span>
                            <span className="font-medium">Dashboard</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-all group" to="/attendance">
                            <span className="material-symbols-outlined">calendar_today</span>
                            <span className="font-medium">Attendance</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-all group" to="/campus-map">
                            <span className="material-symbols-outlined">map</span>
                            <span className="font-medium">Campus Map</span>
                        </Link>
                        {/* Active Link */}
                        <Link className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 text-white shadow-sm ring-1 ring-white/10 transition-all group" to="/schedule">
                            <span className="material-symbols-outlined">schedule</span>
                            <span className="font-medium">Schedule</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-all group" to="/profile">
                            <span className="material-symbols-outlined">person</span>
                            <span className="font-medium">Profile</span>
                        </Link>
                    </nav>
                </div>
                <div className="p-6 border-t border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-cover bg-center border-2 border-white/30" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBe5WIsCQ5pgXo4GdK_BPaoCiXXu7Hj4_N8Vd-jYBdLgffkDJAYcMqUtbIZ8XdlhFDUWQP8GTyNdpfZOrvkbFr3aalzlX5iXbXv0u4nbwwWdF-4ZBJgGad0EKqXNr9hlBD0IQAUytrmb3sweCxa7G4RqlXKddOvwcrDUK4Dcw6IiMgXaibtOxvOwT1U4UKECLnpfMxp8QRrOzsT0BKT7GteFmAj6Nc96jahSOcxJj3PYfIOs_Fk_tbJrKZjM0qY4n449iE6gdTvquA')" }}></div>
                        <div className="flex flex-col">
                            <span className="text-white text-sm font-medium">202504104610001 Dev</span>
                            <span className="text-white/60 text-[10px] uppercase tracking-wider">Student Profile</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 flex-1 h-full flex flex-row overflow-hidden">
                
                {/* Schedule Section (70% Width) */}
                <section className="w-[70%] h-full flex flex-col border-r border-glass-border">
                    <header className="px-10 py-5 shrink-0">
                        <div className="flex justify-between items-end">
                            <div>
                                <h2 className="text-3xl font-bold text-main tracking-tight">Academic Schedule</h2>
                                <p className="text-muted font-medium mt-1">Semester 2 • Week 12 (May 2025)</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 bg-transparent border border-glass-border rounded hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer text-body transition-colors"><span className="material-symbols-outlined text-xl">chevron_left</span></button>
                                <button className="px-4 py-2 bg-transparent border border-glass-border rounded font-semibold text-sm cursor-pointer text-body hover:bg-black/5 dark:hover:bg-white/5 transition-colors">Today</button>
                                <button className="p-2 bg-transparent border border-glass-border rounded hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer text-body transition-colors"><span className="material-symbols-outlined text-xl">chevron_right</span></button>
                            </div>
                        </div>
                    </header>
                    
                    <div className="flex-1 overflow-y-auto px-10 pb-8">
                        <div className="bg-white/50 dark:bg-black/20 rounded-xl shadow-sm border border-glass-border overflow-hidden">
                            <div className="schedule-grid">
                                {/* Grid Headers */}
                                <div className="time-label border-b border-glass-border !bg-transparent text-muted">GMT+1</div>
                                <div className="day-header text-main">Mon</div>
                                <div className="day-header text-main">Tue</div>
                                <div className="day-header text-main">Wed</div>
                                <div className="day-header text-main">Thu</div>
                                <div className="day-header text-main">Fri</div>
                                
                                {/* 09:00 Row */}
                                <div className="time-label !bg-transparent text-muted">09:00</div>
                                <div className="grid-cell !border-glass-border">
                                    <div className="lecture-card">
                                        <span className="font-bold">Advanced UI</span>
                                        <span>Lab 402 • 09:00-11:00</span>
                                    </div>
                                </div>
                                <div className="grid-cell !border-glass-border"></div>
                                <div className="grid-cell !border-glass-border">
                                    <div className="lecture-card">
                                        <span className="font-bold">System Arch</span>
                                        <span>Room 12 • 09:00-10:30</span>
                                    </div>
                                </div>
                                <div className="grid-cell !border-glass-border"></div>
                                <div className="grid-cell !border-glass-border">
                                    <div className="lecture-card">
                                        <span className="font-bold">History II</span>
                                        <span>Audit. B • 09:00-11:00</span>
                                    </div>
                                </div>
                                
                                {/* 11:00 Row */}
                                <div className="time-label !bg-transparent text-muted">11:00</div>
                                <div className="grid-cell !border-glass-border"></div>
                                <div className="grid-cell !border-glass-border">
                                    <div className="lecture-card">
                                        <span className="font-bold">Typography</span>
                                        <span>Studio 1 • 11:00-12:30</span>
                                    </div>
                                </div>
                                <div className="grid-cell !border-glass-border">
                                    <div className="relative">
                                        <span className="absolute -top-2 -right-2 bg-orange text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">NEW</span>
                                        <div className="lecture-card">
                                            <span className="font-bold">Seminar</span>
                                            <span>Online • 11:15-12:45</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid-cell !border-glass-border">
                                    <div className="lecture-card">
                                        <span className="font-bold">Advanced UI</span>
                                        <span>Lab 402 • 11:00-13:00</span>
                                    </div>
                                </div>
                                <div className="grid-cell !border-glass-border"></div>
                                
                                {/* 13:00 Row */}
                                <div className="time-label !bg-transparent text-muted">13:00</div>
                                <div className="grid-cell !border-glass-border"></div>
                                <div className="grid-cell !border-glass-border"></div>
                                <div className="grid-cell !border-glass-border"></div>
                                <div className="grid-cell !border-glass-border"></div>
                                <div className="grid-cell !border-glass-border"></div>
                                
                                {/* 14:00 Row */}
                                <div className="time-label !bg-transparent text-muted">14:00</div>
                                <div className="grid-cell !border-glass-border">
                                    <div className="lecture-card">
                                        <span className="font-bold">Comp. Ethics</span>
                                        <span>Room 08 • 14:00-15:30</span>
                                    </div>
                                </div>
                                <div className="grid-cell !border-glass-border">
                                    <div className="lecture-card">
                                        <span className="font-bold">Network Sec</span>
                                        <span>Lab 12B • 14:00-16:00</span>
                                    </div>
                                </div>
                                <div className="grid-cell !border-glass-border"></div>
                                <div className="grid-cell !border-glass-border">
                                    <div className="lecture-card bg-orange border-none">
                                        <span className="font-bold text-white">RESCHEDULED</span>
                                        <span className="text-white/90">Project Sync • 14:00</span>
                                    </div>
                                </div>
                                <div className="grid-cell !border-glass-border">
                                    <div className="lecture-card">
                                        <span className="font-bold">Network Sec</span>
                                        <span>Lab 12B • 14:00-16:00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Info Panel Section (30% Width) */}
                <aside className="w-[30%] h-full bg-green text-white p-6 flex flex-col gap-6 overflow-y-auto">
                    
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-white/60 mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">event_upcoming</span>
                            Next Lecture
                        </h3>
                        <div className="bg-white/10 border border-white/20 rounded-xl p-5 backdrop-blur-sm shadow-lg">
                            <div className="flex justify-between items-start mb-4">
                                <span className="bg-orange text-white text-[10px] font-bold px-2 py-1 rounded">STARTING IN 15M</span>
                                <span className="material-symbols-outlined text-white/40 cursor-pointer hover:text-white transition-colors">more_horiz</span>
                            </div>
                            <h4 className="text-xl font-bold mb-1">Network Security</h4>
                            <p className="text-white/80 text-sm mb-4">Laboratory 12B • Engineering Wing</p>
                            <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                                <div className="size-8 rounded-full bg-slate-200 overflow-hidden">
                                    <img alt="Prof" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLzg4Nc84L1uYyQHZ9baTvSTAVRUF2ddA0H7oaL2wqU5l10v5ZIN2sx4C7iqDPXq12BvCjhTGtFyuqaXplS9q5DgW9nB2J6lIpMls_Y3QbMOYqK-czqkzeDxoJFeZv2zWL3d3WtNc6TGUkcPmm0w3e0D7kVRd6azQaszr6yGFf2W57SAPCdYilFgYhtpVvK5V7z98anpD7a0IkDVEsSRQGcdC9RR-DRPn9ai0CJnaxWMWi68LTIvdtxJYwNX3SLFgTpL7HmERr1Dg" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-semibold">Dr. Alistair Vance</span>
                                    <span className="text-[10px] text-white/60 uppercase">Senior Lecturer</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="flex flex-col gap-3">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-white/60 flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">contact_mail</span>
                            Professor Contacts
                        </h3>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-full bg-white/20 flex items-center justify-center font-bold">AV</div>
                                    <div>
                                        <p className="text-sm font-bold">Dr. Alistair Vance</p>
                                        <p className="text-xs text-white/60">Network Security</p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-white/40 text-lg">chat</span>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-full bg-white/20 flex items-center justify-center font-bold">SM</div>
                                    <div>
                                        <p className="text-sm font-bold">Prof. Sarah Meyer</p>
                                        <p className="text-xs text-white/60">Advanced UI Design</p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-white/40 text-lg">chat</span>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-full bg-white/20 flex items-center justify-center font-bold">RW</div>
                                    <div>
                                        <p className="text-sm font-bold">Dr. Robert Walsh</p>
                                        <p className="text-xs text-white/60">System Architecture</p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-white/40 text-lg">chat</span>
                            </div>
                        </div>
                        <button className="w-full mt-1 py-3 border border-white/20 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors cursor-pointer">
                            View Faculty Directory
                        </button>
                    </section>

                    <section className="mt-auto pb-4">
                        <div className="bg-orange/20 border border-orange/40 rounded-xl p-5 backdrop-blur-sm">
                            <div className="flex items-center gap-2 text-orange mb-2">
                                <span className="material-symbols-outlined text-lg">notifications_active</span>
                                <span className="text-xs font-bold uppercase tracking-wider">Updates</span>
                            </div>
                            <p className="text-sm text-white/90 leading-relaxed italic">
                                "Exam registration for Semester 2 is now open. Please confirm your modules by Friday."
                            </p>
                        </div>
                    </section>
                </aside>
                
            </main>
        </div>
    );
}

export default SchedulePanel;