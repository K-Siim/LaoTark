import { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

/* ---------------------------------------------------------
   Samad disainitokenid, mis Landing.jsx's — üks tõeallikas.
   Kui sul on need juba eraldi failis (nt @/theme), impordi
   sealt selle asemel, et vältida duplikatsiooni.
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
};

const tagClip = "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)";

function GlobalStyle() {
    return (
        <style>{`
            .lt-btn { transition: transform 0.25s cubic-bezier(.16,.84,.44,1), box-shadow 0.25s ease, background 0.25s ease; }
            .lt-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 26px rgba(227,162,59,0.28); }
            .lt-btn:active:not(:disabled) { transform: translateY(0px) scale(0.98); }
            .lt-btn:disabled { opacity: 0.6; cursor: not-allowed; }
            .lt-link-underline { position: relative; }
            .lt-link-underline::after {
                content: ""; position: absolute; left: 0; bottom: -2px; height: 1px; width: 0%;
                background: ${c.amber}; transition: width 0.25s ease;
            }
            .lt-link-underline:hover::after { width: 100%; }
            .lt-input {
                background: ${c.surface2};
                border: 1px solid ${c.border};
                color: ${c.text};
                transition: border-color 0.2s ease, box-shadow 0.2s ease;
            }
            .lt-input:focus {
                outline: none;
                border-color: ${c.amber};
                box-shadow: 0 0 0 3px rgba(227,162,59,0.15);
            }
            .lt-input::placeholder { color: ${c.mutedDark}; }
            .lt-checkbox {
                appearance: none;
                width: 16px;
                height: 16px;
                border-radius: 3px;
                border: 1px solid ${c.border};
                background: ${c.surface2};
                cursor: pointer;
                position: relative;
                flex-shrink: 0;
                transition: border-color 0.2s ease, background 0.2s ease;
            }
            .lt-checkbox:checked {
                background: ${c.amber};
                border-color: ${c.amber};
            }
            .lt-checkbox:checked::after {
                content: "";
                position: absolute;
                left: 5px;
                top: 1px;
                width: 4px;
                height: 8px;
                border: solid ${c.bg};
                border-width: 0 2px 2px 0;
                transform: rotate(45deg);
            }
        `}</style>
    );
}

function Field({ icon: Icon, error, ...props }) {
    return (
        <div>
            <div className="relative">
                <Icon size={16} color={c.mutedDark} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                    {...props}
                    className="lt-input w-full rounded-[4px] py-2.5 pl-10 pr-4 text-[14px]"
                />
            </div>
            {error && (
                <p className="mt-1.5 text-[12px]" style={{ color: c.danger }}>
                    {error}
                </p>
            )}
        </div>
    );
}

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div
            className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16"
            style={{ background: c.bg }}
        >
            <Head title="Logi sisse" />
            <GlobalStyle />

            {/* taustagradient + ruudustik, samad mis hero'l */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${c.glow}, transparent 60%)` }}
            />
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage:
                        "linear-gradient(to right,#EDEAE2 1px,transparent 1px),linear-gradient(to bottom,#EDEAE2 1px,transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="relative w-full max-w-md">
                {/* logo */}
                <Link href="/" className="mb-8 flex items-center justify-center gap-3">
                    <div
                        className="flex h-9 w-9 items-center justify-center rounded-[4px] border"
                        style={{ borderColor: `${c.amber}66`, background: c.amberSoft }}
                    >
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

                <div
                    className="border p-8 sm:p-10"
                    style={{ borderColor: c.border, background: c.surface, boxShadow: "0 24px 60px rgba(0,0,0,0.4)", clipPath: tagClip }}
                >
                    <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: c.amber }}>
                        Tere tulemast tagasi
                    </p>
                    <h1 className="mt-2 text-2xl font-medium tracking-tight" style={{ color: c.text }}>
                        Logi sisse
                    </h1>

                    {status && (
                        <div
                            className="mt-5 rounded-[4px] border px-4 py-2.5 text-[13px]"
                            style={{ borderColor: "rgba(111,174,122,0.35)", background: "rgba(111,174,122,0.1)", color: "#8FC79A" }}
                        >
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="mt-7 space-y-5">
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-1.5 block font-mono text-[11px] uppercase tracking-widest"
                                style={{ color: c.mutedDark }}
                            >
                                E-post
                            </label>
                            <Field
                                icon={Mail}
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                autoComplete="username"
                                autoFocus
                                placeholder="sina@ettevote.ee"
                                onChange={(e) => setData("email", e.target.value)}
                                error={errors.email}
                            />
                        </div>

                        <div>
                            <div className="mb-1.5 flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block font-mono text-[11px] uppercase tracking-widest"
                                    style={{ color: c.mutedDark }}
                                >
                                    Parool
                                </label>
                                {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        className="lt-link-underline font-mono text-[11px]"
                                        style={{ color: c.mutedDark }}
                                    >
                                        Unustasid parooli?
                                    </Link>
                                )}
                            </div>
                            <div className="relative">
                                <Field
                                    icon={Lock}
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={data.password}
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    onChange={(e) => setData("password", e.target.value)}
                                    error={errors.password}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-3 top-[13px]"
                                    style={{ color: c.mutedDark }}
                                    tabIndex={-1}
                                    aria-label={showPassword ? "Peida parool" : "Näita parooli"}
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <label className="flex cursor-pointer items-center gap-2.5">
                            <input
                                type="checkbox"
                                name="remember"
                                className="lt-checkbox"
                                checked={data.remember}
                                onChange={(e) => setData("remember", e.target.checked)}
                            />
                            <span className="text-[13px]" style={{ color: c.muted }}>
                                Jäta mind meelde
                            </span>
                        </label>

                        <button
                            type="submit"
                            disabled={processing}
                            className="lt-btn flex w-full items-center justify-center gap-2 rounded-[4px] py-3 text-sm font-medium"
                            style={{ background: c.amber, color: c.bg }}
                        >
                            Logi sisse
                            <ArrowRight size={15} />
                        </button>
                    </form>
                </div>

                <p className="mt-6 text-center text-[13px]" style={{ color: c.mutedDark }}>
                    Pole veel kontot?{" "}
                    <Link href={route("register")} className="lt-link-underline font-medium" style={{ color: c.amberLight }}>
                        Registreeru
                    </Link>
                </p>
            </div>
        </div>
    );
}