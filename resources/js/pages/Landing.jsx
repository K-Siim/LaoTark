import { useState, useEffect, useRef } from "react";
import { Link } from "@inertiajs/react";
import {
    Menu,
    X,
    ArrowRight,
    PlusCircle,
    Repeat,
    LineChart,
    TrendingDown,
    TrendingUp,
    Boxes,
    AlertTriangle,
    Bell,
    FileDown,
    MapPin,
    Users,
    ShieldCheck,
    ArrowUpRight,
    ArrowDownRight,
} from "lucide-react";

/* ---------------------------------------------------------
   Disainitokenid — kõik värvid ühest kohast, mitte ad-hoc.
   Antratsiit + soe amber, monospace labelid. Signatuur:
   "laosildi" nurgalõige (tag-notch), mida korratakse
   dashboardil, kaartidel ja telefoni mockupil.
--------------------------------------------------------- */
const c = {
    bg: "#14161A",
    surface: "#1B1E23",
    surface2: "#20242A",
    border: "#2A2E35",
    borderSoft: "rgba(42,46,53,0.6)",
    text: "#EDEAE2",
    muted: "#9CA3AF",
    mutedDark: "#6B7078",
    amber: "#E3A23B",
    amberLight: "#F2C57C",
    amberSoft: "rgba(227,162,59,0.12)",
    glow: "rgba(227,162,59,0.30)",
    danger: "#D9714F",
    dangerSoft: "rgba(217,113,79,0.14)",
    success: "#6FAE7A",
    successSoft: "rgba(111,174,122,0.14)",
};

/* Laosildi nurgalõige — korduv signatuurikuju */
const tagClip = "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)";
const tagClipSm = "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)";

function GlobalStyle() {
    return (
        <style>{`
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
            @keyframes floatSlow {
                0%, 100% { transform: translateY(0px) rotate(-3deg); }
                50% { transform: translateY(-8px) rotate(-1deg); }
            }
            @keyframes pulseRing {
                0% { box-shadow: 0 0 0 0 rgba(227,162,59,0.45); }
                70% { box-shadow: 0 0 0 14px rgba(227,162,59,0); }
                100% { box-shadow: 0 0 0 0 rgba(227,162,59,0); }
            }
            @keyframes dashDraw {
                from { stroke-dashoffset: 240; }
                to { stroke-dashoffset: 0; }
            }
            @keyframes shimmer {
                0% { background-position: -200px 0; }
                100% { background-position: 200px 0; }
            }
            .lt-float { animation: float 5s ease-in-out infinite; }
            .lt-float-slow { animation: floatSlow 7s ease-in-out infinite; }
            .lt-pulse { animation: pulseRing 2.6s ease-out infinite; }
            .lt-card-hover { transition: transform 0.35s cubic-bezier(.16,.84,.44,1), border-color 0.35s ease, box-shadow 0.35s ease; }
            .lt-card-hover:hover { transform: translateY(-4px); border-color: rgba(227,162,59,0.5); box-shadow: 0 16px 40px rgba(0,0,0,0.35); }
            .lt-link-underline { position: relative; }
            .lt-link-underline::after {
                content: ""; position: absolute; left: 0; bottom: -3px; height: 1px; width: 0%;
                background: ${c.amber}; transition: width 0.3s ease;
            }
            .lt-link-underline:hover::after { width: 100%; }
            .lt-btn { transition: transform 0.25s cubic-bezier(.16,.84,.44,1), box-shadow 0.25s ease, background 0.25s ease; }
            .lt-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 26px rgba(227,162,59,0.28); }
            .lt-btn:active { transform: translateY(0px) scale(0.98); }
            .lt-logo:hover .lt-logo-mark { transform: rotate(-8deg) scale(1.05); }
            .lt-logo-mark { transition: transform 0.3s ease; }
            .lt-row:hover { background: rgba(227,162,59,0.05); }
        `}</style>
    );
}

/* ---------------------------------------------------------
   Reveal — scroll-triggered fade/rise, ühekordne
--------------------------------------------------------- */
function Reveal({ children, delay = 0, y = 22 }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    io.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0px)" : `translateY(${y}px)`,
                transition: `opacity 0.7s cubic-bezier(.16,.84,.44,1) ${delay}s, transform 0.7s cubic-bezier(.16,.84,.44,1) ${delay}s`,
            }}
        >
            {children}
        </div>
    );
}

