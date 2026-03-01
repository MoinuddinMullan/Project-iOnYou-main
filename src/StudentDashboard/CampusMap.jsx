import React from 'react';
import { Link } from 'react-router-dom';

// --- Shared Sidebar Component ---
function Sidebar() {
    return (
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
                    <SidebarLink icon="dashboard" label="Dashboard" to="/dashboard" />
                    <SidebarLink icon="calendar_today" label="Attendance" to="/attendance-history" />
                    
                    {/* Active Link for Campus Map */}
                    <SidebarLink icon="map" label="Campus Map" to="/campus-map" active />
                    
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
                    <div className="size-10 rounded-full bg-cover bg-center border-2 border-white/30" style={{ backgroundImage: "url('https://ui-avatars.com/api/?name=Alex+Student&background=random')" }}></div>
                    <div className="flex flex-col">
                        <span className="text-white text-sm font-medium">Alex Student</span>
                        <span className="text-white/60 text-xs">Enrollment: ENR-482910</span>
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

// --- Main Campus Map Component ---
function CampusMap() {
    // Location Data Array for easy management
    const locations = [
        { 
            id: 1, 
            name: "Library", 
            desc: "Central Block • Quiet Zone", 
            icon: "location_on", 
            active: true, 
            info: "Main resource center for students. Accessible 24/7 during exam periods." 
        },
        { id: 2, name: "Main Canteen", desc: "South Wing • Dining", icon: "restaurant", active: false },
        { id: 3, name: "Block A (Science)", desc: "North Campus • Laboratories", icon: "biotech", active: false },
        { id: 4, name: "Sports Center", desc: "West Wing • Gymnasium", icon: "fitness_center", active: false },
        { id: 5, name: "Administrative Bldg.", desc: "Central Plaza • Offices", icon: "corporate_fare", active: false },
    ];

    return (
        // Applied the exact same wrapper fix used in SchedulePanel
        <div className="fixed inset-0 w-full flex overflow-hidden bg-bg-main text-body font-display transition-colors duration-500">
            <Sidebar />

            {/* Main Content Area */}
            <main className="ml-64 flex-1 flex flex-col h-full overflow-hidden relative">
                
                {/* Header */}
                <header className="px-10 py-5 shrink-0 border-b border-glass-border flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-main tracking-tight">Campus Map</h2>
                        <p className="text-muted font-medium mt-1">202504104610001 Dev</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 text-body hover:bg-black/5 dark:hover:bg-white/5 border border-glass-border rounded-lg cursor-pointer transition-colors flex items-center justify-center">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                        <button className="p-2 text-body hover:bg-black/5 dark:hover:bg-white/5 border border-glass-border rounded-lg cursor-pointer transition-colors flex items-center justify-center">
                            <span className="material-symbols-outlined">settings</span>
                        </button>
                    </div>
                </header>

                {/* Split View Content */}
                <div className="flex-1 flex overflow-hidden">
                    
                    {/* Left: Location List (30%) */}
                    <section className="w-1/3 border-r border-glass-border flex flex-col">
                        <div className="p-6">
                            <label className="relative block">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span className="material-symbols-outlined text-muted text-sm">search</span>
                                </span>
                                <input 
                                    className="w-full pl-10 pr-4 py-2 border border-glass-border bg-transparent rounded-lg text-sm text-body focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all placeholder:text-muted" 
                                    placeholder="Search campus locations..." 
                                    type="text"
                                />
                            </label>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-3">
                            <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Campus Locations</h3>
                            
                            {/* Location Cards Rendered via Array */}
                            {locations.map((loc) => (
                                loc.active ? (
                                    <div key={loc.id} className="p-4 bg-green text-white rounded-lg shadow-md border-l-4 border-orange">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-bold text-base leading-tight text-white">{loc.name}</h4>
                                                <p className="text-xs text-white/80 mt-1">{loc.desc}</p>
                                            </div>
                                            <span className="material-symbols-outlined text-orange">{loc.icon}</span>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-white/10">
                                            <p className="text-xs leading-relaxed text-white/90">{loc.info}</p>
                                            <button className="mt-4 w-full bg-orange text-white py-2 rounded font-bold text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm">
                                                <span className="material-symbols-outlined text-sm">directions</span>
                                                Get Directions
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div key={loc.id} className="p-4 bg-white/50 dark:bg-black/20 border border-glass-border rounded-lg hover:border-green transition-all cursor-pointer group shadow-sm">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-bold text-base text-main group-hover:text-green transition-colors">{loc.name}</h4>
                                                <p className="text-xs text-muted mt-1">{loc.desc}</p>
                                            </div>
                                            <span className="material-symbols-outlined text-muted group-hover:text-green">{loc.icon}</span>
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    </section>

                    {/* Right: Map View (70%) */}
                    <section className="flex-1 relative overflow-hidden">
                        
                        {/* SVG Canvas Map */}
                        <div className="absolute inset-0 p-10">
                            <svg fill="none" height="100%" viewBox="100 50 800 700" width="100%" xmlns="http://www.w3.org/2000/svg">
                                {/* Paths / Roads (Using your custom colors) */}
                                <path d="M100 400 H900 M500 100 V700 M300 100 V700 M700 100 V700 M100 200 H900 M100 600 H900" stroke="var(--border-glass-border, rgba(128,128,128,0.2))" strokeLinecap="round" strokeWidth="20"></path>
                                
                                {/* Buildings (Green Rectangles) */}
                                <rect fill="var(--color-green)" height="120" rx="4" width="100" x="150" y="120"></rect>
                                <text fill="white" fontFamily="Work Sans" fontSize="14" fontWeight="600" textAnchor="middle" x="200" y="185">BLOCK A</text>
                                
                                <rect fill="var(--color-green)" height="160" rx="4" stroke="var(--color-orange)" strokeWidth="4" width="160" x="420" y="320"></rect>
                                <text fill="white" fontFamily="Work Sans" fontSize="18" fontWeight="700" textAnchor="middle" x="500" y="405">LIBRARY</text>
                                
                                <rect fill="var(--color-green)" height="100" rx="4" width="160" x="420" y="620"></rect>
                                <text fill="white" fontFamily="Work Sans" fontSize="14" fontWeight="600" textAnchor="middle" x="500" y="675">CANTEEN</text>
                                
                                <rect fill="var(--color-green)" height="160" rx="4" width="100" x="750" y="320"></rect>
                                <text fill="white" fontFamily="Work Sans" fontSize="14" fontWeight="600" textAnchor="middle" x="800" y="405">SPORTS</text>
                                
                                <rect fill="var(--color-green)" height="120" rx="4" width="100" x="750" y="120"></rect>
                                <text fill="white" fontFamily="Work Sans" fontSize="14" fontWeight="600" textAnchor="middle" x="800" y="185">ADMIN</text>
                                
                                {/* Current Location Marker */}
                                <circle cx="200" cy="675" fill="var(--color-orange)" r="10"></circle>
                                <circle cx="200" cy="675" fill="none" opacity="0.5" r="15" stroke="var(--color-orange)" strokeWidth="2"></circle>
                                <text fill="var(--text-main)" fontFamily="Work Sans" fontSize="12" fontWeight="700" textAnchor="middle" x="200" y="705">CURRENT LOCATION</text>
                                
                                {/* Dotted Path (Navigation) */}
                                <path style={{ strokeDasharray: '8, 8' }} d="M200 675 V600 H300 V400 H420" fill="none" stroke="var(--color-orange)" strokeLinecap="round" strokeWidth="4"></path>
                            </svg>
                        </div>

                        {/* Map Legend / Controls */}
                        <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                            <div className="bg-white/50 dark:bg-black/20 backdrop-blur-md p-4 rounded-lg shadow-xl border border-glass-border">
                                <h5 className="text-xs font-bold text-muted uppercase tracking-widest mb-3">Map Legend</h5>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="size-3 bg-green rounded-sm"></div>
                                        <span className="text-xs text-body">Campus Building</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="size-3 bg-orange rounded-full"></div>
                                        <span className="text-xs text-body">You are here</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-0.5 w-3 border-t-2 border-dashed border-orange"></div>
                                        <span className="text-xs text-body">Suggested Route</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 justify-end">
                                <button className="size-10 bg-white/50 dark:bg-black/20 backdrop-blur-md border border-glass-border rounded-lg shadow-lg flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer">
                                    <span className="material-symbols-outlined text-body">add</span>
                                </button>
                                <button className="size-10 bg-white/50 dark:bg-black/20 backdrop-blur-md border border-glass-border rounded-lg shadow-lg flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer">
                                    <span className="material-symbols-outlined text-body">remove</span>
                                </button>
                            </div>
                        </div>

                        {/* Selected Location Mini Overlay */}
                        <div className="absolute top-6 right-6 animate-fade-in-up">
                            <div className="bg-white/50 dark:bg-black/20 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-glass-border flex items-center gap-3">
                                <div className="size-2 bg-green rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium text-main">Campus Status: Open</span>
                            </div>
                        </div>

                    </section>
                </div>
            </main>
        </div>
    );
}

export default CampusMap;