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
                    {/* Active Link */}
                    <SidebarLink icon="assignment_turned_in" label="Attendance Mgmt " to="/staff-ledger" active={true} />
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
        <header className="bg-bg-main/95 backdrop-blur-md px-8 py-5 flex justify-between items-center border-b border-glass-border shadow-sm z-40 shrink-0">
            <div className="flex-1">
                <h2 className="text-3xl font-bold text-main tracking-tight">Attendance</h2>
                <p className="text-muted text-xs uppercase tracking-wide mt-1 font-mono">Academic Year 2024-2025 • Fall Semester</p>
            </div>
            <div className="flex gap-4 items-center">
                <button className="px-4 py-2 bg-black/5 dark:bg-white/5 text-body rounded-lg text-sm font-semibold hover:bg-black/10 dark:hover:bg-white/10 transition-colors flex items-center gap-2 shadow-sm border border-glass-border cursor-pointer">
                    <span className="material-symbols-outlined text-[18px]">ios_share</span>
                    Export Attandance
                </button>
                <div className="h-8 w-px bg-glass-border mx-1"></div>
                <button className="size-10 flex items-center justify-center rounded-full bg-transparent border border-glass-border text-body hover:bg-black/5 dark:hover:bg-white/5 transition-colors relative hover:scale-105 duration-300 cursor-pointer">
                    <span className="material-symbols-outlined">notifications</span>
                    <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border border-bg-main animate-pulse"></span>
                </button>
            </div>
        </header>
    );
}

