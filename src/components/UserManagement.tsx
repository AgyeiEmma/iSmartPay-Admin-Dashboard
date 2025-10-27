import { useState } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Search, Filter, Eye, Edit, Ban, Check, X } from 'lucide-react';

const users = [
  {
    id: 'USR001',
    name: 'Kwame Asante',
    email: 'kwame.asante@email.com',
    phone: '+233 24 123 4567',
    status: 'Active',
    kycStatus: 'Verified',
    joinDate: '2024-01-15',
    totalTransactions: 45,
    totalVolume: 125000,
    lastActive: '2 hours ago'
  },
  {
    id: 'USR002',
    name: 'Ama Boateng',
    email: 'ama.boateng@email.com',
    phone: '+233 20 987 6543',
    status: 'Active',
    kycStatus: 'Pending',
    joinDate: '2024-02-20',
    totalTransactions: 28,
    totalVolume: 89000,
    lastActive: '1 day ago'
  },
  {
    id: 'USR003',
    name: 'Kofi Mensah',
    email: 'kofi.mensah@email.com',
    phone: '+233 26 555 7890',
    status: 'Suspended',
    kycStatus: 'Rejected',
    joinDate: '2024-01-08',
    totalTransactions: 12,
    totalVolume: 35000,
    lastActive: '1 week ago'
  },
  {
    id: 'USR004',
    name: 'Akosua Darkwa',
    email: 'akosua.darkwa@email.com',
    phone: '+233 54 222 3456',
    status: 'Active',
    kycStatus: 'Verified',
    joinDate: '2024-03-10',
    totalTransactions: 67,
    totalVolume: 198000,
    lastActive: '30 mins ago'
  },
  {
    id: 'USR005',
    name: 'Yaw Osei',
    email: 'yaw.osei@email.com',
    phone: '+233 23 444 5678',
    status: 'Inactive',
    kycStatus: 'Pending',
    joinDate: '2024-02-05',
    totalTransactions: 8,
    totalVolume: 22000,
    lastActive: '2 weeks ago'
  }
];

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || user.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      case 'suspended': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getKYCStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'verified': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatCurrency = (amount: number) => `₵${amount.toLocaleString()}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage and monitor user accounts</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Add New User
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search users by name, email, or ID..."
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">User</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Contact</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">KYC</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Transactions</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Volume</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Last Active</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.id}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm text-gray-900">{user.email}</p>
                      <p className="text-sm text-gray-500">{user.phone}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Badge className={getKYCStatusColor(user.kycStatus)}>
                      {user.kycStatus}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">{user.totalTransactions}</td>
                  <td className="py-3 px-4 text-sm font-medium">{formatCurrency(user.totalVolume)}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">{user.lastActive}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedUser(user)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>User Details - {user.name}</DialogTitle>
                          </DialogHeader>
                          {selectedUser && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-600">User ID</label>
                                  <p className="text-sm text-gray-900">{selectedUser.id}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-600">Join Date</label>
                                  <p className="text-sm text-gray-900">{selectedUser.joinDate}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-600">Email</label>
                                  <p className="text-sm text-gray-900">{selectedUser.email}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-600">Phone</label>
                                  <p className="text-sm text-gray-900">{selectedUser.phone}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-600">Account Status</label>
                                  <Badge className={getStatusColor(selectedUser.status)}>
                                    {selectedUser.status}
                                  </Badge>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-600">KYC Status</label>
                                  <Badge className={getKYCStatusColor(selectedUser.kycStatus)}>
                                    {selectedUser.kycStatus}
                                  </Badge>
                                </div>
                              </div>
                              
                              <div className="border-t pt-4">
                                <h4 className="font-medium text-gray-900 mb-2">Transaction Summary</h4>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">Total Transactions</label>
                                    <p className="text-sm text-gray-900">{selectedUser.totalTransactions}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">Total Volume</label>
                                    <p className="text-sm text-gray-900">{formatCurrency(selectedUser.totalVolume)}</p>
                                  </div>
                                </div>
                              </div>

                              <div className="border-t pt-4 flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit User
                                </Button>
                                {selectedUser.status === 'Active' ? (
                                  <Button variant="outline" size="sm" className="text-red-600 border-red-200">
                                    <Ban className="w-4 h-4 mr-2" />
                                    Suspend User
                                  </Button>
                                ) : (
                                  <Button variant="outline" size="sm" className="text-green-600 border-green-200">
                                    <Check className="w-4 h-4 mr-2" />
                                    Activate User
                                  </Button>
                                )}
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      
                      {user.status === 'Active' ? (
                        <Button variant="outline" size="sm" className="text-red-600 border-red-200">
                          <Ban className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" className="text-green-600 border-green-200">
                          <Check className="w-4 h-4" />
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