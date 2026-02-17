import LibraryLayout from '@/layouts/library-layout';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MoreHorizontal, UserPlus } from 'lucide-react';

export default function AdminUsers() {
    return (
        <LibraryLayout title="User Management" role="admin" active="users">
            <section className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-semibold text-white">User Management</h1>
                    <p className="text-sm text-slate-400">Add, remove, and approve library users.</p>
                </div>
                <Dialog>
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
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="user-name">Name</Label>
                                <Input id="user-name" placeholder="Full name" className="bg-[#141c2a]" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="user-email">Email</Label>
                                <Input id="user-email" placeholder="user@example.com" className="bg-[#141c2a]" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="user-role">Role</Label>
                                <Input id="user-role" placeholder="Admin / Librarian / Student" className="bg-[#141c2a]" />
                            </div>
                        </div>
                        <DialogFooter>
                            <button className="rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-200">
                                Create User
                            </button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </section>

            <section className="rounded-3xl border border-[#1f2a3d] bg-[#141c2a]/80 p-6">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 rounded-2xl border border-[#1f2a3d] bg-[#1a2436]/80 px-4 py-3">
                            <span className="text-slate-500">🔍</span>
                            <input
                                className="w-full bg-transparent text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
                                placeholder="Search users by name, role, email..."
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Select defaultValue="all-roles">
                            <SelectTrigger className="w-[150px] border-[#1f2a3d] bg-[#1a2436]/80 text-slate-200">
                                <SelectValue placeholder="All Roles" />
                            </SelectTrigger>
                            <SelectContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                                <SelectItem value="all-roles">All Roles</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="librarian">Librarian</SelectItem>
                                <SelectItem value="student">Student</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select defaultValue="status">
                            <SelectTrigger className="w-[140px] border-[#1f2a3d] bg-[#1a2436]/80 text-slate-200">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                                <SelectItem value="status">Status</SelectItem>
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
                <div className="mt-4 grid grid-cols-[160px_repeat(4,1fr)_140px] items-center gap-2 rounded-2xl border border-[#1f2a3d] bg-[#1a2436]/80 px-4 py-3 text-sm text-slate-200">
                    <span>US-1002</span>
                    <span>Alex Morgan</span>
                    <span>alex@example.com</span>
                    <span>Librarian</span>
                    <span className="text-amber-300">Pending</span>
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="rounded-full border border-[#1f2a3d] p-2 text-slate-300">
                                    <MoreHorizontal className="h-4 w-4" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                                <DropdownMenuItem>Approve role</DropdownMenuItem>
                                <DropdownMenuItem>Reset password</DropdownMenuItem>
                                <DropdownMenuItem>Disable account</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </section>
        </LibraryLayout>
    );
}
