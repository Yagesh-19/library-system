import { useState } from 'react';

type CookieBannerProps = {
    role: 'librarian' | 'admin' | 'student';
};

const CONSENT_COOKIE = 'library_cookie_consent';
const ONE_YEAR = 60 * 60 * 24 * 365;

function getCookie(name: string): string | null {
    if (typeof document === 'undefined') {
        return null;
    }

    const escapedName = name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    const match = document.cookie.match(new RegExp(`(?:^|; )${escapedName}=([^;]*)`));

    return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, maxAge: number): void {
    if (typeof document === 'undefined') {
        return;
    }

    document.cookie = `${name}=${encodeURIComponent(value)};path=/;max-age=${maxAge};SameSite=Lax`;
}

export default function CookieBanner({ role }: CookieBannerProps) {
    const [dismissed, setDismissed] = useState(false);
    const canShowForRole = role === 'student' || role === 'librarian';
    const hasAccepted = getCookie(CONSENT_COOKIE) === 'accepted';
    const visible = canShowForRole && !hasAccepted && !dismissed;

    if (!visible) {
        return null;
    }

    return (
        <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-2xl border border-[#1f2a3d] bg-[#0f172a]/95 p-4 shadow-[0_20px_50px_rgba(2,6,23,0.65)] backdrop-blur">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <p className="text-sm text-slate-200">
                    We use cookies to keep your session secure and improve your library experience.
                </p>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => {
                            setCookie(CONSENT_COOKIE, 'accepted', ONE_YEAR);
                            setDismissed(true);
                        }}
                        className="rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold text-emerald-950"
                    >
                        Accept
                    </button>
                    <button
                        type="button"
                        onClick={() => setDismissed(true)}
                        className="rounded-full border border-[#2a374f] px-4 py-2 text-xs font-semibold text-slate-300"
                    >
                        Dismiss
                    </button>
                </div>
            </div>
        </div>
    );
}
