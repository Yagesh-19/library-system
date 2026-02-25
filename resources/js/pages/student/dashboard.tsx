import { Bell, BookOpenCheck, CalendarClock, CircleAlert } from 'lucide-react';
import LibraryLayout from '@/layouts/library-layout';

type DashboardProps = {
    stats: {
        borrowed: number;
        dueSoon: number;
        fines: string;
    };
    notifications: {
        id: number;
        title: string;
        time: string;
        read_at: string | null;
    }[];
    recommendations: {
        id: number;
        title: string;
        author: string;
        tag: string;
    }[];
};

export default function StudentDashboard({ stats, notifications, recommendations }: DashboardProps) {
    const statCards = [
        {
            label: 'Borrowed Books',
            value: stats.borrowed,
            icon: BookOpenCheck,
            tone: 'from-emerald-400/20 to-emerald-400/5',
        },
        {
            label: 'Due This Week',
            value: stats.dueSoon,
            icon: CalendarClock,
            tone: 'from-sky-400/20 to-sky-400/5',
        },
        {
            label: 'Fines',
            value: `$${stats.fines}`,
            icon: CircleAlert,
            tone: 'from-rose-400/20 to-rose-400/5',
        },
    ];

    return (
        <LibraryLayout title="Student Dashboard" role="student" active="dashboard">
            <section className="flex flex-col gap-2">
                <h1 className="text-4xl font-semibold text-white">Dashboard</h1>
                <p className="text-sm text-slate-400">Quick snapshot of your library activity.</p>
            </section>

            <section className="grid gap-6 md:grid-cols-3">
                {statCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.label} className="rounded-3xl border border-[#1f2a3d] bg-[#141c2a]/80 p-6">
                            <div className="flex items-center gap-4">
                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.tone} text-emerald-200`}
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
                        <h2 className="text-lg font-semibold text-white">Notifications</h2>
                        <Bell className="h-4 w-4 text-slate-400" />
                    </div>
                    <div className="mt-5 space-y-4">
                        {notifications.length === 0 ? (
                            <div className="rounded-2xl border border-[#1f2a3d] bg-[#1a2436]/80 p-4 text-sm text-slate-400">
                                You're all caught up.
                            </div>
                        ) : (
                            notifications.map((note) => (
                                <div
                                    key={note.id}
                                    className="rounded-2xl border border-[#1f2a3d] bg-[#1a2436]/80 p-4"
                                >
                                    <p className="text-sm font-medium text-white">{note.title}</p>
                                    <p className="text-xs text-slate-400">{note.time}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="rounded-3xl border border-[#1f2a3d] bg-[#141c2a]/80 p-6">
                    <h2 className="text-lg font-semibold text-white">Recommended For You</h2>
                    <div className="mt-5 space-y-4">
                        {recommendations.length === 0 ? (
                            <div className="rounded-2xl border border-[#1f2a3d] bg-[#1a2436]/80 p-4 text-sm text-slate-400">
                                No recommendations yet.
                            </div>
                        ) : (
                            recommendations.map((book) => (
                                <div
                                    key={book.id}
                                    className="flex items-center justify-between rounded-2xl border border-[#1f2a3d] bg-[#1a2436]/80 p-4"
                                >
                                    <div>
                                        <p className="text-sm font-semibold text-white">{book.title}</p>
                                        <p className="text-xs text-slate-400">{book.author}</p>
                                    </div>
                                    <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold text-emerald-200">
                                        {book.tag}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>
        </LibraryLayout>
    );
}
