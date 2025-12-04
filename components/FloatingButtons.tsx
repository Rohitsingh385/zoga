"use client";

import { Phone, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

type Preset = {
  id: string;
  title: string;
  message: string;
};

const WHATSAPP_NUMBER = "+919835504582";
const PHONE_NUMBER = "+919835504582";

const presets: Preset[] = [
  {
    id: "web-app",
    title: "Web & App Dev",
    message: "Hello! I'm interested in Web & App Development.",
  },
  {
    id: "web-design",
    title: "Web Design",
    message: "Hi — I'd like a modern website design.",
  },
  {
    id: "video-editing",
    title: "Video Editing",
    message: "Hello — I need video editing.",
  },
  { id: "seo", title: "SEO", message: "Hi — I'm interested in SEO services." },
  {
    id: "designing",
    title: "Designing",
    message: "Hello — I need branding & design assets.",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    message: "Hi — I want digital marketing services.",
  },
  {
    id: "gmb",
    title: "GMB",
    message: "Hello — I need Google My Business optimization.",
  },
];

export default function FloatingButtons() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [customMessage, setCustomMessage] = useState("");

  const isStudentPage =
    typeof pathname === "string" && pathname.startsWith("/student");

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!isMounted || isStudentPage) return null;

  const sendWhatsApp = (msg: string) => {
    const encoded = encodeURIComponent(msg);
    const number = WHATSAPP_NUMBER.replace(/\+/g, "");
    window.open(`https://wa.me/${number}?text=${encoded}`, "_blank");
    setIsOpen(false);
    setCustomMessage("");
  };

  return (
    <>
      <div className="fixed right-6 bottom-6 z-[9999] flex flex-col items-end gap-4">
        {/* DESKTOP POPUP */}
        {isOpen && (
          <div className="hidden md:block w-80 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-gray-300 dark:border-zinc-800 p-4 relative bottom-4 max-h-[70vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white shadow-md">
                  <FaWhatsapp className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold dark:text-white">
                    Avioni — Quick Chat
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Choose a topic or type your message
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-zinc-500 hover:text-zinc-800 dark:hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Predefined Options */}
            <div className="flex flex-col gap-2 mb-3">
              {presets.map((p) => (
                <button
                  key={p.id}
                  onClick={() => sendWhatsApp(p.message)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                >
                  <p className="text-sm font-medium dark:text-white">
                    {p.title}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {p.message}
                  </p>
                </button>
              ))}
            </div>

            {/* CUSTOM CHAT INPUT */}
            <div className="border-t border-zinc-300 dark:border-zinc-800 pt-3">
              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Type your own message..."
                className="w-full p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-sm dark:text-white outline-none resize-none"
              />

              <button
                disabled={!customMessage.trim()}
                onClick={() => sendWhatsApp(customMessage)}
                className="mt-2 w-full py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 disabled:opacity-40"
              >
                Send Message
              </button>
            </div>
          </div>
        )}

        {/* Floating Buttons */}
        <div className="flex flex-col items-end gap-3">
          {/* WHATSAPP BUTTON */}
          <button
            title="Chat with us"
            onClick={() => setIsOpen(!isOpen)}
            className="w-14 h-14 rounded-full flex items-center justify-center
              bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/30 
              dark:shadow-green-900/40 hover:scale-105 transition"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <FaWhatsapp className="w-8 h-8" />
            )}
          </button>

          {/* PHONE BUTTON */}
          <button
            title="Call us"
            onClick={() => (window.location.href = `tel:${PHONE_NUMBER}`)}
            className="w-14 h-14 rounded-full flex items-center justify-center 
              bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/30 
              dark:shadow-blue-900/40 hover:scale-105 transition"
          >
            <Phone className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* MOBILE POPUP (NO BLUR) */}
      {isOpen && (
        <div className="fixed inset-0 z-[9998] md:hidden flex flex-col justify-end bg-black/40">
          <div className="bg-white dark:bg-zinc-900 rounded-t-2xl p-5 max-h-[75vh] overflow-y-auto border-t border-zinc-300 dark:border-zinc-800">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white shadow">
                  <FaWhatsapp className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-base font-semibold dark:text-white">
                    Start Chat
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Select topic or type below
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-zinc-600 dark:text-zinc-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {presets.map((p) => (
              <button
                key={p.id}
                onClick={() => sendWhatsApp(p.message)}
                className="w-full px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 mb-2 text-left hover:bg-zinc-200 dark:hover:bg-zinc-700"
              >
                <p className="text-sm font-medium dark:text-white">{p.title}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {p.message}
                </p>
              </button>
            ))}

            {/* Custom Message */}
            <textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-sm dark:text-white outline-none resize-none"
            />

            <button
              disabled={!customMessage.trim()}
              onClick={() => sendWhatsApp(customMessage)}
              className="mt-3 w-full py-3 rounded-lg bg-green-500 text-white hover:bg-green-600 disabled:opacity-40"
            >
              Send Message
            </button>
          </div>
        </div>
      )}
    </>
  );
}
