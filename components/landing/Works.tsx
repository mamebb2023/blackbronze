// import React, { useState } from 'react'
// import WorksIntro from './WorksIntro'
// import { Tag } from '../ui/Tag'
// import { works } from '@/constants'
// import { AnimatePresence, motion } from 'framer-motion'
// import Image from 'next/image'
// import { HiArrowRight } from 'react-icons/hi'
// import { IoClose } from 'react-icons/io5'
// import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

// const Works = () => {
//   const [selectedWork, setSelectedWork] = useState<typeof works[0] | null>(null);

//   const openModal = (work: typeof works[0]) => {
//     setSelectedWork(work);
//   };

//   const closeModal = () => {
//     setSelectedWork(null);
//   };

//   return (
//     <div id="worksContainer" className="relative text-black overflow-hidden">
//       <WorksIntro />

//       <div className="h-[30vh] bg-white" />

//       <div className="flex flex-col gap-10 justify-center bg-white min-h-screen p-10">
//         <div className="flex-center flex-col gap-3 relative z-10">
//           <Tag variant="black">Our Works</Tag>
//           <h1 className="text-7xl">Crafted Solutions</h1>
//           <p className="text-md text-bronze-500">Turning complex problems, repetitive tasks into elegant solutions.</p>
//         </div>

//         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {works.map((work, index) => (
//             <motion.div
//               key={index}
//               className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-bronze-500/10 to-black/5 border border-bronze-500/20 hover:border-bronze-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-bronze-500/20"
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.1, duration: 0.5 }}
//             >
//               <div className="relative h-64 overflow-hidden bg-gradient-to-br from-bronze-500/20 to-black/10">
//                 <Image
//                   src={work.images[0]}
//                   width={700}
//                   height={700}
//                   alt={work.title}
//                   className="w-full h-full object-cover"
//                 />
//                 <motion.div
//                   className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
//                   initial={{ opacity: 0 }}
//                   whileHover={{ opacity: 1 }}
//                   transition={{ duration: 0.5 }}
//                 />
//               </div>
//               <div className="p-6 space-y-3">
//                 <h3 className="text-2xl font-semibold text-black group-hover:text-bronze-500 transition-colors duration-300">
//                   {work.title}
//                 </h3>
//                 <p className="text-sm text-bronze-500/80 leading-relaxed">
//                   {work.description}
//                 </p>

//                 {/* View Project Button */}
//                 <motion.button
//                   onClick={() => openModal(work)}
//                   className="pt-4 flex items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 cursor-pointer"
//                 >
//                   <span className="text-xs font-medium text-bronze-500">View Project</span>
//                   <HiArrowRight className="w-4 h-4 text-bronze-500" />
//                 </motion.button>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       <AnimatePresence>
//         {selectedWork && (
//           <ProjectDetailModal
//             work={selectedWork}
//             onClose={closeModal}
//           />
//         )}
//       </AnimatePresence>

//       <div className="h-[70vh] bg-gradient-to-b from-white via-bronze-500/50 to-black" />
//     </div>
//   )
// }

// const ProjectDetailModal = ({ work, onClose }: { work: typeof works[0], onClose: () => void }) => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const nextImage = () => {
//     if (work.images) {
//       setCurrentImageIndex((prev) =>
//         prev === work.images.length - 1 ? 0 : prev + 1
//       );
//     }
//   };

//   const prevImage = () => {
//     if (work.images) {
//       setCurrentImageIndex((prev) =>
//         prev === 0 ? work.images.length - 1 : prev - 1
//       );
//     }
//   };

//   return (
//     <motion.div
//       className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.3 }}
//     >
//       {/* Backdrop */}
//       <motion.div
//         className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//         onClick={onClose}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//       />

//       {/* Close Button */}
//       <motion.button
//         onClick={onClose}
//         className="absolute top-6 right-6 z-[10000] p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all duration-300 hover:rotate-90 group"
//         initial={{ scale: 0, rotate: -180 }}
//         animate={{ scale: 1, rotate: 0 }}
//         exit={{ scale: 0, rotate: 180 }}
//         transition={{ duration: 0.3, type: "spring" }}
//         whileHover={{ scale: 1.1 }}
//       >
//         <IoClose className="w-6 h-6 text-white" />
//       </motion.button>

