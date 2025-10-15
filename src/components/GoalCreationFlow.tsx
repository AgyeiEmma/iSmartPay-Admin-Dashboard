import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { ArrowLeft, Upload, Calendar, Banknote } from 'lucide-react';

interface GoalCreationFlowProps {
  onBack: () => void;
}

export function GoalCreationFlow({ onBack }: GoalCreationFlowProps) {
  const [step, setStep] = useState(1);
  const [goalData, setGoalData] = useState({
    category: '',
    name: '',
    amount: '',
    deadline: '',
    lockWithdrawals: false,
    image: null as string | null
  });

  const categories = [
    { id: 'emergency', name: 'Emergency Fund', emoji: '🛡️' },
    { id: 'travel', name: 'Travel', emoji: '✈️' },
    { id: 'education', name: 'Education', emoji: '🎓' },
    { id: 'investment', name: 'Investment', emoji: '📈' },
    { id: 'home', name: 'Home', emoji: '🏠' },
    { id: 'car', name: 'Car', emoji: '🚗' },
  ];

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else onBack();
  };

  const handleFinish = () => {
    // Here you would save the goal
    console.log('Goal created:', goalData);
    onBack();
  };

  return (
    <div className="p-4 pb-20">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={handleBack}>
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1>Create New Goal</h1>
          <p className="text-sm text-muted-foreground">Step {step} of 5</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-2 mb-8">
        <div 
          className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(step / 5) * 100}%` }}
        />
      </div>

      {/* Step Content */}
      <Card className="p-6">
        {step === 1 && (
          <div className="space-y-4">
            <h2>Choose a Goal Category</h2>
            <p className="text-sm text-muted-foreground">
              What are you saving for?
            </p>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={goalData.category === category.id ? "default" : "outline"}
                  className="h-20 flex-col gap-2"
                  onClick={() => setGoalData({ ...goalData, category: category.id })}
                >
                  <span className="text-2xl">{category.emoji}</span>
                  <span className="text-sm">{category.name}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2>Name Your Goal</h2>
            <p className="text-sm text-muted-foreground">
              Give your goal a personal touch
            </p>
            <div className="space-y-2">
              <Label htmlFor="goalName">Goal Name</Label>
              <Input
                id="goalName"
                placeholder="e.g., Dream Vacation to Japan"
                value={goalData.name}
                onChange={(e) => setGoalData({ ...goalData, name: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="goalImage">Add a Picture (Optional)</Label>
              <Button variant="outline" className="w-full h-20 flex-col gap-2">
                <Upload size={20} />
                <span className="text-sm">Upload Image</span>
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2>Set Your Target</h2>
            <p className="text-sm text-muted-foreground">
              How much do you need to save?
            </p>
            <div className="space-y-2">
              <Label htmlFor="targetAmount">Target Amount</Label>
              <div className="relative">
                <Banknote className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  id="targetAmount"
                  type="number"
                  placeholder="2500"
                  className="pl-10"
                  value={goalData.amount}
                  onChange={(e) => setGoalData({ ...goalData, amount: e.target.value })}
                />
              </div>
              <p className="text-xs text-muted-foreground">Amount in Ghana Cedis (₵)</p>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2>Set Your Deadline</h2>
            <p className="text-sm text-muted-foreground">
              When do you want to achieve this goal?
            </p>
            <div className="space-y-2">
              <Label htmlFor="deadline">Target Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  id="deadline"
                  type="date"
                  className="pl-10"
                  value={goalData.deadline}
                  onChange={(e) => setGoalData({ ...goalData, deadline: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <h2>Final Settings</h2>
            <p className="text-sm text-muted-foreground">
              Configure your goal preferences
            </p>
            
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <p className="font-medium">Lock Withdrawals</p>
                <p className="text-sm text-muted-foreground">
                  Prevent withdrawals until goal date for better discipline
                </p>
              </div>
              <Switch
                checked={goalData.lockWithdrawals}
                onCheckedChange={(checked) => setGoalData({ ...goalData, lockWithdrawals: checked })}
              />
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium text-green-800 mb-2">Goal Summary</h3>
              <div className="space-y-1 text-sm text-green-700">
                <p><strong>Category:</strong> {categories.find(c => c.id === goalData.category)?.name}</p>
                <p><strong>Name:</strong> {goalData.name}</p>
                <p><strong>Target:</strong> ₵{goalData.amount}</p>
                <p><strong>Deadline:</strong> {goalData.deadline}</p>
                <p><strong>Lock Withdrawals:</strong> {goalData.lockWithdrawals ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Navigation */}
      <div className="flex gap-4 mt-6">
        <Button variant="outline" onClick={handleBack} className="flex-1">
          Back
        </Button>
        {step < 5 ? (
          <Button 
            onClick={handleNext} 
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            disabled={
              (step === 1 && !goalData.category) ||
              (step === 2 && !goalData.name) ||
              (step === 3 && !goalData.amount) ||
              (step === 4 && !goalData.deadline)
            }
          >
            Next
          </Button>
        ) : (
          <Button 
            onClick={handleFinish}
            className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          >
            Create Goal
          </Button>
        )}
      </div>
    </div>
  );
}