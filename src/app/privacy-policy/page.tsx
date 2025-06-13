import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Lovosis Technologies Pvt Ltd',
  description: 'Privacy Policy for Lovosis Technologies - Learn how we collect, use, and protect your personal information.',
  keywords: 'privacy policy, data protection, personal information, data security, user privacy, Lovosis Technologies',
  openGraph: {
    title: 'Privacy Policy - Lovosis Technologies',
    description: 'Privacy Policy for Lovosis Technologies - Learn how we collect, use, and protect your personal information.',
    type: 'website',
    url: 'https://lovosis.in/privacy-policy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-black mb-12">
          Privacy Policy
        </h1>

        <div className="space-y-8 bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <section>can you add meta data and seo for this please and make sure you don't remove anything
            <h2 className="text-2xl font-semibold text-black mb-4">Introduction</h2>
            <p className="text-black leading-relaxed">
              At Lovosis Technologies, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
              disclose, and safeguard your information when you visit our website or use our services. Please read this 
              privacy policy carefully. By using our services, you consent to the data practices described in this statement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">Information We Collect</h2>
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-gray-800">Personal Information</h3>
              <ul className="list-disc list-inside text-black space-y-2">
                <li>Name and contact information</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Business information</li>
                <li>Information provided through contact forms</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800">Usage Data</h3>
              <ul className="list-disc list-inside text-black space-y-2">
                <li>IP address</li>
                <li>Browser type</li>
                <li>Pages visited</li>
                <li>Time and date of visits</li>
                <li>Other diagnostic data</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">How We Use Your Information</h2>
            <ul className="list-disc list-inside text-black space-y-2">
              <li>To provide and maintain our services</li>
              <li>To notify you about changes to our services</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information to improve our services</li>
              <li>To monitor the usage of our services</li>
              <li>To detect, prevent and address technical issues</li>
              <li>To send you newsletters and marketing communications (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">Data Security</h2>
            <p className="text-black leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal 
              information from unauthorized access, disclosure, alteration, or destruction. However, please note 
              that no method of transmission over the Internet or electronic storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">Third-Party Services</h2>
            <p className="text-black leading-relaxed">
              We may employ third-party companies and individuals to facilitate our services, provide services 
              on our behalf, perform service-related services, or assist us in analyzing how our services are used. 
              These third parties have access to your personal information only to perform these tasks on our behalf 
              and are obligated not to disclose or use it for any other purpose.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">Your Rights</h2>
            <ul className="list-disc list-inside text-black space-y-2">
              <li>Right to access your personal data</li>
              <li>Right to correct inaccurate personal data</li>
              <li>Right to request deletion of your personal data</li>
              <li>Right to object to processing of your personal data</li>
              <li>Right to data portability</li>
              <li>Right to withdraw consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">Contact Us</h2>
            <p className="text-black leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:{' '} <br/>
              <a href="mailto:info@lovosis.in" className="text-black hover:text-gray-600">
                info@lovosis.in
              </a>
              <br/>
              <a href="mailto:lovosist@gmail.com" className="text-black hover:text-gray-600">
                lovosist@gmail.com
              </a>
            </p>
            <p className="text-black leading-relaxed">
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
