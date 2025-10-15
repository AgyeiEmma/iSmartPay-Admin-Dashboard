import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Progress } from './ui/progress';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface OnboardingData {
  phone: string;
  email: string;
  name: string;
  gender: string;
  financialLiteracy: number;
  investmentExperience: string;
  monthlyIncome: string;
  savingsGoal: string;
  riskTolerance: string;
  learningPreference: string;
}

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    phone: '',
    email: '',
    name: '',
    gender: '',
    financialLiteracy: 0,
    investmentExperience: '',
    monthlyIncome: '',
    savingsGoal: '',
    riskTolerance: '',
    learningPreference: ''
  });

  const totalSteps = 6;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
    else onComplete(data);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const updateData = (field: keyof OnboardingData, value: string | number) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  // Gender-aware messaging
  const getGenderAwareMessage = () => {
    if (data.gender === 'female') {
      return "Research shows women are excellent savers but often miss out on investment opportunities. We're here to change that! 💪";
    } else if (data.gender === 'male') {
      return "Building smart financial habits early gives you a huge advantage. Let's make your money work for you! 🚀";
    }
    return "Financial independence starts with smart habits. We'll guide you every step of the way! ✨";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6 pt-8">
          {step > 1 && (
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <ArrowLeft size={20} />
            </Button>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="text-blue-600" size={20} />
              <h1 className="text-lg">Welcome to iThrive with iSmart</h1>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground mt-1">
              Step {step} of {totalSteps} • ~3 minutes
            </p>
          </div>
        </div>

        {/* Step Content */}
        <Card className="p-6 mb-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">🚀</div>
                <h2>Let's Get Started!</h2>
                <p className="text-sm text-muted-foreground">
                  Create your account to begin your personalized financial journey
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={data.name}
                    onChange={(e) => updateData('name', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+233 xxx xxx xxx"
                    value={data.phone}
                    onChange={(e) => updateData('phone', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={data.email}
                    onChange={(e) => updateData('email', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">👤</div>
                <h2>Tell Us About You</h2>
                <p className="text-sm text-muted-foreground">
                  Help us personalize your financial education and goals
                </p>
              </div>
              
              <div>
                <Label>Gender (for personalized financial tips)</Label>
                <p className="text-xs text-blue-600 mb-2">
                  We tailor content to address different financial challenges and opportunities
                </p>
                <RadioGroup 
                  value={data.gender} 
                  onValueChange={(value) => updateData('gender', value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Prefer not to say</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Monthly Income Range</Label>
                <RadioGroup 
                  value={data.monthlyIncome} 
                  onValueChange={(value) => updateData('monthlyIncome', value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="under-500" id="under-500" />
                    <Label htmlFor="under-500">Under ₵500</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="500-1500" id="500-1500" />
                    <Label htmlFor="500-1500">₵500 - ₵1,500</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1500-3000" id="1500-3000" />
                    <Label htmlFor="1500-3000">₵1,500 - ₵3,000</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="over-3000" id="over-3000" />
                    <Label htmlFor="over-3000">Over ₵3,000</Label>
                  </div>
                </RadioGroup>
              </div>

              {data.gender && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    {getGenderAwareMessage()}
                  </p>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">📚</div>
                <h2>Investment Experience</h2>
                <p className="text-sm text-muted-foreground">
                  No judgment here! We'll meet you where you are
                </p>
              </div>
              
              <div>
                <Label>How familiar are you with investing?</Label>
                <p className="text-xs text-blue-600 mb-2">
                  {data.gender === 'female' 
                    ? "Fun fact: Women typically outperform men in investing when they start! 🌟"
                    : "Everyone starts somewhere - we'll help you build confidence"}
                </p>
                <RadioGroup 
                  value={data.investmentExperience} 
                  onValueChange={(value) => updateData('investmentExperience', value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="complete-beginner" id="complete-beginner" />
                    <Label htmlFor="complete-beginner">Complete beginner - What's a stock? 🤔</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="beginner" id="beginner" />
                    <Label htmlFor="beginner">Beginner - I've heard the terms but never invested</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intermediate" id="intermediate" />
                    <Label htmlFor="intermediate">Intermediate - I know the basics</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="advanced" id="advanced" />
                    <Label htmlFor="advanced">Advanced - I'm quite knowledgeable</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>What's your main financial goal right now?</Label>
                <RadioGroup 
                  value={data.savingsGoal} 
                  onValueChange={(value) => updateData('savingsGoal', value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="emergency" id="emergency" />
                    <Label htmlFor="emergency">Build an emergency fund (3-6 months expenses)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="investment" id="investment" />
                    <Label htmlFor="investment">Start investing for the future</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="goal" id="goal" />
                    <Label htmlFor="goal">Save for something specific (travel, gadgets, etc.)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="learn" id="learn" />
                    <Label htmlFor="learn">Learn about money management first</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">⚖️</div>
                <h2>Risk & Learning Style</h2>
                <p className="text-sm text-muted-foreground">
                  Help us match you with the right investment strategies and education
                </p>
              </div>
              
              <div>
                <Label>How comfortable are you with investment risk?</Label>
                <p className="text-xs text-blue-600 mb-2">
                  {data.gender === 'female' 
                    ? "Women often prefer safer investments initially - that's totally fine and smart!"
                    : "Understanding risk is key to smart investing"}
                </p>
                <RadioGroup 
                  value={data.riskTolerance} 
                  onValueChange={(value) => updateData('riskTolerance', value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="conservative" id="conservative" />
                    <Label htmlFor="conservative">Conservative - Safety first (T-bills, fixed deposits)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderate" id="moderate" />
                    <Label htmlFor="moderate">Moderate - Balanced approach (mix of stocks & bonds)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="aggressive" id="aggressive" />
                    <Label htmlFor="aggressive">Growth-focused - Higher risk for higher returns</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>How do you prefer to learn about investing?</Label>
                <RadioGroup 
                  value={data.learningPreference} 
                  onValueChange={(value) => updateData('learningPreference', value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bite-sized" id="bite-sized" />
                    <Label htmlFor="bite-sized">Short, bite-sized lessons (5 mins daily)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hands-on" id="hands-on" />
                    <Label htmlFor="hands-on">Learning by doing (practice with small amounts)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="comprehensive" id="comprehensive" />
                    <Label htmlFor="comprehensive">Detailed guides and tutorials</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="text-blue-800 mb-2">💡 What you'll learn:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• T-bills: Government bonds (safe, predictable returns)</li>
                  <li>• Stocks: Company shares (higher growth potential)</li>
                  <li>• Mutual funds: Diversified portfolios (balanced risk)</li>
                  <li>• 70-20-10 rule: Smart money allocation framework</li>
                </ul>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">🎯</div>
                <h2>Your Personalized Path</h2>
                <p className="text-sm text-muted-foreground">
                  Based on your responses, here's your tailored financial journey
                </p>
              </div>
              
              <div className="space-y-4">
                <Card className="p-4 bg-blue-50 border-blue-200">
                  <h3 className="text-blue-800 mb-2">
                    {data.gender === 'female' ? '👩‍💼 Recommended for You' : '🎯 Your Perfect Path'}
                  </h3>
                  <p className="text-sm text-blue-700">
                    {data.investmentExperience === 'complete-beginner' || data.investmentExperience === 'beginner'
                      ? (data.gender === 'female' 
                          ? "Perfect! Start with our Learn path to build confidence, then explore T-bills (super safe!) before moving to stocks and mutual funds. You've got this! 💪"
                          : "Great starting point! Begin with financial basics, then try T-bills for safety, and gradually explore stocks and mutual funds.")
                      : data.savingsGoal === 'learn'
                      ? "Excellent choice! Our comprehensive Learn & Grow section will prepare you for smart investing decisions."
                      : "You're ready to dive into micro-goals and explore various investment options including T-bills, stocks, and mutual funds!"}
                  </p>
                </Card>
                
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-2xl mb-1">📚</div>
                    <p className="text-xs font-medium">Learn</p>
                    <p className="text-xs text-muted-foreground">Financial literacy</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-2xl mb-1">🎯</div>
                    <p className="text-xs font-medium">Save</p>
                    <p className="text-xs text-muted-foreground">Micro-goals</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="text-2xl mb-1">📈</div>
                    <p className="text-xs font-medium">Invest</p>
                    <p className="text-xs text-muted-foreground">T-bills, stocks, funds</p>
                  </div>
                </div>

                {data.gender === 'female' && (
                  <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                    <h4 className="text-pink-800 mb-2">🌟 Girl Power Financial Facts:</h4>
                    <ul className="text-sm text-pink-700 space-y-1">
                      <li>• Women who invest earn 0.4% more annually than men</li>
                      <li>• You're already great at saving - investing is the next step!</li>
                      <li>• Starting early gives you a huge advantage with compound interest</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">🎉</div>
                <h2>
                  {data.gender === 'female' ? "You're Ready to Thrive!" : "You're All Set!"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Welcome to your personalized financial empowerment journey
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="mb-2 text-blue-800">Your Financial Profile</h3>
                  <div className="text-sm space-y-1 text-blue-700">
                    <p><strong>Experience Level:</strong> {data.investmentExperience === 'complete-beginner' ? 'Complete Beginner' : data.investmentExperience.charAt(0).toUpperCase() + data.investmentExperience.slice(1)}</p>
                    <p><strong>Primary Goal:</strong> {
                      data.savingsGoal === 'emergency' ? 'Emergency Fund' :
                      data.savingsGoal === 'investment' ? 'Start Investing' :
                      data.savingsGoal === 'goal' ? 'Specific Goals' : 'Learning First'
                    }</p>
                    <p><strong>Risk Comfort:</strong> {data.riskTolerance.charAt(0).toUpperCase() + data.riskTolerance.slice(1)}</p>
                    <p><strong>Learning Style:</strong> {
                      data.learningPreference === 'bite-sized' ? 'Bite-sized lessons' :
                      data.learningPreference === 'hands-on' ? 'Hands-on practice' : 'Comprehensive guides'
                    }</p>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="text-green-800 mb-2">🎁 Welcome Bonus</h4>
                  <p className="text-sm text-green-700">
                    {data.gender === 'female' 
                      ? "Complete your first micro-goal to unlock your \"Girl Power\" badge and ₵5 bonus! You're about to make some smart money moves! 💎"
                      : "Complete your first micro-goal to unlock your \"First Steps\" badge and ₵5 bonus!"}
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="text-blue-800 mb-2">📚 Your Learning Journey Includes:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Treasury Bills (T-bills) - Safe government investments</li>
                    <li>• Stocks & Mutual Funds - Building wealth through equity</li>
                    <li>• 70-20-10 Budget Rule - Smart money allocation</li>
                    <li>• Risk Management - Protecting your future</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Navigation */}
        <Button 
          onClick={handleNext} 
          className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
          disabled={
            (step === 1 && (!data.name || !data.phone || !data.email)) ||
            (step === 2 && (!data.gender || !data.monthlyIncome)) ||
            (step === 3 && (!data.investmentExperience || !data.savingsGoal)) ||
            (step === 4 && (!data.riskTolerance || !data.learningPreference))
          }
        >
          {step === totalSteps ? 'Start My Journey!' : 'Continue'}
        </Button>
      </div>
    </div>
  );
}