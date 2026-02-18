"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";
import { ArchitectureDiagram } from "@/components/projects/architecture-diagram";
import type { Project } from "@/data/projects";

/* ─── Parallax image with reveal ─── */
function ParallaxImage({
  src,
  alt,
  aspect = "16/9",
  priority = false,
}: {
  src: string;
  alt: string;
  aspect?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <motion.div
      ref={ref}
      className="group relative overflow-hidden rounded-2xl border border-neutral-800/50 bg-neutral-900"
      style={{ aspectRatio: aspect }}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div className="absolute inset-[-10%]" style={{ y }}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
          loading={priority ? "eager" : "lazy"}
        />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </motion.div>
  );
}

/* ─── Number counter animation ─── */
function AnimatedStat({ number, label }: { number: string; label: string }) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
        {number}
      </span>
      <p className="mt-1 text-sm text-neutral-500">{label}</p>
    </motion.div>
  );
}

/* ─── Main component ─── */
export default function ProjectDetail({
  project,
  nextProject,
}: {
  project: Project;
  nextProject: Project | null;
}) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.5], [1, 0]);

  const gallery = project.gallery;

  return (
    <div className="relative">
      {/* ── Cinematic Hero ── */}
      <div ref={heroRef} className="relative h-[70vh] min-h-[500px] overflow-hidden">
        {project.heroImage ? (
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              className="object-cover object-center"
              priority
            />
          </motion.div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-neutral-950 to-purple-950" />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/20" />

        {/* Hero content */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end px-6 pb-16 md:px-12 lg:px-24"
          style={{ opacity: heroOpacity }}
        >
          <div className="mx-auto w-full max-w-6xl">
            <Link
              href="/projects"
              className="mb-6 inline-flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-indigo-400"
            >
              &larr; All Projects
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <Badge className="border border-indigo-500/30 bg-indigo-500/20 text-indigo-300">
                  {project.category}
                </Badge>
                <span className="text-sm text-neutral-400">{project.year}</span>
                <span className="h-1 w-1 rounded-full bg-neutral-600" />
                <span className="text-sm capitalize text-neutral-400">
                  {project.status.replace("-", " ")}
                </span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
                {project.title}
              </h1>
              <p className="mt-3 max-w-xl text-lg text-neutral-400 md:text-xl">
                {project.tagline}
              </p>
            </motion.div>

            {/* Quick links */}
            {(project.liveUrl || project.githubUrl) && (
              <motion.div
                className="mt-6 flex gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-5 py-2.5 text-sm font-medium text-indigo-300 backdrop-blur-sm transition-all hover:bg-indigo-500/20 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                  >
                    View Live &rarr;
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-700/50 px-5 py-2.5 text-sm font-medium text-neutral-300 backdrop-blur-sm transition-all hover:border-neutral-600 hover:bg-white/5"
                  >
                    Source Code
                  </a>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* ── Overview Section ── */}
      <div className="relative px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-16 lg:grid-cols-5">
            <FadeIn className="lg:col-span-3">
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-indigo-400">
                Overview
              </h2>
              <div className="mb-6 h-px w-12 bg-gradient-to-r from-indigo-500 to-transparent" />
              <p className="text-lg leading-relaxed text-neutral-300">
                {project.longDescription}
              </p>
            </FadeIn>

            <FadeIn className="lg:col-span-2" delay={0.15} direction="right">
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-indigo-400">
                Built With
              </h2>
              <div className="mb-6 h-px w-12 bg-gradient-to-r from-indigo-500 to-transparent" />
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, i) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: 0.2 + i * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Badge className="border border-neutral-700/50 bg-neutral-800/50 text-neutral-300 backdrop-blur-sm transition-colors hover:border-indigo-500/30 hover:text-indigo-300">
                      {tech}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* ── Gallery Image 1 (full-width cinematic) ── */}
      {gallery.length > 0 && (
        <div className="px-6 pb-8 md:px-12 lg:px-24">
          <div className="mx-auto max-w-6xl">
            <ParallaxImage
              src={gallery[0]}
              alt={`${project.title} screenshot`}
              aspect="21/9"
            />
          </div>
        </div>
      )}

      {/* ── Architecture Diagram ── */}
      {project.architecture && (
        <ArchitectureDiagram architecture={project.architecture} />
      )}

      {/* ── Highlights Section ── */}
      <div className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-indigo-400">
              Key Highlights
            </h2>
            <div className="mb-10 h-px w-12 bg-gradient-to-r from-indigo-500 to-transparent" />
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {project.highlights.map((highlight, i) => (
              <motion.div
                key={highlight}
                className="group relative rounded-xl border border-neutral-800/50 bg-neutral-900/50 p-6 backdrop-blur-sm transition-all duration-500 hover:border-indigo-500/20 hover:bg-neutral-900/80"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-sm font-bold text-indigo-400">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="text-sm leading-relaxed text-neutral-400 group-hover:text-neutral-300">
                  {highlight}
                </p>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Gallery Images 2-3 (side by side) ── */}
      {gallery.length >= 3 && (
        <div className="px-6 pb-8 md:px-12 lg:px-24">
          <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2">
            <FadeIn delay={0} direction="left">
              <ParallaxImage
                src={gallery[1]}
                alt={`${project.title} screenshot`}
                aspect="4/3"
              />
            </FadeIn>
            <FadeIn delay={0.15} direction="right">
              <ParallaxImage
                src={gallery[2]}
                alt={`${project.title} screenshot`}
                aspect="4/3"
              />
            </FadeIn>
          </div>
        </div>
      )}

      {/* ── Gallery Image 4 (full-width) ── */}
      {gallery.length >= 4 && (
        <div className="px-6 py-8 md:px-12 lg:px-24">
          <div className="mx-auto max-w-6xl">
            <ParallaxImage
              src={gallery[3]}
              alt={`${project.title} screenshot`}
              aspect="21/9"
            />
          </div>
        </div>
      )}

      {/* ── Gallery Images 5-6 (offset layout) ── */}
      {gallery.length >= 6 && (
        <div className="px-6 py-8 md:px-12 lg:px-24">
          <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-5">
            <FadeIn className="sm:col-span-3" direction="left">
              <ParallaxImage
                src={gallery[4]}
                alt={`${project.title} screenshot`}
                aspect="16/10"
              />
            </FadeIn>
            <FadeIn className="sm:col-span-2" delay={0.15} direction="right">
              <ParallaxImage
                src={gallery[5]}
                alt={`${project.title} screenshot`}
                aspect="16/10"
              />
            </FadeIn>
          </div>
        </div>
      )}

      {/* ── Remaining Gallery Images (7+) staggered grid ── */}
      {gallery.length > 6 && (
        <div className="px-6 py-8 md:px-12 lg:px-24">
          <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-3">
            {gallery.slice(6).map((img, i) => (
              <FadeIn key={img} delay={i * 0.1}>
                <ParallaxImage
                  src={img}
                  alt={`${project.title} screenshot`}
                  aspect="4/3"
                />
              </FadeIn>
            ))}
          </div>
        </div>
      )}

      {/* ── Handle small galleries (1-2 images only, already shown above) ── */}
      {gallery.length === 2 && (
        <div className="px-6 py-8 md:px-12 lg:px-24">
          <div className="mx-auto max-w-6xl">
            <FadeIn direction="right">
              <ParallaxImage
                src={gallery[1]}
                alt={`${project.title} screenshot`}
                aspect="16/9"
              />
            </FadeIn>
          </div>
        </div>
      )}

      {/* ── Next Project CTA ── */}
      {nextProject && (
        <div className="mt-16 border-t border-neutral-800/50 px-6 py-24 md:px-12 lg:px-24">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-500">
                Next Project
              </p>
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group inline-block"
              >
                <h3 className="text-3xl font-bold text-white transition-colors group-hover:text-indigo-400 md:text-5xl">
                  {nextProject.title}
                  <span className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-2">
                    &rarr;
                  </span>
                </h3>
                <p className="mt-2 text-neutral-500">{nextProject.tagline}</p>
              </Link>
            </FadeIn>
          </div>
        </div>
      )}
    </div>
  );
}
