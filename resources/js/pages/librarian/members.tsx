import { router, useForm } from '@inertiajs/react';
import { MoreHorizontal, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import InputError from '@/components/input-error';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LibraryLayout from '@/layouts/library-layout';

type MembersProps = {
    filters: {
        q: string;
        status: string;
    };
    members: {
        id: number;
        member_id: string;
        name: string;
        email: string;
        type: string;
        status: string;
        user_id: number;
    }[];
};

export default function LibrarianMembers({ filters, members }: MembersProps) {
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        name: '',
        email: '',
        password: '',
        member_type: 'Student',
    });

    return (
        <LibraryLayout title="Members Management" role="librarian" active="members">
            <section className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-semibold text-white">Members Management</h1>
                        <p className="text-sm text-slate-400">Manage member profiles and borrowing privileges.</p>
                    </div>
                    <Dialog
                        open={open}
                        onOpenChange={(value) => {
                            setOpen(value);
                            clearErrors();
                        }}
                    >
                        <DialogTrigger asChild>
                            <button className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-emerald-950 shadow-[0_12px_30px_rgba(16,185,129,0.35)]">
                                <UserPlus className="h-4 w-4" />
                                Add New Member
                            </button>
                        </DialogTrigger>
                        <DialogContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                            <DialogHeader>
                                <DialogTitle>Add New Member</DialogTitle>
                                <DialogDescription className="text-slate-400">
                                    Create a member profile and assign a membership type.
                                </DialogDescription>
                            </DialogHeader>
                            <form
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    post('/librarian/members', {
                                        onSuccess: () => {
                                            toast.success('Member added.');
                                            setOpen(false);
                                            reset();
                                        },
                                    });
                                }}
                                className="grid gap-4"
                            >
                                <div className="grid gap-2">
                                    <Label htmlFor="member-name">Full Name</Label>
                                    <Input
                                        id="member-name"
                                        value={data.name}
                                        onChange={(event) => setData('name', event.target.value)}
                                        className="bg-[#141c2a]"
                                    />
                                    <InputError message={errors.name} className="text-red-400" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="member-email">Email</Label>
                                    <Input
                                        id="member-email"
                                        value={data.email}
                                        onChange={(event) => setData('email', event.target.value)}
                                        className="bg-[#141c2a]"
                                    />
                                    <InputError message={errors.email} className="text-red-400" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="member-password">Password</Label>
                                    <Input
                                        id="member-password"
                                        type="password"
                                        value={data.password}
                                        onChange={(event) => setData('password', event.target.value)}
                                        className="bg-[#141c2a]"
                                    />
                                    <InputError message={errors.password} className="text-red-400" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="member-type">Member Type</Label>
                                    <Input
                                        id="member-type"
                                        value={data.member_type}
                                        onChange={(event) => setData('member_type', event.target.value)}
                                        className="bg-[#141c2a]"
                                    />
                                    <InputError message={errors.member_type} className="text-red-400" />
                                </div>
                                <DialogFooter>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-200"
                                    >
                                        Add Member
                                    </button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </section>

            <section className="rounded-3xl border border-[#1f2a3d] bg-[#141c2a]/80 p-6">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 rounded-2xl border border-[#1f2a3d] bg-[#1a2436]/80 px-4 py-3">
                            <span className="text-slate-500">🔍</span>
                            <input
                                value={filters.q}
                                onChange={(event) => router.get('/librarian/members', { ...filters, q: event.target.value }, { preserveState: true, replace: true })}
                                className="w-full bg-transparent text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
                                placeholder="Search members by name, email, or phone..."
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Select
                            value={filters.status || 'all'}
                            onValueChange={(value) => router.get('/librarian/members', { ...filters, status: value }, { preserveState: true, replace: true })}
                        >
                            <SelectTrigger className="w-[150px] border-[#1f2a3d] bg-[#1a2436]/80 text-slate-200">
                                <SelectValue placeholder="All Status" />
                            </SelectTrigger>
                            <SelectContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="suspended">Suspended</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </section>

            <section className="rounded-3xl border border-[#1f2a3d] bg-[#141c2a]/80 p-4">
                <div className="grid grid-cols-[160px_repeat(4,1fr)_140px] gap-2 rounded-2xl bg-gradient-to-r from-emerald-400/90 to-emerald-500/90 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-emerald-950">
                    <span>Member ID</span>
                    <span>Name</span>
                    <span>Email</span>
                    <span>Type</span>
                    <span>Status</span>
                    <span>Actions</span>
                </div>
                {members.length === 0 ? (
                    <div className="mt-4 flex h-40 items-center justify-center rounded-2xl border border-dashed border-[#1f2a3d] text-sm text-slate-500">
                        Member entries will appear here.
                    </div>
                ) : (
                    members.map((member) => (
                        <div
                            key={member.id}
                            className="mt-4 grid grid-cols-[160px_repeat(4,1fr)_140px] items-center gap-2 rounded-2xl border border-[#1f2a3d] bg-[#1a2436]/80 px-4 py-3 text-sm text-slate-200"
                        >
                            <span>{member.member_id}</span>
                            <span>{member.name}</span>
                            <span>{member.email}</span>
                            <span>{member.type}</span>
                            <span className={member.status === 'Active' ? 'text-emerald-300' : 'text-amber-300'}>
                                {member.status}
                            </span>
                            <div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="rounded-full border border-[#1f2a3d] p-2 text-slate-300">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                                        <DropdownMenuItem onClick={() => toast.success('History feature pending.')}>View history</DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => {
                                                const status = member.status === 'Active' ? 'suspended' : 'active';
                                                router.patch(`/librarian/members/${member.id}`, { status }, {
                                                    onSuccess: () => toast.success('Member status updated.'),
                                                });
                                            }}
                                        >
                                            {member.status === 'Active' ? 'Suspend member' : 'Activate member'}
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
