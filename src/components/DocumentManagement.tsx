import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { FolderOpen, Upload, Search, FileText, Download, Eye } from 'lucide-react';

export function DocumentManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Document Management</h2>
          <p className="text-sm text-gray-500 mt-1">Manage KYC documents, contracts, and compliance records</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Documents', value: '12,847', icon: FileText },
          { label: 'Pending Review', value: '234', icon: Eye },
          { label: 'Expiring Soon', value: '45', icon: FolderOpen },
          { label: 'Storage Used', value: '28.4 GB', icon: Upload },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className="p-2 rounded-lg bg-blue-100">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="Search documents..." className="pl-10" />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg">
            <option>All Types</option>
            <option>KYC Documents</option>
            <option>Contracts</option>
            <option>Compliance</option>
            <option>Dispute Evidence</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg">
            <option>All Status</option>
            <option>Verified</option>
            <option>Pending</option>
            <option>Expired</option>
          </select>
        </div>
      </Card>

      {/* Documents Table */}
      <Card className="p-6">
        <h3 className="text-gray-900 mb-4">Recent Documents</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm text-gray-700">Document Name</th>
                <th className="text-left py-3 px-4 text-sm text-gray-700">Type</th>
                <th className="text-left py-3 px-4 text-sm text-gray-700">Owner</th>
                <th className="text-left py-3 px-4 text-sm text-gray-700">Uploaded</th>
                <th className="text-left py-3 px-4 text-sm text-gray-700">Expiry</th>
                <th className="text-left py-3 px-4 text-sm text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Ghana_Card_KM123.pdf', type: 'KYC', owner: 'Kwame Mensah', uploaded: '2025-10-08', expiry: '2030-05-15', status: 'verified' },
                { name: 'Passport_AO456.pdf', type: 'KYC', owner: 'Ama Osei', uploaded: '2025-10-07', expiry: '2028-03-20', status: 'verified' },
                { name: 'Business_Cert_YOT.pdf', type: 'Contract', owner: 'Yaw Owusu Trading', uploaded: '2025-10-05', expiry: null, status: 'verified' },
                { name: 'Drivers_License_KA789.pdf', type: 'KYC', owner: 'Kofi Asante', uploaded: '2025-10-09', expiry: '2026-11-30', status: 'pending' },
                { name: 'Proof_Address_AB234.pdf', type: 'KYC', owner: 'Akua Boateng', uploaded: '2025-09-15', expiry: '2025-12-15', status: 'expiring' },
              ].map((doc, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-900">{doc.name}</td>
                  <td className="py-3 px-4">
                    <Badge variant="outline">{doc.type}</Badge>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">{doc.owner}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{doc.uploaded}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{doc.expiry || 'N/A'}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                      doc.status === 'verified' ? 'bg-green-100 text-green-700' :
                      doc.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Document Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { category: 'KYC Documents', count: 8234, size: '12.4 GB', icon: '🆔' },
          { category: 'Contracts & Agreements', count: 456, size: '3.2 GB', icon: '📄' },
          { category: 'Compliance Records', count: 2341, size: '8.9 GB', icon: '✅' },
          { category: 'Dispute Evidence', count: 342, size: '2.1 GB', icon: '⚖️' },
          { category: 'Audit Reports', count: 156, size: '1.2 GB', icon: '📊' },
          { category: 'System Logs', count: 1318, size: '0.6 GB', icon: '📝' },
        ].map((cat, index) => (
          <Card key={index} className="p-4 border-2 border-gray-100 hover:border-blue-200 transition-colors cursor-pointer">
            <div className="text-2xl mb-2">{cat.icon}</div>
            <h4 className="text-gray-900 mb-1">{cat.category}</h4>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">{cat.count.toLocaleString()} files</span>
              <span className="text-gray-500">{cat.size}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
