"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { FadeIn } from "@/components/ui/fade-in";
import type { Architecture } from "@/data/projects";

const tierColors = [
  {
    border: "border-indigo-500/30",
    accent: "bg-indigo-500",
    text: "text-indigo-400",
    glow: "hover:shadow-[0_0_20px_rgba(99,102,241,0.12)]",
  },
  {
    border: "border-emerald-500/30",
    accent: "bg-emerald-500",
    text: "text-emerald-400",
    glow: "hover:shadow-[0_0_20px_rgba(16,185,129,0.12)]",
  },
  {
    border: "border-amber-500/30",
    accent: "bg-amber-500",
    text: "text-amber-400",
    glow: "hover:shadow-[0_0_20px_rgba(245,158,11,0.12)]",
  },
  {
    border: "border-purple-500/30",
    accent: "bg-purple-500",
    text: "text-purple-400",
    glow: "hover:shadow-[0_0_20px_rgba(168,85,247,0.12)]",
  },
];

interface EdgePath {
  d: string;
  labelX: number;
  labelY: number;
  label?: string;
}

export function ArchitectureDiagram({
  architecture,
}: {
  architecture: Architecture;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef(new Map<string, HTMLDivElement>());
  const [edgePaths, setEdgePaths] = useState<EdgePath[]>([]);
  const [measured, setMeasured] = useState(false);

  const recalculate = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const cr = container.getBoundingClientRect();
    const paths: EdgePath[] = [];

    for (const edge of architecture.edges) {
      const fromEl = nodeRefs.current.get(edge.from);
      const toEl = nodeRefs.current.get(edge.to);
      if (!fromEl || !toEl) continue;

      const fr = fromEl.getBoundingClientRect();
      const tr = toEl.getBoundingClientRect();

      const fromCY = fr.top + fr.height / 2 - cr.top;
      const toCY = tr.top + tr.height / 2 - cr.top;
      const sameRow = Math.abs(fromCY - toCY) < 30;

      let d: string;
      let labelX: number;
      let labelY: number;

      if (sameRow) {
        const leftToRight = fr.left < tr.left;
        const x1 = (leftToRight ? fr.right : fr.left) - cr.left;
        const y1 = fromCY;
        const x2 = (leftToRight ? tr.left : tr.right) - cr.left;
        const y2 = toCY;
        d = `M ${x1} ${y1} L ${x2} ${y2}`;
        labelX = (x1 + x2) / 2;
        labelY = (y1 + y2) / 2 - 12;
      } else {
        const x1 = fr.left + fr.width / 2 - cr.left;
        const y1 = fr.bottom - cr.top;
        const x2 = tr.left + tr.width / 2 - cr.left;
        const y2 = tr.top - cr.top;
        const gap = Math.abs(y2 - y1);
        const curve = Math.min(gap * 0.4, 60);
        d = `M ${x1} ${y1} C ${x1} ${y1 + curve}, ${x2} ${y2 - curve}, ${x2} ${y2}`;
        labelX = (x1 + x2) / 2;
        labelY = (y1 + y2) / 2;
      }

      paths.push({ d, labelX, labelY, label: edge.label });
    }

    setEdgePaths(paths);
    setMeasured(true);
  }, [architecture.edges]);

  useEffect(() => {
    const timer = setTimeout(recalculate, 200);
    const observer = new ResizeObserver(recalculate);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [recalculate]);

  return (
    <div className="px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-indigo-400">
            Architecture
          </h2>
          <div className="mb-10 h-px w-12 bg-gradient-to-r from-indigo-500 to-transparent" />
        </FadeIn>

        <div ref={containerRef} className="relative">
          {/* SVG edges — desktop only */}
          <svg
            className={`pointer-events-none absolute inset-0 hidden h-full w-full transition-opacity duration-700 md:block ${measured ? "opacity-100" : "opacity-0"}`}
            style={{ overflow: "visible" }}
          >
            <defs>
              <marker
                id="arch-arrow"
                viewBox="0 0 10 8"
                refX="10"
                refY="4"
                markerWidth="8"
                markerHeight="6"
                orient="auto"
              >
                <path
                  d="M 0 0 L 10 4 L 0 8"
                  fill="none"
                  stroke="rgb(99 102 241 / 0.4)"
                  strokeWidth="1.5"
                />
              </marker>
            </defs>
            {edgePaths.map((edge, i) => (
              <motion.path
                key={i}
                d={edge.d}
                fill="none"
                stroke="rgb(99 102 241 / 0.25)"
                strokeWidth={1.5}
                markerEnd="url(#arch-arrow)"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.08 }}
              />
            ))}
          </svg>

          {/* Edge labels — desktop only */}
          {measured &&
            edgePaths.map(
              (edge, i) =>
                edge.label && (
                  <motion.div
                    key={`label-${i}`}
                    className="pointer-events-none absolute z-20 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-800 bg-neutral-950/90 px-2.5 py-0.5 text-[10px] font-medium text-neutral-500 md:block"
                    style={{ left: edge.labelX, top: edge.labelY }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.8 + i * 0.08 }}
                  >
                    {edge.label}
                  </motion.div>
                ),
            )}

          {/* Tier rows with nodes */}
          <div className="flex flex-col gap-16">
            {architecture.tiers.map((tier, ti) => {
              const c = tierColors[ti % tierColors.length];
              return (
                <motion.div
                  key={tier.label}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.6,
                    delay: ti * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <p
                    className={`mb-3 text-[11px] font-semibold uppercase tracking-widest opacity-60 ${c.text}`}
                  >
                    {tier.label}
                  </p>

                  <div className="flex flex-wrap justify-center gap-4">
                    {tier.nodes.map((node) => (
                      <div
                        key={node.id}
                        ref={(el) => {
                          if (el) nodeRefs.current.set(node.id, el);
                        }}
                        className={`relative rounded-xl border bg-neutral-900/80 px-5 py-3.5 backdrop-blur-sm transition-all duration-300 ${c.border} ${c.glow}`}
                      >
                        <div
                          className={`absolute bottom-3 left-0 top-3 w-0.5 rounded-full opacity-50 ${c.accent}`}
                        />
                        <span className="text-sm font-medium text-neutral-200">
                          {node.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
