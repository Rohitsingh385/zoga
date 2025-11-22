import MagneticButton from "@/components/MagneticButton";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-400 text-xs font-bold tracking-wide uppercase mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Jharkhand&apos;s #1 Digital Agency
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-8 leading-[1.1]">
            We Engineer <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 animate-gradient-x">
              Digital Dominance
            </span>
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            From Ranchi to the world. We build authentic, high-performance
            websites & apps that drive real business growth.
          </p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <MagneticButton className="px-8 py-4 text-lg">
              Get a Free Audit
            </MagneticButton>
            <MagneticButton variant="outline" className="px-8 py-4 text-lg">
              View Case Studies
            </MagneticButton>
          </div>

          <div className="mt-12 flex items-center justify-center lg:justify-start gap-6 text-sm font-medium text-slate-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-500" /> 50+ Ranchi
              Clients
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-500" /> 98%
              Retention
            </div>
          </div>
        </div>

        <div className="relative h-[500px] hidden lg:flex items-center justify-center perspective-1000">
          <div className="relative w-[400px] h-[400px]">
            <div className="absolute inset-0 rounded-full border border-slate-200 dark:border-white/10" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-white/10">
              <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Z
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
