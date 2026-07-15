import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import heroImg from "@/assets/hero-mannequin.jpg";
import wasteImg from "@/assets/waste.jpg";
import materialImg from "@/assets/material.jpg";
import plasticImg from "@/assets/plastic.jpg";

const EASE = [0.22, 1, 0.36, 1] as const;

/* -------- Loader -------- */
function Loader({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1600);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: EASE } }}
    >
      <div className="flex flex-col items-center gap-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <Logo className="h-16" />
        </motion.div>
        <div className="h-[2px] w-20 overflow-hidden bg-black/5 rounded">
          <motion.div 
            className="h-full bg-copper"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

/* -------- Nav -------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8, ease: EASE }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md border-b border-black/5 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-16">
        <a href="#top" className="transition-opacity hover:opacity-90 flex items-center">
          <Logo className="h-11 md:h-13" />
        </a>
        
        <nav className="hidden items-center gap-8 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:flex">
          {["Problem", "Solution", "Impact", "Team", "Contact"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">
              {l}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="rounded-full bg-[#5E1930] hover:bg-[#4E1428] px-6 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-all hover:shadow-[0_8px_20px_rgba(94,25,48,0.25)] flex items-center justify-center h-10 align-middle"
        >
          Get in Touch
        </a>
      </div>
    </motion.header>
  );
}

/* -------- Hero -------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[90vh] lg:min-h-[95vh] w-full overflow-hidden pt-24 lg:pt-28 pb-10 flex items-center bg-white"
    >
      {/* Background Image Backdrop - Framed to the right and soft-blurred */}
      <motion.div
        style={{ y, scale, opacity }}
        className="absolute inset-0 z-0 select-none pointer-events-none"
      >
        <img
          src={heroImg}
          alt="Layered fabric mannequin backdrop"
          className="h-full w-full object-cover lg:object-right-bottom object-center opacity-[0.12] blur-[2px]"
          width={1280}
          height={853}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-white" />
        <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_50%,transparent,white_80%)]" />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-16 flex flex-col gap-5 md:text-left text-center">
        {/* Optical Line Balance & Line Height Tune */}
        <motion.h1
          className="font-display text-[clamp(2.2rem,5vw,4.5rem)] text-ink leading-[1.08] tracking-tight"
        >
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: EASE }}
            className="block"
          >
            Transforming Textile Waste
          </motion.span>
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.8, ease: EASE }}
            className="block text-copper font-light italic"
          >
            Into the Next Generation of
          </motion.span>
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: EASE }}
            className="block"
          >
            Sustainable Materials.
          </motion.span>
        </motion.h1>

        {/* Readability Limit (approx 60 chars per line) */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.8, ease: EASE }}
          className="mx-auto max-w-xl text-balance text-base text-muted-foreground md:mx-0 md:text-lg leading-relaxed mt-2"
        >
          Stitch Zero is a circular materials company converting discarded textile waste into
          high-performance, biodegradable alternatives to plastic. We're starting with
          retail mannequins, and building toward a future where industrial waste, not virgin resources,
          becomes the raw material of modern manufacturing.
        </motion.p>

        {/* Action Buttons: Clean Equal Height directly below Description */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease: EASE }}
          className="flex flex-wrap items-center justify-center gap-4 md:justify-start mt-3"
        >
          <a
            href="#contact"
            className="group relative overflow-hidden rounded-full bg-[#5E1930] hover:bg-[#4E1428] px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:scale-[1.02] hover:shadow-[0_12px_30px_rgba(94,25,48,0.25)] flex items-center justify-center h-12 align-middle"
          >
            Partner with Stitch Zero
          </a>
          <a
            href="#solution"
            className="group flex items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink transition hover:text-copper h-12"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 transition group-hover:border-copper">
              ↓
            </span>
            Explore Our Solution
          </a>
        </motion.div>

        {/* Ticker - Snapped cleanly to grid bottom */}
        <div className="mt-8 grid grid-cols-2 gap-6 border-t border-black/5 pt-6 text-center md:grid-cols-4 md:text-left">
          {[
            ["7.8M", "tonnes waste / yr (India)"],
            ["$3.15B", "retail display segment (2024)"],
            ["100%", "biodegradable composite"],
            ["25+", "national recognitions"],
          ].map(([k, v], i) => (
            <motion.div
              key={k}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05 + i * 0.08, duration: 0.7, ease: EASE }}
            >
              <div className="font-display text-3xl text-ink leading-tight">{k}</div>
              <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                {v}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- Marquee headline -------- */
function Marquee() {
  const words = ["Circular", "·", "Biodegradable", "·", "Engineered", "·", "Beyond Plastic", "·", "Made from Waste", "·"];
  return (
    <div className="relative border-y border-black/5 py-4 overflow-hidden bg-bone/30">
      <div className="marquee flex gap-12 whitespace-nowrap font-display text-2xl text-ink/15 uppercase tracking-widest">
        {[...words, ...words, ...words, ...words].map((w, i) => (
          <span key={i} className={i % 2 ? "text-copper/40" : ""}>{w}</span>
        ))}
      </div>
    </div>
  );
}

/* -------- Section label helper -------- */
function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center justify-center gap-4 font-mono text-xs md:text-sm uppercase tracking-[0.25em] text-muted-foreground md:justify-start">
      <span className="text-[#5E1930] font-bold">{n}</span>
      <span className="hairline w-12" />
      <span className="font-semibold">{label}</span>
    </div>
  );
}

