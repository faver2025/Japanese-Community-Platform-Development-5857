import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import CommunityTemplateSelector from '../templates/CommunityTemplateSelector';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import toast from 'react-hot-toast';

const { FiArrowLeft, FiArrowRight, FiCheck, FiGlobe, FiCreditCard, FiSettings, FiShare2 } = FiIcons;

const steps = [
  {
    id: 'basic',
    title: 'コミュニティ基本情報',
    description: 'コミュニティ名とURLを設定してください',
    icon: FiGlobe
  },
  {
    id: 'template',
    title: 'テンプレート選択',
    description: 'コミュニティのタイプを選択してください',
    icon: FiSettings
  },
  {
    id: 'payment',
    title: '決済設定',
    description: 'Stripe連携と事業者情報を設定してください',
    icon: FiCreditCard
  },
  {
    id: 'customize',
    title: 'カスタマイズ',
    description: 'チャンネルとコースの初期設定を行います',
    icon: FiSettings
  },
  {
    id: 'share',
    title: '招待リンク',
    description: 'メンバーを招待するリンクを発行します',
    icon: FiShare2
  }
];

const OnboardingWizard = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    template: null,
    stripeConnected: false,
    businessInfo: {
      name: '',
      email: '',
      phone: ''
    }
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    try {
      // Mock API call to create community
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('コミュニティが作成されました！');
      onComplete(formData);
    } catch (error) {
      toast.error('エラーが発生しました。もう一度お試しください。');
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.name && formData.url;
      case 1:
        return formData.template;
      case 2:
        return formData.stripeConnected && formData.businessInfo.name;
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                コミュニティ名
              </label>
              <Input
                placeholder="例: 田中太郎のデザインサロン"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL (半角英数字)
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  https://community.app/
                </span>
                <Input
                  placeholder="design-salon"
                  value={formData.url}
                  onChange={(e) => setFormData({...formData, url: e.target.value})}
                  className="rounded-l-none"
                />
              </div>
            </div>
          </div>
        );
      
      case 1:
        return (
          <CommunityTemplateSelector
            onSelect={(template) => setFormData({...formData, template})}
            selectedTemplate={formData.template}
          />
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">決済設定</h3>
              <p className="text-gray-600">
                Stripeアカウントを連携して決済を有効にしてください
              </p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setFormData({...formData, stripeConnected: true})}
              >
                <SafeIcon icon={FiCreditCard} className="mr-2 h-4 w-4" />
                Stripeアカウントを連携
              </Button>
            </div>

            {formData.stripeConnected && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    事業者名
                  </label>
                  <Input
                    placeholder="株式会社○○"
                    value={formData.businessInfo.name}
                    onChange={(e) => setFormData({
                      ...formData,
                      businessInfo: {...formData.businessInfo, name: e.target.value}
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    メールアドレス
                  </label>
                  <Input
                    type="email"
                    placeholder="contact@example.com"
                    value={formData.businessInfo.email}
                    onChange={(e) => setFormData({
                      ...formData,
                      businessInfo: {...formData.businessInfo, email: e.target.value}
                    })}
                  />
                </div>
              </div>
            )}
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">初期設定を完了中...</h3>
              <p className="text-gray-600">
                選択したテンプレートに基づいてコミュニティを設定しています
              </p>
            </div>
            
            <div className="space-y-4">
              {['チャンネル作成', 'コース設定', '通知設定'].map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <SafeIcon icon={FiCheck} className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">🎉 セットアップ完了！</h3>
              <p className="text-gray-600">
                招待リンクを使ってメンバーを招待しましょう
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <code className="text-sm text-gray-700">
                  https://community.app/{formData.url}
                </code>
                <Button variant="outline" size="sm">
                  コピー
                </Button>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                index <= currentStep 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-200 text-gray-400'
              }`}>
                {index < currentStep ? (
                  <SafeIcon icon={FiCheck} className="h-5 w-5" />
                ) : (
                  <SafeIcon icon={step.icon} className="h-5 w-5" />
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-1 mx-2 ${
                  index < currentStep ? 'bg-primary-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {steps[currentStep].title}
          </h1>
          <p className="text-gray-600">
            {steps[currentStep].description}
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          <SafeIcon icon={FiArrowLeft} className="mr-2 h-4 w-4" />
          戻る
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={!canProceed()}
        >
          {currentStep === steps.length - 1 ? '完了' : '次へ'}
          {currentStep < steps.length - 1 && (
            <SafeIcon icon={FiArrowRight} className="ml-2 h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default OnboardingWizard;