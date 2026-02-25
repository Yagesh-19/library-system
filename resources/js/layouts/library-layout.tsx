import { cn } from '@/lib/utils';
import { Head, Link } from '@inertiajs/react';
import {
    BookOpen,
    BookUser,
    ChartSpline,
    ClipboardList,
    FileText,
    Gauge,
    Lock,
    LogOut,
    Menu,
    Search,
    Settings,
    ShieldCheck,
    Users,
} from 'lucide-react';
import type { ComponentType, PropsWithChildren, ReactNode } from 'react';
import { useState } from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

export type LibraryRole = 'librarian' | 'admin' | 'student';

type LibraryNavItem = {
    id: string;
    label: string;
    href: string;
    icon: ComponentType<{ className?: string }>;
};

type LibraryLayoutProps = PropsWithChildren<{
    title: string;
    role: LibraryRole;
    active: string;
    header?: ReactNode;
}>;

const navByRole: Record<LibraryRole, LibraryNavItem[]> = {
    librarian: [
        { id: 'dashboard', label: 'Dashboard', href: '/librarian/dashboard', icon: Gauge },
        { id: 'books', label: 'Books', href: '/librarian/books', icon: BookOpen },
        { id: 'members', label: 'Members', href: '/librarian/members', icon: Users },
        {
            id: 'transactions',
            label: 'Transactions',
            href: '/librarian/transactions',
            icon: ClipboardList,
        },
        { id: 'reports', label: 'Reports', href: '/librarian/reports', icon: FileText },
    ],
    admin: [
        { id: 'dashboard', label: 'Dashboard', href: '/admin/dashboard', icon: Gauge },
        { id: 'users', label: 'Users', href: '/admin/users', icon: Users },
        { id: 'system', label: 'System', href: '/admin/system', icon: Settings },
        { id: 'reports', label: 'Reports', href: '/admin/reports', icon: ChartSpline },
        { id: 'security', label: 'Security', href: '/admin/security', icon: ShieldCheck },
    ],
    student: [
        { id: 'dashboard', label: 'Dashboard', href: '/student/dashboard', icon: Gauge },
        { id: 'search', label: 'Search', href: '/student/search', icon: Search },
        { id: 'borrowing', label: 'Borrowing', href: '/student/borrowing', icon: BookUser },
        { id: 'profile', label: 'Profile', href: '/student/profile', icon: Lock },
    ],
};

const roleLabel: Record<LibraryRole, string> = {
    librarian: 'Librarian Console',
    admin: 'Admin Control',
    student: 'Student Access',
};

const roleBadge: Record<LibraryRole, string> = {
    librarian: 'bg-emerald-400/15 text-emerald-200 border-emerald-400/30',
    admin: 'bg-sky-400/15 text-sky-200 border-sky-400/30',
    student: 'bg-violet-400/15 text-violet-200 border-violet-400/30',
};

function LogoMark({ subtitle }: { subtitle: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-[0_12px_30px_rgba(16,185,129,0.35)]">
                <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-6 w-6 text-emerald-950"
                    fill="currentColor"
                >
                    <path d="M6 4.5A2.5 2.5 0 0 0 3.5 7v10A2.5 2.5 0 0 0 6 19.5h12a.5.5 0 0 0 .5-.5V6.5A2.5 2.5 0 0 0 16 4.5H6Zm0 3h10a1 1 0 0 1 1 1v8.5H6a1.5 1.5 0 0 1-1.5-1.5V8A.5.5 0 0 1 6 7.5Zm2 1.75a.75.75 0 1 0 0 1.5h6a.75.75 0 0 0 0-1.5H8Zm0 3.5a.75.75 0 1 0 0 1.5h6a.75.75 0 0 0 0-1.5H8Z" />
                </svg>
            </div>
            <div>
                <p className="text-xl font-semibold text-white">LibraSys</p>
                <p className="text-xs text-slate-400">{subtitle}</p>
            </div>
        </div>
    );
}

export default function LibraryLayout({ children, title, role, active, header }: LibraryLayoutProps) {
    const navItems = navByRole[role];
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#0b1220] text-slate-100">
            <Head title={title} />
            <div className="relative overflow-hidden">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(46,195,130,0.15),_transparent_45%),radial-gradient(circle_at_20%_20%,_rgba(56,189,248,0.1),_transparent_35%),radial-gradient(circle_at_80%_0%,_rgba(99,102,241,0.12),_transparent_40%)]" />
                <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-6 py-6 font-display lg:px-10 lg:py-8">
                    <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-center gap-4">
                            <LogoMark subtitle={roleLabel[role]} />
                           
                        </div>
                        <nav className="hidden flex-wrap items-center gap-2 rounded-full border border-[#1f2a3d] bg-[#141c2a]/90 p-2 shadow-[0_18px_45px_rgba(2,6,23,0.45)] backdrop-blur lg:flex">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.id}
                                        href={item.href}
                                        className={cn(
                                            'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition',
                                            active === item.id
                                                ? 'bg-emerald-400 text-emerald-950 shadow-[0_0_0_2px_rgba(16,185,129,0.4),0_12px_30px_rgba(16,185,129,0.35)]'
                                                : 'text-slate-300 hover:bg-white/5 hover:text-white',
                                        )}
                                    >
                                        <Icon className="h-4 w-4" />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>
                        <div className="flex items-center gap-3">
                            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                                <SheetTrigger asChild>
                                    <button className="inline-flex items-center gap-2 rounded-full border border-[#1f2a3d] bg-[#141c2a]/90 px-4 py-2 text-sm text-slate-200 shadow-[0_12px_30px_rgba(2,6,23,0.45)] lg:hidden">
                                        <Menu className="h-4 w-4" />
                                        Menu
                                    </button>
                                </SheetTrigger>
                                <SheetContent side="left" className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                                    <SheetHeader>
                                        <SheetTitle className="text-white">LibraSys</SheetTitle>
                                        <SheetDescription className="text-slate-400">
                                            Navigate your workspace
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div className="mt-4 flex flex-col gap-2">
                                        {navItems.map((item) => {
                                            const Icon = item.icon;
                                            return (
                                                <Link
                                                    key={item.id}
                                                    href={item.href}
                                                    className={cn(
                                                        'flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition',
                                                        active === item.id
                                                            ? 'bg-emerald-400 text-emerald-950'
                                                            : 'text-slate-300 hover:bg-white/5 hover:text-white',
                                                    )}
                                                    onClick={() => setMobileOpen(false)}
                                                >
                                                    <Icon className="h-4 w-4" />
                                                    {item.label}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                    <div className="mt-6 flex flex-col gap-3 border-t border-[#1f2a3d] pt-4">
                                        <span
                                            className={cn(
                                                'w-fit rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide',
                                                roleBadge[role],
                                            )}
                                        >
                                            {role}
                                        </span>
                                        <Link
                                            href="/logout"
                                            method="post"
                                            as="button"
                                            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/60 px-4 py-2 text-sm font-semibold text-emerald-200"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Logout
                                        </Link>
                                    </div>
                                </SheetContent>
                            </Sheet>
                            <span
                                className={cn(
                                    'rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide',
                                    roleBadge[role],
                                )}
                            >
                                {role}
                            </span>
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="hidden items-center gap-2 rounded-full border border-emerald-400/60 px-4 py-2 text-sm font-semibold text-emerald-200 lg:inline-flex"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </Link>
                        </div>
                    </header>
                    {header ? <div>{header}</div> : null}
                    <main className="flex flex-1 flex-col gap-6">{children}</main>
                </div>
            </div>
        </div>
    );
}
