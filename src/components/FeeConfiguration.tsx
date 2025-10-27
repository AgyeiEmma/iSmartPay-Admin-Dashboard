import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { DollarSign, TrendingUp, Percent, Calculator } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

export function FeeConfiguration() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Fee Configuration</h2>
          <p className="text-sm text-gray-500 mt-1">Configure pricing and fee structures</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <DollarSign className="w-4 h-4 mr-2" />
          New Fee Rule
        </Button>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Revenue (Today)', value: formatCurrency(12450.75), change: '+8.3%', icon: DollarSign },
          { label: 'Active Fee Rules', value: '34', icon: Calculator },
          { label: 'Avg Fee Rate', value: '1.8%', icon: Percent },
          { label: 'Revenue (30d)', value: formatCurrency(342890.00), change: '+15.2%', icon: TrendingUp },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-xl text-gray-900 mt-1">{stat.value}</p>
                  {stat.change && <p className="text-sm text-green-600 mt-1">{stat.change}</p>}
                </div>
                <div className="p-2 rounded-lg bg-blue-100">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="product" className="space-y-4">
        <TabsList className="bg-gray-100">
          <TabsTrigger value="product">Product Fees</TabsTrigger>
          <TabsTrigger value="merchant">Merchant Pricing</TabsTrigger>
          <TabsTrigger value="promotional">Promotions</TabsTrigger>
          <TabsTrigger value="simulator">Fee Simulator</TabsTrigger>
        </TabsList>

        <TabsContent value="product" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Channel Fee Configuration</h3>
            <div className="space-y-4">
              {[
                { channel: 'Mobile Money', type: 'Percentage + Fixed', percentage: 1.5, fixed: 0.50, minFee: 0.50, maxFee: 50.00 },
                { channel: 'Bank Transfer', type: 'Fixed', percentage: 0, fixed: 5.00, minFee: 5.00, maxFee: 5.00 },
                { channel: 'Card Payment', type: 'Percentage', percentage: 2.5, fixed: 0, minFee: 1.00, maxFee: 100.00 },
                { channel: 'USSD', type: 'Fixed', percentage: 0, fixed: 0.20, minFee: 0.20, maxFee: 0.20 },
              ].map((fee, index) => (
                <Card key={index} className="p-4 border-2 border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-gray-900">{fee.channel}</h4>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600">{fee.type}</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {fee.percentage > 0 && (
                      <div>
                        <p className="text-sm text-gray-500">Percentage</p>
                        <p className="text-gray-900">{fee.percentage}%</p>
                      </div>
                    )}
                    {fee.fixed > 0 && (
                      <div>
                        <p className="text-sm text-gray-500">Fixed Fee</p>
                        <p className="text-gray-900">{formatCurrency(fee.fixed)}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-gray-500">Min Fee</p>
                      <p className="text-gray-900">{formatCurrency(fee.minFee)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Max Fee</p>
                      <p className="text-gray-900">{formatCurrency(fee.maxFee)}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <Button size="sm" variant="outline" className="text-blue-700 border-blue-200">
                      Edit Configuration
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Volume-Based Tiered Pricing</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm text-gray-700">Tier</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-700">Monthly Volume Range</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-700">Fee Rate</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { tier: 'Bronze', range: '₵0 - ₵50,000', rate: '2.0%', status: 'active' },
                    { tier: 'Silver', range: '₵50,001 - ₵200,000', rate: '1.5%', status: 'active' },
                    { tier: 'Gold', range: '₵200,001 - ₵500,000', rate: '1.2%', status: 'active' },
                    { tier: 'Platinum', range: '> ₵500,000', rate: '0.9%', status: 'active' },
                  ].map((tier, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm text-gray-900">{tier.tier}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{tier.range}</td>
                      <td className="py-3 px-4 text-sm text-blue-700">{tier.rate}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                          {tier.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="merchant" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Custom Merchant Pricing</h3>
            <div className="space-y-3">
              {[
                { merchant: 'Yaw Owusu Trading', standard: '1.5%', custom: '1.2%', volume: 450000, savings: 1350.00 },
                { merchant: 'Accra Mart Ltd', standard: '1.5%', custom: '1.0%', volume: 850000, savings: 4250.00 },
                { merchant: 'Kumasi Electronics', standard: '1.5%', custom: '1.3%', volume: 320000, savings: 640.00 },
              ].map((merchant, index) => (
                <Card key={index} className="p-4 border-2 border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-gray-900 mb-2">{merchant.merchant}</h4>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Standard Rate</p>
                          <p className="text-gray-900">{merchant.standard}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Custom Rate</p>
                          <p className="text-blue-700">{merchant.custom}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">30d Volume</p>
                          <p className="text-gray-900">{formatCurrency(merchant.volume)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Monthly Savings</p>
                          <p className="text-green-700">{formatCurrency(merchant.savings)}</p>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="text-blue-700 border-blue-200">
                      Modify
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="promotional" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Active Promotions</h3>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Create Promotion</Button>
            </div>
            <div className="space-y-3">
              {[
                { name: 'New User Promo - Zero Fees', description: 'First 5 transactions free for new users', expires: '2025-12-31', users: 1247, status: 'active' },
                { name: 'Weekend Special', description: '50% off all mobile money transactions on weekends', expires: '2025-10-31', users: 5632, status: 'active' },
              ].map((promo, index) => (
                <Card key={index} className="p-4 border-2 border-blue-100 bg-blue-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-gray-900">{promo.name}</h4>
                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                          {promo.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{promo.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Expires: {promo.expires}</span>
                        <span>•</span>
                        <span>{promo.users.toLocaleString()} users enrolled</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="outline">End</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="simulator" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Fee Calculator</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-700 mb-2 block">Transaction Amount</label>
                  <Input type="number" placeholder="Enter amount" defaultValue="1000" />
                </div>
                <div>
                  <label className="text-sm text-gray-700 mb-2 block">Channel</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                    <option>Mobile Money</option>
                    <option>Bank Transfer</option>
                    <option>Card Payment</option>
                    <option>USSD</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-700 mb-2 block">User Type</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                    <option>Standard User</option>
                    <option>Merchant</option>
                    <option>Premium User</option>
                  </select>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Calculate Fee</Button>
              </div>
              <div className="space-y-4">
                <Card className="p-4 bg-blue-50 border-2 border-blue-200">
                  <h4 className="text-gray-900 mb-3">Fee Breakdown</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Transaction Amount</span>
                      <span className="text-gray-900">₵1,000.00</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Percentage Fee (1.5%)</span>
                      <span className="text-gray-900">₵15.00</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Fixed Fee</span>
                      <span className="text-gray-900">₵0.50</span>
                    </div>
                    <div className="border-t border-blue-300 pt-2 mt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900">Total Fee</span>
                        <span className="text-blue-700">₵15.50</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-gray-900">Customer Receives</span>
                        <span className="text-gray-900">₵984.50</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
