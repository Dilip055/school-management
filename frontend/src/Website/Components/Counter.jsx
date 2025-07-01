
import {  BookOpen, Building2, ComputerIcon, User, User2Icon } from 'lucide-react';
import React from 'react';
import AnimatedCounter from './AnimatedCounter';

const Counter = () => {
    const counters = [
        { icon: <User />, count: 500, label: "Students", color: "from-blue-500 to-blue-600" },
        { icon: <User2Icon />, count: 20, label: "Teachers", color: "from-green-500 to-green-600" },
        { icon: <Building2 />, count: 20, label: "Classrooms", color: "from-purple-500 to-purple-600" },
        { icon: <ComputerIcon />, count: 4, label: "Labs", color: "from-pink-500 to-pink-600" }
    ];

    return (
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
    <div className="container mx-auto px-4">
        <div className='text-center'>
        <div className="inline-flex items-center text-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
        <BookOpen className='w-4'/>Milestones We've Reached
        </div>
        </div>
   
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-center mb-2 md:mb-4">Our Achievements</h2>
        <p className="md:text-lg text-sm  text-center mb-8 max-w-2xl mx-auto">
            We take pride in our accomplishments that reflect our commitment to excellence in education. 
            
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mt-16">
            {counters.map((counter, index) => (
                <div key={index} className="flex flex-col items-center transition-transform transform hover:scale-105">
                    <div className={`flex items-center justify-center w-16 h-16 bg-gradient-to-r ${counter.color} rounded-full mb-4 shadow-lg`}>
                        {counter.icon}
                    </div>
                    <div className="text-2xl lg:text-3xl font-bold mb-2">
              <AnimatedCounter count={counter.count} />+
            </div>
                    <div className="text-sm opacity-90">{counter.label}</div>
                </div>
            ))}
        </div>
    </div>
</section>
    );
};

export default Counter;
