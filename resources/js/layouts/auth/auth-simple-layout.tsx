import { home, login, register } from '@/routes';
import type { AuthLayoutProps } from '@/types';
import { Link } from '@inertiajs/react';

export default function AuthSimpleLayout({ children, title, description }: AuthLayoutProps) {
    return (
        <div className="min-h-svh bg-[#0b1220] text-slate-100">
            <div className="relative min-h-svh overflow-hidden">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(46,195,130,0.15),_transparent_45%),radial-gradient(circle_at_20%_20%,_rgba(56,189,248,0.1),_transparent_35%),radial-gradient(circle_at_80%_0%,_rgba(99,102,241,0.12),_transparent_40%)]" />
                <div className="relative mx-auto flex min-h-svh w-full max-w-6xl flex-col justify-center gap-10 px-6 py-10 font-display lg:flex-row lg:items-center">
                    <div className="flex-1 space-y-4">
                        <Link href={home()} className="inline-flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-[0_12px_30px_rgba(16,185,129,0.35)]">
                                <span className="text-lg font-semibold text-emerald-950">LM</span>
                            </div>
                            <div>
                                <p className="text-xl font-semibold text-white">LibraryMS</p>
                                <p className="text-xs text-slate-400">Library Management System</p>
                            </div>
                        </Link>
                        <h1 className="text-3xl font-semibold text-white lg:text-4xl">{title}</h1>
                        <p className="max-w-md text-sm text-slate-400">{description}</p>
                        <div className="flex flex-wrap gap-3 text-xs text-slate-400">
                            <Link href={login()} className="rounded-full border border-[#1f2a3d] px-3 py-1 hover:text-white">
                                Login
                            </Link>
                            <Link href={register()} className="rounded-full border border-[#1f2a3d] px-3 py-1 hover:text-white">
                                Register
                            </Link>
                        </div>
                    </div>
                    <div className="flex w-full max-w-md flex-col gap-6 rounded-3xl border border-[#1f2a3d] bg-[#141c2a]/90 p-6 shadow-[0_18px_45px_rgba(2,6,23,0.45)]">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
