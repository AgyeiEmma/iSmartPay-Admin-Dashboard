import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Trophy, Star, Target, BookOpen, PiggyBank, TrendingUp, Flame, Calendar, Shield, Award } from 'lucide-react';

interface BadgeData {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  category: 'learning' | 'saving' | 'investing' | 'streak' | 'milestone';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  isUnlocked: boolean;
  progress?: number;
  maxProgress?: number;
  unlockedAt?: string;
  reward?: string;
}

const badges: BadgeData[] = [
  // Learning Badges
  {
    id: 'first-lesson',
    title: 'First Steps',
    description: 'Complete your first financial lesson',
    icon: BookOpen,
    category: 'learning',
    rarity: 'common',
    isUnlocked: true,
    unlockedAt: '2024-01-15',
    reward: '₵5 bonus'
  },
  {
    id: 'week-streak',
    title: 'Learning Streak',
    description: 'Learn for 7 days in a row',
    icon: Flame,
    category: 'streak',
    rarity: 'rare',
    isUnlocked: true,
    unlockedAt: '2024-01-22',
    reward: '10 XP bonus'
  },
  {
    id: 'knowledge-master',
    title: 'Knowledge Master',
    description: 'Complete 25 lessons',
    icon: Star,
    category: 'learning',
    rarity: 'epic',
    isUnlocked: false,
    progress: 18,
    maxProgress: 25
  },

  // Saving Badges
  {
    id: 'first-goal',
    title: 'Goal Getter',
    description: 'Complete your first micro-goal',
    icon: Target,
    category: 'saving',
    rarity: 'common',
    isUnlocked: false,
    progress: 60,
    maxProgress: 100,
    reward: '₵10 bonus'
  },
  {
    id: 'emergency-fund',
    title: 'Safety Net',
    description: 'Build a ₵500 emergency fund',
    icon: Shield,
    category: 'saving',
    rarity: 'rare',
    isUnlocked: false,
    progress: 200,
    maxProgress: 500
  },
  {
    id: 'habit-builder',
    title: 'Habit Builder',
    description: 'Save consistently for 30 days',
    icon: Calendar,
    category: 'saving',
    rarity: 'epic',
    isUnlocked: false,
    progress: 12,
    maxProgress: 30
  },

  // Investment Badges
  {
    id: 'first-investment',
    title: 'Investor',
    description: 'Make your first fractional investment',
    icon: TrendingUp,
    category: 'investing',
    rarity: 'rare',
    isUnlocked: false,
    reward: 'Free portfolio analysis'
  },
  {
    id: 'diversified',
    title: 'Diversified',
    description: 'Invest in 5 different assets',
    icon: PiggyBank,
    category: 'investing',
    rarity: 'epic',
    isUnlocked: false,
    progress: 2,
    maxProgress: 5
  },

  // Milestone Badges
  {
    id: 'hundred-club',
    title: 'Hundred Club',
    description: 'Save your first ₵100',
    icon: Trophy,
    category: 'milestone',
    rarity: 'common',
    isUnlocked: true,
    unlockedAt: '2024-01-20',
    reward: 'Achievement certificate'
  },
  {
    id: 'thousand-club',
    title: 'Thousand Club',
    description: 'Reach ₵1,000 in total savings',
    icon: Award,
    category: 'milestone',
    rarity: 'legendary',
    isUnlocked: false,
    progress: 847,
    maxProgress: 1000
  }
];