/* -------- Problem (Clean Editorial Layout) -------- */
function Problem() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  return (
    <section id="problem" className="relative py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-6 md:px-16">
        <SectionLabel n="01" label="The Problem" />
        <h2 className="mx-auto mt-6 max-w-4xl text-center font-display md:mx-0 md:text-left text-[clamp(2.2rem,5vw,3.5rem)] text-ink leading-[1.1] text-balance">
          Two crises. One industry. <span className="text-copper font-light italic">Zero solutions, until now.</span>
        </h2>

        <div ref={ref} className="mt-16 space-y-20">
          {/* Problem Block 1 */}
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -35 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE }}
              className="space-y-6"
            >
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#5E1930] font-bold">01 / Waste Crisis</div>
              <h3 className="font-display text-2xl md:text-3xl text-ink leading-tight">A Mountain of Textile Waste</h3>
              
              <div className="flex items-baseline gap-4 border-b border-black/5 pb-4">
                <span className="font-display text-4xl md:text-5xl text-copper font-bold">7.8M</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">tonnes / year generated in India</span>
              </div>
              
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                Most of it is landfilled or burned, despite retaining real material value. The result is landfill overflow, greenhouse gas emissions, resource wastage, and a textile industry that has yet to close its own loop.
              </p>
              <p className="text-muted-foreground/80 text-xs md:text-sm italic leading-relaxed border-l-2 border-[#5E1930]/30 pl-4">
                "Both our founders witnessed India's textile waste problem firsthand, from opposite ends of the supply chain. One saw landfills near Assam piling up with fabric that never got a second life, making an impact on the lives of those who did not even create it. The other, growing up in Coimbatore, Tamil Nadu, the Manchester of South India, watched textile waste dumped straight into rivers, clogging waterways, several community depended on. Two cities, one broken system, and the shared motivation behind Stitch Zero."
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              className="aspect-[4/3] overflow-hidden rounded-2xl bg-bone/30 w-full"
            >
              <img src={wasteImg} alt="Textile waste piled up" className="h-full w-full object-cover" />
            </motion.div>
          </div>

          {/* Problem Block 2 */}
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              className="aspect-[4/3] overflow-hidden rounded-2xl bg-bone/30 w-full lg:order-1 order-2"
            >
              <img src={plasticImg} alt="Mannequin display fixtures" className="h-full w-full object-cover" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 35 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE }}
              className="space-y-6 lg:order-2 order-1"
            >
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#5E1930] font-bold">02 / Plastic Dependency</div>
              <h3 className="font-display text-2xl md:text-3xl text-ink leading-tight">A Retail Industry Built on Plastic</h3>
              
              <div className="flex items-baseline gap-4 border-b border-black/5 pb-4">
                <span className="font-display text-4xl md:text-5xl text-copper font-bold">Microplastics</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">shed throughout mannequin lifecycle</span>
              </div>
              
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                Every fashion retailer relies on plastic and fiberglass mannequins and display fixtures that remain in circulation for years without ever truly breaking down, shed microplastics throughout their lifecycle, and eventually end up in landfills.
              </p>
              <ul className="grid grid-cols-2 gap-4 text-xs md:text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-[#5E1930] font-bold">✓</span> No biodegradable cycle
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#5E1930] font-bold">✓</span> Impossible to recycle
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------- Solution / How it works (Clean flow) -------- */
function Solution() {
  const steps = [
    { k: "Collect", v: "Textile waste is sourced directly from manufacturers and garment units." },
    { k: "Process", v: "The waste is sorted, cleaned, shredded, and converted into textile pulp." },
    { k: "Engineer", v: "Our proprietary formulation combines the pulp with natural binders to create a durable, high-performance composite." },
    { k: "Mold", v: "The composite is shaped into finished, market-ready products." },
  ];
  return (
    <section id="solution" className="relative py-20 md:py-28 section-alt">
      <div className="mx-auto max-w-7xl px-6 md:px-16">
        <SectionLabel n="02" label="Our Solution" />
        <h2 className="mx-auto mt-6 max-w-4xl text-center font-display md:mx-0 md:text-left text-[clamp(2.2rem,5vw,3.5rem)] text-ink leading-[1.1] text-balance">
          We turn one industry's waste into another's <span className="text-copper">infrastructure.</span>
        </h2>
        
        <div className="grid gap-12 lg:grid-cols-2 mt-16 items-center">
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              Stitch Zero converts discarded textile waste into a proprietary biodegradable composite material, engineered to replace plastic across multiple applications.
            </p>
            <div className="border-t border-black/5 pt-8 space-y-6">
              {steps.map((s, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <span className="font-mono text-xs font-bold text-[#5E1930] w-6 shrink-0 mt-1">0{i+1}</span>
                  <div>
                    <h4 className="font-display text-lg text-ink font-semibold">{s.k}</h4>
                    <p className="text-muted-foreground text-xs md:text-sm mt-1 leading-relaxed">{s.v}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-bone/35 max-h-[560px] w-full">
            <img src={materialImg} alt="Biodegradable composite material production" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------- First Product -------- */
function FirstProduct() {
  const features = [
    "Fully biodegradable",
    "Free of microplastic pollution",
    "Lightweight and commercially durable",
    "Aesthetically premium for retail",
    "Competitively priced vs plastic",
    "~20 kg textile waste per unit",
  ];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  return (
    <section className="relative py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-6 md:px-16">
        <SectionLabel n="03" label="First Product" />
        <div ref={ref} className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
            className="space-y-6"
          >
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] text-ink leading-tight text-balance">
              Biodegradable Retail <span className="text-copper">Mannequins</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              Each Stitch Zero mannequin uses approximately 20 kg of textile waste, offering a high-performance visual display that does not force a trade-off between environmental responsibility and commercial performance.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-black/5 pt-6">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-3 text-xs md:text-sm text-foreground">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald/10 text-emerald text-[10px] font-bold">✓</span>
                  {f}
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="relative mx-auto aspect-[3/4] w-full max-w-[440px] overflow-hidden rounded-2xl bg-bone/30"
          >
            <img src={heroImg} alt="Biodegradable mannequin" className="h-full w-full object-cover" loading="lazy" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* -------- Innovation -------- */
function Innovation() {
  const products = ["Retail Mannequins", "Sustainable Packaging", "Furniture", "Interior Decor", "Engineered Boards", "Retail Fixtures"];
  return (
    <section className="relative overflow-hidden py-20 md:py-28 section-alt">
      <div className="mx-auto max-w-7xl px-6 md:px-16">
        <SectionLabel n="04" label="The Innovation" />
        <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div className="space-y-6">
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] text-ink leading-tight text-balance">
              The real innovation isn't the mannequin. It's the{" "}
              <span className="text-copper">material platform</span> underneath it.
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              Most textile recycling downcycles waste into lower-value products. Stitch Zero does the opposite: we've engineered a high-value composite platform whose structural, mechanical, and aesthetic properties can be tuned for entirely different industries, simply by adjusting the formulation.
            </p>
            <div className="flex flex-wrap gap-2 pt-4">
              {products.map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-copper/15 bg-white px-4 py-2 font-mono text-[9px] uppercase tracking-[0.15em] text-copper shadow-sm"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[400px]">
            <div className="absolute inset-0 rounded-full border border-black/5" />
            <div className="absolute inset-6 rounded-full border border-black/5" />
            <div className="absolute inset-12 rounded-full border border-black/5" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              {products.map((p, i) => {
                const a = (i / products.length) * Math.PI * 2;
                const r = 44;
                const x = 50 + Math.cos(a) * r;
                const y = 50 + Math.sin(a) * r;
                return (
                  <div
                    key={p}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                      className="rounded-full bg-white border border-black/5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.15em] whitespace-nowrap text-ink"
                    >
                      {p}
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
            <div className="absolute inset-[24%] rounded-full overflow-hidden border border-black/5 shadow-sm">
              <img src={materialImg} alt="Composite material" className="h-full w-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------- Why We're Different (Minimalist Table) -------- */
function Compare() {
  const rows = [
    { name: "Plastic mannequin manufacturers", traditional: "Continue relying on virgin plastics", zero: "Replace plastics entirely with waste-derived composites" },
    { name: "Conventional textile recyclers", traditional: "Downcycle into low-value products", zero: "Upcycle into a high-value engineered platform" },
    { name: "Bioplastic companies", traditional: "Depend on virgin agricultural feedstocks", zero: "Depend entirely on existing waste streams" },
  ];
  return (
    <section className="relative py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-6 md:px-16">
        <SectionLabel n="05" label="Why We're Different" />
        <h2 className="mx-auto mt-6 max-w-4xl text-center font-display md:mx-0 md:text-left text-[clamp(2.2rem,5vw,3.5rem)] text-ink leading-tight text-balance">
          Tackling textile waste and plastic dependency as <span className="text-copper font-light italic">one unified problem.</span>
        </h2>
        
        <div className="mt-16 border-t border-black/10 overflow-x-auto">
          <table className="w-full text-left min-w-[700px] border-collapse">
            <thead>
              <tr className="border-b border-black/5">
                <th className="py-5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground w-1/3">Alternative Approaches</th>
                <th className="py-5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground w-1/3">Their Model</th>
                <th className="py-5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#5E1930] font-bold w-1/3">Stitch Zero Approach</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-black/5 hover:bg-bone/5 transition-colors">
                  <td className="py-6 font-display text-base md:text-lg text-ink pr-6 font-medium">{row.name}</td>
                  <td className="py-6 text-xs md:text-sm text-muted-foreground leading-relaxed pr-6 line-through decoration-copper/20">{row.traditional}</td>
                  <td className="py-6 text-xs md:text-sm text-foreground leading-relaxed font-medium pl-3 border-l border-[#5E1930]/10 bg-[#5E1930]/[0.01]">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#5E1930] mr-2 align-middle" />
                    {row.zero}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* -------- Market numbers -------- */
function Market() {
  const items = [
    { n: 3.15, s: "B USD", label: "Retail and fashion display segment (2024)", prefix: "$" },
    { n: 6.5, s: "B USD", label: "Projected market size by 2030", prefix: "$" },
    { n: 7.8, s: "M tonnes", label: "Textile waste generated annually in India", prefix: "" },
  ];
  return (
    <section id="impact" className="relative py-20 md:py-28 section-alt">
      <div className="mx-auto max-w-7xl px-6 md:px-16">
        <SectionLabel n="06" label="Market Opportunity" />
        <h2 className="mx-auto mt-6 max-w-4xl text-center font-display md:mx-0 md:text-left text-[clamp(2.2rem,5vw,3.5rem)] text-ink leading-tight text-balance">
          Accelerating demand in a <span className="text-copper">multi-billion dollar market.</span>
        </h2>
        
        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {items.map((it, i) => (
            <div key={i} className="space-y-3 md:text-left text-center">
              <div className="font-display text-[clamp(3rem,6vw,4.5rem)] leading-none text-ink">
                <Counter to={it.n} prefix={it.prefix} />
                <span className="text-copper text-2xl md:text-3xl ml-1">{it.s}</span>
              </div>
              <div className="mx-auto max-w-xs text-xs md:text-sm text-muted-foreground md:mx-0 leading-relaxed">{it.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- Beyond Mannequins -------- */
function BeyondMannequins() {
  const applications = [
    { icon: "🦿", title: "Orthotics & Prosthetics", desc: "Affordable, customized orthotics and prosthetics with reduced material costs, developed in partnership with Project Aavaran." },
    { icon: "📦", title: "Packaging & Protective Materials", desc: "Biodegradable boxes, inserts, trays, and protective alternatives to thermocol and styrofoam." },
    { icon: "🏭", title: "Industrial & Specialty Applications", desc: "Eco-friendly insulation panels and industrial packaging substitutes for styrofoam and MDF boards." },
    { icon: "🏠", title: "Home & Lifestyle Products", desc: "Planters, organizers, decorative figures, and home decor items made from textile waste." },
  ];
  return (
    <section className="relative py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-6 md:px-16">
        <SectionLabel n="07" label="Beyond Mannequins" />
        <h2 className="mx-auto mt-6 max-w-4xl text-center font-display md:mx-0 md:text-left text-[clamp(2.2rem,5vw,3.5rem)] text-ink leading-tight text-balance">
          This innovation can take <span className="text-copper">more forms</span> than mannequins.
        </h2>
        
        <div className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2">
          {applications.map((app, i) => (
            <div key={i} className="flex gap-6 items-start border-t border-black/5 pt-6">
              <span className="text-3xl shrink-0 filter grayscale opacity-90">{app.icon}</span>
              <div className="space-y-2">
                <h3 className="font-display text-lg text-ink font-semibold">{app.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{app.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- Impact -------- */
function Impact() {
  const pillars = [
    {
      title: "Environmental",
      border: "border-emerald/40",
      items: ["Textile waste diverted from landfills", "Plastic mannequins displaced from the supply chain", "Reduced microplastic pollution", "Lower carbon emissions", "Reduced dependency on virgin plastic"],
    },
    {
      title: "Economic",
      border: "border-copper/40",
      items: ["Converts discarded material into commercial value", "Lowers raw material costs for adopters", "Enables sustainable procurement at scale", "Strengthens circular manufacturing infrastructure"],
    },
    {
      title: "Social",
      border: "border-[#5E1930]/40",
      items: ["Supports cleaner, healthier communities", "Encourages responsible production practices", "Strengthens local manufacturing ecosystems", "Drives broader circular economy adoption"],
    },
  ];
  return (
    <section className="relative py-20 md:py-28 section-alt">
      <div className="mx-auto max-w-7xl px-6 md:px-16">
        <SectionLabel n="08" label="Impact" />
        <h2 className="mx-auto mt-6 max-w-4xl text-center font-display md:mx-0 md:text-left text-[clamp(2.2rem,5vw,3.5rem)] text-ink leading-tight text-balance">
          Every mannequin cascades into a wider <span className="text-[#5E1930] font-light italic">systemic effect.</span>
        </h2>
        
        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {pillars.map((p, i) => (
            <div key={i} className={`border-l-2 ${p.border} pl-6 space-y-4`}>
              <h3 className="font-display text-xl text-ink font-bold tracking-tight">{p.title}</h3>
              <ul className="space-y-3">
                {p.items.map((item, j) => (
                  <li key={j} className="text-xs md:text-sm text-muted-foreground leading-relaxed relative pl-3">
                    <span className="absolute left-0 top-[0.6em] h-1.5 w-1.5 rounded-full bg-black/25" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- UN SDGs -------- */
function SDGs() {
  const goals = [
    { n: 6, title: "Clean Water & Sanitation", color: "#26BDE2", desc: "Reducing the water pollution and contamination linked to textile waste dumping and burning." },
    { n: 8, title: "Decent Work & Growth", color: "#A21942", desc: "Building a manufacturing model that supports local jobs and circular supply chains." },
    { n: 12, title: "Responsible Consumption", color: "#BF8B2E", desc: "Turning discarded textile waste into a valuable industrial input instead of landfill or ash." },
    { n: 13, title: "Climate Action", color: "#3F7E44", desc: "Reducing emissions associated with virgin plastic production and textile waste incineration." },
  ];
  return (
    <section className="relative py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-6 md:px-16">
        <SectionLabel n="09" label="UN Sustainable Development Goals" />
        <h2 className="mx-auto mt-6 max-w-4xl text-center font-display md:mx-0 md:text-left text-[clamp(2.2rem,5vw,3.5rem)] text-ink leading-tight text-balance">
          Aligned with the <span className="text-[#5E1930]">UN Sustainable Development Goals</span>
        </h2>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {goals.map((g, i) => (
            <div key={i} className="flex flex-col border-t border-black/10 pt-6 space-y-3">
              <div className="flex items-center gap-3">
                <span 
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-display text-base text-white font-bold"
                  style={{ backgroundColor: g.color }}
                >
                  {g.n}
                </span>
                <span className="font-display text-sm text-ink font-semibold leading-tight">{g.title}</span>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- Roadmap -------- */
function Roadmap() {
  const completed = [
    "Extensive market and material research",
    "Industry analysis and business model validation",
    "Stakeholder conversations with retailers and sustainability professionals",
    "Development of proprietary composite concept",
    "Dispatch of first-phase pilot mannequins for durability and strength testing",
  ];
  const next = [
    "Evaluation of durability and strength test results",
    "Composite formulation optimization",
    "Additional pilot deployments with retail partners",
    "Commercial validation and scale-up",
  ];
  return (
    <section className="relative py-20 md:py-28 section-alt">
      <div className="mx-auto max-w-7xl px-6 md:px-16">
        <SectionLabel n="10" label="Where We Are Today" />
        <h2 className="mx-auto mt-6 max-w-4xl text-center font-display md:mx-0 md:text-left text-[clamp(2.2rem,5vw,3.5rem)] text-ink leading-tight text-balance">
          From concept validation into <span className="text-copper">active pilot testing.</span>
        </h2>
        
        <div className="mt-16 grid gap-12 lg:grid-cols-2 relative pl-6 lg:pl-0">
          <div className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-[1px] bg-black/10 -translate-x-1/2 hidden lg:block" />
          
          <div className="space-y-6 lg:pr-12 text-left">
            <div className="flex items-center gap-3 justify-start">
              <span className="h-2 w-2 rounded-full bg-emerald" />
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-emerald font-bold">Completed Phase</h3>
            </div>
            <ul className="space-y-4">
              {completed.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-foreground">
                  <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald/10 text-emerald text-[9px] font-bold">✓</span>
                  <span className="text-muted-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-6 lg:pl-12 text-left">
            <div className="flex items-center gap-3 justify-start">
              <span className="h-2 w-2 rounded-full bg-copper" />
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-copper font-bold">Next Phase</h3>
            </div>
            <ul className="space-y-4">
              {next.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-foreground">
                  <span className="mt-1.5 flex h-2 w-2 shrink-0 rounded-full bg-copper" />
                  <span className="text-muted-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------- Recognition -------- */
function Recognition() {
  const institutions = [
    "SIIB", "IIT Delhi", "CCI", "IIM Lucknow", "TETR", "MDI",
    "Sharda University", "IIM Calcutta", "IIM Bangalore", "IIT Roorkee",
    "IIT Madras", "SSCBS", "IIT Patna", "IIT Guwahati", "IIIT Kanpur",
    "IIT Kharagpur", "Ramjas College", "BITS Pilani", "IIIT Delhi", "Katha VC",
  ];
  const incubators = [
    "Waiganga", "NSRCEL", "Freeflow Ventures", "Balavikasa",
    "Startupvisors", "Trec Step", "Amet Ceii",
  ];
  const highlights = [
    { t: "25+ National & International Recognitions", s: "Across premier IITs and IIMs" },
    { t: "Mentored by Climate VCs", s: "Sustainability and climate investors" },
    { t: "8+ Incubator Shortlists", s: "Including NSRCEL at IIM Bangalore" },
  ];
  return (
    <section className="relative py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-6 md:px-16">
        <SectionLabel n="11" label="Recognition" />
        <h2 className="mx-auto mt-6 max-w-4xl text-center font-display md:mx-0 md:text-left text-[clamp(2.2rem,5vw,3.5rem)] text-ink leading-tight text-balance">
          Shortlisted and selected by <span className="text-[#5E1930]">industry leaders.</span>
        </h2>

        {/* Highlights - pure borderless columns aligned to grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-3 border-b border-black/5 pb-12 text-center md:text-left">
          {highlights.map((c, i) => (
            <div key={i} className="space-y-2">
              <div className="font-display text-lg text-ink font-bold leading-tight">{c.t}</div>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{c.s}</p>
            </div>
          ))}
        </div>

        {/* Institution logos carousel */}
        <div className="mt-12">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-center mb-6">
            Recognised at 25+ platforms across
          </div>
          <div className="relative overflow-hidden rounded-2xl bg-bone/20 py-4 border border-black/5">
            <div className="logo-scroll flex gap-8 whitespace-nowrap">
              {[...institutions, ...institutions].map((name, i) => (
                <div
                  key={i}
                  className="flex shrink-0 items-center gap-2 rounded-full bg-white border border-black/5 px-5 py-2 font-mono text-[9px] uppercase tracking-[0.1em] text-ink shadow-[0_1px_3px_rgba(0,0,0,0.01)]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-copper/70" />
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Incubator logos carousel */}
        <div className="mt-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-center mb-6">
            Shortlisted for pitching to 8+ incubators
          </div>
          <div className="relative overflow-hidden rounded-2xl bg-bone/20 py-4 border border-black/5">
            <div className="logo-scroll flex gap-8 whitespace-nowrap" style={{ animationDirection: "reverse", animationDuration: "24s" }}>
              {[...incubators, ...incubators, ...incubators].map((name, i) => (
                <div
                  key={i}
                  className="flex shrink-0 items-center gap-2 rounded-full bg-white border border-[#5E1930]/15 px-5 py-2 font-mono text-[9px] uppercase tracking-[0.1em] text-[#5E1930] shadow-[0_1px_3px_rgba(0,0,0,0.01)]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#5E1930]/80" />
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------- Team -------- */
function Team() {
  const team = [
    { n: "Hemavarshini S", r: "Co-founder", scope: "Business Strategy, Partnerships, Fundraising", email: "varshinishema@gmail.com", phone: "+91 9789777125" },
    { n: "Ayush Sinha", r: "Co-founder", scope: "Material Innovation, Product Development, Manufacturing", email: "sinhaayush643@gmail.com", phone: "+91 9318355472" },
  ];
  return (
    <section id="team" className="relative py-20 md:py-28 section-alt">
      <div className="mx-auto max-w-7xl px-6 md:px-16">
        <SectionLabel n="12" label="The Team" />
        <h2 className="mx-auto mt-6 max-w-3xl text-center font-display md:mx-0 md:text-left text-[clamp(2.2rem,5vw,3.5rem)] text-ink leading-[1.1]">
          Founded and built by two undergraduate students at <span className="text-[#5E1930]">SRCC, University of Delhi.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-muted-foreground md:mx-0 md:text-left leading-relaxed text-sm md:text-base">
          Between them, they lead the company's business strategy, partnerships, and fundraising alongside material innovation, product development, and manufacturing optimization. Stitch Zero has earned over INR 1 lakh through grants, prizes, and early product deployment, proving the market pays for what we build. We scale by outsourcing collection and transformation to trusted aggregators while deepening relationships with major fashion display and visual merchandising brands.
        </p>
        
        <div className="mt-16 grid gap-12 md:grid-cols-2 border-t border-black/10 pt-12">
          {team.map((t, i) => (
            <div key={i} className="space-y-4 text-center md:text-left">
              <div className="space-y-1">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-copper font-medium">{t.r}</span>
                <h3 className="font-display text-2xl md:text-3xl text-ink font-bold tracking-tight">{t.n}</h3>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed max-w-md mx-auto md:mx-0">{t.scope}</p>
              <div className="flex flex-col gap-1 text-xs md:text-sm pt-4 border-t border-black/5 max-w-md mx-auto md:mx-0">
                <a href={`mailto:${t.email}`} className="text-[#5E1930] hover:underline font-medium">{t.email}</a>
                <span className="text-muted-foreground">{t.phone}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- CTA / Contact -------- */
function CTA() {
  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-36 bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_50%,rgba(94,25,48,0.06),transparent_70%)] pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-16 text-center">
        <h2 className="mx-auto max-w-4xl font-display text-[clamp(2.4rem,6vw,4.5rem)] text-ink leading-tight text-balance">
          The future of manufacturing is <span className="text-shimmer">circular.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-muted-foreground leading-relaxed text-sm md:text-base">
          Interested in piloting Stitch Zero mannequins, exploring a partnership,
          or learning more about our composite technology? Contact us.
        </p>
        
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:sinhaayush643@gmail.com"
            className="rounded-full bg-[#5E1930] hover:bg-[#4E1428] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:scale-[1.02] hover:shadow-[0_12px_30px_rgba(94,25,48,0.3)] flex items-center justify-center h-12"
          >
            Partner with Stitch Zero
          </a>
          <a
            href="#solution"
            className="rounded-full border border-black/10 bg-white px-8 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink transition hover:border-[#5E1930]/30 hover:shadow-sm flex items-center justify-center h-12"
          >
            Explore the Material Platform
          </a>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 max-w-2xl mx-auto border-t border-black/5 pt-12 text-center md:text-left">
          <div className="space-y-1">
            <h4 className="font-display text-lg md:text-xl text-ink font-bold">Ayush Sinha</h4>
            <a href="mailto:sinhaayush643@gmail.com" className="block text-sm text-[#5E1930] hover:underline">sinhaayush643@gmail.com</a>
            <div className="text-xs md:text-sm text-muted-foreground">+91 9318355472</div>
          </div>
          <div className="space-y-1 border-t border-black/5 pt-8 md:border-t-0 md:pt-0 md:border-l md:pl-12 border-black/5">
            <h4 className="font-display text-lg md:text-xl text-ink font-bold">Hemavarshini S</h4>
            <a href="mailto:varshinishema@gmail.com" className="block text-sm text-[#5E1930] hover:underline">varshinishema@gmail.com</a>
            <div className="text-xs md:text-sm text-muted-foreground">+91 9789777125</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------- Footer -------- */
function Footer() {
  return (
    <footer className="border-t border-black/5 py-12 bg-bone/20">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center md:px-16">
        <div>
          <Logo className="h-10" />
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          © {new Date().getFullYear()} Stitch Zero. Circular Materials Company.
        </div>
        <div className="flex gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <a href="mailto:hello@stitchzero.com" className="hover:text-[#5E1930] transition-colors">Contact</a>
          <a href="#solution" className="hover:text-[#5E1930] transition-colors">Platform</a>
          <a href="#team" className="hover:text-[#5E1930] transition-colors">Team</a>
        </div>
      </div>
    </footer>
  );
}

/* -------- Counter Helper -------- */
function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();
    const dur = 1800;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  const isDec = to % 1 !== 0;
  return <span ref={ref}>{prefix}{isDec ? v.toFixed(2) : Math.round(v).toLocaleString()}{suffix}</span>;
}

/* -------- Main Landing -------- */
export default function Landing() {
  const [loading, setLoading] = useState(true);
  return (
    <main className="relative min-h-screen bg-white text-foreground selection:bg-[#5E1930] selection:text-white">
      <AnimatePresence>
        {loading && <Loader key="loader" onDone={() => setLoading(false)} />}
      </AnimatePresence>
      <Nav />
      <div className="relative z-10">
        <Hero />
        <Marquee />
        <Problem />
        <Solution />
        <FirstProduct />
        <Innovation />
        <Compare />
        <Market />
        <BeyondMannequins />
        <Impact />
        <SDGs />
        <Roadmap />
        <Recognition />
        <Team />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}