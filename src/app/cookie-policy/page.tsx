"use client";

export default function CookiePage() {
  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-black">
          Cookie Policy
        </h1>

        <div className="bg-gray-50 rounded-2xl shadow-xl p-8 space-y-6 border border-gray-200">
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">What Are Cookies?</h2>
            <p className="text-gray-700">
              Cookies are small text files that are placed on your device when you visit our website.
              They help us provide you with a better experience by remembering your preferences,
              analyzing site usage, and assisting with our marketing efforts.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">How We Use Cookies</h2>
            <ul className="list-disc list-inside space-y-3 text-gray-700">
              <li>
                <span className="font-semibold text-gray-800">Essential Cookies:</span> Required for the website to function properly, including authentication and security.
              </li>
              <li>
                <span className="font-semibold text-gray-800">Performance Cookies:</span> Help us understand how visitors interact with our website by collecting anonymous information.
              </li>
              <li>
                <span className="font-semibold text-gray-800">Functionality Cookies:</span> Remember your preferences and choices to enhance your browsing experience.
              </li>
              <li>
                <span className="font-semibold text-gray-800">Marketing Cookies:</span> Used to track visitors across websites to display relevant advertisements.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">Managing Cookies</h2>
            <p className="text-gray-700 mb-4">
              Most web browsers allow you to control cookies through their settings. You can:
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700">
              <li>Delete all cookies from your browser</li>
              <li>Block cookies from being set</li>
              <li>Allow only certain types of cookies</li>
              <li>Browse in private/incognito mode</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Please note that blocking some types of cookies may impact your experience on our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">Updates to This Policy</h2>
            <p className="text-gray-700">
              We may update this Cookie Policy from time to time. Any changes will be posted on this page
              with an updated revision date. Please check back periodically to stay informed about our use of cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about our Cookie Policy, please contact us at{' '} <br />
              <a href="mailto:info@lovosis.in" className="text-black hover:text-gray-600 transition-colors">
                info@lovosis.in
              </a>
              <br />
              <a href="mailto:lovosist@gmail.com" className="text-black hover:text-gray-600 transition-colors">
                lovosist@gmail.com
              </a>
            </p>
            <p className="text-gray-700">
              <a href="tel:+917012970281" className="text-black hover:text-gray-600 transition-colors">
                +91 7012970281
              </a>
              <br />
              <a href="tel:+919747745544" className="text-black hover:text-gray-600 transition-colors">
                +91 9747745544
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
