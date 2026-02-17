import LibraryLayout from '@/layouts/library-layout';
import { Download } from 'lucide-react';

const reports = [
    { title: 'Most Borrowed Books', metric: 'Top 10 list', action: 'Generate' },
    { title: 'Overdue Items', metric: '23 active cases', action: 'Review' },
    { title: 'Fines Collected', metric: '$1,240 this month', action: 'Export' },
];

const analytics = [
    { label: 'Daily Active Users', value: '74%' },
    { label: 'Borrowing Completion', value: '68%' },
    { label: 'Reservation Conversion', value: '41%' },
];

export default function AdminReports() {
    return (
        <LibraryLayout title="Reports & Analytics" role="admin" active="reports">
            <section className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-semibold text-white">Reports & Analytics</h1>
                    <p className="text-sm text-slate-400">Generate insights on usage, fines, and trends.</p>
                </div>
                <button className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-emerald-950">
                    <Download className="h-4 w-4" />
                    Export Reports
                </button>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-3xl border border-[#1f2a3d] bg-[#141c2a]/80 p-6">
                    <h2 className="text-lg font-semibold text-white">Report Center</h2>
                    <div className="mt-5 space-y-4">
                        {reports.map((report) => (
                            <div
                                key={report.title}
                                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#1f2a3d] bg-[#1a2436]/80 p-4"
                            >
                                <div>
                                    <p className="text-sm font-semibold text-white">{report.title}</p>
                                    <p className="text-xs text-slate-400">{report.metric}</p>
                                </div>
                                <button className="rounded-full border border-emerald-400 px-3 py-1 text-xs font-semibold text-emerald-200">
                                    {report.action}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-3xl border border-[#1f2a3d] bg-[#141c2a]/80 p-6">
                    <h2 className="text-lg font-semibold text-white">Usage Analytics</h2>
                    <div className="mt-5 space-y-4">
                        {analytics.map((metric) => (
                            <div key={metric.label} className="space-y-2">
                                <div className="flex items-center justify-between text-sm text-slate-300">
                                    <span>{metric.label}</span>
                                    <span className="text-white">{metric.value}</span>
                                </div>
                                <div className="h-2 rounded-full bg-[#1f2a3d]">
                                    <div className="h-2 rounded-full bg-sky-400" style={{ width: metric.value }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </LibraryLayout>
    );
}
