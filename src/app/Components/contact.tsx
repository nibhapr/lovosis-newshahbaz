"use client";

import { useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { BsTelephoneFill } from "react-icons/bs";
import { FaGoogle, FaInstagram, FaLinkedinIn, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit');
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus("error");
    }
    setIsSubmitting(false);
    setTimeout(() => setSubmitStatus("idle"), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6">
      <main className="max-w-7xl mx-auto py-12 md:py-20">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-4">
            Get in Touch
          </h1>
          <p className="text-black text-lg max-w-2xl mx-auto">
            Have questions or want to collaborate? We&apos;d love to hear from you.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <ContactCard
            icon={<IoLocationSharp className="w-full h-full" />}
            title="Visit Us"
            content={<a href="https://www.google.com/maps?q=4-72/2,+Swathi+Building,+3rd+Floor,+Opp.+Singapura+Garden,+1st+Main+Lakshmipura+Road,+Abbigere,+Bengaluru,+Karnataka+560090" target="_blank" className="hover:text-black">4-72/2, Swathi Building,<br/>3rd Floor, Opp. Singapura Garden,<br/>1st Main Lakshmipura Road,<br/>Abbigere, Bengaluru,<br/>Karnataka 560090</a>}
            bgColor="bg-gray-100"
            textColor="text-black"
          />
          <ContactCard
            icon={<FaGoogle className="w-full h-full" />}
            title="View on Google Maps"
            content={<a href="https://www.google.com/maps/place/Lovosis+Technology+Private+Limited/@12.9768,77.5178,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae3d8a1d9f5b5f:0x1f8e3b3b3b3b3b3b!8m2!3d12.9768!4d77.5178!16s%2Fg%2F11b8f8f8f8?entry=ttu" className="hover:text-black">View 3D Location</a>}
            bgColor="bg-gray-100"
            textColor="text-black"
          />
          <ContactCard
            icon={<SiGmail className="w-full h-full" />}
            title="Email Us"
            content={<><a href="mailto:info@lovosis.in" className="hover:text-black">info@lovosis.in</a><br/><a href="mailto:lovosist@gmail.com" className="hover:text-black">lovosist@gmail.com</a></>}
            bgColor="bg-gray-100"
            textColor="text-black"
          />
          <ContactCard
            icon={<BsTelephoneFill className="w-full h-full" />}
            title="Call Us"
            content={<><a href="tel:+917012970281" className="hover:text-black">+91 7012970281</a><br/><a href="tel:+919747745544" className="hover:text-black">+91 9747745544</a></>}
            bgColor="bg-gray-100"
            textColor="text-black"
          />
          <ContactCard
            icon={<FaWhatsapp className="w-full h-full" />}
            title="WhatsApp Us"
            content={<><a href="https://wa.me/917012970281" className="hover:text-black">+91 7012970281</a><br/><a href="https://wa.me/919747745544" className="hover:text-black">+91 9747745544</a></>}
            bgColor="bg-gray-100"
            textColor="text-black"
          />
          <ContactCard
            icon={<FaInstagram className="w-full h-full" />}
            title="Follow on Instagram"
            content={<a href="https://www.instagram.com/lovosis_technology_private_ltd" className="hover:text-black">Lovosis Technology Private Limited</a>}
            bgColor="bg-gray-100"
            textColor="text-black"
          />
          <ContactCard
            icon={<FaThreads className="w-full h-full" />}
            title="Follow on Threads"
            content={<a href="https://www.threads.net/@lovosis_technology_private_ltd" className="hover:text-black">Lovosis Technology Private Limited</a>}
            bgColor="bg-gray-100"
            textColor="text-black"
          />
          <ContactCard
            icon={<FaLinkedinIn className="w-full h-full" />}
            title="Connect on LinkedIn"
            content={<a href="https://in.linkedin.com/company/lovosis-technology-private-limited" className="hover:text-black">Lovosis Technology Private Limited</a>}
            bgColor="bg-gray-100"
            textColor="text-black"
          />
          <ContactCard
            icon={<FaYoutube className="w-full h-full" />}
            title="Subscribe on YouTube"
            content={<a href="https://www.youtube.com/@LovosisTechnology" className="hover:text-black">Lovosis Technology Private Limited</a>}
            bgColor="bg-gray-100"
            textColor="text-black"  
          />
        </div>

        {/* Form and Map Container */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-6 text-black">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormInput
                  label="Name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                />
                <FormInput
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <FormInput
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
              />
              <FormInput
                label="Subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
              />
              <FormTextArea
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {submitStatus === "success" && (
                <div className="text-black text-center py-2 bg-gray-100 rounded-lg">
                  Message sent successfully!
                </div>
              )}
              {submitStatus === "error" && (
                <div className="text-black text-center py-2 bg-gray-100 rounded-lg">
                  Failed to send message. Please try again.
                </div>
              )}
            </form>
          </div>

          {/* Map Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-6 text-black">Find Us</h2>
            <div className="w-full h-[500px] rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d485.79688978525235!2d77.5332774060647!3d13.075396343941993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae23e28f4d4575%3A0x82fc68d725417776!2sLovosis%20Technology%20Private%20limited!5e0!3m2!1sen!2sin!4v1749798615082!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const ContactCard = ({
  icon,
  title,
  content,
  bgColor,
  textColor,
}: {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
  bgColor: string;
  textColor: string;
}) => (
  <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
    <div
      className={`${bgColor} w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4`}
    >
      <div className={`w-8 h-8 ${textColor}`}>{icon}</div>
    </div>
    <h3 className={`text-xl ${textColor} font-semibold text-center mb-2`}>
      {title}
    </h3>
    <div className="text-black text-center">
      {content}
    </div>
  </div>
);

// Update FormInput component styles
const FormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-semibold text-black mb-2"
    >
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 rounded-lg bg-white border border-zinc-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200/20 text-black"
      required
    />
  </div>
);

// Update FormTextArea component styles
const FormTextArea = ({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-semibold text-black mb-2"
    >
      {label}
    </label>
    <textarea
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      rows={4}
      className="w-full px-4 py-3 rounded-lg bg-white border border-zinc-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200/20 text-black"
      required
    />
  </div>
);
