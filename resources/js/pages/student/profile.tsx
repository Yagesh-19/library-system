import LibraryLayout from '@/layouts/library-layout';

const history = [
    { title: 'The Alchemist', action: 'Returned', date: 'Feb 12, 2026' },
    { title: 'The Great Gatsby', action: 'Borrowed', date: 'Feb 2, 2026' },
    { title: 'Educated', action: 'Returned', date: 'Jan 25, 2026' },
];

export default function StudentProfile() {
    return (
        <LibraryLayout title="Profile" role="student" active="profile">
            <section className="flex flex-col gap-2">
                <h1 className="text-4xl font-semibold text-white">Profile</h1>
                <p className="text-sm text-slate-400">Manage your personal details and history.</p>
            </section>

            <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-3xl border border-[#1f2a3d] bg-[#141c2a]/80 p-6">
                    <h2 className="text-lg font-semibold text-white">Personal Details</h2>
                    <div className="mt-5 space-y-4 text-sm text-slate-300">
                        <div className="flex items-center justify-between">
                            <span className="text-slate-400">Name</span>
                            <span className="text-white">Yagesh Alageshan</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-slate-400">Student ID</span>
                            <span className="text-white">ST-2045</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-slate-400">Email</span>
                            <span className="text-white">yagesh@example.com</span>
                        </div>
                        <button className="mt-4 rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-950">
                            Edit Profile
                        </button>
                    </div>
                </div>

                <div className="rounded-3xl border border-[#1f2a3d] bg-[#141c2a]/80 p-6">
                    <h2 className="text-lg font-semibold text-white">Borrowing History</h2>
                    <div className="mt-5 space-y-4">
                        {history.map((item) => (
                            <div
                                key={item.title}
                                className="flex items-center justify-between rounded-2xl border border-[#1f2a3d] bg-[#1a2436]/80 p-4"
                            >
                                <div>
                                    <p className="text-sm font-semibold text-white">{item.title}</p>
                                    <p className="text-xs text-slate-400">{item.date}</p>
                                </div>
                                <span className="rounded-full bg-sky-400/20 px-3 py-1 text-xs font-semibold text-sky-200">
                                    {item.action}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </LibraryLayout>
    );
}
