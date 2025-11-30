export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white antialiased transition-colors duration-500">
      {children}
    </div>
  );
}
