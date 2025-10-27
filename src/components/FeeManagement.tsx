import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  DollarSign, 
  Plus, 
  Edit, 
  Trash2, 
  Users,
  Percent,
  TrendingUp,
  Search,
  Filter
} from 'lucide-react';
import { formatCurrency } from '../utils/currency';

// Mock data for general fees
const generalFeesData = [
  {
    id: 'GF001',
    name: 'Collection Fee',
    description: 'Standard fee for all collection transactions',
    feeType: 'rate',
    rate: 1.5,
    amount: 0,
    appliedTo: 'Collection Service',
    status: 'Active',
    createdAt: '2025-01-15 10:30',
  },
  {
    id: 'GF002',
    name: 'Disbursement Fee',
    description: 'Fixed fee for disbursement operations',
    feeType: 'flat_fee',
    rate: 0,
    amount: 5.00,
    appliedTo: 'Disbursement Service',
    status: 'Active',
    createdAt: '2025-01-20 14:20',
  },
  {
    id: 'GF003',
    name: 'Transfer Fee',
    description: 'Fee for bank-to-bank transfers',
    feeType: 'rate',
    rate: 0.75,
    amount: 0,
    appliedTo: 'Transfer Service',
    status: 'Active',
    createdAt: '2025-02-01 09:15',
  },
  {
    id: 'GF004',
    name: 'Card Processing Fee',
    description: 'Fee for card payment processing',
    feeType: 'rate',
    rate: 2.5,
    amount: 0,
    appliedTo: 'Card Payment Service',
    status: 'Active',
    createdAt: '2025-02-10 11:45',
  },
];

// Mock data for custom fees
const customFeesData = [
  {
    id: 'CF001',
    userId: 'USR12345',
    userName: 'Kwame Asante',
    userEmail: 'kwame@business.com',
    name: 'Special Collection Fee',
    description: 'Custom rate for high-volume merchant',
    feeType: 'rate',
    rate: 0.8,
    amount: 0,
    appliedTo: 'Collection Service',
    status: 'Active',
    createdAt: '2025-03-01 08:30',
  },
  {
    id: 'CF002',
    userId: 'USR12346',
    userName: 'Ama Boateng',
    userEmail: 'ama@enterprise.com',
    name: 'VIP Disbursement Fee',
    description: 'Reduced flat fee for VIP customer',
    feeType: 'flat_fee',
    rate: 0,
    amount: 2.50,
    appliedTo: 'Disbursement Service',
    status: 'Active',
    createdAt: '2025-03-05 15:20',
  },
  {
    id: 'CF003',
    userId: 'USR12347',
    userName: 'Kofi Mensah',
    userEmail: 'kofi@startup.com',
    name: 'Custom Transfer Fee',
    description: 'Startup discount on transfer fees',
    feeType: 'rate',
    rate: 0.5,
    amount: 0,
    appliedTo: 'Transfer Service',
    status: 'Active',
    createdAt: '2025-03-10 12:00',
  },
];

// Mock users for selection
const mockUsers = [
  { id: 'USR12345', name: 'Kwame Asante', email: 'kwame@business.com' },
  { id: 'USR12346', name: 'Ama Boateng', email: 'ama@enterprise.com' },
  { id: 'USR12347', name: 'Kofi Mensah', email: 'kofi@startup.com' },
  { id: 'USR12348', name: 'Akosua Darkwa', email: 'akosua@company.com' },
  { id: 'USR12349', name: 'Yaw Osei', email: 'yaw@business.gh' },
];

