import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { 
  ChevronRight, 
  Home, 
  ArrowLeft, 
  Share2, 
  Copy,
  Check
} from 'lucide-react';

const Breadcrumb = ({ label, showBackButton = true, showShare = true }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    setIsVisible(true);
  }, []);


  const formatLabel = (value) => {
    return decodeURIComponent(value)
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  };

  
  return (
    <>


   
      <div className="relative overflow-hidden">
       
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
            <div className="absolute top-32 right-20 w-16 h-16 bg-white/5 rounded-full animate-bounce"></div>
            <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute bottom-10 right-1/3 w-8 h-8 bg-white/5 rounded-full animate-bounce delay-500"></div>
          </div>
         
        </div>

 
        <div className={`relative z-10 px-4 sm:px-6 lg:px-8 pt-4 pb-12 sm:py-16 lg:py-20 transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          
     
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            {showBackButton && pathnames.length > 0 && (
              <button
                onClick={() => window.history.back()}
                className="group flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 text-sm sm:text-base"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="hidden sm:inline">Back</span>
              </button>
            )}

         
          </div>


          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4 leading-tight">
              {label}
            </h1>
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full"></div>
          </div>


          <nav 
            className="flex justify-center"
            aria-label="Breadcrumb"
          >
            <div className="flex items-center space-x-1 sm:space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-2 sm:px-6 sm:py-3">
              
  
              <Link
                to="/"
                className="group flex items-center gap-1 sm:gap-2 text-white hover:text-white transition-all duration-300 text-sm sm:text-base font-medium text-decoration-none"
              >
                <Home className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                <span className=" sm:inline group-hover:underline">Home</span>
              </Link>

              {/* Dynamic Breadcrumb Items */}
              {pathnames.map((value, index) => {
                const to = '/' + pathnames.slice(0, index + 1).join('/');
                const isLast = index === pathnames.length - 1;
                const formattedLabel = formatLabel(value);

                return (
                  <div key={to} className="flex items-center space-x-1 sm:space-x-2">
            
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-white/60" />
                    
                    {isLast ? (
                      <span className="text-white/80 font-medium text-sm sm:text-base bg-white/10 px-2 py-1 rounded-md">
                        {formattedLabel}
                      </span>
                    ) : (
                      <Link
                        to={to}
                        className="text-white/90 hover:text-white transition-all duration-300 text-sm sm:text-base font-medium hover:underline hover:scale-105 transform px-2 py-1 rounded-md hover:bg-white/10"
                      >
                        {formattedLabel}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>

          
        </div>

       
      </div>

    </>
  );
};

export default Breadcrumb;