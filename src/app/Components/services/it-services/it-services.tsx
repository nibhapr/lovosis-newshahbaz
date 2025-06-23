"use client";

import {
  IoCodeSlash,
  IoMegaphone,
  IoDesktop,
  IoAnalytics,
  IoCloudDone,
  IoColorPalette,
  IoSettings,
  IoLogoWordpress
} from "react-icons/io5";
import { SiShopify } from "react-icons/si";
import { useState } from "react";

const services = [
  {
    title: "Software Development",
    description: "Full-stack software development for custom applications, with focus on user-friendly interfaces and seamless cross-platform functionality.",
    icon: IoCodeSlash,
    features: [
      "Enterprise solutions development",
      "Mobile app development",
      "Embedded systems",
      "Cross-platform applications"
    ]
  },
  {
    title: "Digital Marketing",
    description: "Comprehensive digital marketing services to boost your brand's online presence and drive growth.",
    icon: IoMegaphone,
    features: [
      "Social media management",
      "Content creation",
      "Paid advertising campaigns",
      "Email marketing strategies"
    ]
  },
  {
    title: "Website Design & Development",
    description: "Creating responsive and intuitive websites that establish a strong online presence for your business.",
    icon: IoDesktop,
    features: [
      "Responsive website design",
      "E-commerce solutions",
      "CMS-based websites",
      "Custom web development"
    ]
  },
  {
    title: "SEO Analysis & Optimization",
    description: "Data-driven SEO strategies to improve your website's visibility and organic search rankings.",
    icon: IoAnalytics,
    features: [
      "Keyword research & analysis",
      "On-page optimization",
      "Technical SEO audits",
      "Performance tracking"
    ]
  },
  {
    title: "IT Consulting",
    description: "Strategic IT consulting to help businesses leverage technology for growth and efficiency.",
    icon: IoSettings,
    features: [
      "Technology assessment",
      "Digital transformation",
      "IT strategy planning",
      "System architecture design"
    ]
  },
  {
    title: "WordPress & Shopify",
    description: "Expert development and customization of WordPress and Shopify platforms for your business needs.",
    icon: ({ className }: { className: string }) => (
      <div className="flex gap-2">
        <IoLogoWordpress className={className} />
        <SiShopify className={className} />
      </div>
    ),
    features: [
      "WordPress theme development",
      "Shopify store setup",
      "Plugin customization",
      "E-commerce optimization"
    ]
  },
  {
    title: "Cloud Solutions",
    description: "Comprehensive cloud computing services to help businesses scale and modernize their infrastructure.",
    icon: IoCloudDone,
    features: [
      "Cloud migration",
      "Cloud infrastructure setup",
      "Serverless architecture",
      "Cloud security implementation"
    ]
  },
  {
    title: "Design & Creative Services",
    description: "Creating intuitive user experiences and professional visual designs through modern principles, user research and creative expertise.",
    icon: IoColorPalette,
    features: [
      "User interface & experience design",
      "Brand identity & visual design",
      "Wireframing & prototyping",
      "Print & digital media creation",
      "Marketing collateral",
      "Usability testing"
    ]
  }
];

const portfolioCategories = ["All", "Web Development", "Software Development", "Digital Marketing", "SEO"];

const portfolioProjects = [
  {
    title: "Chenarabia",
    category: "Web Development",
    image: "/images/services/portfolio/chenarabia.jpg",
    description: "A full-stack e-commerce solution with advanced features",
    url: "https://chenarabia.com"
  },
  {
    title: "Nexmedia App",
    category: "Software Development",
    image: "/images/services/portfolio/andriod-ios.jpg",
    description: "Secure and user-friendly social media application",
    url: "https://nexmedia.live"
  },
  {
    title: "Digital Marketing Campaign",
    category: "Digital Marketing",
    image: "/images/services/portfolio/marketing.jpg",
    description: "Successful marketing campaign for a major retail brand",
    url: "https://hikvision-dubai.ae/"
  },
  {
    title: "SEO Optimization Project",
    category: "SEO",
    image: "/images/services/portfolio/seo.jpg",
    description: "Improved search rankings and organic traffic by 200%",
    url: "https://uniview-uae.ae/"
  }
];

export default function ITServices() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = portfolioProjects.filter(project =>
    selectedCategory === "All" ? true : project.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
            IT Services
          </h1>
          <p className="text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed">
            Empowering your business with cutting-edge technology solutions and expert IT services
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200"
              >
                <div className="flex flex-col items-center text-center gap-3 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-lg font-bold text-black">
                    {service.title}
                  </h3>
                </div>

                <p className="text-gray-800 mb-4 text-sm leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center gap-2 text-gray-800 hover:text-black transition-colors duration-200 text-sm"
                    >
                      <svg
                        className="w-4 h-4 text-black flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Our Portfolio
            </h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto mb-8">
              Explore some of our recent projects and success stories
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {portfolioCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                    ${selectedCategory === category
                      ? 'bg-black text-white'
                      : 'bg-white text-gray-800 hover:bg-gray-200'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProjects.map((project, index) => (
              <a
                key={index}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-w-16 aspect-h-12 w-full">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <span className="text-sm text-white font-medium mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.description}
                  </p>
                  <span className="text-white text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                    Visit Website
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
