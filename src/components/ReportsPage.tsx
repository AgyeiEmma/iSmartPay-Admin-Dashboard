import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  FileText, 
  Calendar, 
  Download, 
  Mail, 
  Filter, 
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Shield,
  Users,
  Play,
  Settings,
  Eye,
  Edit,
  Trash2,
  Search
} from 'lucide-react';
import { formatCurrency } from '../utils/currency';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for KPI scorecards
const kpiScorecard = [
  { metric: 'Transaction Success Rate', current: 98.8, target: 98.0, trend: 'up', unit: '%' },
  { metric: 'Average Settlement Time', current: 2.3, target: 3.0, trend: 'up', unit: 'hrs' },
  { metric: 'KYC Completion Rate', current: 94.2, target: 95.0, trend: 'down', unit: '%' },
  { metric: 'Monthly Active Users', current: 18542, target: 18000, trend: 'up', unit: '' },
  { metric: 'Dispute Resolution Time', current: 4.2, target: 5.0, trend: 'up', unit: 'days' },
  { metric: 'Fraud Detection Rate', current: 99.1, target: 99.0, trend: 'up', unit: '%' },
];

// Mock data for scheduled reports
const scheduledReports = [
  {
    id: 'SR001',
    name: 'Daily Settlement Summary',
    type: 'Settlement',
    schedule: 'Daily at 6:00 AM',
    recipients: ['treasury@ismartpay.com', 'finance@ismartpay.com'],
    lastRun: '2025-10-16 06:00',
    status: 'Active',
    nextRun: '2025-10-17 06:00',
  },
  {
    id: 'SR002',
    name: 'Weekly Compliance Report',
    type: 'Compliance',
    schedule: 'Weekly - Monday 8:00 AM',
    recipients: ['compliance@ismartpay.com'],
    lastRun: '2025-10-14 08:00',
    status: 'Active',
    nextRun: '2025-10-21 08:00',
  },
  {
    id: 'SR003',
    name: 'Monthly P&L Summary',
    type: 'Financial',
    schedule: 'Monthly - 1st at 9:00 AM',
    recipients: ['finance@ismartpay.com', 'cfo@ismartpay.com'],
    lastRun: '2025-10-01 09:00',
    status: 'Active',
    nextRun: '2025-11-01 09:00',
  },
  {
    id: 'SR004',
    name: 'Regulatory Transaction Report (CTR)',
    type: 'Regulatory',
    schedule: 'Daily at 11:00 PM',
    recipients: ['compliance@ismartpay.com'],
    lastRun: '2025-10-15 23:00',
    status: 'Active',
    nextRun: '2025-10-16 23:00',
  },
];

// Mock data for recent reports
const recentReports = [
  {
    id: 'RPT001',
    name: 'Settlement Summary - October 16, 2025',
    type: 'Settlement',
    generated: '2025-10-16 06:05',
    size: '2.4 MB',
    format: 'PDF',
    status: 'Completed',
  },
  {
    id: 'RPT002',
    name: 'KYC Compliance Report - Week 41',
    type: 'Compliance',
    generated: '2025-10-14 08:12',
    size: '1.8 MB',
    format: 'Excel',
    status: 'Completed',
  },
  {
    id: 'RPT003',
    name: 'Chargeback Analysis - September 2025',
    type: 'Disputes',
    generated: '2025-10-15 14:30',
    size: '3.1 MB',
    format: 'PDF',
    status: 'Completed',
  },
  {
    id: 'RPT004',
    name: 'Suspicious Activity Report - October 15',
    type: 'Regulatory',
    generated: '2025-10-15 23:15',
    size: '892 KB',
    format: 'CSV',
    status: 'Completed',
  },
  {
    id: 'RPT005',
    name: 'Audit Trail Extract - Q4 2025',
    type: 'Audit',
    generated: '2025-10-15 16:45',
    size: '5.2 MB',
    format: 'Excel',
    status: 'Completed',
  },
];

