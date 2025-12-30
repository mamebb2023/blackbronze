"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

const SurferAnimation: React.FC = () => {
    const images = [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1525562723836-dca67a71d5f1?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=600&fit=crop',
    ];
    const [items, setItems] = useState(images);


    const handleAnimationComplete = (index: number) => {
        setItems(prev => {
            return [...prev, items[index]]
          })
        }
    return (
        <div className="relative h-screen flex items-center justify-center overflow-hidden">
            <div className="relative flex items-center justify-center" style={{ perspective: '1000px' }}>
                {items.map((image, index) => {
                    const baseX = index * 150;
                    const baseY = index * -150;
                    const baseZ = index * -150;
                    
                    return (
                        <motion.div 
                            key={index}
                            className="h-[300px] w-[500px] absolute"
                            initial={{ x: baseX, y: baseY, z: baseZ, rotateX: -20, rotateY: -30 }}
                            animate={{ x: baseX - 1000, y: baseY + 1000, z: baseZ + 1000, rotateX: -20, rotateY: -30 }}
                            transition={{
                                duration: 20,
                                ease: "linear",
                                // repeat: Infinity,
                                delay: index * 0.1
                            }}
                            style={{
                                zIndex: 100 - index,
                            }}
                            onAnimationComplete={index === 0 ? () => handleAnimationComplete(index) : undefined}
                            >

                            <Image
                                src={image}
                                alt={`Image ${index + 1}`}
                                width={500}
                                height={350}
                                className="w-full h-full object-cover rounded-md shadow-2xl"
                                unoptimized
                            />
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

export default SurferAnimation