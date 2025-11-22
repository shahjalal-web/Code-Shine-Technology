// components/Pricing.jsx
"use client";
import React from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

/**
 * Redesigned Pricing (Light Theme)
 * - Clean white background, soft shadows, pastel accents
 * - Hero uses uploaded image at /mnt/data/A_digital_graphic_design_features_an_abstract_back.png
 * - Framer Motion for subtle entrance animations
 *
 * Notes:
 * - Install framer-motion for animations: npm i framer-motion
 * - Replace image path with public path if you move file to /public
 */

export default function Pricing() {
  return (
    <div className="bg-white text-gray-800">
      <Head>
        <title>Pricing | Code Shine Technology</title>
        <meta
          name="description"
          content="Affordable and transparent pricing plans by Code Shine Technology — web development, design and full-stack solutions."
        />
      </Head>

      {/* HERO */}
      <header className="relative overflow-hidden">
        {/* background image with soft gradient overlay */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(250,250,250,0.95)), url('/mnt/data/A_digital_graphic_design_features_an_abstract_back.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "saturate(0.95) contrast(0.98)",
          }}
        />

        <div className="relative mx-auto max-w-[1500px] px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="inline-block rounded-full bg-gradient-to-r from-indigo-100 to-teal-50 px-4 py-2 text-sm font-medium text-indigo-700 mb-4">
              Transparent pricing · No hidden fees
            </p>

            <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-gray-900">
              Pricing plans built for growing teams
            </h1>

            <p className="mt-4 text-gray-600 text-lg">
              Choose a plan that fits your goals — from simple landing pages to
              full-featured custom apps. Need a custom plan? Contact us.
            </p>
          </motion.div>
        </div>
      </header>

      {/* PRICING CARDS */}
      <main className="mx-auto max-w-[1500px] px-6 pb-24">
        <section className="mt-8 grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {/* Card: Basic */}
          <PriceCard
            tier="Basic"
            price="$299"
            period="per project"
            features={[
              "Up to 5 pages",
              "Responsive design",
              "Basic SEO setup",
              "Hosting setup assistance",
              "2 revisions",
            ]}
            accent="from-indigo-50 to-indigo-100"
            ctaHref="#contact"
            recommended={false}
            delay={0.05}
          />

          {/* Card: Standard (Recommended) */}
          <PriceCard
            tier="Standard"
            price="$499"
            period="per project"
            features={[
              "Up to 10 pages",
              "CMS integration (optional)",
              "SEO optimization",
              "Performance & accessibility",
              "5 revisions",
            ]}
            accent="from-amber-50 to-amber-100"
            ctaHref="#contact"
            recommended={true}
            badgeText="Most popular"
            delay={0.12}
          />

          {/* Card: Premium */}
          <PriceCard
            tier="Premium"
            price="$999"
            period="per project"
            features={[
              "Unlimited pages",
              "E-commerce & custom apps",
              "Priority support",
              "Design system & documentation",
              "Unlimited revisions",
            ]}
            accent="from-emerald-50 to-emerald-100"
            ctaHref="#contact"
            recommended={false}
            delay={0.18}
          />
        </section>

        {/* bottom note */}
        <div className="mt-10 max-w-3xl text-center mx-auto text-gray-600">
          <p>
            Prefer a tailored quote?{" "}
            <a href="#contact" className="text-indigo-600 font-semibold hover:underline">
              Contact us
            </a>{" "}
            for a free project estimate. Payments accepted via bank transfer,
            invoice, or freelance marketplaces.
          </p>
        </div>
      </main>
    </div>
  );
}

/* ----------------- PriceCard Component ----------------- */

/* ----------------- PriceCard Component (Enhanced Hover Effects) ----------------- */

function PriceCard({
  tier,
  price,
  period,
  features = [],
  accent = "from-indigo-50 to-indigo-100",
  ctaHref = "#contact",
  recommended = false,
  badgeText = "Recommended",
  delay = 0,
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay }}
      className={`
        relative rounded-2xl border bg-white p-8 
        shadow-[0_10px_25px_rgba(0,0,0,0.06)]
        transition-all duration-300 ease-[cubic-bezier(.4,0,.2,1)]
        hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(0,0,0,0.10)]
        hover:border-indigo-300 hover:bg-white/95
        ${
          recommended
            ? "hover:shadow-[0_25px_45px_rgba(255,196,0,0.25)] hover:border-amber-400"
            : ""
        }
      `}
      aria-label={`${tier} pricing plan`}
    >
      {/* recommended badge */}
      {recommended && (
        <div className="absolute -top-3 right-4">
          <div className="rounded-full bg-amber-500 px-3 py-1 text-white text-xs font-semibold shadow-sm animate-pulse">
            {badgeText}
          </div>
        </div>
      )}

      {/* header */}
      <div>
        <div
          className={`inline-flex items-center gap-3 rounded-full px-3 py-1 text-sm font-medium 
          text-gray-700 bg-gradient-to-r ${accent}`}
        >
          <strong className="text-gray-900">{tier}</strong>
        </div>

        <div className="mt-6 flex items-end gap-3">
          <div>
            <div className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              {price}
            </div>
            <div className="text-sm text-gray-500">{period}</div>
          </div>
        </div>

        <ul className="mt-6 space-y-3 text-gray-700">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-3">
              <svg
                className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm">{f}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* footer CTA */}
      <div className="mt-8 flex items-center justify-between gap-4">
        <a
          href={ctaHref}
          className={`
            inline-flex items-center gap-2 rounded-full px-5 py-3 
            text-sm font-semibold shadow-sm transition-all
            ${
              recommended
                ? "bg-amber-500 text-white hover:bg-amber-600"
                : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:shadow-md"
            }
          `}
          aria-label={`Select ${tier} plan`}
        >
          {recommended ? "Start with Standard" : `Choose ${tier}`}
        </a>

        <div className="text-sm text-gray-500">
          <Link
            href="https://www.fiverr.com/shah_jalal_web"
            target="_blank"
            className="text-indigo-600 hover:underline mr-3"
          >
            Fiverr
          </Link>
          <Link
            href="https://www.upwork.com/freelancers/~01da9284068e6bfcca"
            target="_blank"
            className="text-indigo-600 hover:underline"
          >
            UpWork
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