// Report templates
const reportTemplates = [
  {
    id: 'TPL001',
    name: 'Daily Settlement Summary',
    description: 'Daily settlement totals by channel with outstanding balances',
    icon: DollarSign,
    color: 'blue',
    category: 'Settlement',
  },
  {
    id: 'TPL002',
    name: 'KYC Compliance Report',
    description: 'KYC status distribution, pass/fail rates, and remediation tracking',
    icon: Shield,
    color: 'green',
    category: 'Compliance',
  },
  {
    id: 'TPL003',
    name: 'Monthly P&L Report',
    description: 'Revenue, fees, and costs breakdown by product line',
    icon: TrendingUp,
    color: 'purple',
    category: 'Financial',
  },
  {
    id: 'TPL004',
    name: 'Regulatory Transaction Report',
    description: 'CTR/STR reports in regulator-prescribed format',
    icon: FileText,
    color: 'red',
    category: 'Regulatory',
  },
  {
    id: 'TPL005',
    name: 'Chargeback & Disputes',
    description: 'Dispute lifecycle, resolution times, and cost analysis',
    icon: AlertCircle,
    color: 'orange',
    category: 'Disputes',
  },
  {
    id: 'TPL006',
    name: 'User Activity Report',
    description: 'User engagement, transaction patterns, and cohort analysis',
    icon: Users,
    color: 'indigo',
    category: 'Analytics',
  },
];

// Chart data for P&L
const plData = [
  { month: 'May', revenue: 245000, costs: 92000, fees: 38000 },
  { month: 'Jun', revenue: 282000, costs: 98000, fees: 42000 },
  { month: 'Jul', revenue: 298000, costs: 105000, fees: 45000 },
  { month: 'Aug', revenue: 315000, costs: 110000, fees: 48000 },
  { month: 'Sep', revenue: 332000, costs: 115000, fees: 51000 },
  { month: 'Oct', revenue: 356000, costs: 120000, fees: 54000 },
];

