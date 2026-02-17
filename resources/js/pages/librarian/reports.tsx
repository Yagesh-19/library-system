import LibraryLayout from '@/layouts/library-layout';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Star, TriangleAlert } from 'lucide-react';

const popular = [
    { rank: '1', title: 'The Alchemist', count: '45' },
    { rank: '2', title: 'Harry Potter', count: '38' },
    { rank: '3', title: 'Pride and Prejudice', count: '32' },
];

const overdue = [
    { label: 'Critical (>30 days)', value: '8', color: 'bg-rose-100 text-rose-700' },
    { label: 'Warning (15-30 days)', value: '15', color: 'bg-amber-100 text-amber-700' },
    { label: 'Recent (1-14 days)', value: '12', color: 'bg-sky-100 text-sky-700' },
];

export default function LibrarianReports() {
    return (
        <LibraryLayout title="Reports & Analytics" role="librarian" active="reports">
            <section className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-semibold text-white">Reports & Analytics</h1>
                    <p className="text-sm text-slate-400">Monitor trends and export operational reports.</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <button className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-emerald-950 shadow-[0_12px_30px_rgba(16,185,129,0.35)]">
                            <Download className="h-4 w-4" />
                            Export Reports
                        </button>
                    </DialogTrigger>
                    <DialogContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                        <DialogHeader>
                            <DialogTitle>Export Reports</DialogTitle>
                            <DialogDescription className="text-slate-400">
                                Select a report range and export format.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <Select defaultValue="last-30">
                                <SelectTrigger className="border-[#1f2a3d] bg-[#141c2a] text-slate-200">
                                    <SelectValue placeholder="Range" />
                                </SelectTrigger>
                                <SelectContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                                    <SelectItem value="last-7">Last 7 days</SelectItem>
                                    <SelectItem value="last-30">Last 30 days</SelectItem>
                                    <SelectItem value="quarter">Quarter to date</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select defaultValue="pdf">
                                <SelectTrigger className="border-[#1f2a3d] bg-[#141c2a] text-slate-200">
                                    <SelectValue placeholder="Format" />
                                </SelectTrigger>
                                <SelectContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                                    <SelectItem value="pdf">PDF</SelectItem>
                                    <SelectItem value="csv">CSV</SelectItem>
                                    <SelectItem value="xlsx">Excel</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <DialogFooter>
                            <button className="rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-200">
                                Export Now
                            </button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </section>

            <section className="grid gap-6 lg:grid-cols-3">
                <div className="rounded-3xl border border-[#1f2a3d] bg-white p-6 text-slate-900">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Monthly Overview</h2>
                        <div className="rounded-xl bg-emerald-100 p-2 text-emerald-600">📅</div>
                    </div>
                    <div className="mt-6 space-y-4">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">Books Issued</span>
                            <span className="text-lg font-semibold text-slate-900">245</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">Books Returned</span>
                            <span className="text-lg font-semibold text-slate-900">198</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">Currently Borrowed</span>
                            <span className="text-lg font-semibold text-slate-900">47</span>
                        </div>
                    </div>
                </div>

                <div className="rounded-3xl border border-[#1f2a3d] bg-white p-6 text-slate-900">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Most Popular Books</h2>
                        <div className="rounded-xl bg-emerald-100 p-2 text-emerald-600">
                            <Star className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="mt-6 space-y-4">
                        {popular.map((book) => (
                            <div key={book.title} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-700">
                                        {book.rank}
                                    </span>
                                    <span className="font-medium text-slate-900">{book.title}</span>
                                </div>
                                <span className="text-slate-500">{book.count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-3xl border border-[#1f2a3d] bg-white p-6 text-slate-900">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Overdue Analysis</h2>
                        <div className="rounded-xl bg-emerald-100 p-2 text-emerald-600">
                            <TriangleAlert className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="mt-6 space-y-4">
                        {overdue.map((row) => (
                            <div key={row.label} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-3">
                                    <span className={`flex h-8 w-8 items-center justify-center rounded-xl ${row.color}`}>
                                        {row.value}
                                    </span>
                                    <span className="text-slate-500">{row.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </LibraryLayout>
    );
}