export function BadgeSystem() {
  const getRarityColor = (rarity: BadgeData['rarity']) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50';
      case 'rare': return 'border-blue-300 bg-blue-50';
      case 'epic': return 'border-purple-300 bg-purple-50';
      case 'legendary': return 'border-yellow-300 bg-yellow-50';
    }
  };

  const getRarityTextColor = (rarity: BadgeData['rarity']) => {
    switch (rarity) {
      case 'common': return 'text-gray-600';
      case 'rare': return 'text-blue-600';
      case 'epic': return 'text-purple-600';
      case 'legendary': return 'text-yellow-600';
    }
  };

  const getCategoryColor = (category: BadgeData['category']) => {
    switch (category) {
      case 'learning': return 'bg-blue-100 text-blue-600';
      case 'saving': return 'bg-green-100 text-green-600';
      case 'investing': return 'bg-purple-100 text-purple-600';
      case 'streak': return 'bg-orange-100 text-orange-600';
      case 'milestone': return 'bg-yellow-100 text-yellow-600';
    }
  };

  const unlockedBadges = badges.filter(badge => badge.isUnlocked);
  const inProgressBadges = badges.filter(badge => !badge.isUnlocked && badge.progress !== undefined);
  const lockedBadges = badges.filter(badge => !badge.isUnlocked && badge.progress === undefined);

  const totalXP = unlockedBadges.length * 10 + 50; // Base XP calculation

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-0">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Trophy className="text-yellow-600" size={24} />
            <h1>Your Achievements</h1>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{unlockedBadges.length}</div>
              <div className="text-sm text-muted-foreground">Badges Earned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalXP}</div>
              <div className="text-sm text-muted-foreground">Total XP</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{inProgressBadges.length}</div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Recently Unlocked */}
      {unlockedBadges.length > 0 && (
        <div className="space-y-4">
          <h2>🎉 Recently Unlocked</h2>
          <div className="grid gap-4">
            {unlockedBadges.slice(0, 3).map(badge => {
              const Icon = badge.icon;
              return (
                <Card key={badge.id} className={`p-4 ${getRarityColor(badge.rarity)} border-2`}>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
                      <Icon className={getRarityTextColor(badge.rarity)} size={24} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{badge.title}</h3>
                        <Badge className={getCategoryColor(badge.category)}>
                          {badge.category}
                        </Badge>
                        <Badge variant="outline" className={getRarityTextColor(badge.rarity)}>
                          {badge.rarity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{badge.description}</p>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-muted-foreground">Unlocked {badge.unlockedAt}</span>
                        {badge.reward && (
                          <span className="text-green-600 font-medium">🎁 {badge.reward}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* In Progress */}
      {inProgressBadges.length > 0 && (
        <div className="space-y-4">
          <h2>🎯 Almost There!</h2>
          <div className="grid gap-4">
            {inProgressBadges.map(badge => {
              const Icon = badge.icon;
              const progress = badge.progress && badge.maxProgress ? (badge.progress / badge.maxProgress) * 100 : 0;
              
              return (
                <Card key={badge.id} className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center opacity-60">
                      <Icon className="text-muted-foreground" size={20} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{badge.title}</h3>
                        <Badge className={getCategoryColor(badge.category)}>
                          {badge.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{badge.description}</p>
                      
                      {badge.progress !== undefined && badge.maxProgress && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{badge.progress} / {badge.maxProgress}</span>
                            <span>{Math.round(progress)}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      )}
                      
                      {badge.reward && (
                        <p className="text-xs text-green-600 mt-2">🎁 Reward: {badge.reward}</p>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Locked Badges */}
      {lockedBadges.length > 0 && (
        <div className="space-y-4">
          <h2>🔒 Future Achievements</h2>
          <div className="grid gap-3">
            {lockedBadges.map(badge => {
              const Icon = badge.icon;
              
              return (
                <Card key={badge.id} className="p-3 opacity-60">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <Icon className="text-muted-foreground" size={16} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-medium">???</h4>
                        <Badge variant="outline" className="text-xs">
                          {badge.rarity}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Keep progressing to unlock!</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Achievement Tips */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-green-50 border-0">
        <h3 className="mb-2">💡 Achievement Tips</h3>
        <ul className="text-sm space-y-1 text-muted-foreground">
          <li>• Complete lessons daily to build learning streaks</li>
          <li>• Set up automatic savings to build consistent habits</li>
          <li>• Try fractional investing to unlock investment badges</li>
          <li>• Share achievements with friends for bonus XP</li>
        </ul>
      </Card>
    </div>
  );
}