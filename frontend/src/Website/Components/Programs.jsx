import { BookOpen, Cog, Palette, Volleyball } from "lucide-react";
import React from "react";

const Programs = () => {
  return (
    <>
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="mx-6 md:mx-20">
          <div className="text-center mb-8 md:mb-16">
            <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              Holistic Development
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-800 mb-2 md:mb-4">
              Popular Topics to Learn
            </h2>
            <p className="md:text-lg text-sm  text-gray-600 max-w-3xl mx-auto">
              Encouraging students to grow through sports, arts, and cultural
              programs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Academics",
                icon: <BookOpen className="text-white"/>,
                color: "from-blue-500 to-blue-600",
                description:
                  "Building strong intellectual foundations through a well-rounded curriculum that nurtures curiosity, critical thinking, and academic excellence.",
              },
              {
                title: "Sports & Fitness",
                icon: <Volleyball className="text-white"/>,
                color: "from-green-500 to-emerald-600",
                description:
                  "Promoting physical health, teamwork, and discipline through structured sports, games, and fitness programs for all-round development.",
              },
              {
                title: "Visual Arts",
                icon: <Palette className="text-white"/>,
                color: "from-pink-500 to-red-500",
                description:
                  "Encouraging self-expression and creativity through painting, sketching, crafts, and design to help students bring imagination to life.",
              },
              {
                title: "Performing Arts",
                icon: <Cog className='text-white'/>,
                color: "from-purple-500 to-indigo-600",
                description:
                  "Developing confidence and communication skills through dance, drama, music, and stage performances that celebrate talent and culture.",
              },
            ].map((category, index) => (
              <div
                key={category.title}
                className="group bg-white border border-gray-100 rounded-2xl py-4 px-3 md:p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {category.icon}
                </div>
                <h4 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {category.title}
                </h4>
                <p className="text-sm text-gray-500 mb-3">
                    {category.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Programs;
