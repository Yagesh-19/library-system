import LibraryLayout from '@/layouts/library-layout';
import { UserPlus } from 'lucide-react';

export default function AdminUsers() {
    return (
        <LibraryLayout title="User Management" role="admin" active="users">
            <section className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-semibold text-white">User Management</h1>
                    <p className="text-sm text-slate-400">Add, remove, and approve library users.</p>
                </div>
                <button className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-emerald-950">
                    <UserPlus className="h-4 w-4" />
                    Add User
                </button>
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
                        <button className="rounded-xl border border-[#1f2a3d] bg-[#1a2436]/80 px-4 py-2 text-sm text-slate-300">
                            All Roles
                        </button>
                        <button className="rounded-xl border border-[#1f2a3d] bg-[#1a2436]/80 px-4 py-2 text-sm text-slate-300">
                            Status
                        </button>
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
                <div className="mt-4 flex h-40 items-center justify-center rounded-2xl border border-dashed border-[#1f2a3d] text-sm text-slate-500">
                    User records will appear here.
                </div>
            </section>
        </LibraryLayout>
    );
}
