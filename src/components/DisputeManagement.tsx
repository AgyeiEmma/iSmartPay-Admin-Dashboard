import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ClipboardList, Search, Upload, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import { formatCurrency } from '../utils/currency';
import { mockDisputes } from '../utils/mockData';

export function DisputeManagement() {
  const disputeStats = {
    open: 15,
    underReview: 8,
    resolved: 142,
    avgResolutionTime: '3.2 days',
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">Dispute & Chargeback Management</h2>
        <p className="text-sm text-gray-500 mt-1">Handle transaction disputes and chargeback cases</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Open Disputes', value: disputeStats.open, icon: ClipboardList, color: 'blue' },
          { label: 'Under Review', value: disputeStats.underReview, icon: Clock, color: 'yellow' },
          { label: 'Resolved (30d)', value: disputeStats.resolved, icon: CheckCircle, color: 'green' },
          { label: 'Avg Resolution Time', value: disputeStats.avgResolutionTime, icon: Clock, color: 'purple' },
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

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="bg-gray-100">
          <TabsTrigger value="active">Active Disputes</TabsTrigger>
          <TabsTrigger value="chargebacks">Chargebacks</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {/* Filters */}
          <Card className="p-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input placeholder="Search by transaction ID, user name..." className="pl-10" />
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg">
                <option>All Status</option>
                <option>Open</option>
                <option>Under Review</option>
                <option>Pending Evidence</option>
              </select>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <ClipboardList className="w-4 h-4 mr-2" />
                New Dispute
              </Button>
            </div>
          </Card>

          {/* Disputes List */}
          <div className="space-y-4">
            {[
              ...mockDisputes,
              { id: 'DSP-003', transactionId: 'TXN-20251003-045', userId: 3, userName: 'Kofi Asante', amount: 850.00, reason: 'Duplicate charge', status: 'pending_evidence', createdAt: '2025-10-06T16:20:00' },
            ].map(dispute => (
              <Card key={dispute.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-gray-900">{dispute.id}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        dispute.status === 'open' ? 'bg-blue-100 text-blue-700' :
                        dispute.status === 'under_review' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {dispute.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Transaction ID</p>
                        <p className="text-gray-900">{dispute.transactionId}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">User</p>
                        <p className="text-gray-900">{dispute.userName}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Amount</p>
                        <p className="text-gray-900">{formatCurrency(dispute.amount)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Created</p>
                        <p className="text-gray-900">{new Date(dispute.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-gray-500 text-sm">Reason</p>
                      <p className="text-gray-900">{dispute.reason}</p>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button size="sm" variant="outline" className="text-blue-700 border-blue-200">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Evidence
                    </Button>
                  </div>
                </div>

                {/* Timeline */}
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm text-gray-700 mb-3">Case Timeline</h4>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">Dispute created by customer</p>
                        <p className="text-xs text-gray-500">{new Date(dispute.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                    {dispute.status !== 'open' && (
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-yellow-600 rounded-full mt-1.5"></div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">Assigned to support team for review</p>
                          <p className="text-xs text-gray-500">2 hours ago</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="chargebacks" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Chargeback Cases</h3>
            <div className="space-y-3">
              {[
                { id: 'CB-001', txnId: 'TXN-20251001-234', merchant: 'Yaw Owusu Trading', amount: 2400.00, reason: 'Fraudulent', status: 'representment', deadline: '2025-10-15' },
                { id: 'CB-002', txnId: 'TXN-20250928-156', merchant: 'Accra Mart Ltd', amount: 890.00, reason: 'Not as described', status: 'pending', deadline: '2025-10-12' },
              ].map((cb) => (
                <Card key={cb.id} className="p-4 border-2 border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-gray-900">{cb.id}</h4>
                        <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">
                          {cb.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Merchant</p>
                          <p className="text-gray-900">{cb.merchant}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Amount</p>
                          <p className="text-gray-900">{formatCurrency(cb.amount)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Deadline</p>
                          <p className="text-red-600">{cb.deadline}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">Reason: {cb.reason}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" className="text-blue-700 border-blue-200">
                        Respond
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="resolved" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Recently Resolved Disputes</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm text-gray-700">Dispute ID</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-700">User</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-700">Amount</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-700">Resolution</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-700">Resolved Date</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-700">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 'DSP-098', user: 'Ama Osei', amount: 450.00, resolution: 'Refunded', date: '2025-10-08', duration: '2 days' },
                    { id: 'DSP-097', user: 'Kwame Mensah', amount: 1200.00, resolution: 'Merchant favor', date: '2025-10-07', duration: '4 days' },
                    { id: 'DSP-096', user: 'Yaw Owusu', amount: 680.00, resolution: 'Partial refund', date: '2025-10-06', duration: '3 days' },
                  ].map((dispute, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm text-gray-900">{dispute.id}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{dispute.user}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{formatCurrency(dispute.amount)}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                          dispute.resolution === 'Refunded' ? 'bg-green-100 text-green-700' :
                          dispute.resolution === 'Merchant favor' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {dispute.resolution}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{dispute.date}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{dispute.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-gray-900 mb-4">Dispute Reasons Breakdown</h3>
              <div className="space-y-3">
                {[
                  { reason: 'Unauthorized transaction', count: 45, percentage: 32 },
                  { reason: 'Service not received', count: 32, percentage: 23 },
                  { reason: 'Duplicate charge', count: 28, percentage: 20 },
                  { reason: 'Amount incorrect', count: 21, percentage: 15 },
                  { reason: 'Other', count: 16, percentage: 10 },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-900">{item.reason}</span>
                      <span className="text-sm text-gray-600">{item.count} ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-gray-900 mb-4">Resolution Outcomes</h3>
              <div className="space-y-3">
                {[
                  { outcome: 'Customer favor (Refunded)', count: 78, color: 'green' },
                  { outcome: 'Merchant favor (No refund)', count: 42, color: 'blue' },
                  { outcome: 'Partial refund', count: 18, color: 'yellow' },
                  { outcome: 'Pending investigation', count: 4, color: 'orange' },
                ].map((item, index) => (
                  <div key={index} className={`p-3 border-l-4 border-${item.color}-500 bg-${item.color}-50`}>
                    <p className="text-sm text-gray-900">{item.outcome}</p>
                    <p className="text-xs text-gray-600 mt-1">{item.count} cases</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
