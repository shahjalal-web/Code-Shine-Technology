/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
/* components/About.jsx */
"use client";
import React from "react";
import Head from "next/head";
import Link from "next/link";

export default function About() {
  return (
    <>
      <Head>
        <title>About Us | Code Shine Technology</title>
        <meta
          name="description"
          content="Code Shine Technology — web & product design, front-end and back-end engineering. We turn ideas into beautiful, scalable digital products."
        />
        <meta
          name="keywords"
          content="web development, frontend, backend, full stack, design systems, Code Shine Technology"
        />
        <meta property="og:title" content="About Us | Code Shine Technology" />
        <meta
          property="og:description"
          content="Discover Code Shine Technology's mission and expertise in delivering high-quality web development solutions. Let's build your next project together."
        />
        <meta
          property="og:image"
          content="/mnt/data/A_digital_graphic_design_features_an_abstract_back.png"
        />
        <meta
          property="og:url"
          content="https://codeshinetechnology.com/components/about"
        />
        <meta property="og:site_name" content="Code Shine Technology" />
      </Head>

      <main className="bg-white text-gray-900">
        {/* HERO — full width background (uses uploaded image path) */}
        <section
          aria-label="About hero"
          className="relative overflow-hidden"
          style={{ minHeight: 340 }}
        >
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(255,255,255,0.88), rgba(255,255,255,0.95)), url('/mnt/data/A_digital_graphic_design_features_an_abstract_back.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "contrast(0.98) saturate(0.95)",
            }}
          />

          <div className="mx-auto max-w-[1400px] px-6 py-20">
            <div className="max-w-3xl text-center mx-auto">
              <p className="inline-block rounded-full bg-gradient-to-r from-indigo-50 to-teal-50 px-4 py-2 text-sm font-medium text-indigo-700 mb-4">
                Who we are
              </p>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
                We build digital products that <span className="text-indigo-600">look beautiful</span> and <span className="text-emerald-600">perform reliably</span>.
              </h1>

              <p className="mt-4 text-gray-600 text-lg">
                Code Shine Technology combines strategic product thinking, design systems and engineering excellence to ship delightful experiences — for startups and growing businesses.
              </p>

              <div className="mt-8 flex items-center justify-center gap-4">
                <Link
                  href="/components/pricing"
                  className="rounded-full bg-indigo-600 text-white px-5 py-3 font-semibold shadow hover:bg-indigo-700 transition"
                >
                  Get a Quote
                </Link>
                <Link
                  href="/components/services"
                  className="rounded-full border border-gray-200 px-4 py-3 text-gray-700 hover:shadow-sm transition"
                >
                  Our Services
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT: two-column about + image */}
        <section className="max-w-[1200px] mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Text column */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Story</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Since our beginning, we've focused on building pragmatic, maintainable products.
                We work closely with founders and product teams to clarify goals, validate assumptions,
                and deliver measurable outcomes — not just pixels. Our process balances speed with quality so you can launch confidently.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">How we work</h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li>
                  <strong>Discovery:</strong> Understand users and business goals.
                </li>
                <li>
                  <strong>Design & Prototype:</strong> Fast, testable UI prototypes.
                </li>
                <li>
                  <strong>Build & Iterate:</strong> Incremental delivery with tests.
                </li>
                <li>
                  <strong>Ship & Support:</strong> Monitoring, performance and growth.
                </li>
              </ol>

              <div className="mt-8">
                <Link
                  href="/components/project"
                  className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:underline"
                >
                  View projects →
                </Link>
              </div>
            </div>

            {/* Visual column */}
            <div className="rounded-xl overflow-hidden bg-gray-50 shadow-sm">
              {/* Use a high-quality team image or an illustrative svg. */}
              <img
                src="/team.jpg"
                alt="Code Shine team"
                className="w-full h-full object-cover min-h-[300px]"
              />
            </div>
          </div>
        </section>

        {/* VALUE CARDS */}
        <section className="border-t border-gray-100">
          <div className="max-w-[1200px] mx-auto px-6 py-12">
            <h3 className="text-2xl font-semibold text-center mb-8">What sets us apart</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card
                title="Design Systems"
                desc="Reusable UI systems for consistency, speed, and fewer bugs."
                accent="bg-gradient-to-br from-indigo-50 to-indigo-100"
              />
              <Card
                title="Scalable Architecture"
                desc="Clean, testable code that scales with your business needs."
                accent="bg-gradient-to-br from-emerald-50 to-emerald-100"
              />
              <Card
                title="Fast Delivery"
                desc="MVP-focused sprints to validate ideas quickly with real users."
                accent="bg-gradient-to-br from-amber-50 to-amber-100"
              />
              <Card
                title="Long-term Support"
                desc="Ongoing maintenance, monitoring and roadmap partnerships."
                accent="bg-gradient-to-br from-sky-50 to-sky-100"
              />
            </div>
          </div>
        </section>

        {/* Team / Small bios */}
        <section className="max-w-[1200px] mx-auto px-6 py-12">
          <h3 className="text-2xl font-semibold text-center mb-8">Meet the team</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Profile name="Shah Jalal" role="Founder & Lead Developer" img="/profile-pic.jpg" />
            <Profile name="Habiba" role="Product Designer" img="/habiba.jpg" />
            <Profile name="Taspia" role="Video Editor" img="/taspia.png" />
          </div>
        </section>

        {/* CTA strip */}
        <section className="bg-indigo-50">
          <div className="max-w-[1200px] mx-auto px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-xl font-semibold">Ready to start your project?</h4>
              <p className="text-gray-700">Tell us about your idea and we'll help you plan the next steps.</p>
            </div>
            <div>
              <Link
                href="/components/contact"
                className="inline-flex items-center gap-2 rounded-full bg-indigo-600 text-white px-5 py-3 font-semibold shadow hover:bg-indigo-700 transition"
              >
                Let's talk
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

/* ------------------ small presentational components ------------------ */

function Card({ title, desc, accent = "bg-gray-50" }) {
  return (
    <div className={`rounded-xl p-5 ${accent} shadow-sm`}>
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-gray-700 text-sm">{desc}</p>
    </div>
  );
}

function Profile({ name, role, img = "/avatar-placeholder.jpg" }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm flex items-start gap-4">
      <img src={img} alt={name} className="w-16 h-16 rounded-full object-cover border" />
      <div>
        <h5 className="font-semibold">{name}</h5>
        <p className="text-sm text-gray-600">{role}</p>
      </div>
    </div>
  );
}