//       {/* Modal Content */}
//       <motion.div
//         className="relative bg-white rounded-3xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row z-[9999]"
//         initial={{ scale: 0.8, y: 50, opacity: 0 }}
//         animate={{ scale: 1, y: 0, opacity: 1 }}
//         exit={{ scale: 0.8, y: 50, opacity: 0 }}
//         transition={{ duration: 0.4, type: "spring", damping: 25 }}
//       >
//         {/* Left Section - Image Slideshow */}
//         <div className="md:w-1/2 relative bg-gradient-to-br from-bronze-500/10 to-black/5 flex-shrink-0 p-6 flex flex-col gap-4">
//           {/* Main Image Display */}
//           <div className="relative flex-1 rounded-2xl overflow-hidden bg-gradient-to-br from-bronze-500/20 to-black/10">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={currentImageIndex}
//                 className="relative w-full h-full"
//                 initial={{ opacity: 0, x: 100 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -100 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <Image
//                   src={work.images[currentImageIndex]}
//                   alt={`${work.title} - Image ${currentImageIndex + 1}`}
//                   fill
//                   className="object-contain"
//                 />
//               </motion.div>
//             </AnimatePresence>

//             {/* Navigation Buttons */}
//             {work.images.length > 1 && (
//               <>
//                 <motion.button
//                   onClick={prevImage}
//                   className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full transition-all duration-300 shadow-lg"
//                   whileHover={{ scale: 1.1, x: -5 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   <MdChevronLeft className="w-6 h-6 text-black" />
//                 </motion.button>
//                 <motion.button
//                   onClick={nextImage}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full transition-all duration-300 shadow-lg"
//                   whileHover={{ scale: 1.1, x: 5 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   <MdChevronRight className="w-6 h-6 text-black" />
//                 </motion.button>
//               </>
//             )}
//           </div>

//           {/* Thumbnail Strip */}
//           <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
//             {work.images.map((image, idx) => (
//               <motion.button
//                 key={idx}
//                 onClick={() => setCurrentImageIndex(idx)}
//                 className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${idx === currentImageIndex
//                   ? "border-bronze-500 shadow-lg shadow-bronze-500/50"
//                   : "border-transparent hover:border-bronze-500/50"
//                   }`}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Image
//                   src={image}
//                   alt={`Thumbnail ${idx + 1}`}
//                   fill
//                   className="object-cover"
//                 />
//                 {idx === currentImageIndex && (
//                   <motion.div
//                     className="absolute inset-0 bg-bronze-500/20"
//                     layoutId="activeThumb"
//                   />
//                 )}
//               </motion.button>
//             ))}
//           </div>
//         </div>

//         {/* Right Section - Project Details */}
//         <div className="md:w-1/2 overflow-y-auto p-8 md:p-12 space-y-6">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//           >
//             <h2 className="text-4xl font-bold text-black mb-2">
//               {work.title}
//             </h2>
//             {work.mini_title && (
//               <p className="text-lg text-bronze-500 mb-4">{work.mini_title}</p>
//             )}
//             <div className="w-16 h-1 bg-gradient-to-r from-bronze-500 to-black mb-6" />
//           </motion.div>

//           <motion.div
//             className="space-y-6"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//           >
//             {/* Description */}
//             <div>
//               <h3 className="text-lg font-semibold text-bronze-500 mb-2">Description</h3>
//               <p className="text-gray-700 leading-relaxed">
//                 {work.description}
//               </p>
//             </div>

//             {/* Features */}
//             {work.features && work.features.length > 0 && (
//               <div>
//                 <h3 className="text-lg font-semibold text-bronze-500 mb-3">Key Features</h3>
//                 <ul className="space-y-2">
//                   {work.features.map((feature, idx) => (
//                     <motion.li
//                       key={idx}
//                       className="flex items-start gap-2 text-gray-700"
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.4 + idx * 0.05 }}
//                     >
//                       <span className="text-bronze-500 mt-1">•</span>
//                       <span>{feature}</span>
//                     </motion.li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* Links */}
//             {work.links && (
//               <div className="pt-4 flex gap-3">
//                 {work.links.live && (
//                   <a
//                     href={work.links.live}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="px-6 py-2 bg-bronze-500 hover:bg-bronze-600 text-white rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
//                   >
//                     View Live Site
//                     <HiArrowRight className="w-4 h-4" />
//                   </a>
//                 )}
//                 {work.links.code && (
//                   <a
//                     href={work.links.code}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="px-6 py-2 bg-black hover:bg-gray-800 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
//                   >
//                     GitHub
//                   </a>
//                 )}
//               </div>
//             )}
//           </motion.div>
//         </div>
//       </motion.div>
//     </motion.div>
//   )
// }

// export default Works