import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import Button from '../ui/Button';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../auth/AuthProvider';

const { FiUsers, FiDollarSign, FiEye, FiTrendingUp, FiPlus, FiMessageCircle } = FiIcons;

const DashboardHome = () => {
  const { user } = useAuth();
  const [communities, setCommunities] = useState([]);
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalRevenue: 0,
    totalViews: 0,
    growthRate: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      // Fetch user's communities
      const { data: communitiesData, error: communitiesError } = await supabase
        .from('communities_cm9x7k2n4')
        .select(`
          *,
          community_members_cm9x7k2n4!inner(count)
        `)
        .eq('owner_id', user.id);

      if (communitiesError) {
        console.error('Error fetching communities:', communitiesError);
        // Set mock data for demo
        setCommunities([
          {
            id: '1',
            name: 'デザインマスタークラス',
            member_count: 125,
            pricing: { monthly: 2980 }
          },
          {
            id: '2',
            name: 'プログラミング道場',
            member_count: 89,
            pricing: { monthly: 1980 }
          }
        ]);
      } else {
        setCommunities(communitiesData || []);
      }

      // Calculate stats
      const totalMembers = communitiesData?.reduce((sum, community) => 
        sum + (community.member_count || 0), 0) || 214;
      const totalRevenue = communitiesData?.reduce((sum, community) => 
        sum + (community.pricing?.monthly || 0) * (community.member_count || 0), 0) || 587420;

      setStats({
        totalMembers,
        totalRevenue,
        totalViews: Math.floor(totalMembers * 15.7), // Mock calculation
        growthRate: 23.4 // Mock data
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Set mock data for demo
      setStats({
        totalMembers: 214,
        totalRevenue: 587420,
        totalViews: 3360,
        growthRate: 23.4
      });
    } finally {
      setLoading(false);
    }
  };

  const dashboardStats = [
    {
      title: '総メンバー数',
      value: stats.totalMembers.toLocaleString(),
      change: '+12.5%',
      icon: FiUsers,
      color: 'text-blue-600'
    },
    {
      title: '今月の収益',
      value: `¥${stats.totalRevenue.toLocaleString()}`,
      change: '+8.2%',
      icon: FiDollarSign,
      color: 'text-green-600'
    },
    {
      title: '今月のビュー',
      value: stats.totalViews.toLocaleString(),
      change: '+15.3%',
      icon: FiEye,
      color: 'text-purple-600'
    },
    {
      title: '成長率',
      value: `${stats.growthRate}%`,
      change: '+2.1%',
      icon: FiTrendingUp,
      color: 'text-orange-600'
    }
  ];

  const recentActivities = [
    {
      type: 'member',
      message: '新しいメンバーが3人参加しました',
      time: '2分前'
    },
    {
      type: 'revenue',
      message: '月額プランの購入がありました',
      time: '15分前'
    },
    {
      type: 'content',
      message: '新しいコンテンツが投稿されました',
      time: '1時間前'
    },
    {
      type: 'message',
      message: '5件の新しいメッセージがあります',
      time: '2時間前'
    }
  ];

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded-lg mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-6 text-white"
      >
        <h1 className="text-2xl font-bold mb-2">
          おかえりなさい、{user?.user_metadata?.full_name || user?.email}！
        </h1>
        <p className="text-primary-100 mb-4">
          {communities.length > 0 
            ? 'あなたのコミュニティは順調に成長しています' 
            : '最初のコミュニティを作成しましょう'}
        </p>
        <Button variant="secondary" size="sm">
          <SafeIcon icon={FiPlus} className="mr-2 h-4 w-4" />
          新しいコミュニティを作成
        </Button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                    <SafeIcon icon={stat.icon} className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>最近のアクティビティ</CardTitle>
              <CardDescription>コミュニティの最新動向</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Communities Overview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>コミュニティ一覧</CardTitle>
              <CardDescription>あなたのコミュニティの概要</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {communities.length > 0 ? (
                  communities.map((community) => (
                    <div key={community.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">{community.name}</h3>
                        <p className="text-sm text-gray-600">{community.member_count || 0}人のメンバー</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          ¥{((community.pricing?.monthly || 0) * (community.member_count || 0)).toLocaleString()}
                        </p>
                        <p className="text-sm text-green-600">+12.5%</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">まだコミュニティがありません</p>
                    <Button size="sm">
                      <SafeIcon icon={FiPlus} className="mr-2 h-4 w-4" />
                      最初のコミュニティを作成
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardHome;