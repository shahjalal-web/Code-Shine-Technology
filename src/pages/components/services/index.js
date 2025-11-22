// components/Services.jsx
"use client";
import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FaBootstrap,
  FaCss3,
  FaHtml5,
  FaNodeJs,
  FaReact,
} from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { SiExpress, SiMongodb, SiMysql, SiTailwindcss } from "react-icons/si";
import Link from "next/link";

export default function Services() {
  return (
    <div className="bg-white text-gray-800">
      <Head>
        <title>Our Services | Code Shine Technology</title>
        <meta name="description" content="Premium web development and design services." />
      </Head>

      {/* HEADER SECTION */}
      <section className="max-w-[1500px] mx-auto text-center py-14 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold"
        >
          Our Services
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-4 text-lg max-w-2xl mx-auto text-gray-600"
        >
          We build high-quality digital products with modern tools, clean
          architecture and delightful user experiences.
        </motion.p>
      </section>

      {/* GRID */}
      <section className="max-w-[1500px] mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* CARD 1 */}
          <ServiceCard
            title="Front-End Development"
            desc="We create beautiful, responsive, fast UIs using React, Next.js, Tailwind CSS and more."
            icons={[
              FaHtml5,
              FaCss3,
              FaReact,
              IoLogoJavascript,
              SiTailwindcss,
              FaBootstrap,
            ]}
          />

          {/* CARD 2 */}
          <ServiceCard
            title="Back-End Development"
            desc="Powerful, scalable and secure APIs built with Node.js, Express, MongoDB and SQL."
            icons={[
              IoLogoJavascript,
              FaNodeJs,
              SiExpress,
              SiMongodb,
              SiMysql,
            ]}
          />

          {/* CARD 3 */}
          <ServiceCard
            title="Full Stack Development"
            desc="We build complete end-to-end solutions including frontend, backend and database layers."
            icons={[
              FaHtml5,
              FaCss3,
              FaReact,
              IoLogoJavascript,
              FaNodeJs,
              SiExpress,
              SiMongodb,
              SiMysql,
            ]}
          />

          {/* CARD 4 */}
          <ServiceCard
            title="UI / UX & Product Design"
            desc="Design systems, wireframes, interactive prototypes and user-focused interfaces."
          />

          {/* CARD 5 */}
          <ServiceCard
            title="E-commerce Solutions"
            desc="Custom stores, admin dashboards & product systems using Shopify or headless commerce."
          />

          {/* CARD 6 */}
          <ServiceCard
            title="Maintenance & Support"
            desc="Website updates, optimization, monitoring and long-term support plans."
          />
        </div>
      </section>
    </div>
  );
}

/* ------------------ CARD COMPONENT ------------------ */

function ServiceCard({ title, desc, icons = [] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl p-8 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)] transition-all"
    >
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className="mt-3 text-gray-600">{desc}</p>

      {/* ICON LIST */}
      {icons.length > 0 && (
        <div className="flex flex-wrap gap-4 mt-6">
          {icons.map((Icon, i) => (
            <motion.span
              key={i}
              whileHover={{ scale: 1.15 }}
              className="text-3xl text-gray-700"
            >
              <Icon />
            </motion.span>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="mt-6 flex justify-between items-center">
        <Link
          href="/components/contact"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Start Project →
        </Link>

        <Link
          href="/components/project"
          className="text-sm font-medium text-gray-500 hover:underline"
        >
          View Examples
        </Link>
      </div>
    </motion.div>
  );
}
