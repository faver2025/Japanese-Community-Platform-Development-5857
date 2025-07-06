import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import AuthModal from '../auth/AuthModal';
import OnboardingWizard from '../onboarding/OnboardingWizard';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowRight, FiPlay, FiUsers, FiDollarSign, FiTrendingUp } = FiIcons;

const Hero = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleGetStarted = () => {
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = (data) => {
    setShowOnboarding(false);
    console.log('Onboarding completed:', data);
  };

  const stats = [
    { icon: FiUsers, label: 'アクティブユーザー', value: '10,000+' },
    { icon: FiDollarSign, label: '総売上', value: '¥500M+' },
    { icon: FiTrendingUp, label: '成長率', value: '300%' }
  ];

  if (showOnboarding) {
    return (
      <OnboardingWizard onComplete={handleOnboardingComplete} />
    );
  }

  return (
    <>
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900"
              >
                コミュニティと
                <br />
                <span className="text-primary-600">コンテンツ販売</span>
                <br />
                をワンストップで
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-600 max-w-3xl mx-auto"
              >
                日本人クリエイター向けの究極のプラットフォーム。
                Google・LINEログインで即開始、テンプレートで30分でローンチ。
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                size="lg"
                className="px-8 py-4 text-lg"
                onClick={handleGetStarted}
              >
                今すぐ始める
                <SafeIcon icon={FiArrowRight} className="ml-2 h-5 w-5" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg"
                onClick={() => setShowAuthModal(true)}
              >
                <SafeIcon icon={FiPlay} className="mr-2 h-5 w-5" />
                デモを見る
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
                    <SafeIcon icon={stat.icon} className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default Hero;