"use client";

import { works } from "@/constants";
import { Tag } from "../ui/Tag";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { HiExternalLink } from "react-icons/hi";
import { FiGithub } from "react-icons/fi";

type Work = (typeof works)[number];

function ImageStack({
  work,
  isEven,
  isInView,
}: {
  work: Work;
  isEven: boolean;
  isInView: boolean;
}) {
  const accentColor =
    typeof work.color === "string" && work.color.startsWith("#")
      ? work.color
      : "#AA7939";

  const [main, second, third] = work.images ?? [];

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -60 : 60, filter: "blur(12px)" }}
      animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="flex-1 relative w-full min-h-[400px] lg:min-h-[480px]"
    >
      {/* ambient glow */}
      <div
        className="absolute inset-0 rounded-[48px] blur-3xl opacity-15 pointer-events-none scale-90"
        style={{ backgroundColor: accentColor }}
      />

      {/* ── logo badge (top corner opposite to floating cards) ── */}
      {"logo" in work && work.logo && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute z-20 ${isEven ? "-top-4 -left-4" : "-top-4 -right-4"} size-14 rounded-2xl bg-gradient-to-b from-black to-bronze-900 border border-bronze-500/10 shadow-xl flex-center overflow-hidden p-2`}
        >
          <Image
            src={(work as { logo: string }).logo}
            alt={`${work.title} logo`}
            width={56}
            height={56}
            className="object-contain w-full h-full"
          />
        </motion.div>
      )}

      {/* ── main image ── */}
      {main && (
        <div className="relative rounded-[36px] overflow-hidden w-full aspect-[4/3] shadow-2xl border border-white/[0.06]">
          <Image
            src={main}
            alt={work.title}
            fill
            className="object-cover object-top transition-transform duration-700 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-transparent pointer-events-none" />
        </div>
      )}

      {/* ── second floating card ── */}
      {second && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute -bottom-8 ${isEven ? "-right-5" : "-left-5"} w-[50%] rounded-[24px] overflow-hidden shadow-2xl border border-white/10 aspect-[3/2]`}
        >
          <Image
            src={second}
            alt={`${work.title} preview`}
            fill
            className="object-cover object-top"
            sizes="25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </motion.div>
      )}

      {/* ── third accent card ── */}
      {third && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: isEven ? -4 : 4 }}
          animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute ${isEven ? "-top-6 -right-4" : "-top-6 -left-4"} w-[32%] rounded-[20px] overflow-hidden shadow-xl border border-white/10 aspect-[3/4]`}
        >
          <Image
            src={third}
            alt={`${work.title} detail`}
            fill
            className="object-cover object-top"
            sizes="15vw"
          />
        </motion.div>
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Details Section
───────────────────────────────────────── */
function WorkDetails({
  work,
  index,
  isEven,
  isInView,
}: {
  work: Work;
  index: number;
  isEven: boolean;
  isInView: boolean;
}) {
  const links = "links" in work ? (work as { links?: { live?: string; code?: string } }).links : undefined;
  const features = "features" in work ? (work as { features?: string[] }).features : undefined;
  const miniTitle = "mini_title" in work ? (work as { mini_title?: string }).mini_title : undefined;
  const forClient = "forClient" in work ? (work as { forClient?: boolean }).forClient : false;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? 60 : -60, filter: "blur(8px)" }}
      animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="flex-1 flex flex-col gap-6 max-w-lg"
    >
      {/* Index + badges */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-mono text-xs text-zinc-600 border border-zinc-800 rounded-full px-3 py-1 tracking-widest">
          {String(index + 1).padStart(2, "0")}
        </span>
        {forClient && (
          <span className="text-xs text-bronze-300 border border-bronze-500/30 rounded-full px-3 py-1 bg-bronze-500/5 tracking-wide">
            Client Project
          </span>
        )}
      </div>

      {/* Title block */}
      <div className="space-y-1.5">
        <h2 className="text-4xl lg:text-[3.2rem] font-bold text-white leading-[1.05] tracking-tight">
          {work.title}
        </h2>
        {miniTitle && (
          <p className="text-xs font-semibold tracking-[3px] uppercase text-bronze-400">
            {miniTitle}
          </p>
        )}
      </div>

      {/* Description */}
      <p className="text-zinc-400 leading-relaxed text-[15px]">
        {work.description}
      </p>

      {/* Feature pills */}
      {features && features.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {features.map((f, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.25 + i * 0.06 }}
              className="text-xs px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-zinc-400"
            >
              {f}
            </motion.span>
          ))}
        </div>
      )}

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-bronze-500/20 via-white/5 to-transparent" />

      {/* CTA links */}
      <div className="flex items-center gap-3 flex-wrap">
        {links?.live ? (
          <Link
            href={links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-bronze-500/40 hover:border-bronze-500 bg-bronze-500/5 hover:bg-bronze-500/15 text-sm text-bronze-300 hover:text-white transition-all duration-300"
          >
            Live Site
            <HiExternalLink className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        ) : (
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] text-sm text-zinc-600 cursor-default select-none">
            Coming Soon
          </span>
        )}

        {links?.code && (
          <Link
            href={links.code}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 hover:border-white/25 bg-white/[0.02] hover:bg-white/[0.05] text-sm text-zinc-400 hover:text-white transition-all duration-300"
          >
            Source
            <FiGithub className="size-3.5 group-hover:rotate-12 transition-transform" />
          </Link>
        )}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Single Work Row
───────────────────────────────────────── */
function WorkRow({ work, index }: { work: Work; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  const accentColor =
    typeof work.color === "string" && work.color.startsWith("#")
      ? work.color
      : "#AA7939";

  return (
    <div
      ref={ref}
      className={`relative flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 lg:gap-20 items-center`}
    >
      {/* Per-row orb — large, behind image side, tinted to the project color */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className={`absolute pointer-events-none ${isEven ? "-left-32 top-1/2 -translate-y-1/2" : "-right-32 top-1/2 -translate-y-1/2"
          } size-[320px] rounded-full blur-[130px] opacity-[0.12]`}
        style={{ backgroundColor: accentColor }}
      />

      <ImageStack work={work} isEven={isEven} isInView={isInView} />
      <WorkDetails
        work={work}
        index={index}
        isEven={isEven}
        isInView={isInView}
      />
    </div>
  );
}

/* ─────────────────────────────────────────
   Section
───────────────────────────────────────── */
const Works = () => {
  return (
    <section id="works" className="relative px-6 py-28 overflow-hidden">

      {/* ── Section background orbs ── */}
      {/* center-right: cool deep */}
      <div className="absolute pointer-events-none top-[35%] -right-40 w-[500px] h-[500px] rounded-full bg-bronze-900/50 blur-[130px]" />
      {/* mid-left: dim accent */}
      <div className="absolute pointer-events-none top-[60%] -left-20 w-[380px] h-[380px] rounded-full bg-bronze-500/20 blur-[110px]" />

      {/* Header */}
      <div className="relative flex-center flex-col gap-3 mb-24 text-center">
        <Tag text="Works" />
        <h1 className="text-6xl lg:text-7xl font-bold">Crafted Solutions</h1>
        <p className="text-bronze-300">
          Turning complex problems, repetitive tasks into elegant solutions.
        </p>
      </div>

      {/* Work list */}
      <div className="relative max-w-6xl mx-auto flex flex-col gap-36">
        {works.map((work, i) => (
          <WorkRow key={work.title} work={work} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Works;