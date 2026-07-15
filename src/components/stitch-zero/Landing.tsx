import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence, useInView } from "framer-motion";
import heroImg from "@/assets/hero-mannequin.jpg";
import wasteImg from "@/assets/waste.jpg";
import materialImg from "@/assets/material.jpg";
import plasticImg from "@/assets/plastic.jpg";

const EASE = [0.22, 1, 0.36, 1] as const;

/* -------- Loader -------- */
function Loader({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2100);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.9, ease: EASE } }}
    >
      <div className="relative flex flex-col items-center gap-6">
        <svg width="120" height="120" viewBox="0 0 120 120" className="text-bone">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.line
              key={i}
              x1={60}
              y1={60}
              x2={60 + Math.cos((i / 12) * Math.PI * 2) * 50}
              y2={60 + Math.sin((i / 12) * Math.PI * 2) * 50}
              stroke="currentColor"
              strokeWidth={0.8}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.9 }}
              transition={{ delay: i * 0.06, duration: 0.9, ease: EASE }}
            />
          ))}
          <motion.circle
            cx={60}
            cy={60}
            r={30}
            fill="none"
            stroke="var(--copper)"
            strokeWidth={1}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.6, duration: 1, ease: EASE }}
          />
        </svg>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6, ease: EASE }}
          className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground"
        >
          Stitch Zero — Weaving Futures
        </motion.div>
      </div>
    </motion.div>
  );
}

/* -------- Cursor -------- */
function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 300, damping: 30 });
  const sy = useSpring(y, { stiffness: 300, damping: 30 });
  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);
  return (
    <motion.div
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden md:block"
    >
      <div className="-translate-x-1/2 -translate-y-1/2">
        <div className="h-6 w-6 rounded-full border border-copper/60 mix-blend-difference" />
      </div>
    </motion.div>
  );
}

