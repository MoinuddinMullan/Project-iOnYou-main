import React from 'react';

function Footer() {
  return (
    <footer className="bg-menu pt-16 pb-8 border-t border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <span className="material-symbols-outlined text-card text-4xl">school</span>
              <span className="text-2xl font-bold text-white">iOnYou</span>
            </div>
            <p className="text-white/80 max-w-sm mx-auto md:mx-0">
              Empowering universities with intelligent attendance solutions and campus analytics. Building the future of education technology.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-card mb-4 uppercase tracking-wider">Product</h4>
            <ul className="space-y-2 text-white/80">
              <li><a href="#" className="hover:text-accent transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-card mb-4 uppercase tracking-wider">Support</h4>
            <ul className="space-y-2 text-white/80">
              <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center text-white/60 text-sm">
          <p>© 2026 iOnYou Systems. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span className="material-symbols-outlined hover:text-accent cursor-pointer">public</span>
            <span className="material-symbols-outlined hover:text-accent cursor-pointer">code</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;