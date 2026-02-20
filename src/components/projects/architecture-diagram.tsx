"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FadeIn } from "@/components/ui/fade-in";
import { NodeTooltip } from "@/components/ui/node-tooltip";
import type { Architecture } from "@/data/projects";

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
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredRect, setHoveredRect] = useState<DOMRect | null>(null);

  const rowCount = useMemo(
    () => Math.max(...architecture.nodes.map((n) => n.row)) + 1,
    [architecture.nodes],
  );

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
        labelY = (y1 + y2) / 2 - 14;
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
    const timer = setTimeout(recalculate, 250);
    const observer = new ResizeObserver(recalculate);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [recalculate]);

  return (
    <div className="px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-indigo-400">
            Architecture
          </h2>
          <div className="mb-10 h-px w-12 bg-gradient-to-r from-indigo-500 to-transparent" />
        </FadeIn>

        <div
          ref={containerRef}
          className="relative rounded-2xl border border-neutral-800/50 bg-neutral-950 p-6 md:p-10"
        >
          {/* Subtle dot grid background */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle,_rgba(255,255,255,0.04)_1px,_transparent_1px)] bg-[size:20px_20px]" />

          {/* SVG edges — desktop only */}
          <svg
            className={`pointer-events-none absolute inset-0 z-10 hidden h-full w-full transition-opacity duration-500 md:block ${measured ? "opacity-100" : "opacity-0"}`}
            style={{ overflow: "visible" }}
          >
            <defs>
              <marker
                id="arch-arrow"
                viewBox="0 0 10 7"
                refX="9"
                refY="3.5"
                markerWidth="10"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <polygon
                  points="0 0, 10 3.5, 0 7"
                  fill="rgb(129 140 248 / 0.6)"
                />
              </marker>
            </defs>
            {edgePaths.map((edge, i) => (
              <motion.path
                key={i}
                d={edge.d}
                fill="none"
                stroke="rgb(129 140 248 / 0.4)"
                strokeWidth={2}
                markerEnd="url(#arch-arrow)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  pathLength: {
                    duration: 0.8,
                    delay: 0.5 + i * 0.1,
                    ease: "easeInOut",
                  },
                  opacity: { duration: 0.3, delay: 0.5 + i * 0.1 },
                }}
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
                    className="pointer-events-none absolute z-20 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-700/60 bg-neutral-900 px-2.5 py-0.5 text-[10px] font-medium text-neutral-400 md:block"
                    style={{ left: edge.labelX, top: edge.labelY }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 1 + i * 0.08 }}
                  >
                    {edge.label}
                  </motion.div>
                ),
            )}

          {/* 2D Node Grid — 5 columns, N rows */}
          <div
            className="relative z-20 hidden md:grid"
            style={{
              gridTemplateColumns: "repeat(5, 1fr)",
              gridTemplateRows: `repeat(${rowCount}, auto)`,
              gap: "3.5rem 1rem",
            }}
          >
            {architecture.nodes.map((node, ni) => (
              <motion.div
                key={node.id}
                ref={(el) => {
                  if (el) nodeRefs.current.set(node.id, el);
                }}
                className={`flex flex-col items-center justify-center rounded-xl border border-neutral-700/50 bg-neutral-900 px-4 py-3 text-center shadow-lg shadow-black/20 transition-all duration-300 hover:border-indigo-500/40 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] ${node.rationale ? "cursor-pointer" : ""}`}
                style={{
                  gridRow: node.row + 1,
                  gridColumn: node.col,
                }}
                onMouseEnter={(e) => {
                  if (node.rationale) {
                    setHoveredNode(node.id);
                    setHoveredRect(
                      (e.currentTarget as HTMLDivElement).getBoundingClientRect(),
                    );
                  }
                }}
                onMouseLeave={() => {
                  setHoveredNode(null);
                  setHoveredRect(null);
                }}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: ni * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="text-sm font-medium text-neutral-200">
                  {node.label}
                </span>
                {node.subtitle && (
                  <span className="mt-0.5 text-[10px] text-neutral-500">
                    {node.subtitle}
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Mobile: simple stacked list */}
          <div className="relative flex flex-col gap-3 md:hidden">
            {architecture.nodes.map((node, ni) => (
              <motion.div
                key={node.id}
                className="flex items-center gap-2 rounded-xl border border-neutral-700/50 bg-neutral-900 px-4 py-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: ni * 0.05 }}
              >
                <span className="text-sm font-medium text-neutral-200">
                  {node.label}
                </span>
                {node.subtitle && (
                  <span className="text-[10px] text-neutral-500">
                    {node.subtitle}
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Hover tooltip — rendered via portal to escape overflow */}
          <NodeTooltip
            content={
              architecture.nodes.find((n) => n.id === hoveredNode)?.rationale ??
              ""
            }
            anchor={hoveredRect}
            visible={hoveredNode !== null}
          />
        </div>
      </div>
    </div>
  );
}
