import { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import {
    Menu,
    X,
    ChevronDown,
    LogOut,
    ArrowRight,
    PlusCircle,
    Repeat,
    LineChart,
    TrendingDown,
    TrendingUp,
    Boxes,
    AlertTriangle,
    Package,
    FileDown,
    CheckCircle2,
} from "lucide-react";

/* ---------------------------------------------------------
   Samad disainitokenid, mis mujal — kui oled need juba ühte
   ühisfaili tõstnud (nt @/theme), impordi sealt selle asemel.
--------------------------------------------------------- */
const c = {
    bg: "#14161A",
    surface: "#1B1E23",
    surface2: "#20242A",
    border: "#2A2E35",
    text: "#EDEAE2",
    muted: "#9CA3AF",
    mutedDark: "#6B7078",
    amber: "#E3A23B",
    amberLight: "#F2C57C",
    amberSoft: "rgba(227,162,59,0.12)",
    glow: "rgba(227,162,59,0.30)",
    danger: "#D9714F",
    success: "#6FAE7A",
};

const tagClip = "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)";
const tagClipSm = "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)";

function GlobalStyle() {
    return (
        <style>{`
            .lt-btn { transition: transform 0.25s cubic-bezier(.16,.84,.44,1), box-shadow 0.25s ease, background 0.25s ease; }
            .lt-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 26px rgba(227,162,59,0.28); }
            .lt-btn:active:not(:disabled) { transform: translateY(0px) scale(0.98); }
            .lt-link-underline { position: relative; }
            .lt-link-underline::after {
                content: ""; position: absolute; left: 0; bottom: -2px; height: 1px; width: 0%;
                background: ${c.amber}; transition: width 0.25s ease;
            }
            .lt-link-underline:hover::after { width: 100%; }
            .lt-card-hover { transition: transform 0.3s cubic-bezier(.16,.84,.44,1), border-color 0.3s ease, box-shadow 0.3s ease; }
            .lt-card-hover:hover { transform: translateY(-3px); border-color: rgba(227,162,59,0.45); box-shadow: 0 14px 34px rgba(0,0,0,0.35); }
        `}</style>
    );
}

/* ---------------------------------------------------------
   Navbar sisselogitud kasutajale (sama muster nagu Profile.jsx's —
   kui tõstsid selle juba jagatud komponendiks, kasuta seda siin)
--------------------------------------------------------- */
function AuthenticatedNav({ user }) {
    const [open, setOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const links = [
        { label: "Töölaud", href: "/dashboard" },
        { label: "Tooted", href: "/products" },
        { label: "Liikumised", href: "/movements" },
    ];

    return (
        <header className="sticky top-0 z-50 border-b backdrop-blur" style={{ borderColor: c.border, background: `${c.bg}F2` }}>
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                <Link href="/" className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-[4px] border" style={{ borderColor: `${c.amber}66`, background: c.amberSoft }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke={c.amber} strokeWidth="1.8" className="h-4 w-4">
                            <path d="M3 21h18" />
                            <path d="M5 21V7l7-4 7 4v14" />
                            <path d="M9 21v-6h6v6" />
                        </svg>
                    </div>
                    <span className="font-mono text-[15px] font-medium tracking-tight" style={{ color: c.text }}>
                        LAOTARK
                    </span>
                </Link>

                <nav className="hidden items-center gap-8 lg:flex">
                    {links.map((l) => (
                        <a key={l.href} href={l.href} className="lt-link-underline text-sm" style={{ color: c.muted }}>
                            {l.label}
                        </a>
                    ))}
                </nav>

                <div className="hidden lg:block">
                    <div className="relative">
                        <button
                            onClick={() => setMenuOpen((v) => !v)}
                            className="flex items-center gap-2 rounded-[4px] border px-3 py-1.5 text-sm"
                            style={{ borderColor: c.border, background: c.surface, color: c.text }}
                        >
                            <div className="flex h-6 w-6 items-center justify-center rounded-full font-mono text-[11px] font-medium" style={{ background: c.amberSoft, color: c.amberLight }}>
                                {(user?.name ?? "?").charAt(0).toUpperCase()}
                            </div>
                            {user?.name ?? "Kasutaja"}
                            <ChevronDown size={14} color={c.mutedDark} />
                        </button>

                        {menuOpen && (
                            <div className="absolute right-0 mt-2 w-48 rounded-[4px] border py-1" style={{ borderColor: c.border, background: c.surface, boxShadow: "0 16px 40px rgba(0,0,0,0.4)" }}>
                                <a href={route ? route("profile.edit") : "/profile"} className="block px-4 py-2 text-[13px]" style={{ color: c.text }}>
                                    Profiil
                                </a>
                                <Link href={route ? route("logout") : "/logout"} method="post" as="button" className="block w-full px-4 py-2 text-left text-[13px]" style={{ color: c.danger }}>
                                    <span className="inline-flex items-center gap-2">
                                        <LogOut size={13} />
                                        Logi välja
                                    </span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                <button className="rounded-[4px] p-2 lg:hidden" style={{ color: c.text }} onClick={() => setOpen((v) => !v)}>
                    {open ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {open && (
                <div className="border-t px-6 py-4 lg:hidden" style={{ borderColor: c.border, background: c.surface }}>
                    <div className="flex flex-col gap-3">
                        {links.map((l) => (
                            <a key={l.href} href={l.href} className="text-sm" style={{ color: c.text }}>
                                {l.label}
                            </a>
                        ))}
                        <Link href={route ? route("logout") : "/logout"} method="post" as="button" className="text-left text-sm" style={{ color: c.danger }}>
                            Logi välja
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}

/* ---------------------------------------------------------
   KPI kaart — sama stiil, mis landingu dashboard-mockupil,
   aga tühja-konto olekus (— asemel numbrid, kuni tulevad andmed)
--------------------------------------------------------- */
function StatCard({ icon: Icon, label, value, tone, hint }) {
    return (
        <div className="rounded-[4px] border p-4" style={{ borderColor: c.border, background: c.surface }}>
            <div className="flex items-center justify-between">
                <div className="flex h-8 w-8 items-center justify-center rounded-[4px] border" style={{ borderColor: `${tone}44`, background: `${tone}1F` }}>
                    <Icon size={14} color={tone} />
                </div>
            </div>
            <p className="mt-3 font-mono text-xl font-medium" style={{ color: c.text }}>
                {value}
            </p>
            <p className="mt-0.5 text-[12px]" style={{ color: c.mutedDark }}>
                {label}
            </p>
            {hint && (
                <p className="mt-1 text-[11px]" style={{ color: c.mutedDark, opacity: 0.8 }}>
                    {hint}
                </p>
            )}
        </div>
    );
}

/* ---------------------------------------------------------
   Onboarding samm — sama "kuidas töötab" muster landingult,
   aga nüüd tegeliku toimingu nupuga
--------------------------------------------------------- */
function OnboardingStep({ icon: Icon, title, body, actionLabel, href, done }) {
    return (
        <div
            className="lt-card-hover border p-6"
            style={{ borderColor: done ? "rgba(111,174,122,0.35)" : c.border, background: c.surface, clipPath: tagClipSm }}
        >
            <div className="flex items-center justify-between">
                <div
                    className="flex h-10 w-10 items-center justify-center rounded-[4px] border"
                    style={{
                        borderColor: done ? "rgba(111,174,122,0.4)" : `${c.amber}55`,
                        background: done ? "rgba(111,174,122,0.12)" : c.amberSoft,
                    }}
                >
                    {done ? <CheckCircle2 size={17} color={c.success} /> : <Icon size={17} color={c.amber} strokeWidth={1.8} />}
                </div>
            </div>
            <h3 className="mt-4 text-[15px] font-medium" style={{ color: c.text }}>
                {title}
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed" style={{ color: c.muted }}>
                {body}
            </p>
            {!done && (
                <a href={href} className="lt-link-underline mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium" style={{ color: c.amberLight }}>
                    {actionLabel}
                    <ArrowRight size={13} />
                </a>
            )}
        </div>
    );
}

/* ---------------------------------------------------------
   Kiirtoimingu plaat
--------------------------------------------------------- */
function QuickAction({ icon: Icon, title, body, href }) {
    return (
        <a
            href={href}
            className="lt-card-hover flex items-start gap-4 border p-5"
            style={{ borderColor: c.border, background: c.surface, clipPath: tagClipSm }}
        >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[4px] border" style={{ borderColor: `${c.amber}55`, background: c.amberSoft }}>
                <Icon size={17} color={c.amber} strokeWidth={1.8} />
            </div>
            <div>
                <h3 className="text-[14px] font-medium" style={{ color: c.text }}>
                    {title}
                </h3>
                <p className="mt-1 text-[12px] leading-relaxed" style={{ color: c.muted }}>
                    {body}
                </p>
            </div>
        </a>
    );
}

/* ---------------------------------------------------------
   Dashboard
--------------------------------------------------------- */
export default function Dashboard({ hasProducts = false, hasMovements = false }) {
    const { auth } = usePage().props;
    const firstName = (auth?.user?.name ?? "").split(" ")[0] || "seal";

    return (
        <div style={{ background: c.bg, minHeight: "100vh" }}>
            <GlobalStyle />
            <Head title="Töölaud" />
            <AuthenticatedNav user={auth?.user} />

            {/* hero-laadne tervitus, samad tokenid mis landingul */}
            <section className="relative overflow-hidden">
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{ background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${c.glow}, transparent 60%)` }}
                />
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right,#EDEAE2 1px,transparent 1px),linear-gradient(to bottom,#EDEAE2 1px,transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />
                <div className="relative mx-auto max-w-6xl px-6 py-16 lg:py-20">
                    <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: c.amber }}>
                        Tere tulemast
                    </p>
                    <h1 className="mt-3 text-4xl font-medium tracking-tight lg:text-5xl" style={{ color: c.text }}>
                        Tere, {firstName}.
                    </h1>
                    <p className="mt-4 max-w-lg text-[15px] leading-relaxed" style={{ color: c.muted }}>
                        Siin on sinu lao ülevaade. Alusta esimese toote lisamisega, et
                        näha siin päris numbreid.
                    </p>

                    {/* KPI-read — tühja konto olekus */}
                    <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
                        <StatCard icon={TrendingDown} label="Kulus sel kuul" value="—" tone={c.danger} hint="Andmeid pole veel" />
                        <StatCard icon={TrendingUp} label="Lisati sel kuul" value="—" tone={c.success} hint="Andmeid pole veel" />
                        <StatCard icon={Boxes} label="Laoseis kokku" value="—" tone={c.amberLight} hint="Andmeid pole veel" />
                        <StatCard icon={AlertTriangle} label="Madal laoseis" value="—" tone={c.amber} hint="Andmeid pole veel" />
                    </div>
                </div>
            </section>

            <main className="mx-auto max-w-6xl px-6 pb-24">
                {/* onboarding checklist */}
                <div className="mt-4">
                    <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: c.amber }}>
                        Alusta siit
                    </p>
                    <h2 className="mt-2 text-2xl font-medium tracking-tight" style={{ color: c.text }}>
                        Kolm sammu, et ladu tööle saada
                    </h2>

                    <div className="mt-8 grid gap-5 lg:grid-cols-3">
                        <OnboardingStep
                            icon={PlusCircle}
                            title="1. Lisa tooted"
                            body="Sisesta oma tooted korra — nimi, kogus, ostuhind, mõõtühik."
                            actionLabel="Lisa esimene toode"
                            href="/products/create"
                            done={hasProducts}
                        />
                        <OnboardingStep
                            icon={Repeat}
                            title="2. Registreeri liikumine"
                            body="Märgi üks kulu või lisandus, et näha, kuidas jälgimine töötab."
                            actionLabel="Registreeri liikumine"
                            href="/movements/create"
                            done={hasMovements}
                        />
                        <OnboardingStep
                            icon={LineChart}
                            title="3. Jälgi laoseisu"
                            body="Kui esimesed andmed on sees, näed siin dashboardil päris trende."
                            actionLabel="Vaata aruannet"
                            href="/reports"
                            done={false}
                        />
                    </div>
                </div>

                {/* kiirtoimingud */}
                <div className="mt-16">
                    <h2 className="text-lg font-medium" style={{ color: c.text }}>
                        Kiirtoimingud
                    </h2>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <QuickAction icon={PlusCircle} title="Lisa toode" body="Uus toode koos mõõtühiku ja algkogusega." href="/products/create" />
                        <QuickAction icon={Repeat} title="Registreeri liikumine" body="Märgi kaubaliikumine — kulu või lisandus." href="/movements/create" />
                        <QuickAction icon={Package} title="Halda tooteid" body="Vaata ja muuda oma tootenimekirja." href="/products" />
                        <QuickAction icon={FileDown} title="Ekspordi Excelisse" body="Lae alla kogu liikumisajalugu .xlsx failina." href="/reports/export" />
                    </div>
                </div>

                {/* viimased liikumised — tühi olek */}
                <div className="mt-16">
                    <h2 className="text-lg font-medium" style={{ color: c.text }}>
                        Viimased liikumised
                    </h2>
                    <div
                        className="mt-5 flex flex-col items-center justify-center gap-3 rounded-[6px] border border-dashed px-6 py-14 text-center"
                        style={{ borderColor: c.border }}
                    >
                        <div className="flex h-11 w-11 items-center justify-center rounded-[4px] border" style={{ borderColor: c.border, background: c.surface2 }}>
                            <Repeat size={18} color={c.mutedDark} />
                        </div>
                        <p className="text-[14px]" style={{ color: c.muted }}>
                            Sul pole veel ühtegi liikumist registreeritud.
                        </p>
                        <a href="/movements/create" className="lt-btn mt-2 inline-flex items-center gap-2 rounded-[4px] px-5 py-2.5 text-sm font-medium" style={{ background: c.amber, color: c.bg }}>
                            Registreeri esimene liikumine
                            <ArrowRight size={15} />
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
}