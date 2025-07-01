import React from 'react'

const WhyChoose = () => {
  return (
    <>
     <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-4 md:mb-6">
              Why Choose EduAll Academy?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <AwardIcon/>,
                  title: 'Award-Winning',
                  description: 'Recognized for excellence in education and student outcomes'
                },
                {
                  icon: <PersonStanding />,
                  title: 'Personalized Learning',
                  description: 'Tailored approach to meet individual student needs and goals'
                },
                {
                  icon: <Rocket />,
                  title: 'Future-Ready',
                  description: 'Preparing students for tomorrow\'s challenges and opportunities'
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h4>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default WhyChoose