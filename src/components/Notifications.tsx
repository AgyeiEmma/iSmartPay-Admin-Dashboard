import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Bell, Mail, MessageSquare, Send } from 'lucide-react';

export function Notifications() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Notification Center</h2>
          <p className="text-sm text-gray-500 mt-1">Manage notifications and communication templates</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Send className="w-4 h-4 mr-2" />
          Send Notification
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Sent (Today)', value: '3,247', icon: Send },
          { label: 'Email Delivered', value: '98.5%', icon: Mail },
          { label: 'SMS Delivered', value: '99.2%', icon: MessageSquare },
          { label: 'Active Templates', value: '28', icon: Bell },
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

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList className="bg-gray-100">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="manual">Send Manual</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Notification Templates</h3>
            <div className="space-y-3">
              {[
                { name: 'KYC Approval', type: 'Email + SMS', trigger: 'KYC status change', enabled: true },
                { name: 'Transaction Receipt', type: 'Email', trigger: 'Transaction completed', enabled: true },
                { name: 'Settlement Notification', type: 'Email', trigger: 'Settlement approved', enabled: true },
                { name: 'Fraud Alert', type: 'Email + SMS + Push', trigger: 'Suspicious activity', enabled: true },
                { name: 'Low Balance Warning', type: 'SMS', trigger: 'Balance threshold', enabled: false },
              ].map((template, index) => (
                <Card key={index} className="p-4 border-2 border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-gray-900">{template.name}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          template.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {template.enabled ? 'enabled' : 'disabled'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Type: {template.type}</span>
                        <span>•</span>
                        <span>Trigger: {template.trigger}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" className="text-blue-700 border-blue-200">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        Preview
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="manual" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Send Manual Notification</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-700 mb-2 block">Recipient Type</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option>All Users</option>
                  <option>Specific User</option>
                  <option>User Segment</option>
                  <option>Merchants Only</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-2 block">Channel</label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                    <span className="text-sm">Email</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-sm">SMS</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-sm">Push</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-2 block">Subject</label>
                <Input placeholder="Enter notification subject" />
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-2 block">Message</label>
                <Textarea rows={6} placeholder="Enter notification message..." />
              </div>
              <div className="flex justify-end space-x-3">
                <Button variant="outline">Save as Draft</Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Send className="w-4 h-4 mr-2" />
                  Send Notification
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Recent Notifications</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm text-gray-700">Subject</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-700">Type</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-700">Recipients</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-700">Sent</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-700">Delivered</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { subject: 'Settlement Approved', type: 'Email', recipients: 45, sent: '10:30 AM', delivered: 44, status: 'completed' },
                    { subject: 'KYC Verification Complete', type: 'SMS', recipients: 234, sent: '09:15 AM', delivered: 232, status: 'completed' },
                    { subject: 'Monthly Statement', type: 'Email', recipients: 1847, sent: '08:00 AM', delivered: 1820, status: 'processing' },
                  ].map((notification, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm text-gray-900">{notification.subject}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{notification.type}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{notification.recipients}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{notification.sent}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{notification.delivered}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                          notification.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {notification.status}
                        </span>
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
