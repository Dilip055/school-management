import React from 'react'
import { BookOpen, Globe, Heart, Shield, Users } from 'lucide-react'

const Features = () => {
  const whyChooseUs = [
    {
      title: "Experienced Faculty",
      description: "Highly qualified and experienced teachers dedicated to student success",
      icon: Users,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Modern Infrastructure",
      description: "State-of-the-art facilities including smart classrooms and laboratories",
      icon: Globe,
      color: "from-green-500 to-green-600"
    },
    {
      title: "Holistic Development",
      description: "Focus on academic, physical, and emotional development of students",
      icon: Heart,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Individual Attention",
      description: "Small class sizes ensuring personalized attention to each student",
      icon: Shield,
      color: "from-pink-500 to-pink-600"
    }
  ];

  return (
    <>
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
              Why Choose Us
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-gray-800 mb-3 sm:mb-4 leading-tight">
              Why Choose Apollo International?
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed">
              Discover what makes us the preferred choice for parents and students seeking quality education
            </p>
          </div>

         
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {whyChooseUs.map((item, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center"
              >
               
                <div className={`bg-gradient-to-r ${item.color} w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <item.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                </div>
                
               
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {item.title}
                </h3>
                
               
                <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Features