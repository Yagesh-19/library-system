import { ArrowDown, ArrowUp, BookOpen, CircleAlert, Users } from 'lucide-react';
import LibraryLayout from '@/layouts/library-layout';
import { cn } from '@/lib/utils';

type DashboardProps = {
    stats: {
        totalBooks: number;
        activeMembers: number;
        borrowedBooks: number;
        overdueBooks: number;
    };
    transactions: {
        id: number;
        text: string;
        time: string;
        type: 'issue' | 'return';
    }[];
    popular: {
        rank: number;
        title: string;
        author: string;
        count: number;
    }[];
};

export default function LibrarianDashboard({ stats, transactions, popular }: DashboardProps) {
    const statCards = [
        {
            label: 'Total Books',
            value: stats.totalBooks,
            icon: BookOpen,
            color: 'from-emerald-400/20 to-emerald-400/5 text-emerald-200',
        },
        {
            label: 'Active Members',
            value: stats.activeMembers,
            icon: Users,
            color: 'from-pink-400/20 to-pink-400/5 text-pink-200',
        },
        {
            label: 'Books Borrowed',
            value: stats.borrowedBooks,
            icon: ArrowUp,
            color: 'from-sky-400/20 to-sky-400/5 text-sky-200',
        },
        {
            label: 'Overdue Books',
            value: stats.overdueBooks,
            icon: CircleAlert,
            color: 'from-amber-400/20 to-amber-400/5 text-amber-200',
        },
    ];

    return (
        <LibraryLayout title="Librarian Dashboard" role="librarian" active="dashboard">
            <section className="flex flex-col gap-2">
                <h1 className="text-4xl font-semibold text-white">Dashboard</h1>
                <p className="text-sm text-slate-400">Welcome to the Library Management System</p>
            </section>

            <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {statCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.label}
                            className="rounded-3xl border border-[#1f2a3d] bg-[#141c2a]/80 p-6 shadow-[0_16px_40px_rgba(2,6,23,0.45)]"
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className={cn(
                                        'flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br',
                                        stat.color,
                                    )}
                                >
                                    <Icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-2xl font-semibold text-white">{stat.value}</p>
                                    <p className="text-sm text-slate-400">{stat.label}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-3xl border border-[#1f2a3d] bg-[#141c2a]/80 p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-white">Recent Transactions</h2>
                        <span className="text-xs text-slate-400">Live updates</span>
                    </div>
                    <div className="mt-5 space-y-4">
                        {transactions.length === 0 ? (
                            <div className="rounded-2xl border border-[#1f2a3d] bg-[#1a2436]/80 p-4 text-sm text-slate-400">
                                No recent transactions.
                            </div>
                        ) : (
                            transactions.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-4 rounded-2xl border border-[#1f2a3d] bg-[#1a2436]/80 p-4"
                                >
                                    <div
                                        className={cn(
                                            'flex h-10 w-10 items-center justify-center rounded-full',
                                            item.type === 'issue'
                                                ? 'bg-emerald-500/20 text-emerald-200'
                                                : 'bg-sky-500/20 text-sky-200',
                                        )}
                                    >
                                        {item.type === 'issue' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">{item.text}</p>
                                        <p className="text-xs text-slate-400">{item.time}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="rounded-3xl border border-[#1f2a3d] bg-[#141c2a]/80 p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-white">Popular Books</h2>
                        <span className="text-xs text-slate-400">Last 30 days</span>
                    </div>
                    <div className="mt-5 space-y-4">
                        {popular.length === 0 ? (
                            <div className="rounded-2xl border border-[#1f2a3d] bg-[#1a2436]/80 p-4 text-sm text-slate-400">
                                No data yet.
                            </div>
                        ) : (
                            popular.map((book) => (
                                <div
                                    key={book.title}
                                    className="flex items-center justify-between rounded-2xl border border-[#1f2a3d] bg-[#1a2436]/80 p-4"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-sm font-semibold text-emerald-200">
                                            {book.rank}
                                        </span>
                                        <div>
                                            <p className="text-sm font-semibold text-white">{book.title}</p>
                                            <p className="text-xs text-slate-400">{book.author}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-slate-400">{book.count} borrows</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>
        </LibraryLayout>
    );
}
