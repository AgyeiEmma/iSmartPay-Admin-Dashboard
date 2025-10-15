import {
  BarChart3,
  Users,
  Shield,
  CreditCard,
  Calculator,
  Activity,
  UserCog,
  X,
} from "lucide-react";
import logo from "../assets/6a9a1923a3866d6050391544b559c9d12ee5b150.png";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "users", label: "User Management", icon: Users },
  { id: "kyc", label: "KYC Verification", icon: Shield },
  { id: "settlements", label: "Settlements", icon: CreditCard },
  { id: "reconciliation", label: "Reconciliation", icon: Calculator },
  { id: "transactions", label: "Transactions", icon: Activity },
  { id: "roles", label: "Role Management", icon: UserCog },
];

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function Sidebar({
  activeTab,
  setActiveTab,
  isOpen,
  setIsOpen,
}: SidebarProps) {
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Close sidebar on mobile after selecting an item
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  const handleLogoClick = () => {
    setActiveTab("dashboard");
    // Toggle sidebar on mobile when clicking logo
    if (window.innerWidth < 1024) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen
          w-64 bg-white shadow-lg border-r border-gray-200
          overflow-y-auto z-50
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <button
              onClick={handleLogoClick}
              className="flex items-center focus:outline-none"
            >
              <img
                src={logo}
                alt="iSmartPay"
                className="h-8 w-auto object-contain"
              />
            </button>

            {/* Close button for mobile */}
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">Admin Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="py-4">
          <ul className="space-y-1 px-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleTabChange(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
                      activeTab === item.id
                        ? "bg-blue-100 text-blue-700 border border-blue-200"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