// Reusable Student Row Component with managed state for radio buttons
function StudentRow({ name, id, checkIn, rate, rateColor, defaultStatus, avatar, delay }) {
    const [status, setStatus] = useState(defaultStatus);

    return (
        <div className={`bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-r-lg shadow-sm border border-glass-border border-l-4 border-l-green p-4 flex items-center justify-between hover:translate-x-1 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200 animate-fade-in-up`} style={{ animationDelay: delay }}>
            
            {/* Student Info */}
            <div className="flex items-center gap-4 flex-1">
                <div className="size-12 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden border border-glass-border shrink-0">
                    <img alt="Student" className="w-full h-full object-cover" src={avatar} />
                </div>
                <div>
                    <h4 className="font-semibold text-lg text-main">{name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 bg-black/5 dark:bg-white/5 rounded text-[10px] font-mono text-body border border-glass-border">{id}</span>
                        <span className="text-[11px] text-muted font-mono">| Last check-in: {checkIn}</span>
                    </div>
                </div>
            </div>

            {/* Attendance Actions */}
            <div className="flex items-center gap-8 mr-4">
                <div className="text-center hidden lg:block">
                    <span className="block text-[10px] uppercase text-muted font-bold tracking-wider">Attd. Rate</span>
                    <span className={`font-mono text-sm font-bold ${rateColor}`}>{rate}</span>
                </div>
                
                <div className="flex items-center gap-6">
                    {/* Present Radio */}
                    <label className="cursor-pointer group flex flex-col items-center gap-1">
                        <input 
                            className="hidden" 
                            name={`status-${id}`} 
                            type="radio" 
                            value="present" 
                            checked={status === 'present'} 
                            onChange={() => setStatus('present')} 
                        />
                        <div className={`size-4 rounded-full border-2 transition-all duration-200 ${status === 'present' ? 'bg-green border-green scale-110' : 'border-muted bg-transparent group-hover:border-green'}`}></div>
                        <span className={`text-[10px] uppercase font-bold transition-colors ${status === 'present' ? 'text-main' : 'text-muted group-hover:text-main'}`}>Pres</span>
                    </label>
                    
                    {/* Absent Radio */}
                    <label className="cursor-pointer group flex flex-col items-center gap-1">
                        <input 
                            className="hidden" 
                            name={`status-${id}`} 
                            type="radio" 
                            value="absent" 
                            checked={status === 'absent'} 
                            onChange={() => setStatus('absent')} 
                        />
                        <div className={`size-4 rounded-full border-2 transition-all duration-200 ${status === 'absent' ? 'bg-red-500 border-red-500 scale-110' : 'border-muted bg-transparent group-hover:border-red-500'}`}></div>
                        <span className={`text-[10px] uppercase font-bold transition-colors ${status === 'absent' ? 'text-main' : 'text-muted group-hover:text-main'}`}>Abs</span>
                    </label>

                    {/* Late Radio */}
                    <label className="cursor-pointer group flex flex-col items-center gap-1">
                        <input 
                            className="hidden" 
                            name={`status-${id}`} 
                            type="radio" 
                            value="late" 
                            checked={status === 'late'} 
                            onChange={() => setStatus('late')} 
                        />
                        <div className={`size-4 rounded-full border-2 transition-all duration-200 ${status === 'late' ? 'bg-orange border-orange scale-110' : 'border-muted bg-transparent group-hover:border-orange'}`}></div>
                        <span className={`text-[10px] uppercase font-bold transition-colors ${status === 'late' ? 'text-main' : 'text-muted group-hover:text-main'}`}>Late</span>
                    </label>
                </div>
            </div>
        </div>
    );
}

// --- Main Dashboard Component ---

function StaffAttendanceLedger() {
    return (
        <div className="fixed inset-0 w-full flex overflow-hidden bg-bg-main text-body font-display transition-colors duration-500">
            <Sidebar />

            <main className="ml-64 flex-1 h-screen overflow-hidden relative flex flex-col">
                <Header />

                <div className="flex flex-1 overflow-hidden">
                    
                    {/* Left Settings Sidebar */}
                    <div className="w-1/4 min-w-[300px] border-r border-glass-border bg-black/5 dark:bg-white/5 flex flex-col p-6 overflow-y-auto z-30 animate-fade-in-up">
                        
                        {/* Class Overview Stats */}
                        <div className="mb-8 bg-white/50 dark:bg-black/20 backdrop-blur-md p-5 rounded-xl shadow-sm border border-glass-border">
                            <h3 className="text-lg font-bold text-main mb-4 border-b border-glass-border pb-2">Class Overview</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-body font-medium">Total Enrolled</span>
                                    <span className="text-xl font-bold text-main">42</span>
                                </div>
                                <div className="h-px bg-glass-border w-full"></div>
                                <div className="grid grid-cols-3 gap-2 text-center">
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-bold text-green">38</span>
                                        <span className="text-[10px] uppercase tracking-wider text-muted mt-1">Present</span>
                                    </div>
                                    <div className="flex flex-col border-l border-glass-border">
                                        <span className="text-2xl font-bold text-red-500">4</span>
                                        <span className="text-[10px] uppercase tracking-wider text-muted mt-1">Absent</span>
                                    </div>
                                    <div className="flex flex-col border-l border-glass-border">
                                        <span className="text-2xl font-bold text-orange">0</span>
                                        <span className="text-[10px] uppercase tracking-wider text-muted mt-1">Late</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-muted uppercase tracking-wide">Select Course</label>
                                <div className="relative">
                                    <select className="w-full pl-3 pr-8 py-3 rounded-lg bg-transparent border-glass-border border text-sm font-medium text-body shadow-sm focus:ring-green focus:border-green outline-none cursor-pointer">
                                        <option>Python for IOT - CS-304</option>
                                        <option>Database Systems - CS-201</option>
                                        <option>Advanced Networking - CS-410</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-muted uppercase tracking-wide">Student Search</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-3 text-muted text-[20px]">search</span>
                                    <input 
                                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border-glass-border border text-sm text-body focus:ring-green focus:border-green placeholder:text-muted shadow-sm outline-none" 
                                        placeholder="Search by name or ID..." 
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-muted uppercase tracking-wide">Session Info</label>
                                <div className="bg-white/50 dark:bg-black/20 backdrop-blur-md p-4 rounded-lg border border-glass-border shadow-sm space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-body">
                                        <span className="material-symbols-outlined text-orange text-[20px]">calendar_today</span>
                                        <span className="font-mono font-medium">Oct 24, 2024</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-body">
                                        <span className="material-symbols-outlined text-muted text-[20px]">schedule</span>
                                        <span className="font-mono font-medium">10:00 - 11:30 AM</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-body">
                                        <span className="material-symbols-outlined text-muted text-[20px]">location_on</span>
                                        <span className="font-medium">Lab 304, Science Block</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="mt-auto pt-8">
                            <button className="w-full bg-green hover:brightness-110 text-white py-3 px-4 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium cursor-pointer">
                                <span className="material-symbols-outlined text-[20px]">save</span>
                                Save Attandance
                            </button>
                        </div>
                    </div>

                    {/* Right Ledger Area */}
                    <div className="w-3/4 flex-1 overflow-y-auto bg-transparent p-8 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                        <div className="max-w-4xl mx-auto pb-20 space-y-4">
                            
                            {/* Ledger Header */}
                            <div className="flex justify-between items-end mb-6 animate-fade-in-up">
                                <div>
                                    <h3 className="text-xl font-bold text-main">Student Register</h3>
                                    <p className="text-sm text-muted mt-1">Mark attendance for today's session.</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-mono text-muted uppercase">Sort by:</span>
                                    <select className="bg-transparent border-0 border-b border-glass-border py-1 pl-0 pr-8 text-sm font-medium text-body focus:ring-0 cursor-pointer outline-none">
                                        <option>Last Name A-Z</option>
                                        <option>First Name A-Z</option>
                                        <option>Student ID</option>
                                        <option>Status</option>
                                    </select>
                                </div>
                            </div>

                            {/* Student List */}
                            <div className="space-y-3">
                                <StudentRow 
                                    name="Freeman, Alice" 
                                    id="2021CS045" 
                                    checkIn="09:58 AM" 
                                    rate="92%" 
                                    rateColor="text-green" 
                                    defaultStatus="present" 
                                    avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuAV-nYSHcLvtnBQiWEiv9sRSRCj3YIPJ7CMrdxGFvkmn009qnSskitwkPcsJ-L1J8bbiG6pTSNYv4X7vvF-O1GfGKsRNcUL5MewKPObDmi9XM8mJCxn8vqyD1KM9YmK7AjPl_EpNAZuqN6n8BJr304a_w0VyD160feChhL56zkrc7sk5C7dhWnR13aB0ynV_23hIdDUWosdRwoRyHdhAQTW7SBQZO5tXg20PZkjLlzgeXPTlf6kj_900aZvOo3xSacYazsNPXKZSC4" 
                                    delay="100ms"
                                />
                                <StudentRow 
                                    name="Lee, Brandon" 
                                    id="2021CS088" 
                                    checkIn="09:45 AM" 
                                    rate="78%" 
                                    rateColor="text-orange" 
                                    defaultStatus="present" 
                                    avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuCH_Q6lJBbTiLtzNlnUC1H32p6zNkXQTV2Je_r8kAODLDomv9jnaPXsfOq6r0OYPsVmJFEnNhkBa75iulHZyRuC_KrRY72c2eNU18MuWZlbELmpI7sWoAu4U307xKuMGKx4sjCt-aCzwh58qpJHSyNKR8zxvwrTp4xoZVKjAg1JqLJoUQUIEi0rBWalVRNDSO5FwcU0-9Ai-e-RvnGSWSEYCnEgd1MGGSLGO1sshz6G8RacMiAsejkdDwAEv-Pu2iy6J9_04_S6IzM" 
                                    delay="150ms"
                                />
                                <StudentRow 
                                    name="Montanez, Carla" 
                                    id="2021CS012" 
                                    checkIn="--:--" 
                                    rate="65%" 
                                    rateColor="text-red-500" 
                                    defaultStatus="absent" 
                                    avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuC6BwFdNX9w1VE1tsf8yUKC7iqTpsEMPqKP3oMkYrKTbBCEjEWCtpBuDBEst9KPR0jFoYnNaag61dOAR_afXWL9zVkZkJTWPFThOxqDEALew9hKGLO9bG8yynTyhm4IDp8vNq3AppOjJwsMFxHANwNXMh1jevSa8oGDl5niHERtIlPQ0bGG6oS0yUM8j4uaEn2y_wsx5-W00w-JP42M9B0TnFcflVm8BVyjk9BuDc9mWhCDOK7opD2zb_wcLF37QlZOqB8B2U8mRhg" 
                                    delay="200ms"
                                />
                                <StudentRow 
                                    name="Kim, David" 
                                    id="2021CS091" 
                                    checkIn="09:55 AM" 
                                    rate="98%" 
                                    rateColor="text-green" 
                                    defaultStatus="present" 
                                    avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuBiI4mgsII_KhKf6Ppt-2WhIqbpdpNeNHbijB9pvh9wHimpPg7idajYODt_q86AI5jrmvL7m80ef8yWBOOu546GqHEAc7qb7YcAA84PF15l3lPFme6hntc8TUMLDlp-t4KrFyjo2QB9XxiIjdxsrIg6XEUrHJiOzF9nc02e_vq70iVwWiTF68VAXxoJaXj6-vPOr4mVPKvVKvpfdxTTfBQmBvuSKdVeurvLVOkl_R2UmjYNmJT6rOvqU4qdR16F_nSIYeUden8ARWI" 
                                    delay="250ms"
                                />
                                <StudentRow 
                                    name="Rodriguez, Elena" 
                                    id="2021CS102" 
                                    checkIn="10:15 AM" 
                                    rate="89%" 
                                    rateColor="text-green" 
                                    defaultStatus="late" 
                                    avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuATnlnfIPbioLag5cA03G5dZ8_uBa-kW4bK77VzIighazFeyjfPYhrgCcbe8V6XravaqWd0tQp1bon6UG3HnMQ8QImPNG8fADu-LnWX-5UeXiuYmoftIODHsqMcWFvw4-UUPZTeSiAltaDrRpwZF58u9CrU8NQ0YJgP11Q4x79s5HVWeNHA9CmKJKJVTz_tTjFZYP7SGXeV0P9uP1dZ2275bzCUfcKbq85lT6dAOSAeOy8yHCEM8eXuEdOnLV2uqKqWhif-yQKwCpE" 
                                    delay="300ms"
                                />
                                <StudentRow 
                                    name="Chen, Frank" 
                                    id="2021CS115" 
                                    checkIn="--:--" 
                                    rate="45%" 
                                    rateColor="text-red-500" 
                                    defaultStatus="absent" 
                                    avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuCC2tFi-J6qaG2orGrC0F-yxT7Lj8WHtEwCPY_5ljdjQOdoltzagkkQflbyO-lZlSbyp-sgYswqbXGclCVJLlzlw4p4oli6sbW5B4dQgU5NPQMAO_sQozUVbsBaGgt7b6_UEYD5gYmo91zTq5b0WLBNmczz5pD9-zy2f9ciiEMpLabh5hE9o36ljsuCqBPR0BSOApmrOwVTIhmuthk79dqxyJGIKrVgdmKU9iUo5cX10yoiiBeJd1S8sVe9RVpovGuugwhItRyZyt0" 
                                    delay="350ms"
                                />
                                <StudentRow 
                                    name="Hopper, Grace" 
                                    id="2021CS001" 
                                    checkIn="09:50 AM" 
                                    rate="100%" 
                                    rateColor="text-green" 
                                    defaultStatus="present" 
                                    avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuBTV1pyQ-I-9P4Wroveopcbip905VfK7AcdZTAPKJT3UHNz86pYbwjxYEwM8623FoAYyDXvLTYksRYOh9ZzVOPgKyocMdPjU5P1ZTOj2hZKT7iQdqc9kWUadEqpag4ZPg8Ho7W_c0g1SXCEv0NFXWcAqOwD5navtYjw3IAuQDuH78AVDETsIm7wiqyg0o__5wq5gzu9pLXfxRajAee4j2H8CYRbgR0uAAZiezS13Kv-TDp6rVkxElSmQ-_oeWct5sKUd0DSlhGgcvQ" 
                                    delay="400ms"
                                />
                            </div>

                            {/* Pagination */}
                            <div className="mt-6 flex justify-between items-center px-2">
                                <span className="text-xs text-muted font-mono">Showing 1-7 of 42 students</span>
                                <div className="flex gap-2">
                                    <button className="size-8 flex items-center justify-center border border-glass-border rounded-md bg-transparent text-muted hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50 cursor-pointer transition-colors" disabled>
                                        <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                                    </button>
                                    <button className="size-8 flex items-center justify-center border border-glass-border rounded-md bg-transparent text-body hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors">
                                        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default StaffAttendanceLedger;