import { BookOpen, CheckCircle } from "lucide-react";
import React from "react";

const Academic = () => {
  const programs = [
    {
      title: "Primary Education",
      grades: "PlayGroup – Grade 5",
      description:
        "Building a strong academic and emotional foundation through interactive and inclusive learning experiences.",
      features: [
        "Play-based, experiential learning",
        "Introduction to STEAM and nature studies",
        "Character building and values education",
      ],
    },
    {
      title: "Middle School",
      grades: "Grades 6 – 8",
      description:
        "Developing academic skills, independence, and curiosity through a broad and engaging curriculum.",
      features: [
        "Exploratory subject tracks",
        "Leadership & life-skills workshops",
        "Project-based learning and teamwork",
      ],
    },
    {
      title: "High School",
      grades: "Grades 9 – 12",
      description:
        "Encouraging deep learning, creativity, and self-discipline to prepare students for responsible adulthood.",
      features: [
        "Elective subjects and interdisciplinary projects",
        "Career awareness and mentoring",
        "Research, innovation, and personal development",
      ],
    },
  ];

  return (
    <>
      <section id="programs" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
              Academic Excellence
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-gray-800 mb-3 sm:mb-4 leading-tight">
              Academic Programs
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed">
              Comprehensive educational programs designed to nurture students at
              every stage of their development
            </p>
          </div>

         
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {programs.map((program, index) => (
              <div
                key={index}
                className="group bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
               
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold mb-3 sm:mb-4 inline-block">
                  {program.grades}
                </div>
                
            
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {program.title}
                </h3>
                
             
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  {program.description}
                </p>
                
             
                <ul className="space-y-2 sm:space-y-3">
                  {program.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 sm:gap-3">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Academic;