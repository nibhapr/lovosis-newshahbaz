// import React from 'react';
// import Image from 'next/image';
// // import iso from '../../../public/navbarlogo/iso.png';
// // import iso9 from '../../../public/navbarlogo/ISO9.png'
// import ce from '../../../public/navbarlogo/CE.png';
// import si from '../../../public/navbarlogo/SI.png';
// import sk from '../../../public/navbarlogo/SK.png';
// import zed from '../../../public/navbarlogo/zed.png';
// import gmp from '../../../public/navbarlogo/gmp.png';
// import iso900 from "../../../public/navbarlogo/iso900.png";
// import iso14001 from "../../../public/navbarlogo/iso14001.png";
// import afist from "../../../public/navbarlogo/AFIST.png";
// import spc from "../../../public/navbarlogo/SPC.png";
// import iso45001 from "../../../public/navbarlogo/iso45001.png"

// const LogoScroll: React.FC = () => {
//   const logos = [
//     { src: zed, alt: 'Zed Logo' },
//     { src: si, alt: 'SI Logo' },
//     { src: sk, alt: 'SK Logo' },
//     { src: gmp, alt: 'GMP Logo' },
//     { src: ce, alt: 'CE Logo' },
//     { src: afist, alt: 'AFIST'},
//     { src: spc, alt: 'SPC'},
//     // { src: iso, alt: 'ISO Logo' },
//     // { src: iso9, alt: 'ISO1002'},
//     { src: iso900, alt: 'ISO900'},
//     { src: iso14001, alt: 'ISO14001'},
//     { src: iso45001, alt: 'ISO45001'}


//   ];

//   // Duplicate logos for seamless scrolling
//   const duplicatedLogos = [...logos, ...logos];

//   return (
//     <div className="flex justify-center py-4">
//       {/* Desktop */}
//       <div 
//         className="hidden lg:block overflow-hidden bg-white" 
//         style={{ width: '900px', height: '80px' }}
//       >
//         <div className="flex animate-scroll-desktop items-center h-full">
//           {duplicatedLogos.map((logo, index) => (
//             <div
//               key={index}
//               className="flex-shrink-0 flex items-center justify-center"
//               style={{ width: '100px', marginRight: '20px' }}
//             >
//               <Image
//                 src={logo.src}
//                 alt={logo.alt}
//                 width={80}
//                 height={40}
//                 className="object-contain"
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Tablet */}
//       <div 
//         className="hidden md:block lg:hidden overflow-hidden bg-white" 
//         style={{ width: '600px', height: '80px' }}
//       >
//         <div className="flex animate-scroll-tablet items-center h-full">
//           {duplicatedLogos.map((logo, index) => (
//             <div
//               key={index}
//               className="flex-shrink-0 flex items-center justify-center"
//               style={{ width: '100px', marginRight: '20px' }}
//             >
//               <Image
//                 src={logo.src}
//                 alt={logo.alt}
//                 width={70}
//                 height={35}
//                 className="object-contain"
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Mobile */}
//       <div 
//         className="block md:hidden overflow-hidden bg-white" 
//         style={{ width: '320px', height: '60px' }}
//       >
//         <div className="flex animate-scroll-mobile items-center h-full">
//           {duplicatedLogos.map((logo, index) => (
//             <div
//               key={index}
//               className="flex-shrink-0 flex items-center justify-center"
//               style={{ width: '80px', marginRight: '15px' }}
//             >
//               <Image
//                 src={logo.src}
//                 alt={logo.alt}
//                 width={60}
//                 height={30}
//                 className="object-contain"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
           
//       <style jsx>{`
//         @keyframes scroll-desktop {
//           0% {
//             transform: translateX(0);
//           }
//           100% {
//             transform: translateX(-1440px);
//           }
//         }
        
//         @keyframes scroll-tablet {
//           0% {
//             transform: translateX(0);
//           }
//           100% {
//             transform: translateX(-1440px);
//           }
//         }
        
//         @keyframes scroll-mobile {
//           0% {
//             transform: translateX(0);
//           }
//           100% {
//             transform: translateX(-1140px);
//           }
//         }
                
//         .animate-scroll-desktop {
//           animation: scroll-desktop 20s linear infinite;
//         }
        
//         .animate-scroll-tablet {
//           animation: scroll-tablet 18s linear infinite;
//         }
        
//         .animate-scroll-mobile {
//           animation: scroll-mobile 15s linear infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default LogoScroll;