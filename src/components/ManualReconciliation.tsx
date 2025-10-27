import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Search, Upload, Download, AlertTriangle, Check, X, Calculator, FileText } from 'lucide-react';

const reconciliationItems = [
  {
    id: 'REC001',
    date: '2024-10-07',
    transactionId: 'TXN123456',
    merchantName: 'Kwame\'s Electronics',
    systemAmount: 2500,
    bankAmount: 2450,
    difference: -50,
    status: 'Unmatched',
    type: 'Collection',
    notes: 'Bank charges deducted'
  },
  {
    id: 'REC002',
    date: '2024-10-07',
    transactionId: 'TXN123457',
    merchantName: 'Ama\'s Fashion Store',
    systemAmount: 1800,
    bankAmount: 1800,
    difference: 0,
    status: 'Matched',
    type: 'Disbursement',
    notes: ''
  },
  {
    id: 'REC003',
    date: '2024-10-06',
    transactionId: 'TXN123458',
    merchantName: 'Kofi\'s Restaurant',
    systemAmount: 3200,
    bankAmount: 0,
    difference: -3200,
    status: 'Failed',
    type: 'Collection',
    notes: 'Transaction not found in bank records'
  },
  {
    id: 'REC004',
    date: '2024-10-06',
    transactionId: 'TXN123459',
    merchantName: 'Akosua\'s Pharmacy',
    systemAmount: 950,
    bankAmount: 1000,
    difference: 50,
    status: 'Unmatched',
    type: 'Disbursement',
    notes: 'Amount discrepancy'
  }
];

const batchReconciliation = {
  id: 'BATCH_REC_001',
  date: '2024-10-07',
  totalSystemAmount: 145600,
  totalBankAmount: 142800,
  totalDifference: -2800,
  matchedCount: 156,
  unmatchedCount: 12,
  failedCount: 3,
  status: 'In Progress'
};

