/* eslint-disable react/no-unescaped-entities */
/* components/Contact.jsx */
"use client";

import React, { useState, useRef } from "react";
import Head from "next/head";
import { useForm } from "react-hook-form";

/**
 * Full Contact.jsx — redesigned with hover effects
 * - Hero uses uploaded local image: /mnt/data/A_digital_graphic_design_features_an_abstract_back.png
 * - Responsive two-column layout (form + contact info)
 * - Smooth hover effects on inputs, buttons, cards, links
 * - Accessible labels / ARIA attributes
 */

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [serverMessage, setServerMessage] = useState(null); // { type: "success"|"error", text }
  const formRef = useRef(null);

  const onSubmit = async (data) => {
    setServerMessage(null);
    try {
      const payload = {
        name: data.name,
        email: data.email,
        subject: data.subject || "General Inquiry",
        message: data.message,
      };

      const res = await fetch("https://code-shine-technology.vercel.app/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.message || "Failed to send message");
      }

      const result = await res.json().catch(() => ({}));
      setServerMessage({ type: "success", text: "Thanks — your message was sent successfully." });
      reset();
      // focus top of form for accessibility
      formRef.current?.querySelector("input")?.focus();
      console.log("Contact form result:", result);
    } catch (err) {
      console.error("Contact form error:", err);
      setServerMessage({
        type: "error",
        text: err?.message || "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us | Code Shine Technology</title>
        <meta
          name="description"
          content="Contact Code Shine Technology — send a message or reach us via WhatsApp, email or phone. We'll reply within 24 hours."
        />
      </Head>

      <main className="bg-white text-gray-900">
        {/* HERO */}
        <section
          aria-label="Contact hero"
          className="relative overflow-hidden"
          style={{ minHeight: 260 }}
        >
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(250,250,250,0.96)), url('/mnt/data/A_digital_graphic_design_features_an_abstract_back.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "saturate(0.95) contrast(0.98)",
            }}
          />

          <div className="mx-auto max-w-[1400px] px-6 py-16 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold">
              Let's build something great together
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-gray-700">
              Questions about a project, pricing, or custom work? Send us a message below or reach out directly via WhatsApp or email.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <a
                href="#contact-form"
                className="px-5 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 hover:shadow-lg transition-all duration-200"
              >
                Send a Message
              </a>
              <a
                href="https://wa.me/8801832822560"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-3 rounded-full border border-gray-200 text-gray-700 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-lg hover:shadow-green-400 transition-all duration-200"
              >
                WhatsApp: +880183282560
              </a>
            </div>
          </div>
        </section>

        {/* MAIN CONTACT AREA */}
        <section className="max-w-[1100px] mx-auto px-6 py-12" id="contact-form">
          <div className="grid gap-8 lg:grid-cols-2 items-start">
            {/* LEFT: contact form */}
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold">Send us a message</h2>
                <p className="text-gray-600 mt-2">
                  Use the form to tell us about your project. We'll respond within 24 hours on business days.
                </p>
              </div>

              <form
                ref={formRef}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 bg-white border rounded-lg p-6 shadow-sm"
                noValidate
                aria-live="polite"
              >
                {/* server message */}
                {serverMessage && (
                  <div
                    role="status"
                    className={`rounded-md px-4 py-3 text-sm ${
                      serverMessage.type === "success"
                        ? "bg-green-50 text-green-700 border border-green-100"
                        : "bg-red-50 text-red-700 border border-red-100"
                    }`}
                  >
                    {serverMessage.text}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label className="flex flex-col">
                    <span className="text-sm font-medium text-gray-700">Your name</span>
                    <input
                      type="text"
                      className={`mt-2 p-3 border rounded-md transition-all duration-200
                        ${errors.name ? "border-red-300" : "border-gray-200 hover:border-indigo-300"}
                        focus:outline-none focus:ring-2 focus:ring-indigo-200`}
                      {...register("name", { required: "Name is required" })}
                      aria-invalid={errors.name ? "true" : "false"}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <span id="name-error" className="text-red-600 text-sm mt-1">
                        {errors.name.message}
                      </span>
                    )}
                  </label>

                  <label className="flex flex-col">
                    <span className="text-sm font-medium text-gray-700">Email</span>
                    <input
                      type="email"
                      className={`mt-2 p-3 border rounded-md transition-all duration-200
                        ${errors.email ? "border-red-300" : "border-gray-200 hover:border-indigo-300"}
                        focus:outline-none focus:ring-2 focus:ring-indigo-200`}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Enter a valid email address",
                        },
                      })}
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <span id="email-error" className="text-red-600 text-sm mt-1">
                        {errors.email.message}
                      </span>
                    )}
                  </label>
                </div>

                <label className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700">Subject</span>
                  <input
                    type="text"
                    className="mt-2 p-3 border border-gray-200 rounded-md transition-all duration-200 hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    {...register("subject")}
                  />
                </label>

                <label className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700">Message</span>
                  <textarea
                    rows={6}
                    className={`mt-2 p-3 border rounded-md transition-all duration-200
                      ${errors.message ? "border-red-300" : "border-gray-200 hover:border-indigo-300"}
                      focus:outline-none focus:ring-2 focus:ring-indigo-200`}
                    {...register("message", { required: "Message is required" })}
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && (
                    <span id="message-error" className="text-red-600 text-sm mt-1">
                      {errors.message.message}
                    </span>
                  )}
                </label>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 justify-center rounded-md bg-indigo-600 text-white px-5 py-3 text-sm font-semibold
                      transition-all duration-200 hover:bg-indigo-700 hover:shadow-lg disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" aria-hidden>
                          <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity="0.25" fill="none" />
                          <path d="M22 12a10 10 0 00-10-10" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      reset();
                      setServerMessage(null);
                    }}
                    className="text-sm text-gray-600 hover:text-indigo-700 hover:underline transition"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>

            {/* RIGHT: contact info */}
            <aside className="space-y-6">
              <div className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-lg hover:shadow-green-400 hover:-translate-y-1 transition-all duration-200">
                <h3 className="text-lg font-semibold">Contact Info</h3>
                <dl className="mt-3 text-gray-700 space-y-2">
                  <div>
                    <dt className="font-medium">Email</dt>
                    <dd>
                      <a href="mailto:shahjalal.profession@gmail.com" className="text-indigo-600 hover:text-indigo-800 hover:underline transition">
                        shahjalal.profession@gmail.com
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium">Phone (WhatsApp)</dt>
                    <dd>
                      <a href="https://wa.me/8801832822560" target="_blank" rel="noreferrer" className="text-indigo-600 hover:text-indigo-800 hover:underline transition">
                        +880 1832 822 560
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium">Location</dt>
                    <dd className="text-gray-600">Cumilla, Bangladesh (Remote-friendly)</dd>
                  </div>
                </dl>
              </div>

              <div className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-lg hover:shadow-green-400 hover:-translate-y-1 transition-all duration-200">
                <h4 className="font-semibold mb-2">Working Hours</h4>
                <p className="text-gray-700">Sun — Fri: 9:00 — 18:00</p>
                <p className="text-gray-500 text-sm mt-2">We typically reply within 24 business hours.</p>
              </div>

              <div className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-lg hover:shadow-green-400 hover:-translate-y-1 transition-all duration-200">
                <h4 className="font-semibold mb-2">Other ways to connect</h4>
                <ul className="text-gray-700 space-y-2">
                  <li>
                    <a href="https://www.linkedin.com/in/shah-jalal-programmer" target="_blank" rel="noreferrer" className="text-indigo-600 hover:text-indigo-800 hover:underline transition">
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href="https://www.facebook.com/shah.jalal.431979" target="_blank" rel="noreferrer" className="text-indigo-600 hover:text-indigo-800 hover:underline transition">
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/shahjalal-web" target="_blank" rel="noreferrer" className="text-indigo-600 hover:text-indigo-800 hover:underline transition">
                      GitHub
                    </a>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