export function ReportsPage() {
  const [activeTab, setActiveTab] = useState('templates');
  const [searchQuery, setSearchQuery] = useState('');
  const [showReportBuilder, setShowReportBuilder] = useState(false);

  const renderKPIScorecard = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-gray-900">Executive KPI Scorecard</h3>
          <p className="text-sm text-gray-500 mt-1">Key performance indicators with targets and trends</p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpiScorecard.map((kpi, index) => {
          const meetsTarget = kpi.trend === 'up' 
            ? kpi.current >= kpi.target 
            : kpi.current <= kpi.target;

          return (
            <Card key={index} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600">{kpi.metric}</p>
                  <div className="flex items-baseline mt-2 space-x-2">
                    <span className="text-2xl text-gray-900">
                      {kpi.current.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500">{kpi.unit}</span>
                  </div>
                  <div className="flex items-center mt-2 space-x-2">
                    <span className="text-xs text-gray-500">
                      Target: {kpi.target.toLocaleString()}{kpi.unit}
                    </span>
                    {meetsTarget ? (
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    ) : (
                      <AlertCircle className="w-3 h-3 text-orange-600" />
                    )}
                  </div>
                </div>
                <div className={`p-2 rounded-lg ${
                  kpi.trend === 'up' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <TrendingUp className={`w-4 h-4 ${
                    kpi.trend === 'up' ? 'text-green-600' : 'text-red-600 rotate-180'
                  }`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Trend Chart */}
      <Card className="p-6 mt-6">
        <h4 className="text-gray-900 mb-4">Monthly P&L Trend</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={plData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `₵${(value / 1000).toFixed(0)}K`} />
            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
            <Line type="monotone" dataKey="revenue" stroke="#3b82f6" name="Revenue" strokeWidth={2} />
            <Line type="monotone" dataKey="costs" stroke="#ef4444" name="Costs" strokeWidth={2} />
            <Line type="monotone" dataKey="fees" stroke="#10b981" name="Fees" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );

  const renderReportTemplates = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-gray-900">Report Templates</h3>
          <p className="text-sm text-gray-500 mt-1">Quick access to pre-configured report types</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportTemplates.map((template) => {
          const Icon = template.icon;
          return (
            <Card key={template.id} className="p-5 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg bg-${template.color}-100`}>
                  <Icon className={`w-6 h-6 text-${template.color}-600`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-gray-900">{template.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {template.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                  <div className="flex space-x-2 mt-4">
                    <Button size="sm" className="flex-1">
                      <Play className="w-3 h-3 mr-1" />
                      Generate
                    </Button>
                    <Button size="sm" variant="outline">
                      <Settings className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderScheduledReports = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-gray-900">Scheduled Reports</h3>
          <p className="text-sm text-gray-500 mt-1">Automated report generation and distribution</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Schedule
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Report Name</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Type</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Schedule</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Recipients</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Last Run</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Next Run</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {scheduledReports.map((report) => (
                <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{report.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="outline" className="text-xs">{report.type}</Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Clock className="w-3 h-3" />
                      <span>{report.schedule}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Mail className="w-3 h-3" />
                      <span>{report.recipients.length} recipients</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{report.lastRun}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{report.nextRun}</td>
                  <td className="py-3 px-4">
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      {report.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderRecentReports = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-gray-900">Recent Reports</h3>
          <p className="text-sm text-gray-500 mt-1">Generated reports available for download</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-64"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Report Name</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Type</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Generated</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Size</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Format</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentReports.map((report) => (
                <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-900">{report.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="outline" className="text-xs">{report.type}</Badge>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{report.generated}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{report.size}</td>
                  <td className="py-3 px-4">
                    <Badge className="bg-gray-100 text-gray-700 border-gray-200 text-xs">
                      {report.format}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {report.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Mail className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderCustomReportBuilder = () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-gray-900">Custom Report Builder</h3>
        <p className="text-sm text-gray-500 mt-1">Build ad-hoc reports with custom filters and aggregations</p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Report Name</Label>
              <Input placeholder="Enter report name..." />
            </div>
            <div className="space-y-2">
              <Label>Data Source</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select data source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="transactions">Transactions</SelectItem>
                  <SelectItem value="users">Users</SelectItem>
                  <SelectItem value="settlements">Settlements</SelectItem>
                  <SelectItem value="kyc">KYC Records</SelectItem>
                  <SelectItem value="disputes">Disputes</SelectItem>
                  <SelectItem value="audit">Audit Logs</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Date Range</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="last7">Last 7 Days</SelectItem>
                  <SelectItem value="last30">Last 30 Days</SelectItem>
                  <SelectItem value="thisMonth">This Month</SelectItem>
                  <SelectItem value="lastMonth">Last Month</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Group By</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select grouping" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="channel">Channel</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="product">Product Line</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Metrics to Include</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Checkbox id="metric1" />
                <label htmlFor="metric1" className="text-sm text-gray-700">Total Volume</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="metric2" />
                <label htmlFor="metric2" className="text-sm text-gray-700">Transaction Count</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="metric3" />
                <label htmlFor="metric3" className="text-sm text-gray-700">Success Rate</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="metric4" />
                <label htmlFor="metric4" className="text-sm text-gray-700">Average Value</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="metric5" />
                <label htmlFor="metric5" className="text-sm text-gray-700">Fees Collected</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="metric6" />
                <label htmlFor="metric6" className="text-sm text-gray-700">User Count</label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Advanced Filters</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Channel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Channels</SelectItem>
                  <SelectItem value="mobile">Mobile Money</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="card">Card</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Min Amount (₵)" type="number" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Output Format</Label>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="pdf" />
                <label htmlFor="pdf" className="text-sm text-gray-700">PDF</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="excel" />
                <label htmlFor="excel" className="text-sm text-gray-700">Excel</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="csv" />
                <label htmlFor="csv" className="text-sm text-gray-700">CSV</label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Data Retention & Privacy</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select retention policy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30days">30 Days (Standard)</SelectItem>
                <SelectItem value="90days">90 Days (Extended)</SelectItem>
                <SelectItem value="1year">1 Year (Archive)</SelectItem>
                <SelectItem value="redacted">Generate with PII Redaction</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">Reports with PII will be redacted according to privacy compliance rules</p>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <Checkbox id="schedule" />
              <label htmlFor="schedule" className="text-sm text-gray-700">Save as scheduled report</label>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button>
                <Play className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Reports & Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">Generate, schedule, and manage system reports with automated distribution</p>
        </div>
        <Button onClick={() => setShowReportBuilder(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Custom Report
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="kpi">KPI Scorecard</TabsTrigger>
          <TabsTrigger value="builder">Builder</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="mt-6">
          {renderReportTemplates()}
        </TabsContent>

        <TabsContent value="scheduled" className="mt-6">
          {renderScheduledReports()}
        </TabsContent>

        <TabsContent value="recent" className="mt-6">
          {renderRecentReports()}
        </TabsContent>

        <TabsContent value="kpi" className="mt-6">
          {renderKPIScorecard()}
        </TabsContent>

        <TabsContent value="builder" className="mt-6">
          {renderCustomReportBuilder()}
        </TabsContent>
      </Tabs>
    </div>
  );
}
