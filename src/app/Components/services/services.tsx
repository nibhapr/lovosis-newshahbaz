import React from 'react';
import Link from 'next/link';

interface Service {
  title: string;
  description: string;
  icon?: string;
  path?: string;
}

const services: Service[] = [
  {
    title: "IT Services",
    description: "Full-stack software development for custom applications, including enterprise solutions, mobile apps, and embedded systems. Focus on user-friendly interfaces and seamless functionality across platforms.",
    icon: "💻",
    path: "/services/it-services"
  },
  {
    title: "Electronics Manufacturing", 
    description: "Production of educational tools and devices aimed at enhancing learning experiences. Focus on interactive, durable, and customizable solutions for schools, universities, and training centers.",
    icon: "🔧",
    path: "/services/electronics-manufacturing"
  }
];

const ServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-24 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center relative mb-20">
          <div className="absolute inset-0 flex items-center justify-center -z-10">
            <div className="w-56 h-56 bg-gray-200 rounded-full filter blur-3xl opacity-40"></div>
            <div className="w-56 h-56 bg-gray-200 rounded-full filter blur-3xl opacity-40 -ml-12"></div>
          </div>
          <h2 className="text-6xl font-black text-black sm:text-7xl">
            Our Services
          </h2>
          <p className="mt-8 text-2xl text-black max-w-3xl mx-auto leading-relaxed font-light">
            Transforming ideas into reality through cutting-edge IT solutions and precision electronics manufacturing - where innovation meets excellence to revolutionize your business
          </p>
        </div>

        <div className="mt-28 grid grid-cols-1 gap-20 sm:grid-cols-2">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white backdrop-blur-xl rounded-3xl shadow-2xl p-14 hover:shadow-3xl transform hover:-translate-y-3 transition-all duration-500 border-2 border-gray-200"
            >
              <div className="text-7xl mb-10 bg-gray-100 w-32 h-32 rounded-3xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                {service.icon}
              </div>
              <h3 className="text-3xl font-bold text-black mb-6">
                {service.title}
              </h3>
              <p className="text-black leading-relaxed text-xl">
                {service.description}
              </p>
              <Link 
                href={service.path || '#'} 
                className="inline-block"
                prefetch={true}
                passHref
              >
                <div className="mt-10 px-8 py-4 bg-gray-800 text-white rounded-2xl font-bold shadow-md hover:shadow-xl hover:shadow-gray-500/10 flex items-center gap-3 text-lg transition-all duration-300 ease-in-out">
                  Learn More
                  <svg 
                    className="w-6 h-6 transition-transform duration-300 ease-in-out group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
