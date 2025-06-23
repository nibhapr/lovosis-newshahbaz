import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions - Lovosis Technologies Pvt Ltd',
  description: 'Terms and Conditions for Lovosis Technologies - Understanding our service agreement and user responsibilities.',
  keywords: 'terms and conditions, terms of service, user agreement, legal terms, service terms, Lovosis Technologies',
  openGraph: {
    title: 'Terms and Conditions - Lovosis Technologies',
    description: 'Terms and Conditions for Lovosis Technologies - Understanding our service agreement and user responsibilities.',
    type: 'website',
    url: 'https://lovosis.in/terms-of-service',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-black mb-12">
          Terms and Conditions
        </h1>

        <div className="space-y-8 bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">Introduction</h2>
            <p className="text-black leading-relaxed">
              Welcome to Lovosis Technologies. By accessing and using our website and services, you accept and agree 
              to be bound by the terms and conditions outlined below. Please read these terms carefully before using our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">Use of Services</h2>
            <ul className="list-disc list-inside text-black space-y-2">
              <li>Services must be used in accordance with applicable laws and regulations</li>
              <li>Users must not engage in any unauthorized or illegal activities</li>
              <li>Access to services may be restricted or terminated for violations</li>
              <li>Users are responsible for maintaining account security</li>
              <li>Services are provided "as is" without warranties</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">Intellectual Property</h2>
            <p className="text-black leading-relaxed">
              All content, including but not limited to logos, designs, text, graphics, and software, is the property 
              of Lovosis Technologies and is protected by intellectual property laws. Users may not reproduce, distribute, 
              or create derivative works without explicit permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">Product and Service Terms</h2>
            <ul className="list-disc list-inside text-black space-y-2">
              <li>Product specifications are subject to change without notice</li>
              <li>Pricing may be modified at our discretion</li>
              <li>Warranty terms vary by product category</li>
              <li>Service availability may depend on geographic location</li>
              <li>Custom orders may be subject to additional terms</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">Payment and Billing</h2>
            <p className="text-black leading-relaxed">
              Payment terms are specified at the time of purchase. We accept various payment methods and all 
              transactions are secured. Refunds and cancellations are subject to our refund policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">Limitation of Liability</h2>
            <p className="text-black leading-relaxed">
              Lovosis Technologies shall not be liable for any indirect, incidental, special, consequential, or 
              punitive damages arising from the use of our services or products. Our liability is limited to the 
              amount paid for the specific product or service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">Contact Information</h2>
            <p className="text-black leading-relaxed">
              For questions about these terms, please contact us at:{' '} <br/>
              <a href="mailto:info@lovosis.in" className="text-black hover:text-gray-600">
                info@lovosis.in
              </a>
              <br/>
              <a href="mailto:lovosist@gmail.com" className="text-black hover:text-gray-600">
                lovosist@gmail.com
              </a>
            </p>
            <p className="text-black leading-relaxed mt-2"> 
              <a href="tel:+917012970281" className="text-black hover:text-gray-600">
                +91 7012970281
              </a>
              <br/>
              <a href="tel:+919747745544" className="text-black hover:text-gray-600">
                +91 9747745544
              </a>
            </p>
          </section>

          <section className="pt-4 border-t border-gray-300">
            <p className="text-sm text-gray-600">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
