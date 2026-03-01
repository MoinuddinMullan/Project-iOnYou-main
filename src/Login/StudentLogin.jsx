import { useNavigate } from 'react-router-dom';
import api from '../api';

function StudentLogin() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center relative bg-[#E8E2D8] font-sans overflow-hidden selection:bg-[#F2A65A] selection:text-white">
      
      {/* Background Animated Eye */}
      <span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40rem] text-[#6F8F72]/10 pointer-events-none z-0 animate-[pulse_8s_ease-in-out_infinite]">
        visibility
      </span>

      <main className="relative z-10 w-full max-w-md px-6">
        
        {/* Login Card */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] animate-[slideUpFade_0.6s_ease-out_0.1s_forwards] opacity-0">
          
          {/* Top Green Bar */}
          <div className="h-2 w-full bg-[#6F8F72]"></div>
          
          <div className="p-8 lg:p-12">
            
            {/* Logo Section */}
            <div className="flex flex-col items-center mb-10 text-center">
              <div className="w-16 h-16 bg-[#6F8F72]/5 rounded-full flex items-center justify-center mb-4 animate-[slideUpFade_0.6s_ease-out_0.2s_forwards] opacity-0">
                <span className="material-symbols-outlined text-[#6F8F72] text-4xl animate-[eyeBlink_4s_infinite]">
                  visibility
                </span>
              </div>
              <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight animate-[slideUpFade_0.6s_ease-out_0.3s_forwards] opacity-0">
                iOnYou
              </h1>
              <p className="text-[11px] mt-1 uppercase tracking-[0.4em] text-gray-400 font-bold animate-[slideUpFade_0.6s_ease-out_0.3s_forwards] opacity-0">
                Student Portal
              </p>
            </div>

            {/* Form */}
            <form className="space-y-8" onSubmit={async (e) => {
              e.preventDefault();
              try {
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                // Attempt backend login; if empty, use demo admin credentials
                const loginEmail = email || 'admin@college.edu';
                const loginPassword = password || 'Admin@123';
                const res = await api.login(loginEmail, loginPassword);
                if (res && res.token) {
                  localStorage.setItem('token', res.token);
                  localStorage.setItem('user', JSON.stringify(res.user));
                  // Navigate to dashboard
                  navigate('/dashboard');
                }
              } catch (err) {
                console.error('Login failed', err);
                alert('Login failed. Please use the demo credentials or check server.');
              }
            }}>
              {/* hidden navigate hook */}
              {/* eslint-disable-next-line */}
              <NavigateHelper />
              
              {/* Email Input */}
              <div className="relative group animate-[slideUpFade_0.6s_ease-out_0.4s_forwards] opacity-0">
                <label 
                  htmlFor="email" 
                  className="block text-[10px] uppercase tracking-widest text-[#6F8F72] font-bold mb-1"
                >
                  University Email Address
                </label>
                <input 
                  id="email" 
                  type="email" 
                  placeholder="student@university.edu"
                  className="w-full px-0 py-3 border-b border-gray-200 focus:outline-none bg-transparent text-gray-800 placeholder-gray-300 transition-all peer"
                />
                {/* Animated Border Line */}
                <div className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-[#F2A65A] transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] -translate-x-1/2 peer-focus:w-full"></div>
              </div>

              {/* Password Input */}
              <div className="relative group animate-[slideUpFade_0.6s_ease-out_0.5s_forwards] opacity-0">
                <label 
                  htmlFor="password" 
                  className="block text-[10px] uppercase tracking-widest text-[#6F8F72] font-bold mb-1"
                >
                  Security Passcode
                </label>
                <input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full px-0 py-3 border-b border-gray-200 focus:outline-none bg-transparent text-gray-800 placeholder-gray-300 transition-all peer"
                />
                <div className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-[#F2A65A] transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] -translate-x-1/2 peer-focus:w-full"></div>
              </div>

              {/* Extras */}
              <div className="flex justify-between items-center pt-2 animate-[slideUpFade_0.6s_ease-out_0.5s_forwards] opacity-0">
                <label className="flex items-center text-[11px] text-gray-400 cursor-pointer hover:text-gray-600 transition-colors">
                  <input type="checkbox" className="rounded border-gray-300 text-[#F2A65A] focus:ring-[#F2A65A] mr-2" />
                  Remember Access
                </label>
                <a href="#" className="text-[11px] font-semibold text-[#6F8F72] hover:text-[#F2A65A] transition-colors">
                  Forgot Credentials?
                </a>
              </div>

              {/* Submit Button */}
              <div className="pt-6 flex justify-center animate-[slideUpFade_0.6s_ease-out_0.6s_forwards] opacity-0">
                <button 
                  type="submit"
                  className="w-full py-4 bg-[#F2A65A] text-white font-bold rounded-xl shadow-lg shadow-[#F2A65A]/20 uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] active:w-[98%]"
                >
                  Enter Portal
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </form>

            {/* Footer Text */}
            <div className="mt-12 text-center animate-[slideUpFade_0.6s_ease-out_0.6s_forwards] opacity-0">
              <p className="text-[9px] text-gray-300 font-medium uppercase tracking-widest">
                Part of the Secure Campus Network
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Status Text */}
        <div className="mt-10 text-center animate-[slideUpFade_0.6s_ease-out_0.6s_forwards] opacity-0">
          <p className="text-[10px] text-[#6F8F72]/60 font-medium uppercase tracking-[0.2em]">
            Authorized Student Access Only
          </p>
          <div className="mt-4 flex justify-center gap-4 opacity-30">
            <div className="w-1 h-1 rounded-full bg-[#6F8F72]"></div>
            <div className="w-1 h-1 rounded-full bg-[#6F8F72]"></div>
            <div className="w-1 h-1 rounded-full bg-[#6F8F72]"></div>
          </div>
        </div>

      </main>

      {/* Terminal Text (Bottom Right) */}
      <div className="fixed bottom-8 right-8 opacity-40 hidden lg:block select-none pointer-events-none">
        <div className="text-[9px] text-[#6F8F72] font-mono leading-relaxed text-right">
          PROTOCOL: ION_SECURE_v4<br/>
          ENCRYPTION: ACTIVE_256<br/>
          STATION: GATEWAY_ALPHA<br/>
          AUTH_MODE: STUDENT_SINGLE
        </div>
      </div>
      
    </div>
  );
}

export default StudentLogin;

function NavigateHelper() {
  // small internal helper to get navigate without changing UI
  const navigate = useNavigate();
  return null;
}