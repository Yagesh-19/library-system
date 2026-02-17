import AuthLayout from '@/layouts/auth-layout';
import { Head, Link } from '@inertiajs/react';

export default function RegisterSelect() {
    return (
        <AuthLayout
            title="Choose your role"
            description="Registration is available for students and librarians."
        >
            <Head title="Register" />
            <div className="grid gap-4">
                <Link
                    href="/register/student"
                    className="rounded-2xl border border-[#1f2a3d] bg-[#0f172a] p-5 text-left transition hover:border-emerald-400/60"
                >
                    <p className="text-lg font-semibold text-white">Student Registration</p>
                    <p className="mt-1 text-sm text-slate-400">
                        Access the catalog, borrowing history, and personal profile tools.
                    </p>
                </Link>
                <Link
                    href="/register/librarian"
                    className="rounded-2xl border border-[#1f2a3d] bg-[#0f172a] p-5 text-left transition hover:border-emerald-400/60"
                >
                    <p className="text-lg font-semibold text-white">Librarian Registration</p>
                    <p className="mt-1 text-sm text-slate-400">
                        Manage books, transactions, and member services.
                    </p>
                </Link>
            </div>
            <div className="text-center text-sm text-slate-400">
                Admin accounts are provisioned by the system administrator.
            </div>
        </AuthLayout>
    );
}
