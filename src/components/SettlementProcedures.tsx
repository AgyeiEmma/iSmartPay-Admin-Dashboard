import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Search, Download, Upload, Check, Clock, AlertTriangle, CreditCard, ArrowUpDown } from 'lucide-react';

const settlements = [
  {
    id: 'SET001',
    merchantName: 'Kwame\'s Electronics',
    merchantId: 'MER001',
    amount: 45000,
    transactions: 28,
    period: '2024-10-01 to 2024-10-07',
    status: 'Pending',
    requestedDate: '2024-10-07',
    bankAccount: '**** **** **** 1234',
    bankName: 'GCB Bank',
    fees: 450,
    netAmount: 44550
  },
  {
    id: 'SET002', 
    merchantName: 'Ama\'s Fashion Store',
    merchantId: 'MER002',
    amount: 28500,
    transactions: 15,
    period: '2024-10-01 to 2024-10-07',
    status: 'Processing',
    requestedDate: '2024-10-06',
    bankAccount: '**** **** **** 5678',
    bankName: 'Ecobank',
    fees: 285,
    netAmount: 28215
  },
  {
    id: 'SET003',
    merchantName: 'Kofi\'s Restaurant',
    merchantId: 'MER003', 
    amount: 12800,
    transactions: 42,
    period: '2024-09-24 to 2024-09-30',
    status: 'Completed',
    requestedDate: '2024-10-01',
    bankAccount: '**** **** **** 9012',
    bankName: 'Standard Chartered',
    fees: 128,
    netAmount: 12672
  },
  {
    id: 'SET004',
    merchantName: 'Akosua\'s Pharmacy',
    merchantId: 'MER004',
    amount: 67200,
    transactions: 89,
    period: '2024-09-24 to 2024-09-30',
    status: 'Failed',
    requestedDate: '2024-10-01',
    bankAccount: '**** **** **** 3456',
    bankName: 'CalBank',
    fees: 672,
    netAmount: 66528
  }
];

const batchSettlements = [
  {
    id: 'BATCH001',
    date: '2024-10-07',
    totalAmount: 156200,
    merchantCount: 12,
    status: 'Pending Approval',
    createdBy: 'Admin User'
  },
  {
    id: 'BATCH002',
    date: '2024-10-06', 
    totalAmount: 234500,
    merchantCount: 18,
    status: 'Processing',
    createdBy: 'Admin User'
  }
];

export function SettlementProcedures() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSettlement, setSelectedSettlement] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredSettlements = settlements.filter(settlement => {
    const matchesSearch = settlement.merchantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         settlement.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || settlement.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'failed': return 'bg-red-100 text-red-700';
      case 'pending approval': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'processing': return <ArrowUpDown className="w-4 h-4" />;
      case 'completed': return <Check className="w-4 h-4" />;
      case 'failed': return <AlertTriangle className="w-4 h-4" />;
      case 'pending approval': return <Clock className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const formatCurrency = (amount: number) => `₵${amount.toLocaleString()}`;

  const handleApproveSettlement = (settlementId: string) => {
    console.log('Approving settlement:', settlementId);
    // Implementation for approving settlement
  };

  const handleRejectSettlement = (settlementId: string) => {
    console.log('Rejecting settlement:', settlementId);
    // Implementation for rejecting settlement
  };

  const handleBatchProcess = () => {
    console.log('Processing batch settlements');
    // Implementation for batch processing
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settlement Procedures</h1>
          <p className="text-gray-600 mt-1">Manage merchant settlements and payouts</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleBatchProcess}>
            <CreditCard className="w-4 h-4 mr-2" />
            Process Batch
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Settlements</p>
              <p className="text-2xl font-bold text-yellow-600">8</p>
              <p className="text-sm text-gray-500">₵186,300 total</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Processing</p>
              <p className="text-2xl font-bold text-blue-600">3</p>
              <p className="text-sm text-gray-500">₵89,200 total</p>
            </div>
            <ArrowUpDown className="w-8 h-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed Today</p>
              <p className="text-2xl font-bold text-green-600">12</p>
              <p className="text-sm text-gray-500">₵456,700 total</p>
            </div>
            <Check className="w-8 h-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Failed</p>
              <p className="text-2xl font-bold text-red-600">2</p>
              <p className="text-sm text-gray-500">₵23,400 total</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </Card>
      </div>

      {/* Batch Settlements */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Batch Settlement Queue</h3>
        <div className="space-y-3">
          {batchSettlements.map((batch) => (
            <div key={batch.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <CreditCard className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">{batch.id}</p>
                  <p className="text-sm text-gray-500">{batch.merchantCount} merchants • {formatCurrency(batch.totalAmount)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className={getStatusColor(batch.status)}>
                  {getStatusIcon(batch.status)}
                  <span className="ml-1">{batch.status}</span>
                </Badge>
                <Button variant="outline" size="sm">Process</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Search and Filter */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search settlements by merchant name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </Card>

      {/* Settlements Table */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Settlement ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Merchant</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Period</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Net Amount</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSettlements.map((settlement) => (
                <tr key={settlement.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{settlement.id}</td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{settlement.merchantName}</p>
                      <p className="text-sm text-gray-500">{settlement.merchantId}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm text-gray-900">{settlement.period}</p>
                      <p className="text-sm text-gray-500">{settlement.transactions} transactions</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm font-medium">{formatCurrency(settlement.amount)}</td>
                  <td className="py-3 px-4 text-sm font-medium text-green-600">{formatCurrency(settlement.netAmount)}</td>
                  <td className="py-3 px-4">
                    <Badge className={`${getStatusColor(settlement.status)} flex items-center space-x-1`}>
                      {getStatusIcon(settlement.status)}
                      <span>{settlement.status}</span>
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedSettlement(settlement)}
                          >
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Settlement Details - {settlement.id}</DialogTitle>
                          </DialogHeader>
                          {selectedSettlement && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-600">Merchant</label>
                                  <p className="text-sm text-gray-900">{selectedSettlement.merchantName}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-600">Settlement Period</label>
                                  <p className="text-sm text-gray-900">{selectedSettlement.period}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-600">Gross Amount</label>
                                  <p className="text-sm text-gray-900">{formatCurrency(selectedSettlement.amount)}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-600">Fees</label>
                                  <p className="text-sm text-gray-900">{formatCurrency(selectedSettlement.fees)}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-600">Net Amount</label>
                                  <p className="text-sm text-green-600 font-medium">{formatCurrency(selectedSettlement.netAmount)}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-600">Bank Account</label>
                                  <p className="text-sm text-gray-900">{selectedSettlement.bankAccount}</p>
                                  <p className="text-sm text-gray-500">{selectedSettlement.bankName}</p>
                                </div>
                              </div>

                              {selectedSettlement.status === 'Pending' && (
                                <div className="flex space-x-3 pt-4 border-t">
                                  <Button
                                    variant="outline"
                                    className="text-red-600 border-red-200"
                                    onClick={() => handleRejectSettlement(selectedSettlement.id)}
                                  >
                                    Reject
                                  </Button>
                                  <Button
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={() => handleApproveSettlement(selectedSettlement.id)}
                                  >
                                    Approve & Process
                                  </Button>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      
                      {settlement.status === 'Pending' && (
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleApproveSettlement(settlement.id)}
                        >
                          Approve
                        </Button>
                      )}
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
}