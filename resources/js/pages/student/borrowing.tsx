import LibraryLayout from '@/layouts/library-layout';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { router } from '@inertiajs/react';
import { RefreshCcw } from 'lucide-react';

type BorrowingProps = {
    borrowed: {
        id: number;
        title: string;
        due: string | null;
        status: string;
    }[];
    reservations: {
        id: number;
        title: string;
        status: string;
    }[];
};

export default function StudentBorrowing({ borrowed, reservations }: BorrowingProps) {
    return (
        <LibraryLayout title="Borrowing" role="student" active="borrowing">
            <section className="flex flex-col gap-2">
                <h1 className="text-4xl font-semibold text-white">Borrowing</h1>
                <p className="text-sm text-slate-400">Track borrowed books, renewals, and reservations.</p>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-3xl border border-[#1f2a3d] bg-[#141c2a]/80 p-6">
                    <h2 className="text-lg font-semibold text-white">Currently Borrowed</h2>
                    <div className="mt-5 space-y-4">
                        {borrowed.length === 0 ? (
                            <div className="rounded-2xl border border-[#1f2a3d] bg-[#1a2436]/80 p-4 text-sm text-slate-400">
                                No active borrowings.
                            </div>
                        ) : (
                            borrowed.map((book) => (
                                <div
                                    key={book.id}
                                    className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#1f2a3d] bg-[#1a2436]/80 p-4"
                                >
                                    <div>
                                        <p className="text-sm font-semibold text-white">{book.title}</p>
                                        <p className="text-xs text-slate-400">Due: {book.due ?? 'TBD'}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="rounded-full bg-amber-400/20 px-3 py-1 text-xs font-semibold text-amber-200">
                                            {book.status}
                                        </span>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <button className="inline-flex items-center gap-2 rounded-full border border-emerald-400 px-3 py-1 text-xs font-semibold text-emerald-200">
                                                    <RefreshCcw className="h-3 w-3" />
                                                    Renew
                                                </button>
                                            </DialogTrigger>
                                            <DialogContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                                                <DialogHeader>
                                                    <DialogTitle>Renew Book</DialogTitle>
                                                    <DialogDescription className="text-slate-400">
                                                        Extend your borrowing period for “{book.title}”.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="rounded-xl border border-[#1f2a3d] bg-[#141c2a] p-4 text-sm text-slate-300">
                                                    Renewals are subject to availability and borrowing rules.
                                                </div>
                                                <DialogFooter>
                                                    <form
                                                        onSubmit={(event) => {
                                                            event.preventDefault();
                                                            router.post(`/student/borrowings/${book.id}/renew`);
                                                        }}
                                                    >
                                                        <button className="rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-200">
                                                            Confirm Renewal
                                                        </button>
                                                    </form>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="rounded-3xl border border-[#1f2a3d] bg-[#141c2a]/80 p-6">
                    <h2 className="text-lg font-semibold text-white">Reservations & Holds</h2>
                    <div className="mt-5 space-y-4">
                        {reservations.length === 0 ? (
                            <div className="rounded-2xl border border-[#1f2a3d] bg-[#1a2436]/80 p-4 text-sm text-slate-400">
                                No active reservations.
                            </div>
                        ) : (
                            reservations.map((book) => (
                                <div
                                    key={book.id}
                                    className="rounded-2xl border border-[#1f2a3d] bg-[#1a2436]/80 p-4"
                                >
                                    <p className="text-sm font-semibold text-white">{book.title}</p>
                                    <p className="text-xs text-slate-400">{book.status}</p>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <button className="mt-3 rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold text-emerald-200">
                                                Manage Hold
                                            </button>
                                        </DialogTrigger>
                                        <DialogContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                                            <DialogHeader>
                                                <DialogTitle>Manage Hold</DialogTitle>
                                                <DialogDescription className="text-slate-400">
                                                    Update your reservation for “{book.title}”.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="rounded-xl border border-[#1f2a3d] bg-[#141c2a] p-4 text-sm text-slate-300">
                                                You can cancel or reschedule your pickup window.
                                            </div>
                                            <DialogFooter>
                                                <form
                                                    onSubmit={(event) => {
                                                        event.preventDefault();
                                                        router.patch(`/student/reservations/${book.id}`, { action: 'cancel' });
                                                    }}
                                                >
                                                    <button className="rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-200">
                                                        Cancel Reservation
                                                    </button>
                                                </form>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>
        </LibraryLayout>
    );
}
