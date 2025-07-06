import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CommunityCard from './CommunityCard';
import { supabase } from '../../lib/supabase';

const CommunityList = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    try {
      const { data, error } = await supabase
        .from('communities_cm9x7k2n4')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching communities:', error);
        // Use mock data if database query fails
        setCommunities(mockCommunities);
      } else {
        // Transform data to match expected format
        const transformedData = data.map(community => ({
          ...community,
          memberCount: community.member_count,
          price: community.pricing?.monthly || 0,
          rating: 4.8, // Mock rating
          features: community.settings?.features || [],
          image: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000)}?w=400&h=200&fit=crop`
        }));
        setCommunities(transformedData);
      }
    } catch (error) {
      console.error('Error fetching communities:', error);
      setCommunities(mockCommunities);
    } finally {
      setLoading(false);
    }
  };

  const mockCommunities = [
    {
      id: 1,
      name: 'デザインマスタークラス',
      description: 'プロデザイナーから学ぶ実践的なデザイン技術',
      memberCount: 1250,
      rating: 4.8,
      price: 2980,
      features: [
        '週2回のライブセッション',
        'ポートフォリオ添削',
        'デザインツール使い放題',
        'コミュニティ限定素材'
      ],
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop'
    },
    {
      id: 2,
      name: 'プログラミング道場',
      description: 'ゼロから始めるWebアプリケーション開発',
      memberCount: 890,
      rating: 4.9,
      price: 1980,
      features: [
        'ハンズオン形式の学習',
        'メンター制度',
        'コードレビュー',
        '転職サポート'
      ],
      image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=200&fit=crop'
    },
    {
      id: 3,
      name: 'ビジネス戦略サロン',
      description: '経営者・起業家のための戦略コミュニティ',
      memberCount: 450,
      rating: 4.7,
      price: 4980,
      features: [
        '月1回の経営者セミナー',
        'ネットワーキングイベント',
        'ビジネスプラン添削',
        '投資家紹介'
      ],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop'
    }
  ];

  const handleJoinCommunity = (community) => {
    console.log('Joining community:', community.name);
    // TODO: Implement join community functionality
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-64"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 mb-4"
        >
          人気のコミュニティ
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-600"
        >
          あなたの興味に合ったコミュニティを見つけよう
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {communities.map((community, index) => (
          <motion.div
            key={community.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <CommunityCard
              community={community}
              onJoin={handleJoinCommunity}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CommunityList;