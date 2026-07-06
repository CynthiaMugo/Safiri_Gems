import Sidebar from "./Sidebar";

function AdminLayout({ children }) {
  return (
    <div className="flex bg-[#f8f5f2] min-h-screen">
      <Sidebar />

      <main className="flex-1 bg-[#f8f5f2] p-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
            {children}
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;