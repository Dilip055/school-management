import { Mail, Phone, LogIn, UserPlus, Sparkles } from 'lucide-react'
import instagram from '../../assets/social-icons/instagram.png'
import youtube from '../../assets/social-icons/video.png'
import linkedIn from '../../assets/social-icons/linkedin.png'
import facebook from '../../assets/social-icons/facebook.png'
import React from 'react'
import Marquee from "react-fast-marquee";
import { Link, NavLink } from 'react-router'

const Topbar = () => {
  return (
    <>
      

      <div className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white text-sm py-2 px-6 shadow-lg">
        <div className="max-w-8xl mx-10 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
        <div className="flex flex-col md:flex-row items-center  md:items-start gap-2 md:gap-6">
        <div className="flex items-center justify-center md:justify-start gap-2 group cursor-pointer">

                <Phone className="w-4 h-4 text-yellow-400" />
              <a href='tel:7894561231' className='text-white text-decoration-none'>
              <span className="group-hover:text-amber-200 transition-colors duration-300">
                 <span className="font-semibold">Call Us: +91-7894561231</span>
              </span>
              </a>
            </div>
            
            <div className="flex items-center gap-2 group cursor-pointer">
                <Mail className="w-4 h-4 text-yellow-400" />
            <a href='mailto:infoapollointernational@gmail.com' className='text-white text-decoration-none'>
              <span className="group-hover:text-amber-200 transition-colors duration-300">
                <span className="font-semibold">infoapollointernational@gmail.com</span>
              </span>
              </a>
            </div>
          </div>


          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <a 
                href="#" 
                className="relative group"
                title="Follow us on Instagram"
              >
                <div className=" flex items-center justify-center transition-all duration-300 transform group-hover:scale-110">
                  <img src={instagram} className="w-7 h-7" alt="Instagram" />
                </div>
              </a>
              
              <a 
                href="#" 
                className="relative group"
                title="Subscribe to our YouTube"
              >
                <div className="flex items-center justify-center  transition-all duration-300 transform group-hover:scale-110">
                  <img src={youtube} className="w-7 h-7" alt="YouTube" />
                </div>
              </a>
              
              <a 
                href="#" 
                className="relative group"
                title="Connect on LinkedIn"
              >
                <div className="flex items-center justify-center  transition-all duration-300 transform group-hover:scale-110">
                  <img src={linkedIn} className="w-7 h-7" alt="LinkedIn" />
                </div>
              </a>
              
              <a 
                href="#" 
                className="relative group"
                title="Like us on Facebook"
              >
                <div className=" flex items-center justify-center transition-all duration-300 transform group-hover:scale-110">
                  <img src={facebook} className="w-7 h-7" alt="Facebook" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Topbar
