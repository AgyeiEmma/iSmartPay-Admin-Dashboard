import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { TrendingUp, Shield, Users, CreditCard, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

export function LimitsControls() {
  const [dailyLimit, setDailyLimit] = useState([5000]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">Limits & Controls</h2>
        <p className="text-sm text-gray-500 mt-1">Configure transaction limits and risk controls</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Limit Rules', value: '24', icon: Shield },
          { label: 'Limit Overrides', value: '8', icon: AlertCircle },
          { label: 'Breaches (Today)', value: '3', icon: TrendingUp },
          { label: 'Users Near Limit', value: '15', icon: Users },
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

      <Tabs defaultValue="user" className="space-y-4">
        <TabsList className="bg-gray-100">
          <TabsTrigger value="user">User Limits</TabsTrigger>
          <TabsTrigger value="merchant">Merchant Limits</TabsTrigger>
          <TabsTrigger value="channel">Channel Limits</TabsTrigger>
          <TabsTrigger value="overrides">Overrides</TabsTrigger>
        </TabsList>

        <TabsContent value="user" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">User Tier Limits</h3>
            <div className="space-y-6">
              {[
                { tier: 'Tier 1 (Basic KYC)', daily: 1000, monthly: 10000, perTxn: 500, description: 'Phone number verified only' },
                { tier: 'Tier 2 (Standard KYC)', daily: 5000, monthly: 50000, perTxn: 2000, description: 'ID document verified' },
                { tier: 'Tier 3 (Full KYC)', daily: 20000, monthly: 200000, perTxn: 10000, description: 'Full verification with proof of address' },
                { tier: 'Merchant Account', daily: 100000, monthly: 1000000, perTxn: 50000, description: 'Business verification complete' },
              ].map((tier, index) => (
                <Card key={index} className="p-4 border-2 border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-gray-900">{tier.tier}</h4>
                      <p className="text-sm text-gray-500 mt-1">{tier.description}</p>
                    </div>
                    <Button size="sm" variant="outline" className="text-blue-700 border-blue-200">
                      Edit Limits
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Daily Limit</p>
                      <p className="text-gray-900">{formatCurrency(tier.daily)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Monthly Limit</p>
                      <p className="text-gray-900">{formatCurrency(tier.monthly)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Per Transaction</p>
                      <p className="text-gray-900">{formatCurrency(tier.perTxn)}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Configure New Limit</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-700 mb-2 block">User Tier</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                    <option>Tier 1</option>
                    <option>Tier 2</option>
                    <option>Tier 3</option>
                    <option>Merchant</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-700 mb-2 block">Daily Limit: {formatCurrency(dailyLimit[0])}</label>
                  <Slider
                    value={dailyLimit}
                    onValueChange={setDailyLimit}
                    max={50000}
                    step={100}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-700 mb-2 block">Monthly Limit</label>
                  <Input type="number" placeholder="Enter amount" />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-700 mb-2 block">Per Transaction Limit</label>
                  <Input type="number" placeholder="Enter amount" />
                </div>
                <div>
                  <label className="text-sm text-gray-700 mb-2 block">Effective Date</label>
                  <Input type="date" />
                </div>
                <div className="flex items-center space-x-3">
                  <Switch id="auto-block" />
                  <label htmlFor="auto-block" className="text-sm text-gray-700">Auto-block on breach</label>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save Limit Configuration</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="channel" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Channel-Specific Limits</h3>
            <div className="space-y-4">
              {[
                { channel: 'Mobile Money', icon: '📱', dailyLimit: 50000, utilization: 72, status: 'active', riskLevel: 'medium' },
                { channel: 'Bank Transfer', icon: '🏦', dailyLimit: 100000, utilization: 45, status: 'active', riskLevel: 'low' },
                { channel: 'Card Payment', icon: '💳', dailyLimit: 75000, utilization: 88, status: 'active', riskLevel: 'high' },
                { channel: 'USSD', icon: '📞', dailyLimit: 10000, utilization: 34, status: 'active', riskLevel: 'low' },
              ].map((channel, index) => (
                <Card key={index} className="p-4 border-2 border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="text-2xl">{channel.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-gray-900">{channel.channel}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            channel.riskLevel === 'high' ? 'bg-red-100 text-red-700' :
                            channel.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {channel.riskLevel} risk
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Daily Limit</p>
                            <p className="text-gray-900">{formatCurrency(channel.dailyLimit)}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Current Utilization</p>
                            <div className="flex items-center space-x-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    channel.utilization > 80 ? 'bg-red-600' :
                                    channel.utilization > 60 ? 'bg-yellow-600' :
                                    'bg-green-600'
                                  }`}
                                  style={{ width: `${channel.utilization}%` }}
                                ></div>
                              </div>
                              <span className="text-gray-900 text-xs">{channel.utilization}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">Configure</Button>
                      <Switch checked={channel.status === 'active'} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="overrides" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Active Limit Overrides</h3>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Create Override</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm text-gray-700">User</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-700">Original Limit</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-700">Override Limit</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-700">Reason</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-700">Approved By</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-700">Expires</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { user: 'Yaw Owusu', original: 20000, override: 50000, reason: 'Large business transaction', approver: 'John Doe', expires: '2025-10-15' },
                    { user: 'Ama Osei', original: 5000, override: 10000, reason: 'Temporary increase', approver: 'Jane Smith', expires: '2025-10-12' },
                    { user: 'Kwame Mensah', original: 5000, override: 8000, reason: 'Customer request - verified', approver: 'John Doe', expires: '2025-10-20' },
                  ].map((override, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm text-gray-900">{override.user}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{formatCurrency(override.original)}</td>
                      <td className="py-3 px-4 text-sm text-blue-700">{formatCurrency(override.override)}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{override.reason}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{override.approver}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{override.expires}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="ghost">Revoke</Button>
                          <Button size="sm" variant="ghost">Extend</Button>
                        </div>
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
