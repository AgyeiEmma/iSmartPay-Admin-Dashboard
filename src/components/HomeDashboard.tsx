import { useState } from 'react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { TrendingUp, BookOpen, Target, Banknote, PieChart, Smartphone, Zap, CreditCard } from 'lucide-react';
import { PieChart as RechartsPie, Cell, ResponsiveContainer } from 'recharts';

// Mock expense data for pie chart
const expenseData = [
  { name: 'Food & Drinks', value: 450, color: '#3B82F6' },
  { name: 'Transportation', value: 280, color: '#1D4ED8' },
  { name: 'Entertainment', value: 180, color: '#1E3A8A' },
  { name: 'Shopping', value: 320, color: '#60A5FA' },
  { name: 'Bills', value: 580, color: '#93C5FD' }
];

// 70-20-10 rule data
const budgetRuleData = [
  { category: 'Needs', percentage: 70, amount: 1750, color: '#3B82F6', description: 'Essential expenses' },
  { category: 'Wants', percentage: 20, amount: 500, color: '#60A5FA', description: 'Lifestyle & fun' },
  { category: 'Savings/Invest', percentage: 10, amount: 250, color: '#1D4ED8', description: 'Future security' }
];

export function HomeDashboard() {
  const [showMomoSync, setShowMomoSync] = useState(false);
  const [momoConnected, setMomoConnected] = useState(false);

  const handleMomoSync = () => {
    // Mock MoMo sync process
    setMomoConnected(true);
    setShowMomoSync(false);
  };

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Header with New Tagline */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          iThrive with iSmart
        </h1>
        <p className="text-blue-600 font-medium">Make smart money moves today! 💪</p>
      </div>

      {/* MoMo Sync Card */}
      {!momoConnected && (
        <Card className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Smartphone className="text-white" size={20} />
              </div>
              <div>
                <p className="font-medium text-blue-900">Connect Mobile Money</p>
                <p className="text-xs text-blue-700">Auto-track your expenses</p>
              </div>
            </div>
            <Button 
              size="sm" 
              onClick={() => setShowMomoSync(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Zap size={16} className="mr-1" />
              Connect
            </Button>
          </div>
        </Card>
      )}

      {/* Total Balance Card */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Banknote className="text-blue-600" size={24} />
            <span className="text-sm text-blue-700">Total Balance</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">₵2,847.50</div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-blue-700">Savings: ₵1,420.00</span>
            <span className="text-blue-700">Investments: ₵1,427.50</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-green-600">
            <TrendingUp size={16} />
            <span>+12.5% this month</span>
          </div>
        </div>
      </Card>

      {/* 70-20-10 Rule Visualization */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <PieChart className="text-blue-600" size={20} />
          <h3 className="font-semibold">70-20-10 Budget Rule</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Smart money allocation for your ₵2,500 monthly income
        </p>
        
        <div className="space-y-4">
          {budgetRuleData.map((item) => (
            <div key={item.category} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-medium">{item.category}</span>
                  <span className="text-xs text-muted-foreground">({item.percentage}%)</span>
                </div>
                <span className="font-semibold text-blue-700">₵{item.amount}</span>
              </div>
              <Progress value={item.percentage} className="h-2" />
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Expense Breakdown */}
      {momoConnected && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Monthly Spending</h3>
            <span className="text-sm text-blue-600">₵1,810 spent</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={55}
                  dataKey="value"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </RechartsPie>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-2">
              {expenseData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">₵{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="text-blue-600" size={20} />
            <span className="text-sm">Active Goals</span>
          </div>
          <div className="text-xl font-bold">3</div>
          <div className="text-xs text-muted-foreground">67% avg progress</div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="text-blue-600" size={20} />
            <span className="text-sm">Learning Streak</span>
          </div>
          <div className="text-xl font-bold">12 days</div>
          <div className="text-xs text-muted-foreground">🔥 Keep it up!</div>
        </Card>
      </div>

      {/* Set a Goal Section */}
      <Card className="p-6">
        <h3 className="mb-4">Ready to achieve something new?</h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="text-4xl">🎯</div>
          <div>
            <p className="text-sm text-muted-foreground">
              Set a new financial goal and start building your future today!
            </p>
          </div>
        </div>
        <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900">
          Set a Goal
        </Button>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {momoConnected && (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <CreditCard className="text-blue-600" size={16} />
                </div>
                <div>
                  <p className="text-sm">MoMo Connected</p>
                  <p className="text-xs text-muted-foreground">Auto-tracking enabled</p>
                </div>
              </div>
              <span className="text-blue-600">✓</span>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-xs">+</span>
              </div>
              <div>
                <p className="text-sm">Emergency Fund</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <span className="text-green-600">+₵50.00</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-xs">📚</span>
              </div>
              <div>
                <p className="text-sm">Completed lesson</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
            <span className="text-blue-600">+5 XP</span>
          </div>
        </div>
      </Card>

      {/* MoMo Sync Modal */}
      {showMomoSync && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="p-6 w-full max-w-sm">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto flex items-center justify-center">
                <Smartphone className="text-white" size={24} />
              </div>
              <h3 className="font-semibold">Connect Mobile Money</h3>
              <p className="text-sm text-muted-foreground">
                Securely connect your MoMo account to automatically track expenses and deposits.
              </p>
              
              <div className="space-y-3">
                <Button 
                  onClick={handleMomoSync}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Connect MTN MoMo
                </Button>
                <Button 
                  onClick={handleMomoSync}
                  variant="outline"
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Connect Vodafone Cash
                </Button>
              </div>
              
              <Button 
                variant="ghost" 
                onClick={() => setShowMomoSync(false)}
                className="text-sm text-muted-foreground"
              >
                Maybe later
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}