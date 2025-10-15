import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Activity, Server, Database, Zap, HardDrive, AlertCircle, CheckCircle } from 'lucide-react';
import { mockSystemHealth } from '../utils/mockData';

export function SystemHealth() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">System Health & Operations</h2>
        <p className="text-sm text-gray-500 mt-1">Monitor system performance and operational metrics</p>
      </div>

      {/* Overall Status */}
      <Card className="p-6 bg-green-50 border-2 border-green-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl text-gray-900">All Systems Operational</h3>
              <p className="text-sm text-gray-600 mt-1">Last updated: {new Date().toLocaleTimeString()}</p>
            </div>
          </div>
          <Button variant="outline">View Status Page</Button>
        </div>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'API Uptime', value: `${mockSystemHealth.apiUptime}%`, icon: Activity, status: 'good' },
          { label: 'Avg Response Time', value: `${mockSystemHealth.avgResponseTime}ms`, icon: Zap, status: 'good' },
          { label: 'Active Connections', value: mockSystemHealth.activeConnections.toLocaleString(), icon: Server, status: 'good' },
          { label: 'Error Rate', value: `${mockSystemHealth.errorRate}%`, icon: AlertCircle, status: mockSystemHealth.errorRate < 0.5 ? 'good' : 'warning' },
        ].map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Icon className="w-5 h-5 text-blue-600" />
                <span className={`w-2 h-2 rounded-full ${metric.status === 'good' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
              </div>
              <p className="text-sm text-gray-600">{metric.label}</p>
              <p className="text-2xl text-gray-900 mt-1">{metric.value}</p>
            </Card>
          );
        })}
      </div>

      {/* Services Status */}
      <Card className="p-6">
        <h3 className="text-gray-900 mb-4">Core Services</h3>
        <div className="space-y-3">
          {[
            { name: 'API Gateway', status: 'operational', uptime: 99.98, lastDeploy: '2025-10-07' },
            { name: 'Payment Processing', status: 'operational', uptime: 99.95, lastDeploy: '2025-10-05' },
            { name: 'Settlement Engine', status: 'operational', uptime: 99.99, lastDeploy: '2025-10-01' },
            { name: 'KYC Service', status: 'operational', uptime: 99.90, lastDeploy: '2025-10-08' },
            { name: 'Notification Service', status: 'degraded', uptime: 98.50, lastDeploy: '2025-10-09' },
            { name: 'Reconciliation Worker', status: 'operational', uptime: 99.97, lastDeploy: '2025-10-06' },
          ].map((service, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className={`w-3 h-3 rounded-full ${
                  service.status === 'operational' ? 'bg-green-500' :
                  service.status === 'degraded' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}></span>
                <div>
                  <p className="text-sm text-gray-900">{service.name}</p>
                  <p className="text-xs text-gray-500">Last deploy: {service.lastDeploy}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-900">{service.uptime}% uptime</p>
                  <p className="text-xs text-gray-500">30-day average</p>
                </div>
                <Badge variant={service.status === 'operational' ? 'default' : 'secondary'}>
                  {service.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Infrastructure */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-gray-900 mb-4">Database Performance</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Primary DB Load</span>
                <span className="text-sm text-gray-900">42%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Replica Lag</span>
                <span className="text-sm text-gray-900">{mockSystemHealth.dbReplicationLag}s</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '5%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Connection Pool</span>
                <span className="text-sm text-gray-900">78/200</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '39%' }}></div>
              </div>
            </div>
            <div className="pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Last Backup</span>
                <span className="text-sm text-gray-900">{new Date(mockSystemHealth.lastBackup).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-gray-900 mb-4">Storage & Resources</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Disk Usage</span>
                <span className="text-sm text-gray-900">1.2 TB / 2 TB</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Memory Usage</span>
                <span className="text-sm text-gray-900">12 GB / 32 GB</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '37.5%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">CPU Usage</span>
                <span className="text-sm text-gray-900">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Background Jobs */}
      <Card className="p-6">
        <h3 className="text-gray-900 mb-4">Background Workers & Queue Status</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm text-gray-700">Worker</th>
                <th className="text-left py-3 px-4 text-sm text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm text-gray-700">Queue Length</th>
                <th className="text-left py-3 px-4 text-sm text-gray-700">Processing Rate</th>
                <th className="text-left py-3 px-4 text-sm text-gray-700">Failed (24h)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Settlement Processor', status: 'running', queue: 5, rate: '120/min', failed: 0 },
                { name: 'KYC Document Processor', status: 'running', queue: 12, rate: '45/min', failed: 2 },
                { name: 'Email Dispatcher', status: 'running', queue: 234, rate: '500/min', failed: 5 },
                { name: 'Reconciliation Worker', status: 'running', queue: 2, rate: '30/min', failed: 0 },
                { name: 'Report Generator', status: 'idle', queue: 0, rate: '0/min', failed: 0 },
              ].map((worker, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-900">{worker.name}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                      worker.status === 'running' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {worker.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">{worker.queue}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{worker.rate}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{worker.failed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Recent Incidents */}
      <Card className="p-6">
        <h3 className="text-gray-900 mb-4">Recent Incidents</h3>
        <div className="space-y-3">
          {[
            { title: 'Notification Service Degradation', status: 'investigating', severity: 'medium', time: '1 hour ago', description: 'Email delivery delays observed' },
            { title: 'API Latency Spike', status: 'resolved', severity: 'low', time: '6 hours ago', description: 'Brief increase in response times - auto-scaled' },
          ].map((incident, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center space-x-3">
                    <h4 className="text-gray-900">{incident.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      incident.status === 'resolved' ? 'bg-green-100 text-green-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {incident.status}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      incident.severity === 'high' ? 'bg-red-100 text-red-700' :
                      incident.severity === 'medium' ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {incident.severity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{incident.description}</p>
                </div>
                <span className="text-xs text-gray-500">{incident.time}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
