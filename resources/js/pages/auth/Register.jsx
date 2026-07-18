import { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";


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
        `}</style>
    );
}

function Field({ icon: Icon, error, ...props }) {
    return (
        <div>
            <div className="relative">
                <Icon size={16} color={c.mutedDark} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" />
                <input {...props} className="lt-input w-full rounded-[4px] py-2.5 pl-10 pr-4 text-[14px]" />
            </div>
            {error && (
                <p className="mt-1.5 text-[12px]" style={{ color: c.danger }}>
                    {error}
                </p>
            )}
        </div>
    );
}

function AuthShell({ eyebrow, title, children, footer }) {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16" style={{ background: c.bg }}>
            <GlobalStyle />
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
                        {eyebrow}
                    </p>
                    <h1 className="mt-2 text-2xl font-medium tracking-tight" style={{ color: c.text }}>
                        {title}
                    </h1>

                    {children}
                </div>

                {footer && (
                    <p className="mt-6 text-center text-[13px]" style={{ color: c.mutedDark }}>
                        {footer}
                    </p>
                )}
            </div>
        </div>
    );
}

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <>
            <Head title="Registreeru" />
            <AuthShell
                eyebrow="Alusta tasuta"
                title="Loo konto"
                footer={
                    <>
                        Juba on konto olemas?{" "}
                        <Link href={route("login")} className="lt-link-underline font-medium" style={{ color: c.amberLight }}>
                            Logi sisse
                        </Link>
                    </>
                }
            >
                <form onSubmit={submit} className="mt-7 space-y-5">
                    <div>
                        <label htmlFor="name" className="mb-1.5 block font-mono text-[11px] uppercase tracking-widest" style={{ color: c.mutedDark }}>
                            Nimi
                        </label>
                        <Field
                            icon={User}
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            autoComplete="name"
                            autoFocus
                            placeholder="Su nimi"
                            onChange={(e) => setData("name", e.target.value)}
                            error={errors.name}
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="mb-1.5 block font-mono text-[11px] uppercase tracking-widest" style={{ color: c.mutedDark }}>
                            E-post
                        </label>
                        <Field
                            icon={Mail}
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            autoComplete="username"
                            placeholder="sina@ettevote.ee"
                            onChange={(e) => setData("email", e.target.value)}
                            error={errors.email}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-1.5 block font-mono text-[11px] uppercase tracking-widest" style={{ color: c.mutedDark }}>
                            Parool
                        </label>
                        <div className="relative">
                            <Field
                                icon={Lock}
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={data.password}
                                autoComplete="new-password"
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

                    <div>
                        <label
                            htmlFor="password_confirmation"
                            className="mb-1.5 block font-mono text-[11px] uppercase tracking-widest"
                            style={{ color: c.mutedDark }}
                        >
                            Kinnita parool
                        </label>
                        <div className="relative">
                            <Field
                                icon={Lock}
                                id="password_confirmation"
                                type={showConfirm ? "text" : "password"}
                                name="password_confirmation"
                                value={data.password_confirmation}
                                autoComplete="new-password"
                                placeholder="••••••••"
                                onChange={(e) => setData("password_confirmation", e.target.value)}
                                error={errors.password_confirmation}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm((v) => !v)}
                                className="absolute right-3 top-[13px]"
                                style={{ color: c.mutedDark }}
                                tabIndex={-1}
                                aria-label={showConfirm ? "Peida parool" : "Näita parooli"}
                            >
                                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="lt-btn flex w-full items-center justify-center gap-2 rounded-[4px] py-3 text-sm font-medium"
                        style={{ background: c.amber, color: c.bg }}
                    >
                        Loo konto
                        <ArrowRight size={15} />
                    </button>
                </form>
            </AuthShell>
        </>
    );
}