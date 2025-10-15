import { Card } from './ui/card';
import { TrendingUp, TrendingDown, Users, CreditCard, Activity, AlertTriangle } from 'lucide-react';
import { formatCurrency } from '../utils/currency';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const kpiData = [
  { label: 'Total Volume (Today)', value: formatCurrency(1245780.50), change: '+12.5%', trend: 'up', icon: TrendingUp },
  { label: 'Active Users', value: '18,542', change: '+8.3%', trend: 'up', icon: Users },
  { label: 'Transactions (Today)', value: '3,247', change: '+15.2%', trend: 'up', icon: Activity },
  { label: 'Pending Settlements', value: formatCurrency(241550.75), change: '-5.1%', trend: 'down', icon: CreditCard },
  { label: 'Open Alerts', value: '23', change: '+3', trend: 'up', icon: AlertTriangle },
  { label: 'Success Rate', value: '98.8%', change: '+0.5%', trend: 'up', icon: TrendingUp },
];

const volumeData = [
  { date: 'Mon', volume: 850000 },
  { date: 'Tue', volume: 920000 },
  { date: 'Wed', volume: 1100000 },
  { date: 'Thu', volume: 980000 },
  { date: 'Fri', volume: 1245780 },
  { date: 'Sat', volume: 760000 },
  { date: 'Sun', volume: 680000 },
];

const channelData = [
  { name: 'Mobile Money', value: 45, color: '#3b82f6' },
  { name: 'Bank Transfer', value: 30, color: '#1e40af' },
  { name: 'Card', value: 20, color: '#60a5fa' },
  { name: 'USSD', value: 5, color: '#93c5fd' },
];

const transactionTrend = [
  { hour: '00:00', count: 45 },
  { hour: '04:00', count: 23 },
  { hour: '08:00', count: 156 },
  { hour: '12:00', count: 289 },
  { hour: '16:00', count: 234 },
  { hour: '20:00', count: 178 },
];

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">Dashboard Analytics</h2>
        <p className="text-sm text-gray-500 mt-1">Real-time overview of system performance and key metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600">{kpi.label}</p>
                  <p className="text-2xl text-gray-900 mt-1">{kpi.value}</p>
                  <div className="flex items-center mt-2">
                    <span className={`text-sm ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.change}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">vs yesterday</span>
                  </div>
                </div>
                <div className={`p-2 rounded-lg ${kpi.trend === 'up' ? 'bg-green-100' : 'bg-red-100'}`}>
                  <Icon className={`w-5 h-5 ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Volume Chart */}
        <Card className="p-6">
          <h3 className="text-gray-900 mb-4">Transaction Volume (7 Days)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={volumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}
              />
              <Bar dataKey="volume" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Channel Distribution */}
        <Card className="p-6">
          <h3 className="text-gray-900 mb-4">Channel Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={channelData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {channelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Transaction Trend */}
        <Card className="p-6 lg:col-span-2">
          <h3 className="text-gray-900 mb-4">Transaction Trend (Today)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={transactionTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="hour" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }} />
              <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-gray-900 mb-4">Recent System Events</h3>
        <div className="space-y-3">
          {[
            { time: '10:32', event: 'Settlement batch STL-2025-001 created', type: 'info' },
            { time: '10:15', event: 'High-risk transaction flagged: TXN-20251009-004', type: 'warning' },
            { time: '09:45', event: 'KYC verification approved for Kofi Asante', type: 'success' },
            { time: '09:20', event: 'Integration: Interswitch showing degraded performance', type: 'error' },
            { time: '08:50', event: 'Daily reconciliation completed: 234 matched, 2 unmatched', type: 'info' },
          ].map((item, index) => (
            <div key={index} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0">
              <span className="text-sm text-gray-500 w-12">{item.time}</span>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{item.event}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${
                item.type === 'success' ? 'bg-green-100 text-green-700' :
                item.type === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                item.type === 'error' ? 'bg-red-100 text-red-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {item.type}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
