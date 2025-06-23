'use client'

import React from 'react';
import { useState } from 'react';
import { FaLaravel, FaNodeJs } from 'react-icons/fa';
import {
    IoMegaphoneOutline
} from 'react-icons/io5';
import { SiReact, SiShopify, SiNextdotjs, SiAstro, SiWordpress, SiDjango, SiGoogleanalytics, SiGooglemarketingplatform } from 'react-icons/si';

type JobPosition = {
    title: string;
    department: string;
    type: string;
    location: string;
    icon: () => React.JSX.Element;
    description: string;
    requirements: string[];
    responsibilities: string[];
};

const jobPositions: JobPosition[] = [
    {
        title: "Frontend Developer",
        department: "Engineering",
        type: "Full-time",
        location: "Bengaluru, Karnataka",
        icon: () => (
            <div className="flex items-center">
                <SiNextdotjs className="w-6 h-6 text-black mr-2" />
                <SiReact className="w-6 h-6 text-black mr-2" />
                <SiAstro className="w-6 h-6 text-black" />
            </div>
        ),
        description: "We're looking for a talented Frontend Developer to create exceptional user experiences using modern web technologies.",
        requirements: [
            "3+ years of experience with Next.js, React, and Astro frameworks",
            "Deep understanding of modern JavaScript and TypeScript",
            "Proficiency in building static and dynamic web applications",
            "Experience with component-based architecture",
            "Strong knowledge of modern CSS frameworks and design systems",
            "Familiarity with server-side rendering and static site generation",
            "Understanding of performance optimization techniques",
            "Knowledge of version control systems (Git)",
            "Experience with testing frameworks (Jest, Cypress, etc.)",
            "Understanding of web accessibility standards (WCAG)"
        ],
        responsibilities: [
            "Develop responsive and performant web applications using Next.js, React, and Astro",
            "Create reusable and modular component libraries",
            "Implement server-side rendering and static site generation strategies",
            "Optimize frontend performance and user experience",
            "Collaborate with backend developers and design teams",
            "Integrate frontend applications with various APIs and backend services",
            "Implement responsive design across multiple devices and browsers",
            "Conduct code reviews and mentor junior developers",
            "Write comprehensive unit and integration tests",
            "Maintain and improve existing codebase and infrastructure"
        ]
    },
    {
        title: "Backend Developer",
        department: "Engineering",
        type: "Full-time",
        location: "Bengaluru, Karnataka",
        icon: () => (
            <div className="flex items-center">
                <SiDjango className="w-6 h-6 text-black mr-2" />
                <FaNodeJs className="w-6 h-6 text-black mr-2" />
                <FaLaravel className="w-6 h-6 text-black" />
            </div>
        ),
        description: "Join our backend team to build robust and scalable server-side solutions using cutting-edge web frameworks.",
        requirements: [
            "3+ years of experience with Django, Node.js, and Laravel",
            "Strong proficiency in Python, JavaScript, and PHP",
            "Deep understanding of RESTful API design and implementation",
            "Experience with ORM and database management",
            "Knowledge of microservices and distributed system architecture",
            "Familiarity with GraphQL and advanced API techniques",
            "Understanding of cloud infrastructure and deployment strategies",
            "Experience with database optimization and performance tuning",
            "Knowledge of containerization technologies (Docker, Kubernetes)",
            "Experience with message brokers and queue systems (RabbitMQ, Kafka)"
        ],
        responsibilities: [
            "Design and develop scalable backend services using Django, Node.js, and Laravel",
            "Create and maintain RESTful and GraphQL API endpoints",
            "Implement robust authentication and authorization systems",
            "Optimize database queries and design efficient database schemas",
            "Develop microservices and distributed system architectures",
            "Ensure high performance, scalability, and security of backend systems",
            "Integrate backend services with frontend applications",
            "Write comprehensive documentation and technical specifications",
            "Monitor and troubleshoot production systems",
            "Implement CI/CD pipelines for automated deployments"
        ]
    },
    {
        title: "Shopify and WordPress Developer",
        department: "Engineering",
        type: "Full-time",
        location: "Bengaluru, Karnataka",
        icon: () => (
            <div className="flex items-center">
                <SiShopify className="w-6 h-6 text-black mr-2" />
                <SiWordpress className="w-6 h-6 text-black" />
            </div>
        ),
        description: "We're seeking an expert developer to create sophisticated e-commerce and content management solutions using Shopify and WordPress platforms.",
        requirements: [
            "3+ years of professional experience in Shopify theme development and WordPress ecosystem",
            "Advanced proficiency in creating custom themes and plugins for both platforms",
            "Expert-level knowledge of Liquid templating language for Shopify",
            "Strong PHP development skills for WordPress customization",
            "Deep understanding of WooCommerce e-commerce functionality",
            "Advanced front-end development skills (HTML5, CSS3, JavaScript, React)",
            "Experience with responsive design and cross-browser compatibility",
            "Familiarity with SEO optimization techniques for e-commerce and content websites",
            "Understanding of performance optimization for high-traffic websites",
            "Knowledge of version control systems (Git)",
            "Experience with headless CMS implementations",
            "Understanding of web security best practices"
        ],
        responsibilities: [
            "Design and develop custom Shopify themes with pixel-perfect responsiveness",
            "Create complex WordPress themes and plugins from scratch",
            "Implement advanced WooCommerce customizations and e-commerce solutions",
            "Optimize website performance and loading speeds for Shopify and WordPress sites",
            "Develop custom integrations between Shopify, WordPress, and third-party services",
            "Implement robust security measures for e-commerce and content management platforms",
            "Create custom page builders and block designs for enhanced user experience",
            "Troubleshoot and resolve complex technical issues in existing websites",
            "Provide technical documentation and knowledge transfer",
            "Collaborate with design and marketing teams to implement cutting-edge web solutions",
            "Implement analytics tracking and reporting systems",
        ]
    },
    {
        title: "SEO Specialist",
        department: "Marketing",
        type: "Full-time",
        location: "Bengaluru, Karnataka",
        icon: () => <SiGoogleanalytics className="w-6 h-6 text-black" />,
        description: "Drive our organic growth through effective SEO strategies.",
        requirements: [
            "3+ years of SEO experience with a strong grasp of strategies that boost organic traffic.",
            "Skilled in using SEO tools like Google Analytics and SEMrush for performance tracking.",
            "Expertise in optimizing content for both user engagement and search engine needs.",
            "Knowledge of link building strategies to enhance website authority and rankings.",
            "Experience with A/B testing and conversion rate optimization for better user engagement.",
            "Familiarity with HTML, CSS, and JavaScript for implementing SEO best practices.",
            "Ability to analyze data and provide insights for future SEO strategies.",
            "Experience with local and international SEO strategies for targeted market reach.",
            "Knowledge of structured data and schema markup to improve search visibility."
        ],
        responsibilities: [
            "Develop and implement SEO strategies aligned with marketing goals for online visibility.",
            "Conduct keyword research to find high-value search terms for targeted traffic.",
            "Optimize website content to be relevant, engaging, and search engine-friendly.",
            "Regularly monitor and analyze SEO performance, adjusting strategies as needed.",
            "Work closely with the content team to ensure all materials are SEO-optimized.",
            "Stay updated on SEO trends and algorithm changes, adapting strategies accordingly.",
            "Collaborate with developers to implement SEO best practices during development.",
            "Prepare and present reports on SEO performance and strategy effectiveness.",
            "Manage structured data markup to enhance search engine understanding of content.",
            "Conduct competitor analysis to identify SEO opportunities and threats."
        ]
    },
    {
        title: "Digital Marketing Specialist",
        department: "Marketing",
        type: "Full-time",
        location: "Bengaluru, Karnataka",
        icon: () => <SiGooglemarketingplatform className="w-6 h-6 text-black" />,
        description: "Lead our digital marketing initiatives to drive growth and engagement.",
        requirements: [
            "3+ years of digital marketing experience",
            "Experience with social media marketing",
            "Proficiency in marketing analytics tools",
            "Understanding of PPC advertising",
            "Content marketing expertise",
            "Familiarity with email marketing platforms and strategies",
            "Knowledge of SEO and SEM best practices",
            "Strong analytical skills to assess campaign performance",
            "Experience with marketing automation tools",
            "Understanding of conversion rate optimization techniques"
        ],
        responsibilities: [
            "Plan and execute marketing campaigns",
            "Manage social media presence",
            "Create engaging content",
            "Track and analyze campaign performance",
            "Coordinate with design team",
            "Develop and manage email marketing campaigns",
            "Conduct market research to identify trends and opportunities",
            "Collaborate with cross-functional teams to align marketing strategies",
            "Implement marketing automation workflows",
            "Optimize landing pages for better conversion rates"
        ]
    },
    {
        title: "Social Media Manager",
        department: "Marketing",
        type: "Full-time",
        location: "Bengaluru, Karnataka",
        icon: () => <IoMegaphoneOutline className="w-6 h-6 text-black" />,
        description: "Lead our social media initiatives to enhance brand presence and engagement.",
        requirements: [
            "3+ years of experience in social media management",
            "Proven track record in growing social media channels",
            "Strong understanding of social media platforms and analytics",
            "Excellent communication and creative skills",
            "Experience with social media advertising and paid campaigns",
            "Ability to create and curate engaging content",
            "Familiarity with social media management tools",
            "Knowledge of current trends and best practices in social media",
            "Experience with influencer marketing strategies",
            "Understanding of social media listening and sentiment analysis"
        ],
        responsibilities: [
            "Develop and execute social media strategies",
            "Create engaging content for various platforms",
            "Monitor and analyze social media performance",
            "Collaborate with marketing and design teams",
            "Engage with the online community and respond to inquiries",
            "Manage social media advertising campaigns",
            "Conduct social media audits and provide recommendations for improvement",
            "Stay updated on industry trends and competitor activities",
            "Develop and manage influencer marketing campaigns",
            "Implement social media crisis management strategies"
        ]
    }
]


