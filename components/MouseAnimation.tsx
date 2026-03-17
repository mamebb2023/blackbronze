"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const MouseAnimation = () => {
	const [isScrolling, setIsScrolling] = useState(false);

	useEffect(() => {
		let timeout: NodeJS.Timeout;

		const onScroll = () => {
			setIsScrolling(true);
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				setIsScrolling(false);
			}, 1000);
		};

		window.addEventListener("scroll", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
			clearTimeout(timeout);
		};
	}, []);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: isScrolling ? 0 : 1 }}
			transition={{ duration: 0.5 }}
		>
			<div className="flex items-center gap-2">
				<div className="h-10 w-6 border-2 border-white rounded-full flex justify-center py-2 opacity-30">
					<motion.div
						animate={{
							y: [0, 23, 0],
							opacity: [1, 0, 0],
						}}
						transition={{
							repeat: Infinity,
							duration: 1.8,
							ease: "easeInOut",
						}}
						className="h-2 w-1 rounded-full bg-white will-change-transform"
					/>
				</div>
				<span className="text-white text-[10px] uppercase tracking-widest opacity-30">
					Scroll Down
				</span>
			</div>
		</motion.div>
	);
};

export default MouseAnimation;
