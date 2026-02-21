import InputError from '@/components/input-error';
import LibraryLayout from '@/layouts/library-layout';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import { useState } from 'react';

type ProfileProps = {
    profile: {
        name: string;
        email: string;
        studentNumber: string | null;
    };
    history: {
        id: number;
        title: string;
        action: string;
        date: string | null;
    }[];
};

export default function StudentProfile({ profile, history }: ProfileProps) {
    const [open, setOpen] = useState(false);
    const { data, setData, patch, processing, errors, clearErrors } = useForm({
        name: profile.name,
        email: profile.email,
        student_number: profile.studentNumber ?? '',
    });

    return (
        <LibraryLayout title="Profile" role="student" active="profile">
            <section className="flex flex-col gap-2">
                <h1 className="text-4xl font-semibold text-white">Profile</h1>
                <p className="text-sm text-slate-400">Manage your personal details and history.</p>
            </section>

            <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-3xl border border-[#1f2a3d] bg-[#141c2a]/80 p-6">
                    <h2 className="text-lg font-semibold text-white">Personal Details</h2>
                    <div className="mt-5 space-y-4 text-sm text-slate-300">
                        <div className="flex items-center justify-between">
                            <span className="text-slate-400">Name</span>
                            <span className="text-white">{profile.name}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-slate-400">Student ID</span>
                            <span className="text-white">{profile.studentNumber ?? 'Not set'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-slate-400">Email</span>
                            <span className="text-white">{profile.email}</span>
                        </div>
                        <Dialog
                            open={open}
                            onOpenChange={(value) => {
                                setOpen(value);
                                clearErrors();
                            }}
                        >
                            <DialogTrigger asChild>
                                <button className="mt-4 rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-950">
                                    Edit Profile
                                </button>
                            </DialogTrigger>
                            <DialogContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                                <DialogHeader>
                                    <DialogTitle>Edit Profile</DialogTitle>
                                    <DialogDescription className="text-slate-400">
                                        Update your personal details.
                                    </DialogDescription>
                                </DialogHeader>
                                <form
                                    onSubmit={(event) => {
                                        event.preventDefault();
                                        patch('/student/profile', {
                                            onSuccess: () => {
                                                toast.success('Profile updated.');
                                                setOpen(false);
                                            },
                                        });
                                    }}
                                    className="grid gap-4"
                                >
                                    <div className="grid gap-2">
                                        <Label htmlFor="profile-name">Name</Label>
                                        <Input
                                            id="profile-name"
                                            value={data.name}
                                            onChange={(event) => setData('name', event.target.value)}
                                            className="bg-[#141c2a]"
                                        />
                                        <InputError message={errors.name} className="text-red-400" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="profile-email">Email</Label>
                                        <Input
                                            id="profile-email"
                                            value={data.email}
                                            onChange={(event) => setData('email', event.target.value)}
                                            className="bg-[#141c2a]"
                                        />
                                        <InputError message={errors.email} className="text-red-400" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="profile-id">Student ID</Label>
                                        <Input
                                            id="profile-id"
                                            value={data.student_number}
                                            onChange={(event) => setData('student_number', event.target.value)}
                                            className="bg-[#141c2a]"
                                        />
                                        <InputError message={errors.student_number} className="text-red-400" />
                                    </div>
                                    <DialogFooter>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-200"
                                        >
                                            Save Changes
                                        </button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <div className="rounded-3xl border border-[#1f2a3d] bg-[#141c2a]/80 p-6">
                    <h2 className="text-lg font-semibold text-white">Borrowing History</h2>
                    <div className="mt-5 space-y-4">
                        {history.length === 0 ? (
                            <div className="rounded-2xl border border-[#1f2a3d] bg-[#1a2436]/80 p-4 text-sm text-slate-400">
                                No history yet.
                            </div>
                        ) : (
                            history.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between rounded-2xl border border-[#1f2a3d] bg-[#1a2436]/80 p-4"
                                >
                                    <div>
                                        <p className="text-sm font-semibold text-white">{item.title}</p>
                                        <p className="text-xs text-slate-400">{item.date ?? 'N/A'}</p>
                                    </div>
                                    <span className="rounded-full bg-sky-400/20 px-3 py-1 text-xs font-semibold text-sky-200">
                                        {item.action}
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
