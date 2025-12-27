'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
    const [count, setCount] = useState(0);
    const [textVisible, setTextVisible] = useState(true);
    const [panelsVisible, setPanelsVisible] = useState(true);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        const assets = [
            '/bb-logo-white.png',
            '/cta-bg.jpg'
        ];

        let loadedCount = 0;
        const totalFiles = assets.length;
        let realProgress = 0;

        const loadAssets = async () => {
            const promises = assets.map(url => {
                return new Promise<void>((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.open('GET', url, true);
                    xhr.responseType = 'blob';

                    xhr.onload = () => {
                        loadedCount++;
                        realProgress = (loadedCount / totalFiles) * 100;
                        resolve();
                    };

                    xhr.onerror = () => {
                        loadedCount++;
                        realProgress = (loadedCount / totalFiles) * 100;
                        resolve();
                    };

                    xhr.send();
                });
            });

            await Promise.all(promises);
        };

        loadAssets();

        const interval = setInterval(() => {
            setCount((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);

                    // Sequence Start
                    // 1. Fade out text immediately (or after a very brief pause to register 100%)
                    setTimeout(() => {
                        setTextVisible(false); // Trigger text exit

                        // 2. Wait 1.5s then split panels
                        setTimeout(() => {
                            setPanelsVisible(false); // Trigger panel exit (split)

                            // 3. Wait 1.5s then load landing page
                            setTimeout(() => {
                                if (onComplete) onComplete();
                                // Clean up overflow here or via onExitComplete of panels
                            }, 1500);

                        }, 1000);

                    }, 500); // 200ms pause at 100% before text fades

                    return 100;
                }

                if (prev < realProgress) {
                    const increment = Math.random() * 1.5 + 0.5;
                    const next = Math.min(prev + increment, realProgress);
                    return next;
                }
                return prev;
            });
        }, 30);

        return () => {
            clearInterval(interval);
        };
    }, [onComplete]);

    return (
        <>
            <AnimatePresence
                onExitComplete={() => {
                    document.body.style.overflow = '';
                }}
            >
                {panelsVisible && (
                    <>
                        <motion.div
                            key="top-panel"
                            className="fixed top-0 left-0 w-full h-[50vh] bg-zinc-950 z-[100]"
                            initial={{ y: 0 }}
                            exit={{ y: '-100%' }}
                            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                        />
                        <motion.div
                            key="loading-line"
                            className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none text-white"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="h-[1px] bg-white rounded-full transition-all" style={{ width: `${count}%` }}></div>
                        </motion.div>
                        <motion.div
                            key="bottom-panel"
                            className="fixed bottom-0 left-0 w-full h-[50vh] bg-zinc-950 z-[100]"
                            initial={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                        />
                    </>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {textVisible && (
                    <motion.div
                        key="loading-text"
                        className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none text-white"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <span className="text-7xl font-thin">
                            {count.toFixed(1)}%
                        </span>
                    </motion.div>
                )}
                {/* loading line */}


            </AnimatePresence>
        </>
    );
}
