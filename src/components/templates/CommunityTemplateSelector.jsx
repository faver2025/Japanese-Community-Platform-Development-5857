import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import Button from '../ui/Button';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiBook, FiStar, FiCheck } = FiIcons;

const templates = [
  {
    id: 'fanclub',
    name: 'ファンクラブ型',
    description: '有名人・インフルエンサー向けのファンコミュニティ',
    icon: FiStar,
    features: [
      '限定投稿・写真共有',
      'ファンとの交流チャット',
      '月額サブスクリプション',
      'ライブ配信機能'
    ],
    pricing: {
      monthly: 980,
      yearly: 9800
    },
    color: 'bg-gradient-to-br from-pink-500 to-purple-600'
  },
  {
    id: 'course',
    name: '講座型',
    description: 'オンライン教育・スキルアップコミュニティ',
    icon: FiBook,
    features: [
      'ステップバイステップ講座',
      '進捗トラッキング',
      'Q&Aフォーラム',
      '修了証発行'
    ],
    pricing: {
      monthly: 1980,
      yearly: 19800
    },
    color: 'bg-gradient-to-br from-blue-500 to-cyan-600'
  },
  {
    id: 'salon',
    name: 'サロン型',
    description: '専門家・起業家向けのクローズドコミュニティ',
    icon: FiUsers,
    features: [
      'メンバー限定情報',
      '専門家による指導',
      'ネットワーキング',
      'イベント・セミナー'
    ],
    pricing: {
      monthly: 2980,
      yearly: 29800
    },
    color: 'bg-gradient-to-br from-emerald-500 to-teal-600'
  }
];

const CommunityTemplateSelector = ({ onSelect, selectedTemplate }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          コミュニティテンプレートを選択
        </h2>
        <p className="text-gray-600">
          あなたのコミュニティに最適なテンプレートを選択してください
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((template) => (
          <motion.div
            key={template.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="cursor-pointer"
            onClick={() => onSelect(template)}
          >
            <Card className={`relative overflow-hidden transition-all duration-300 ${
              selectedTemplate?.id === template.id 
                ? 'ring-2 ring-primary-500 shadow-lg' 
                : 'hover:shadow-md'
            }`}>
              <div className={`h-24 ${template.color} relative`}>
                <div className="absolute inset-0 bg-black bg-opacity-20" />
                <div className="absolute top-4 left-4 text-white">
                  <SafeIcon icon={template.icon} className="h-8 w-8" />
                </div>
                {selectedTemplate?.id === template.id && (
                  <div className="absolute top-4 right-4 text-white">
                    <SafeIcon icon={FiCheck} className="h-6 w-6" />
                  </div>
                )}
              </div>
              
              <CardHeader>
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      ¥{template.pricing.monthly.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">月額</div>
                  </div>
                  
                  <ul className="space-y-2">
                    {template.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <SafeIcon icon={FiCheck} className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CommunityTemplateSelector;