export function ManualReconciliation() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [reconciliationNotes, setReconciliationNotes] = useState('');

  const filteredItems = reconciliationItems.filter(item => {
    const matchesSearch = item.merchantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || item.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'matched': return 'bg-green-100 text-green-700';
      case 'unmatched': return 'bg-yellow-100 text-yellow-700';
      case 'failed': return 'bg-red-100 text-red-700';
      case 'reconciled': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'matched': return <Check className="w-4 h-4" />;
      case 'unmatched': return <AlertTriangle className="w-4 h-4" />;
      case 'failed': return <X className="w-4 h-4" />;
      case 'reconciled': return <Check className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getDifferenceColor = (difference: number) => {
    if (difference === 0) return 'text-green-600';
    if (difference > 0) return 'text-blue-600';
    return 'text-red-600';
  };

  const formatCurrency = (amount: number) => `₵${amount.toLocaleString()}`;

  const handleManualReconcile = (itemId: string, notes: string) => {
    console.log('Manual reconciliation for:', itemId, 'Notes:', notes);
    // Implementation for manual reconciliation
  };

  const handleMarkResolved = (itemId: string) => {
    console.log('Marking item as resolved:', itemId);
    // Implementation for marking as resolved
  };

  const exportReconciliationReport = () => {
    console.log('Exporting reconciliation report');
    // Implementation for export
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manual Reconciliation</h1>
          <p className="text-gray-600 mt-1">Review and reconcile transaction discrepancies</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import Bank File
          </Button>
          <Button variant="outline" onClick={exportReconciliationReport}>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Calculator className="w-4 h-4 mr-2" />
            Auto Reconcile
          </Button>
        </div>
      </div>

      {/* Batch Reconciliation Summary */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Batch Reconciliation Summary</h3>
          <Badge className="bg-blue-100 text-blue-700">
            {batchReconciliation.status}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <Calculator className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">System Total</p>
            <p className="text-xl font-bold text-gray-900">{formatCurrency(batchReconciliation.totalSystemAmount)}</p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <FileText className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Bank Total</p>
            <p className="text-xl font-bold text-gray-900">{formatCurrency(batchReconciliation.totalBankAmount)}</p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Difference</p>
            <p className={`text-xl font-bold ${getDifferenceColor(batchReconciliation.totalDifference)}`}>
              {formatCurrency(Math.abs(batchReconciliation.totalDifference))}
            </p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <Check className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Match Rate</p>
            <p className="text-xl font-bold text-green-600">
              {Math.round((batchReconciliation.matchedCount / (batchReconciliation.matchedCount + batchReconciliation.unmatchedCount + batchReconciliation.failedCount)) * 100)}%
            </p>
          </div>
        </div>
      </Card>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Matched</p>
              <p className="text-2xl font-bold text-green-600">{batchReconciliation.matchedCount}</p>
            </div>
            <Check className="w-8 h-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Unmatched</p>
              <p className="text-2xl font-bold text-yellow-600">{batchReconciliation.unmatchedCount}</p>
              <p className="text-sm text-gray-500">Requires review</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Failed</p>
              <p className="text-2xl font-bold text-red-600">{batchReconciliation.failedCount}</p>
              <p className="text-sm text-gray-500">Needs attention</p>
            </div>
            <X className="w-8 h-8 text-red-600" />
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by merchant name or transaction ID..."
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
            <option value="matched">Matched</option>
            <option value="unmatched">Unmatched</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </Card>

      {/* Reconciliation Items Table */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Transaction ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Merchant</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">System Amount</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Bank Amount</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Difference</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">{item.date}</td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{item.transactionId}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{item.merchantName}</td>
                  <td className="py-3 px-4 text-sm font-medium">{formatCurrency(item.systemAmount)}</td>
                  <td className="py-3 px-4 text-sm font-medium">{formatCurrency(item.bankAmount)}</td>
                  <td className={`py-3 px-4 text-sm font-medium ${getDifferenceColor(item.difference)}`}>
                    {item.difference === 0 ? '₵0' : 
                     item.difference > 0 ? `+${formatCurrency(item.difference)}` : 
                     `-${formatCurrency(Math.abs(item.difference))}`}
                  </td>
                  <td className="py-3 px-4">
                    <Badge className={`${getStatusColor(item.status)} flex items-center space-x-1`}>
                      {getStatusIcon(item.status)}
                      <span>{item.status}</span>
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedItem(item);
                              setReconciliationNotes(item.notes);
                            }}
                          >
                            Review
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Reconciliation Review - {item.transactionId}</DialogTitle>
                          </DialogHeader>
                          {selectedItem && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-600">Transaction ID</label>
                                  <p className="text-sm text-gray-900">{selectedItem.transactionId}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-600">Date</label>
                                  <p className="text-sm text-gray-900">{selectedItem.date}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-600">Merchant</label>
                                  <p className="text-sm text-gray-900">{selectedItem.merchantName}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-600">Type</label>
                                  <p className="text-sm text-gray-900">{selectedItem.type}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-600">System Amount</label>
                                  <p className="text-sm text-gray-900">{formatCurrency(selectedItem.systemAmount)}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-600">Bank Amount</label>
                                  <p className="text-sm text-gray-900">{formatCurrency(selectedItem.bankAmount)}</p>
                                </div>
                                <div className="col-span-2">
                                  <label className="text-sm font-medium text-gray-600">Difference</label>
                                  <p className={`text-sm font-medium ${getDifferenceColor(selectedItem.difference)}`}>
                                    {selectedItem.difference === 0 ? '₵0 (Matched)' : 
                                     selectedItem.difference > 0 ? `+${formatCurrency(selectedItem.difference)} (Overpaid)` : 
                                     `-${formatCurrency(Math.abs(selectedItem.difference))} (Underpaid)`}
                                  </p>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Reconciliation Notes</label>
                                <Textarea
                                  value={reconciliationNotes}
                                  onChange={(e) => setReconciliationNotes(e.target.value)}
                                  placeholder="Add notes about the reconciliation..."
                                  rows={3}
                                />
                              </div>

                              <div className="flex justify-end space-x-3 pt-4 border-t">
                                {selectedItem.status !== 'Matched' && (
                                  <>
                                    <Button
                                      variant="outline"
                                      onClick={() => handleMarkResolved(selectedItem.id)}
                                    >
                                      Mark as Resolved
                                    </Button>
                                    <Button
                                      className="bg-blue-600 hover:bg-blue-700"
                                      onClick={() => handleManualReconcile(selectedItem.id, reconciliationNotes)}
                                    >
                                      Manual Reconcile
                                    </Button>
                                  </>
                                )}
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      
                      {item.status === 'Unmatched' && (
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={() => handleManualReconcile(item.id, item.notes)}
                        >
                          Reconcile
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