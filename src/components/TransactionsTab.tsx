import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { TrendingUp, TrendingDown, Banknote, Smartphone, Filter, Calendar } from 'lucide-react';

export function TransactionsTab() {
  const [filter, setFilter] = useState('all');
  
  const transactions = [
    {
      id: 1,
      type: 'deposit',
      description: 'Emergency Fund Top-up',
      amount: 50.00,
      date: '2 hours ago',
      goal: 'Emergency Fund',
      source: 'manual'
    },
    {
      id: 2,
      type: 'expense',
      description: 'Food & Drinks - KFC',
      amount: 45.00,
      date: '4 hours ago',
      category: 'Food & Drinks',
      source: 'momo'
    },
    {
      id: 3,
      type: 'investment',
      description: 'Fractional Stock Purchase',
      amount: 25.00,
      date: '1 day ago',
      goal: 'Investment Portfolio',
      source: 'manual'
    },
    {
      id: 4,
      type: 'expense',
      description: 'Transportation - Uber',
      amount: 12.50,
      date: '1 day ago',
      category: 'Transportation',
      source: 'momo'
    },
    {
      id: 5,
      type: 'deposit',
      description: 'Travel Fund Savings',
      amount: 75.00,
      date: '3 days ago',
      goal: 'Japan Trip',
      source: 'manual'
    },
    {
      id: 6,
      type: 'expense',
      description: 'Shopping - Accra Mall',
      amount: 120.00,
      date: '5 days ago',
      category: 'Shopping',
      source: 'momo'
    },
    {
      id: 7,
      type: 'withdrawal',
      description: 'Emergency Expense',
      amount: 100.00,
      date: '1 week ago',
      goal: 'Emergency Fund',
      source: 'manual'
    }
  ];

  const filteredTransactions = transactions.filter(t => {
    if (filter === 'all') return true;
    if (filter === 'income') return t.type === 'deposit';
    if (filter === 'expenses') return t.type === 'expense';
    if (filter === 'investments') return t.type === 'investment';
    if (filter === 'momo') return t.source === 'momo';
    return true;
  });

  return (
    <div className="p-4 pb-20 space-y-6">
      <div>
        <h1>Transactions</h1>
        <p className="text-sm text-muted-foreground">Your financial activity & expense tracking</p>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { id: 'all', label: 'All' },
          { id: 'income', label: 'Income' },
          { id: 'expenses', label: 'Expenses' },
          { id: 'investments', label: 'Investments' },
          { id: 'momo', label: 'MoMo Sync' }
        ].map((filterOption) => (
          <Button
            key={filterOption.id}
            variant={filter === filterOption.id ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(filterOption.id)}
            className={`whitespace-nowrap ${
              filter === filterOption.id 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'border-blue-200 text-blue-600 hover:bg-blue-50'
            }`}
          >
            {filterOption.label}
          </Button>
        ))}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-green-600" size={20} />
            <span className="text-sm">This Month</span>
          </div>
          <div className="text-xl font-bold text-green-600">+₵425.00</div>
          <div className="text-xs text-muted-foreground">12 transactions</div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="text-red-600" size={20} />
            <span className="text-sm">Spent</span>
          </div>
          <div className="text-xl font-bold text-red-600">-₵177.50</div>
          <div className="text-xs text-muted-foreground">Auto-tracked</div>
        </Card>
      </div>

      {/* MoMo Integration Notice */}
      <Card className="p-4 bg-blue-50 border border-blue-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <Smartphone className="text-white" size={16} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-blue-900">MoMo Auto-Sync Active</p>
            <p className="text-xs text-blue-700">Expenses are automatically categorized and tracked</p>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">Connected</Badge>
        </div>
      </Card>

      {/* Transaction List */}
      <div className="space-y-3">
        {filteredTransactions.map((transaction) => (
          <Card key={transaction.id} className="p-4">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                transaction.type === 'deposit' ? 'bg-green-100' :
                transaction.type === 'investment' ? 'bg-blue-100' : 
                transaction.type === 'expense' ? 'bg-orange-100' : 'bg-red-100'
              }`}>
                {transaction.type === 'deposit' ? (
                  <TrendingUp className="text-green-600" size={20} />
                ) : transaction.type === 'investment' ? (
                  <Banknote className="text-blue-600" size={20} />
                ) : transaction.type === 'expense' ? (
                  <span className="text-orange-600 text-sm">💳</span>
                ) : (
                  <TrendingDown className="text-red-600" size={20} />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground">
                        {transaction.goal || transaction.category}
                      </p>
                      {transaction.source === 'momo' && (
                        <Badge variant="outline" className="text-xs border-blue-200 text-blue-600">
                          Auto
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${
                      transaction.type === 'withdrawal' || transaction.type === 'expense' 
                        ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {transaction.type === 'withdrawal' || transaction.type === 'expense' ? '-' : '+'}₵{transaction.amount.toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}