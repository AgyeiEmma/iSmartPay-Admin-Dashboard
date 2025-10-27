import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Code, Key, TrendingUp, Users } from 'lucide-react';

export function APIManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">API Management</h2>
          <p className="text-sm text-gray-500 mt-1">Manage API keys, rate limits, and developer access</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Key className="w-4 h-4 mr-2" />
          Generate API Key
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active API Keys', value: '127', icon: Key },
          { label: 'API Calls (24h)', value: '847,234', icon: TrendingUp },
          { label: 'Partners', value: '45', icon: Users },
          { label: 'Avg Response Time', value: '145ms', icon: Code },
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

      {/* API Keys */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Active API Keys</h3>
          <Input placeholder="Search keys..." className="w-64" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm text-gray-700">Partner Name</th>
                <th className="text-left py-3 px-4 text-sm text-gray-700">API Key</th>
                <th className="text-left py-3 px-4 text-sm text-gray-700">Environment</th>
                <th className="text-left py-3 px-4 text-sm text-gray-700">Rate Limit</th>
                <th className="text-left py-3 px-4 text-sm text-gray-700">Usage (24h)</th>
                <th className="text-left py-3 px-4 text-sm text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { partner: 'Acme Corp', key: 'pk_live_abc123...', env: 'production', limit: '10,000/hr', usage: 7832, status: 'active' },
                { partner: 'TechStart Ghana', key: 'pk_live_def456...', env: 'production', limit: '5,000/hr', usage: 3245, status: 'active' },
                { partner: 'Digital Payments Ltd', key: 'pk_test_ghi789...', env: 'sandbox', limit: '1,000/hr', usage: 234, status: 'active' },
                { partner: 'FinHub Solutions', key: 'pk_live_jkl012...', env: 'production', limit: '20,000/hr', usage: 15678, status: 'suspended' },
              ].map((apiKey, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-900">{apiKey.partner}</td>
                  <td className="py-3 px-4 text-sm text-gray-600 font-mono">{apiKey.key}</td>
                  <td className="py-3 px-4">
                    <Badge variant={apiKey.env === 'production' ? 'default' : 'secondary'}>
                      {apiKey.env}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{apiKey.limit}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{apiKey.usage.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                      apiKey.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {apiKey.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="ghost">Edit</Button>
                      <Button size="sm" variant="ghost">Revoke</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* API Usage Analytics */}
      <Card className="p-6">
        <h3 className="text-gray-900 mb-4">Top API Endpoints (24h)</h3>
        <div className="space-y-3">
          {[
            { endpoint: 'POST /api/v1/transactions', calls: 234567, avgTime: 145, errors: 234 },
            { endpoint: 'GET /api/v1/users/{id}', calls: 156789, avgTime: 87, errors: 12 },
            { endpoint: 'POST /api/v1/kyc/verify', calls: 89234, avgTime: 456, errors: 89 },
            { endpoint: 'GET /api/v1/settlements', calls: 67890, avgTime: 234, errors: 5 },
          ].map((endpoint, index) => (
            <Card key={index} className="p-4 border-2 border-gray-100">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-mono text-gray-900 mb-2">{endpoint.endpoint}</p>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Calls</p>
                      <p className="text-gray-900">{endpoint.calls.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Avg Time</p>
                      <p className="text-gray-900">{endpoint.avgTime}ms</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Errors</p>
                      <p className="text-red-600">{endpoint.errors}</p>
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="outline">View Logs</Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}
