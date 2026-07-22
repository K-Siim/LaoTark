import React, { useState, useRef } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import {
    User,
    Mail,
    Lock,
    LogOut,
    ChevronDown,
    Menu,
    X,
    ArrowRight,
    AlertTriangle,
    CheckCircle2,
    Trash2,
    ShieldAlert,
} from "lucide-react";

/* ---------------------------------------------------------
   Samad disainitokenid — kui juba tõstsid need ühisesse
   faili teiste Auth-lehtede jaoks, impordi sealt selle asemel.
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
    dangerSoft: "rgba(217,113,79,0.12)",
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
            .lt-btn-danger:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 26px rgba(217,113,79,0.28); }
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
            .lt-input-danger:focus { border-color: ${c.danger}; box-shadow: 0 0 0 3px rgba(217,113,79,0.15); }
            .lt-card-hover { transition: border-color 0.3s ease; }
            .lt-modal-enter { animation: lt-modal-in 0.2s cubic-bezier(.16,.84,.44,1); }
            @keyframes lt-modal-in { from { opacity: 0; transform: translateY(8px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        `}</style>
    );
}

const Field = React.forwardRef(function Field({ icon: Icon, error, className = "", ...props }, ref) {
    return (
        <div>
            <div className="relative">
                {Icon && (
                    <Icon size={16} color={c.mutedDark} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" />
                )}
                <input
                    ref={ref}
                    {...props}
                    className={`lt-input w-full rounded-[4px] py-2.5 pr-4 text-[14px] ${Icon ? "pl-10" : "pl-4"} ${className}`}
                />
            </div>
            {error && (
                <p className="mt-1.5 text-[12px]" style={{ color: c.danger }}>
                    {error}
                </p>
            )}
        </div>
    );
});

function Label({ htmlFor, children }) {
    return (
        <label htmlFor={htmlFor} className="mb-1.5 block font-mono text-[11px] uppercase tracking-widest" style={{ color: c.mutedDark }}>
            {children}
        </label>
    );
}

function SectionCard({ eyebrow, title, description, danger, children }) {
    return (
        <div
            className="lt-card-hover border p-8"
            style={{
                borderColor: danger ? "rgba(217,113,79,0.35)" : c.border,
                background: c.surface,
                clipPath: tagClip,
            }}
        >
            <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: danger ? c.danger : c.amber }}>
                {eyebrow}
            </p>
            <h2 className="mt-2 text-lg font-medium" style={{ color: c.text }}>
                {title}
            </h2>
            {description && (
                <p className="mt-2 max-w-lg text-[13px] leading-relaxed" style={{ color: c.muted }}>
                    {description}
                </p>
            )}
            <div className="mt-6">{children}</div>
        </div>
    );
}

/* ---------------------------------------------------------
   Navbar sisselogitud kasutajale
--------------------------------------------------------- */
function AuthenticatedNav({ user }) {
    const [open, setOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const links = [
        { label: "Töölaud", href: "/dashboard" },
        { label: "Profiil", href: route ? route("profile.edit") : "/profile" },
    ];

    return (
        <header className="sticky top-0 z-50 border-b backdrop-blur" style={{ borderColor: c.border, background: `${c.bg}F2` }}>
            <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
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
                            <div
                                className="flex h-6 w-6 items-center justify-center rounded-full font-mono text-[11px] font-medium"
                                style={{ background: c.amberSoft, color: c.amberLight }}
                            >
                                {(user?.name ?? "?").charAt(0).toUpperCase()}
                            </div>
                            {user?.name ?? "Kasutaja"}
                            <ChevronDown size={14} color={c.mutedDark} />
                        </button>

                        {menuOpen && (
                            <div
                                className="absolute right-0 mt-2 w-48 rounded-[4px] border py-1"
                                style={{ borderColor: c.border, background: c.surface, boxShadow: "0 16px 40px rgba(0,0,0,0.4)" }}
                            >
                                <a href={route ? route("profile.edit") : "/profile"} className="block px-4 py-2 text-[13px]" style={{ color: c.text }}>
                                    Profiil
                                </a>
                                <Link
                                    href={route ? route("logout") : "/logout"}
                                    method="post"
                                    as="button"
                                    className="block w-full px-4 py-2 text-left text-[13px]"
                                    style={{ color: c.danger }}
                                >
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
   Profiili info vorm
--------------------------------------------------------- */
function UpdateProfileInformationForm({ mustVerifyEmail, status, user }) {
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user?.name ?? "",
        email: user?.email ?? "",
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.update"));
    };

    return (
        <SectionCard
            eyebrow="Konto"
            title="Profiili info"
            description="Uuenda oma nime ja e-posti aadressi."
        >
            <form onSubmit={submit} className="space-y-5">
                <div>
                    <Label htmlFor="name">Nimi</Label>
                    <Field icon={User} id="name" value={data.name} onChange={(e) => setData("name", e.target.value)} error={errors.name} autoComplete="name" required />
                </div>

                <div>
                    <Label htmlFor="email">E-post</Label>
                    <Field icon={Mail} id="email" type="email" value={data.email} onChange={(e) => setData("email", e.target.value)} error={errors.email} autoComplete="username" required />
                </div>

                {mustVerifyEmail && user?.email_verified_at === null && (
                    <div className="rounded-[4px] border px-4 py-3 text-[13px]" style={{ borderColor: "rgba(227,162,59,0.35)", background: c.amberSoft, color: c.amberLight }}>
                        Sinu e-post ei ole veel kinnitatud.{" "}
                        <Link href={route("verification.send")} method="post" as="button" className="lt-link-underline font-medium">
                            Saada kinnituslink uuesti
                        </Link>
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="lt-btn inline-flex items-center gap-2 rounded-[4px] px-6 py-2.5 text-sm font-medium"
                        style={{ background: c.amber, color: c.bg }}
                    >
                        Salvesta
                        <ArrowRight size={15} />
                    </button>
                    {recentlySuccessful && (
                        <span className="inline-flex items-center gap-1.5 text-[13px]" style={{ color: c.success }}>
                            <CheckCircle2 size={14} />
                            Salvestatud
                        </span>
                    )}
                </div>
            </form>
        </SectionCard>
    );
}

/* ---------------------------------------------------------
   Parooli vahetuse vorm
--------------------------------------------------------- */
function UpdatePasswordForm() {
    const { data, setData, put, errors, processing, recentlySuccessful, reset } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("password.update"), {
            onSuccess: () => reset(),
            onError: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <SectionCard eyebrow="Turvalisus" title="Vaheta parool" description="Kasuta pikka, unikaalset parooli, mida sa mujal ei kasuta.">
            <form onSubmit={submit} className="space-y-5">
                <div>
                    <Label htmlFor="current_password">Praegune parool</Label>
                    <Field icon={Lock} id="current_password" type="password" value={data.current_password} onChange={(e) => setData("current_password", e.target.value)} error={errors.current_password} autoComplete="current-password" />
                </div>

                <div>
                    <Label htmlFor="password">Uus parool</Label>
                    <Field icon={Lock} id="password" type="password" value={data.password} onChange={(e) => setData("password", e.target.value)} error={errors.password} autoComplete="new-password" />
                </div>

                <div>
                    <Label htmlFor="password_confirmation">Kinnita uus parool</Label>
                    <Field icon={Lock} id="password_confirmation" type="password" value={data.password_confirmation} onChange={(e) => setData("password_confirmation", e.target.value)} error={errors.password_confirmation} autoComplete="new-password" />
                </div>

                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="lt-btn inline-flex items-center gap-2 rounded-[4px] px-6 py-2.5 text-sm font-medium"
                        style={{ background: c.amber, color: c.bg }}
                    >
                        Uuenda parool
                        <ArrowRight size={15} />
                    </button>
                    {recentlySuccessful && (
                        <span className="inline-flex items-center gap-1.5 text-[13px]" style={{ color: c.success }}>
                            <CheckCircle2 size={14} />
                            Salvestatud
                        </span>
                    )}
                </div>
            </form>
        </SectionCard>
    );
}

/* ---------------------------------------------------------
   Konto kustutamine — ohtlik tsoon + kinnitusmodal
--------------------------------------------------------- */
function DeleteUserForm() {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const passwordRef = useRef(null);

    const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm({
        password: "",
    });

    const confirmDelete = () => setConfirmOpen(true);

    const closeModal = () => {
        setConfirmOpen(false);
        clearErrors();
        reset();
    };

    const submit = (e) => {
        e.preventDefault();
        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordRef.current?.focus(),
            onFinish: () => reset(),
        });
    };

    return (
        <SectionCard
            danger
            eyebrow="Ohtlik tsoon"
            title="Kustuta konto"
            description="Kui konto kustutatakse, kaovad jäädavalt kõik andmed ja liikumisajalugu. Lae enne alla kõik, mida vajad."
        >
            <button
                onClick={confirmDelete}
                className="lt-btn lt-btn-danger inline-flex items-center gap-2 rounded-[4px] border px-6 py-2.5 text-sm font-medium"
                style={{ borderColor: "rgba(217,113,79,0.4)", background: c.dangerSoft, color: c.danger }}
            >
                <Trash2 size={15} />
                Kustuta konto
            </button>

            {confirmOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-6" onClick={closeModal}>
                    <div
                        className="lt-modal-enter w-full max-w-md border p-8"
                        style={{ borderColor: "rgba(217,113,79,0.35)", background: c.surface, clipPath: tagClip }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-[4px] border" style={{ borderColor: "rgba(217,113,79,0.4)", background: c.dangerSoft }}>
                            <ShieldAlert size={18} color={c.danger} />
                        </div>
                        <h3 className="mt-4 text-lg font-medium" style={{ color: c.text }}>
                            Oled kindel?
                        </h3>
                        <p className="mt-2 text-[13px] leading-relaxed" style={{ color: c.muted }}>
                            Seda tegevust ei saa tagasi võtta. Sisesta oma parool, et kinnitada konto jäädav kustutamine.
                        </p>

                        <form onSubmit={submit} className="mt-5">
                            <Field
                                icon={Lock}
                                id="delete_password"
                                type="password"
                                placeholder="Parool"
                                value={data.password}
                                onChange={(e) => setData("password", e.target.value)}
                                error={errors.password}
                                className="lt-input-danger"
                                ref={passwordRef}
                                autoFocus
                            />

                            <div className="mt-6 flex items-center justify-end gap-3">
                                <button type="button" onClick={closeModal} className="rounded-[4px] px-4 py-2.5 text-sm" style={{ color: c.muted }}>
                                    Loobu
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="lt-btn inline-flex items-center gap-2 rounded-[4px] px-5 py-2.5 text-sm font-medium"
                                    style={{ background: c.danger, color: c.bg }}
                                >
                                    <Trash2 size={14} />
                                    Kustuta jäädavalt
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </SectionCard>
    );
}

/* ---------------------------------------------------------
   Profiili leht
--------------------------------------------------------- */
export default function Edit({ mustVerifyEmail, status }) {
    const { auth } = usePage().props;

    return (
        <div style={{ background: c.bg, minHeight: "100vh" }}>
            <GlobalStyle />
            <Head title="Profiil" />
            <AuthenticatedNav user={auth?.user} />

            <div
                className="pointer-events-none fixed inset-0"
                style={{ background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${c.glow}, transparent 60%)`, opacity: 0.5 }}
            />

            <main className="relative mx-auto max-w-3xl px-6 py-16">
                <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: c.amber }}>
                    Konto seaded
                </p>
                <h1 className="mt-2 text-3xl font-medium tracking-tight" style={{ color: c.text }}>
                    Profiil
                </h1>
                <p className="mt-3 max-w-lg text-[14px] leading-relaxed" style={{ color: c.muted }}>
                    Halda oma konto infot, parooli ja turvalisust ühest kohast.
                </p>

                <div className="mt-12 space-y-6">
                    <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} user={auth?.user} />
                    <UpdatePasswordForm />
                    <DeleteUserForm />
                </div>
            </main>
        </div>
    );
}