export default function Careers() {
    const [selectedDepartment, setSelectedDepartment] = useState<string>("All");
    const departments = ["All", "Engineering", "Marketing"];

    const filteredJobs = selectedDepartment === "All"
        ? jobPositions
        : jobPositions.filter((job: JobPosition) => job.department === selectedDepartment);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
                        Join Our Team
                    </h1>
                    <p className="text-xl text-black max-w-3xl mx-auto">
                        Build your career with us and be part of our mission to transform the digital landscape
                    </p>
                </div>
            </section>

            {/* Department Filter */}
            <section className="py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-center gap-4 mb-12">
                        {departments.map((dept) => (
                            <button
                                key={dept}
                                onClick={() => setSelectedDepartment(dept)}
                                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                                    selectedDepartment === dept
                                        ? 'bg-gradient-to-r from-black to-black text-white'
                                        : 'bg-gray-200 text-black hover:bg-gray-300'
                                }`}
                            >
                                {dept}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Job Listings */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {filteredJobs.map((job, index) => (
                            <div
                                key={job.title}
                                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-300"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-gray-100 rounded-xl">
                                        {job.icon()}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-black">{job.title}</h3>
                                        <p className="text-gray-700">{job.department} • {job.type}</p>
                                    </div>
                                </div>

                                <p className="text-black mb-6">{job.description}</p>

                                <div className="mb-6">
                                    <h4 className="font-semibold text-black mb-2">
                                        Requirements:
                                    </h4>
                                    <ul className="space-y-2">
                                        {job.requirements.map((req, i) => (
                                            <li key={i} className="flex items-center gap-2 text-black">
                                                <span className="w-2 h-2 bg-black rounded-full" />
                                                {req}
                                            </li>
                                        ))}
                                    </ul>
                                    <br />
                                    <h4 className="font-semibold text-black mb-2">
                                        Responsibilities:
                                    </h4>
                                    <ul className="space-y-2">
                                        {job.responsibilities.map((resp, i) => (
                                            <li key={i} className="flex items-center gap-2 text-black">
                                                <span className="w-2 h-2 bg-black rounded-full" />
                                                {resp}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <a
                                    href={`mailto:info@lovosis.in?subject=Job Application for ${job.title}`}
                                    className="inline-block px-6 py-3 bg-black text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:opacity-90"
                                >
                                    Apply Now
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}