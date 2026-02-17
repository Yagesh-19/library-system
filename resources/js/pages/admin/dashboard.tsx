import LibraryLayout from '@/layouts/library-layout';
import { ShieldCheck, UserCheck, Users, TrendingUp } from 'lucide-react';

const stats = [
    { label: 'Total Users', value: '1,420', icon: Users },
    { label: 'Pending Approvals', value: '14', icon: UserCheck },
    { label: 'Active Loans', value: '276', icon: TrendingUp },
    { label: 'Security Alerts', value: '3', icon: ShieldCheck },
];

const alerts = [
    { title: 'Librarian access request pending approval', time: '10 minutes ago' },
    { title: 'High overdue rate in Science department', time: 'Today' },
    { title: 'Weekly backup completed successfully', time: 'Yesterday' },
];

const usage = [
    { label: 'Borrowing requests', value: '82%' },
    { label: 'Catalog searches', value: '64%' },
    { label: 'New registrations', value: '31%' },
];

export default function AdminDashboard() {
    return (
        <LibraryLayout title="Admin Dashboard" role="admin" active="dashboard">
            <section className="flex flex-col gap-2">
                <h1 className="text-4xl font-semibold text-white">Admin Dashboard</h1>
                <p className="text-sm text-slate-400">System-wide oversight and performance monitoring.</p>
            </section>

            <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.label}
                            className="rounded-3xl border border-[#1f2a3d] bg-[#141c2a]/80 p-6"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-400/20 text-sky-200">
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
                    <h2 className="text-lg font-semibold text-white">System Alerts</h2>
                    <div className="mt-5 space-y-4">
                        {alerts.map((alert) => (
                            <div
                                key={alert.title}
                                className="rounded-2xl border border-[#1f2a3d] bg-[#1a2436]/80 p-4"
                            >
                                <p className="text-sm font-medium text-white">{alert.title}</p>
                                <p className="text-xs text-slate-400">{alert.time}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-3xl border border-[#1f2a3d] bg-[#141c2a]/80 p-6">
                    <h2 className="text-lg font-semibold text-white">Usage Snapshot</h2>
                    <div className="mt-5 space-y-4">
                        {usage.map((metric) => (
                            <div key={metric.label} className="space-y-2">
                                <div className="flex items-center justify-between text-sm text-slate-300">
                                    <span>{metric.label}</span>
                                    <span className="text-white">{metric.value}</span>
                                </div>
                                <div className="h-2 rounded-full bg-[#1f2a3d]">
                                    <div className="h-2 rounded-full bg-emerald-400" style={{ width: metric.value }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </LibraryLayout>
    );
}
