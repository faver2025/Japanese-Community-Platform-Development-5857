import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import Button from '../ui/Button';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiStar, FiArrowRight } = FiIcons;

const CommunityCard = ({ community, onJoin }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="h-48 bg-gradient-to-br from-primary-500 to-primary-600 relative">
          <div className="absolute inset-0 bg-black bg-opacity-20" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-lg font-semibold">{community.name}</h3>
            <p className="text-sm opacity-90">{community.description}</p>
          </div>
        </div>
        
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-500">
                <SafeIcon icon={FiUsers} className="h-4 w-4 mr-1" />
                {community.memberCount}人
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <SafeIcon icon={FiStar} className="h-4 w-4 mr-1" />
                {community.rating}
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-gray-900">
                ¥{community.price.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">月額</div>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            {community.features.slice(0, 3).map((feature, index) => (
              <div key={index} className="text-sm text-gray-600">
                • {feature}
              </div>
            ))}
          </div>
          
          <Button 
            className="w-full" 
            onClick={() => onJoin(community)}
          >
            参加する
            <SafeIcon icon={FiArrowRight} className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CommunityCard;