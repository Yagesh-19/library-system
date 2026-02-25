import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';
import InputError from '@/components/input-error';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LibraryLayout from '@/layouts/library-layout';

type SystemProps = {
    rules: {
        max_books: number;
        borrow_days: number;
        renew_limit: number;
    };
    settings: {
        library_name: string;
        opening_hours: string;
        contact_email: string;
    };
    categories: { id: number; name: string; slug: string }[];
};

export default function AdminSystem({ rules, settings, categories }: SystemProps) {
    const [categoryOpen, setCategoryOpen] = useState(false);
    const categoryForm = useForm({ name: '' });
    const rulesForm = useForm({
        max_books: rules.max_books,
        borrow_days: rules.borrow_days,
        renew_limit: rules.renew_limit,
    });
    const settingsForm = useForm({
        library_name: settings.library_name,
        opening_hours: settings.opening_hours,
        contact_email: settings.contact_email,
    });

    return (
        <LibraryLayout title="System Configuration" role="admin" active="system">
            <section className="flex flex-col gap-2">
                <h1 className="text-4xl font-semibold text-white">System Configuration</h1>
                <p className="text-sm text-slate-400">Control catalogs and borrowing rules.</p>
            </section>

            <section className="grid gap-6 lg:grid-cols-3">
                <Dialog open={categoryOpen} onOpenChange={(value) => {
                    setCategoryOpen(value);
                    categoryForm.clearErrors();
                }}>
                    <div className="rounded-3xl border border-[#1f2a3d] bg-[#141c2a]/80 p-6">
                        <h2 className="text-lg font-semibold text-white">Categories</h2>
                        <p className="mt-2 text-sm text-slate-400">Manage categories used in the catalog.</p>
                        <DialogTrigger asChild>
                            <button className="mt-6 rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-200">
                                Add Category
                            </button>
                        </DialogTrigger>
                        <div className="mt-4 space-y-2">
                            {categories.map((category) => (
                                <div key={category.id} className="flex items-center justify-between rounded-xl border border-[#1f2a3d] bg-[#1a2436]/80 px-3 py-2 text-sm text-slate-200">
                                    <span>{category.name}</span>
                                    <button
                                        onClick={() => router.delete(`/admin/system/categories/${category.id}`, { onSuccess: () => toast.success('Category removed.') })}
                                        className="text-xs text-rose-300"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <DialogContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                        <DialogHeader>
                            <DialogTitle>Add Category</DialogTitle>
                            <DialogDescription className="text-slate-400">Add a new catalog category.</DialogDescription>
                        </DialogHeader>
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                categoryForm.post('/admin/system/categories', {
                                    onSuccess: () => {
                                        toast.success('Category added.');
                                        setCategoryOpen(false);
                                        categoryForm.reset();
                                    },
                                });
                            }}
                            className="grid gap-4"
                        >
                            <div className="grid gap-2">
                                <Label htmlFor="category-name">Category Name</Label>
                                <Input
                                    id="category-name"
                                    value={categoryForm.data.name}
                                    onChange={(event) => categoryForm.setData('name', event.target.value)}
                                    className="bg-[#141c2a]"
                                />
                                <InputError message={categoryForm.errors.name} className="text-red-400" />
                            </div>
                            <DialogFooter>
                                <button className="rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-200">
                                    Save Category
                                </button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                <div className="rounded-3xl border border-[#1f2a3d] bg-[#141c2a]/80 p-6">
                    <h2 className="text-lg font-semibold text-white">Borrowing Rules</h2>
                    <p className="mt-2 text-sm text-slate-400">Configure borrowing limits.</p>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            rulesForm.patch('/admin/system/borrowing-rules', {
                                onSuccess: () => toast.success('Borrowing rules updated.'),
                            });
                        }}
                        className="mt-4 grid gap-3"
                    >
                        <div className="grid gap-2">
                            <Label>Max books per user</Label>
                            <Input
                                type="number"
                                min={1}
                                value={rulesForm.data.max_books}
                                onChange={(event) => rulesForm.setData('max_books', Number(event.target.value))}
                                className="bg-[#141c2a]"
                            />
                            <InputError message={rulesForm.errors.max_books} className="text-red-400" />
                        </div>
                        <div className="grid gap-2">
                            <Label>Borrowing period (days)</Label>
                            <Input
                                type="number"
                                min={1}
                                value={rulesForm.data.borrow_days}
                                onChange={(event) => rulesForm.setData('borrow_days', Number(event.target.value))}
                                className="bg-[#141c2a]"
                            />
                            <InputError message={rulesForm.errors.borrow_days} className="text-red-400" />
                        </div>
                        <div className="grid gap-2">
                            <Label>Renewal limit</Label>
                            <Input
                                type="number"
                                min={0}
                                value={rulesForm.data.renew_limit}
                                onChange={(event) => rulesForm.setData('renew_limit', Number(event.target.value))}
                                className="bg-[#141c2a]"
                            />
                            <InputError message={rulesForm.errors.renew_limit} className="text-red-400" />
                        </div>
                        <button className="rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-200">
                            Save Rules
                        </button>
                    </form>
                </div>

                <div className="rounded-3xl border border-[#1f2a3d] bg-[#141c2a]/80 p-6">
                    <h2 className="text-lg font-semibold text-white">Library Settings</h2>
                    <p className="mt-2 text-sm text-slate-400">Update basic system information.</p>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            settingsForm.patch('/admin/system/settings', {
                                onSuccess: () => toast.success('Settings updated.'),
                            });
                        }}
                        className="mt-4 grid gap-3"
                    >
                        <div className="grid gap-2">
                            <Label>Library Name</Label>
                            <Input
                                value={settingsForm.data.library_name}
                                onChange={(event) => settingsForm.setData('library_name', event.target.value)}
                                className="bg-[#141c2a]"
                            />
                            <InputError message={settingsForm.errors.library_name} className="text-red-400" />
                        </div>
                        <div className="grid gap-2">
                            <Label>Opening Hours</Label>
                            <Input
                                value={settingsForm.data.opening_hours}
                                onChange={(event) => settingsForm.setData('opening_hours', event.target.value)}
                                className="bg-[#141c2a]"
                            />
                            <InputError message={settingsForm.errors.opening_hours} className="text-red-400" />
                        </div>
                        <div className="grid gap-2">
                            <Label>Contact Email</Label>
                            <Input
                                type="email"
                                value={settingsForm.data.contact_email}
                                onChange={(event) => settingsForm.setData('contact_email', event.target.value)}
                                className="bg-[#141c2a]"
                            />
                            <InputError message={settingsForm.errors.contact_email} className="text-red-400" />
                        </div>
                        <button className="rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-200">
                            Save Settings
                        </button>
                    </form>
                </div>
            </section>
        </LibraryLayout>
    );
}
