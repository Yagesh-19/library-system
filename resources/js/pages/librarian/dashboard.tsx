import LibraryLayout from '@/layouts/library-layout';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp, BookOpen, CircleAlert, Users } from 'lucide-react';

const stats = [
    {
        label: 'Total Books',
        value: '1,247',
        icon: BookOpen,
        color: 'from-emerald-400/20 to-emerald-400/5 text-emerald-200',
    },
    {
        label: 'Active Members',
        value: '389',
        icon: Users,
        color: 'from-pink-400/20 to-pink-400/5 text-pink-200',
    },
    {
        label: 'Books Borrowed',
        value: '156',
        icon: ArrowUp,
        color: 'from-sky-400/20 to-sky-400/5 text-sky-200',
    },
    {
        label: 'Overdue Books',
        value: '23',
        icon: CircleAlert,
        color: 'from-amber-400/20 to-amber-400/5 text-amber-200',
    },
];

const transactions = [
    {
        icon: ArrowUp,
        text: 'John Doe borrowed “The Great Gatsby”',
        time: '2 hours ago',
        color: 'bg-emerald-500/20 text-emerald-200',
    },
    {
        icon: ArrowDown,
        text: 'Jane Smith returned “To Kill a Mockingbird”',
        time: '4 hours ago',
        color: 'bg-sky-500/20 text-sky-200',
    },
    {
        icon: BookOpen,
        text: 'New book added: “1984” by George Orwell',
        time: '1 day ago',
        color: 'bg-violet-500/20 text-violet-200',
    },
];

const popularBooks = [
    { rank: '1', title: 'The Alchemist', author: 'Paulo Coelho', count: '45 borrows' },
    { rank: '2', title: 'Harry Potter Series', author: 'J.K. Rowling', count: '38 borrows' },
    { rank: '3', title: 'Pride and Prejudice', author: 'Jane Austen', count: '32 borrows' },
];

export default function LibrarianDashboard() {
    return (
        <LibraryLayout title="Librarian Dashboard" role="librarian" active="dashboard">
            <section className="flex flex-col gap-2">
                <h1 className="text-4xl font-semibold text-white">Dashboard</h1>
                <p className="text-sm text-slate-400">Welcome to the Library Management System</p>
            </section>

            <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => {
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
                        {transactions.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.text}
                                    className="flex items-center gap-4 rounded-2xl border border-[#1f2a3d] bg-[#1a2436]/80 p-4"
                                >
                                    <div
                                        className={cn(
                                            'flex h-10 w-10 items-center justify-center rounded-full',
                                            item.color,
                                        )}
                                    >
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">{item.text}</p>
                                        <p className="text-xs text-slate-400">{item.time}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="rounded-3xl border border-[#1f2a3d] bg-[#141c2a]/80 p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-white">Popular Books</h2>
                        <span className="text-xs text-slate-400">Last 30 days</span>
                    </div>
                    <div className="mt-5 space-y-4">
                        {popularBooks.map((book) => (
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
                                <span className="text-xs text-slate-400">{book.count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </LibraryLayout>
    );
}
