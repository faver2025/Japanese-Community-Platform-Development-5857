import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiBook, FiCreditCard, FiSmartphone, FiGlobe, FiShield } = FiIcons;

const features = [
  {
    icon: FiUsers,
    title: 'コミュニティ運営',
    description: 'グループタイムライン、チャンネル分割、リアルタイム通知でメンバーとの絆を深める',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: FiBook,
    title: 'コンテンツ配信',
    description: 'モジュール化コース、ライブ配信、進捗トラッキングで質の高い学習体験を提供',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: FiCreditCard,
    title: 'マネタイズ',
    description: 'Stripe決済、サブスク、単品販売、自動領収書発行でスムーズな収益化',
    gradient: 'from-green-500 to-teal-500'
  },
  {
    icon: FiSmartphone,
    title: 'Google・LINE連携',
    description: 'Google One Tap、LINEログイン、メール認証で簡単サインアップ',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    icon: FiGlobe,
    title: 'テンプレート機能',
    description: 'ファンクラブ型、講座型、サロン型のテンプレートで30分でローンチ',
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    icon: FiShield,
    title: '日本法令対応',
    description: '消費税、インボイス制度、特定商取引法、個人情報保護法に完全対応',
    gradient: 'from-emerald-500 to-blue-500'
  }
];

const Features = () => {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            なぜ選ばれるのか
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            日本のクリエイターのために特別に設計された、
            最も使いやすく、最も収益性の高いプラットフォーム
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4`}>
                    <SafeIcon icon={feature.icon} className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;