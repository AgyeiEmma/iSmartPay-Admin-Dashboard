import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  CreditCard, 
  AlertTriangle,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';

export function DashboardAnalytics() {
  const [timeRange, setTimeRange] = useState('7d');
  
  // Mock data
  const kpiData = [
    {
      title: 'Total Transaction Volume',
      value: '₵2,847,392',
      change: '+12.5%',
      trend: 'up' as const,
      icon: DollarSign
    },
    {
      title: 'Active Users',
      value: '24,891',
      change: '+8.2%',
      trend: 'up' as const,
      icon: Users
    },
    {
      title: 'Success Rate',
      value: '98.7%',
      change: '+0.3%',
      trend: 'up' as const,
      icon: CreditCard
    },
    {
      title: 'Pending KYC',
      value: '1,247',
      change: '-5.1%',
      trend: 'down' as const,
      icon: AlertTriangle
    }
  ];

  const transactionData = [
    { date: 'Mon', volume: 125000, count: 450, revenue: 2400 },
    { date: 'Tue', volume: 142000, count: 520, revenue: 2800 },
    { date: 'Wed', volume: 135000, count: 480, revenue: 2600 },
    { date: 'Thu', volume: 168000, count: 590, revenue: 3200 },
    { date: 'Fri', volume: 198000, count: 670, revenue: 3800 },
    { date: 'Sat', volume: 175000, count: 620, revenue: 3400 },
    { date: 'Sun', volume: 145000, count: 510, revenue: 2900 }
  ];

  const funnelData = [
    { stage: 'Registrations', count: 5420, percentage: 100 },
    { stage: 'KYC Started', count: 4890, percentage: 90 },
    { stage: 'KYC Completed', count: 4201, percentage: 78 },
    { stage: 'First Transaction', count: 3654, percentage: 67 },
    { stage: 'Active Users', count: 2847, percentage: 53 }
  ];

  const errorData = [
    { name: 'Network Timeout', value: 35, color: '#ef4444' },
    { name: 'Invalid Credentials', value: 25, color: '#f97316' },
    { name: 'Insufficient Funds', value: 20, color: '#eab308' },
    { name: 'Bank Declined', value: 15, color: '#3b82f6' },
    { name: 'Other', value: 5, color: '#6b7280' }
  ];

  const revenueData = [
    { month: 'Jan', fees: 45000, interchange: 12000, penalties: 3000 },
    { month: 'Feb', fees: 52000, interchange: 14000, penalties: 2800 },
    { month: 'Mar', fees: 48000, interchange: 13500, penalties: 3200 },
    { month: 'Apr', fees: 61000, interchange: 16000, penalties: 2900 },
    { month: 'May', fees: 68000, interchange: 18000, penalties: 3500 },
    { month: 'Jun', fees: 73000, interchange: 19500, penalties: 3100 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Analytics</h2>
          <p className="text-gray-600">Real-time and historical performance metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                    <div className="flex items-center space-x-1">
                      {kpi.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`text-sm font-medium ${
                        kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {kpi.change}
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <Tabs defaultValue="transactions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="transactions">Transaction Analytics</TabsTrigger>
          <TabsTrigger value="funnel">User Funnel</TabsTrigger>
          <TabsTrigger value="errors">Error Analysis</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Breakdown</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Transaction Volume</CardTitle>
                <CardDescription>Daily transaction volume and count</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={transactionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₵${value.toLocaleString()}`, 'Volume']} />
                    <Bar dataKey="volume" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transaction Count</CardTitle>
                <CardDescription>Number of transactions per day</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={transactionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="count" stroke="#10b981" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="funnel" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Onboarding Funnel</CardTitle>
              <CardDescription>Conversion rates through the onboarding process</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {funnelData.map((stage, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-32 text-sm font-medium text-gray-700">{stage.stage}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                      <div 
                        className="bg-blue-600 h-6 rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${stage.percentage}%` }}
                      >
                        <span className="text-white text-xs font-medium">{stage.percentage}%</span>
                      </div>
                    </div>
                    <div className="w-20 text-sm font-medium text-gray-900">{stage.count.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errors" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Error Distribution</CardTitle>
                <CardDescription>Breakdown of transaction failures</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={errorData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {errorData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Error Trends</CardTitle>
                <CardDescription>Error rates over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {errorData.map((error, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: error.color }}
                        />
                        <span className="text-sm font-medium">{error.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{error.value}%</span>
                        <Badge variant={error.value > 20 ? 'destructive' : 'secondary'}>
                          {error.value > 20 ? 'High' : 'Normal'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analytics</CardTitle>
              <CardDescription>Monthly revenue breakdown by source</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₵${value.toLocaleString()}`, '']} />
                  <Area type="monotone" dataKey="fees" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                  <Area type="monotone" dataKey="interchange" stackId="1" stroke="#10b981" fill="#10b981" />
                  <Area type="monotone" dataKey="penalties" stackId="1" stroke="#ef4444" fill="#ef4444" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Real-time Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Real-time System Alerts</CardTitle>
          <CardDescription>Anomaly detection and system notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-sm font-medium text-red-900">High failure rate detected</p>
                  <p className="text-xs text-red-600">Transaction success rate dropped to 94% in the last hour</p>
                </div>
              </div>
              <Badge variant="destructive">Critical</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-sm font-medium text-yellow-900">Unusual transaction volume</p>
                  <p className="text-xs text-yellow-600">15% increase in volume compared to yesterday</p>
                </div>
              </div>
              <Badge variant="secondary">Warning</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-blue-900">KYC processing improved</p>
                  <p className="text-xs text-blue-600">Average processing time reduced by 23%</p>
                </div>
              </div>
              <Badge>Info</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}