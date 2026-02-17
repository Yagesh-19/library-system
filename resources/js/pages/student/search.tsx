import LibraryLayout from '@/layouts/library-layout';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const results = [
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', tag: 'Available', genre: 'Classic' },
    { title: 'Becoming', author: 'Michelle Obama', tag: 'Reserved', genre: 'Biography' },
    { title: 'The Pragmatic Programmer', author: 'Andrew Hunt', tag: 'Available', genre: 'Technology' },
    { title: 'The Alchemist', author: 'Paulo Coelho', tag: '2 copies left', genre: 'Fiction' },
];

export default function StudentSearch() {
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
                                className="w-full bg-transparent text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
                                placeholder="Search by title, author, ISBN, category..."
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Select defaultValue="availability">
                            <SelectTrigger className="w-[160px] border-[#1f2a3d] bg-[#1a2436]/80 text-slate-200">
                                <SelectValue placeholder="Availability" />
                            </SelectTrigger>
                            <SelectContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                                <SelectItem value="availability">Availability</SelectItem>
                                <SelectItem value="available">Available</SelectItem>
                                <SelectItem value="reserved">Reserved</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select defaultValue="genre">
                            <SelectTrigger className="w-[140px] border-[#1f2a3d] bg-[#1a2436]/80 text-slate-200">
                                <SelectValue placeholder="Genre" />
                            </SelectTrigger>
                            <SelectContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                                <SelectItem value="genre">Genre</SelectItem>
                                <SelectItem value="fiction">Fiction</SelectItem>
                                <SelectItem value="classic">Classic</SelectItem>
                                <SelectItem value="science">Science</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select defaultValue="year">
                            <SelectTrigger className="w-[180px] border-[#1f2a3d] bg-[#1a2436]/80 text-slate-200">
                                <SelectValue placeholder="Publication Year" />
                            </SelectTrigger>
                            <SelectContent className="border-[#1f2a3d] bg-[#0f172a] text-slate-100">
                                <SelectItem value="year">Publication Year</SelectItem>
                                <SelectItem value="2020s">2020s</SelectItem>
                                <SelectItem value="2010s">2010s</SelectItem>
                                <SelectItem value="2000s">2000s</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </section>

            <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {results.map((book) => (
                    <Dialog key={book.title}>
                        <div className="rounded-3xl border border-[#1f2a3d] bg-[#141c2a]/80 p-5">
                            <div className="flex h-36 items-center justify-center rounded-2xl bg-[#1a2436]/80 text-4xl">
                                📚
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
                                <button className="rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-200">
                                    Confirm Request
                                </button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                ))}
            </section>
        </LibraryLayout>
    );
}