function Divider({ glow: showGlow }) {
    return (
        <div className="relative h-px w-full" style={{ background: c.border }}>
            {showGlow && (
                <div
                    className="absolute left-1/2 top-0 h-px w-64 -translate-x-1/2"
                    style={{ background: `linear-gradient(90deg, transparent, ${c.amber}, transparent)`, opacity: 0.5 }}
                />
            )}
        </div>
    );
}

function ShelfTag({ children }) {
    return (
        <span
            className="inline-flex items-center gap-2 rounded-[4px] border px-3 py-1.5 font-mono text-[11px] tracking-wide"
            style={{ borderColor: c.border, background: c.surface, color: c.muted }}
        >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: c.amber }} />
            {children}
        </span>
    );
}

/* ---------------------------------------------------------
   Navbar — peene varjuga scroll'il, logo mikroanimatsioon
--------------------------------------------------------- */
function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const links = [
        { label: "Funktsioonid", href: "#funktsioonid" },
        { label: "Kuidas töötab", href: "#kuidas-toetab" },
        { label: "Kontakt", href: "#kontakt" },
    ];
    return (
        <header
            className="sticky top-0 z-50 border-b backdrop-blur transition-shadow duration-300"
            style={{
                borderColor: c.border,
                background: `${c.bg}F2`,
                boxShadow: scrolled ? "0 8px 24px rgba(0,0,0,0.28)" : "none",
            }}
        >
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                <a href="/login" className="lt-logo flex items-center gap-3">
                    <div
                        className="lt-logo-mark flex h-8 w-8 items-center justify-center rounded-[4px] border"
                        style={{ borderColor: `${c.amber}66`, background: c.amberSoft }}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke={c.amber} strokeWidth="1.8" className="h-4 w-4">
                            <path d="M3 21h18" />
                            <path d="M5 21V7l7-4 7 4v14" />
                            <path d="M9 21v-6h6v6" />
                        </svg>
                    </div>
                    <div className="leading-none">
                        <span className="font-mono text-[15px] font-medium tracking-tight" style={{ color: c.text }}>
                            LAOTARK
                        </span>
                        <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest" style={{ color: c.mutedDark }}>
                            Laohaldus
                        </p>
                    </div>
                </a>

                <nav className="hidden items-center gap-8 lg:flex">
                    {links.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            className="lt-link-underline text-sm transition hover:opacity-100"
                            style={{ color: c.muted }}
                        >
                            {l.label}
                        </a>
                    ))}
                </nav>

                <div className="hidden items-center gap-3 lg:flex">
                    <Link href="/login" className="lt-link-underline text-sm" style={{ color: c.muted }}>
                        Logi sisse
                    </Link>
                    <Link
                        href="/register"
                        className="lt-btn rounded-[4px] px-4 py-2 text-sm font-medium"
                        style={{ background: c.amber, color: c.bg }}
                    >
                        Proovi tasuta
                    </Link>
                </div>

                <button
                    className="rounded-[4px] p-2 lg:hidden"
                    style={{ color: c.text }}
                    onClick={() => setOpen((v) => !v)}
                    aria-label="Menüü"
                >
                    {open ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {open && (
                <div className="border-t px-6 py-4 lg:hidden" style={{ borderColor: c.border, background: c.surface }}>
                    <div className="flex flex-col gap-3">
                        {links.map((l) => (
                            <a
                                key={l.href}
                                href={l.href}
                                className="text-sm"
                                style={{ color: c.text }}
                                onClick={() => setOpen(false)}
                            >
                                {l.label}
                            </a>
                        ))}
                        <a
                            href="/register"
                            className="mt-2 rounded-[4px] px-4 py-2.5 text-center text-sm font-medium"
                            style={{ background: c.amber, color: c.bg }}
                            onClick={() => setOpen(false)}
                        >
                            Proovi tasuta
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}

/* ---------------------------------------------------------
   Telefoni mockup — päris mobiilivaade + ujuv teavituskaart
--------------------------------------------------------- */
function PhoneMockup() {
    const items = [
        { n: "Kruvid M6x40", q: "142 tk", tone: "danger" },
        { n: "Kartongkast L", q: "820 tk", tone: "success" },
        { n: "Liimipulk", q: "36 tk", tone: "danger" },
        { n: "Pakketeip", q: "64 rulli", tone: "neutral" },
    ];
    const tone = { danger: c.danger, success: c.success, neutral: c.muted };

    return (
        <div className="relative mx-auto w-[260px] sm:w-[280px]">
            {/* taustahõõgus */}
            <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
                style={{ background: c.glow, opacity: 0.5 }}
            />

            {/* ujuv teavituskaart */}
            <div
                className="lt-float-slow absolute -left-16 top-16 z-20 hidden w-44 rounded-[4px] border p-3 sm:block"
                style={{
                    borderColor: c.border,
                    background: c.surface,
                    boxShadow: "0 14px 34px rgba(0,0,0,0.4)",
                    clipPath: tagClipSm,
                }}
            >
                <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: c.mutedDark }}>
                    Uus liikumine
                </p>
                <p className="mt-1.5 text-[13px]" style={{ color: c.text }}>
                    Kruvid M6x40
                </p>
                <p className="mt-1 font-mono text-[13px] font-medium" style={{ color: c.danger }}>
                    − 25 tk
                </p>
            </div>

            {/* telefoni raam */}
            <div
                className="lt-float relative z-10 rounded-[34px] border p-2"
                style={{ borderColor: c.border, background: "#0E1013", boxShadow: "0 30px 70px rgba(0,0,0,0.5)" }}
            >
                <div className="rounded-[26px] p-4" style={{ background: c.bg }}>
                    <div className="mx-auto mb-3 h-1 w-10 rounded-full" style={{ background: c.border }} />

                    <div className="flex items-center justify-between">
                        <span className="font-mono text-[12px] font-medium" style={{ color: c.text }}>
                            LaoTark
                        </span>
                        <div
                            className="flex h-6 w-6 items-center justify-center rounded-full"
                            style={{ background: c.amberSoft }}
                        >
                            <Bell size={12} color={c.amber} />
                        </div>
                    </div>

                    <p className="mt-4 font-mono text-[10px] uppercase tracking-widest" style={{ color: c.mutedDark }}>
                        Madal laoseis
                    </p>

                    <div className="mt-2 space-y-2">
                        {items.map((it) => (
                            <div
                                key={it.n}
                                className="flex items-center justify-between rounded-[4px] border px-3 py-2.5"
                                style={{ borderColor: c.border, background: c.surface }}
                            >
                                <span className="text-[12px]" style={{ color: c.text }}>
                                    {it.n}
                                </span>
                                <span className="font-mono text-[11px] font-medium" style={{ color: tone[it.tone] }}>
                                    {it.q}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 flex justify-end">
                        <div
                            className="lt-pulse flex h-11 w-11 items-center justify-center rounded-full"
                            style={{ background: c.amber }}
                        >
                            <PlusCircle size={20} color={c.bg} strokeWidth={2} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ---------------------------------------------------------
   Hero — gradienthõõgus, telefoni mockup, usaldusnäitajad
--------------------------------------------------------- */
function Hero() {
    return (
        <section className="relative overflow-hidden">
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background: `radial-gradient(ellipse 70% 55% at 78% 8%, ${c.glow}, transparent 60%)`,
                }}
            />
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage:
                        "linear-gradient(to right,#EDEAE2 1px,transparent 1px),linear-gradient(to bottom,#EDEAE2 1px,transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />
            <div className="relative mx-auto grid max-w-6xl gap-16 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
                <div>
                    <Reveal>
                        <ShelfTag>A3-12 · EESTI · VÄIKEETTEVÕTE</ShelfTag>
                    </Reveal>

                    <Reveal delay={0.08}>
                        <h1
                            className="mt-6 text-5xl font-medium leading-[1.05] tracking-tight lg:text-6xl"
                            style={{ color: c.text }}
                        >
                            Sinu ladu,
                            <br />
                            <span style={{ color: c.amberLight }}>üks pilk.</span>
                        </h1>
                    </Reveal>

                    <Reveal delay={0.16}>
                        <p className="mt-6 max-w-md text-[17px] leading-relaxed" style={{ color: c.muted }}>
                            LaoTark näitab, kui palju materjali kulus, kui palju
                            lisati ja mis on otsas — ilma Exceli ja
                            raamatupidamistarkvara laomooduliteta.
                        </p>
                    </Reveal>

                    <Reveal delay={0.24}>
                        <div className="mt-9 flex items-center gap-4">
                            <a
                                href="/register"
                                className="lt-btn inline-flex items-center gap-2 rounded-[4px] px-6 py-3 text-sm font-medium"
                                style={{ background: c.amber, color: c.bg }}
                            >
                                Proovi tasuta
                                <ArrowRight size={15} />
                            </a>
                            <a href="/login" className="lt-link-underline text-sm" style={{ color: c.muted }}>
                                Vaata demot →
                            </a>
                        </div>
                    </Reveal>

                    <Reveal delay={0.32}>
                        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t pt-6" style={{ borderColor: c.border }}>
                            <div>
                                <p className="font-mono text-xl font-medium" style={{ color: c.text }}>
                                    5
                                </p>
                                <p className="mt-0.5 text-[12px]" style={{ color: c.mutedDark }}>
                                    väikeettevõtet kaasati
                                </p>
                            </div>
                            <div className="h-8 w-px" style={{ background: c.border }} />
                            <div>
                                <p className="font-mono text-xl font-medium" style={{ color: c.text }}>
                                    &lt; 2 min
                                </p>
                                <p className="mt-0.5 text-[12px]" style={{ color: c.mutedDark }}>
                                    esimese liikumiseni
                                </p>
                            </div>
                            <div className="h-8 w-px" style={{ background: c.border }} />
                            <div>
                                <p className="font-mono text-xl font-medium" style={{ color: c.text }}>
                                    0€
                                </p>
                                <p className="mt-0.5 text-[12px]" style={{ color: c.mutedDark }}>
                                    krediitkaardita
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>

                <Reveal delay={0.2} y={30}>
                    <PhoneMockup />
                </Reveal>
            </div>
        </section>
    );
}

/* ---------------------------------------------------------
   Probleem — feature-kaardid laosildi nurgalõikega
--------------------------------------------------------- */
function Problem() {
    const items = [
        {
            title: "Excel ei uuene ise",
            body: "Iga kaubaliikumine tuleb käsitsi lahtritesse kirjutada. Üks unustatud rida ja laoseis ei vasta enam tegelikkusele.",
            icon: Repeat,
        },
        {
            title: "Kulu jääb nägemata",
            body: "Raamatupidamistarkvara näitab kaupade jääki, aga mitte selget vastust: kui palju materjali sel kuul tegelikult kulus ja kuhu.",
            icon: TrendingDown,
        },
        {
            title: "Üllatused laoseisus",
            body: "Otsakorral toode selgub siis, kui klient juba ootab — mitte nädal enne, kui midagi tellida.",
            icon: AlertTriangle,
        },
    ];
    return (
        <section className="py-24">
            <div className="mx-auto max-w-6xl px-6">
                <Reveal>
                    <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: c.amber }}>
                        Probleem
                    </p>
                    <h2 className="mt-3 max-w-xl text-3xl font-medium tracking-tight lg:text-4xl" style={{ color: c.text }}>
                        Väikeladu ei mahu Excelisse.
                    </h2>
                </Reveal>

                <div className="mt-14 grid gap-5 lg:grid-cols-3">
                    {items.map((it, i) => (
                        <Reveal key={it.title} delay={0.08 * i}>
                            <div
                                className="lt-card-hover h-full border p-8"
                                style={{ borderColor: c.border, background: c.surface, clipPath: tagClip }}
                            >
                                <div
                                    className="flex h-10 w-10 items-center justify-center rounded-[4px] border"
                                    style={{ borderColor: `${c.amber}55`, background: c.amberSoft }}
                                >
                                    <it.icon size={17} color={c.amber} strokeWidth={1.8} />
                                </div>
                                <h3 className="mt-5 text-lg font-medium" style={{ color: c.text }}>
                                    {it.title}
                                </h3>
                                <p className="mt-3 text-[14px] leading-relaxed" style={{ color: c.muted }}>
                                    {it.body}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ---------------------------------------------------------
   Mini tulpdiagramm — kulu vs lisandus, animeeritud kasv
--------------------------------------------------------- */
function MiniBarChart() {
    const months = [
        { m: "Veebr", kulu: 38, lisa: 52 },
        { m: "Märts", kulu: 54, lisa: 40 },
        { m: "Apr", kulu: 46, lisa: 60 },
        { m: "Mai", kulu: 62, lisa: 48 },
        { m: "Juuni", kulu: 50, lisa: 70 },
        { m: "Juuli", kulu: 58, lisa: 64 },
    ];
    const ref = useRef(null);
    const [grown, setGrown] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setGrown(true);
                    io.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <div ref={ref} className="flex h-40 items-end gap-4 sm:gap-6">
            {months.map((mo, i) => (
                <div key={mo.m} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex h-32 items-end gap-1">
                        <div
                            className="w-3 rounded-t-[2px] sm:w-3.5"
                            style={{
                                background: c.danger,
                                height: grown ? `${mo.kulu}%` : "0%",
                                transition: `height 0.8s cubic-bezier(.16,.84,.44,1) ${i * 0.06}s`,
                            }}
                        />
                        <div
                            className="w-3 rounded-t-[2px] sm:w-3.5"
                            style={{
                                background: c.success,
                                height: grown ? `${mo.lisa}%` : "0%",
                                transition: `height 0.8s cubic-bezier(.16,.84,.44,1) ${i * 0.06 + 0.08}s`,
                            }}
                        />
                    </div>
                    <span className="font-mono text-[10px]" style={{ color: c.mutedDark }}>
                        {mo.m}
                    </span>
                </div>
            ))}
        </div>
    );
}

function StockBar({ pct, tone }) {
    const color = tone === "low" ? c.danger : tone === "mid" ? c.amber : c.success;
    return (
        <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: c.surface2 }}>
            <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
        </div>
    );
}

/* ---------------------------------------------------------
   Dashboard — päris toote-vaade: KPI-d, graafik, laoseisu tabel
--------------------------------------------------------- */
function DashboardMockup() {
    const kpis = [
        { label: "Kulus sel kuul", value: "€1 284", delta: "−12%", icon: TrendingDown, tone: c.danger },
        { label: "Lisati sel kuul", value: "€2 010", delta: "+8%", icon: TrendingUp, tone: c.success },
        { label: "Laoseis kokku", value: "€8 640", delta: "+3%", icon: Boxes, tone: c.text },
        { label: "Madal laoseis", value: "4 toodet", delta: "vaata", icon: AlertTriangle, tone: c.amber },
    ];

    const stock = [
        { name: "Kruvid M6x40", qty: "142 tk", pct: 22, tone: "low" },
        { name: "Kartongkast L", qty: "820 tk", pct: 78, tone: "ok" },
        { name: "Liimipulk", qty: "36 tk", pct: 14, tone: "low" },
        { name: "Pakketeip", qty: "310 rulli", pct: 55, tone: "mid" },
    ];

    return (
        <div
            className="rounded-[6px] border"
            style={{ borderColor: c.border, background: c.surface, boxShadow: "0 24px 60px rgba(0,0,0,0.4)" }}
        >
            {/* päisriba */}
            <div className="flex items-center justify-between border-b px-5 py-3" style={{ borderColor: c.border }}>
                <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: `${c.danger}99` }} />
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: `${c.amber}99` }} />
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: `${c.success}99` }} />
                    <span className="ml-3 font-mono text-[11px]" style={{ color: c.mutedDark }}>
                        laotark.ee/dashboard
                    </span>
                </div>
                <div className="hidden gap-4 sm:flex">
                    {["Ülevaade", "Liikumised", "Tooted"].map((t, i) => (
                        <span
                            key={t}
                            className="font-mono text-[11px]"
                            style={{ color: i === 0 ? c.amberLight : c.mutedDark }}
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>

            <div className="p-5">
                {/* KPI kaardid */}
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                    {kpis.map((k) => (
                        <div
                            key={k.label}
                            className="rounded-[4px] border p-3"
                            style={{ borderColor: c.border, background: c.surface2 }}
                        >
                            <div className="flex items-center justify-between">
                                <k.icon size={13} color={k.tone} />
                                <span className="font-mono text-[10px]" style={{ color: k.tone }}>
                                    {k.delta}
                                </span>
                            </div>
                            <p className="mt-2 font-mono text-[15px] font-medium" style={{ color: c.text }}>
                                {k.value}
                            </p>
                            <p className="mt-0.5 text-[11px]" style={{ color: c.mutedDark }}>
                                {k.label}
                            </p>
                        </div>
                    ))}
                </div>

                {/* graafik + legend */}
                <div className="mt-5 rounded-[4px] border p-4" style={{ borderColor: c.border }}>
                    <div className="flex items-center justify-between">
                        <p className="text-[12px]" style={{ color: c.muted }}>
                            Kulu vs lisandus, viimased 6 kuud
                        </p>
                        <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1.5 font-mono text-[10px]" style={{ color: c.mutedDark }}>
                                <span className="h-1.5 w-1.5 rounded-full" style={{ background: c.danger }} /> kulu
                            </span>
                            <span className="flex items-center gap-1.5 font-mono text-[10px]" style={{ color: c.mutedDark }}>
                                <span className="h-1.5 w-1.5 rounded-full" style={{ background: c.success }} /> lisandus
                            </span>
                        </div>
                    </div>
                    <div className="mt-3">
                        <MiniBarChart />
                    </div>
                </div>

                {/* laoseisu tabel */}
                <div className="mt-5 overflow-hidden rounded-[4px] border" style={{ borderColor: c.border }}>
                    {stock.map((s) => (
                        <div
                            key={s.name}
                            className="lt-row flex items-center gap-4 border-t px-4 py-3 text-[13px] first:border-t-0"
                            style={{ borderColor: c.border }}
                        >
                            <span className="w-28 flex-shrink-0 truncate" style={{ color: c.text }}>
                                {s.name}
                            </span>
                            <div className="flex-1">
                                <StockBar pct={s.pct} tone={s.tone} />
                            </div>
                            <span className="w-16 flex-shrink-0 text-right font-mono text-[12px]" style={{ color: c.mutedDark }}>
                                {s.qty}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ---------------------------------------------------------
   Lahendus — päris dashboard + ühikute kaart
--------------------------------------------------------- */
function Solution() {
    return (
        <section id="funktsioonid" className="py-24">
            <div className="mx-auto max-w-6xl px-6">
                <Reveal>
                    <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: c.amber }}>
                        Lahendus
                    </p>
                    <h2 className="mt-3 max-w-xl text-3xl font-medium tracking-tight lg:text-4xl" style={{ color: c.text }}>
                        Üks vaade, kogu ladu.
                    </h2>
                    <p className="mt-4 max-w-lg text-[15px] leading-relaxed" style={{ color: c.muted }}>
                        Iga kogus, mis lattu tuleb või sealt lahkub, jääb märgituks —
                        kuupäev, summa, kasutaja. Dashboard näitab kulu, lisandust ja
                        madala laoseisuga tooteid ühe pilguga.
                    </p>
                </Reveal>

                <div className="mt-12">
                    <Reveal delay={0.1} y={30}>
                        <DashboardMockup />
                    </Reveal>
                </div>

                <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-center">
                    <Reveal>
                        <div>
                            <h3 className="text-xl font-medium" style={{ color: c.text }}>
                                Mõõtühikud, mis sobivad sinu kaubale
                            </h3>
                            <p className="mt-3 max-w-md text-[15px] leading-relaxed" style={{ color: c.muted }}>
                                Tükid, pakid, liitrid, kilogrammid, meetrid — ja kui vaja,
                                lisa täpselt see ühik, mida sinu äri päriselt kasutab.
                            </p>
                        </div>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <div
                            className="lt-card-hover rounded-[6px] border p-5"
                            style={{ borderColor: c.border, background: c.surface }}
                        >
                            <div className="grid grid-cols-3 gap-3">
                                {["tk", "pakk", "l", "kg", "g", "m"].map((u) => (
                                    <div
                                        key={u}
                                        className="rounded-[4px] border py-3 text-center font-mono text-[13px] transition hover:border-amber-400"
                                        style={{ borderColor: c.border, color: c.muted }}
                                    >
                                        {u}
                                    </div>
                                ))}
                            </div>
                            <p className="mt-4 font-mono text-[11px]" style={{ color: c.mutedDark }}>
                                + lisa oma mõõtühik
                            </p>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

/* ---------------------------------------------------------
   Funktsioonide kaardid — laosildi nurgalõikega grid
--------------------------------------------------------- */
function Features() {
    const items = [
        { icon: Bell, title: "Automaatne teavitus", body: "Saad teate niipea, kui toode langeb sinu määratud lävendist allapoole." },
        { icon: FileDown, title: "Ekspordi Excelisse", body: "Vajad aruannet raamatupidajale? Ühe klikiga .xlsx fail kogu liikumisajaloost." },
        { icon: MapPin, title: "Mitu asukohta", body: "Halda mitut ladu või poodi eraldi, aga vaata koondseisu ühest kohast." },
        { icon: Users, title: "Kasutajate õigused", body: "Anna töötajatele ligipääs ainult sellele, mida nad päriselt vajavad." },
        { icon: ShieldCheck, title: "Andmed turvaliselt", body: "Kõik andmed talletatakse ja varundatakse EL serverites." },
        { icon: LineChart, title: "Selged trendid", body: "Näe kuu- ja kvartalitrende, et osta materjali täpselt õigel ajal." },
    ];
    return (
        <section className="py-24">
            <div className="mx-auto max-w-6xl px-6">
                <Reveal>
                    <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: c.amber }}>
                        Funktsioonid
                    </p>
                    <h2 className="mt-3 max-w-xl text-3xl font-medium tracking-tight lg:text-4xl" style={{ color: c.text }}>
                        Kõik, mida väikeladu päriselt vajab.
                    </h2>
                </Reveal>

                <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((it, i) => (
                        <Reveal key={it.title} delay={0.05 * i}>
                            <div
                                className="lt-card-hover h-full border p-6"
                                style={{ borderColor: c.border, background: c.surface, clipPath: tagClipSm }}
                            >
                                <div
                                    className="flex h-9 w-9 items-center justify-center rounded-[4px] border"
                                    style={{ borderColor: `${c.amber}55`, background: c.amberSoft }}
                                >
                                    <it.icon size={16} color={c.amber} strokeWidth={1.8} />
                                </div>
                                <h3 className="mt-4 text-[15px] font-medium" style={{ color: c.text }}>
                                    {it.title}
                                </h3>
                                <p className="mt-2 text-[13px] leading-relaxed" style={{ color: c.muted }}>
                                    {it.body}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ---------------------------------------------------------
   Kuidas töötab — pärisjärjekord, ühendav joon
--------------------------------------------------------- */
function HowItWorks() {
    const steps = [
        { icon: PlusCircle, title: "Lisa tooted", body: "Sisesta oma tooted korra — nimi, kogus, ostuhind, mõõtühik." },
        { icon: Repeat, title: "Registreeri liikumised", body: "Kulu või lisandus paari puudutusega, ka telefonis." },
        { icon: LineChart, title: "Jälgi laoseisu", body: "Selge kuuülevaade sellest, mis kulus ja mis on otsas." },
    ];
    return (
        <section id="kuidas-toetab" className="py-24" style={{ background: c.surface }}>
            <div className="mx-auto max-w-6xl px-6">
                <Reveal>
                    <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: c.amber }}>
                        Kuidas töötab
                    </p>
                    <h2 className="mt-3 max-w-xl text-3xl font-medium tracking-tight lg:text-4xl" style={{ color: c.text }}>
                        Kolm sammu ajakohase laoseisuni.
                    </h2>
                </Reveal>

                <div className="relative mt-14 grid gap-10 lg:grid-cols-3">
                    <div
                        className="pointer-events-none absolute left-0 right-0 top-[22px] hidden h-px lg:block"
                        style={{ background: `linear-gradient(90deg, ${c.border}, ${c.amber}55, ${c.border})` }}
                    />
                    {steps.map((s, i) => (
                        <Reveal key={s.title} delay={0.12 * i}>
                            <div>
                                <div className="relative flex items-center gap-4">
                                    <div
                                        className="lt-card-hover flex h-11 w-11 items-center justify-center rounded-[4px] border"
                                        style={{ borderColor: `${c.amber}66`, background: c.amberSoft, zIndex: 1 }}
                                    >
                                        <s.icon size={19} color={c.amber} strokeWidth={1.8} />
                                    </div>
                                    <span className="font-mono text-2xl" style={{ color: c.border }}>
                                        0{i + 1}
                                    </span>
                                </div>
                                <h3 className="mt-5 text-lg font-medium" style={{ color: c.text }}>
                                    {s.title}
                                </h3>
                                <p className="mt-2 max-w-xs text-[14px] leading-relaxed" style={{ color: c.muted }}>
                                    {s.body}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ---------------------------------------------------------
   CTA — gradienthõõguga kaart, ujuv silt
--------------------------------------------------------- */
function CTA() {
    return (
        <section id="cta" className="relative overflow-hidden py-24">
            <div
                className="pointer-events-none absolute inset-0"
                style={{ background: `radial-gradient(ellipse 60% 60% at 50% 50%, ${c.glow}, transparent 65%)`, opacity: 0.6 }}
            />
            <div className="relative mx-auto max-w-6xl px-6">
                <Reveal>
                    <div
                        className="relative border p-12 text-center lg:p-16"
                        style={{ borderColor: `${c.amber}44`, background: c.surface }}
                    >
                        <div
                            className="lt-float-slow absolute -top-6 right-8 hidden rounded-[4px] border px-3 py-1.5 font-mono text-[11px] sm:block"
                            style={{ borderColor: c.border, background: c.bg, color: c.success, clipPath: tagClipSm }}
                        >
                            + 200 tk lisatud täna
                        </div>

                        <h2 className="mx-auto max-w-xl text-3xl font-medium tracking-tight lg:text-4xl" style={{ color: c.text }}>
                            Valmis oma lao lihtsamaks muutma?
                        </h2>
                        <p className="mx-auto mt-4 max-w-md text-[15px]" style={{ color: c.muted }}>
                            Alusta tasuta. Ilma krediitkaardita.
                        </p>
                        <div className="mt-8 flex justify-center">
                            <a
                                href="/login"
                                className="lt-btn inline-flex items-center gap-2 rounded-[4px] px-7 py-3 text-sm font-medium"
                                style={{ background: c.amber, color: c.bg }}
                            >
                                Proovi tasuta
                                <ArrowRight size={15} />
                            </a>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

/* ---------------------------------------------------------
   Footer
--------------------------------------------------------- */
function Footer() {
    return (
        <footer id="kontakt" style={{ background: c.surface }}>
            <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-3">
                <div>
                    <span className="font-mono text-[15px] font-medium" style={{ color: c.text }}>
                        LAOTARK
                    </span>
                    <p className="mt-3 max-w-xs text-[13px]" style={{ color: c.mutedDark }}>
                        Laohaldus, mis mahub taskusse.
                    </p>
                </div>
                <div>
                    <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: c.mutedDark }}>
                        Kontakt
                    </p>
                    <a href="mailto:info@laotark.ee" className="lt-link-underline mt-3 inline-block text-[13px]" style={{ color: c.muted }}>
                        info@laotark.ee
                    </a>
                </div>
                <div className="lg:text-right">
                    <p className="font-mono text-[11px]" style={{ color: c.mutedDark }}>
                        © 2026 LaoTark
                    </p>
                </div>
            </div>
        </footer>
    );
}

/* ---------------------------------------------------------
   Landing
--------------------------------------------------------- */
export default function Landing() {
    return (
        <div style={{ background: c.bg, color: c.text }} className="min-h-screen">
            <GlobalStyle />
            <Navbar />
            <main>
                <Hero />
                <Divider glow />
                <Problem />
                <Divider />
                <Solution />
                <Divider glow />
                <Features />
                <Divider />
                <HowItWorks />
                <Divider glow />
                <CTA />
            </main>
            <Footer />
        </div>
    );
}