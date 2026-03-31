import { links } from '@/constants';
import Logo from '../ui/Logo'
import Link from 'next/link'
import { FaFacebook, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import Globe from '@/components/ui/globe'
import { Button } from '../ui/Button';
import { HiArrowRight } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { Tag } from '../ui/Tag';

const Footer = () => {
  const socials = [
    { label: "Twitter", href: "#", Icon: FaXTwitter },
    { label: "LinkedIn", href: "#", Icon: FaLinkedinIn },
    { label: "FaceBook", href: "#", Icon: FaFacebook },
  ];

  const stars = [
    { top: 10, left: 10 },
    { top: 20, left: 40 },
    { top: 90, left: 25 },
    { top: 70, left: 65 },
    { top: 20, left: 70 },
    { top: 50, left: 90 },
    { top: 40, left: 20 },
    { top: 90, left: 12 },
    { top: 65, left: 70 },
    { top: 90, left: 80 },
    // New random stars
    { top: 15, left: 55 },
    { top: 35, left: 80 },
    { top: 55, left: 15 },
    { top: 45, left: 45 },
    { top: 75, left: 35 },
    { top: 30, left: 60 },
    { top: 60, left: 50 },
    { top: 25, left: 85 },
    { top: 80, left: 55 },
    { top: 50, left: 30 }
  ]

  return (
    <div id="footer" className="relative min-h-screen overflow-hidden flex flex-col">
      {/* Top gradient border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-bronze-500 to-transparent" />

      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-bronze-500/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="absolute right-0 bottom-1/4 w-40 h-[500px] bg-linear-to-b from-bronze-500/80 via-bronze-500/20 to-transparent rounded-[50%] rotate-45 opacity-80 blur-2xl" />

      <div className="absolute left-20 bottom-0 w-32 h-[700px] bg-linear-to-b from-bronze-500/80 via-bronze-500/20 to-transparent rounded-[50%] -rotate-60 opacity-80 blur-2xl" />


      <div className="relative flex md:flex-row gap-5 p-5 md:p-12 h-[500px]">
        <div className="absolute inset-0 rounded-[50px] p-5 md:p-12">
          <div className="h-full border-8 border-bronze-300 rounded-[50px] blur-xl" />
        </div>

        <div className="relative border border-bronze-300/20 rounded-[50px] flex-1 flex justify-center text-center text-white overflow-hidden py-10">
          <div className="absolute top-0 left-0 w-full h-[90%]">
            {stars.map((pos, i) => (
              <motion.div
                key={i}
                className="absolute size-px rounded-full bg-bronze-300"
                style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2 + Math.random() * 3, // Random duration between 2-5 seconds
                  repeat: Infinity,
                  delay: Math.random() * 2, // Random initial delay
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          <div className="absolute -bottom-1/4 translate-y-1/2 left-1/2 -translate-x-1/2">
            <Globe
              size={{ height: 700, width: 700 }}
              baseColor="#120a00"
              markerColor="#be6f00"
              glowColor="#ffdac9"
              arcColor="#be6f00"
              markers={[
                { location: [140.7128, -74.006], size: 0.03, },
                { location: [37.7749, -122.4194], size: 0.03, },

                { location: [-37.7595, -62.4367], size: 0.03, },
                { location: [47.7595, 22.4367], size: 0.03, },
              ]}
              arcs={[
                { startLat: 37.7749, startLng: -122.4194, endLat: 140.7128, endLng: -74.006 },
                { startLat: -37.7595, startLng: -62.4367, endLat: 47.7595, endLng: 22.4367 },
              ]}
            />
          </div>

          <div className="relative flex items-center flex-col text-center p-5 gap-3">
            <Tag>Start your project</Tag>
            <h1 className="md:text-3xl lg:text-4xl font-bold tracking-tight leading-[1.1] text-white">Let's Build,{" "}
              <span className="bg-clip-text text-transparent bg-linear-to-r from-white to-bronze-500">
                Extraordinary
              </span>
            </h1>
            <p className="text-zinc-400 max-w-2xl leading-relaxed">Whether you&apos;re looking to revamp your digital presence or build a complex web application from scratch, we have the expertise to make it happen.</p>
            <Link href="#contact">
              <Button variant="liquid" className="min-w-56 h-14 text-lg group">
                Get in touch
                <HiArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="relative flex-1 max-w-7xl flex justify-between flex-col min-h-[60vh]">
        <div />

        <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 p-5 md:p-14">
          <div>
            <Link href="/">
              <Logo />
            </Link>
            <p className="mt-3 text-sm text-zinc-500 leading-relaxed max-w-xs">
              A web agency creating considered digital experiences for
              businesses that value quality over noise.
            </p>
          </div>
          <nav className="flex flex-col gap-3">
            <h1
              className="text-lg font-bold text-white"
              style={{ fontFamily: "var(--font-tektur)" }}
            >
              Navigation
            </h1>
            {links.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="group flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
              >
                <span className="w-4 h-px bg-zinc-700 group-hover:w-6 group-hover:bg-bronze-500 transition-all duration-300" />
                {link.label}
              </Link>
            ))}
          </nav>
          <nav className="flex gap-3 items-center">
            {socials.map((social, i) => {
              const Icon = social.Icon;
              return (
                <Link
                  key={i}
                  href={social.href}
                  className={`relative overflow-hidden group size-10 rounded-lg flex items-center justify-center transition-all duration-500 border border-bronze-300/20 text-white`}
                  aria-label={social.label}
                  target="_blank"
                >
                  <div
                    className={`absolute top-1/2 -translate-x-1/2 left-1/2 size-5 group-hover:size-full rounded-full blur-sm transition-all duration-500 bg-bronze-500`}
                  />
                  <Icon className="text-lg relative" />
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 select-none">
          <h1 className="text-[12vw] leading-none font-bold text-white/[0.03] tracking-tighter text-center whitespace-nowrap" style={{ fontFamily: "var(--font-tektur)" }}>
            BLACKBRONZE
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-5 p-5 md:p-14"></div>
      </div>
    </div>
  )
}

export default Footer