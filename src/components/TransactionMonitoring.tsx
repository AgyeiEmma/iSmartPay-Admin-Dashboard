import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Search, Filter, Eye, RefreshCw, AlertTriangle, TrendingUp, Clock, CheckCircle } from 'lucide-react';

const transactions = [
  {
    id: 'TXN001',
    timestamp: '2024-10-07 14:30:25',
    merchantName: 'Kwame\'s Electronics',
    customerName: 'John Doe',
    amount: 2500,
    type: 'Collection',
    status: 'Completed',
    paymentMethod: 'Mobile Money',
    reference: 'MM123456789',
    processingTime: '2.3s'
  },
  {
    id: 'TXN002',
    timestamp: '2024-10-07 14:28:15',
    merchantName: 'Ama\'s Fashion Store',
    customerName: 'Jane Smith',
    amount: 1800,
    type: 'Disbursement',
    status: 'Processing',
    paymentMethod: 'Bank Transfer',
    reference: 'BT987654321',
    processingTime: '45.2s'
  },
  {
    id: 'TXN003',
    timestamp: '2024-10-07 14:25:10',
    merchantName: 'Kofi\'s Restaurant',
    customerName: 'Alice Johnson',
    amount: 3200,
    type: 'Collection',
    status: 'Failed',
    paymentMethod: 'Mobile Money',
    reference: 'MM555666777',
    processingTime: '12.8s'
  },
  {
    id: 'TXN004',
    timestamp: '2024-10-07 14:22:45',
    merchantName: 'Akosua\'s Pharmacy',
    customerName: 'Bob Wilson',
    amount: 950,
    type: 'Collection',
    status: 'Completed',
    paymentMethod: 'Card Payment',
    reference: 'CP444555666',
    processingTime: '1.9s'
  },
  {
    id: 'TXN005',
    timestamp: '2024-10-07 14:20:30',
    merchantName: 'Yaw\'s Bookstore',
    customerName: 'Carol Brown',
    amount: 4500,
    type: 'Disbursement',
    status: 'Pending',
    paymentMethod: 'Bank Transfer',
    reference: 'BT111222333',
    processingTime: '120.5s'
  }
];

const hourlyData = [
  { hour: '09:00', transactions: 45, volume: 125000 },
  { hour: '10:00', transactions: 52, volume: 145000 },
  { hour: '11:00', transactions: 38, volume: 98000 },
  { hour: '12:00', transactions: 67, volume: 180000 },
  { hour: '13:00', transactions: 71, volume: 195000 },
  { hour: '14:00', transactions: 89, volume: 245000 },
  { hour: '15:00', transactions: 76, volume: 210000 },
  { hour: '16:00', transactions: 62, volume: 165000 },
];

export function TransactionMonitoring() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [isRealTime, setIsRealTime] = useState(true);

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.merchantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || transaction.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'failed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'processing': return <RefreshCw className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'failed': return <AlertTriangle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'Collection' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700';
  };

  const formatCurrency = (amount: number) => `₵${amount.toLocaleString()}`;

  const handleRetryTransaction = (transactionId: string) => {
    console.log('Retrying transaction:', transactionId);
    // Implementation for retrying failed transaction
  };

  const toggleRealTime = () => {
    setIsRealTime(!isRealTime);
    console.log('Real-time monitoring:', !isRealTime ? 'enabled' : 'disabled');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transaction Monitoring</h1>
          <p className="text-gray-600 mt-1">Real-time transaction tracking and monitoring</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${isRealTime ? 'bg-green-100' : 'bg-gray-100'}`}>
            <div className={`w-2 h-2 rounded-full ${isRealTime ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-sm font-medium">{isRealTime ? 'Live' : 'Paused'}</span>
          </div>
          <Button
            variant="outline"
            onClick={toggleRealTime}
          >
            {isRealTime ? 'Pause' : 'Resume'} Monitoring
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Real-time Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Today</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
              <p className="text-sm text-green-600">+12.5% from yesterday</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-green-600">97.8%</p>
              <p className="text-sm text-green-600">+0.3% from yesterday</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Processing</p>
              <p className="text-2xl font-bold text-blue-600">23</p>
              <p className="text-sm text-gray-500">Currently in queue</p>
            </div>
            <RefreshCw className="w-8 h-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Failed</p>
              <p className="text-2xl font-bold text-red-600">8</p>
              <p className="text-sm text-red-600">Requires attention</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hourly Transaction Volume</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip formatter={(value, name) => [name === 'volume' ? formatCurrency(Number(value)) : value, name === 'volume' ? 'Volume' : 'Count']} />
              <Line type="monotone" dataKey="transactions" stroke="#3b82f6" strokeWidth={2} name="transactions" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Count by Hour</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="transactions" fill="#06b6d4" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by merchant, customer, or transaction ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="processing">Processing</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Live Transactions Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Live Transactions</h3>
          <div className="flex items-center space-x-2">
            {isRealTime && (
              <div className="flex items-center space-x-2 text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm">Auto-refreshing</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Time</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Transaction ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Merchant</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Customer</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-500">
                    {transaction.timestamp.split(' ')[1]}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{transaction.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{transaction.merchantName}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{transaction.customerName}</td>
                  <td className="py-3 px-4 text-sm font-medium">{formatCurrency(transaction.amount)}</td>
                  <td className="py-3 px-4">
                    <Badge className={getTypeColor(transaction.type)}>
                      {transaction.type}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Badge className={`${getStatusColor(transaction.status)} flex items-center space-x-1`}>
                      {getStatusIcon(transaction.status)}
                      <span>{transaction.status}</span>
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedTransaction(transaction)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Transaction Details - {transaction.id}</DialogTitle>
                          </DialogHeader>
                          {selectedTransaction && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-600">Transaction ID</label>
                                  <p className="text-sm text-gray-900">{selectedTransaction.id}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-600">Timestamp</label>
                                  <p className="text-sm text-gray-900">{selectedTransaction.timestamp}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-600">Merchant</label>
                                  <p className="text-sm text-gray-900">{selectedTransaction.merchantName}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-600">Customer</label>
                                  <p className="text-sm text-gray-900">{selectedTransaction.customerName}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-600">Amount</label>
                                  <p className="text-sm text-gray-900">{formatCurrency(selectedTransaction.amount)}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-600">Payment Method</label>
                                  <p className="text-sm text-gray-900">{selectedTransaction.paymentMethod}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-600">Reference</label>
                                  <p className="text-sm text-gray-900">{selectedTransaction.reference}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-600">Processing Time</label>
                                  <p className="text-sm text-gray-900">{selectedTransaction.processingTime}</p>
                                </div>
                                <div className="col-span-2">
                                  <label className="text-sm font-medium text-gray-600">Status</label>
                                  <div className="mt-1">
                                    <Badge className={getStatusColor(selectedTransaction.status)}>
                                      {selectedTransaction.status}
                                    </Badge>
                                  </div>
                                </div>
                              </div>

                              {selectedTransaction.status === 'Failed' && (
                                <div className="flex justify-end pt-4 border-t">
                                  <Button
                                    className="bg-blue-600 hover:bg-blue-700"
                                    onClick={() => handleRetryTransaction(selectedTransaction.id)}
                                  >
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    Retry Transaction
                                  </Button>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      
                      {transaction.status === 'Failed' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRetryTransaction(transaction.id)}
                        >
                          <RefreshCw className="w-4 h-4" />
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