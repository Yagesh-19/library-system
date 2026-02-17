import LibraryLayout from '@/layouts/library-layout';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MoreHorizontal, UserPlus } from 'lucide-react';

export default function LibrarianMembers() {
    return (
        <LibraryLayout title="Members Management" role="librarian" active="members">
            <section className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-semibold text-white">Members Management</h1>
                        <p className="text-sm text-slate-400">Manage member profiles and borrowing privileges.</p>
                    </div>
                    <Dialog>
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
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="member-name">Full Name</Label>
                                    <Input id="member-name" placeholder="Member name" className="bg-[#141c2a]" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="member-email">Email</Label>
                                    <Input id="member-email" placeholder="member@example.com" className="bg-[#141c2a]" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="member-phone">Phone</Label>
                                    <Input id="member-phone" placeholder="+1 555 123 456" className="bg-[#141c2a]" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="member-type">Member Type</Label>
                                    <Input id="member-type" placeholder="Student / Faculty" className="bg-[#141c2a]" />
                                </div>
                            </div>
                            <DialogFooter>
                                <button className="rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-200">
                                    Add Member
                                </button>
                            </DialogFooter>
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
                                className="w-full bg-transparent text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
                                placeholder="Search members by name, email, or phone..."
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Select defaultValue="all-types">
                            <SelectTrigger className="w-[160px] border-[#1f2a3d] bg-[#1a2436]/80 text-slate-200">
                                <SelectValue placeholder="All Types" />
                            </SelectTrigger>
                            <SelectContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                                <SelectItem value="all-types">All Types</SelectItem>
                                <SelectItem value="student">Student</SelectItem>
                                <SelectItem value="faculty">Faculty</SelectItem>
                                <SelectItem value="external">External</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select defaultValue="all-status">
                            <SelectTrigger className="w-[150px] border-[#1f2a3d] bg-[#1a2436]/80 text-slate-200">
                                <SelectValue placeholder="All Status" />
                            </SelectTrigger>
                            <SelectContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                                <SelectItem value="all-status">All Status</SelectItem>
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
                <div className="mt-4 grid grid-cols-[160px_repeat(4,1fr)_140px] items-center gap-2 rounded-2xl border border-[#1f2a3d] bg-[#1a2436]/80 px-4 py-3 text-sm text-slate-200">
                    <span>MB-1024</span>
                    <span>Jamie Lee</span>
                    <span>jamie@example.com</span>
                    <span>Student</span>
                    <span className="text-emerald-300">Active</span>
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="rounded-full border border-[#1f2a3d] p-2 text-slate-300">
                                    <MoreHorizontal className="h-4 w-4" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                                <DropdownMenuItem>View history</DropdownMenuItem>
                                <DropdownMenuItem>Update status</DropdownMenuItem>
                                <DropdownMenuItem>Disable account</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </section>
        </LibraryLayout>
    );
}
