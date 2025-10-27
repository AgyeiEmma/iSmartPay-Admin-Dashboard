import { useState } from 'react';
import { MicroGoals } from './MicroGoals';
import { GoalCreationFlow } from './GoalCreationFlow';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Plus, TrendingUp, Target, Calendar } from 'lucide-react';

export function GoalsTab() {
  const [showCreation, setShowCreation] = useState(false);
  const [view, setView] = useState<'micro' | 'traditional'>('micro');

  if (showCreation) {
    return <GoalCreationFlow onBack={() => setShowCreation(false)} />;
  }

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1>My Goals</h1>
          <p className="text-sm text-muted-foreground">
            Start small, achieve big! 🌟
          </p>
        </div>
        <Button 
          onClick={() => setShowCreation(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          <Plus size={16} className="mr-2" />
          Custom Goal
        </Button>
      </div>

      {/* Goal Type Toggle */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Target className="text-purple-600" size={20} />
          <h3>Goal Types</h3>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={view === 'micro' ? 'default' : 'outline'}
            onClick={() => setView('micro')}
            className="flex-col h-16 gap-1"
          >
            <span className="text-lg">🎯</span>
            <span className="text-xs">Micro-Goals</span>
          </Button>
          <Button
            variant={view === 'traditional' ? 'default' : 'outline'}
            onClick={() => setView('traditional')}
            className="flex-col h-16 gap-1"
          >
            <span className="text-lg">🏆</span>
            <span className="text-xs">Big Goals</span>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          {view === 'micro' 
            ? 'Start with small, achievable goals from ₵20'
            : 'Set larger, long-term financial objectives'
          }
        </p>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <div className="text-xl font-bold text-green-600">1</div>
          <div className="text-xs text-muted-foreground">Active</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-xl font-bold text-blue-600">67%</div>
          <div className="text-xs text-muted-foreground">Avg Progress</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-xl font-bold text-purple-600">₵60</div>
          <div className="text-xs text-muted-foreground">This Week</div>
        </Card>
      </div>

      {/* Goal Content */}
      {view === 'micro' ? (
        <MicroGoals />
      ) : (
        <TraditionalGoals />
      )}
    </div>
  );
}

// Traditional Goals Component (existing larger goals)
function TraditionalGoals() {
  const goals = [
    {
      id: 1,
      name: "Emergency Fund",
      target: 5000,
      current: 3350,
      deadline: "Dec 2024",
      category: "Emergency"
    },
    {
      id: 2,
      name: "Dream Vacation to Japan",
      target: 3000,
      current: 1200,
      deadline: "Jun 2025",
      category: "Travel"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2>Traditional Goals</h2>
        <Button size="sm" variant="outline">
          <Plus size={14} className="mr-1" />
          Add Goal
        </Button>
      </div>

      {goals.map((goal) => {
        const progress = (goal.current / goal.target) * 100;
        
        return (
          <Card key={goal.id} className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{goal.name}</h3>
                  <p className="text-sm text-muted-foreground">{goal.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₵{goal.current.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">of ₵{goal.target.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Progress value={progress} className="h-3" />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{Math.round(progress)}% complete</span>
                  <span className="text-muted-foreground">Due {goal.deadline}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  View Details
                </Button>
                <Button size="sm" className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                  Top Up
                </Button>
              </div>
            </div>
          </Card>
        );
      })}

      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-0">
        <div className="text-center space-y-2">
          <TrendingUp className="text-blue-600 mx-auto" size={32} />
          <h3>Ready for Bigger Goals?</h3>
          <p className="text-sm text-muted-foreground">
            Once you've mastered micro-goals, traditional goals help you achieve major milestones
          </p>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Create Traditional Goal
          </Button>
        </div>
      </Card>
    </div>
  );
}