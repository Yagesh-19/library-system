import InputError from '@/components/input-error';
import LibraryLayout from '@/layouts/library-layout';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { router, useForm } from '@inertiajs/react';
import { MoreHorizontal, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

type UsersProps = {
    filters: {
        q: string;
        role: string;
        status: string;
    };
    users: {
        id: number;
        name: string;
        email: string;
        role: string;
        status: string;
    }[];
};

export default function AdminUsers({ filters, users }: UsersProps) {
    const [open, setOpen] = useState(false);
    const form = useForm({ name: '', email: '', password: '', role: 'student' });

    return (
        <LibraryLayout title="User Management" role="admin" active="users">
            <section className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-semibold text-white">User Management</h1>
                    <p className="text-sm text-slate-400">Add, remove, and approve library users.</p>
                </div>
                <Dialog open={open} onOpenChange={(value) => {
                    setOpen(value);
                    form.clearErrors();
                }}>
                    <DialogTrigger asChild>
                        <button className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-emerald-950">
                            <UserPlus className="h-4 w-4" />
                            Add User
                        </button>
                    </DialogTrigger>
                    <DialogContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                        <DialogHeader>
                            <DialogTitle>Add User</DialogTitle>
                            <DialogDescription className="text-slate-400">
                                Create a new user account and assign a role.
                            </DialogDescription>
                        </DialogHeader>
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                form.post('/admin/users', {
                                    onSuccess: () => {
                                        toast.success('User created.');
                                        setOpen(false);
                                        form.reset();
                                    },
                                });
                            }}
                            className="grid gap-4"
                        >
                            <div className="grid gap-2">
                                <Label htmlFor="user-name">Name</Label>
                                <Input
                                    id="user-name"
                                    value={form.data.name}
                                    onChange={(event) => form.setData('name', event.target.value)}
                                    className="bg-[#141c2a]"
                                />
                                <InputError message={form.errors.name} className="text-red-400" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="user-email">Email</Label>
                                <Input
                                    id="user-email"
                                    value={form.data.email}
                                    onChange={(event) => form.setData('email', event.target.value)}
                                    className="bg-[#141c2a]"
                                />
                                <InputError message={form.errors.email} className="text-red-400" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="user-password">Password</Label>
                                <Input
                                    id="user-password"
                                    type="password"
                                    value={form.data.password}
                                    onChange={(event) => form.setData('password', event.target.value)}
                                    className="bg-[#141c2a]"
                                />
                                <InputError message={form.errors.password} className="text-red-400" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="user-role">Role</Label>
                                <Select value={form.data.role} onValueChange={(value) => form.setData('role', value)}>
                                    <SelectTrigger className="border-[#1f2a3d] bg-[#141c2a] text-slate-200">
                                        <SelectValue placeholder="Role" />
                                    </SelectTrigger>
                                    <SelectContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                                        <SelectItem value="student">Student</SelectItem>
                                        <SelectItem value="librarian">Librarian</SelectItem>
                                        <SelectItem value="admin">Admin</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={form.errors.role} className="text-red-400" />
                            </div>
                            <DialogFooter>
                                <button className="rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-200">
                                    Create User
                                </button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </section>

            <section className="rounded-3xl border border-[#1f2a3d] bg-[#141c2a]/80 p-6">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 rounded-2xl border border-[#1f2a3d] bg-[#1a2436]/80 px-4 py-3">
                            <span className="text-slate-500">🔍</span>
                            <input
                                value={filters.q}
                                onChange={(event) => router.get('/admin/users', { ...filters, q: event.target.value }, { preserveState: true, replace: true })}
                                className="w-full bg-transparent text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
                                placeholder="Search users by name, role, email..."
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Select value={filters.role || 'all'} onValueChange={(value) => router.get('/admin/users', { ...filters, role: value }, { preserveState: true, replace: true })}>
                            <SelectTrigger className="w-[150px] border-[#1f2a3d] bg-[#1a2436]/80 text-slate-200">
                                <SelectValue placeholder="All Roles" />
                            </SelectTrigger>
                            <SelectContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                                <SelectItem value="all">All Roles</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="librarian">Librarian</SelectItem>
                                <SelectItem value="student">Student</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={filters.status || 'all'} onValueChange={(value) => router.get('/admin/users', { ...filters, status: value }, { preserveState: true, replace: true })}>
                            <SelectTrigger className="w-[140px] border-[#1f2a3d] bg-[#1a2436]/80 text-slate-200">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                                <SelectItem value="all">Status</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="disabled">Disabled</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </section>

            <section className="rounded-3xl border border-[#1f2a3d] bg-[#141c2a]/80 p-4">
                <div className="grid grid-cols-[160px_repeat(4,1fr)_140px] gap-2 rounded-2xl bg-gradient-to-r from-sky-400/90 to-sky-500/90 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-sky-950">
                    <span>User ID</span>
                    <span>Name</span>
                    <span>Email</span>
                    <span>Role</span>
                    <span>Status</span>
                    <span>Actions</span>
                </div>
                {users.length === 0 ? (
                    <div className="mt-4 flex h-40 items-center justify-center rounded-2xl border border-dashed border-[#1f2a3d] text-sm text-slate-500">
                        No users found.
                    </div>
                ) : (
                    users.map((user) => (
                        <div
                            key={user.id}
                            className="mt-4 grid grid-cols-[160px_repeat(4,1fr)_140px] items-center gap-2 rounded-2xl border border-[#1f2a3d] bg-[#1a2436]/80 px-4 py-3 text-sm text-slate-200"
                        >
                            <span>US-{user.id}</span>
                            <span>{user.name}</span>
                            <span>{user.email}</span>
                            <span>{user.role}</span>
                            <span className={user.status === 'Active' ? 'text-emerald-300' : user.status === 'Pending' ? 'text-amber-300' : 'text-rose-300'}>
                                {user.status}
                            </span>
                            <div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="rounded-full border border-[#1f2a3d] p-2 text-slate-300">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                                        {user.status === 'Pending' ? (
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    router.patch(`/admin/users/${user.id}/approve`, {}, { onSuccess: () => toast.success('User approved.') });
                                                }}
                                            >
                                                Approve user
                                            </DropdownMenuItem>
                                        ) : null}
                                        <DropdownMenuItem
                                            onClick={() => {
                                                const status = user.status === 'Disabled' ? 'active' : 'disabled';
                                                router.patch(`/admin/users/${user.id}/status`, { status }, { onSuccess: () => toast.success('User status updated.') });
                                            }}
                                        >
                                            {user.status === 'Disabled' ? 'Activate' : 'Disable'} account
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
