"use client";

import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface NodeTooltipProps {
  content: string;
  anchor: DOMRect | null;
  visible: boolean;
}

const TOOLTIP_OFFSET = 10;
const VIEWPORT_PADDING = 12;

export function NodeTooltip({ content, anchor, visible }: NodeTooltipProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const position = anchor ? computePosition(anchor) : null;

  return createPortal(
    <AnimatePresence>
      {visible && position && (
        <motion.div
          className="pointer-events-none fixed z-[100] max-w-xs rounded-lg border border-neutral-700/60 bg-neutral-900 px-4 py-3 shadow-xl shadow-black/40 backdrop-blur-sm"
          style={{ left: position.x, top: position.y }}
          initial={{ opacity: 0, y: position.above ? 6 : -6, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: position.above ? 6 : -6, scale: 0.96 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Caret arrow */}
          <div
            className="absolute h-2 w-2 rotate-45 border-neutral-700/60 bg-neutral-900"
            style={
              position.above
                ? {
                    bottom: -4,
                    left: position.caretX,
                    borderBottom: "1px solid rgb(64 64 64 / 0.6)",
                    borderRight: "1px solid rgb(64 64 64 / 0.6)",
                  }
                : {
                    top: -4,
                    left: position.caretX,
                    borderTop: "1px solid rgb(64 64 64 / 0.6)",
                    borderLeft: "1px solid rgb(64 64 64 / 0.6)",
                  }
            }
          />
          <p className="text-xs leading-relaxed text-neutral-300">{content}</p>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function computePosition(anchor: DOMRect) {
  const tooltipWidth = 280;
  const tooltipHeight = 80;

  const anchorCenterX = anchor.left + anchor.width / 2;

  let x = anchorCenterX - tooltipWidth / 2;
  x = Math.max(VIEWPORT_PADDING, Math.min(x, window.innerWidth - tooltipWidth - VIEWPORT_PADDING));

  const caretX = Math.max(12, Math.min(anchorCenterX - x, tooltipWidth - 12));

  const above = anchor.top > tooltipHeight + TOOLTIP_OFFSET + 40;

  const y = above
    ? anchor.top - tooltipHeight - TOOLTIP_OFFSET
    : anchor.bottom + TOOLTIP_OFFSET;

  return { x, y, caretX, above };
}
