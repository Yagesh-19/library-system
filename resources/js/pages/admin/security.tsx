import LibraryLayout from '@/layouts/library-layout';

const controls = [
    {
        title: 'Role & Access Control',
        description: 'Review permissions, adjust role assignments, and audit access levels.',
    },
    {
        title: 'Authentication Policies',
        description: 'Manage MFA requirements, password policies, and session timeouts.',
    },
    {
        title: 'Security Logs',
        description: 'Monitor login activity, failed attempts, and API usage.',
    },
];

const sessions = [
    { label: 'Active sessions', value: '58' },
    { label: 'Suspicious logins', value: '2' },
    { label: 'MFA enrollment rate', value: '72%' },
];

export default function AdminSecurity() {
    return (
        <LibraryLayout title="Security" role="admin" active="security">
            <section className="flex flex-col gap-2">
                <h1 className="text-4xl font-semibold text-white">Security</h1>
                <p className="text-sm text-slate-400">Manage authentication and access control policies.</p>
            </section>

            <section className="grid gap-6 lg:grid-cols-3">
                {controls.map((control) => (
                    <div
                        key={control.title}
                        className="rounded-3xl border border-[#1f2a3d] bg-[#141c2a]/80 p-6"
                    >
                        <h2 className="text-lg font-semibold text-white">{control.title}</h2>
                        <p className="mt-2 text-sm text-slate-400">{control.description}</p>
                        <button className="mt-6 rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-200">
                            Review Settings
                        </button>
                    </div>
                ))}
            </section>

            <section className="rounded-3xl border border-[#1f2a3d] bg-[#141c2a]/80 p-6">
                <h2 className="text-lg font-semibold text-white">Security Snapshot</h2>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                    {sessions.map((item) => (
                        <div
                            key={item.label}
                            className="rounded-2xl border border-[#1f2a3d] bg-[#1a2436]/80 p-4"
                        >
                            <p className="text-sm text-slate-400">{item.label}</p>
                            <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
                        </div>
                    ))}
                </div>
            </section>
        </LibraryLayout>
    );
}
