import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Checkbox } from './ui/checkbox';
import { 
  FileText, 
  Download, 
  Calendar, 
  Clock,
  Mail,
  Filter,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  DollarSign,
  Users,
  Shield,
  Activity,
  BarChart3,
  PieChart,
  Settings,
  Play,
  Pause,
  Eye,
  EyeOff,
  Trash2,
  Plus,
  FileDown
} from 'lucide-react';
import { formatCurrency } from '../utils/currency';

// Mock data for reports
const mockScheduledReports = [
  {
    id: 1,
    name: 'Daily Settlement Summary',
    description: 'Settlement totals and merchant breakdown',
    type: 'settlement',
    schedule: 'Daily at 08:00 GMT',
    nextRun: '2025-10-16T08:00:00',
    lastRun: '2025-10-15T08:00:00',
    status: 'active',
    recipients: ['treasury@ismartpay.com', 'finance@ismartpay.com'],
    format: 'PDF + Excel',
    retentionDays: 365
  },
  {
    id: 2,
    name: 'Compliance Report - KYC',
    description: 'KYC pass/fail, remediation, suspicious activity',
    type: 'compliance',
    schedule: 'Weekly on Monday at 09:00 GMT',
    nextRun: '2025-10-21T09:00:00',
    lastRun: '2025-10-14T09:00:00',
    status: 'active',
    recipients: ['compliance@ismartpay.com', 'risk@ismartpay.com'],
    format: 'PDF',
    retentionDays: 2555
  },
  {
    id: 3,
    name: 'Monthly P&L Report',
    description: 'P&L and fees breakdown by product line',
    type: 'financial',
    schedule: '1st of every month at 10:00 GMT',
    nextRun: '2025-11-01T10:00:00',
    lastRun: '2025-10-01T10:00:00',
    status: 'active',
    recipients: ['finance@ismartpay.com', 'cfo@ismartpay.com'],
    format: 'Excel',
    retentionDays: 2555
  },
  {
    id: 4,
    name: 'Regulatory CTR/STR Report',
    description: 'Currency Transaction & Suspicious Transaction Reports',
    type: 'regulatory',
    schedule: 'Daily at 18:00 GMT',
    nextRun: '2025-10-15T18:00:00',
    lastRun: '2025-10-14T18:00:00',
    status: 'active',
    recipients: ['compliance@ismartpay.com', 'legal@ismartpay.com'],
    format: 'Regulator Format (XML)',
    retentionDays: 2555
  }
];

const mockGeneratedReports = [
  {
    id: 'RPT-2025-1001',
    name: 'Daily Settlement Summary',
    type: 'settlement',
    generatedAt: '2025-10-15T08:00:00',
    generatedBy: 'System (Scheduled)',
    period: '2025-10-14',
    format: 'PDF',
    size: '2.4 MB',
    status: 'completed',
    recipients: 2,
    downloads: 5
  },
  {
    id: 'RPT-2025-1002',
    name: 'Compliance KYC Report',
    type: 'compliance',
    generatedAt: '2025-10-14T09:00:00',
    generatedBy: 'System (Scheduled)',
    period: '2025-10-07 to 2025-10-13',
    format: 'PDF',
    size: '1.8 MB',
    status: 'completed',
    recipients: 2,
    downloads: 3
  },
  {
    id: 'RPT-2025-1003',
    name: 'Ad-hoc Transaction Analysis',
    type: 'custom',
    generatedAt: '2025-10-15T14:30:00',
    generatedBy: 'admin@ismartpay.com',
    period: '2025-10-01 to 2025-10-15',
    format: 'Excel',
    size: '5.2 MB',
    status: 'completed',
    recipients: 1,
    downloads: 8
  },
  {
    id: 'RPT-2025-1004',
    name: 'Chargeback & Disputes Analysis',
    type: 'disputes',
    generatedAt: '2025-10-15T11:00:00',
    generatedBy: 'finance@ismartpay.com',
    period: '2025-09-01 to 2025-09-30',
    format: 'PDF + Excel',
    size: '3.6 MB',
    status: 'completed',
    recipients: 3,
    downloads: 12
  }
];

