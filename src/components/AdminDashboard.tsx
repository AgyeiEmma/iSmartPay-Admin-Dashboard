import { Card } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, CreditCard, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const transactionData = [
  { name: 'Jan', collections: 120000, disbursements: 85000 },
  { name: 'Feb', collections: 150000, disbursements: 110000 },
  { name: 'Mar', collections: 180000, disbursements: 140000 },
  { name: 'Apr', collections: 165000, disbursements: 125000 },
  { name: 'May', collections: 210000, disbursements: 160000 },
  { name: 'Jun', collections: 245000, disbursements: 185000 },
];

const kycStatusData = [
  { name: 'Verified', value: 1250, color: '#22c55e' },
  { name: 'Pending', value: 320, color: '#f59e0b' },
  { name: 'Rejected', value: 85, color: '#ef4444' },
];

const recentTransactions = [
  { id: 'TXN001', user: 'Kwame Asante', amount: 2500, type: 'Collection', status: 'Completed', time: '2 mins ago' },
  { id: 'TXN002', user: 'Ama Boateng', amount: 1800, type: 'Disbursement', status: 'Processing', time: '5 mins ago' },
  { id: 'TXN003', user: 'Kofi Mensah', amount: 3200, type: 'Collection', status: 'Completed', time: '8 mins ago' },
  { id: 'TXN004', user: 'Akosua Darkwa', amount: 950, type: 'Disbursement', status: 'Failed', time: '12 mins ago' },
];

export function AdminDashboard() {
  const formatCurrency = (amount: number) => `₵${amount.toLocaleString()}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Welcome back, Admin. Here's your iSmartPay summary.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Last updated</p>
          <p className="text-sm font-medium">Just now</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">12,485</p>
              <p className="text-sm text-green-600 mt-1">+8.2% from last month</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Monthly Volume</p>
              <p className="text-2xl font-bold text-gray-900">₵2.45M</p>
              <p className="text-sm text-green-600 mt-1">+15.3% from last month</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">97.8%</p>
              <p className="text-sm text-green-600 mt-1">+0.5% from last month</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending KYC</p>
              <p className="text-2xl font-bold text-gray-900">320</p>
              <p className="text-sm text-orange-600 mt-1">Requires attention</p>
            </div>
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Volume</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={transactionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `₵${(value / 1000).toFixed(0)}K`} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Bar dataKey="collections" fill="#3b82f6" name="Collections" />
              <Bar dataKey="disbursements" fill="#06b6d4" name="Disbursements" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">KYC Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={kycStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {kycStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value, 'Users']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-6 mt-4">
            {kycStatusData.map((entry) => (
              <div key={entry.name} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                <span className="text-sm text-gray-600">{entry.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Transaction ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">User</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{transaction.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{transaction.user}</td>
                  <td className="py-3 px-4 text-sm font-medium">{formatCurrency(transaction.amount)}</td>
                  <td className="py-3 px-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      transaction.type === 'Collection' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      transaction.status === 'Completed' 
                        ? 'bg-green-100 text-green-700' 
                        : transaction.status === 'Processing'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">{transaction.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}