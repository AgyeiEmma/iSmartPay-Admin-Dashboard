import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { PlayCircle, Clock, Star, TrendingUp, Shield, PiggyBank, BookOpen, ChevronRight } from 'lucide-react';

export function LearnTab() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const lessonCategories = [
    {
      id: 'budgeting',
      name: 'Smart Budgeting',
      icon: PiggyBank,
      color: 'bg-blue-100 text-blue-600',
      progress: 75,
      lessons: 8,
      description: '70-20-10 rule, expense tracking, money mindset'
    },
    {
      id: 'investing',
      name: 'Investment Basics',
      icon: TrendingUp,
      color: 'bg-green-100 text-green-600',
      progress: 25,
      lessons: 12,
      description: 'T-bills, stocks, mutual funds, GSE basics'
    },
    {
      id: 'emergency',
      name: 'Emergency Fund',
      icon: Shield,
      color: 'bg-red-100 text-red-600',
      progress: 100,
      lessons: 5,
      description: 'Building financial security and peace of mind'
    },
    {
      id: 'empowerment',
      name: 'Financial Empowerment',
      icon: BookOpen,
      color: 'bg-purple-100 text-purple-600',
      progress: 40,
      lessons: 10,
      description: 'Gender-specific strategies, confidence building'
    }
  ];

  const featuredLessons = [
    {
      id: 1,
      title: "The 70-20-10 Rule Explained",
      description: "Master the golden rule: 70% needs, 20% wants, 10% savings/investments",
      duration: "5 min",
      category: "Budgeting",
      difficulty: "Beginner",
      points: 10,
      isNew: true,
      genderFocus: false
    },
    {
      id: 2,
      title: "Treasury Bills (T-bills) for Beginners",
      description: "Safe government investments with guaranteed returns - perfect starting point!",
      duration: "7 min",
      category: "Investing",
      difficulty: "Beginner",
      points: 15,
      isNew: true,
      genderFocus: false
    },
    {
      id: 3,
      title: "Building Wealth as a Young Woman",
      description: "Overcome the confidence gap and investment barriers - you've got this!",
      duration: "10 min",
      category: "Empowerment",
      difficulty: "Intermediate",
      points: 20,
      isNew: true,
      genderFocus: true
    },
    {
      id: 4,
      title: "Ghana Stock Exchange (GSE) Simplified",
      description: "Local stocks made easy - invest in companies you know and love",
      duration: "8 min",
      category: "Investing",
      difficulty: "Intermediate",
      points: 18,
      isNew: false,
      genderFocus: false
    },
    {
      id: 5,
      title: "Mutual Funds: Diversification Made Simple",
      description: "Let professionals manage your investments while you learn",
      duration: "6 min",
      category: "Investing",
      difficulty: "Beginner",
      points: 12,
      isNew: true,
      genderFocus: false
    },
    {
      id: 6,
      title: "Breaking Financial Stereotypes",
      description: "Why women often outperform men in investing + practical tips",
      duration: "9 min",
      category: "Empowerment",
      difficulty: "Intermediate",
      points: 16,
      isNew: false,
      genderFocus: true
    }
  ];

  // Investment lessons specifically about T-bills, stocks, mutual funds
  const investmentLessons = [
    {
      id: 'tbills',
      title: 'Treasury Bills (T-bills)',
      description: 'Government-backed, risk-free investments',
      lessons: [
        'What are T-bills and why they\'re super safe',
        'How to buy T-bills in Ghana',
        'T-bills vs Fixed Deposits comparison',
        'Building a T-bills ladder strategy'
      ]
    },
    {
      id: 'stocks',
      title: 'Stock Market Investing',
      description: 'Own shares in your favorite companies',
      lessons: [
        'Understanding stocks and shares',
        'Ghana Stock Exchange (GSE) guide',
        'How to research companies',
        'Fractional investing with small amounts'
      ]
    },
    {
      id: 'mutual-funds',
      title: 'Mutual Funds',
      description: 'Professional portfolio management',
      lessons: [
        'What are mutual funds?',
        'Types of mutual funds in Ghana',
        'Fees and expense ratios explained',
        'Choosing the right fund for you'
      ]
    }
  ];

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1>Learn & Grow</h1>
        <p className="text-sm text-muted-foreground">
          Build your financial knowledge with beginner-friendly, empowering content
        </p>
      </div>

      {/* Learning Streak */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg text-blue-800">Learning Streak</h2>
            <p className="text-sm text-blue-600">You're building great habits!</p>
          </div>
          <div className="text-3xl">🔥</div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold text-blue-600">12 days</div>
          <div className="flex-1">
            <Progress value={80} className="h-2" />
            <p className="text-xs text-blue-600 mt-1">8 more days for your "Consistent Learner" badge!</p>
          </div>
        </div>
      </Card>

      {/* Investment Education Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2>Investment Education</h2>
          <Badge className="bg-blue-100 text-blue-600">Beginner-Friendly</Badge>
        </div>
        
        {investmentLessons.map((topic) => (
          <Card key={topic.id} className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-medium text-blue-800">{topic.title}</h3>
                <p className="text-sm text-muted-foreground">{topic.description}</p>
              </div>
              <ChevronRight className="text-blue-600" size={20} />
            </div>
            
            <div className="space-y-2">
              {topic.lessons.slice(0, 2).map((lesson, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                  <span className="text-gray-700">{lesson}</span>
                </div>
              ))}
              {topic.lessons.length > 2 && (
                <p className="text-xs text-blue-600 ml-4">
                  +{topic.lessons.length - 2} more lessons
                </p>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Progress Categories */}
      <div className="space-y-4">
        <h2>Your Learning Journey</h2>
        {lessonCategories.map((category) => {
          const Icon = category.icon;
          return (
            <Card 
              key={category.id} 
              className="p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${category.color}`}>
                  <Icon size={24} />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-medium">{category.name}</h3>
                    <span className="text-sm text-muted-foreground">
                      {category.progress}%
                    </span>
                  </div>
                  <Progress value={category.progress} className="h-2 mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {category.lessons} lessons available
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Featured Lessons */}
      <div className="space-y-4">
        <h2>Featured Lessons</h2>
        {featuredLessons.map((lesson) => (
          <Card key={lesson.id} className="p-4">
            <div className="flex gap-4">
              <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${
                lesson.genderFocus 
                  ? 'bg-gradient-to-br from-pink-100 to-purple-100' 
                  : 'bg-gradient-to-br from-blue-100 to-blue-50'
              }`}>
                <PlayCircle className={lesson.genderFocus ? "text-purple-600" : "text-blue-600"} size={24} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium">{lesson.title}</h3>
                    <div className="flex gap-2 mt-1">
                      {lesson.isNew && (
                        <Badge className="bg-green-100 text-green-600 text-xs">New</Badge>
                      )}
                      {lesson.genderFocus && (
                        <Badge className="bg-pink-100 text-pink-600 text-xs">👩‍💼 Empowerment</Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-orange-600">
                      <Star size={12} />
                      <span>{lesson.points} XP</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">
                  {lesson.description}
                </p>
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{lesson.duration}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {lesson.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {lesson.difficulty}
                  </Badge>
                </div>
                
                <Button 
                  size="sm" 
                  className={`w-full ${
                    lesson.genderFocus 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                      : 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900'
                  }`}
                >
                  Start Lesson
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Daily Challenge */}
      <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 border-0">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-2xl">⚡</div>
          <div>
            <h3 className="text-green-800">Daily Challenge</h3>
            <p className="text-sm text-green-600">Complete for bonus XP!</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg mb-4 border border-green-200">
          <p className="text-sm font-medium">
            "If you invest ₵100 monthly in T-bills at 25% annual return, how much will you have after 1 year?"
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Hint: Don't forget about compound interest! 📈
          </p>
        </div>
        
        <Button className="w-full bg-green-600 hover:bg-green-700">
          Take Challenge (+25 XP)
        </Button>
      </Card>

      {/* Success Stories */}
      <Card className="p-6 bg-gradient-to-br from-pink-50 to-purple-50 border-0">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-2xl">🌟</div>
          <div>
            <h3 className="text-purple-800">Success Story</h3>
            <p className="text-sm text-purple-600">Real inspiration from real users</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-purple-200">
          <p className="text-sm italic">
            "I started with just ₵20 goals and T-bills. Now I'm confidently investing in mutual funds! 
            The gender-focused content really helped me overcome my fear of investing." 
          </p>
          <p className="text-xs text-purple-600 mt-2 font-medium">- Akosua, 24, Marketing Professional</p>
        </div>
      </Card>
    </div>
  );
}