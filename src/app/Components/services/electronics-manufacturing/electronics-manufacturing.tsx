"use client";

import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { PiStudentBold, PiRulerBold } from "react-icons/pi";
import { MdOutlineMemory, MdOutlinePrecisionManufacturing } from "react-icons/md";
import { TbTestPipe } from "react-icons/tb";
import { BsBox } from "react-icons/bs";
import Link from "next/link";

const services = [
  {
    title: "Educational Equipment Manufacturing",
    description: "Production of high-quality educational tools and devices for enhanced learning experiences.",
    icon: PiStudentBold,
    benefits: [
      "Interactive learning solutions",
      "Durable educational tools",
      "Customizable designs",
      "Solutions for all education levels"
    ]
  },
  {
    title: "Testing & Measuring Instruments",
    description: "Development of precision testing and measuring tools for various applications.",
    icon: PiRulerBold,
    benefits: [
      "High-precision instruments",
      "Electrical testing tools",
      "Mechanical measurement devices",
      "Physical property analyzers"
    ]
  },
  {
    title: "Surface Mount Technology (SMT)",
    description: "State-of-the-art SMT assembly with high-precision component placement.",
    icon: MdOutlineMemory,
    benefits: [
      "High-density board assembly",
      "Automated optical inspection",
      "Lead-free soldering options",
      "Multi-layer PCB capability"
    ]
  },
  {
    title: "Through-hole Assembly",
    description: "Traditional through-hole assembly for specialized electronic components.",
    icon: MdOutlinePrecisionManufacturing,
    benefits: [
      "Manual and automated assembly",
      "Mixed technology boards",
      "Custom component fitting",
      "High reliability connections"
    ]
  },
  {
    title: "Testing & Quality Assurance",
    description: "Comprehensive testing and quality control procedures.",
    icon: TbTestPipe,
    benefits: [
      "Functional testing",
      "Environmental stress screening",
      "X-ray inspection",
      "Thermal testing"
    ]
  },
  {
    title: "Custom Enclosures",
    description: "Specialized enclosure design and manufacturing for electronic equipment.",
    icon: BsBox,
    benefits: [
      "Custom design solutions",
      "Protection for sensitive equipment",
      "Various material options",
      "Environmental protection"
    ]
  }
];

export default function ElectronicsManufacturing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
            Electronics Manufacturing Services
          </h1>
          <p className="text-xl text-black max-w-3xl mx-auto leading-relaxed">
            Cutting-edge electronics manufacturing solutions with precision engineering and quality assurance
          </p>
        </div>
      </section>

      {/* Detailed Services Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">Our Manufacturing Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
              >
                <div className="flex items-center mb-4">
                  <service.icon size={24} className="text-black mr-3 flex-shrink-0" />
                  <h3 className="text-xl font-semibold text-black">{service.title}</h3>
                </div>
                <p className="text-black mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center text-black">
                      <IoCheckmarkCircleOutline className="w-5 h-5 text-black mr-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-black mb-6">
            Ready to Start Your Manufacturing Project?
          </h2>
          <p className="text-xl text-black mb-8">
            Contact us today to discuss your electronics manufacturing needs
          </p>
          <Link href="/contact">
            <button className="px-8 py-4 bg-black text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
              Get in Touch
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
