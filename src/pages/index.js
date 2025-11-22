"use client";
import Project from "./components/project";
import About from "./components/about";
import Services from "./components/services";
import { TypeAnimation } from "react-type-animation";
import Team from "./components/team";
import Review from "./components/review";
import Contact from "./components/contact";
import Head from "next/head";
import Pricing from "./components/pricing";
import FocusPage from "./components/focus";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Home({
  backgroundImage = "/mnt/data/A_digital_graphic_design_features_an_abstract_back.png",
  height = 560,
}) {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf = null;
    let stars = [];
    let width = 0;
    let heightC = 0;

    // config (tweak these)
    const NUM_STARS = 200; // number of stars
    const MIN_R = 0.5;
    const MAX_R = 2.2;
    const TWINKLE_SPEED = 0.02; // how fast their alpha cycles
    const FADE_PROB = 0.02; // chance per frame to trigger a fade-out for a star

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.width = wrapperRef.current.clientWidth * dpr;
      heightC = canvas.height = wrapperRef.current.clientHeight * dpr;
      canvas.style.width = `${wrapperRef.current.clientWidth}px`;
      canvas.style.height = `${wrapperRef.current.clientHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initStars();
    }

    function rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    function initStars() {
      stars = [];
      for (let i = 0; i < NUM_STARS; i++) {
        const r = rand(MIN_R, MAX_R);
        stars.push({
          x: Math.random() * width,
          y: Math.random() * heightC,
          r,
          baseAlpha: rand(0.3, 0.95),
          alpha: 0,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: TWINKLE_SPEED * rand(0.6, 1.6),
          fading: false,
          fadeProgress: 0, // 0..1
          fadeDir: 1, // 1 = fade in, -1 = fade out
          driftX: rand(-0.05, 0.05),
          driftY: rand(-0.02, 0.02),
        });
        // set initial alpha close to base for nicer look
        stars[i].alpha = stars[i].baseAlpha * rand(0.6, 1);
      }
    }

    function drawFrame() {
      ctx.clearRect(0, 0, width, heightC);
      // subtle gradient overlay to integrate with background
      const g = ctx.createLinearGradient(0, 0, 0, heightC);
      g.addColorStop(0, "rgba(0,0,0,0.0)");
      g.addColorStop(1, "rgba(0,0,0,0.12)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, heightC);

      for (let s of stars) {
        // twinkle via sin wave + phase
        s.twinklePhase += s.twinkleSpeed;
        const tw = (Math.sin(s.twinklePhase) + 1) / 2; // 0..1
        // base alpha influenced by twinkle
        let targetAlpha = s.baseAlpha * (0.6 + 0.4 * tw);

        // small random drift (slow)
        s.x += s.driftX;
        s.y += s.driftY;
        // keep inside bounds
        if (s.x < -10) s.x = width + 10;
        if (s.x > width + 10) s.x = -10;
        if (s.y < -10) s.y = heightC + 10;
        if (s.y > heightC + 10) s.y = -10;

        // occasionally trigger fade-out (simulate 'nibbe')
        if (!s.fading && Math.random() < FADE_PROB) {
          s.fading = true;
          s.fadeDir = -1; // fade out
          s.fadeProgress = 0;
        }

        if (s.fading) {
          // progress fade
          s.fadeProgress += 0.01 * rand(0.8, 1.6);
          if (s.fadeDir === -1) {
            // fading out to 0
            s.alpha = targetAlpha * (1 - s.fadeProgress);
          } else {
            // fading in from 0 to full
            s.alpha = targetAlpha * s.fadeProgress;
          }
          if (s.fadeProgress >= 1) {
            if (s.fadeDir === -1) {
              // after fade-out, respawn star at new position and fade in
              s.x = Math.random() * width;
              s.y = Math.random() * heightC;
              s.baseAlpha = rand(0.35, 0.95);
              s.r = rand(MIN_R, MAX_R);
              s.twinklePhase = Math.random() * Math.PI * 2;
              s.fading = true;
              s.fadeDir = 1;
              s.fadeProgress = 0;
            } else {
              // finished fading in
              s.fading = false;
              s.fadeProgress = 0;
            }
          }
        } else {
          // smoothly approach targetAlpha
          s.alpha += (targetAlpha - s.alpha) * 0.06;
        }

        // draw glow (soft)
        ctx.beginPath();
        const glow = s.r * 6;
        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, glow);
        grad.addColorStop(
          0,
          `rgba(255,255,255,${Math.min(0.25, s.alpha * 0.25)})`
        );
        grad.addColorStop(
          0.5,
          `rgba(255,255,255,${Math.min(0.06, s.alpha * 0.06)})`
        );
        grad.addColorStop(1, `rgba(255,255,255,0)`);
        ctx.fillStyle = grad;
        ctx.arc(s.x, s.y, glow, 0, Math.PI * 2);
        ctx.fill();

        // core
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${Math.min(1, s.alpha)})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(drawFrame);
    }

    // init
    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(drawFrame);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div>
      <Head>
        <title>Code Shine Technology - Web Development, Design, and More</title>
        <link rel="canonical" href="https://codeshinetechnology.com" />
        <meta
          name="description"
          content="Code Shine Technology offers top-notch web development, design, and video editing services. Discover our expertise in creating stunning and functional digital solutions."
        />
        <meta
          name="keywords"
          content="Web Development, Web Design, Video Editing, Code Shine Technology"
        />
        <meta
          property="og:title"
          content="Code Shine Technology - Web Development, Design, and More"
        />
        <meta
          property="og:description"
          content="Code Shine Technology offers top-notch web development, design, and video editing services. Discover our expertise in creating stunning and functional digital solutions."
        />
        <meta
          property="og:image"
          content="https://codeShineTechnology.com/codeshinetechnology.png"
        />
        <meta property="og:url" content="https://codeShineTechnology.com" />
        <meta name="robots" content="index, follow" />
      </Head>

      <section
        ref={wrapperRef}
        aria-label="Hero - Code Shine Technology"
        className="mx-auto max-w-[1500px] rounded-2xl overflow-hidden shadow-2xl"
        style={{
          ["--cs-primary"]: "#0f172a",
          ["--cs-accent"]: "#06b6d4",
          ["--cs-highlight"]: "#f59e0b",
          ["--cs-secondary"]: "#10b981",
        }}
      >
        {/* Base background image + gradient */}
        <div
          className="relative bg-center bg-cover"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(2,6,23,0.55), rgba(2,6,23,0.55)), url('${backgroundImage}')`,
            height: `${height}px`,
          }}
        >
          {/* abstract mesh (subtle SVG) */}
          <div className="absolute inset-0 opacity-[0.12] mix-blend-screen pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 800 800"
              className="w-full h-full"
            >
              <defs>
                <pattern
                  id="mesh2"
                  width="100"
                  height="100"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M0 50 Q50 0 100 50 T200 50"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="1"
                    strokeOpacity="0.18"
                  />
                </pattern>
              </defs>
              <rect width="800" height="800" fill="url(#mesh2)" />
            </svg>
          </div>

          {/* glow blobs */}
          <div
            className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full blur-[86px]"
            style={{ background: "rgba(6,182,212,0.28)" }}
          />
          <div
            className="pointer-events-none absolute -bottom-28 right-8 h-96 w-96 rounded-full blur-[110px]"
            style={{ background: "rgba(245,158,11,0.26)" }}
          />

          {/* animated stars canvas (on top of background but behind content) */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
          />

          {/* Content (on top) */}
          <div className="relative z-10 flex h-full items-center justify-center px-6 text-center text-white">
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-sm mb-4">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: "var(--cs-highlight)" }}
                />
                Digital Solutions • Fast • Scalable • Creative
              </p>

              <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
                Transforming Ideas Into{" "}
                <span className="text-[color:var(--cs-highlight)]">
                  Stunning Digital Experiences
                </span>
              </h1>

              <p className="mt-4 text-lg md:text-xl text-white/80 font-medium">
                We build premium websites, custom web apps, and powerful digital
                brands that help your business grow faster.
              </p>

              <div className="mt-6 text-2xl md:text-3xl font-bold">
                <span className="text-white/90">Specialized in </span>
                <span className="text-[color:var(--cs-accent)] italic">
                  <TypeAnimation
                    sequence={[
                      "Full-Stack Development",
                      1800,
                      "Modern UI/UX Design",
                      1800,
                      "Brand-Driven Experiences",
                      1800,
                      "Creative Visual Solutions",
                      1800,
                    ]}
                    speed={50}
                    repeat={Infinity}
                  />
                </span>
              </div>

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/components/pricing"
                  className="rounded-full px-6 py-3 text-sm font-semibold shadow-md transition-transform hover:-translate-y-0.5"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--cs-accent), var(--cs-secondary))",
                    color: "#021024",
                  }}
                >
                  Get a Free Quote
                </Link>

                <Link
                  href="/components/project"
                  className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/10"
                >
                  View Our Work
                </Link>
              </div>
            </div>
          </div>

          {/* subtle bottom wave */}
          <div className="absolute bottom-0 left-0 right-0 -mb-1">
            <svg
              viewBox="0 0 1440 64"
              className="w-full"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d="M0 32C120 12 360 0 720 0s600 12 720 32v32H0V32z"
                fill="#ffffff14"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* end top section */}

      <Services />
      <FocusPage />

      <div style={{ maxWidth: "1500px" }} className="mx-auto shadow-2xl">
        <div className="">
          <Project />
        </div>
      </div>

      <Pricing />

      {/* <Team /> */}

      <Review />

      <About />

      <Contact />
    </div>
  );
}
