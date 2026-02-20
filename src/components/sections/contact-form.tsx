"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send");

      setStatus("sent");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="border-t border-neutral-800/50 px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-5">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-indigo-400">
              Get in Touch
            </h2>
            <div className="mb-6 h-px w-12 bg-gradient-to-r from-indigo-500 to-transparent" />
            <h3 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Want to work together?
            </h3>
            <p className="mt-4 leading-relaxed text-neutral-400">
              Whether you have a project in mind, want to collaborate, or just
              want to say hi — I&apos;d love to hear from you. Drop me a message
              and I&apos;ll get back to you as soon as I can.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5 lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-neutral-300"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-900/50 px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-colors focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-neutral-300"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-900/50 px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-colors focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-neutral-300"
              >
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
                className="w-full resize-none rounded-lg border border-neutral-800 bg-neutral-900/50 px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-colors focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20"
                placeholder="Tell me about your project or idea..."
              />
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-7 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>

              {status === "sent" && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm text-emerald-400"
                >
                  Message sent! I&apos;ll be in touch.
                </motion.span>
              )}
              {status === "error" && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm text-red-400"
                >
                  Something went wrong. Try again or email me directly.
                </motion.span>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
