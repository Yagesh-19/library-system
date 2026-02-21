import LibraryLayout from '@/layouts/library-layout';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { router, useForm } from '@inertiajs/react';

type SearchProps = {
    filters: {
        q: string;
        availability: string;
        category: string;
        year: number | null;
    };
    categories: { id: number; name: string; slug: string }[];
    books: {
        id: number;
        title: string;
        author: string;
        tag: string;
        genre: string;
        cover: string | null;
    }[];
};

export default function StudentSearch({ filters, categories, books }: SearchProps) {
    const { data, setData } = useForm({
        q: filters.q || '',
        availability: filters.availability || 'all',
        category: filters.category || 'all',
    });

    const submitFilters = () => {
        router.get('/student/search', data, { preserveState: true, replace: true });
    };

    return (
        <LibraryLayout title="Search & Browse" role="student" active="search">
            <section className="flex flex-col gap-2">
                <h1 className="text-4xl font-semibold text-white">Search & Browse</h1>
                <p className="text-sm text-slate-400">Discover books by title, author, ISBN, or category.</p>
            </section>

            <section className="rounded-3xl border border-[#1f2a3d] bg-[#141c2a]/80 p-6">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 rounded-2xl border border-[#1f2a3d] bg-[#1a2436]/80 px-4 py-3">
                            <span className="text-slate-500">🔍</span>
                            <input
                                value={data.q}
                                onChange={(event) => setData('q', event.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        submitFilters();
                                    }
                                }}
                                className="w-full bg-transparent text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
                                placeholder="Search by title, author, ISBN, category..."
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Select
                            value={data.availability}
                            onValueChange={(value) => {
                                setData('availability', value);
                                router.get('/student/search', { ...data, availability: value }, { preserveState: true, replace: true });
                            }}
                        >
                            <SelectTrigger className="w-[160px] border-[#1f2a3d] bg-[#1a2436]/80 text-slate-200">
                                <SelectValue placeholder="Availability" />
                            </SelectTrigger>
                            <SelectContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="available">Available</SelectItem>
                                <SelectItem value="reserved">Reserved</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select
                            value={data.category}
                            onValueChange={(value) => {
                                setData('category', value);
                                router.get('/student/search', { ...data, category: value }, { preserveState: true, replace: true });
                            }}
                        >
                            <SelectTrigger className="w-[160px] border-[#1f2a3d] bg-[#1a2436]/80 text-slate-200">
                                <SelectValue placeholder="Category" />
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
                        <button
                            onClick={submitFilters}
                            className="rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-200"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            </section>

            <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {books.length === 0 ? (
                    <div className="col-span-full rounded-3xl border border-[#1f2a3d] bg-[#141c2a]/80 p-6 text-center text-sm text-slate-400">
                        No books match your search.
                    </div>
                ) : (
                    books.map((book) => (
                        <Dialog key={book.id}>
                            <div className="rounded-3xl border border-[#1f2a3d] bg-[#141c2a]/80 p-5">
                                <div className="flex h-36 items-center justify-center rounded-2xl bg-[#1a2436]/80 text-4xl">
                                    {book.cover ? '📖' : '📚'}
                                </div>
                                <div className="mt-4 space-y-2">
                                    <p className="text-base font-semibold text-white">{book.title}</p>
                                    <p className="text-xs text-slate-400">{book.author}</p>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="rounded-full bg-emerald-400/20 px-3 py-1 font-semibold text-emerald-200">
                                            {book.tag}
                                        </span>
                                        <span className="text-slate-400">{book.genre}</span>
                                    </div>
                                </div>
                                <DialogTrigger asChild>
                                    <button className="mt-4 w-full rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-200">
                                        Request / Reserve
                                    </button>
                                </DialogTrigger>
                            </div>
                            <DialogContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                                <DialogHeader>
                                    <DialogTitle>Request Book</DialogTitle>
                                    <DialogDescription className="text-slate-400">
                                        Confirm your request for “{book.title}”.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="rounded-xl border border-[#1f2a3d] bg-[#141c2a] p-4 text-sm text-slate-300">
                                    Pickup will be available within 24 hours if the book is in stock.
                                </div>
                                <DialogFooter>
                                    <form
                                        onSubmit={(event) => {
                                            event.preventDefault();
                                            router.post('/student/reservations', { book_id: book.id });
                                        }}
                                    >
                                        <button className="rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-200">
                                            Confirm Request
                                        </button>
                                    </form>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    ))
                )}
            </section>
        </LibraryLayout>
    );
}
