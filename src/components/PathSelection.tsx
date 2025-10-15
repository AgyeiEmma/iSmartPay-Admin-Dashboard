import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { BookOpen, PiggyBank, TrendingUp, Clock, Star, CheckCircle } from 'lucide-react';

interface Path {
  id: 'learn' | 'save' | 'invest';
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  benefits: string[];
  timeCommitment: string;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  minAmount?: string;
  features: string[];
}

const paths: Path[] = [
  {
    id: 'learn',
    title: 'Learn First',
    description: 'Build your financial foundation with bite-sized lessons',
    icon: BookOpen,
    color: 'bg-blue-100 text-blue-600 border-blue-200',
    benefits: [
      'Understand money basics',
      'Learn about Ghana Stock Exchange',
      'Master the 70-20-10 rule',
      'Build confidence before investing'
    ],
    timeCommitment: '5-10 min/day',
    difficulty: 'Easy',
    features: [
      'Gamified learning streaks',
      'Women-focused financial tips',
      'Local investment knowledge',
      'Progress tracking with XP'
    ]
  },
  {
    id: 'save',
    title: 'Save & Build Habits',
    description: 'Start with micro-goals and build saving habits',
    icon: PiggyBank,
    color: 'bg-green-100 text-green-600 border-green-200',
    benefits: [
      'Start with just ₵20',
      'Flexible goal adjustments',
      'Automated saving nudges',
      'Lock option for discipline'
    ],
    timeCommitment: '2-3 min/day',
    difficulty: 'Easy',
    minAmount: '₵20',
    features: [
      'Micro-goals from ₵20',
      'Weekly progress reports',
      'Goal flexibility',
      'Withdrawal lock option'
    ]
  },
  {
    id: 'invest',
    title: 'Invest in Fractions',
    description: 'Buy portions of T-bills, ETFs, and stocks',
    icon: TrendingUp,
    color: 'bg-purple-100 text-purple-600 border-purple-200',
    benefits: [
      'Start investing with ₵20',
      'Diversified portfolio',
      'Low-risk T-bills',
      'Fractional stock ownership'
    ],
    timeCommitment: '10-15 min/week',
    difficulty: 'Medium',
    minAmount: '₵20',
    features: [
      'Fractional investments',
      'Portfolio tracking',
      'Risk assessment',
      'Performance snapshots'
    ]
  }
];

interface PathSelectionProps {
  onPathSelect: (pathId: string, customPath?: string[]) => void;
  userProfile?: {
    investmentExperience: string;
    riskTolerance: string;
    savingsGoal: string;
  };
}

export function PathSelection({ onPathSelect, userProfile }: PathSelectionProps) {
  const [selectedPaths, setSelectedPaths] = useState<string[]>([]);
  const [showCustom, setShowCustom] = useState(false);

  const getRecommendedPaths = () => {
    if (!userProfile) return ['learn'];
    
    const recommendations = [];
    
    // Always recommend learning for beginners
    if (userProfile.investmentExperience === 'beginner' || userProfile.savingsGoal === 'learn') {
      recommendations.push('learn');
    }
    
    // Recommend saving for those wanting emergency funds or specific goals
    if (userProfile.savingsGoal === 'emergency' || userProfile.savingsGoal === 'goal') {
      recommendations.push('save');
    }
    
    // Recommend investing for those ready and interested
    if (userProfile.investmentExperience !== 'beginner' && userProfile.savingsGoal === 'investment') {
      recommendations.push('invest');
    }
    
    return recommendations.length > 0 ? recommendations : ['learn'];
  };

  const recommendedPaths = getRecommendedPaths();

  const togglePath = (pathId: string) => {
    setSelectedPaths(prev => 
      prev.includes(pathId) 
        ? prev.filter(id => id !== pathId)
        : [...prev, pathId]
    );
  };

  const handleContinue = () => {
    if (selectedPaths.length > 0) {
      onPathSelect(selectedPaths[0], selectedPaths);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-600';
      case 'Medium': return 'bg-yellow-100 text-yellow-600';
      case 'Advanced': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div className="text-center space-y-2">
        <h1>Choose Your Path</h1>
        <p className="text-sm text-muted-foreground">
          Select one or multiple paths based on your goals. You can always change later!
        </p>
      </div>

      {/* Recommended Paths */}
      {userProfile && (
        <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <Star className="text-purple-600" size={16} />
            <h3 className="text-purple-800">Recommended for You</h3>
          </div>
          <p className="text-sm text-purple-700 mb-2">
            Based on your quiz responses, we suggest starting with:
          </p>
          <div className="flex gap-2">
            {recommendedPaths.map(pathId => {
              const path = paths.find(p => p.id === pathId);
              return (
                <Badge key={pathId} className="bg-purple-100 text-purple-600">
                  {path?.title}
                </Badge>
              );
            })}
          </div>
        </Card>
      )}

      {/* Path Options */}
      <div className="space-y-4">
        {paths.map(path => {
          const Icon = path.icon;
          const isSelected = selectedPaths.includes(path.id);
          const isRecommended = recommendedPaths.includes(path.id);
          
          return (
            <Card 
              key={path.id} 
              className={`p-6 cursor-pointer transition-all ${
                isSelected 
                  ? 'ring-2 ring-purple-500 border-purple-200' 
                  : 'hover:shadow-md'
              } ${isRecommended ? 'border-purple-200' : ''}`}
              onClick={() => togglePath(path.id)}
            >
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${path.color}`}>
                  <Icon size={24} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3>{path.title}</h3>
                        {isRecommended && (
                          <Badge className="bg-purple-100 text-purple-600 text-xs">
                            Recommended
                          </Badge>
                        )}
                        {isSelected && (
                          <CheckCircle className="text-purple-600" size={16} />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{path.description}</p>
                    </div>
                    <Badge className={getDifficultyColor(path.difficulty)}>
                      {path.difficulty}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Benefits</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {path.benefits.map((benefit, index) => (
                          <li key={index}>• {benefit}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Features</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {path.features.map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{path.timeCommitment}</span>
                    </div>
                    {path.minAmount && (
                      <span>Min: {path.minAmount}</span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Custom Path Option */}
      <Card className="p-4 border-dashed">
        <div className="text-center">
          <h3 className="mb-2">Need Something Different?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Mix and match paths or tell us what you're looking for
          </p>
          <Button 
            variant="outline"
            onClick={() => setShowCustom(!showCustom)}
          >
            Customize My Journey
          </Button>
        </div>
      </Card>

      {/* Selected Paths Summary */}
      {selectedPaths.length > 0 && (
        <Card className="p-4 bg-green-50 border-green-200">
          <h3 className="text-green-800 mb-2">Your Selected Path{selectedPaths.length > 1 ? 's' : ''}</h3>
          <div className="space-y-2 mb-4">
            {selectedPaths.map(pathId => {
              const path = paths.find(p => p.id === pathId);
              return (
                <div key={pathId} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="text-green-600" size={16} />
                  <span className="text-green-700">{path?.title}: {path?.description}</span>
                </div>
              );
            })}
          </div>
          <Button 
            onClick={handleContinue}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          >
            Start My Journey
          </Button>
        </Card>
      )}

      {selectedPaths.length === 0 && (
        <div className="text-center p-4">
          <p className="text-sm text-muted-foreground">
            Select at least one path to continue
          </p>
        </div>
      )}
    </div>
  );
}