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
    const t = setTimeout(onDone, 1800);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7, ease: EASE } }}
    >
      <div className="relative flex flex-col items-center gap-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex items-center gap-3"
        >
          <span className="inline-block h-3 w-3 rounded-full bg-copper" />
          <span className="font-display text-2xl tracking-tight text-ink">Stitch Zero</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: EASE }}
          className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground"
        >
          Engineering the Future Beyond Plastic
        </motion.div>
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
      transition={{ delay: 0.3, duration: 0.8, ease: EASE }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}
    >
      <div
        className={`mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-10 rounded-full backdrop-blur-xl backdrop-saturate-150 border transition-all duration-500 ${
          scrolled
            ? "bg-white/80 border-black/8 py-2 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.1)]"
            : "bg-white/60 border-black/5 py-3"
        }`}
      >
        <a href="#top" className="flex items-center gap-2 font-display text-lg tracking-tight text-ink">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-copper" />
          Stitch <span className="text-copper">Zero</span>
        </a>
        <nav className="hidden items-center gap-8 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:flex">
          {["Problem", "Solution", "Impact", "Team", "Contact"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="transition-colors hover:text-copper">
              {l}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="rounded-full bg-copper px-5 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white transition hover:bg-copper/90 hover:shadow-lg"
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
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden pt-32"
    >
      {/* Background image */}
      <motion.div
        style={{ y, scale, opacity }}
        className="absolute inset-0 z-0"
      >
        <img
          src={heroImg}
          alt="Sculptural biodegradable mannequin formed from compressed textile fibers"
          className="h-full w-full object-cover"
          width={1280}
          height={1600}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-white" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_40%,transparent,white_90%)]" />
      </motion.div>

      <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col gap-8 px-6 md:px-10 md:text-left text-center">
        <motion.h1
          className="font-display text-[clamp(2.8rem,7vw,6.5rem)] text-ink leading-[1.05]"
        >
          {["Transforming Textile Waste", "Into the Next Generation of", "Sustainable Materials."].map((line, i) => (
            <motion.span
              key={i}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.12, duration: 1, ease: EASE }}
              className="block overflow-hidden"
            >
              <span className={`inline-block ${i === 2 ? "text-copper" : ""}`}>
                {line}
              </span>
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.9, ease: EASE }}
          className="mx-auto max-w-2xl text-balance text-lg text-muted-foreground md:mx-0 md:text-xl leading-relaxed"
        >
          Stitch Zero is a circular materials company converting discarded textile waste into
          high-performance, biodegradable alternatives to plastic. We're starting with
          retail mannequins, and building toward a future where industrial waste, not virgin resources,
          becomes the raw material of modern manufacturing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.9, ease: EASE }}
          className="flex flex-wrap items-center justify-center gap-4 md:justify-start"
        >
          <a
            href="#contact"
            className="group relative overflow-hidden rounded-full bg-copper px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:scale-[1.03] hover:shadow-[0_16px_40px_-8px_rgba(180,100,30,0.4)]"
          >
            <span className="relative z-10">Partner with Stitch Zero</span>
          </a>
          <a
            href="#solution"
            className="group flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink transition hover:text-copper"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 transition group-hover:border-copper">
              ↓
            </span>
            Explore Our Solution
          </a>
        </motion.div>

        {/* Ticker */}
        <div className="mt-12 grid grid-cols-2 gap-6 border-t border-black/8 pt-8 text-center md:grid-cols-4 md:text-left">
          {[
            ["7.8M", "tonnes textile waste / yr in India"],
            ["$3.15B", "retail display market (2024)"],
            ["100%", "biodegradable composite"],
            ["25+", "national recognitions"],
          ].map(([k, v], i) => (
            <motion.div
              key={k}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + i * 0.1, duration: 0.7, ease: EASE }}
            >
              <div className="font-display text-3xl text-ink md:text-4xl">{k}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
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
    <div className="relative border-y border-black/8 py-6 overflow-hidden bg-bone">
      <div className="marquee flex gap-12 whitespace-nowrap font-display text-4xl text-ink/20 md:text-6xl">
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
    <div className="flex items-center justify-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground md:justify-start">
      <span className="text-copper font-semibold">{n}</span>
      <span className="hairline w-16" />
      <span>{label}</span>
    </div>
  );
}

