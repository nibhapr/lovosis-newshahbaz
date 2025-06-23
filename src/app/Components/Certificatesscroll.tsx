import React from 'react';
import Image from 'next/image';
import iso from '../../../public/navbarlogo/iso.png';
import ce from '../../../public/navbarlogo/CE.png';
import si from '../../../public/navbarlogo/SI.png';
import sk from '../../../public/navbarlogo/SK.png';
import zed from '../../../public/navbarlogo/zed.png';
import gmp from '../../../public/navbarlogo/gmp.png';

const LogoScroll: React.FC = () => {
  const logos = [
    { src: iso, alt: 'ISO Logo' },
    { src: ce, alt: 'CE Logo' },
    { src: si, alt: 'SI Logo' },
    { src: sk, alt: 'SK Logo' },
    { src: zed, alt: 'Zed Logo' },
    { src: gmp, alt: 'GMP Logo' }
  ];

  // Duplicate logos for seamless scrolling
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="flex justify-center py-4">
      {/* Desktop */}
      <div 
        className="hidden lg:block overflow-hidden bg-white" 
        style={{ width: '900px', height: '80px' }}
      >
        <div className="flex animate-scroll-desktop items-center h-full">
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center"
              style={{ width: '100px', marginRight: '20px' }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={80}
                height={40}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Tablet */}
      <div 
        className="hidden md:block lg:hidden overflow-hidden bg-white" 
        style={{ width: '600px', height: '80px' }}
      >
        <div className="flex animate-scroll-tablet items-center h-full">
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center"
              style={{ width: '100px', marginRight: '20px' }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={70}
                height={35}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div 
        className="block md:hidden overflow-hidden bg-white" 
        style={{ width: '320px', height: '60px' }}
      >
        <div className="flex animate-scroll-mobile items-center h-full">
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center"
              style={{ width: '80px', marginRight: '15px' }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={60}
                height={30}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
           
      <style jsx>{`
        @keyframes scroll-desktop {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-720px);
          }
        }
        
        @keyframes scroll-tablet {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-720px);
          }
        }
        
        @keyframes scroll-mobile {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-570px);
          }
        }
                
        .animate-scroll-desktop {
          animation: scroll-desktop 14s linear infinite;
        }
        
        .animate-scroll-tablet {
          animation: scroll-tablet 12s linear infinite;
        }
        
        .animate-scroll-mobile {
          animation: scroll-mobile 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LogoScroll;