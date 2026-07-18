import { Head, Link, useForm } from "@inertiajs/react";
import { Mail, ArrowRight, ArrowLeft } from "lucide-react";

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

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.email"));
    };

    return (
        <>
            <Head title="Unustasid parooli?" />
            <AuthShell
                eyebrow="Taasta ligipääs"
                title="Unustasid parooli?"
                footer={
                    <Link href={route("login")} className="lt-link-underline inline-flex items-center gap-1.5 font-medium" style={{ color: c.amberLight }}>
                        <ArrowLeft size={13} />
                        Tagasi sisselogimise juurde
                    </Link>
                }
            >
                <p className="mt-3 text-[14px] leading-relaxed" style={{ color: c.muted }}>
                    Sisesta oma e-posti aadress ja saadame sulle lingi, millega saad
                    seada uue parooli.
                </p>

                {status && (
                    <div
                        className="mt-5 rounded-[4px] border px-4 py-2.5 text-[13px]"
                        style={{ borderColor: "rgba(111,174,122,0.35)", background: "rgba(111,174,122,0.1)", color: "#8FC79A" }}
                    >
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="mt-6 space-y-5">
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
                            autoFocus
                            placeholder="sina@ettevote.ee"
                            onChange={(e) => setData("email", e.target.value)}
                            error={errors.email}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="lt-btn flex w-full items-center justify-center gap-2 rounded-[4px] py-3 text-sm font-medium"
                        style={{ background: c.amber, color: c.bg }}
                    >
                        Saada taastamislink
                        <ArrowRight size={15} />
                    </button>
                </form>
            </AuthShell>
        </>
    );
}