import React, { useState } from 'react'
import WorksIntro from './WorksIntro'
import { Tag } from '../ui/Tag'
import { works } from '@/constants'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { HiArrowRight } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'

interface Work {
  title: string;
  description: string;
  image: string;
  images?: string[];
  details?: string;
}

interface ProjectDetailModalProps {
  work: Work;
  onClose: () => void;
}

const Works = () => {
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  const openModal = (work: Work) => {
    setSelectedWork(work);
  };

  const closeModal = () => {
    setSelectedWork(null);
  };

  return (
    <div id="worksContainer" className="relative text-black overflow-hidden">
      <WorksIntro />

      <div className="h-[30vh] bg-white" />


      <div className="flex flex-col gap-10 justify-center bg-white min-h-screen p-10">
        <div className="flex-center flex-col gap-3 relative z-10">
          <Tag variant="black">Our Works</Tag>
          <h1 className="text-7xl">Crafted Solutions</h1>
          <p className="text-md text-bronze-500">Turning complex problems, repetitive tasks into elegant solutions.</p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((work, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-bronze-500/10 to-black/5 border border-bronze-500/20 hover:border-bronze-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-bronze-500/20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-bronze-500/20 to-black/10">
                <Image
                  src={work.image}
                  width={700}
                  height={700}
                  alt={work.title}
                  className="w-full h-full object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-2xl font-semibold text-black group-hover:text-bronze-500 transition-colors duration-300">
                  {work.title}
                </h3>
                <p className="text-sm text-bronze-500/80 leading-relaxed">
                  {work.description}
                </p>

                {/* View Project Button */}
                <motion.button
                  onClick={() => openModal(work)}
                  className="pt-4 flex items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 cursor-pointer"
                >
                  <span className="text-xs font-medium text-bronze-500">View Project</span>
                  <HiArrowRight className="w-4 h-4 text-bronze-500" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedWork && (
          <ProjectDetailModal
            work={selectedWork}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>

      <div className="h-[70vh] bg-gradient-to-b from-white via-bronze-500/50 to-black" />
    </div>
  )
}


const ProjectDetailModal = ({ work, onClose }: ProjectDetailModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const nextImage = () => {
    if (work.images) {
      setCurrentImageIndex((prev) =>
        prev === work.images!.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (work.images) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? work.images!.length - 1 : prev - 1
      );
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-9999 flex items-center justify-center p-4 backdrop-blur-xs"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <div className="flex flex-wrap gap-3">
        <div onClick={onClose} className="absolute top-6 right-6 z-[60] p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all duration-300 hover:rotate-90">
          <IoClose className="w-6 h-6 text-white" />
        </div>

        <div className="relative bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[85vh] overflow-hidden flex flex-col md:flex-row z-[60] p-2">
          <div className="flex-1 relative">
            <Image
              src={work.image}
              alt={work.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}


export default Works