/* -------- Problem -------- */
function Problem() {
  return (
    <section id="problem" className="relative py-20 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel n="01" label="The Problem" />
        <h2 className="mx-auto mt-6 max-w-4xl text-center font-display md:mx-0 md:text-left text-[clamp(2rem,5vw,4.5rem)] text-ink text-balance">
          Two crises. <span className="text-copper">One industry.</span>{" "}
          <span className="text-muted-foreground">Zero solutions, until now.</span>
        </h2>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <PanelCard
            img={wasteImg}
            eyebrow="A Mountain of Textile Waste"
            stat="7.8M"
            statLabel="tonnes / year, India"
            body="India generates approximately 7.8 million tonnes of textile waste every year. Most of it is landfilled or burned, despite retaining real material value. Growing up in Coimbatore, Tamil Nadu, often called the Manchester of South India, our founder witnessed textile waste being dumped directly into rivers, contaminating the water communities depended on. That firsthand reality became the founding motivation behind Stitch Zero."
          />
          <PanelCard
            img={plasticImg}
            eyebrow="A Retail Industry Built on Plastic"
            stat="Microplastics"
            statLabel="shed for years, un-recyclable"
            body="Every fashion retailer relies on plastic and fiberglass mannequins that remain in circulation for years without ever truly breaking down, shed microplastics throughout their lifecycle, are difficult and often impossible to recycle, and eventually end up exactly where textile waste does: the landfill."
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
      className="group relative overflow-hidden rounded-3xl border border-black/8 bg-white shadow-[0_4px_24px_-8px_rgba(0,0,0,0.06)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          src={img}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105"
          initial={{ scale: 1.15 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 1.4, ease: EASE }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
      </div>
      <div className="relative -mt-16 p-6 text-center sm:p-8 md:p-10 md:text-left">
        <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-copper font-medium">{eyebrow}</div>
        <div className="mt-4 flex flex-col items-center gap-2 md:flex-row md:items-baseline md:gap-4">
          <span className="font-display text-4xl leading-none text-ink sm:text-5xl">{stat}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{statLabel}</span>
        </div>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:mx-0">{body}</p>
      </div>
    </motion.article>
  );
}

/* -------- Solution / How it works -------- */
function Solution() {
  const steps = [
    { k: "Collect", v: "Textile waste is sourced directly from manufacturers and garment units." },
    { k: "Process", v: "The waste is sorted, cleaned, shredded, and converted into textile pulp." },
    { k: "Engineer", v: "Our proprietary formulation combines the pulp with natural binders to create a durable composite." },
    { k: "Mold", v: "The composite is shaped into finished, market-ready products." },
  ];
  return (
    <section id="solution" className="relative py-20 md:py-32 section-alt">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel n="02" label="Our Solution" />
        <h2 className="mx-auto mt-6 max-w-4xl text-center font-display md:mx-0 md:text-left text-[clamp(2rem,5vw,4.5rem)] text-ink text-balance">
          We turn one industry's waste into another's <span className="text-copper">infrastructure.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-muted-foreground md:mx-0 md:text-left leading-relaxed">
          Stitch Zero converts discarded textile waste into a proprietary biodegradable composite material, engineered to replace plastic across multiple applications.
        </p>
        <div className="mt-16 relative">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-black/10 to-transparent md:block" />
          <ol className="grid gap-8 md:grid-cols-4">
            {steps.map((s, i) => (
              <motion.li
                key={s.k}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                className="relative text-center md:text-left"
              >
                <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-copper/10 border border-copper/20 md:mx-0">
                  <span className="font-mono text-sm font-semibold text-copper">0{i + 1}</span>
                </div>
                <div className="mt-5 font-display text-xl text-ink">{s.k}</div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.v}</p>
              </motion.li>
            ))}
          </ol>
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
    <section className="relative py-20 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel n="03" label="First Product" />
        <div ref={ref} className="mt-8 grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: EASE }}
          >
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-ink text-balance">
              Biodegradable Retail <span className="text-copper">Mannequins</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-lg">
              Each Stitch Zero mannequin uses approximately 20 kg of textile waste and delivers commercial-grade performance without the environmental cost of conventional plastic alternatives.
            </p>
            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {features.map((f, i) => (
                <motion.li
                  key={f}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.6, ease: EASE }}
                  className="flex items-center gap-3 text-sm text-foreground"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald/10 text-emerald text-xs">✓</span>
                  {f}
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
            className="relative mx-auto aspect-[3/4] w-full max-w-[480px] overflow-hidden rounded-3xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)]"
          >
            <img src={heroImg} alt="Biodegradable mannequin by Stitch Zero" className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* -------- Innovation / Material Platform -------- */
function Innovation() {
  const products = ["Retail Mannequins", "Sustainable Packaging", "Furniture", "Interior Decor", "Engineered Boards", "Retail Fixtures"];
  return (
    <section className="relative overflow-hidden py-20 md:py-32 section-alt">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel n="04" label="The Innovation" />
        <div className="mt-8 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <h2 className="mx-auto text-center font-display text-[clamp(2rem,5vw,4rem)] text-ink text-balance md:mx-0 md:text-left">
              The real innovation isn't the mannequin. It's the{" "}
              <span className="text-copper">material platform</span> underneath.
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-center text-muted-foreground md:mx-0 md:text-left leading-relaxed">
              Most textile recycling downcycles waste into lower-value products.
              We do the opposite: a high-value composite whose structural,
              mechanical, and aesthetic properties can be tuned for entirely different
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
                  className="rounded-full border border-copper/20 bg-copper/5 px-4 py-2.5 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-copper"
                >
                  {p}
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[480px]">
            <div className="absolute inset-0 rounded-full border border-black/6" />
            <div className="absolute inset-6 rounded-full border border-black/5" />
            <div className="absolute inset-14 rounded-full border border-black/4" />
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
                      className="rounded-full bg-white border border-black/8 shadow-sm px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] whitespace-nowrap text-ink"
                    >
                      {p}
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
            <div className="absolute inset-1/4 rounded-full overflow-hidden glow-copper float-y">
              <img src={materialImg} alt="Composite material" className="h-full w-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------- Comparison -------- */
function Compare() {
  const rows = [
    { l: "Plastic manufacturers", r: "Stitch Zero", label: "Feedstock", ll: "Continue relying on virgin plastics", rr: "Replace plastics entirely with waste-derived composites" },
    { l: "Conventional recyclers", r: "Stitch Zero", label: "Value model", ll: "Downcycle into low-value products", rr: "Upcycle into a high-value engineered platform" },
    { l: "Bioplastic companies", r: "Stitch Zero", label: "Inputs", ll: "Depend on virgin agricultural feedstocks", rr: "Depend entirely on existing waste streams" },
  ];
  return (
    <section className="relative py-20 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel n="05" label="Why We're Different" />
        <h2 className="mx-auto mt-6 max-w-4xl text-center font-display md:mx-0 md:text-left text-[clamp(2rem,5vw,4rem)] text-ink text-balance">
          The only approach tackling textile waste and plastic dependency as{" "}
          <span className="text-copper">one problem.</span>
        </h2>
        <div className="mt-12 space-y-3">
          {rows.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
              className="grid grid-cols-1 gap-3 rounded-2xl border border-black/8 bg-white p-6 text-center shadow-sm md:grid-cols-[1fr_auto_1fr] md:gap-8 md:p-8 md:text-left"
            >
              <div className="opacity-50">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{r.l}</div>
                <div className="mt-2 font-display text-xl line-through decoration-copper/40 decoration-1">{r.ll}</div>
              </div>
              <div className="hidden self-center font-mono text-[11px] uppercase tracking-[0.2em] text-copper md:block">
                {r.label} →
              </div>
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-copper font-medium">{r.r}</div>
                <div className="mt-2 font-display text-xl text-ink">{r.rr}</div>
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
    { n: 3.15, s: "B USD", label: "Retail and fashion display segment (2024)", prefix: "$" },
    { n: 6.5, s: "B USD", label: "Projected market size by 2030", prefix: "$" },
    { n: 7.8, s: "M tonnes", label: "Textile waste generated annually in India", prefix: "" },
  ];
  return (
    <section id="impact" className="relative py-20 md:py-32 section-alt">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel n="06" label="Market Opportunity" />
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground md:mx-0 md:text-left">
          The retail and fashion display segment represents roughly 61% of the total mannequin market. ESG adoption, sustainability mandates, and circular economy policy are accelerating demand.
        </p>
        <div className="mt-12 grid gap-12 md:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: EASE }}
              className="text-center md:text-left"
            >
              <div className="font-display text-[clamp(3rem,8vw,6rem)] leading-none text-ink">
                <Counter to={it.n} prefix={it.prefix} />
                <span className="text-copper">{it.s}</span>
              </div>
              <div className="mx-auto mt-4 max-w-xs text-sm text-muted-foreground md:mx-0">{it.label}</div>
            </motion.div>
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
    <section className="relative py-20 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel n="07" label="Beyond Mannequins" />
        <h2 className="mx-auto mt-6 max-w-4xl text-center font-display md:mx-0 md:text-left text-[clamp(2rem,5vw,4rem)] text-ink text-balance">
          This innovation can take <span className="text-copper">more forms</span> than mannequins.
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {applications.map((app, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
              className="group rounded-2xl border border-black/8 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-copper/30"
            >
              <div className="text-3xl">{app.icon}</div>
              <div className="mt-4 font-display text-lg text-ink">{app.title}</div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{app.desc}</p>
            </motion.div>
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
      color: "bg-emerald/10 text-emerald border-emerald/20",
      items: ["Textile waste diverted from landfills", "Plastic mannequins displaced", "Reduced microplastic pollution", "Lower carbon emissions", "Reduced dependency on virgin plastic"],
    },
    {
      title: "Economic",
      color: "bg-copper/10 text-copper border-copper/20",
      items: ["Converts discarded material into commercial value", "Lowers raw material costs for adopters", "Enables sustainable procurement at scale", "Strengthens circular manufacturing"],
    },
    {
      title: "Social",
      color: "bg-teal/10 text-teal border-teal/20",
      items: ["Supports cleaner, healthier communities", "Encourages responsible production", "Strengthens local manufacturing ecosystems", "Drives broader circular economy adoption"],
    },
  ];
  return (
    <section className="relative py-20 md:py-32 section-alt">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel n="08" label="Impact" />
        <h2 className="mx-auto mt-6 max-w-4xl text-center font-display md:mx-0 md:text-left text-[clamp(2rem,5vw,4rem)] text-ink text-balance">
          Every mannequin cascades into a wider <span className="text-copper">systemic effect.</span>
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
              className="rounded-2xl border border-black/8 bg-white p-8 shadow-sm"
            >
              <div className={`inline-flex rounded-full border px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] font-medium ${p.color}`}>
                {p.title}
              </div>
              <ul className="mt-6 space-y-3">
                {p.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-foreground">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-copper/15 text-copper text-[8px]">●</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- UN SDGs -------- */
function SDGs() {
  const goals = [
    { n: 6, title: "Clean Water and Sanitation", color: "#26BDE2", desc: "Reducing the water pollution and contamination linked to textile waste dumping and burning." },
    { n: 8, title: "Decent Work and Economic Growth", color: "#A21942", desc: "Building a manufacturing model that supports local jobs and circular supply chains." },
    { n: 12, title: "Responsible Consumption and Production", color: "#BF8B2E", desc: "Turning discarded textile waste into a valuable industrial input instead of landfill or ash." },
    { n: 13, title: "Climate Action", color: "#3F7E44", desc: "Reducing emissions associated with virgin plastic production and textile waste incineration." },
  ];
  return (
    <section className="relative py-20 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel n="09" label="UN Sustainable Development Goals" />
        <h2 className="mx-auto mt-6 max-w-4xl text-center font-display md:mx-0 md:text-left text-[clamp(2rem,5vw,4rem)] text-ink text-balance">
          Aligned with the <span className="text-copper">UN Sustainable Development Goals</span>
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {goals.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
              className="group overflow-hidden rounded-2xl border border-black/8 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div
                className="flex items-center gap-3 px-6 py-5"
                style={{ background: g.color }}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 font-display text-2xl text-white">
                  {g.n}
                </span>
                <span className="font-display text-sm text-white leading-tight">{g.title}</span>
              </div>
              <div className="p-6">
                <p className="text-sm text-muted-foreground leading-relaxed">{g.desc}</p>
              </div>
            </motion.div>
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
    <section className="relative py-20 md:py-32 section-alt">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel n="10" label="Where We Are Today" />
        <h2 className="mx-auto mt-6 max-w-4xl text-center font-display md:mx-0 md:text-left text-[clamp(2rem,5vw,4rem)] text-ink text-balance">
          From concept to <span className="text-copper">active pilot testing.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground md:mx-0 md:text-left">
          We have successfully dispatched the first phase of our mannequins from our pilot run for further durability and strength testing, a key milestone on the path to commercial-grade validation.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="rounded-2xl border border-emerald/20 bg-emerald/5 p-8"
          >
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald font-medium">Completed</div>
            <ul className="mt-5 space-y-3">
              {completed.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald/15 text-emerald text-xs">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="rounded-2xl border border-copper/20 bg-copper/5 p-8"
          >
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-copper font-medium">Next Phase</div>
            <ul className="mt-5 space-y-3">
              {next.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-copper/15 text-copper text-xs">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
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
    { t: "1 of 50 Selected", s: "IIT Madras Accelerator" },
  ];
  return (
    <section className="relative py-20 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel n="11" label="Recognition" />
        <h2 className="mx-auto mt-6 max-w-4xl text-center font-display md:mx-0 md:text-left text-[clamp(2rem,5vw,4rem)] text-ink text-balance">
          Recognized at India's most <span className="text-copper">prestigious platforms.</span>
        </h2>

        {/* Highlight cards */}
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {highlights.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
              className="rounded-2xl border border-black/8 bg-white p-6 shadow-sm text-center transition-all hover:-translate-y-1 hover:shadow-md hover:border-copper/30"
            >
              <div className="font-display text-lg text-ink leading-tight">{c.t}</div>
              <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{c.s}</div>
            </motion.div>
          ))}
        </div>

        {/* Institution logos carousel */}
        <div className="mt-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground text-center mb-6">
            Recognised at 25+ platforms across
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-black/6 bg-bone py-6">
            <div className="logo-scroll flex gap-8 whitespace-nowrap">
              {[...institutions, ...institutions].map((name, i) => (
                <div
                  key={i}
                  className="flex shrink-0 items-center gap-2 rounded-full bg-white border border-black/8 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-ink shadow-sm"
                >
                  <span className="h-2 w-2 rounded-full bg-copper/60" />
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Incubator logos carousel */}
        <div className="mt-8">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground text-center mb-6">
            Shortlisted for pitching to 8+ incubators
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-black/6 bg-bone py-6">
            <div className="logo-scroll flex gap-8 whitespace-nowrap" style={{ animationDirection: "reverse", animationDuration: "20s" }}>
              {[...incubators, ...incubators, ...incubators].map((name, i) => (
                <div
                  key={i}
                  className="flex shrink-0 items-center gap-2 rounded-full bg-white border border-copper/20 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-copper shadow-sm"
                >
                  <span className="h-2 w-2 rounded-full bg-copper" />
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
    <section id="team" className="relative py-20 md:py-32 section-alt">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel n="12" label="The Team" />
        <h2 className="mx-auto mt-6 max-w-3xl text-center font-display md:mx-0 md:text-left text-[clamp(2rem,4vw,3.5rem)] text-ink text-balance">
          Founded and built by two undergraduate students at{" "}
          <span className="text-copper">SRCC, University of Delhi.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground md:mx-0 md:text-left">
          Between them, they lead the company's business strategy, partnerships, and fundraising alongside material innovation, product development, and manufacturing optimization. Stitch Zero has earned over INR 1 lakh through grants, prizes, and early product deployment, proving the market pays for what we build.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {team.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: EASE }}
              className="group relative overflow-hidden rounded-2xl border border-black/8 bg-white p-10 shadow-sm text-center md:text-left transition-all hover:shadow-md hover:border-copper/30"
            >
              <div className="font-display text-3xl text-ink md:text-4xl">{t.n}</div>
              <div className="mt-2 font-mono text-[12px] uppercase tracking-[0.2em] text-copper font-medium">{t.r}</div>
              <div className="mt-4 text-sm text-muted-foreground">{t.scope}</div>
              <div className="mt-4 flex flex-col gap-1 text-sm">
                <a href={`mailto:${t.email}`} className="text-copper hover:underline">{t.email}</a>
                <span className="text-muted-foreground">{t.phone}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- CTA / Contact -------- */
function CTA() {
  return (
    <section id="contact" className="relative overflow-hidden py-28 md:py-40">
      <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_50%,color-mix(in_oklch,var(--copper)_8%,transparent),transparent_70%)]" />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: EASE }}
          className="mx-auto max-w-4xl font-display text-[clamp(2.4rem,6vw,5.5rem)] text-ink text-balance"
        >
          The future of manufacturing is{" "}
          <span className="text-shimmer">circular.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          className="mx-auto mt-6 max-w-2xl text-muted-foreground leading-relaxed"
        >
          Interested in piloting Stitch Zero mannequins, exploring a partnership,
          or learning more about our composite technology? We'd love to hear from you.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="mailto:sinhaayush643@gmail.com"
            className="rounded-full bg-copper px-8 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition hover:scale-[1.03] hover:shadow-[0_16px_40px_-8px_rgba(180,100,30,0.35)]"
          >
            Partner with Stitch Zero
          </a>
          <a
            href="#solution"
            className="rounded-full border border-black/12 bg-white px-8 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink transition hover:border-copper/40 hover:shadow-sm"
          >
            Explore the Material Platform
          </a>
        </motion.div>

        {/* Contact details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
          className="mt-12 grid gap-6 md:grid-cols-2 max-w-2xl mx-auto"
        >
          <div className="rounded-2xl border border-black/8 bg-white p-6 shadow-sm">
            <div className="font-display text-lg text-ink">Ayush Sinha</div>
            <a href="mailto:sinhaayush643@gmail.com" className="mt-2 block text-sm text-copper hover:underline">sinhaayush643@gmail.com</a>
            <div className="mt-1 text-sm text-muted-foreground">+91 9318355472</div>
          </div>
          <div className="rounded-2xl border border-black/8 bg-white p-6 shadow-sm">
            <div className="font-display text-lg text-ink">Hemavarshini S</div>
            <a href="mailto:varshinishema@gmail.com" className="mt-2 block text-sm text-copper hover:underline">varshinishema@gmail.com</a>
            <div className="mt-1 text-sm text-muted-foreground">+91 9789777125</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* -------- Footer -------- */
function Footer() {
  return (
    <footer className="border-t border-black/8 py-10 bg-bone">
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center md:px-10">
        <div className="flex items-center gap-2 font-display text-base tracking-tight text-ink">
          <span className="inline-block h-2 w-2 rounded-full bg-copper" /> Stitch Zero
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          © {new Date().getFullYear()} Stitch Zero. Circular Materials Company.
        </div>
        <div className="flex gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <a href="mailto:sinhaayush643@gmail.com" className="hover:text-copper">Contact</a>
          <a href="#solution" className="hover:text-copper">Platform</a>
          <a href="#team" className="hover:text-copper">Team</a>
        </div>
      </div>
    </footer>
  );
}

/* -------- Main Landing -------- */
export default function Landing() {
  const [loading, setLoading] = useState(true);
  return (
    <main className="relative min-h-screen bg-white text-foreground selection:bg-copper selection:text-white">
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