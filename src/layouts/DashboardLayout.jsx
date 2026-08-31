import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

function DashboardLayout({ children }) {
  return (
    <div className="app-theme min-h-screen flex">

      <Sidebar />

      <div className="flex-1 ml-64">

        <Topbar />

        <main className="p-8 page-animation">
          {children}
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;