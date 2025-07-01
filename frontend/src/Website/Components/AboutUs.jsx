import React from 'react'
import { Users, Award, BookOpen, GraduationCap, ChevronRight } from 'lucide-react'

const AboutUs = () => {
  return (
    <>
      <section className="lg:px-20 py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
     
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 bg-blue-100 rounded-full -translate-x-24 sm:-translate-x-32 lg:-translate-x-36 -translate-y-24 sm:-translate-y-32 lg:-translate-y-36 opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-purple-100 rounded-full translate-x-32 sm:translate-x-40 lg:translate-x-48 translate-y-32 sm:translate-y-40 lg:translate-y-48 opacity-20"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
            
        
            <div className="relative flex-1 max-w-xl lg:max-w-2xl w-full">
              <div className="relative w-full max-w-md sm:max-w-lg mx-auto lg:mx-0">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl sm:rounded-3xl transform rotate-2 sm:rotate-3 opacity-20"></div>
                <div className="relative bg-white p-2 sm:p-3 rounded-2xl sm:rounded-3xl shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Students in classroom"
                    className="w-full h-64 sm:h-72 lg:h-80 object-cover rounded-xl sm:rounded-2xl"
                  />
                </div>
              </div>
              
      
              <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 w-32 h-20 sm:w-40 sm:h-24 lg:w-48 lg:h-32 hidden md:block">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl sm:rounded-2xl transform -rotate-2 sm:-rotate-3 opacity-20"></div>
                <div className="relative bg-white p-1.5 sm:p-2 rounded-xl sm:rounded-2xl shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                    alt="Modern classroom"
                    className="w-full h-16 sm:h-20 lg:h-28 object-cover rounded-lg sm:rounded-xl"
                  />
                </div>
              </div>
     
              <div className="absolute -top-3 sm:-top-4 -left-3 sm:-left-4 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg border border-gray-100">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">5+</div>
                    <div className="text-xs sm:text-sm text-gray-500">Years Excellence</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-1/2 -right-6 sm:-right-8 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg border border-gray-100 hidden sm:block">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">500+</div>
                    <div className="text-xs sm:text-sm text-gray-500">Happy Students</div>
                  </div>
                </div>
              </div>
            </div>

    
            <div className="flex-1 max-w-xl lg:max-w-2xl w-full text-center lg:text-left">
              <div className="mb-6 sm:mb-8">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                  <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                  About Apollo International
                </div>
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-4 sm:mb-6 leading-tight">
                  The Place Where You Can{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 relative">
                    Achieve Excellence
                    <span className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></span>
                  </span>
                </h2>
                
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0">
                  For over 5 years, Apollo International school has been nurturing young minds and shaping future leaders. 
                  We believe in providing holistic education that combines academic excellence with character development, 
                  preparing students for success in an ever-evolving world.
                </p>
              </div>

  
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
                {[
                  { number: '98%', label: 'Success Rate', icon: Award },
                  { number: '20+', label: 'Expert Faculty', icon: Users },
                  { number: '10+', label: 'Programs', icon: BookOpen }
                ].map((stat, index) => (
                  <div key={index} className="text-center p-2 sm:p-3 md:p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                    <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600 mx-auto mb-1 sm:mb-2" />
                    <div className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-gray-800">{stat.number}</div>
                    <div className="text-xs sm:text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>

        
              <div className="flex justify-center lg:justify-start">
                <button className="group bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                  <span className="text-sm sm:text-base">Learn More</span>
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutUs