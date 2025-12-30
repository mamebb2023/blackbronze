'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function AnimatedDigit({ digit }: { digit: string }) {
	return (
		<motion.span
			initial={{ y: 40, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			exit={{ y: -40, opacity: 0 }}
			transition={{
				duration: 0.25,
				ease: [0.22, 1, 0.36, 1],
			}}
			className="absolute inset-0 flex items-center justify-center"
		>
			{digit || "0"}
		</motion.span>
	);
}

function DigitSlot({ digit }: { digit: string }) {
	return (
		<span className="relative inline-block w-[0.75em] h-[1em] overflow-hidden">
			<AnimatePresence mode="wait">
				<AnimatedDigit key={digit} digit={digit} />
			</AnimatePresence>
		</span>
	);
}

export default function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
	const [count, setCount] = useState(0);
	const [textVisible, setTextVisible] = useState(true);
	const [panelsVisible, setPanelsVisible] = useState(true);

	useEffect(() => {
		

		const assets = ['/bb-logo-white.png', '/cta-bg.jpg'];
		let loadedCount = 0;
		let realProgress = 0;

		assets.forEach(url => {
			const xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);
			xhr.responseType = 'blob';

			xhr.onload = xhr.onerror = () => {
				loadedCount++;
				realProgress = (loadedCount / assets.length) * 100;
			};

			xhr.send();
		});

		let internalCount = 0;

		const fastInterval = setInterval(() => {
			if (internalCount >= 100) return;

			if (internalCount < realProgress) {
				internalCount = Math.min(internalCount + Math.random() * 1.5 + 0.5, realProgress);
			} else if (realProgress === 0) {
				internalCount = Math.min(internalCount + Math.random() * 1.5 + 0.5, 100);
			}
		}, 30);

		const slowInterval = setInterval(() => {
			if (internalCount >= 100) {
				clearInterval(fastInterval);
				clearInterval(slowInterval);
				setCount(100);

				setTimeout(() => {
					setTextVisible(false);

					setTimeout(() => {
						setPanelsVisible(false);
						setTimeout(() => onComplete?.(), 1500);
					}, 1000);
				}, 1000);

				return;
			}

			setCount(internalCount);
		}, 1000);

		return () => {
			clearInterval(fastInterval);
			clearInterval(slowInterval);
			
		};
	}, [onComplete]);

	const formattedCount = `${count.toFixed(1)}%`;

	return (
		<>
			{/* PANELS */}
			<AnimatePresence>
				{panelsVisible && (
					<>
						<motion.div
							className="fixed top-0 left-0 w-full h-[50vh] bg-zinc-950 z-99"
							exit={{ y: '-100%' }}
							transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
						/>

						<motion.div
							className="fixed bottom-0 left-0 w-full h-[50vh] bg-zinc-950 z-99"
							exit={{ y: '100%' }}
							transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
						/>
					</>
				)}
			</AnimatePresence>

			{/* LOADING TEXT */}
			<AnimatePresence>
				{textVisible && (
					<motion.div
						className="fixed inset-0 z-101 flex items-center justify-center pointer-events-none text-white"
						exit={{ opacity: 0 }}
						transition={{ duration: 0.4 }}
					>
						<span className="text-7xl font-thin tracking-tight flex">
							{formattedCount.split('').map((char, index) => (
								<DigitSlot key={index} digit={char} />
							))}
						</span>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
