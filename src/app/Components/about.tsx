"use client";

import { IoCodeSlashOutline, IoBarChartOutline, IoLayersOutline, IoRocketOutline } from 'react-icons/io5';
import Image from 'next/image';
import { useState } from 'react';

const About = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const services = [
    {
      icon: IoLayersOutline,
      title: "Educational Equipment",
      description: "Premium laboratory equipment for engineering colleges and technical schools, featuring digital oscilloscopes and electronic workbenches.",
      color: "from-black to-black"
    },
    {
      icon: IoBarChartOutline,
      title: "Testing & Measurement Equipment",
      description: "Professional-grade testing and measurement instruments for precise analysis, including oscilloscopes, multimeters, and signal generators.",
      color: "from-black to-black"
    },
    {
      icon: IoCodeSlashOutline,
      title: "Web Design & Development",
      description: "Custom website creation, e-commerce solutions, and mobile-responsive designs that convert visitors into customers.",
      color: "from-black to-black"
    },
    {
      icon: IoRocketOutline,
      title: "Digital Marketing & SEO",
      description: "Comprehensive digital marketing strategies, including social media management, SEO optimization, and targeted advertising campaigns.",
      color: "from-black to-black"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-black mb-8 leading-tight animate-fadeIn">
            Discover Lovosis Technology Private Limited
          </h1>
          <p className="text-2xl text-black max-w-4xl mx-auto leading-relaxed animate-fadeIn">
            Revolutionizing education and business through cutting-edge technology solutions and precision engineering
          </p>
          <div className="mt-12 mx-auto max-w-4xl animate-fadeIn">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full rounded-3xl shadow-xl"
            >
              <source src="/videos/about/hero.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          {/* Mission */}
          <div className="bg-white rounded-3xl p-12 shadow-xl hover:shadow-2xl transition-all duration-300 border border-black hover:scale-105">
            <h2 className="text-4xl font-bold text-black mb-8">
              Our Mission
            </h2>
            <p className="text-black text-lg leading-relaxed">
              To empower educational institutions and businesses with state-of-the-art technology solutions that drive innovation, enhance learning experiences, and accelerate digital transformation.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-3xl p-12 shadow-xl hover:shadow-2xl transition-all duration-300 border border-black hover:scale-105">
            <h2 className="text-4xl font-bold text-black mb-8">
              Our Vision
            </h2>
            <p className="text-black text-lg leading-relaxed">
              To become the premier provider of innovative educational equipment and digital solutions, revolutionizing the way institutions teach and businesses operate in the digital era.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 animate-fadeIn">
              Our Core Services
            </h2>
            <p className="text-black text-lg max-w-3xl mx-auto animate-fadeIn">
              We synergize innovation with expertise to deliver outstanding results across diverse domains
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
                className={`p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform border hover:scale-105 ${hoveredService === index
                  ? `border-transparent bg-gradient-to-br ${service.color}`
                  : 'border-black'
                  }`}
              >
                <service.icon className={`w-12 h-12 mb-4 transition-colors ${hoveredService === index ? 'text-white' : 'text-black'
                  }`} />
                <h3 className={`text-xl font-semibold mb-3 transition-colors ${hoveredService === index ? 'text-white' : 'text-black'
                  }`}>
                  {service.title}
                </h3>
                <p className={`text-base transition-colors ${hoveredService === index ? 'text-white' : 'text-black'
                  }`}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Equipment Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 animate-fadeIn">
              Educational Equipment Solutions
            </h2>
            <p className="text-black text-xl max-w-3xl mx-auto animate-fadeIn">
              High-quality equipment tailored for engineering colleges, polytechnics, and technical schools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-3xl shadow-xl overflow-hidden hover:scale-105 transition-all duration-300">
              <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                <Image
                  src="/images/about/equipment/oscilloscope.jpg"
                  alt="Digital Oscilloscope"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-black">Digital Oscilloscopes</h3>
              <p className="text-black text-lg">
                High-precision tools for visualizing waveforms and examining electrical circuits in real-time
              </p>
            </div>
            <div className="p-8 bg-white rounded-3xl shadow-xl overflow-hidden hover:scale-105 transition-all duration-300">
              <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                <Image
                  src="/images/about/equipment/electronic-workbench.jpg"
                  alt="Engineering Workbench"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-black">Engineering Workbenches</h3>
              <p className="text-black text-lg">
                State-of-the-art workbenches equipped with latest tools for electronic and electrical experiments, featuring built-in safety features and efficient testing capabilities
              </p>
            </div>
            <div className="p-8 bg-white rounded-3xl shadow-xl overflow-hidden hover:scale-105 transition-all duration-300">
              <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                <Image
                  src="/images/about/equipment/education-kit.jpg"
                  alt="Education and Training Kit"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-black">Education & Training Kits</h3>
              <p className="text-black text-lg">
                Comprehensive educational kits designed for hands-on learning in electronics and electrical engineering, featuring practical experiments and detailed training materials
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Solutions Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 animate-fadeIn">
              Comprehensive Digital Solutions
            </h2>
            <p className="text-black text-xl max-w-3xl mx-auto animate-fadeIn">
              Helping businesses thrive in the digital world with tailored solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white/90 backdrop-blur rounded-3xl shadow-xl overflow-hidden hover:scale-105 transition-all duration-300">
              <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                <Image
                  src="/images/about/digital/web-design.jpg"
                  alt="Web Design"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Web Design</h3>
              <p className="text-gray-700 text-lg">
                Custom, responsive websites that convert visitors into customers
              </p>
            </div>
            <div className="p-8 bg-white/90 backdrop-blur rounded-3xl shadow-xl overflow-hidden hover:scale-105 transition-all duration-300">
              <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                <Image
                  src="/images/about/digital/digital-marketing.jpg"
                  alt="Digital Marketing"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Digital Marketing</h3>
              <p className="text-gray-700 text-lg">
                Comprehensive strategies to boost visibility and conversions
              </p>
            </div>
            <div className="p-8 bg-white/90 backdrop-blur rounded-3xl shadow-xl overflow-hidden hover:scale-105 transition-all duration-300">
              <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                <Image
                  src="/images/about/digital/seo.jpg"
                  alt="SEO Services"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">SEO Services</h3>
              <p className="text-gray-700 text-lg">
                Proven techniques to improve search rankings and drive organic traffic
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent mb-12 animate-fadeIn">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-4 max-w-4xl mx-auto">
            {[
              // Equipment & Services
              {
                question: "What types of educational equipment do you offer?",
                answer: "We provide a wide range of equipment including digital oscilloscopes, electronic workbenches, and specialized laboratory instruments designed for engineering and technical education."
              },
              {
                question: "What testing and measurement equipment do you offer?",
                answer: "We offer professional-grade testing and measurement instruments including oscilloscopes, multimeters, electronic workbenches, and signal generators for precise analysis and testing needs."
              },
              {
                question: "Do you offer electronics manufacturing services?",
                answer: "Yes, we provide Surface Mount Technology (SMT) assembly, through-hole assembly, testing & quality assurance, and custom enclosure manufacturing services with high precision and quality standards."
              },
              {
                question: "Do you provide installation and training services?",
                answer: "Yes, we offer comprehensive installation services and hands-on training to ensure your team can effectively utilize all equipment and solutions we provide."
              },

              // Digital Services
              {
                question: "What digital services do you specialize in?",
                answer: "Our digital services include custom web development, e-commerce solutions, digital marketing strategies, and comprehensive SEO optimization to enhance your online presence."
              },
              {
                question: "What testing and measurement equipment do you offer?",
                answer: "We offer professional-grade testing and measurement instruments including oscilloscopes, multimeters, electronic workbenches, and signal generators for precise analysis and testing needs."
              },
              {
                question: "Do you offer electronics manufacturing services?",
                answer: "Yes, we provide Surface Mount Technology (SMT) assembly, through-hole assembly, testing & quality assurance, and custom enclosure manufacturing services with high precision and quality standards."
              },
              {
                question: "What web development services do you provide?",
                answer: "We offer custom website creation, responsive designs, e-commerce solutions, WordPress and Shopify development, and mobile-responsive designs that convert visitors into customers."
              },
              {
                question: "How can I contact your support team?",
                answer: "You can reach us through email at info@lovosis.in or lovosist@gmail.com, call us at +91 7012970281 or +91 9747745544, or visit our office in Bengaluru, Karnataka."
              },
              {
                question: "What areas of digital marketing do you cover?",
                answer: "Our digital marketing services include social media management, content creation, paid advertising campaigns, email marketing strategies, and comprehensive SEO optimization."
              },

              // Contact Information
              {
                question: "How can I contact your support team?",
                answer: "You can reach us through email at info@lovosis.in or lovosist@gmail.com, call us at +91 7012970281 or +91 9747745544, or visit our office in Bengaluru, Karnataka."
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="group"
              >
                <div
                  className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-500"
                  onClick={() => {
                    const element = document.getElementById(`faq-answer-${index}`);
                    const isHidden = element?.classList.contains('hidden');
                    if (isHidden) {
                      element?.classList.remove('hidden');
                      element?.classList.add('block');
                    } else {
                      element?.classList.remove('block');
                      element?.classList.add('hidden');
                    }
                  }}
                >
                  <div className="flex items-center justify-between cursor-pointer">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                      {faq.question}
                    </h3>
                    <span className="text-blue-700 group-hover:bg-blue-700 group-hover:text-white p-2 rounded-full transition-all duration-300">
                      <svg
                        className="w-6 h-6 transform group-hover:rotate-180 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </div>
                  <div
                    id={`faq-answer-${index}`}
                    className="mt-4 text-gray-700 hidden"
                  >
                    <p className="text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;