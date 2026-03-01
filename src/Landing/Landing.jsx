import React from 'react';


function Landing() {
  return (
    <main className="grow">
      
      {/* --- HERO SECTION --- */}
      <div className="relative overflow-hidden pt-16 pb-20 sm:pb-24 lg:pb-32 text-center">
        
      

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-bg-card/10 border border-bg-card/20 mb-8 animate-fade-in-up backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-accent mr-2 animate-pulse"></span>
            <span className="text-sm font-bold text-main">Powered by Next-Gen IOT & AI</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-main">
            <div className="overflow-hidden inline-block align-bottom">
              <span className="block animate-reveal-text">Next-Gen Campus</span>
            </div>
            <br />
            <span className="text-accent relative inline-block animate-reveal-text" style={{ animationDelay: '0.2s' }}>
              Intelligence
            </span>
          </h1>
          
          <p className="mt-6 max-w-2xl mx-auto text-xl text-body animate-fade-in-up font-medium" style={{ animationDelay: '0.4s' }}>
            Seamlessly integrating IoT sensors, AI-driven analytics, and real-time mapping to revolutionize university attendance.
          </p>

          <div className="mt-10 flex justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          
            <button className="px-8 py-4 rounded-xl text-main border-2 border-main hover:bg-bg-card hover:text-white transition-all duration-300 font-bold cursor-pointer bg-white/50 backdrop-blur-sm">
              View Docs
            </button>
          </div>
        </div>
      </div>

      {/* --- STATS SECTION --- */}
      <section className="relative -mt-10 pb-20 z-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { t: 'Total Students', v: '12,480', i: 'groups', sub: '+2% Growth' },
            { t: 'Active IoT Nodes', v: '842', i: 'hub', sub: '99.9% Uptime' },
            { t: 'AI Accuracy', v: '98.4%', i: 'psychology', sub: 'Model v2.1' }
          ].map((stat, i) => (
            <div key={i} className="tech-card p-8 group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-card font-medium opacity-90">{stat.t}</h3>
                <span className="material-symbols-outlined text-accent text-3xl p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">{stat.i}</span>
              </div>
              <p className="text-4xl font-bold text-card mb-2">{stat.v}</p>
              <span className="text-xs font-bold text-accent bg-accent/20 px-2 py-1 rounded-full uppercase tracking-wide">
                {stat.sub}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* --- TECH STACK (UPDATED MARQUEE SIZE) --- */}
      <section className="py-20 bg-bg-main relative overflow-hidden transition-colors duration-500">
      
         <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 opacity-5 pointer-events-none select-none z-0">
         <div 
      className="animate-marquee whitespace-nowrap font-bold text-main uppercase tracking-widest"
      style={{ fontSize: '9rem', lineHeight: '1' }}
    >
      Python • Flutter • React • Node.js • TensorFlow • MQTT • Python • Flutter • React • Node.js •
    </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-main">Architecture & Stack</h2>
            <p className="text-muted mt-2 text-lg">Built on robust, scalable technologies.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { n: 'Python ML', i: 'terminal' },
              { n: 'IOT', i: 'wifi_tethering' },
              { n: 'MERN Stack', i: 'database' },
              { n: 'Flutter', i: 'smartphone' },
                
            ].map((tech, i) => (
              <div key={i} className="tech-card flex flex-col items-center p-8 cursor-pointer group hover:bg-white/5">
                <span className="material-symbols-outlined text-5xl text-accent mb-6 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">{tech.i}</span>
                <h3 className="font-bold text-card group-hover:text-white transition-colors tracking-wide">{tech.n}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- INNOVATORS SECTION --- */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-main mb-16">Meet The Innovators</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {['Alex Chen', 'Sarah Johnson', 'Michael Ross', 'Emily Davis'].map((name, i) => (
              <div key={i} className="tech-card rounded-2xl overflow-hidden shadow-xl hover:-translate-y-3 transition-all duration-300 group">
                <div className="h-40 bg-black/10 relative flex items-center justify-center">
                   <span className="material-symbols-outlined text-6xl text-white/50 group-hover:scale-110 transition-transform duration-500">person</span>
                </div>
                <div className="p-6 text-card relative">
                  <h3 className="text-xl font-bold group-hover:text-accent transition-colors">{name}</h3>
                  <p className="text-sm opacity-70">Core Team</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}

export default Landing;