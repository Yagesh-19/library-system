import LibraryLayout from '@/layouts/library-layout';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { router } from '@inertiajs/react';
import { Download } from 'lucide-react';

type ReportsProps = {
    reports: { title: string; metric: string; action: string }[];
    analytics: { label: string; value: string }[];
};

export default function AdminReports({ reports, analytics }: ReportsProps) {
    return (
        <LibraryLayout title="Reports & Analytics" role="admin" active="reports">
            <section className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-semibold text-white">Reports & Analytics</h1>
                    <p className="text-sm text-slate-400">Generate insights on usage and trends.</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <button className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-emerald-950">
                            <Download className="h-4 w-4" />
                            Export Reports
                        </button>
                    </DialogTrigger>
                    <DialogContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                        <DialogHeader>
                            <DialogTitle>Export Reports</DialogTitle>
                            <DialogDescription className="text-slate-400">
                                Download the most borrowed books report.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <button
                                onClick={() => router.post('/admin/reports/export')}
                                className="rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-200"
                            >
                                Export CSV
                            </button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-3xl border border-[#1f2a3d] bg-[#141c2a]/80 p-6">
                    <h2 className="text-lg font-semibold text-white">Report Center</h2>
                    <div className="mt-5 space-y-4">
                        {reports.map((report) => (
                            <Dialog key={report.title}>
                                <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#1f2a3d] bg-[#1a2436]/80 p-4">
                                    <div>
                                        <p className="text-sm font-semibold text-white">{report.title}</p>
                                        <p className="text-xs text-slate-400">{report.metric}</p>
                                    </div>
                                    <DialogTrigger asChild>
                                        <button className="rounded-full border border-emerald-400 px-3 py-1 text-xs font-semibold text-emerald-200">
                                            {report.action}
                                        </button>
                                    </DialogTrigger>
                                </div>
                                <DialogContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                                    <DialogHeader>
                                        <DialogTitle>{report.title}</DialogTitle>
                                        <DialogDescription className="text-slate-400">
                                            Generate and review this report.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="rounded-xl border border-[#1f2a3d] bg-[#141c2a] p-4 text-sm text-slate-300">
                                        Report generation will run in the background.
                                    </div>
                                    <DialogFooter>
                                        <button className="rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-200">
                                            Run Report
                                        </button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
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
