import InputError from '@/components/input-error';
import LibraryLayout from '@/layouts/library-layout';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { router, useForm } from '@inertiajs/react';
import { MoreHorizontal, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

type BooksProps = {
    filters: {
        q: string;
        status: string;
        category: string;
    };
    books: {
        id: number;
        title: string;
        author: string;
        isbn: string;
        category: string;
        status: string;
        available: number;
        total: number;
    }[];
    categories: { id: number; name: string; slug: string }[];
};

export default function LibrarianBooks({ filters, books, categories }: BooksProps) {
    const [open, setOpen] = useState(false);
    const [editBook, setEditBook] = useState<BooksProps['books'][number] | null>(null);
    const [stockBook, setStockBook] = useState<BooksProps['books'][number] | null>(null);

    const createForm = useForm({
        title: '',
        author: '',
        isbn: '',
        category: '',
        copies: 1,
    });

    const editForm = useForm({
        title: '',
        author: '',
        category: '',
    });

    const stockForm = useForm({
        total_copies: 1,
        available_copies: 1,
    });

    return (
        <LibraryLayout title="Books Management" role="librarian" active="books">
            <section className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-semibold text-white">Books Management</h1>
                        <p className="text-sm text-slate-400">Catalog, update, and track books in the system.</p>
                    </div>
                    <Dialog
                        open={open}
                        onOpenChange={(value) => {
                            setOpen(value);
                            createForm.clearErrors();
                        }}
                    >
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
                            <form
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    createForm.post('/librarian/books', {
                                        onSuccess: () => {
                                            toast.success('Book added.');
                                            setOpen(false);
                                            createForm.reset();
                                        },
                                    });
                                }}
                                className="grid gap-4"
                            >
                                <div className="grid gap-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        value={createForm.data.title}
                                        onChange={(event) => createForm.setData('title', event.target.value)}
                                        className="bg-[#141c2a]"
                                    />
                                    <InputError message={createForm.errors.title} className="text-red-400" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="author">Author</Label>
                                    <Input
                                        id="author"
                                        value={createForm.data.author}
                                        onChange={(event) => createForm.setData('author', event.target.value)}
                                        className="bg-[#141c2a]"
                                    />
                                    <InputError message={createForm.errors.author} className="text-red-400" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="isbn">ISBN</Label>
                                    <Input
                                        id="isbn"
                                        value={createForm.data.isbn}
                                        onChange={(event) => createForm.setData('isbn', event.target.value)}
                                        className="bg-[#141c2a]"
                                    />
                                    <InputError message={createForm.errors.isbn} className="text-red-400" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Input
                                        id="category"
                                        value={createForm.data.category}
                                        onChange={(event) => createForm.setData('category', event.target.value)}
                                        className="bg-[#141c2a]"
                                    />
                                    <InputError message={createForm.errors.category} className="text-red-400" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="copies">Copies</Label>
                                    <Input
                                        id="copies"
                                        type="number"
                                        min={1}
                                        value={createForm.data.copies}
                                        onChange={(event) => createForm.setData('copies', Number(event.target.value))}
                                        className="bg-[#141c2a]"
                                    />
                                    <InputError message={createForm.errors.copies} className="text-red-400" />
                                </div>
                                <DialogFooter>
                                    <button
                                        type="submit"
                                        disabled={createForm.processing}
                                        className="rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-200"
                                    >
                                        Save Book
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
                                onChange={(event) => router.get('/librarian/books', { ...filters, q: event.target.value }, { preserveState: true, replace: true })}
                                className="w-full bg-transparent text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
                                placeholder="Search books by title, author, or ISBN..."
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Select
                            value={filters.category || 'all'}
                            onValueChange={(value) => router.get('/librarian/books', { ...filters, category: value }, { preserveState: true, replace: true })}
                        >
                            <SelectTrigger className="w-[180px] border-[#1f2a3d] bg-[#1a2436]/80 text-slate-200">
                                <SelectValue placeholder="All Categories" />
                            </SelectTrigger>
                            <SelectContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                                <SelectItem value="all">All Categories</SelectItem>
                                {categories.map((category) => (
                                    <SelectItem key={category.id} value={category.slug}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select
                            value={filters.status || 'all'}
                            onValueChange={(value) => router.get('/librarian/books', { ...filters, status: value }, { preserveState: true, replace: true })}
                        >
                            <SelectTrigger className="w-[160px] border-[#1f2a3d] bg-[#1a2436]/80 text-slate-200">
                                <SelectValue placeholder="All Status" />
                            </SelectTrigger>
                            <SelectContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="available">Available</SelectItem>
                                <SelectItem value="borrowed">Borrowed</SelectItem>
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
                {books.length === 0 ? (
                    <div className="mt-4 flex h-40 items-center justify-center rounded-2xl border border-dashed border-[#1f2a3d] text-sm text-slate-500">
                        Book entries will appear here.
                    </div>
                ) : (
                    books.map((book) => (
                        <div
                            key={book.id}
                            className="mt-4 grid grid-cols-[120px_repeat(5,1fr)_140px] items-center gap-2 rounded-2xl border border-[#1f2a3d] bg-[#1a2436]/80 px-4 py-3 text-sm text-slate-200"
                        >
                            <div className="flex h-12 w-16 items-center justify-center rounded-xl bg-[#0f172a] text-lg">📘</div>
                            <span>{book.title}</span>
                            <span>{book.author}</span>
                            <span>{book.isbn}</span>
                            <span>{book.category}</span>
                            <span className={book.status === 'Available' ? 'text-emerald-300' : 'text-amber-300'}>
                                {book.status}
                            </span>
                            <div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="rounded-full border border-[#1f2a3d] p-2 text-slate-300">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                                        <DropdownMenuItem
                                            onClick={() => {
                                                setEditBook(book);
                                                editForm.setData({
                                                    title: book.title,
                                                    author: book.author,
                                                    category: book.category,
                                                });
                                            }}
                                        >
                                            Edit details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => {
                                                setStockBook(book);
                                                stockForm.setData({
                                                    total_copies: book.total,
                                                    available_copies: book.available,
                                                });
                                            }}
                                        >
                                            Update stock
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => {
                                                router.delete(`/librarian/books/${book.id}`, {
                                                    onSuccess: () => toast.success('Book archived.'),
                                                });
                                            }}
                                        >
                                            Archive book
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    ))
                )}
            </section>

            <Dialog open={!!editBook} onOpenChange={(value) => !value && setEditBook(null)}>
                <DialogContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                    <DialogHeader>
                        <DialogTitle>Edit Book</DialogTitle>
                        <DialogDescription className="text-slate-400">Update book information.</DialogDescription>
                    </DialogHeader>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            if (!editBook) return;
                            editForm.patch(`/librarian/books/${editBook.id}`, {
                                onSuccess: () => {
                                    toast.success('Book updated.');
                                    setEditBook(null);
                                },
                            });
                        }}
                        className="grid gap-4"
                    >
                        <div className="grid gap-2">
                            <Label>Title</Label>
                            <Input
                                value={editForm.data.title}
                                onChange={(event) => editForm.setData('title', event.target.value)}
                                className="bg-[#141c2a]"
                            />
                            <InputError message={editForm.errors.title} className="text-red-400" />
                        </div>
                        <div className="grid gap-2">
                            <Label>Author</Label>
                            <Input
                                value={editForm.data.author}
                                onChange={(event) => editForm.setData('author', event.target.value)}
                                className="bg-[#141c2a]"
                            />
                            <InputError message={editForm.errors.author} className="text-red-400" />
                        </div>
                        <div className="grid gap-2">
                            <Label>Category</Label>
                            <Input
                                value={editForm.data.category}
                                onChange={(event) => editForm.setData('category', event.target.value)}
                                className="bg-[#141c2a]"
                            />
                            <InputError message={editForm.errors.category} className="text-red-400" />
                        </div>
                        <DialogFooter>
                            <button
                                disabled={editForm.processing}
                                className="rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-200"
                            >
                                Save Changes
                            </button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={!!stockBook} onOpenChange={(value) => !value && setStockBook(null)}>
                <DialogContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                    <DialogHeader>
                        <DialogTitle>Update Stock</DialogTitle>
                        <DialogDescription className="text-slate-400">Update available and total copies.</DialogDescription>
                    </DialogHeader>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            if (!stockBook) return;
                            stockForm.patch(`/librarian/books/${stockBook.id}/stock`, {
                                onSuccess: () => {
                                    toast.success('Stock updated.');
                                    setStockBook(null);
                                },
                            });
                        }}
                        className="grid gap-4"
                    >
                        <div className="grid gap-2">
                            <Label>Total copies</Label>
                            <Input
                                type="number"
                                min={1}
                                value={stockForm.data.total_copies}
                                onChange={(event) => stockForm.setData('total_copies', Number(event.target.value))}
                                className="bg-[#141c2a]"
                            />
                            <InputError message={stockForm.errors.total_copies} className="text-red-400" />
                        </div>
                        <div className="grid gap-2">
                            <Label>Available copies</Label>
                            <Input
                                type="number"
                                min={0}
                                value={stockForm.data.available_copies}
                                onChange={(event) => stockForm.setData('available_copies', Number(event.target.value))}
                                className="bg-[#141c2a]"
                            />
                            <InputError message={stockForm.errors.available_copies} className="text-red-400" />
                        </div>
                        <DialogFooter>
                            <button
                                disabled={stockForm.processing}
                                className="rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-200"
                            >
                                Save Stock
                            </button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </LibraryLayout>
    );
}
