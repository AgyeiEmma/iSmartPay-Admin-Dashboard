import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Plug, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { mockIntegrations } from '../utils/mockData';

export function Integrations() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Integrations & Connectors</h2>
          <p className="text-sm text-gray-500 mt-1">Manage partner integrations and API connections</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plug className="w-4 h-4 mr-2" />
          Add Integration
        </Button>
      </div>

      {/* Integration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockIntegrations.map(integration => (
          <Card key={integration.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-gray-900">{integration.name}</h3>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                    integration.status === 'active' ? 'bg-green-100 text-green-700' :
                    integration.status === 'degraded' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {integration.status}
                  </span>
                </div>
                <Badge variant="outline">{integration.type.replace('_', ' ')}</Badge>
              </div>
              <Plug className="w-5 h-5 text-blue-600" />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Uptime (30d)</p>
                <p className="text-gray-900">{integration.uptime}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Heartbeat</p>
                <p className="text-gray-900">{new Date(integration.lastHeartbeat).toLocaleTimeString()}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="flex-1">Configure</Button>
              <Button size="sm" variant="outline" className="flex-1">Test</Button>
              <Button size="sm" variant="outline" className="flex-1">Logs</Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Health Monitoring */}
      <Card className="p-6">
        <h3 className="text-gray-900 mb-4">Integration Health Monitoring</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm text-gray-700">Integration</th>
                <th className="text-left py-3 px-4 text-sm text-gray-700">API Calls (24h)</th>
                <th className="text-left py-3 px-4 text-sm text-gray-700">Success Rate</th>
                <th className="text-left py-3 px-4 text-sm text-gray-700">Avg Latency</th>
                <th className="text-left py-3 px-4 text-sm text-gray-700">Errors</th>
              </tr>
            </thead>
            <tbody>
              {mockIntegrations.map((integration, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-900">{integration.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {Math.floor(Math.random() * 10000).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {integration.status === 'active' ? '99.8%' : '95.2%'}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {Math.floor(Math.random() * 300 + 100)}ms
                  </td>
                  <td className="py-3 px-4 text-sm text-red-600">
                    {integration.status === 'active' ? '12' : '156'}
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