const mockKPIScorecard = {
  period: 'October 2025',
  kpis: [
    {
      name: 'Transaction Success Rate',
      value: 98.7,
      target: 98.0,
      unit: '%',
      trend: 'up',
      change: '+0.5%',
      status: 'achieved'
    },
    {
      name: 'Average Settlement Time',
      value: 18,
      target: 24,
      unit: 'hours',
      trend: 'down',
      change: '-3 hrs',
      status: 'achieved'
    },
    {
      name: 'KYC Approval Rate',
      value: 94.2,
      target: 95.0,
      unit: '%',
      trend: 'up',
      change: '+2.1%',
      status: 'near'
    },
    {
      name: 'Fraud Detection Rate',
      value: 99.1,
      target: 99.5,
      unit: '%',
      trend: 'down',
      change: '-0.3%',
      status: 'near'
    },
    {
      name: 'Customer Onboarding (Monthly)',
      value: 1247,
      target: 1500,
      unit: 'users',
      trend: 'up',
      change: '+156',
      status: 'below'
    },
    {
      name: 'Dispute Resolution Time',
      value: 4.2,
      target: 5.0,
      unit: 'days',
      trend: 'down',
      change: '-0.8 days',
      status: 'achieved'
    }
  ]
};

const mockComplianceData = {
  kycStats: {
    totalVerifications: 1847,
    passed: 1654,
    failed: 103,
    pending: 90,
    remediationRequired: 67,
    averageProcessingTime: '2.3 days'
  },
  suspiciousActivity: {
    totalFlags: 45,
    investigated: 38,
    escalated: 7,
    falsePositives: 31,
    confirmed: 7
  },
  documentExpiry: {
    expiredThisMonth: 23,
    expiringNext30Days: 89,
    expiringNext90Days: 234
  }
};

const mockPnLData = {
  period: 'September 2025',
  productLines: [
    {
      name: 'Mobile Money Collections',
      revenue: 245670.50,
      fees: 12283.53,
      cost: 8967.45,
      netProfit: 228419.52,
      volume: 8934,
      margin: 93.0
    },
    {
      name: 'Bank Transfer Disbursements',
      revenue: 189450.00,
      fees: 9472.50,
      cost: 6823.40,
      netProfit: 173154.10,
      volume: 5623,
      margin: 91.4
    },
    {
      name: 'Card Payments',
      revenue: 156780.25,
      fees: 15678.03,
      cost: 21949.23,
      netProfit: 119152.99,
      volume: 3456,
      margin: 76.0
    },
    {
      name: 'Cross-border Transfers',
      revenue: 98450.00,
      fees: 7876.00,
      cost: 4922.50,
      netProfit: 85651.50,
      volume: 234,
      margin: 87.0
    }
  ],
  totals: {
    revenue: 690350.75,
    fees: 45310.06,
    cost: 42662.58,
    netProfit: 606378.11,
    volume: 18247,
    margin: 87.8
  }
};

const mockDisputesData = {
  period: 'Q3 2025',
  summary: {
    totalDisputes: 156,
    resolved: 134,
    pending: 22,
    wonByMerchant: 89,
    wonByCustomer: 45,
    averageResolutionDays: 4.2,
    totalCost: 23450.75
  },
  lifecycle: [
    { stage: 'Initiated', count: 156, avgDays: 0 },
    { stage: 'Under Investigation', count: 134, avgDays: 2.1 },
    { stage: 'Awaiting Evidence', count: 89, avgDays: 1.5 },
    { stage: 'Final Review', count: 134, avgDays: 0.6 },
    { stage: 'Resolved', count: 134, avgDays: 4.2 }
  ],
  costBreakdown: {
    chargebackFees: 15600.00,
    operationalCost: 5340.25,
    reversedTransactions: 2510.50
  }
};

