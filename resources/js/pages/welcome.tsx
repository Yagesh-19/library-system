import { dashboard, login, register } from '@/routes';
import type { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { BookOpen, ShieldCheck, Users, Sparkles, ArrowRight } from 'lucide-react';

export default function Welcome({ canRegister = true }: { canRegister?: boolean }) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="LibraSys">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <div className="min-h-screen bg-[#0b1220] text-slate-100">
                <div className="relative overflow-hidden">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(46,195,130,0.15),_transparent_45%),radial-gradient(circle_at_20%_20%,_rgba(56,189,248,0.1),_transparent_35%),radial-gradient(circle_at_80%_0%,_rgba(99,102,241,0.12),_transparent_40%)]" />
                    <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-14 px-6 py-10 font-display lg:px-10">
                        <header className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-[0_12px_30px_rgba(16,185,129,0.35)]">
                                    <BookOpen className="h-5 w-5 text-emerald-950" />
                                </div>
                                <div>
                                    <p className="text-xl font-semibold text-white">LibraSys</p>
                                    <p className="text-xs text-slate-400">Library Management System</p>
                                </div>
                            </div>
                            <nav className="flex flex-wrap items-center gap-3">
                                {auth.user ? (
                                    <Link
                                        href={dashboard()}
                                        className="inline-flex items-center gap-2 rounded-full border border-emerald-400/60 px-4 py-2 text-sm font-semibold text-emerald-200"
                                    >
                                        Go to Dashboard
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={login()}
                                            className="rounded-full border border-[#1f2a3d] px-4 py-2 text-sm font-semibold text-slate-200 hover:text-white"
                                        >
                                            Log in
                                        </Link>
                                        {canRegister && (
                                            <Link
                                                href={register()}
                                                className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-950"
                                            >
                                                Register
                                            </Link>
                                        )}
                                    </>
                                )}
                            </nav>
                        </header>

                        <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1 text-xs font-semibold text-emerald-200">
                                    <Sparkles className="h-3.5 w-3.5" />
                                    Smart, unified library operations
                                </div>
                                <h1 className="text-4xl font-semibold text-white lg:text-5xl">
                                    Manage your library with clarity, speed, and control.
                                </h1>
                                <p className="max-w-xl text-sm text-slate-400 lg:text-base">
                                    LibraSys centralizes cataloging, borrowing, and member services in one cohesive workspace. Built for librarians,
                                    students, and administrators who need trustworthy, real-time visibility.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <Link
                                        href={auth.user ? dashboard() : login()}
                                        className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-emerald-950"
                                    >
                                        {auth.user ? 'Open Dashboard' : 'Get Started'}
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="rounded-full border border-emerald-400/60 px-5 py-2 text-sm font-semibold text-emerald-200"
                                    >
                                        Create account
                                    </Link>
                                </div>
                            </div>

                            <div className="grid gap-4">
                                <div className="rounded-3xl border border-[#1f2a3d] bg-[#141c2a]/90 p-5">
                                    <p className="text-xs uppercase tracking-wide text-slate-400">Live Operations</p>
                                    <div className="mt-4 grid gap-3">
                                        {[
                                            { label: 'Catalog Items', value: '1,247' },
                                            { label: 'Active Members', value: '389' },
                                            { label: 'Loans Today', value: '56' },
                                        ].map((stat) => (
                                            <div key={stat.label} className="flex items-center justify-between rounded-2xl border border-[#1f2a3d] bg-[#1a2436]/80 px-4 py-3">
                                                <span className="text-xs text-slate-400">{stat.label}</span>
                                                <span className="text-sm font-semibold text-white">{stat.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="rounded-3xl border border-[#1f2a3d] bg-[#141c2a]/90 p-5">
                                    <p className="text-xs uppercase tracking-wide text-slate-400">Roles Covered</p>
                                    <div className="mt-4 grid gap-3 text-sm">
                                        <div className="flex items-center justify-between text-slate-200">
                                            <span>Librarian Console</span>
                                            <span className="text-emerald-200">Operations</span>
                                        </div>
                                        <div className="flex items-center justify-between text-slate-200">
                                            <span>Student Portal</span>
                                            <span className="text-emerald-200">Borrowing</span>
                                        </div>
                                        <div className="flex items-center justify-between text-slate-200">
                                            <span>Admin Control</span>
                                            <span className="text-emerald-200">Governance</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="grid gap-6 lg:grid-cols-3">
                            {[
                                {
                                    title: 'Catalog Intelligence',
                                    description: 'Organize books, categories, and availability with instant insights.',
                                    icon: BookOpen,
                                },
                                {
                                    title: 'Member Operations',
                                    description: 'Issue, renew, and track borrowing activity with clear workflows.',
                                    icon: Users,
                                },
                                {
                                    title: 'Governed Access',
                                    description: 'Role-based access for staff, students, and administrators.',
                                    icon: ShieldCheck,
                                },
                            ].map((feature) => {
                                const Icon = feature.icon;
                                return (
                                    <div key={feature.title} className="rounded-3xl border border-[#1f2a3d] bg-[#141c2a]/80 p-6">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-200">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <h3 className="mt-4 text-lg font-semibold text-white">{feature.title}</h3>
                                        <p className="mt-2 text-sm text-slate-400">{feature.description}</p>
                                    </div>
                                );
                            })}
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}
