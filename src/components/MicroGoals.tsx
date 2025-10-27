import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Edit, Lock, Unlock, Target, TrendingUp, Shield, GraduationCap, Plane, Home } from 'lucide-react';

interface MicroGoal {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  category: 'emergency' | 'investment' | 'education' | 'travel' | 'home';
  timeline: string;
  isLocked: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedWeeks: number;
}

const presetMicroGoals: Omit<MicroGoal, 'id' | 'currentAmount' | 'isLocked'>[] = [
  {
    title: "₵100 Emergency Fund",
    description: "Start your safety net with just ₵20/week",
    targetAmount: 100,
    category: 'emergency',
    timeline: '5 weeks',
    difficulty: 'beginner',
    estimatedWeeks: 5
  },
  {
    title: "₵200 First T-Bill",
    description: "Your first government investment",
    targetAmount: 200,
    category: 'investment',
    timeline: '10 weeks',
    difficulty: 'beginner',
    estimatedWeeks: 10
  },
  {
    title: "₵50 Learning Fund",
    description: "Invest in yourself with a course",
    targetAmount: 50,
    category: 'education',
    timeline: '3 weeks',
    difficulty: 'beginner',
    estimatedWeeks: 3
  },
  {
    title: "₵300 Weekend Getaway",
    description: "Plan your next adventure",
    targetAmount: 300,
    category: 'travel',
    timeline: '15 weeks',
    difficulty: 'intermediate',
    estimatedWeeks: 15
  },
  {
    title: "₵500 Home Improvement",
    description: "Upgrade your living space",
    targetAmount: 500,
    category: 'home',
    timeline: '20 weeks',
    difficulty: 'intermediate',
    estimatedWeeks: 20
  },
  {
    title: "₵1000 Investment Portfolio",
    description: "Build a diversified portfolio",
    targetAmount: 1000,
    category: 'investment',
    timeline: '25 weeks',
    difficulty: 'advanced',
    estimatedWeeks: 25
  }
];

export function MicroGoals() {
  const [activeGoals, setActiveGoals] = useState<MicroGoal[]>([
    {
      id: '1',
      title: "₵100 Emergency Fund",
      description: "Start your safety net with just ₵20/week",
      targetAmount: 100,
      currentAmount: 60,
      category: 'emergency',
      timeline: '5 weeks',
      isLocked: false,
      difficulty: 'beginner',
      estimatedWeeks: 5
    }
  ]);

  const getCategoryIcon = (category: MicroGoal['category']) => {
    switch (category) {
      case 'emergency': return Shield;
      case 'investment': return TrendingUp;
      case 'education': return GraduationCap;
      case 'travel': return Plane;
      case 'home': return Home;
      default: return Target;
    }
  };

  const getCategoryColor = (category: MicroGoal['category']) => {
    switch (category) {
      case 'emergency': return 'bg-red-100 text-red-600';
      case 'investment': return 'bg-green-100 text-green-600';
      case 'education': return 'bg-blue-100 text-blue-600';
      case 'travel': return 'bg-purple-100 text-purple-600';
      case 'home': return 'bg-orange-100 text-orange-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getDifficultyColor = (difficulty: MicroGoal['difficulty']) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-600';
      case 'intermediate': return 'bg-yellow-100 text-yellow-600';
      case 'advanced': return 'bg-red-100 text-red-600';
    }
  };

  const addGoal = (preset: Omit<MicroGoal, 'id' | 'currentAmount' | 'isLocked'>) => {
    const newGoal: MicroGoal = {
      ...preset,
      id: Date.now().toString(),
      currentAmount: 0,
      isLocked: false
    };
    setActiveGoals(prev => [...prev, newGoal]);
  };

  const toggleLock = (goalId: string) => {
    setActiveGoals(prev => 
      prev.map(goal => 
        goal.id === goalId 
          ? { ...goal, isLocked: !goal.isLocked }
          : goal
      )
    );
  };

  const deleteGoal = (goalId: string) => {
    setActiveGoals(prev => prev.filter(goal => goal.id !== goalId));
  };

  return (
    <div className="space-y-6">
      {/* Active Goals */}
      {activeGoals.length > 0 && (
        <div className="space-y-4">
          <h2>Your Active Micro-Goals</h2>
          {activeGoals.map((goal) => {
            const progress = (goal.currentAmount / goal.targetAmount) * 100;
            const Icon = getCategoryIcon(goal.category);
            
            return (
              <Card key={goal.id} className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getCategoryColor(goal.category)}`}>
                    <Icon size={20} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium">{goal.title}</h3>
                        <p className="text-sm text-muted-foreground">{goal.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getDifficultyColor(goal.difficulty)}>
                          {goal.difficulty}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleLock(goal.id)}
                        >
                          {goal.isLocked ? <Lock size={16} /> : <Unlock size={16} />}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-sm">
                        <span>₵{goal.currentAmount} of ₵{goal.targetAmount}</span>
                        <span>{Math.round(progress)}% complete</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        Timeline: {goal.timeline} • Weekly target: ₵{Math.round(goal.targetAmount / goal.estimatedWeeks)}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit size={14} className="mr-1" />
                        Adjust
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                        disabled={goal.isLocked}
                      >
                        Top Up ₵20
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        onClick={() => deleteGoal(goal.id)}
                      >
                        Delete
                      </Button>
                    </div>
                    
                    {goal.isLocked && (
                      <div className="mt-2 p-2 bg-yellow-50 rounded text-xs text-yellow-700">
                        🔒 Withdrawals locked until goal completion for better discipline
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Preset Goals */}
      <div className="space-y-4">
        <h2>Start a New Micro-Goal</h2>
        <p className="text-sm text-muted-foreground">
          Choose from our preset goals or customize your own. Start small, think big! 🌟
        </p>
        
        <div className="grid gap-4">
          {presetMicroGoals
            .filter(preset => !activeGoals.some(active => active.title === preset.title))
            .map((preset, index) => {
              const Icon = getCategoryIcon(preset.category);
              
              return (
                <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getCategoryColor(preset.category)}`}>
                      <Icon size={18} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium">{preset.title}</h3>
                          <p className="text-sm text-muted-foreground">{preset.description}</p>
                        </div>
                        <Badge className={getDifficultyColor(preset.difficulty)}>
                          {preset.difficulty}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span>Target: ₵{preset.targetAmount}</span>
                        <span>Timeline: {preset.timeline}</span>
                        <span>₵{Math.round(preset.targetAmount / preset.estimatedWeeks)}/week</span>
                      </div>
                      
                      <Button 
                        size="sm" 
                        onClick={() => addGoal(preset)}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      >
                        Start This Goal
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
        </div>
      </div>

      {/* Success Tips */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-0">
        <h3 className="mb-2">💡 Micro-Goal Success Tips</h3>
        <ul className="text-sm space-y-1 text-muted-foreground">
          <li>• Start with the smallest amount you can consistently save</li>
          <li>• Use the lock feature if you struggle with self-control</li>
          <li>• Adjust timelines as your income changes - flexibility is key!</li>
          <li>• Celebrate every milestone to build positive habits</li>
        </ul>
      </Card>
    </div>
  );
}