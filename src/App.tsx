import { useState } from 'react';
import { Menu } from 'lucide-react';
import { AdminDashboard } from './components/AdminDashboard';
import { UserManagement } from './components/UserManagement';
import { KYCVerification } from './components/KYCVerification';
import { SettlementProcedures } from './components/SettlementProcedures';
import { ManualReconciliation } from './components/ManualReconciliation';
import { TransactionMonitoring } from './components/TransactionMonitoring';
import { RoleManagement } from './components/RoleManagement';
import { Sidebar } from './components/Sidebar';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'users':
        return <UserManagement />;
      case 'kyc':
        return <KYCVerification />;
      case 'settlements':
        return <SettlementProcedures />;
      case 'reconciliation':
        return <ManualReconciliation />;
      case 'transactions':
        return <TransactionMonitoring />;
      case 'roles':
        return <RoleManagement />;
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