export function FeeManagement() {
  const [generalFees, setGeneralFees] = useState(generalFeesData);
  const [customFees, setCustomFees] = useState(customFeesData);
  const [showGeneralFeeDialog, setShowGeneralFeeDialog] = useState(false);
  const [showCustomFeeDialog, setShowCustomFeeDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Form states for General Fee
  const [generalFeeForm, setGeneralFeeForm] = useState({
    name: '',
    description: '',
    feeType: 'rate',
    rate: '',
    amount: '',
    appliedTo: 'Collection Service',
  });

  // Form states for Custom Fee
  const [customFeeForm, setCustomFeeForm] = useState({
    userId: '',
    name: '',
    description: '',
    feeType: 'rate',
    rate: '',
    amount: '',
    appliedTo: 'Collection Service',
  });

  const handleAddGeneralFee = () => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const newFee = {
      id: `GF${String(generalFees.length + 1).padStart(3, '0')}`,
      name: generalFeeForm.name,
      description: generalFeeForm.description,
      feeType: generalFeeForm.feeType,
      rate: generalFeeForm.feeType === 'rate' ? parseFloat(generalFeeForm.rate) : 0,
      amount: generalFeeForm.feeType === 'flat_fee' ? parseFloat(generalFeeForm.amount) : 0,
      appliedTo: generalFeeForm.appliedTo,
      status: 'Active',
      createdAt: formattedDate,
    };
    
    setGeneralFees([...generalFees, newFee]);
    setShowGeneralFeeDialog(false);
    setGeneralFeeForm({
      name: '',
      description: '',
      feeType: 'rate',
      rate: '',
      amount: '',
      appliedTo: 'Collection Service',
    });
  };

  const handleAddCustomFee = () => {
    const selectedUser = mockUsers.find(u => u.id === customFeeForm.userId);
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const newFee = {
      id: `CF${String(customFees.length + 1).padStart(3, '0')}`,
      userId: customFeeForm.userId,
      userName: selectedUser?.name || '',
      userEmail: selectedUser?.email || '',
      name: customFeeForm.name,
      description: customFeeForm.description,
      feeType: customFeeForm.feeType,
      rate: customFeeForm.feeType === 'rate' ? parseFloat(customFeeForm.rate) : 0,
      amount: customFeeForm.feeType === 'flat_fee' ? parseFloat(customFeeForm.amount) : 0,
      appliedTo: customFeeForm.appliedTo,
      status: 'Active',
      createdAt: formattedDate,
    };
    
    setCustomFees([...customFees, newFee]);
    setShowCustomFeeDialog(false);
    setCustomFeeForm({
      userId: '',
      name: '',
      description: '',
      feeType: 'rate',
      rate: '',
      amount: '',
      appliedTo: 'Collection Service',
    });
  };

  const handleDeleteGeneralFee = (id: string) => {
    setGeneralFees(generalFees.filter(fee => fee.id !== id));
  };

  const handleDeleteCustomFee = (id: string) => {
    setCustomFees(customFees.filter(fee => fee.id !== id));
  };

  const renderGeneralFeesTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-gray-900">General Fee Configuration</h3>
          <p className="text-sm text-gray-500 mt-1">
            These fees apply to all businesses and customers using the service
          </p>
        </div>
        <Dialog open={showGeneralFeeDialog} onOpenChange={setShowGeneralFeeDialog}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add General Fee
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add General Fee</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Fee Name</Label>
                <Input
                  placeholder="e.g., Collection Fee, Transfer Fee"
                  value={generalFeeForm.name}
                  onChange={(e) => setGeneralFeeForm({ ...generalFeeForm, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Input
                  placeholder="Brief description of the fee"
                  value={generalFeeForm.description}
                  onChange={(e) => setGeneralFeeForm({ ...generalFeeForm, description: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Fee Type</Label>
                <Select
                  value={generalFeeForm.feeType}
                  onValueChange={(value) => setGeneralFeeForm({ ...generalFeeForm, feeType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rate">Rate (%)</SelectItem>
                    <SelectItem value="flat_fee">Flat Fee (₵)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {generalFeeForm.feeType === 'rate' ? (
                <div className="space-y-2">
                  <Label>Rate (%)</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="e.g., 1.5"
                      value={generalFeeForm.rate}
                      onChange={(e) => setGeneralFeeForm({ ...generalFeeForm, rate: e.target.value })}
                    />
                    <Percent className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label>Amount (₵)</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="e.g., 5.00"
                      value={generalFeeForm.amount}
                      onChange={(e) => setGeneralFeeForm({ ...generalFeeForm, amount: e.target.value })}
                    />
                    <DollarSign className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label>Applied To / Service Name</Label>
                <Select
                  value={generalFeeForm.appliedTo}
                  onValueChange={(value) => setGeneralFeeForm({ ...generalFeeForm, appliedTo: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Collection Service">Collection Service</SelectItem>
                    <SelectItem value="Disbursement Service">Disbursement Service</SelectItem>
                    <SelectItem value="Transfer Service">Transfer Service</SelectItem>
                    <SelectItem value="Card Payment Service">Card Payment Service</SelectItem>
                    <SelectItem value="Mobile Money Service">Mobile Money Service</SelectItem>
                    <SelectItem value="Bank Transfer Service">Bank Transfer Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setShowGeneralFeeDialog(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleAddGeneralFee}
                  disabled={!generalFeeForm.name || !generalFeeForm.description || (generalFeeForm.feeType === 'rate' ? !generalFeeForm.rate : !generalFeeForm.amount)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Add Fee
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Name</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Description</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Fee Type</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Rate</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Amount</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Applied To / Service</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Created At</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {generalFees.map((fee) => (
                <tr key={fee.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">{fee.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-600 max-w-xs truncate">{fee.description}</td>
                  <td className="py-3 px-4">
                    <Badge variant="outline" className="text-xs">
                      {fee.feeType}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {fee.feeType === 'rate' ? `${fee.rate}%` : '-'}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {fee.feeType === 'flat_fee' ? formatCurrency(fee.amount) : '-'}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{fee.appliedTo}</td>
                  <td className="py-3 px-4">
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      {fee.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{fee.createdAt}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4 text-gray-600" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteGeneralFee(fee.id)}
                      >
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

  const renderCustomFeesTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-gray-900">Custom Fee Configuration</h3>
          <p className="text-sm text-gray-500 mt-1">
            These fees are attached to specific users/businesses
          </p>
        </div>
        <Dialog open={showCustomFeeDialog} onOpenChange={setShowCustomFeeDialog}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Custom Fee
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Custom Fee</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Select User</Label>
                <Select
                  value={customFeeForm.userId}
                  onValueChange={(value) => setCustomFeeForm({ ...customFeeForm, userId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a user" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockUsers.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Fee Name</Label>
                <Input
                  placeholder="e.g., VIP Collection Fee, Special Rate"
                  value={customFeeForm.name}
                  onChange={(e) => setCustomFeeForm({ ...customFeeForm, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Input
                  placeholder="Brief description of the custom fee"
                  value={customFeeForm.description}
                  onChange={(e) => setCustomFeeForm({ ...customFeeForm, description: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Fee Type</Label>
                <Select
                  value={customFeeForm.feeType}
                  onValueChange={(value) => setCustomFeeForm({ ...customFeeForm, feeType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rate">Rate (%)</SelectItem>
                    <SelectItem value="flat_fee">Flat Fee (₵)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {customFeeForm.feeType === 'rate' ? (
                <div className="space-y-2">
                  <Label>Rate (%)</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="e.g., 1.5"
                      value={customFeeForm.rate}
                      onChange={(e) => setCustomFeeForm({ ...customFeeForm, rate: e.target.value })}
                    />
                    <Percent className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label>Amount (₵)</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="e.g., 5.00"
                      value={customFeeForm.amount}
                      onChange={(e) => setCustomFeeForm({ ...customFeeForm, amount: e.target.value })}
                    />
                    <DollarSign className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label>Applied To / Service Name</Label>
                <Select
                  value={customFeeForm.appliedTo}
                  onValueChange={(value) => setCustomFeeForm({ ...customFeeForm, appliedTo: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Collection Service">Collection Service</SelectItem>
                    <SelectItem value="Disbursement Service">Disbursement Service</SelectItem>
                    <SelectItem value="Transfer Service">Transfer Service</SelectItem>
                    <SelectItem value="Card Payment Service">Card Payment Service</SelectItem>
                    <SelectItem value="Mobile Money Service">Mobile Money Service</SelectItem>
                    <SelectItem value="Bank Transfer Service">Bank Transfer Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setShowCustomFeeDialog(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleAddCustomFee}
                  disabled={!customFeeForm.userId || !customFeeForm.name || !customFeeForm.description || (customFeeForm.feeType === 'rate' ? !customFeeForm.rate : !customFeeForm.amount)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Add Fee
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-sm text-gray-600">User</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Name</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Description</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Fee Type</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Rate</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Amount</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Applied To / Service</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Created At</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customFees.map((fee) => (
                <tr key={fee.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-900">{fee.userName}</p>
                        <p className="text-xs text-gray-500">{fee.userEmail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">{fee.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-600 max-w-xs truncate">{fee.description}</td>
                  <td className="py-3 px-4">
                    <Badge variant="outline" className="text-xs">
                      {fee.feeType}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {fee.feeType === 'rate' ? `${fee.rate}%` : '-'}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {fee.feeType === 'flat_fee' ? formatCurrency(fee.amount) : '-'}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{fee.appliedTo}</td>
                  <td className="py-3 px-4">
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      {fee.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{fee.createdAt}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4 text-gray-600" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteCustomFee(fee.id)}
                      >
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Fee Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Configure general and custom fee structures for transactions
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Fees Today</p>
              <p className="text-2xl text-gray-900 mt-1">{formatCurrency(8450.75)}</p>
              <p className="text-sm text-green-600 mt-1">+12.5% from yesterday</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">General Fees</p>
              <p className="text-2xl text-gray-900 mt-1">{generalFees.length}</p>
              <p className="text-sm text-gray-500 mt-1">Active rules</p>
            </div>
            <div className="p-3 rounded-lg bg-green-100">
              <Percent className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Custom Fees</p>
              <p className="text-2xl text-gray-900 mt-1">{customFees.length}</p>
              <p className="text-sm text-gray-500 mt-1">User-specific rules</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-100">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Monthly Revenue</p>
              <p className="text-2xl text-gray-900 mt-1">{formatCurrency(245890.50)}</p>
              <p className="text-sm text-green-600 mt-1">+18.3% this month</p>
            </div>
            <div className="p-3 rounded-lg bg-orange-100">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:w-auto">
          <TabsTrigger value="general">General Fees</TabsTrigger>
          <TabsTrigger value="custom">Custom Fees</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          {renderGeneralFeesTab()}
        </TabsContent>

        <TabsContent value="custom" className="mt-6">
          {renderCustomFeesTab()}
        </TabsContent>
      </Tabs>
    </div>
  );
}
