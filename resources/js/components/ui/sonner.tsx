import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
    return (
        <Sonner
            theme="dark"
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast:
                        'group toast bg-[#141c2a] text-slate-100 border border-[#1f2a3d] shadow-[0_12px_30px_rgba(2,6,23,0.35)]',
                    description: 'text-slate-400',
                    actionButton: 'bg-emerald-400 text-emerald-950',
                    cancelButton: 'bg-[#1a2436] text-slate-200',
                },
            }}
            {...props}
        />
    );
};

export { Toaster };
