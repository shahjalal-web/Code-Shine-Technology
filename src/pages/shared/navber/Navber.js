/* components/Navbar.jsx */
"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaUser, FaWhatsapp } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const data = JSON.parse(localStorage.getItem("user"));
        setUser(data);
      } catch {
        setUser(null);
      }
    }
  }, []);

  // close on route change
  useEffect(() => {
    const handleRoute = () => setOpen(false);
    router.events?.on?.("routeChangeStart", handleRoute);
    return () => router.events?.off?.("routeChangeStart", handleRoute);
  }, [router.events]);

  // ESC to close mobile menu
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.reload();
  };

  const openWhatsApp = () => {
    if (typeof window !== "undefined") {
      window.open("https://wa.me/8801832822560", "_blank");
    }
  };

  // current route helper for active link
  const isActive = (path) => router.pathname === path;

  return (
    <header className="sticky top-0 z-50">
      {/* visible bar with subtle backdrop and shadow so it stands out */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="mx-auto max-w-[1500px] px-4 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* logo */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3">
                {/* ✅ Using uploaded image path as requested */}
                {/* <img
                  src="/mnt/data/A_digital_graphic_design_features_an_abstract_back.png"
                  alt="Code Shine logo"
                  className="w-12 h-12 rounded-md object-cover border"
                /> */}
                <span className="text-lg font-semibold text-gray-900">Code Shine</span>
              </Link>
            </div>

            {/* desktop nav */}
            <nav className="hidden lg:flex items-center gap-3">
              {[
                { href: "/", label: "Home" },
                { href: "/components/services", label: "Services" },
                { href: "/components/project", label: "Projects" },
                { href: "/components/pricing", label: "Pricing" },
                { href: "/components/about", label: "About" },
                { href: "/components/blog", label: "Blog" },
                { href: "/components/contact", label: "Contact" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    "px-3 py-2 rounded-md text-sm font-medium transition " +
                    (isActive(item.href)
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-50")
                  }
                >
                  {item.label}
                </Link>
              ))}

              {user && (
                <Link
                  href="/components/dashboard"
                  className={"px-3 py-2 rounded-md text-sm font-medium " + (isActive("/components/dashboard") ? "bg-indigo-50 text-indigo-700" : "text-gray-700 hover:bg-gray-50")}
                >
                  Dashboard
                </Link>
              )}
            </nav>

            {/* right actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={openWhatsApp}
                className="hidden md:inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-100 transition"
                aria-label="Contact on WhatsApp"
              >
                <FaWhatsapp />
                <span className="hidden sm:inline">WhatsApp</span>
              </button>

              {user ? (
                <>
                  <Link
                    href="/components/profile"
                    className="hidden md:flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-50"
                  >
                    <FaUser />
                    <span className="text-sm">{user?.name || "Profile"}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="hidden md:block bg-red-50 text-red-600 px-3 py-2 rounded-md hover:bg-red-100"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/components/login"
                  className="hidden md:inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition text-sm"
                >
                  Login
                </Link>
              )}

              {/* mobile menu button */}
              <button
                onClick={() => setOpen(true)}
                className="lg:hidden p-2 rounded-md text-black hover:bg-gray-100 transition"
                aria-label="Open menu"
              >
                <HiMenu className="w-8 h-8" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* mobile slide-over */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-50 flex ${open ? "" : "pointer-events-none"}`}
      >
        {/* dimmed overlay */}
        <div
          onClick={() => setOpen(false)}
          className={`fixed inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        />

        {/* panel */}
        <aside
          ref={menuRef}
          className={`ml-auto w-72 max-w-full h-full bg-white shadow-xl border-l border-gray-100 transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <img
                src="/profile-pic.jpg"
                alt="logo"
                className="w-10 h-10 rounded-md object-cover"
              />
              <span className="font-semibold">Code Shine</span>
            </div>
            <button onClick={() => setOpen(false)} className="p-2 rounded-md text-black hover:bg-gray-100">
              <HiX className="w-8 h-8" />
            </button>
          </div>

          <nav className="p-4 flex flex-col gap-2">
            {[
              { href: "/", label: "Home" },
              { href: "/components/services", label: "Services" },
              { href: "/components/project", label: "Projects" },
              { href: "/components/pricing", label: "Pricing" },
              { href: "/components/about", label: "About" },
              { href: "/components/blog", label: "Blog" },
              { href: "/components/contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-3 rounded-md text-gray-700 hover:bg-gray-50"
              >
                {item.label}
              </Link>
            ))}

            {user ? (
              <>
                <Link href="/components/dashboard" onClick={() => setOpen(false)} className="block px-3 py-3 rounded-md text-gray-700 hover:bg-gray-50">
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="w-full text-left px-3 py-3 rounded-md text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/components/login" onClick={() => setOpen(false)} className="block px-3 py-3 rounded-md text-gray-700 hover:bg-gray-50">
                Login
              </Link>
            )}

            <button
              onClick={() => {
                openWhatsApp();
                setOpen(false);
              }}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-md bg-green-50 text-green-700 px-4 py-2 hover:bg-green-100"
            >
              <FaWhatsapp />
              Contact on WhatsApp
            </button>
          </nav>
        </aside>
      </div>
    </header>
  );
}
