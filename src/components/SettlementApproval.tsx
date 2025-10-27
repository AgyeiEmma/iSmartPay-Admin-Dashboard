import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  Download,
  Upload,
  DollarSign,
  Play,
  Pause,
  RefreshCw,
  Calculator,
  FileSignature,
  Shield
} from 'lucide-react';

export function SettlementApproval() {
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Mock settlement batches data
  const settlementBatches = [
    {
      id: 'STL-2024-001',
      batchNumber: 'BATCH_20240115_001',
      originator: 'Merchant Services',
      totalAmount: 2847392.50,
      transactionCount: 1247,
      fees: 14236.96,
      netAmount: 2833155.54,
      status: 'pending_approval',
      priority: 'high',
      createdAt: '2024-01-15T08:30:00Z',
      scheduledFor: '2024-01-15T14:00:00Z',
      approver: null,
      riskScore: 85,
      autoApprovalEligible: false,
      merchants: [
        { name: 'TechMall Ghana', amount: 1247392.50, transactionCount: 523 },
        { name: 'FoodHub Accra', amount: 984532.30, transactionCount: 421 },
        { name: 'Fashion Plus', amount: 615467.70, transactionCount: 303 }
      ]
    },
    {
      id: 'STL-2024-002',
      batchNumber: 'BATCH_20240115_002',
      originator: 'Partner Gateway',
      totalAmount: 1456789.25,
      transactionCount: 892,
      fees: 7283.95,
      netAmount: 1449505.30,
      status: 'approved',
      priority: 'medium',
      createdAt: '2024-01-15T09:15:00Z',
      scheduledFor: '2024-01-15T15:30:00Z',
      approver: 'John Doe',
      riskScore: 35,
      autoApprovalEligible: true,
      merchants: [
        { name: 'Mobile Money Plus', amount: 856789.25, transactionCount: 445 },
        { name: 'QuickPay Services', amount: 600000.00, transactionCount: 447 }
      ]
    },
    {
      id: 'STL-2024-003',
      batchNumber: 'BATCH_20240114_001',
      originator: 'Direct Debit',
      totalAmount: 567432.10,
      transactionCount: 234,
      fees: 2837.16,
      netAmount: 564594.94,
      status: 'hold',
      priority: 'high',
      createdAt: '2024-01-14T16:45:00Z',
      scheduledFor: '2024-01-15T10:00:00Z',
      approver: null,
      riskScore: 95,
      autoApprovalEligible: false,
      merchants: [
        { name: 'Utility Bills Corp', amount: 567432.10, transactionCount: 234 }
      ]
    },
    {
      id: 'STL-2024-004',
      batchNumber: 'BATCH_20240114_002',
      originator: 'API Payments',
      totalAmount: 234567.89,
      transactionCount: 156,
      fees: 1172.84,
      netAmount: 233395.05,
      status: 'processing',
      priority: 'low',
      createdAt: '2024-01-14T11:20:00Z',
      scheduledFor: '2024-01-14T17:00:00Z',
      approver: 'Jane Smith',
      riskScore: 20,
      autoApprovalEligible: true,
      merchants: [
        { name: 'Digital Services Ltd', amount: 234567.89, transactionCount: 156 }
      ]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending_approval':
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Pending Approval</Badge>;
      case 'approved':
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      case 'hold':
        return <Badge variant="destructive"><Pause className="w-3 h-3 mr-1" />On Hold</Badge>;
      case 'processing':
        return <Badge variant="default" className="bg-blue-500"><RefreshCw className="w-3 h-3 mr-1" />Processing</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="secondary" className="bg-yellow-500">Medium</Badge>;
      case 'low':
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getRiskBadge = (score: number) => {
    if (score >= 80) return <Badge variant="destructive">High Risk</Badge>;
    if (score >= 50) return <Badge variant="secondary" className="bg-yellow-500">Medium Risk</Badge>;
    return <Badge variant="default" className="bg-green-500">Low Risk</Badge>;
  };

  const filteredBatches = settlementBatches.filter(batch => {
    const matchesSearch = batch.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         batch.originator.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         batch.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || batch.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Settlement Approval</h2>
          <p className="text-gray-600">Manage and approve merchant settlement batches</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Calculator className="w-4 h-4 mr-2" />
            Settlement Preview
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Audit
          </Button>
          <Button>
            <FileSignature className="w-4 h-4 mr-2" />
            Multi-Approve
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                <p className="text-2xl font-bold text-orange-600">₵4.2M</p>
                <p className="text-xs text-gray-500">12 batches</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved Today</p>
                <p className="text-2xl font-bold text-green-600">₵12.8M</p>
                <p className="text-xs text-gray-500">47 batches</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">On Hold</p>
                <p className="text-2xl font-bold text-red-600">₵567K</p>
                <p className="text-xs text-gray-500">3 batches</p>
              </div>
              <Pause className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Auto-Approval Rate</p>
                <p className="text-2xl font-bold text-blue-600">78%</p>
                <p className="text-xs text-gray-500">Low risk only</p>
              </div>
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="batches" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="batches">Settlement Batches</TabsTrigger>
          <TabsTrigger value="preview">Morning Preview</TabsTrigger>
          <TabsTrigger value="holds">Holds & Exceptions</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
        </TabsList>

        <TabsContent value="batches" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Settlement Batches</CardTitle>
              <CardDescription>Review and approve merchant settlement requests</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex-1">
                  <Label htmlFor="search">Search Batches</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Search by batch number, originator, or ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="status">Status Filter</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending_approval">Pending Approval</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="hold">On Hold</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Batches Table */}
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Batch Details</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Transactions</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Risk Score</TableHead>
                      <TableHead>Scheduled</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBatches.map((batch) => (
                      <TableRow key={batch.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{batch.batchNumber}</p>
                            <p className="text-sm text-gray-500">{batch.originator}</p>
                            <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">{batch.id}</code>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">₵{batch.totalAmount.toLocaleString()}</p>
                            <p className="text-sm text-gray-500">Net: ₵{batch.netAmount.toLocaleString()}</p>
                            <p className="text-xs text-gray-400">Fees: ₵{batch.fees.toLocaleString()}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{batch.transactionCount}</p>
                            <p className="text-sm text-gray-500">{batch.merchants.length} merchants</p>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(batch.status)}</TableCell>
                        <TableCell>{getPriorityBadge(batch.priority)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">{batch.riskScore}</span>
                            {getRiskBadge(batch.riskScore)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-500">
                            {new Date(batch.scheduledFor).toLocaleString()}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl">
                                <DialogHeader>
                                  <DialogTitle>Settlement Batch Details - {batch.batchNumber}</DialogTitle>
                                  <DialogDescription>
                                    Review batch contents and approve settlement
                                  </DialogDescription>
                                </DialogHeader>
                                <SettlementDetailsModal batch={batch} />
                              </DialogContent>
                            </Dialog>
                            {batch.status === 'pending_approval' && (
                              <>
                                <Button variant="outline" size="sm" className="text-green-600 border-green-200">
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="text-red-600 border-red-200">
                                  <XCircle className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="text-yellow-600 border-yellow-200">
                                  <Pause className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Morning Settlement Preview</CardTitle>
              <CardDescription>Pre-approval workflow for treasury team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Total Settlement Value</h4>
                    <p className="text-2xl font-bold text-blue-600">₵18.7M</p>
                    <p className="text-sm text-blue-700">Across 47 batches</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Auto-Approved</h4>
                    <p className="text-2xl font-bold text-green-600">₵14.2M</p>
                    <p className="text-sm text-green-700">35 low-risk batches</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-medium text-orange-900 mb-2">Requires Review</h4>
                    <p className="text-2xl font-bold text-orange-600">₵4.5M</p>
                    <p className="text-sm text-orange-700">12 high-value/risk batches</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Pre-Approval Summary</h4>
                  <div className="border rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Largest Single Settlement:</span>
                        <span className="font-medium ml-2">₵2.8M (TechMall Ghana)</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Average Risk Score:</span>
                        <span className="font-medium ml-2">42/100</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Estimated Processing Time:</span>
                        <span className="font-medium ml-2">2.5 hours</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Bank Transfer Windows:</span>
                        <span className="font-medium ml-2">10:00 AM, 2:00 PM, 4:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <Button variant="outline">Export Preview</Button>
                  <Button>Pre-Approve All Low Risk</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="holds" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Holds & Exceptions</CardTitle>
              <CardDescription>Manage settlements on hold and exception cases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 bg-red-50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-red-900">High Risk Settlement Detected</h4>
                      <p className="text-sm text-red-700">Batch BATCH_20240114_001 - Risk Score: 95</p>
                      <p className="text-xs text-red-600">Reason: Unusual transaction pattern detected</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Investigate</Button>
                      <Button variant="destructive" size="sm">Reject</Button>
                      <Button variant="secondary" size="sm">Release Hold</Button>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-yellow-900">Threshold Exceeded</h4>
                      <p className="text-sm text-yellow-700">Merchant: TechMall Ghana - Amount: ₵2.8M</p>
                      <p className="text-xs text-yellow-600">Reason: Exceeds daily settlement limit of ₵2.5M</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Adjust Limit</Button>
                      <Button variant="secondary" size="sm">Split Settlement</Button>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-blue-900">Bank Integration Issue</h4>
                      <p className="text-sm text-blue-700">Partner: Mobile Money Plus</p>
                      <p className="text-xs text-blue-600">Reason: API timeout - retry required</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Retry</Button>
                      <Button variant="secondary" size="sm">Manual Process</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Settlement Audit Trail</CardTitle>
              <CardDescription>Complete history of settlement approvals and changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Batch ID</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Approver</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Checksum</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>2024-01-15 14:23:45</TableCell>
                        <TableCell><code>STL-2024-002</code></TableCell>
                        <TableCell><Badge variant="default" className="bg-green-500">Approved</Badge></TableCell>
                        <TableCell>John Doe</TableCell>
                        <TableCell>₵1,449,505.30</TableCell>
                        <TableCell><code className="text-xs">a7b3c2d...</code></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2024-01-15 13:45:12</TableCell>
                        <TableCell><code>STL-2024-001</code></TableCell>
                        <TableCell><Badge variant="destructive">Hold Applied</Badge></TableCell>
                        <TableCell>Jane Smith</TableCell>
                        <TableCell>₵2,833,155.54</TableCell>
                        <TableCell><code className="text-xs">d4e5f6g...</code></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2024-01-15 12:30:22</TableCell>
                        <TableCell><code>STL-2024-003</code></TableCell>
                        <TableCell><Badge variant="secondary">Risk Review</Badge></TableCell>
                        <TableCell>Mike Johnson</TableCell>
                        <TableCell>₵564,594.94</TableCell>
                        <TableCell><code className="text-xs">g7h8i9j...</code></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SettlementDetailsModal({ batch }: { batch: any }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-3">Batch Information</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Batch Number:</span>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">{batch.batchNumber}</code>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Originator:</span>
              <span className="font-medium">{batch.originator}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Created:</span>
              <span className="font-medium">{new Date(batch.createdAt).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Scheduled:</span>
              <span className="font-medium">{new Date(batch.scheduledFor).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3">Financial Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Gross Amount:</span>
              <span className="font-medium">₵{batch.totalAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Fees:</span>
              <span className="font-medium">₵{batch.fees.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Net Amount:</span>
              <span className="font-bold text-green-600">₵{batch.netAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Risk Score:</span>
              <span className="font-medium">{batch.riskScore}/100</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Merchant Breakdown</h4>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Merchant</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Transactions</TableHead>
                <TableHead>Percentage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {batch.merchants.map((merchant: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{merchant.name}</TableCell>
                  <TableCell>₵{merchant.amount.toLocaleString()}</TableCell>
                  <TableCell>{merchant.transactionCount}</TableCell>
                  <TableCell>{((merchant.amount / batch.totalAmount) * 100).toFixed(1)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Approval Notes</h4>
        <Textarea 
          placeholder="Add approval notes or reasons for decision..."
          rows={4}
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button variant="outline">Hold Settlement</Button>
        <Button variant="destructive">Reject Batch</Button>
        <Button>Approve Settlement</Button>
      </div>
    </div>
  );
}