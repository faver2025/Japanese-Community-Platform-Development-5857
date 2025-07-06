import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import Button from '../ui/Button';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiStar } = FiIcons;

const plans = [
  {
    name: 'スターター',
    price: 0,
    description: 'はじめての方におすすめ',
    features: [
      'コミュニティ作成 1個',
      'メンバー数 50人まで',
      'ベーシック分析',
      'メール通知',
      'Google・LINEログイン'
    ],
    popular: false,
    cta: '無料で始める'
  },
  {
    name: 'プロ',
    price: 2980,
    description: '本格的に運営したい方向け',
    features: [
      'コミュニティ作成 5個',
      'メンバー数 1,000人まで',
      '高度な分析・レポート',
      'LINE・メール・Push通知',
      'カスタムドメイン',
      'ライブ配信機能',
      'Stripe決済連携'
    ],
    popular: true,
    cta: '14日間無料トライアル'
  },
  {
    name: 'エンタープライズ',
    price: 9800,
    description: '大規模運営・法人向け',
    features: [
      'コミュニティ作成 無制限',
      'メンバー数 無制限',
      '専用サポート',
      'カスタム機能開発',
      'SLA保証',
      'API アクセス',
      'ホワイトラベル'
    ],
    popular: false,
    cta: '相談する'
  }
];

const Pricing = () => {
  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            シンプルで透明な料金体系
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            あなたの成長に合わせて選択できる料金プラン。
            売上手数料は業界最安水準の5%〜
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Card className={`h-full relative ${
                plan.popular 
                  ? 'ring-2 ring-primary-500 shadow-lg' 
                  : 'hover:shadow-lg'
              } transition-shadow duration-300`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                      <SafeIcon icon={FiStar} className="h-4 w-4 mr-1" />
                      人気
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price === 0 ? '無料' : `¥${plan.price.toLocaleString()}`}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-gray-500 ml-2">/月</span>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <SafeIcon icon={FiCheck} className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    className="w-full"
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-600 mb-4"
          >
            売上手数料について
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">5%</div>
              <div className="text-sm text-gray-500">月売上 100万円未満</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">7%</div>
              <div className="text-sm text-gray-500">月売上 100万円以上</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">10%</div>
              <div className="text-sm text-gray-500">月売上 1000万円以上</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;