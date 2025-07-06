import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card'
import Button from '../ui/Button'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'
import { supabase } from '../../lib/supabase'

const { FiPlus, FiEdit, FiTrash2, FiUsers, FiClock, FiDollarSign, FiEye, FiBook } = FiIcons

const CourseList = ({ onCreateCourse, onEditCourse }) => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      // Mock data for now
      const mockCourses = [
        {
          id: '1',
          title: 'React完全マスターコース',
          description: 'ゼロから始めるReact開発の完全ガイド',
          price: 9980,
          category: 'programming',
          difficulty: 'intermediate',
          duration: '8週間',
          thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
          modules: 8,
          lessons: 45,
          students: 234,
          status: 'published',
          created_at: '2024-01-15'
        },
        {
          id: '2',
          title: 'UI/UXデザインの基礎',
          description: '実践的なデザイン思考とツールの使い方',
          price: 7980,
          category: 'design',
          difficulty: 'beginner',
          duration: '6週間',
          thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop',
          modules: 6,
          lessons: 32,
          students: 187,
          status: 'published',
          created_at: '2024-01-10'
        },
        {
          id: '3',
          title: 'デジタルマーケティング戦略',
          description: 'SNSとWebを活用した現代的なマーケティング手法',
          price: 0,
          category: 'marketing',
          difficulty: 'beginner',
          duration: '4週間',
          thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
          modules: 4,
          lessons: 28,
          students: 456,
          status: 'draft',
          created_at: '2024-01-05'
        }
      ]

      setCourses(mockCourses)
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('本当にこのコースを削除しますか？')) {
      setCourses(courses.filter(course => course.id !== courseId))
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      case 'archived':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'published':
        return '公開中'
      case 'draft':
        return '下書き'
      case 'archived':
        return 'アーカイブ'
      default:
        return '不明'
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">コース管理</h1>
          <p className="text-gray-600">作成したコースの管理と編集</p>
        </div>
        <Button onClick={onCreateCourse}>
          <SafeIcon icon={FiPlus} className="mr-2 h-4 w-4" />
          新しいコースを作成
        </Button>
      </div>

      {courses.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={FiBook} className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              まだコースがありません
            </h3>
            <p className="text-gray-600 mb-4">
              最初のコースを作成して、受講者に価値を提供しましょう
            </p>
            <Button onClick={onCreateCourse}>
              <SafeIcon icon={FiPlus} className="mr-2 h-4 w-4" />
              コースを作成
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-primary-500 to-primary-600 relative">
                  {course.thumbnail && (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute top-4 right-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                      {getStatusText(course.status)}
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <SafeIcon icon={FiUsers} className="h-4 w-4 mr-1" />
                        {course.students} 受講者
                      </div>
                      <div className="flex items-center">
                        <SafeIcon icon={FiClock} className="h-4 w-4 mr-1" />
                        {course.duration}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div>
                        {course.modules} モジュール・{course.lessons} レッスン
                      </div>
                      <div className="flex items-center font-medium text-gray-900">
                        <SafeIcon icon={FiDollarSign} className="h-4 w-4 mr-1" />
                        ¥{course.price.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => onEditCourse(course)}
                      >
                        <SafeIcon icon={FiEdit} className="h-4 w-4 mr-1" />
                        編集
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`/course/${course.id}`, '_blank')}
                      >
                        <SafeIcon icon={FiEye} className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteCourse(course.id)}
                      >
                        <SafeIcon icon={FiTrash2} className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CourseList