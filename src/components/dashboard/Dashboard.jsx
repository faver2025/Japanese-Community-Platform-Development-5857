import React, { useState } from 'react'
import { useAuth } from '../auth/AuthProvider'
import DashboardLayout from './DashboardLayout'
import DashboardHome from './DashboardHome'
import CourseList from '../courses/CourseList'
import CourseCreator from '../courses/CourseCreator'
import CommunitySettings from '../settings/CommunitySettings'

const Dashboard = () => {
  const { user, loading } = useAuth()
  const [currentPath, setCurrentPath] = useState('/dashboard')
  const [editingCourse, setEditingCourse] = useState(null)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">ダッシュボードを読み込み中...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            アクセスが拒否されました
          </h2>
          <p className="text-gray-600">
            ダッシュボードにアクセスするにはサインインしてください
          </p>
        </div>
      </div>
    )
  }

  const handleNavigation = (path) => {
    setCurrentPath(path)
    setEditingCourse(null)
  }

  const handleCreateCourse = () => {
    setCurrentPath('/dashboard/courses/create')
    setEditingCourse(null)
  }

  const handleEditCourse = (course) => {
    setCurrentPath('/dashboard/courses/edit')
    setEditingCourse(course)
  }

  const handleSaveCourse = (courseData) => {
    console.log('Course saved:', courseData)
    setCurrentPath('/dashboard/courses')
    setEditingCourse(null)
  }

  const handleCancelCourse = () => {
    setCurrentPath('/dashboard/courses')
    setEditingCourse(null)
  }

  const handleSaveSettings = (settings) => {
    console.log('Settings saved:', settings)
  }

  const renderContent = () => {
    switch (currentPath) {
      case '/dashboard':
        return <DashboardHome />
      case '/dashboard/courses':
        return (
          <CourseList
            onCreateCourse={handleCreateCourse}
            onEditCourse={handleEditCourse}
          />
        )
      case '/dashboard/courses/create':
        return (
          <CourseCreator
            onSave={handleSaveCourse}
            onCancel={handleCancelCourse}
          />
        )
      case '/dashboard/courses/edit':
        return (
          <CourseCreator
            existingCourse={editingCourse}
            onSave={handleSaveCourse}
            onCancel={handleCancelCourse}
          />
        )
      case '/dashboard/settings':
        return (
          <CommunitySettings
            community={{
              name: 'マイコミュニティ',
              description: 'コミュニティの説明',
              rules: ['相互尊重', 'スパム禁止', '建設的な議論']
            }}
            onSave={handleSaveSettings}
          />
        )
      case '/dashboard/communities':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">コミュニティ管理</h2>
            <p className="text-gray-600">コミュニティ管理機能は開発中です</p>
          </div>
        )
      case '/dashboard/analytics':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">分析</h2>
            <p className="text-gray-600">分析機能は開発中です</p>
          </div>
        )
      case '/dashboard/revenue':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">収益管理</h2>
            <p className="text-gray-600">収益管理機能は開発中です</p>
          </div>
        )
      case '/dashboard/messages':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">メッセージ</h2>
            <p className="text-gray-600">メッセージ機能は開発中です</p>
          </div>
        )
      default:
        return <DashboardHome />
    }
  }

  return (
    <DashboardLayout
      currentPath={currentPath}
      onNavigate={handleNavigation}
    >
      {renderContent()}
    </DashboardLayout>
  )
}

export default Dashboard