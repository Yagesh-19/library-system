import InputError from '@/components/input-error';
import LibraryLayout from '@/layouts/library-layout';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { router, useForm } from '@inertiajs/react';
import { ArrowDownLeft, ArrowUpRight, MoreHorizontal, RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

type TransactionsProps = {
    filters: {
        from: string;
        to: string;
    };
    transactions: {
        id: number;
        member: string;
        book: string;
        type: string;
        date: string | null;
        due: string | null;
        status: string;
    }[];
    reservations: {
        id: number;
        member: string;
        book: string;
        reserved_at: string | null;
    }[];
};

const quickActions = [
    {
        key: 'issue',
        title: 'Issue Book',
        subtitle: 'Lend a book to a member',
        button: 'Quick Issue',
        icon: ArrowUpRight,
        color: 'bg-amber-400/20 text-amber-200',
    },
    {
        key: 'return',
        title: 'Return Book',
        subtitle: 'Process book returns',
        button: 'Quick Return',
        icon: ArrowDownLeft,
        color: 'bg-emerald-400/20 text-emerald-200',
    },
    {
        key: 'renew',
        title: 'Renew Book',
        subtitle: 'Extend borrowing period',
        button: 'Quick Renew',
        icon: RefreshCcw,
        color: 'bg-violet-400/20 text-violet-200',
    },
];

export default function LibrarianTransactions({ filters, transactions, reservations }: TransactionsProps) {
    const [activeDialog, setActiveDialog] = useState<string | null>(null);
    const issueForm = useForm({ member_id: '', isbn: '', due_at: '' });
    const returnForm = useForm({ transaction_id: '' });
    const renewForm = useForm({ transaction_id: '' });

    const closeDialog = () => {
        setActiveDialog(null);
        issueForm.clearErrors();
        returnForm.clearErrors();
        renewForm.clearErrors();
    };

    return (
        <LibraryLayout title="Transactions" role="librarian" active="transactions">
            <section className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-semibold text-white">Transactions</h1>
                        <p className="text-sm text-slate-400">Issue, return, and renew books seamlessly.</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Dialog
                            open={activeDialog === 'issue'}
                            onOpenChange={(open) => {
                                setActiveDialog(open ? 'issue' : null);
                                issueForm.clearErrors();
                            }}
                        >
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
                                <form
                                    onSubmit={(event) => {
                                        event.preventDefault();
                                        issueForm.post('/librarian/transactions/issue', {
                                            onSuccess: () => {
                                                toast.success('Book issued.');
                                                closeDialog();
                                                issueForm.reset();
                                            },
                                        });
                                    }}
                                    className="grid gap-4"
                                >
                                    <div className="grid gap-2">
                                        <Label htmlFor="issue-member">Member ID (User ID)</Label>
                                        <Input
                                            id="issue-member"
                                            value={issueForm.data.member_id}
                                            onChange={(event) => issueForm.setData('member_id', event.target.value)}
                                            className="bg-[#141c2a]"
                                        />
                                        <InputError message={issueForm.errors.member_id} className="text-red-400" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="issue-book">Book ISBN</Label>
                                        <Input
                                            id="issue-book"
                                            value={issueForm.data.isbn}
                                            onChange={(event) => issueForm.setData('isbn', event.target.value)}
                                            className="bg-[#141c2a]"
                                        />
                                        <InputError message={issueForm.errors.isbn} className="text-red-400" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="issue-due">Due Date</Label>
                                        <Input
                                            id="issue-due"
                                            type="date"
                                            value={issueForm.data.due_at}
                                            onChange={(event) => issueForm.setData('due_at', event.target.value)}
                                            className="bg-[#141c2a]"
                                        />
                                        <InputError message={issueForm.errors.due_at} className="text-red-400" />
                                    </div>
                                    <DialogFooter>
                                        <button
                                            disabled={issueForm.processing}
                                            className="rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-200"
                                        >
                                            Issue Now
                                        </button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                        <Dialog
                            open={activeDialog === 'return'}
                            onOpenChange={(open) => {
                                setActiveDialog(open ? 'return' : null);
                                returnForm.clearErrors();
                            }}
                        >
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
                                <form
                                    onSubmit={(event) => {
                                        event.preventDefault();
                                        returnForm.post('/librarian/transactions/return', {
                                            onSuccess: () => {
                                                toast.success('Book returned.');
                                                closeDialog();
                                                returnForm.reset();
                                            },
                                        });
                                    }}
                                    className="grid gap-4"
                                >
                                    <div className="grid gap-2">
                                        <Label htmlFor="return-transaction">Transaction ID</Label>
                                        <Input
                                            id="return-transaction"
                                            value={returnForm.data.transaction_id}
                                            onChange={(event) => returnForm.setData('transaction_id', event.target.value)}
                                            className="bg-[#141c2a]"
                                        />
                                        <InputError message={returnForm.errors.transaction_id} className="text-red-400" />
                                    </div>
                                    <DialogFooter>
                                        <button
                                            disabled={returnForm.processing}
                                            className="rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-200"
                                        >
                                            Confirm Return
                                        </button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </section>

            {reservations.length > 0 ? (
                <section className="rounded-3xl border border-[#1f2a3d] bg-[#141c2a]/80 p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-white">Pending Reservations</h2>
                        <span className="text-xs text-slate-400">Approve holds</span>
                    </div>
                    <div className="mt-5 space-y-3">
                        {reservations.map((reservation) => (
                            <div
                                key={reservation.id}
                                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#1f2a3d] bg-[#1a2436]/80 p-4"
                            >
                                <div>
                                    <p className="text-sm font-semibold text-white">{reservation.book}</p>
                                    <p className="text-xs text-slate-400">
                                        {reservation.member} • {reservation.reserved_at}
                                    </p>
                                </div>
                                <button
                                    onClick={() => {
                                        router.patch(`/librarian/reservations/${reservation.id}/approve`, {}, {
                                            onSuccess: () => toast.success('Reservation approved.'),
                                        });
                                    }}
                                    className="rounded-full border border-emerald-400 px-4 py-2 text-xs font-semibold text-emerald-200"
                                >
                                    Approve Reservation
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            ) : null}

            <section className="grid gap-6 lg:grid-cols-3">
                {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                        <Dialog
                            key={action.key}
                            open={activeDialog === action.key}
                            onOpenChange={(open) => {
                                setActiveDialog(open ? action.key : null);
                                issueForm.clearErrors();
                                returnForm.clearErrors();
                                renewForm.clearErrors();
                            }}
                        >
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
                                {action.key === 'renew' ? (
                                    <form
                                        onSubmit={(event) => {
                                            event.preventDefault();
                                            renewForm.post('/librarian/transactions/renew', {
                                                onSuccess: () => {
                                                    toast.success('Borrowing renewed.');
                                                    closeDialog();
                                                    renewForm.reset();
                                                },
                                            });
                                        }}
                                        className="grid gap-4"
                                    >
                                        <div className="grid gap-2">
                                            <Label htmlFor="renew-transaction">Transaction ID</Label>
                                            <Input
                                                id="renew-transaction"
                                                value={renewForm.data.transaction_id}
                                                onChange={(event) => renewForm.setData('transaction_id', event.target.value)}
                                                className="bg-[#141c2a]"
                                            />
                                            <InputError message={renewForm.errors.transaction_id} className="text-red-400" />
                                        </div>
                                        <DialogFooter>
                                            <button
                                                disabled={renewForm.processing}
                                                className="rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-200"
                                            >
                                                Confirm
                                            </button>
                                        </DialogFooter>
                                    </form>
                                ) : null}
                                {action.key === 'issue' ? (
                                    <form
                                        onSubmit={(event) => {
                                            event.preventDefault();
                                            issueForm.post('/librarian/transactions/issue', {
                                                onSuccess: () => {
                                                    toast.success('Book issued.');
                                                    closeDialog();
                                                    issueForm.reset();
                                                },
                                            });
                                        }}
                                        className="grid gap-4"
                                    >
                                        <div className="grid gap-2">
                                            <Label htmlFor="quick-member">Member ID (User ID)</Label>
                                            <Input
                                                id="quick-member"
                                                value={issueForm.data.member_id}
                                                onChange={(event) => issueForm.setData('member_id', event.target.value)}
                                                className="bg-[#141c2a]"
                                            />
                                            <InputError message={issueForm.errors.member_id} className="text-red-400" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="quick-isbn">Book ISBN</Label>
                                            <Input
                                                id="quick-isbn"
                                                value={issueForm.data.isbn}
                                                onChange={(event) => issueForm.setData('isbn', event.target.value)}
                                                className="bg-[#141c2a]"
                                            />
                                            <InputError message={issueForm.errors.isbn} className="text-red-400" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="quick-due">Due Date</Label>
                                            <Input
                                                id="quick-due"
                                                type="date"
                                                value={issueForm.data.due_at}
                                                onChange={(event) => issueForm.setData('due_at', event.target.value)}
                                                className="bg-[#141c2a]"
                                            />
                                            <InputError message={issueForm.errors.due_at} className="text-red-400" />
                                        </div>
                                        <DialogFooter>
                                            <button
                                                disabled={issueForm.processing}
                                                className="rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-200"
                                            >
                                                Confirm
                                            </button>
                                        </DialogFooter>
                                    </form>
                                ) : null}
                                {action.key === 'return' ? (
                                    <form
                                        onSubmit={(event) => {
                                            event.preventDefault();
                                            returnForm.post('/librarian/transactions/return', {
                                                onSuccess: () => {
                                                    toast.success('Book returned.');
                                                    closeDialog();
                                                    returnForm.reset();
                                                },
                                            });
                                        }}
                                        className="grid gap-4"
                                    >
                                        <div className="grid gap-2">
                                            <Label htmlFor="quick-return">Transaction ID</Label>
                                            <Input
                                                id="quick-return"
                                                value={returnForm.data.transaction_id}
                                                onChange={(event) => returnForm.setData('transaction_id', event.target.value)}
                                                className="bg-[#141c2a]"
                                            />
                                            <InputError message={returnForm.errors.transaction_id} className="text-red-400" />
                                        </div>
                                        <DialogFooter>
                                            <button
                                                disabled={returnForm.processing}
                                                className="rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-200"
                                            >
                                                Confirm
                                            </button>
                                        </DialogFooter>
                                    </form>
                                ) : null}
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
                        value={filters.from}
                        onChange={(event) => router.get('/librarian/transactions', { ...filters, from: event.target.value }, { replace: true, preserveState: true })}
                        className="rounded-xl border border-[#1f2a3d] bg-[#1a2436]/80 px-3 py-2 text-sm text-slate-200"
                    />
                    <span className="text-sm text-slate-400">to</span>
                    <input
                        type="date"
                        value={filters.to}
                        onChange={(event) => router.get('/librarian/transactions', { ...filters, to: event.target.value }, { replace: true, preserveState: true })}
                        className="rounded-xl border border-[#1f2a3d] bg-[#1a2436]/80 px-3 py-2 text-sm text-slate-200"
                    />
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
                {transactions.length === 0 ? (
                    <div className="mt-4 flex h-40 items-center justify-center rounded-2xl border border-dashed border-[#1f2a3d] text-sm text-slate-500">
                        Transactions will appear here.
                    </div>
                ) : (
                    transactions.map((tx) => (
                        <div
                            key={tx.id}
                            className="mt-4 grid grid-cols-[160px_repeat(6,1fr)_140px] items-center gap-2 rounded-2xl border border-[#1f2a3d] bg-[#1a2436]/80 px-4 py-3 text-sm text-slate-200"
                        >
                            <span>TX-{tx.id}</span>
                            <span>{tx.member}</span>
                            <span>{tx.book}</span>
                            <span>{tx.type}</span>
                            <span>{tx.date}</span>
                            <span>{tx.due}</span>
                            <span className="text-emerald-300">{tx.status}</span>
                            <div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="rounded-full border border-[#1f2a3d] p-2 text-slate-300">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                                        <DropdownMenuItem>View details</DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => {
                                                returnForm.setData('transaction_id', String(tx.id));
                                                returnForm.post('/librarian/transactions/return', {
                                                    onSuccess: () => toast.success('Book returned.'),
                                                });
                                            }}
                                        >
                                            Mark returned
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    ))
                )}
            </section>
        </LibraryLayout>
    );
}
