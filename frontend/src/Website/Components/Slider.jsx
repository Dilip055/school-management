import { ChevronLeft, ChevronRight, GraduationCap, Award, BookOpen, MapPin, User2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        {
            image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            title: "Excellence in Education",
            subtitle: "Shaping Tomorrow's Leaders Today",
            description: "Join our prestigious institution where academic excellence meets character development. Experience world-class education with personalized attention.",
            stats: { students: "5000+", teachers: "200+", years: "25+" }
        },
        {
            image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
            title: "Modern Learning Environment",
            subtitle: "State-of-the-Art Facilities",
            description: "Experience learning in our cutting-edge classrooms, advanced laboratories, and digital libraries designed for 21st-century education.",
            stats: { labs: "50+", library: "100K+", campus: "25 Acres" }
        },
        {
            image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            title: "Holistic Development",
            subtitle: "Beyond Academics",
            description: "Sports, arts, and extracurricular activities for complete personality development. Building confident, creative, and capable individuals.",
            stats: { clubs: "30+", sports: "15+", awards: "500+" }
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <>
     
            <section id="home" className="relative h-screen min-h-[500px] max-h-[800px] overflow-hidden">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-1000 transform ${
                            index === currentSlide 
                                ? 'opacity-100 scale-100' 
                                : 'opacity-0 scale-105'
                        }`}
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat transform transition-transform duration-1000 hover:scale-105"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-blue-800/30 to-purple-900/70"></div>
                        </div>
                        
                        <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4 sm:px-6 lg:px-8">
                            <div className="max-w-7xl mx-auto w-full">
                                <div className="mb-6 sm:mb-8 lg:mb-12">
                                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-lg rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6 animate-fadeInUp">
                                        <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-amber-400" />
                                        <span className="text-xs sm:text-sm font-medium">Welcome To Apollo International</span>
                                    </div>
                                    
                                    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold mb-2 sm:mb-3 lg:mb-4 leading-tight animate-fadeInUp delay-100">
                                        <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                                            {slide.title}
                                        </span>
                                    </h1>
                                    
                                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light mb-3 sm:mb-4 lg:mb-6 text-blue-100 animate-fadeInUp delay-200">
                                        {slide.subtitle}
                                    </h2>
                                    
                                    <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 lg:mb-10 animate-fadeInUp delay-300 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto leading-relaxed text-gray-200 px-2">
                                        {slide.description}
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-fadeInUp delay-500">
                                    <button className="w-full sm:w-auto group bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 rounded-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:from-amber-400 hover:to-orange-500">
                                        <span className="flex items-center justify-center gap-2">
                                            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                                            <span className="text-sm sm:text-base">Explore More</span>
                                        </span>
                                    </button>
                                    <button className="w-full sm:w-auto group border-2 border-white text-white px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300 backdrop-blur-sm">
                                        <span className="flex items-center justify-center gap-2">
                                            <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                                            <span className="text-sm sm:text-base">Contact Now</span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                
    
                <button
                    onClick={prevSlide}
                    className="absolute left-2 sm:left-4 lg:left-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
                >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-2 sm:right-4 lg:right-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
                >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                </button>

    
                <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                                index === currentSlide 
                                    ? 'bg-white scale-125' 
                                    : 'bg-white/50 hover:bg-white/70'
                            }`}
                        />
                    ))}
                </div>
            </section>

     
            <section className="relative bg-gradient-to-b from-gray-50 to-white">
                <div className=" ">
                    <div className="bg-white shadow-2xl  p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-16 sm:-translate-y-24 lg:-translate-y-32 translate-x-16 sm:translate-x-24 lg:translate-x-32 opacity-50"></div>
                        
                        <div className="relative z-10">
                            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                                <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                                    <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                                    Best Programs
                                </span>
                                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-gray-800 mb-3 sm:mb-4 leading-tight">
                                    Our Key Features
                                </h2>
                                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed">
                                    Discover what makes our school the perfect choice for your educational journey
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                                {[
                                    {
                                        icon: <GraduationCap className='text-white'/>,
                                        title: "Scholarship Programs",
                                        description: "Merit-based scholarships and financial aid programs to support deserving students in their academic journey.",
                                        color: "from-blue-500 to-blue-600",
                                        bgColor: "bg-blue-50",
                                        textColor: "text-blue-800"
                                    },
                                    {
                                        icon: <User2 className='text-white'/>,
                                        title: "Expert Faculty",
                                        description: "Learn from experts and renowned academicians with years of experience in their respective fields.",
                                        color: "from-purple-500 to-purple-600",
                                        bgColor: "bg-purple-50",
                                        textColor: "text-purple-800"
                                    },
                                    {
                                        icon: <BookOpen className='text-white'/>,
                                        title: "Diverse Programs",
                                        description: "Comprehensive range of courses programs across multiple disciplines.",
                                        color: "from-green-500 to-green-600",
                                        bgColor: "bg-green-50",
                                        textColor: "text-green-800"
                                    }
                                ].map((feature, index) => (
                                    <div
                                        key={index}
                                        className={`group ${feature.bgColor} border border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer`}
                                    >
                                        <div className="flex flex-col sm:flex-row items-center md:items-start gap-4 sm:gap-6">
                                            <div className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${feature.color} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                                <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8">
                                                    {feature.icon}
                                                </div>
                                            </div>
                                            <div className="flex-1 text-center sm:text-left">
                                                <h4 className={`text-lg sm:text-xl font-bold mb-2 sm:mb-3 ${feature.textColor} group-hover:text-opacity-80 transition-colors duration-300`}>
                                                    {feature.title}
                                                </h4>
                                                <p className="text-gray-600 text-sm sm:text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

         
        </>
    );
};

export default Slider;