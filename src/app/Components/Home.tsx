"use client"
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { IoRocketOutline, IoLayersOutline, IoCodeSlashOutline, IoBarChartOutline } from 'react-icons/io5';
import img1 from "../../../public/images/home/1.jpg";
import img2 from "../../../public/images/home/2.jpg";
import img3 from "../../../public/images/home/3.jpg";
import img4 from "../../../public/images/home/4.jpg";
// import Certificatesscroll from './Certificatesscroll';

const features = [
  {
    icon: IoRocketOutline,
    title: "Educational Equipment",
    description: "Cutting-edge laboratory equipment for engineering colleges, polytechnics, and industrial training institutes. Empowering the next generation of innovators.",
    bgGradient: "from-blue-100 to-cyan-100"
  },
  {
    icon: IoLayersOutline,
    title: "Testing & Measurement Equipment",
    description: "Professional-grade testing and measurement instruments for precise analysis, including oscilloscopes, multimeters, electronic workbenches, and signal generators.",
    bgGradient: "from-purple-100 to-pink-100"
  },
  {
    icon: IoCodeSlashOutline,
    title: "Web Design & Development",
    description: "Custom website creation, e-commerce solutions, and mobile-responsive designs that convert visitors into customers.",
    bgGradient: "from-emerald-100 to-teal-100"
  },
  {
    icon: IoBarChartOutline,
    title: "Digital Marketing & SEO",
    description: "Comprehensive digital marketing strategies, including social media management, SEO optimization, and targeted advertising campaigns.",
    bgGradient: "from-orange-100 to-red-100"
  }
];

const sliderData = [
  {
    url: img1.src,
    alt: "Educational Equipment",
    description: "State-of-the-art educational equipment for modern learning environments. Empowering students with hands-on experience."
  },
  {
    url: img2.src,
    alt: "Testing & Measuring Equipment",
    description: "Precision testing and measuring equipment for accurate results. Industry-standard tools for professional applications."
  },
  {
    url: img3.src,
    alt: "Software Solutions",
    description: "Innovative software solutions to streamline your operations. Custom development for your unique needs."
  },
  {
    url: img4.src,
    alt: "Digital Marketing & SEO",
    description: "Comprehensive digital marketing strategies and SEO services to boost your online presence and drive business growth."
  }
];

const serviceDetails = [
  {
    title: "Educational and Testing Equipment",
    description: "Our range includes advanced testing equipment for educational institutions, featuring digital measurement tools, electronic testing stations, and comprehensive power analysis systems.",
    features: ["Educational Testing Tools", "Measurement Equipment", "Power Analysis Systems"],
    link: "/services/electronics-manufacturing",
    media: {
      type: "video",
      src: "/videos/home/service/2.gif",
    }
  },
  {
    title: "Digital Solutions",
    description: "Comprehensive digital services including web design, marketing strategies, and SEO optimization to boost your online presence.",
    features: ["Custom Website Development", "Social Media Marketing", "SEO Services"],
    link: "/services/it-services",
    media: {
      type: "video",
      src: "/videos/home/service/1.gif",
    }
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <section className="relative py-6 sm:py-6 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-[1800px] mx-auto">
          <div className="relative w-full h-[300px] sm:h-[600px] mb-4 sm:mb-8 rounded-xl sm:rounded-3xl overflow-hidden shadow-lg border border-gray-200">
            <button
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? sliderData.length - 1 : prev - 1))}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 p-2 sm:p-4 rounded-full transition-all duration-300 backdrop-blur-sm group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-6 sm:h-6 group-hover:-translate-x-1 transition-transform duration-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1))}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-6 sm:h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

            {sliderData.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  currentSlide === index ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={slide.url}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  unoptimized
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 text-white">
                    {slide.alt}
                  </h2>
                  <p className="text-sm sm:text-lg md:text-xl text-white max-w-3xl leading-relaxed">
                    {slide.description}
                  </p>
                </div>
              </div>
            ))}

            <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3">
              {sliderData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1 sm:h-1.5 rounded-full transition-all duration-500 ${
                    currentSlide === index ? 'w-4 sm:w-8 bg-gray-800' : 'w-2 sm:w-4 bg-gray-400 hover:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* <Certificatesscroll/> */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We combine innovation with expertise to deliver exceptional results that exceed expectations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl shadow-lg border border-gray-200 bg-white hover:scale-105 transition-all duration-500"
              >
                <div className={`bg-gradient-to-br ${feature.bgGradient} p-3 rounded-xl mb-4 inline-block`}>
                  <feature.icon className="w-10 h-10 text-gray-800" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Our Services
            </h2>
            <p className="text-black max-w-2xl mx-auto">
              Comprehensive solutions for educational institutions and businesses
            </p>
          </div>

          {serviceDetails.map((service, index) => (
            <div
              key={index}
              className="mb-12 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-gray-100 to-white rounded-2xl p-1 border border-gray-200">
                <div className="bg-white rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
                  <div className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
                    {/* Content Section */}
                    <div className={index % 2 === 1 ? 'md:col-start-2' : ''}>
                      <h3 className="text-2xl font-bold text-black mb-4">
                        {service.title}
                      </h3>
                      <p className="text-black mb-6 text-lg">
                        {service.description}
                      </p>
                      <div className="space-y-4">
                        {service.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="bg-gray-100 rounded-lg p-3 transition-transform duration-300 hover:translate-x-2"
                          >
                            <span className="text-black font-medium">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                      <Link
                        href={service.link}
                        className="inline-flex items-center mt-6 px-6 py-3 bg-black text-white rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                      >
                        Learn More
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>

                    {/* Image/Icon Section */}
                    <div className={`relative h-64 md:h-full ${index % 2 === 1 ? 'md:col-start-1' : ''}`}>
                      <div className="absolute inset-0 rounded-2xl overflow-hidden group">
                        <Image
                          src={service.media.src}
                          alt={service.title}
                          fill
                          className="w-full h-full object-cover"
                          priority
                          unoptimized
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
