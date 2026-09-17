import AdminSidebar from '@/components/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-theme(spacing.16))] bg-white w-full">
      {/* The Sidebar stays persistent here */}
      <AdminSidebar />
      
      {/* The individual page content (like emails, users, etc.) renders inside children */}
      <main className="flex-1 overflow-y-auto bg-white">
        {children}
      </main>
    </div>
  );
}