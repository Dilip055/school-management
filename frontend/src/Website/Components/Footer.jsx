import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import logo from '../../assets/logo.png'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-purple-600 text-white pt-12 md:pt-16 pb-4 md:pb-8">
      <div className="px-4 sm:px-8 lg:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
         
          <div className="sm:col-span-2 lg:col-span-1">
            <img src={logo} className="w-22 sm:w-25 mb-3" alt="School Logo" />
            <p className="text-sm sm:text-base leading-relaxed">
              We believe education is not just about academics — it's about nurturing
              confident, creative, and compassionate individuals.
            </p>
          </div>

       
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 md:mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li className="hover:text-orange-300 cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-orange-300 cursor-pointer transition-colors">Our Gallery</li>
              <li className="hover:text-orange-300 cursor-pointer transition-colors">FAQ</li>
              <li className="hover:text-orange-300 cursor-pointer transition-colors">Contact Us</li>
            </ul>
          </div>

        
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 md:mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 hover:text-orange-300 transition-colors">
                <Phone className="text-orange-400 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span>+91-7894561231</span>
              </li>
              <li className="flex items-center gap-2 hover:text-orange-300 transition-colors break-all sm:break-normal">
                <Mail className="text-orange-400 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span>infoapollointernational@gmail.com</span>
              </li>
              <li className="flex items-start gap-2 hover:text-orange-300 transition-colors">
                <MapPin className="text-orange-400 w-4 h-4 sm:w-5 sm:h-5 mt-1 flex-shrink-0" />
                <span>
                  Loyola Hall, Naranpura,<br />
                  Ahmedabad, Gujarat 380013.
                </span>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 md:mb-4">Find Us on Map</h3>
            <div className="w-full h-40 sm:h-44 rounded-xl overflow-hidden shadow-lg">
              <iframe
                title="School Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.181043907259!2d72.834657!3d19.1368466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b65f95b1e0ab%3A0x9f5e3f786a6b5c1e!2sYour%20School%20Name!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
        
    
        <div className="mt-8 md:mt-12 pt-6 border-t border-white/20 text-center text-xs sm:text-sm text-gray-300">
          &copy; {new Date().getFullYear()} Apollo International School. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;