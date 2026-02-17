import LibraryLayout from '@/layouts/library-layout';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MoreHorizontal, Plus } from 'lucide-react';

export default function LibrarianBooks() {
    return (
        <LibraryLayout title="Books Management" role="librarian" active="books">
            <section className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-semibold text-white">Books Management</h1>
                        <p className="text-sm text-slate-400">Catalog, update, and track books in the system.</p>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <button className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-emerald-950 shadow-[0_12px_30px_rgba(16,185,129,0.35)]">
                                <Plus className="h-4 w-4" />
                                Add New Book
                            </button>
                        </DialogTrigger>
                        <DialogContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                            <DialogHeader>
                                <DialogTitle>Add New Book</DialogTitle>
                                <DialogDescription className="text-slate-400">
                                    Enter book details to add it to the catalog.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input id="title" placeholder="Book title" className="bg-[#141c2a]" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="author">Author</Label>
                                    <Input id="author" placeholder="Author name" className="bg-[#141c2a]" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="isbn">ISBN</Label>
                                    <Input id="isbn" placeholder="978-1-2345-6789-0" className="bg-[#141c2a]" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Input id="category" placeholder="Fiction, Science, etc." className="bg-[#141c2a]" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="copies">Copies</Label>
                                    <Input id="copies" placeholder="Number of copies" className="bg-[#141c2a]" />
                                </div>
                            </div>
                            <DialogFooter>
                                <button className="rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-200">
                                    Save Book
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
                                placeholder="Search books by title, author, or ISBN..."
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Select defaultValue="all-categories">
                            <SelectTrigger className="w-[180px] border-[#1f2a3d] bg-[#1a2436]/80 text-slate-200">
                                <SelectValue placeholder="All Categories" />
                            </SelectTrigger>
                            <SelectContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                                <SelectItem value="all-categories">All Categories</SelectItem>
                                <SelectItem value="fiction">Fiction</SelectItem>
                                <SelectItem value="science">Science</SelectItem>
                                <SelectItem value="technology">Technology</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select defaultValue="all-status">
                            <SelectTrigger className="w-[160px] border-[#1f2a3d] bg-[#1a2436]/80 text-slate-200">
                                <SelectValue placeholder="All Status" />
                            </SelectTrigger>
                            <SelectContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                                <SelectItem value="all-status">All Status</SelectItem>
                                <SelectItem value="available">Available</SelectItem>
                                <SelectItem value="borrowed">Borrowed</SelectItem>
                                <SelectItem value="reserved">Reserved</SelectItem>
                            </SelectContent>
                        </Select>
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
                <div className="mt-4 grid grid-cols-[120px_repeat(5,1fr)_140px] items-center gap-2 rounded-2xl border border-[#1f2a3d] bg-[#1a2436]/80 px-4 py-3 text-sm text-slate-200">
                    <div className="flex h-12 w-16 items-center justify-center rounded-xl bg-[#0f172a] text-lg">📘</div>
                    <span>The Alchemist</span>
                    <span>Paulo Coelho</span>
                    <span>978-0-06-112241-5</span>
                    <span>Fiction</span>
                    <span className="text-emerald-300">Available</span>
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="rounded-full border border-[#1f2a3d] p-2 text-slate-300">
                                    <MoreHorizontal className="h-4 w-4" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                                <DropdownMenuItem>Edit details</DropdownMenuItem>
                                <DropdownMenuItem>Update stock</DropdownMenuItem>
                                <DropdownMenuItem>Archive book</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </section>
        </LibraryLayout>
    );
}
