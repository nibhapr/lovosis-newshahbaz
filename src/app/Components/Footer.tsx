"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faThreads, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setMessage('Successfully subscribed to newsletter!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to subscribe');
      }
    } catch (err) {
      console.error('Newsletter subscription error:', err);
      setStatus('error');
      setMessage('Failed to subscribe');
    }

    setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 3000);
  };

  return (
    <footer className="bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-8 sm:mb-12">
          <div className="max-w-xl mx-auto text-center px-4">
            <h3 className="text-lg sm:text-xl font-semibold text-black mb-2">Subscribe to our Newsletter</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4">Stay updated with our latest news and updates</p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-black placeholder-gray-500 w-full"
                required
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full sm:w-auto px-6 py-2 bg-black text-white rounded-md hover:opacity-90 transition-opacity duration-300 disabled:opacity-50"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {message && (
              <p className={`mt-2 text-sm ${status === 'success' ? 'text-black' : 'text-black'}`}>
                {message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {/* Brand Section */}
          <div className="space-y-4 text-center sm:text-left">
            <Link href="/" className="text-2xl sm:text-3xl font-extrabold text-black inline-block">
              lovosis
            </Link>
            <p className="text-sm sm:text-base text-gray-600 mt-2">
              Transforming ideas into digital reality with innovative solutions.
            </p>
            <div className="flex justify-center sm:justify-start space-x-4">
              {/* Social Media Links */}
              <a href="https://www.instagram.com/lovosis_technology_private_ltd" className="text-gray-500 hover:text-black transition-colors duration-300">
                <FontAwesomeIcon icon={faInstagram} className="h-8 w-8" />
              </a>
              <a href="https://www.threads.net/@lovosis_technology_private_ltd" className="text-gray-500 hover:text-black transition-colors duration-300">
                <FontAwesomeIcon icon={faThreads} className="h-8 w-8" />
              </a>
              <a href="https://www.linkedin.com/company/lovosis-technology-private-limited" className="text-gray-500 hover:text-black transition-colors duration-300">
                <FontAwesomeIcon icon={faLinkedin} className="h-8 w-8" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-semibold text-black mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              {['About', 'Services', 'Products', 'Contact', 'Gallery', 'Careers'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-gray-600 hover:text-black transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-semibold text-black mb-4">Resources</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <Link
                  href="/certificates"
                  className="text-gray-600 hover:text-black transition-colors duration-300"
                >
                  Certificates
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-gray-600 hover:text-black transition-colors duration-300"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-600 hover:text-black transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cookie-policy"
                  className="text-gray-600 hover:text-black transition-colors duration-300"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/sitemap.xml"
                  className="text-gray-600 hover:text-black transition-colors duration-300"
                >
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-semibold text-black mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm sm:text-base text-gray-600">
              <li className="break-words">
                <a href="https://www.google.com/maps?q=4-72/2,+Swathi+Building,+3rd+Floor,+Opp.+Singapura+Garden,+1st+Main+Lakshmipura+Road,+Abbigere,+Bengaluru,+Karnataka+560090" 
                   target="_blank" 
                   className="hover:text-black transition-colors duration-300">
                  4-72/2, Swathi Building, 3rd Floor, Opp. Singapura Garden, 1st Main Lakshmipura Road, Abbigere, Bengaluru, Karnataka 560090
                </a>
              </li>
              <li>Email: <a href="mailto:info@lovosis.in" className="hover:text-black transition-colors duration-300">info@lovosis.in</a></li>
              <li>Email: <a href="mailto:lovosist@gmail.com" className="hover:text-black transition-colors duration-300">lovosist@gmail.com</a></li>
              <li>Phone: <a href="tel:+917012970281" className="hover:text-black transition-colors duration-300">+91 7012970281</a></li>
              <li>Phone: <a href="tel:+919747745544" className="hover:text-black transition-colors duration-300">+91 9747745544</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="text-center text-sm sm:text-base text-gray-500">
            <p>&copy; {currentYear} lovosis. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;