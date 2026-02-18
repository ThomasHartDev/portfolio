"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/fade-in";
import type { Architecture, ArchitectureLayer, ArchitectureFlow } from "@/data/projects";

const layerColors = {
  indigo: {
    border: "border-indigo-500/30",
    bg: "bg-indigo-500/5",
    accent: "bg-indigo-500",
    text: "text-indigo-400",
    nodeBorder: "border-indigo-500/20",
    nodeBg: "bg-indigo-500/10",
    nodeHover: "hover:border-indigo-400/40 hover:shadow-[0_0_12px_rgba(99,102,241,0.15)]",
  },
  emerald: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/5",
    accent: "bg-emerald-500",
    text: "text-emerald-400",
    nodeBorder: "border-emerald-500/20",
    nodeBg: "bg-emerald-500/10",
    nodeHover: "hover:border-emerald-400/40 hover:shadow-[0_0_12px_rgba(16,185,129,0.15)]",
  },
  amber: {
    border: "border-amber-500/30",
    bg: "bg-amber-500/5",
    accent: "bg-amber-500",
    text: "text-amber-400",
    nodeBorder: "border-amber-500/20",
    nodeBg: "bg-amber-500/10",
    nodeHover: "hover:border-amber-400/40 hover:shadow-[0_0_12px_rgba(245,158,11,0.15)]",
  },
  purple: {
    border: "border-purple-500/30",
    bg: "bg-purple-500/5",
    accent: "bg-purple-500",
    text: "text-purple-400",
    nodeBorder: "border-purple-500/20",
    nodeBg: "bg-purple-500/10",
    nodeHover: "hover:border-purple-400/40 hover:shadow-[0_0_12px_rgba(168,85,247,0.15)]",
  },
} as const;

function TechNode({
  label,
  description,
  color,
}: {
  label: string;
  description?: string;
  color: ArchitectureLayer["color"];
}) {
  const c = layerColors[color];
  return (
    <div
      className={`rounded-lg border ${c.nodeBorder} ${c.nodeBg} px-3 py-2 transition-all duration-300 ${c.nodeHover}`}
    >
      <span className={`text-sm font-medium ${c.text}`}>{label}</span>
      {description && (
        <span className="ml-1.5 text-xs text-neutral-500">{description}</span>
      )}
    </div>
  );
}

function LayerCard({
  layer,
  index,
}: {
  layer: ArchitectureLayer;
  index: number;
}) {
  const c = layerColors[layer.color];
  return (
    <motion.div
      className={`relative rounded-xl border ${c.border} ${c.bg} p-5 backdrop-blur-sm`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Color accent bar */}
      <div
        className={`absolute left-0 top-4 bottom-4 w-1 rounded-full ${c.accent}`}
      />

      <div className="pl-4">
        <h4 className={`mb-3 text-xs font-semibold uppercase tracking-widest ${c.text}`}>
          {layer.name}
        </h4>
        <div className="flex flex-wrap gap-2">
          {layer.nodes.map((node) => (
            <TechNode
              key={node.label}
              label={node.label}
              description={node.description}
              color={layer.color}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function LayerConnector({
  flow,
  index,
}: {
  flow: ArchitectureFlow;
  index: number;
}) {
  return (
    <motion.div
      className="flex flex-col items-center gap-1 py-2"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        delay: 0.1 + index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Dashed line with pulse dot */}
      <div className="relative flex h-8 w-px items-center justify-center">
        <div className="h-full w-px border-l border-dashed border-neutral-600" />
        <div className="flow-pulse absolute h-2 w-2 rounded-full bg-indigo-400/80 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
      </div>

      {/* Flow label */}
      <span className="rounded-full border border-neutral-700/50 bg-neutral-800/80 px-3 py-0.5 text-[11px] font-medium text-neutral-400">
        {flow.label}
      </span>

      {/* Down chevron */}
      <svg
        className="h-3 w-3 text-neutral-600"
        fill="none"
        viewBox="0 0 12 12"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path d="M2 4l4 4 4-4" />
      </svg>
    </motion.div>
  );
}

export function ArchitectureDiagram({
  architecture,
}: {
  architecture: Architecture;
}) {
  return (
    <div className="px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-indigo-400">
            Architecture
          </h2>
          <div className="mb-10 h-px w-12 bg-gradient-to-r from-indigo-500 to-transparent" />
        </FadeIn>

        <div className="flex flex-col">
          {architecture.layers.map((layer, i) => (
            <div key={layer.name}>
              <LayerCard layer={layer} index={i} />
              {i < architecture.layers.length - 1 &&
                architecture.flows[i] && (
                  <LayerConnector flow={architecture.flows[i]} index={i} />
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