/* -------- Ambient fibers -------- */
function Fibers() {
  const items = Array.from({ length: 22 });
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {items.map((_, i) => {
        const left = (i * 47) % 100;
        const dur = 14 + ((i * 7) % 18);
        const delay = (i * 1.3) % 12;
        const w = 1 + ((i * 3) % 3);
        const h = 40 + ((i * 11) % 90);
        return (
          <span
            key={i}
            className="fiber absolute block rounded-full opacity-60"
            style={{
              left: `${left}%`,
              width: w,
              height: h,
              animationDuration: `${dur}s`,
              animationDelay: `-${delay}s`,
              background: `linear-gradient(180deg, transparent, ${i % 3 === 0 ? "var(--copper)" : i % 3 === 1 ? "var(--beige)" : "var(--emerald)"}, transparent)`,
              filter: "blur(0.3px)",
            }}
          />
        );
      })}
    </div>
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
      transition={{ delay: 0.3, duration: 0.8, ease: EASE }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-6"}`}
    >
      <div
        className={`mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-10 rounded-full backdrop-blur-xl backdrop-saturate-150 border transition-all duration-500 ${
          scrolled
            ? "bg-ink/70 border-border/60 py-2 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)]"
            : "bg-ink/40 border-border/30 py-3"
        }`}
      >
        <a href="#top" className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.32em]">
          <span className="inline-block h-2 w-2 rounded-full bg-copper shadow-[0_0_12px_var(--copper)]" />
          Stitch <span className="text-copper">Zero</span>
        </a>
        <nav className="hidden items-center gap-8 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground md:flex">
          {["Problem", "Platform", "Impact", "Team"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="transition-colors hover:text-bone">
              {l}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="glass rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] transition hover:bg-copper hover:text-ink"
        >
          Partner ↗
        </a>
      </div>
    </motion.header>
  );
}

/* -------- Hero -------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 260]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [6, -6]), { stiffness: 80, damping: 20 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-8, 8]), { stiffness: 80, damping: 20 });

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        my.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      className="relative min-h-[100svh] w-full overflow-hidden pt-32 grain aurora"
    >
      {/* Background image */}
      <motion.div
        style={{ y, scale, opacity }}
        className="absolute inset-0 z-0"
      >
        <img
          src={heroImg}
          alt="Sculptural biodegradable mannequin formed from compressed textile fibers"
          className="h-full w-full object-cover opacity-70"
          width={1280}
          height={1600}
        />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_40%,transparent,var(--background)_90%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
      </motion.div>

      <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col gap-10 px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: EASE }}
          className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground"
        >
          <span className="inline-block h-px w-8 bg-copper" />
          <span>Circular Materials · Est. Coimbatore</span>
        </motion.div>

        <motion.h1
          style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
          className="font-display text-[clamp(3.4rem,10vw,10.5rem)] font-[300] text-bone"
        >
          {["Turning Waste", "Into Worth."].map((line, i) => (
            <motion.span
              key={i}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.15, duration: 1.1, ease: EASE }}
              className="block overflow-hidden"
            >
              <span className="inline-block">
                {line}
              </span>
            </motion.span>
          ))}
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 1.1, ease: EASE }}
            className="block overflow-hidden italic text-copper/90"
          >
            <span className="inline-block font-[400]">Engineering the future</span>
          </motion.span>
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.05, duration: 1.1, ease: EASE }}
            className="block overflow-hidden"
          >
            <span className="inline-block">beyond plastic.</span>
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.9, ease: EASE }}
          className="max-w-xl text-balance text-lg text-muted-foreground md:text-xl"
        >
          A circular materials company converting discarded textile waste into
          high-performance, biodegradable alternatives to plastic — starting with
          retail mannequins.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.9, ease: EASE }}
          className="flex flex-wrap items-center gap-4"
        >
          <a
            href="#contact"
            className="group relative overflow-hidden rounded-full bg-bone px-7 py-4 font-mono text-[11px] uppercase tracking-[0.3em] text-ink transition-all hover:scale-[1.03] hover:shadow-[0_20px_50px_-10px_var(--copper)]"
          >
            <span className="relative z-10">Partner with Stitch Zero →</span>
          </a>
          <a
            href="#platform"
            className="group flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-bone transition hover:text-copper"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-bone/25 transition group-hover:border-copper">
              ↓
            </span>
            Explore the Platform
          </a>
        </motion.div>

        {/* Ticker */}
        <div className="mt-16 grid grid-cols-2 gap-6 border-t border-border/40 pt-8 md:grid-cols-4">
          {[
            ["7.8M", "tonnes textile waste / yr in India"],
            ["≈20 kg", "waste per mannequin"],
            ["100%", "biodegradable composite"],
            ["25+", "national platforms recognised"],
          ].map(([k, v], i) => (
            <motion.div
              key={k}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 + i * 0.1, duration: 0.7, ease: EASE }}
            >
              <div className="font-display text-3xl text-bone md:text-4xl">{k}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                {v}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-x-0 bottom-6 z-10 flex justify-center font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground"
      >
        Scroll — the transformation begins
      </motion.div>
    </section>
  );
}

/* -------- Marquee headline -------- */
function Marquee() {
  const words = ["Circular", "·", "Biodegradable", "·", "Engineered", "·", "Beyond Plastic", "·", "Made from Waste", "·"];
  return (
    <div className="relative border-y border-border/40 py-8 overflow-hidden">
      <div className="marquee flex gap-12 whitespace-nowrap font-display text-5xl italic text-bone/70 md:text-7xl">
        {[...words, ...words, ...words, ...words].map((w, i) => (
          <span key={i} className={i % 2 ? "text-copper/70 not-italic" : ""}>{w}</span>
        ))}
      </div>
    </div>
  );
}

/* -------- Problem -------- */
function Problem() {
  return (
    <section id="problem" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel n="01" label="The Problem" />
        <h2 className="mt-8 max-w-4xl font-display text-[clamp(2.4rem,6vw,6rem)] font-[300] text-balance">
          Two industries. <span className="text-copper italic">One waste problem.</span>{" "}
          <span className="opacity-60">Zero real solution.</span>
        </h2>

        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          <PanelCard
            img={wasteImg}
            eyebrow="A Mountain of Textile Waste"
            stat="7.8M"
            statLabel="tonnes / year, India"
            body="Most is landfilled or burned — despite retaining real material value. Landfill overflow, greenhouse gases, and a textile industry that has yet to close its loop."
          />
          <PanelCard
            img={plasticImg}
            eyebrow="A Retail Industry Built on Plastic"
            stat="Microplastics"
            statLabel="shed for years, un-recyclable"
            body="Plastic and fiberglass mannequins remain in circulation for years, shed microplastics throughout their lifecycle, and eventually end up exactly where textile waste does."
          />
        </div>
      </div>
    </section>
  );
}

