import LibraryLayout from '@/layouts/library-layout';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowDownLeft, ArrowUpRight, MoreHorizontal, RefreshCcw } from 'lucide-react';

const quickActions = [
    {
        title: 'Issue Book',
        subtitle: 'Lend a book to a member',
        button: 'Quick Issue',
        icon: ArrowUpRight,
        color: 'bg-amber-400/20 text-amber-200',
    },
    {
        title: 'Return Book',
        subtitle: 'Process book returns',
        button: 'Quick Return',
        icon: ArrowDownLeft,
        color: 'bg-emerald-400/20 text-emerald-200',
    },
    {
        title: 'Renew Book',
        subtitle: 'Extend borrowing period',
        button: 'Quick Renew',
        icon: RefreshCcw,
        color: 'bg-violet-400/20 text-violet-200',
    },
];

export default function LibrarianTransactions() {
    return (
        <LibraryLayout title="Transactions" role="librarian" active="transactions">
            <section className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-semibold text-white">Transactions</h1>
                        <p className="text-sm text-slate-400">Issue, return, and renew books seamlessly.</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Dialog>
                            <DialogTrigger asChild>
                                <button className="rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-emerald-950 shadow-[0_12px_30px_rgba(16,185,129,0.35)]">
                                    Issue Book
                                </button>
                            </DialogTrigger>
                            <DialogContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                                <DialogHeader>
                                    <DialogTitle>Issue Book</DialogTitle>
                                    <DialogDescription className="text-slate-400">
                                        Assign a book to a member and set the due date.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="issue-member">Member ID</Label>
                                        <Input id="issue-member" placeholder="MB-1024" className="bg-[#141c2a]" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="issue-book">Book ISBN</Label>
                                        <Input id="issue-book" placeholder="978-0-06-112241-5" className="bg-[#141c2a]" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="issue-due">Due Date</Label>
                                        <Input id="issue-due" type="date" className="bg-[#141c2a]" />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <button className="rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-200">
                                        Issue Now
                                    </button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <Dialog>
                            <DialogTrigger asChild>
                                <button className="rounded-full bg-emerald-400/20 px-5 py-2 text-sm font-semibold text-emerald-200 ring-1 ring-emerald-400/30">
                                    Return Book
                                </button>
                            </DialogTrigger>
                            <DialogContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                                <DialogHeader>
                                    <DialogTitle>Return Book</DialogTitle>
                                    <DialogDescription className="text-slate-400">
                                        Confirm the return of a borrowed item.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="return-transaction">Transaction ID</Label>
                                        <Input id="return-transaction" placeholder="TX-9012" className="bg-[#141c2a]" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="return-condition">Condition Notes</Label>
                                        <Input id="return-condition" placeholder="Good condition" className="bg-[#141c2a]" />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <button className="rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-200">
                                        Confirm Return
                                    </button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-3">
                {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                        <Dialog key={action.title}>
                            <DialogTrigger asChild>
                                <div className="cursor-pointer rounded-3xl border border-[#1f2a3d] bg-white p-6 text-slate-900 shadow-[0_16px_40px_rgba(2,6,23,0.25)]">
                                    <div className="flex items-center gap-4">
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${action.color}`}>
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-lg font-semibold">{action.title}</p>
                                            <p className="text-sm text-slate-500">{action.subtitle}</p>
                                        </div>
                                    </div>
                                    <button className="mt-5 rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-600">
                                        {action.button}
                                    </button>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                                <DialogHeader>
                                    <DialogTitle>{action.title}</DialogTitle>
                                    <DialogDescription className="text-slate-400">Complete the transaction details.</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor={`${action.title}-member`}>Member ID</Label>
                                        <Input id={`${action.title}-member`} placeholder="MB-1024" className="bg-[#141c2a]" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`${action.title}-book`}>Book ISBN</Label>
                                        <Input id={`${action.title}-book`} placeholder="978-0-06-112241-5" className="bg-[#141c2a]" />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <button className="rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-200">
                                        Confirm
                                    </button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    );
                })}
            </section>

            <section className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-2xl font-semibold text-white">Recent Transactions</h2>
                <div className="flex flex-wrap items-center gap-3">
                    <input
                        type="date"
                        defaultValue="2025-11-28"
                        className="rounded-xl border border-[#1f2a3d] bg-[#1a2436]/80 px-3 py-2 text-sm text-slate-200"
                    />
                    <span className="text-sm text-slate-400">to</span>
                    <input
                        type="date"
                        defaultValue="2025-12-28"
                        className="rounded-xl border border-[#1f2a3d] bg-[#1a2436]/80 px-3 py-2 text-sm text-slate-200"
                    />
                    <button className="rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-200">
                        Filter
                    </button>
                </div>
            </section>

            <section className="rounded-3xl border border-[#1f2a3d] bg-[#141c2a]/80 p-4">
                <div className="grid grid-cols-[160px_repeat(6,1fr)_140px] gap-2 rounded-2xl bg-gradient-to-r from-emerald-400/90 to-emerald-500/90 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-emerald-950">
                    <span>Transaction ID</span>
                    <span>Member</span>
                    <span>Book</span>
                    <span>Type</span>
                    <span>Date</span>
                    <span>Due Date</span>
                    <span>Status</span>
                    <span>Actions</span>
                </div>
                <div className="mt-4 grid grid-cols-[160px_repeat(6,1fr)_140px] items-center gap-2 rounded-2xl border border-[#1f2a3d] bg-[#1a2436]/80 px-4 py-3 text-sm text-slate-200">
                    <span>TX-2031</span>
                    <span>Jamie Lee</span>
                    <span>The Alchemist</span>
                    <span>Issue</span>
                    <span>Nov 28, 2025</span>
                    <span>Dec 28, 2025</span>
                    <span className="text-emerald-300">Active</span>
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="rounded-full border border-[#1f2a3d] p-2 text-slate-300">
                                    <MoreHorizontal className="h-4 w-4" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                                <DropdownMenuItem>View details</DropdownMenuItem>
                                <DropdownMenuItem>Mark returned</DropdownMenuItem>
                                <DropdownMenuItem>Send reminder</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </section>
        </LibraryLayout>
    );
}
