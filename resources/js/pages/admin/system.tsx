import LibraryLayout from '@/layouts/library-layout';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const configs = [
    {
        title: 'Categories & Departments',
        description: 'Manage subjects, departments, and book types in one place.',
        action: 'Manage Categories',
    },
    {
        title: 'Borrowing Rules',
        description: 'Set max books, loan durations, and renewal policies.',
        action: 'Configure Rules',
    },
    {
        title: 'Library Settings',
        description: 'Adjust opening hours, notifications, and system preferences.',
        action: 'Update Settings',
    },
];

export default function AdminSystem() {
    return (
        <LibraryLayout title="System Configuration" role="admin" active="system">
            <section className="flex flex-col gap-2">
                <h1 className="text-4xl font-semibold text-white">System Configuration</h1>
                <p className="text-sm text-slate-400">Control catalogs, departments, and borrowing rules.</p>
            </section>

            <section className="grid gap-6 lg:grid-cols-3">
                {configs.map((card) => (
                    <Dialog key={card.title}>
                        <div className="rounded-3xl border border-[#1f2a3d] bg-[#141c2a]/80 p-6">
                            <h2 className="text-lg font-semibold text-white">{card.title}</h2>
                            <p className="mt-2 text-sm text-slate-400">{card.description}</p>
                            <DialogTrigger asChild>
                                <button className="mt-6 rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-200">
                                    {card.action}
                                </button>
                            </DialogTrigger>
                        </div>
                        <DialogContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                            <DialogHeader>
                                <DialogTitle>{card.title}</DialogTitle>
                                <DialogDescription className="text-slate-400">
                                    Update configuration values for this section.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="rounded-xl border border-[#1f2a3d] bg-[#141c2a] p-4 text-sm text-slate-300">
                                Configuration controls will be available in the next iteration.
                            </div>
                            <DialogFooter>
                                <button className="rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-200">
                                    Save Changes
                                </button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                ))}
            </section>
        </LibraryLayout>
    );
}
