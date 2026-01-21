"use client";

import { motion } from "framer-motion";
import { ChevronRight, RocketIcon, BookOpenIcon, CpuIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import { TiltCard } from "@/components/ui/tilt-card";
import { GithubStats } from "@/components/ui/GithubStats";
import { AdBanner } from "@/components/ui/AdBanner";
import { GlassAdCard } from "@/components/ui/GlassAdCard";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: "var(--background)" }}>
          {/* Main Purple Glow - Top Left */}
          <div
            className="absolute top-[-20%] left-[-20%] w-[800px] h-[800px] rounded-full blur-[180px] opacity-30"
            style={{ backgroundColor: "#7c3aed" }}
          />

          {/* Secondary Blue/Purple Glow - Bottom Right */}
          <div
            className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[150px] opacity-25"
            style={{ backgroundColor: "#8b5cf6" }}
          />

          {/* Center subtle glow */}
          <div
            className="absolute top-[30%] left-[50%] -translate-x-[50%] w-[800px] h-[400px] rounded-full blur-[150px] opacity-15"
            style={{ backgroundColor: "#a78bfa" }}
          />

          {/* Grid Overlay */}
          <div className="absolute inset-0 bg-grid opacity-[0.05]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              border: "1px solid rgba(124, 58, 237, 0.3)",
              backgroundColor: "rgba(30, 27, 75, 0.3)",
              backdropFilter: "blur(8px)",
            }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
          >
            <span
              className="flex h-2 w-2 rounded-full"
              style={{ backgroundColor: "#a78bfa" }}
            />
            <span
              style={{ color: "var(--foreground-muted)" }}
              className="text-xs font-semibold tracking-wide uppercase"
            >
              SRM IST KTR • Engineering Student
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="heading-xl mb-6 tracking-tight"
          >
            <span className="block mb-2" style={{ color: "var(--foreground)" }}>Justin Jacob Saju</span>
            <span
              className="inline-block"
              style={{
                background: "linear-gradient(135deg, #c084fc 0%, #7c3aed 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 30px rgba(124, 58, 237, 0.3))",
              }}
            >
              The Gateway
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="body-lg max-w-2xl mx-auto mb-12 leading-relaxed"
            style={{ color: "var(--foreground-dim)" }}
          >
            Welcome to my digital hub. Explore my{" "}
            <span style={{ color: "#a78bfa", fontWeight: 500 }}>portfolio</span>,{" "}
            <span style={{ color: "#7c3aed", fontWeight: 500 }}>blog</span>, and{" "}
            <span style={{ color: "#c084fc", fontWeight: 500 }}>projects</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link
              href="https://portfolio.justinsaju.me"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: "#7c3aed",
                color: "#ffffff",
                boxShadow: "0 0 30px -5px rgba(124, 58, 237, 0.6)",
              }}
              className="px-8 py-3.5 rounded-full font-semibold transition-all hover:scale-105"
            >
              View Portfolio
            </Link>
            <Link
              href="/projects"
              style={{
                backgroundColor: "rgba(30, 27, 75, 0.5)",
                border: "1px solid rgba(139, 92, 246, 0.5)",
                color: "var(--foreground)",
              }}
              className="flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold hover:bg-opacity-70 transition-all"
            >
              Explore Projects
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading-lg text-center mb-12"
          >
            <span style={{ color: "var(--foreground)" }}>My </span>
            <span className="text-gradient">Digital Ecosystem</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6 auto-rows-[250px]">
            {/* Card 1: Portfolio (Large) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-2 md:row-span-1"
            >
              <TiltCard>
                <Link
                  href="https://portfolio.justinsaju.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full w-full p-8 group relative overflow-hidden rounded-2xl"
                  style={{
                    backgroundColor: "rgba(30, 27, 75, 0.6)",
                    border: "1px solid rgba(139, 92, 246, 0.3)",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div className="flex justify-between items-start">
                      <CpuIcon className="w-10 h-10 transition-colors duration-300 group-hover:text-[#a78bfa]" style={{ color: "#a78bfa" }} />
                      <ChevronRight
                        className="w-6 h-6 group-hover:translate-x-1 transition-all"
                        style={{ color: "var(--foreground-dim)" }}
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2" style={{ color: "var(--foreground)" }}>The Developer</h3>
                      <p style={{ color: "var(--foreground-muted)" }}>
                        Professional portfolio, resume, and detailed case studies.
                        Embedded Systems, VLSI, and AI.
                      </p>
                    </div>
                  </div>
                  {/* Hover Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#a78bfa]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
              </TiltCard>
            </motion.div>

            {/* Card 2: Blog */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <TiltCard>
                <Link
                  href="/blog"
                  className="block h-full w-full p-6 group relative rounded-2xl"
                  style={{
                    backgroundColor: "rgba(30, 27, 75, 0.6)",
                    border: "1px solid rgba(139, 92, 246, 0.3)",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div className="relative z-10 flex flex-col h-full justify-between h-[200px]">
                    <BookOpenIcon className="w-8 h-8 transition-colors duration-300 group-hover:text-[#c084fc]" style={{ color: "#c084fc" }} />
                    <div>
                      <h3 className="text-xl font-bold mb-1" style={{ color: "var(--foreground)" }}>The Writer</h3>
                      <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
                        Technical articles & tutorials on engineering.
                      </p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#c084fc]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
              </TiltCard>
            </motion.div>

            {/* Native Ad 1 - Styled as 'Sponsored Tool' */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="md:col-span-1"
            >
              <GlassAdCard className="min-h-[250px] w-full" format="rectangle" />
            </motion.div>

            {/* Card 3: GitHub (Dynamic) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-2"
            >
              <TiltCard>
                <Link
                  href="https://github.com/justinsaju21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full w-full p-6 group relative rounded-2xl"
                  style={{
                    backgroundColor: "rgba(30, 27, 75, 0.6)",
                    border: "1px solid rgba(139, 92, 246, 0.3)",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div className="relative z-10 h-full h-[200px]">
                    <GithubStats />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
              </TiltCard>
            </motion.div>

            {/* Card 4: Projects Hub */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="md:col-span-1"
            >
              <TiltCard>
                <Link
                  href="/projects"
                  className="block h-full w-full p-6 group relative rounded-2xl"
                  style={{
                    backgroundColor: "rgba(30, 27, 75, 0.6)",
                    border: "1px solid rgba(139, 92, 246, 0.3)",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div className="relative z-10 flex flex-col h-full justify-between h-[200px]">
                    <RocketIcon className="w-8 h-8 transition-colors duration-300 group-hover:text-[#7c3aed]" style={{ color: "#7c3aed" }} />
                    <div>
                      <h3 className="text-xl font-bold mb-1" style={{ color: "var(--foreground)" }}>Projects Hub</h3>
                      <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
                        Demos, experiments, and live project showcases.
                      </p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
              </TiltCard>
            </motion.div>

            {/* Card 5: Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <TiltCard>
                <Link
                  href="mailto:justinsaju21@gmail.com"
                  className="block h-full w-full p-6 group relative rounded-2xl"
                  style={{
                    backgroundColor: "rgba(30, 27, 75, 0.6)",
                    border: "1px solid rgba(139, 92, 246, 0.3)",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div className="relative z-10 flex flex-col h-full justify-between h-[200px]">
                    <MailIcon className="w-8 h-8 transition-colors duration-300 group-hover:text-[#a78bfa]" style={{ color: "#a78bfa" }} />
                    <div>
                      <h3 className="text-xl font-bold mb-1" style={{ color: "var(--foreground)" }}>Get In Touch</h3>
                      <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
                        Have a project idea? Let&apos;s collaborate.
                      </p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#a78bfa]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
              </TiltCard>
            </motion.div>

            {/* Native Ad 2 - Mixed into grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55 }}
              className="md:col-span-1"
            >
              <GlassAdCard className="min-h-[250px] w-full" format="rectangle" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ad Space After Bento Grid */}
      <AdBanner slot="after-bento" className="mb-16" />
    </>
  );
}