function PanelCard({ img, eyebrow, stat, statLabel, body }: { img: string; eyebrow: string; stat: string; statLabel: string; body: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: EASE }}
      className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <motion.img
          src={img}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105"
          initial={{ scale: 1.15 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 1.4, ease: EASE }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
      </div>
      <div className="relative -mt-24 p-8 md:p-10">
        <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-copper">{eyebrow}</div>
        <div className="mt-6 flex items-baseline gap-4">
          <span className="font-display text-6xl md:text-7xl">{stat}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{statLabel}</span>
        </div>
        <p className="mt-6 max-w-md text-muted-foreground">{body}</p>
      </div>
    </motion.article>
  );
}

/* -------- Section label helper -------- */
function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
      <span className="text-copper">{n}</span>
      <span className="hairline w-16" />
      <span>{label}</span>
    </div>
  );
}

/* -------- How it works -------- */
function Process() {
  const steps = [
    { k: "Collect", v: "Sourced from manufacturers and garment units." },
    { k: "Sort", v: "Segregated by fibre content and colour family." },
    { k: "Shred", v: "Reduced to a clean, workable textile pulp." },
    { k: "Engineer", v: "Bound with proprietary natural composite chemistry." },
    { k: "Mold", v: "Shaped into commercial-grade forms and fixtures." },
    { k: "Deploy", v: "Delivered to retail. Fully biodegradable at end-of-life." },
  ];
  return (
    <section id="platform" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel n="02" label="How it works" />
        <h2 className="mt-8 max-w-4xl font-display text-[clamp(2.4rem,6vw,6rem)] font-[300] text-balance">
          One industry's waste, becomes another's <span className="italic text-copper">infrastructure.</span>
        </h2>
        <div className="mt-24 relative">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block" />
          <ol className="grid gap-10 md:grid-cols-6">
            {steps.map((s, i) => (
              <motion.li
                key={s.k}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
                className="relative"
              >
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full glass">
                  <span className="font-mono text-xs text-copper">0{i + 1}</span>
                </div>
                <div className="mt-6 font-display text-2xl">{s.k}</div>
                <p className="mt-2 text-sm text-muted-foreground">{s.v}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* -------- Material Platform (orbit) -------- */
function Platform() {
  const products = ["Mannequins", "Furniture", "Packaging", "Retail Displays", "Interior Panels", "Engineered Boards"];
  return (
    <section className="relative overflow-hidden py-32 md:py-48">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel n="03" label="Material Platform" />
        <div className="mt-8 grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <h2 className="font-display text-[clamp(2.4rem,6vw,5.5rem)] font-[300] text-balance">
              We're not building <span className="italic opacity-60">a product.</span>{" "}
              We're building a <span className="text-copper">materials platform.</span>
            </h2>
            <p className="mt-8 max-w-lg text-muted-foreground">
              Most textile recycling downcycles waste into lower-value products.
              We do the opposite — a high-value composite whose structural,
              mechanical, and aesthetic properties can be tuned across
              industries by adjusting the formulation.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-3 text-sm md:grid-cols-3">
              {products.map((p, i) => (
                <motion.li
                  key={p}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.6, ease: EASE }}
                  className="glass rounded-full px-4 py-2 text-center font-mono text-[10px] uppercase tracking-[0.25em]"
                >
                  {p}
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[560px]">
            <div className="absolute inset-0 rounded-full border border-border/40" />
            <div className="absolute inset-6 rounded-full border border-border/30" />
            <div className="absolute inset-14 rounded-full border border-border/20" />
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
                      className="glass rounded-full px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.28em] whitespace-nowrap"
                    >
                      {p}
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
            <div className="absolute inset-1/4 rounded-full overflow-hidden glow-copper float-y">
              <img src={materialImg} alt="Composite material" className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-copper/20 mix-blend-overlay" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------- Comparison battlefield -------- */
function Compare() {
  const rows = [
    { l: "Plastic manufacturers", r: "Stitch Zero", label: "Feedstock", ll: "Virgin plastics", rr: "Textile waste composites" },
    { l: "Conventional recyclers", r: "Stitch Zero", label: "Value model", ll: "Downcycle to low-value", rr: "Upcycle to engineered platform" },
    { l: "Bioplastic companies", r: "Stitch Zero", label: "Inputs", ll: "Virgin agricultural feedstock", rr: "Existing waste streams" },
  ];
  return (
    <section className="relative py-32 md:py-48">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel n="04" label="Why we're different" />
        <h2 className="mt-8 max-w-4xl font-display text-[clamp(2.4rem,6vw,5.5rem)] font-[300] text-balance">
          The only approach tackling textile waste and plastic dependency as <span className="italic text-copper">one problem.</span>
        </h2>
        <div className="mt-16 space-y-3">
          {rows.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
              className="grid grid-cols-1 gap-3 rounded-3xl border border-border/60 p-6 md:grid-cols-[1fr_auto_1fr] md:gap-8 md:p-8"
            >
              <div className="opacity-50">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{r.l}</div>
                <div className="mt-2 font-display text-2xl line-through decoration-copper/40 decoration-1">{r.ll}</div>
              </div>
              <div className="hidden self-center font-mono text-[10px] uppercase tracking-[0.3em] text-copper md:block">
                {r.label} →
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-copper">{r.r}</div>
                <div className="mt-2 font-display text-2xl text-bone">{r.rr}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- Market numbers -------- */
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
  return <span ref={ref}>{prefix}{isDec ? v.toFixed(1) : Math.round(v).toLocaleString()}{suffix}</span>;
}

function Market() {
  const items = [
    { n: 7.8, s: "M tonnes", label: "Textile waste generated in India annually" },
    { n: 2, s: "T USD", label: "India's projected retail market by 2035" },
    { n: 350, s: "B USD", label: "Textile & apparel market by 2030" },
  ];
  return (
    <section id="impact" className="relative py-32 md:py-48 aurora">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel n="05" label="Market opportunity" />
        <div className="mt-16 grid gap-16 md:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: EASE }}
            >
              <div className="font-display text-[clamp(3.5rem,10vw,9rem)] font-[300] leading-none">
                <Counter to={it.n} />
                <span className="text-copper">{it.s}</span>
              </div>
              <div className="mt-6 max-w-xs text-sm text-muted-foreground">{it.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- Impact flow -------- */
function Impact() {
  const nodes = ["Landfill diverted", "Cleaner air", "Lower carbon", "Less plastic", "Circular economy"];
  return (
    <section className="relative py-32 md:py-48">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel n="06" label="Impact ecosystem" />
        <h2 className="mt-8 max-w-4xl font-display text-[clamp(2.4rem,6vw,5rem)] font-[300] text-balance">
          Every mannequin cascades into a wider <span className="italic text-copper">systemic effect.</span>
        </h2>
        <div className="mt-20 relative">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
            {nodes.map((n, i) => (
              <motion.div
                key={n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                className="glass relative rounded-2xl p-6 transition hover:-translate-y-1 hover:border-copper/40"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-copper">0{i + 1}</div>
                <div className="mt-4 font-display text-xl">{n}</div>
                {i < nodes.length - 1 && (
                  <div className="pointer-events-none absolute -right-3 top-1/2 hidden -translate-y-1/2 text-copper/60 md:block">→</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------- Roadmap -------- */
function Roadmap() {
  const milestones = [
    { y: "Now", t: "Pilot mannequins dispatched for durability and strength testing." },
    { y: "Year 1", t: "Optimize formulation. First commercial revenue. Retail pilots." },
    { y: "Year 2", t: "Scale across textile clusters. Decentralized manufacturing." },
    { y: "Year 3–5", t: "License the material. Packaging, furniture, engineered boards." },
    { y: "Vision", t: "A national circular-materials ecosystem beyond plastic." },
  ];
  return (
    <section className="relative py-32 md:py-48">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel n="07" label="Roadmap" />
        <div className="mt-16 relative border-l border-border/60 pl-8 md:pl-12">
          {milestones.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
              className="relative pb-16 last:pb-0"
            >
              <span
                className={`absolute -left-[41px] top-2 flex h-4 w-4 items-center justify-center rounded-full ${i === 0 ? "bg-copper shadow-[0_0_20px_var(--copper)]" : "bg-bone/30"} md:-left-[53px]`}
              >
                {i === 0 && <span className="absolute inline-block h-4 w-4 animate-ping rounded-full bg-copper/60" />}
              </span>
              <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-copper">{m.y}</div>
              <div className="mt-3 max-w-xl font-display text-2xl md:text-3xl">{m.t}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- Recognition -------- */
function Recognition() {
  const cards = [
    { t: "NSRCEL / IIM Bangalore", s: "Shortlisted out of 1,500+ teams" },
    { t: "IIT Madras Accelerator", s: "Selected as 1 of 50" },
    { t: "25+ national platforms", s: "Across IITs and IIMs" },
    { t: "Mentored by climate VCs", s: "Sustainability & climate investors" },
  ];
  return (
    <section className="relative py-32 md:py-48">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel n="08" label="Recognition" />
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: EASE }}
              whileHover={{ y: -6, rotateY: 4, rotateX: -3 }}
              style={{ transformPerspective: 1000 }}
              className="glass rounded-3xl p-8"
            >
              <div className="font-display text-2xl leading-tight">{c.t}</div>
              <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{c.s}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- Team -------- */
function Team() {
  const team = [
    { n: "Hemavarshini S", r: "Co-founder — Business, Partnerships, Fundraising" },
    { n: "Ayush Sinha", r: "Co-founder — Material Innovation, Product, Manufacturing" },
  ];
  return (
    <section id="team" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel n="09" label="The Team" />
        <h2 className="mt-8 max-w-3xl font-display text-[clamp(2.2rem,5vw,4.5rem)] font-[300] text-balance">
          Founded by two undergraduates at SRCC, University of Delhi. Building a materials company from <span className="italic text-copper">Coimbatore</span> — the Manchester of South India.
        </h2>
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {team.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: EASE }}
              className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card p-10"
            >
              <div className="absolute inset-0 bg-[radial-gradient(400px_circle_at_var(--mx,50%)_var(--my,50%),color-mix(in_oklch,var(--copper)_18%,transparent),transparent_70%)] opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="font-display text-4xl md:text-5xl">{t.n}</div>
                <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{t.r}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- Final CTA -------- */
function CTA() {
  return (
    <section id="contact" className="relative overflow-hidden py-40 md:py-56">
      <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_50%,color-mix(in_oklch,var(--copper)_25%,transparent),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-copper/20" />
        <div className="absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-copper/10" />
      </div>
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: EASE }}
          className="mx-auto max-w-5xl font-display text-[clamp(2.6rem,8vw,8rem)] font-[300] text-balance"
        >
          The future <span className="italic opacity-60">shouldn't be</span>
          <br />
          made from <span className="text-shimmer">plastic.</span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
          className="mt-14 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="mailto:hello@stitchzero.com"
            className="rounded-full bg-bone px-8 py-4 font-mono text-[11px] uppercase tracking-[0.3em] text-ink transition hover:scale-[1.03] hover:shadow-[0_20px_60px_-10px_var(--copper)]"
          >
            Partner with Stitch Zero →
          </a>
          <a
            href="#platform"
            className="glass rounded-full px-8 py-4 font-mono text-[11px] uppercase tracking-[0.3em] transition hover:border-copper/50"
          >
            Explore the Material Platform
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center md:px-10">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.32em]">
          <span className="inline-block h-2 w-2 rounded-full bg-copper" /> Stitch Zero
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          © {new Date().getFullYear()} · Circular Materials Company · Coimbatore / Delhi
        </div>
        <div className="flex gap-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <a href="mailto:hello@stitchzero.com" className="hover:text-bone">Contact</a>
          <a href="#platform" className="hover:text-bone">Platform</a>
          <a href="#team" className="hover:text-bone">Team</a>
        </div>
      </div>
    </footer>
  );
}

export default function Landing() {
  const [loading, setLoading] = useState(true);
  return (
    <main className="relative min-h-screen bg-background text-foreground selection:bg-copper selection:text-ink">
      <AnimatePresence>
        {loading && <Loader key="loader" onDone={() => setLoading(false)} />}
      </AnimatePresence>
      <Cursor />
      <Fibers />
      <Nav />
      <div className="relative z-10">
        <Hero />
        <Marquee />
        <Problem />
        <Process />
        <Platform />
        <Compare />
        <Market />
        <Impact />
        <Roadmap />
        <Recognition />
        <Team />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}