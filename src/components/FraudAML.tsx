import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { AlertTriangle, Shield, TrendingUp, Users, Search, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';
import { formatCurrency } from '../utils/currency';
import { mockAlerts, mockTransactions } from '../utils/mockData';

export function FraudAML() {
  const [selectedAlert, setSelectedAlert] = useState<number | null>(null);

  const alertStats = {
    open: 23,
    investigating: 15,
    resolved: 187,
    highRisk: 8,
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">Fraud & AML Monitoring</h2>
        <p className="text-sm text-gray-500 mt-1">Real-time transaction monitoring and suspicious activity detection</p>
      </div>

      {/* Alert Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Open Alerts', value: alertStats.open, icon: AlertTriangle, color: 'orange' },
          { label: 'Investigating', value: alertStats.investigating, icon: Eye, color: 'blue' },
          { label: 'Resolved (Today)', value: alertStats.resolved, color: 'green', icon: CheckCircle },
          { label: 'High Risk', value: alertStats.highRisk, color: 'red', icon: Shield },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                  <Icon className={`w-5 h-5 text-${stat.color}-600`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="alerts" className="space-y-4">
        <TabsList className="bg-gray-100">
          <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
          <TabsTrigger value="rules">Monitoring Rules</TabsTrigger>
          <TabsTrigger value="cases">Case Management</TabsTrigger>
          <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-4">
          {/* Filters */}
          <Card className="p-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input placeholder="Search alerts by user, transaction ID..." className="pl-10" />
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg">
                <option>All Severity</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg">
                <option>All Status</option>
                <option>Open</option>
                <option>Investigating</option>
                <option>Resolved</option>
              </select>
            </div>
          </Card>

          {/* Alerts Table */}
          <Card className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm text-gray-700">Alert ID</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-700">Type</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-700">Severity</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-700">User</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-700">Description</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-700">Time</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockAlerts.map(alert => (
                    <tr key={alert.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">ALT-{alert.id.toString().padStart(4, '0')}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline">{alert.type.replace('_', ' ')}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                          alert.severity === 'high' ? 'bg-red-100 text-red-700' :
                          alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {alert.severity}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">{alert.userName}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{alert.description}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(alert.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                          alert.status === 'open' ? 'bg-orange-100 text-orange-700' :
                          alert.status === 'investigating' ? 'bg-blue-100 text-blue-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {alert.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline" className="text-blue-700 border-blue-200">
                            Investigate
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Active Monitoring Rules</h3>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Add New Rule</Button>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Velocity Check - Multiple Transactions', condition: 'More than 5 transactions in 1 hour', action: 'Flag as High Risk', status: 'active', triggered: 12 },
                { name: 'High Value Transaction', condition: 'Single transaction > GHS 10,000', action: 'Manual Review Required', status: 'active', triggered: 8 },
                { name: 'Unusual Pattern Detection', condition: 'ML model score > 0.85', action: 'Create Alert', status: 'active', triggered: 23 },
                { name: 'Cross-Border Activity', condition: 'International transaction detected', action: 'Enhanced Due Diligence', status: 'active', triggered: 5 },
                { name: 'Round Amount Pattern', condition: 'Multiple round amounts in sequence', action: 'Flag for Review', status: 'paused', triggered: 0 },
              ].map((rule, index) => (
                <Card key={index} className="p-4 border-2 border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-gray-900">{rule.name}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          rule.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {rule.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1"><strong>Condition:</strong> {rule.condition}</p>
                      <p className="text-sm text-gray-600"><strong>Action:</strong> {rule.action}</p>
                      <p className="text-sm text-gray-500 mt-2">Triggered {rule.triggered} times in last 24h</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="outline">
                        {rule.status === 'active' ? 'Pause' : 'Activate'}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="cases" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Investigation Cases</h3>
            <div className="space-y-3">
              {[
                { id: 'CASE-001', user: 'Kwame Mensah', reason: 'Velocity breach - 8 transactions in 30 mins', priority: 'high', assigned: 'Sarah Johnson', status: 'open', created: '2025-10-09' },
                { id: 'CASE-002', user: 'Akua Boateng', reason: 'Unusual pattern detected by ML model', priority: 'medium', assigned: 'Michael Chen', status: 'investigating', created: '2025-10-08' },
                { id: 'CASE-003', user: 'Yaw Owusu', reason: 'Threshold breach - Single txn GHS 25,000', priority: 'high', assigned: 'Sarah Johnson', status: 'pending_sar', created: '2025-10-08' },
              ].map((caseItem) => (
                <Card key={caseItem.id} className="p-4 border-2 border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-gray-900">{caseItem.id}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          caseItem.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {caseItem.priority} priority
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                          {caseItem.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-900 mb-1">User: {caseItem.user}</p>
                      <p className="text-sm text-gray-600 mb-2">{caseItem.reason}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Created: {caseItem.created}</span>
                        <span>Assigned to: {caseItem.assigned}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" className="text-blue-700 border-blue-200">
                        Open Case
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="watchlist" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Watchlist & Sanctions Screening</h3>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Add to Watchlist</Button>
            </div>
            <div className="mb-4">
              <Input placeholder="Search watchlist entries..." />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-700">Type</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-700">Reason</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-700">Added Date</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'John Doe', type: 'Individual', reason: 'Sanctions List Match', date: '2025-09-15', status: 'active' },
                    { name: 'ABC Trading Ltd', type: 'Entity', reason: 'High Risk Jurisdiction', date: '2025-08-20', status: 'active' },
                    { name: 'Jane Smith', type: 'Individual', reason: 'PEP Screening', date: '2025-07-10', status: 'under_review' },
                  ].map((entry, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm text-gray-900">{entry.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{entry.type}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{entry.reason}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{entry.date}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                          entry.status === 'active' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {entry.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Button size="sm" variant="outline">View Details</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
