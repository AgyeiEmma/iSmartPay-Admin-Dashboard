import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { AdminDashboard } from "./components/AdminDashboard";
import { UserManagement } from "./components/UserManagement";
import { KYCVerification } from "./components/KYCVerification";
import { SettlementProcedures } from "./components/SettlementProcedures";
import { ManualReconciliation } from "./components/ManualReconciliation";
import { TransactionMonitoring } from "./components/TransactionMonitoring";
import { RoleManagement } from "./components/RoleManagement";
import { ReportsPage } from "./components/ReportsPage";
import { FeeManagement } from "./components/FeeManagement";
import AdminManagement from "./components/AdminManagement";

import { Sidebar } from "./components/Sidebar";
import { LoginPage } from "./components/LoginPage";
import AdminRegister from "./components/RegisterAdmin";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check if user has a valid token in localStorage
    const token = localStorage.getItem("authToken");
    console.log("Initial auth check - Token exists:", !!token);
    return !!token;
  });
  const [activeTab, setActiveTab] = useState(() => {
    // Load the last active tab from localStorage, default to "dashboard"
    return localStorage.getItem("activeTab") || "dashboard";
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Debug: Log when login state changes
  useEffect(() => {
    console.log("Login state changed:", isLoggedIn);
  }, [isLoggedIn]);

  // Save active tab to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab("dashboard");
    setSidebarOpen(false);
    localStorage.removeItem("activeTab");
    localStorage.removeItem("authToken");
  };

  // Show login page if not logged in
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminDashboard />;
      case "users":
        return <UserManagement />;
      case "admins":
        return <AdminManagement />;
      case "kyc":
        return <KYCVerification />;
      case "settlements":
        return <SettlementProcedures />;
      case "reconciliation":
        return <ManualReconciliation />;
      case "transactions":
        return <TransactionMonitoring />;
      case "fees":
        return <FeeManagement />;
      case "reports":
        return <ReportsPage />;
      case "roles":
        return <RoleManagement />;
      case "register":
        return <AdminRegister />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-gray-900">iSmartPay Admin</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