export function Reports() {
  const [activeTab, setActiveTab] = useState('scheduled');
  const [showReportBuilder, setShowReportBuilder] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      active: 'bg-green-100 text-green-700 border-green-200',
      paused: 'bg-orange-100 text-orange-700 border-orange-200',
      completed: 'bg-blue-100 text-blue-700 border-blue-200',
      failed: 'bg-red-100 text-red-700 border-red-200'
    };
    return <Badge className={variants[status] || ''}>{status}</Badge>;
  };

  const getKPIStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      achieved: 'bg-green-100 text-green-700 border-green-200',
      near: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      below: 'bg-orange-100 text-orange-700 border-orange-200',
      critical: 'bg-red-100 text-red-700 border-red-200'
    };
    return <Badge className={variants[status] || ''}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Scheduled reports, compliance data, and KPI tracking</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowScheduleDialog(true)}>
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Report
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowReportBuilder(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Custom Report
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="generated">Generated Reports</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="disputes">Disputes</TabsTrigger>
          <TabsTrigger value="kpi">KPI Scorecard</TabsTrigger>
          <TabsTrigger value="audit">Audit Extracts</TabsTrigger>
        </TabsList>

        {/* Scheduled Reports */}
        <TabsContent value="scheduled" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Automated Report Schedules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockScheduledReports.map((report) => (
                  <div key={report.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-gray-900">{report.name}</h4>
                          {getStatusBadge(report.status)}
                          <Badge variant="outline" className="text-xs">{report.type}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div>
                            <p className="text-gray-500">Schedule</p>
                            <p className="text-gray-900">{report.schedule}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Next Run</p>
                            <p className="text-gray-900">{new Date(report.nextRun).toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Format</p>
                            <p className="text-gray-900">{report.format}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Retention</p>
                            <p className="text-gray-900">{report.retentionDays} days</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-3 text-sm">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">Recipients: {report.recipients.join(', ')}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Play className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Pause className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Generated Reports */}
        <TabsContent value="generated" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Report Archive</CardTitle>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px] bg-input-background border-gray-200">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="settlement">Settlement</SelectItem>
                      <SelectItem value="compliance">Compliance</SelectItem>
                      <SelectItem value="financial">Financial</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockGeneratedReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm text-gray-900">{report.name}</p>
                          <Badge variant="outline" className="text-xs">{report.type}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-600">
                          <span>{report.period}</span>
                          <span>•</span>
                          <span>{new Date(report.generatedAt).toLocaleString()}</span>
                          <span>•</span>
                          <span>{report.format}</span>
                          <span>•</span>
                          <span>{report.size}</span>
                          <span>•</span>
                          <span>{report.downloads} downloads</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Generated by {report.generatedBy}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(report.status)}
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Data Retention Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Data Retention & Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="text-gray-900 mb-1">Automatic Data Retention</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Reports are automatically deleted based on retention policies to comply with privacy regulations.
                      </p>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Standard Reports</p>
                          <p className="text-gray-900">365 days</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Compliance Reports</p>
                          <p className="text-gray-900">7 years</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Regulatory Reports</p>
                          <p className="text-gray-900">7 years</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <EyeOff className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="text-gray-900 mb-1">PII Redaction</h4>
                      <p className="text-sm text-gray-600">
                        Personally Identifiable Information (PII) is automatically redacted from reports shared with external parties.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance Reports */}
        <TabsContent value="compliance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">KYC Pass Rate</p>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-gray-900 mb-1">
                  {((mockComplianceData.kycStats.passed / mockComplianceData.kycStats.totalVerifications) * 100).toFixed(1)}%
                </h3>
                <p className="text-xs text-gray-500">
                  {mockComplianceData.kycStats.passed} / {mockComplianceData.kycStats.totalVerifications} passed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Remediation Required</p>
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-gray-900 mb-1">{mockComplianceData.kycStats.remediationRequired}</h3>
                <p className="text-xs text-gray-500">Avg processing: {mockComplianceData.kycStats.averageProcessingTime}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Suspicious Activity</p>
                  <Shield className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-gray-900 mb-1">{mockComplianceData.suspiciousActivity.totalFlags}</h3>
                <p className="text-xs text-gray-500">
                  {mockComplianceData.suspiciousActivity.confirmed} confirmed
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>KYC Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Passed</p>
                  <h3 className="text-gray-900">{mockComplianceData.kycStats.passed}</h3>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Failed</p>
                  <h3 className="text-gray-900">{mockComplianceData.kycStats.failed}</h3>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Pending</p>
                  <h3 className="text-gray-900">{mockComplianceData.kycStats.pending}</h3>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Remediation</p>
                  <h3 className="text-gray-900">{mockComplianceData.kycStats.remediationRequired}</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Suspicious Activity Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-900">Total Flags</span>
                  <span className="text-gray-900">{mockComplianceData.suspiciousActivity.totalFlags}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-900">Investigated</span>
                  <span className="text-gray-900">{mockComplianceData.suspiciousActivity.investigated}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-900">Escalated to Authorities</span>
                  <span className="text-gray-900">{mockComplianceData.suspiciousActivity.escalated}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-900">False Positives</span>
                  <span className="text-gray-900">{mockComplianceData.suspiciousActivity.falsePositives}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-900">Confirmed Fraud</span>
                  <span className="text-red-600">{mockComplianceData.suspiciousActivity.confirmed}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Document Expiry Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-gray-900">Expired This Month</span>
                  </div>
                  <span className="text-gray-900">{mockComplianceData.documentExpiry.expiredThisMonth}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <span className="text-sm text-gray-900">Expiring Next 30 Days</span>
                  </div>
                  <span className="text-gray-900">{mockComplianceData.documentExpiry.expiringNext30Days}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm text-gray-900">Expiring Next 90 Days</span>
                  </div>
                  <span className="text-gray-900">{mockComplianceData.documentExpiry.expiringNext90Days}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Download className="w-4 h-4 mr-2" />
              Generate Compliance Report
            </Button>
            <Button variant="outline">
              <Mail className="w-4 h-4 mr-2" />
              Email to Compliance Team
            </Button>
          </div>
        </TabsContent>

        {/* Financial Reports */}
        <TabsContent value="financial" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>P&L Report - {mockPnLData.period}</CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export Excel
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left pb-3 text-sm text-gray-600">Product Line</th>
                      <th className="text-right pb-3 text-sm text-gray-600">Revenue</th>
                      <th className="text-right pb-3 text-sm text-gray-600">Fees</th>
                      <th className="text-right pb-3 text-sm text-gray-600">Cost</th>
                      <th className="text-right pb-3 text-sm text-gray-600">Net Profit</th>
                      <th className="text-right pb-3 text-sm text-gray-600">Volume</th>
                      <th className="text-right pb-3 text-sm text-gray-600">Margin %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockPnLData.productLines.map((line) => (
                      <tr key={line.name} className="border-b border-gray-100">
                        <td className="py-3 text-sm text-gray-900">{line.name}</td>
                        <td className="py-3 text-sm text-gray-900 text-right">{formatCurrency(line.revenue)}</td>
                        <td className="py-3 text-sm text-gray-900 text-right">{formatCurrency(line.fees)}</td>
                        <td className="py-3 text-sm text-gray-900 text-right">{formatCurrency(line.cost)}</td>
                        <td className="py-3 text-sm text-gray-900 text-right">{formatCurrency(line.netProfit)}</td>
                        <td className="py-3 text-sm text-gray-900 text-right">{line.volume.toLocaleString()}</td>
                        <td className="py-3 text-sm text-gray-900 text-right">{line.margin}%</td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-gray-300">
                      <td className="py-3 text-gray-900">Total</td>
                      <td className="py-3 text-gray-900 text-right">{formatCurrency(mockPnLData.totals.revenue)}</td>
                      <td className="py-3 text-gray-900 text-right">{formatCurrency(mockPnLData.totals.fees)}</td>
                      <td className="py-3 text-gray-900 text-right">{formatCurrency(mockPnLData.totals.cost)}</td>
                      <td className="py-3 text-gray-900 text-right">{formatCurrency(mockPnLData.totals.netProfit)}</td>
                      <td className="py-3 text-gray-900 text-right">{mockPnLData.totals.volume.toLocaleString()}</td>
                      <td className="py-3 text-gray-900 text-right">{mockPnLData.totals.margin}%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-gray-900 mb-1">{formatCurrency(mockPnLData.totals.revenue)}</h3>
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <TrendingUp className="w-3 h-3" />
                  <span>+12.5% vs last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Net Profit</p>
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-gray-900 mb-1">{formatCurrency(mockPnLData.totals.netProfit)}</h3>
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <TrendingUp className="w-3 h-3" />
                  <span>+8.3% vs last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Profit Margin</p>
                  <PieChart className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-gray-900 mb-1">{mockPnLData.totals.margin}%</h3>
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <TrendingUp className="w-3 h-3" />
                  <span>+2.1% vs last month</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Disputes Reports */}
        <TabsContent value="disputes" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Total Disputes</p>
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-gray-900 mb-1">{mockDisputesData.summary.totalDisputes}</h3>
                <p className="text-xs text-gray-500">{mockDisputesData.summary.pending} pending</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Resolution Time</p>
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-gray-900 mb-1">{mockDisputesData.summary.averageResolutionDays} days</h3>
                <p className="text-xs text-green-600">-0.8 days vs last quarter</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Total Cost</p>
                  <DollarSign className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-gray-900 mb-1">{formatCurrency(mockDisputesData.summary.totalCost)}</h3>
                <p className="text-xs text-gray-500">{formatCurrency(mockDisputesData.summary.totalCost / mockDisputesData.summary.totalDisputes)} per case</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Dispute Lifecycle Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockDisputesData.lifecycle.map((stage) => (
                  <div key={stage.stage} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 mb-1">{stage.stage}</p>
                      <p className="text-xs text-gray-500">Average time: {stage.avgDays} days</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-900">{stage.count} cases</span>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(stage.count / mockDisputesData.summary.totalDisputes) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cost Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-900">Chargeback Fees</span>
                  <span className="text-gray-900">{formatCurrency(mockDisputesData.costBreakdown.chargebackFees)}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-900">Operational Cost</span>
                  <span className="text-gray-900">{formatCurrency(mockDisputesData.costBreakdown.operationalCost)}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-900">Reversed Transactions</span>
                  <span className="text-gray-900">{formatCurrency(mockDisputesData.costBreakdown.reversedTransactions)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dispute Outcomes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Won by Merchant</p>
                  <h3 className="text-gray-900">{mockDisputesData.summary.wonByMerchant}</h3>
                  <p className="text-xs text-gray-500">
                    {((mockDisputesData.summary.wonByMerchant / mockDisputesData.summary.resolved) * 100).toFixed(1)}% win rate
                  </p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Won by Customer</p>
                  <h3 className="text-gray-900">{mockDisputesData.summary.wonByCustomer}</h3>
                  <p className="text-xs text-gray-500">
                    {((mockDisputesData.summary.wonByCustomer / mockDisputesData.summary.resolved) * 100).toFixed(1)}% loss rate
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Download className="w-4 h-4 mr-2" />
            Export Disputes Report
          </Button>
        </TabsContent>

        {/* KPI Scorecard */}
        <TabsContent value="kpi" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Executive KPI Scorecard</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{mockKPIScorecard.period}</p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockKPIScorecard.kpis.map((kpi) => (
                  <div key={kpi.name} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-gray-900">{kpi.name}</h4>
                          {getKPIStatusBadge(kpi.status)}
                        </div>
                        <div className="flex items-baseline gap-2 mb-2">
                          <h2 className="text-gray-900">{kpi.value}{kpi.unit}</h2>
                          <span className="text-sm text-gray-500">Target: {kpi.target}{kpi.unit}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {kpi.trend === 'up' ? (
                            <TrendingUp className="w-4 h-4 text-green-600" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-600" />
                          )}
                          <span className={`text-sm ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                            {kpi.change}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          kpi.status === 'achieved' ? 'bg-green-600' :
                          kpi.status === 'near' ? 'bg-yellow-600' :
                          'bg-orange-600'
                        }`}
                        style={{ width: `${Math.min((kpi.value / kpi.target) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audit Extracts */}
        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generate Audit Extract</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date</Label>
                    <Input type="date" className="mt-2 bg-input-background border-gray-200" />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input type="date" className="mt-2 bg-input-background border-gray-200" />
                  </div>
                </div>

                <div>
                  <Label>Event Types</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {[
                      'User Login/Logout',
                      'KYC Actions',
                      'Settlement Approvals',
                      'Transaction Monitoring',
                      'Configuration Changes',
                      'Permission Changes',
                      'Report Generation',
                      'Data Exports'
                    ].map((eventType) => (
                      <div key={eventType} className="flex items-center gap-2">
                        <Checkbox id={eventType} />
                        <Label htmlFor={eventType} className="text-sm text-gray-700 cursor-pointer">
                          {eventType}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>User Filter (Optional)</Label>
                  <Input 
                    type="text" 
                    placeholder="Enter email address..."
                    className="mt-2 bg-input-background border-gray-200"
                  />
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="text-gray-900 mb-1">Audit Export Notes</h4>
                      <p className="text-sm text-gray-600">
                        Audit extracts include all system events and user actions for the selected period. 
                        PII redaction can be applied for external sharing.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox id="redactPII" />
                  <Label htmlFor="redactPII" className="text-sm text-gray-700 cursor-pointer">
                    Apply PII redaction (for external sharing)
                  </Label>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <FileDown className="w-4 h-4 mr-2" />
                  Generate Audit Extract
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Audit Extracts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { period: '2025-10-01 to 2025-10-15', generatedBy: 'admin@ismartpay.com', date: '2025-10-15T14:30:00' },
                  { period: '2025-09-01 to 2025-09-30', generatedBy: 'audit@ismartpay.com', date: '2025-10-01T09:00:00' }
                ].map((extract, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">Audit Extract - {extract.period}</p>
                      <p className="text-xs text-gray-500">
                        Generated by {extract.generatedBy} on {new Date(extract.date).toLocaleString()}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Custom Report Builder Dialog */}
      <Dialog open={showReportBuilder} onOpenChange={setShowReportBuilder}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Custom Report Builder</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Report Name</Label>
              <Input 
                placeholder="E.g., Transaction Analysis by Channel"
                className="mt-2 bg-input-background border-gray-200"
              />
            </div>

            <div>
              <Label>Data Source</Label>
              <Select>
                <SelectTrigger className="mt-2 bg-input-background border-gray-200">
                  <SelectValue placeholder="Select data source..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="transactions">Transactions</SelectItem>
                  <SelectItem value="settlements">Settlements</SelectItem>
                  <SelectItem value="users">Users</SelectItem>
                  <SelectItem value="disputes">Disputes</SelectItem>
                  <SelectItem value="kyc">KYC Records</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Date From</Label>
                <Input type="date" className="mt-2 bg-input-background border-gray-200" />
              </div>
              <div>
                <Label>Date To</Label>
                <Input type="date" className="mt-2 bg-input-background border-gray-200" />
              </div>
            </div>

            <div>
              <Label>Filters</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <Select>
                  <SelectTrigger className="bg-input-background border-gray-200">
                    <SelectValue placeholder="Channel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Channels</SelectItem>
                    <SelectItem value="mobile">Mobile Money</SelectItem>
                    <SelectItem value="card">Card Payment</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="bg-input-background border-gray-200">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Group By</Label>
              <Select>
                <SelectTrigger className="mt-2 bg-input-background border-gray-200">
                  <SelectValue placeholder="Select grouping..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Grouping</SelectItem>
                  <SelectItem value="channel">Channel</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="merchant">Merchant</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Aggregations</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {['Sum Amount', 'Count', 'Average', 'Min/Max'].map((agg) => (
                  <div key={agg} className="flex items-center gap-2">
                    <Checkbox id={agg} />
                    <Label htmlFor={agg} className="text-sm text-gray-700 cursor-pointer">{agg}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>Output Format</Label>
              <Select defaultValue="excel">
                <SelectTrigger className="mt-2 bg-input-background border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excel">Excel (XLSX)</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                <Download className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setShowReportBuilder(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Schedule Report Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Schedule Automated Report</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Report Name</Label>
              <Input 
                placeholder="E.g., Daily Settlement Summary"
                className="mt-2 bg-input-background border-gray-200"
              />
            </div>

            <div>
              <Label>Report Type</Label>
              <Select>
                <SelectTrigger className="mt-2 bg-input-background border-gray-200">
                  <SelectValue placeholder="Select report type..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="settlement">Settlement Summary</SelectItem>
                  <SelectItem value="compliance">Compliance Report</SelectItem>
                  <SelectItem value="financial">Financial Report</SelectItem>
                  <SelectItem value="disputes">Disputes Report</SelectItem>
                  <SelectItem value="custom">Custom Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Schedule Frequency</Label>
              <Select>
                <SelectTrigger className="mt-2 bg-input-background border-gray-200">
                  <SelectValue placeholder="Select frequency..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Time</Label>
                <Input type="time" className="mt-2 bg-input-background border-gray-200" />
              </div>
              <div>
                <Label>Timezone</Label>
                <Select defaultValue="gmt">
                  <SelectTrigger className="mt-2 bg-input-background border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gmt">GMT</SelectItem>
                    <SelectItem value="eat">EAT (GMT+3)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Email Recipients</Label>
              <Input 
                placeholder="email1@example.com, email2@example.com"
                className="mt-2 bg-input-background border-gray-200"
              />
            </div>

            <div>
              <Label>Output Format</Label>
              <Select defaultValue="pdf">
                <SelectTrigger className="mt-2 bg-input-background border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="both">Both (PDF + Excel)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Data Retention (Days)</Label>
              <Input 
                type="number" 
                defaultValue="365"
                className="mt-2 bg-input-background border-gray-200"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Report
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setShowScheduleDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
