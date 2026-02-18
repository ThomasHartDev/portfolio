"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { experience, education, skills } from "@/data/experience";

const categoryLabels: Record<string, string> = {
  languages: "Languages",
  frontend: "Frontend",
  backend: "Backend",
  databases: "Databases & ORMs",
  infrastructure: "Infrastructure",
  tools: "Tools & Integrations",
};

export default function ExperiencePage() {
  return (
    <div className="pt-20">
      <Section>
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            label="Career"
            title="Experience & Education"
            description="From studying computer science at BYU to co-founding a software company to shipping enterprise-scale products."
          />
          <a
            href="/thomas-hart-resume.pdf"
            download
            className="inline-flex flex-shrink-0 items-center gap-2 self-start rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-indigo-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download Resume
          </a>
        </div>

        <div className="space-y-20">
          <div>
            <h3 className="mb-10 text-sm font-semibold uppercase tracking-widest text-indigo-400">
              Work Experience
            </h3>
            <div className="relative space-y-12 pl-8 before:absolute before:left-0 before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-gradient-to-b before:from-indigo-500/50 before:via-neutral-800 before:to-transparent">
              {experience.map((job, i) => (
                <motion.div
                  key={`${job.company}-${job.role}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-8 top-1.5 flex h-4 w-4 -translate-x-1/2 items-center justify-center">
                    <div className="h-3 w-3 rounded-full border-2 border-indigo-500 bg-neutral-950" />
                  </div>

                  <div className="rounded-xl border border-neutral-800/50 bg-neutral-900/30 p-6 transition-colors hover:border-neutral-700/50 hover:bg-neutral-900/50">
                    <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="text-xl font-bold text-white">
                        {job.role}
                      </h4>
                      <span className="text-sm text-neutral-600">
                        {job.period}
                      </span>
                    </div>
                    <p className="mb-4 text-sm font-medium text-indigo-400/80">
                      {job.company} &middot; {job.location}
                    </p>
                    <p className="mb-4 text-sm leading-relaxed text-neutral-400">
                      {job.description}
                    </p>
                    <ul className="mb-5 space-y-2">
                      {job.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-start gap-3 text-sm text-neutral-500"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-500/50" />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5">
                      {job.techUsed.map((tech) => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-10 text-sm font-semibold uppercase tracking-widest text-indigo-400">
              Education
            </h3>
            {education.map((edu, i) => (
              <motion.div
                key={edu.institution}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-xl border border-neutral-800/50 bg-neutral-900/30 p-6"
              >
                <h4 className="text-xl font-bold text-white">{edu.degree}</h4>
                <p className="mt-1 text-sm font-medium text-indigo-400/80">
                  {edu.institution} &middot; {edu.period}
                </p>
                {edu.highlights.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {edu.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-3 text-sm text-neutral-500"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-500/50" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
          {/* Technical Skills */}
          <div>
            <h3 className="mb-10 text-sm font-semibold uppercase tracking-widest text-indigo-400">
              Technical Skills
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(skills).map(([category, items], i) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="rounded-xl border border-neutral-800/50 bg-neutral-900/30 p-5"
                >
                  <h4 className="mb-3 text-xs font-medium uppercase tracking-widest text-neutral-500">
                    {categoryLabels[category] ?? category}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
