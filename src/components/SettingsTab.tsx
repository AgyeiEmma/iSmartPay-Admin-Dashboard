import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { User, Bell, Shield, CreditCard, HelpCircle, LogOut } from 'lucide-react';

export function SettingsTab() {
  const settings = [
    {
      icon: Bell,
      title: 'Push Notifications',
      description: 'Get notified about your goals and achievements',
      hasSwitch: true,
      enabled: true
    },
    {
      icon: Shield,
      title: 'Biometric Security',
      description: 'Use fingerprint or face ID to access your account',
      hasSwitch: true,
      enabled: false
    },
    {
      icon: User,
      title: 'Profile & Preferences',
      description: 'Update your personal information',
      hasSwitch: false
    },
    {
      icon: CreditCard,
      title: 'Payment Methods',
      description: 'Manage your linked accounts and cards',
      hasSwitch: false
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      description: 'Get help or contact customer support',
      hasSwitch: false
    }
  ];

  return (
    <div className="p-4 pb-20 space-y-6">
      <div>
        <h1>Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Profile Section */}
      <Card className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xl font-bold">A</span>
          </div>
          <div>
            <h2 className="font-medium">Alex Johnson</h2>
            <p className="text-sm text-muted-foreground">alex.johnson@email.com</p>
            <p className="text-sm text-green-600">✨ Premium Member</p>
          </div>
        </div>
        <Button variant="outline" className="w-full">
          Edit Profile
        </Button>
      </Card>

      {/* Settings List */}
      <div className="space-y-3">
        {settings.map((setting, index) => {
          const Icon = setting.icon;
          return (
            <Card key={index} className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <Icon size={20} className="text-muted-foreground" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium">{setting.title}</h3>
                  <p className="text-sm text-muted-foreground">{setting.description}</p>
                </div>
                
                {setting.hasSwitch ? (
                  <Switch defaultChecked={setting.enabled} />
                ) : (
                  <Button variant="ghost" size="sm">→</Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Danger Zone */}
      <Card className="p-6 border-red-200">
        <h3 className="font-medium text-red-600 mb-4">Account Actions</h3>
        <div className="space-y-3">
          <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
            <LogOut size={16} className="mr-2" />
            Sign Out
          </Button>
          <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
            Delete Account
          </Button>
        </div>
      </Card>
    </div>
  );
}