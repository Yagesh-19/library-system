import LibraryLayout from '@/layouts/library-layout';
import { Plus } from 'lucide-react';

export default function LibrarianBooks() {
    return (
        <LibraryLayout title="Books Management" role="librarian" active="books">
            <section className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-semibold text-white">Books Management</h1>
                        <p className="text-sm text-slate-400">Catalog, update, and track books in the system.</p>
                    </div>
                    <button className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-emerald-950 shadow-[0_12px_30px_rgba(16,185,129,0.35)]">
                        <Plus className="h-4 w-4" />
                        Add New Book
                    </button>
                </div>
            </section>

            <section className="rounded-3xl border border-[#1f2a3d] bg-[#141c2a]/80 p-6">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 rounded-2xl border border-[#1f2a3d] bg-[#1a2436]/80 px-4 py-3">
                            <span className="text-slate-500">🔍</span>
                            <input
                                className="w-full bg-transparent text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
                                placeholder="Search books by title, author, or ISBN..."
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <button className="rounded-xl border border-[#1f2a3d] bg-[#1a2436]/80 px-4 py-2 text-sm text-slate-300">
                            All Categories
                        </button>
                        <button className="rounded-xl border border-[#1f2a3d] bg-[#1a2436]/80 px-4 py-2 text-sm text-slate-300">
                            All Status
                        </button>
                    </div>
                </div>
            </section>

            <section className="rounded-3xl border border-[#1f2a3d] bg-[#141c2a]/80 p-4">
                <div className="grid grid-cols-[120px_repeat(5,1fr)_140px] gap-2 rounded-2xl bg-gradient-to-r from-emerald-400/90 to-emerald-500/90 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-emerald-950">
                    <span>Cover</span>
                    <span>Title</span>
                    <span>Author</span>
                    <span>ISBN</span>
                    <span>Category</span>
                    <span>Status</span>
                    <span>Actions</span>
                </div>
                <div className="mt-4 flex h-40 items-center justify-center rounded-2xl border border-dashed border-[#1f2a3d] text-sm text-slate-500">
                    Book entries will appear here.
                </div>
            </section>
        </LibraryLayout>
    );
}
