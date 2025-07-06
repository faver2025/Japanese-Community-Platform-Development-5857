import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import AuthModal from '../auth/AuthModal';
import { useAuth } from '../auth/AuthProvider';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUser, FiLogOut, FiSettings } = FiIcons;

const Header = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-primary-600 cursor-pointer" onClick={() => navigate('/')}>
                  Community
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm" onClick={handleDashboardClick}>
                    ダッシュボード
                  </Button>
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                    >
                      <img
                        src={user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'}
                        alt={user.user_metadata?.full_name || 'ユーザー'}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="hidden sm:block">{user.user_metadata?.full_name || 'ユーザー'}</span>
                    </button>
                    
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                      >
                        <button
                          onClick={handleDashboardClick}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <SafeIcon icon={FiUser} className="inline mr-2 h-4 w-4" />
                          ダッシュボード
                        </button>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <SafeIcon icon={FiSettings} className="inline mr-2 h-4 w-4" />
                          設定
                        </a>
                        <button
                          onClick={() => {
                            signOut();
                            setShowUserMenu(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <SafeIcon icon={FiLogOut} className="inline mr-2 h-4 w-4" />
                          サインアウト
                        </button>
                      </motion.div>
                    )}
                  </div>
                </div>
              ) : (
                <Button onClick={() => setShowAuthModal(true)}>
                  サインイン
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default Header;