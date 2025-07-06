import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../auth/AuthProvider'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'
import Button from '../ui/Button'

const { FiHome, FiUsers, FiBook, FiBarChart3, FiSettings, FiDollarSign, FiMail, FiMenu, FiX, FiLogOut, FiPlus } = FiIcons

const sidebarItems = [
  { icon: FiHome, label: 'ダッシュボード', path: '/dashboard' },
  { icon: FiUsers, label: 'コミュニティ', path: '/dashboard/communities' },
  { icon: FiBook, label: 'コース', path: '/dashboard/courses' },
  { icon: FiBarChart3, label: '分析', path: '/dashboard/analytics' },
  { icon: FiDollarSign, label: '収益', path: '/dashboard/revenue' },
  { icon: FiMail, label: 'メッセージ', path: '/dashboard/messages' },
  { icon: FiSettings, label: '設定', path: '/dashboard/settings' },
]

const DashboardLayout = ({ children, currentPath = '/dashboard', onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, signOut } = useAuth()

  const handleNavigation = (path) => {
    if (onNavigate) {
      onNavigate(path)
    }
    setSidebarOpen(false)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Desktop Sidebar - Always visible on large screens */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 bg-white shadow-lg">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 border-b bg-primary-600">
            <h1 className="text-xl font-bold text-white">Community</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 mt-8 overflow-y-auto">
            <div className="px-4 space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    currentPath === item.path
                      ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-500'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <SafeIcon icon={item.icon} className="mr-3 h-5 w-5" />
                  {item.label}
                </button>
              ))}
            </div>
          </nav>

          {/* User Profile */}
          <div className="flex-shrink-0 p-4 border-t">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={user?.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'}
                alt={user?.user_metadata?.full_name || 'ユーザー'}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.user_metadata?.full_name || 'ユーザー'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600 hover:text-gray-900"
              onClick={signOut}
            >
              <SafeIcon icon={FiLogOut} className="mr-2 h-4 w-4" />
              サインアウト
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed inset-0 z-50 ${sidebarOpen ? 'block' : 'hidden'}`}>
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
        
        {/* Sidebar */}
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50"
        >
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b bg-primary-600">
            <h1 className="text-xl font-bold text-white">Community</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="text-white hover:bg-primary-700"
            >
              <SafeIcon icon={FiX} className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 mt-8 overflow-y-auto">
            <div className="px-4 space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    currentPath === item.path
                      ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-500'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <SafeIcon icon={item.icon} className="mr-3 h-5 w-5" />
                  {item.label}
                </button>
              ))}
            </div>
          </nav>

          {/* User Profile */}
          <div className="flex-shrink-0 p-4 border-t">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={user?.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'}
                alt={user?.user_metadata?.full_name || 'ユーザー'}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.user_metadata?.full_name || 'ユーザー'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600 hover:text-gray-900"
              onClick={signOut}
            >
              <SafeIcon icon={FiLogOut} className="mr-2 h-4 w-4" />
              サインアウト
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden mr-2"
                onClick={() => setSidebarOpen(true)}
              >
                <SafeIcon icon={FiMenu} className="h-5 w-5" />
              </Button>
              <h2 className="text-lg font-semibold text-gray-900">
                {sidebarItems.find(item => item.path === currentPath)?.label || 'ダッシュボード'}
              </h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleNavigation('/dashboard/courses/create')}
              >
                <SafeIcon icon={FiPlus} className="mr-2 h-4 w-4" />
                新規作成
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout