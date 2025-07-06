import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card'
import Button from '../ui/Button'
import Input from '../ui/Input'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'
import toast from 'react-hot-toast'

const { FiPlus, FiTrash2, FiEdit, FiSave, FiVideo, FiFileText, FiImage, FiLink } = FiIcons

const CourseCreator = ({ onSave, onCancel, existingCourse = null }) => {
  const [course, setCourse] = useState({
    title: existingCourse?.title || '',
    description: existingCourse?.description || '',
    price: existingCourse?.price || 0,
    category: existingCourse?.category || 'general',
    difficulty: existingCourse?.difficulty || 'beginner',
    duration: existingCourse?.duration || '',
    thumbnail: existingCourse?.thumbnail || '',
    modules: existingCourse?.modules || []
  })

  const [currentModule, setCurrentModule] = useState({
    title: '',
    description: '',
    lessons: []
  })

  const [currentLesson, setCurrentLesson] = useState({
    title: '',
    type: 'video',
    content: '',
    duration: '',
    free: false
  })

  const [activeTab, setActiveTab] = useState('basic')

  const contentTypes = [
    { value: 'video', label: '動画', icon: FiVideo },
    { value: 'text', label: 'テキスト', icon: FiFileText },
    { value: 'image', label: '画像', icon: FiImage },
    { value: 'link', label: 'リンク', icon: FiLink }
  ]

  const categories = [
    { value: 'design', label: 'デザイン' },
    { value: 'programming', label: 'プログラミング' },
    { value: 'business', label: 'ビジネス' },
    { value: 'marketing', label: 'マーケティング' },
    { value: 'photography', label: '写真' },
    { value: 'music', label: '音楽' },
    { value: 'general', label: '一般' }
  ]

  const difficulties = [
    { value: 'beginner', label: '初心者' },
    { value: 'intermediate', label: '中級者' },
    { value: 'advanced', label: '上級者' }
  ]

  const addLesson = () => {
    if (!currentLesson.title || !currentLesson.content) {
      toast.error('レッスンのタイトルとコンテンツを入力してください')
      return
    }

    const newLesson = {
      ...currentLesson,
      id: Date.now().toString(),
      order: currentModule.lessons.length + 1
    }

    setCurrentModule({
      ...currentModule,
      lessons: [...currentModule.lessons, newLesson]
    })

    setCurrentLesson({
      title: '',
      type: 'video',
      content: '',
      duration: '',
      free: false
    })

    toast.success('レッスンを追加しました')
  }

  const removeLesson = (lessonId) => {
    setCurrentModule({
      ...currentModule,
      lessons: currentModule.lessons.filter(lesson => lesson.id !== lessonId)
    })
    toast.success('レッスンを削除しました')
  }

  const addModule = () => {
    if (!currentModule.title || currentModule.lessons.length === 0) {
      toast.error('モジュールのタイトルと最低1つのレッスンを追加してください')
      return
    }

    const newModule = {
      ...currentModule,
      id: Date.now().toString(),
      order: course.modules.length + 1
    }

    setCourse({
      ...course,
      modules: [...course.modules, newModule]
    })

    setCurrentModule({
      title: '',
      description: '',
      lessons: []
    })

    toast.success('モジュールを追加しました')
  }

  const removeModule = (moduleId) => {
    setCourse({
      ...course,
      modules: course.modules.filter(module => module.id !== moduleId)
    })
    toast.success('モジュールを削除しました')
  }

  const handleSave = () => {
    if (!course.title || !course.description || course.modules.length === 0) {
      toast.error('コースのタイトル、説明、最低1つのモジュールを追加してください')
      return
    }

    onSave(course)
    toast.success('コースを保存しました')
  }

  const tabs = [
    { id: 'basic', label: '基本情報', icon: FiFileText },
    { id: 'modules', label: 'モジュール', icon: FiVideo },
    { id: 'settings', label: '設定', icon: FiEdit }
  ]

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {existingCourse ? 'コース編集' : 'コース作成'}
        </h1>
        <p className="text-gray-600">
          魅力的なオンラインコースを作成しましょう
        </p>
      </div>

      {/* タブナビゲーション */}
      <div className="mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-1 py-2 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <SafeIcon icon={tab.icon} className="mr-2 h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* 基本情報タブ */}
      {activeTab === 'basic' && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>コース基本情報</CardTitle>
              <CardDescription>
                コースの基本的な情報を設定してください
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  コースタイトル
                </label>
                <Input
                  placeholder="例: React完全マスターコース"
                  value={course.title}
                  onChange={(e) => setCourse({ ...course, title: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  コース説明
                </label>
                <textarea
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="コースの詳細な説明を入力してください..."
                  value={course.description}
                  onChange={(e) => setCourse({ ...course, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    価格 (円)
                  </label>
                  <Input
                    type="number"
                    placeholder="9980"
                    value={course.price}
                    onChange={(e) => setCourse({ ...course, price: parseInt(e.target.value) || 0 })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    カテゴリー
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={course.category}
                    onChange={(e) => setCourse({ ...course, category: e.target.value })}
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    難易度
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={course.difficulty}
                    onChange={(e) => setCourse({ ...course, difficulty: e.target.value })}
                  >
                    {difficulties.map((difficulty) => (
                      <option key={difficulty.value} value={difficulty.value}>
                        {difficulty.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  コース期間
                </label>
                <Input
                  placeholder="例: 8週間"
                  value={course.duration}
                  onChange={(e) => setCourse({ ...course, duration: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  サムネイル画像URL
                </label>
                <Input
                  placeholder="https://example.com/thumbnail.jpg"
                  value={course.thumbnail}
                  onChange={(e) => setCourse({ ...course, thumbnail: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* モジュール作成タブ */}
      {activeTab === 'modules' && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* 既存モジュール一覧 */}
          {course.modules.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>作成済みモジュール ({course.modules.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {course.modules.map((module) => (
                    <div key={module.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">{module.title}</h3>
                        <p className="text-sm text-gray-600">{module.lessons.length} レッスン</p>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeModule(module.id)}
                      >
                        <SafeIcon icon={FiTrash2} className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* 新しいモジュール作成 */}
          <Card>
            <CardHeader>
              <CardTitle>新しいモジュールを作成</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  モジュールタイトル
                </label>
                <Input
                  placeholder="例: 第1章: React入門"
                  value={currentModule.title}
                  onChange={(e) => setCurrentModule({ ...currentModule, title: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  モジュール説明
                </label>
                <textarea
                  className="w-full h-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="このモジュールで学ぶ内容を説明してください..."
                  value={currentModule.description}
                  onChange={(e) => setCurrentModule({ ...currentModule, description: e.target.value })}
                />
              </div>

              {/* レッスン一覧 */}
              {currentModule.lessons.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">レッスン一覧</h4>
                  <div className="space-y-2">
                    {currentModule.lessons.map((lesson) => (
                      <div key={lesson.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                          <span className="font-medium text-gray-900">{lesson.title}</span>
                          <span className="ml-2 text-sm text-gray-500">({lesson.type})</span>
                          {lesson.free && <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">無料</span>}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeLesson(lesson.id)}
                        >
                          <SafeIcon icon={FiTrash2} className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 新しいレッスン追加 */}
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-4">新しいレッスンを追加</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      レッスンタイトル
                    </label>
                    <Input
                      placeholder="例: Reactの基本概念"
                      value={currentLesson.title}
                      onChange={(e) => setCurrentLesson({ ...currentLesson, title: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        コンテンツタイプ
                      </label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        value={currentLesson.type}
                        onChange={(e) => setCurrentLesson({ ...currentLesson, type: e.target.value })}
                      >
                        {contentTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        時間 (分)
                      </label>
                      <Input
                        placeholder="15"
                        value={currentLesson.duration}
                        onChange={(e) => setCurrentLesson({ ...currentLesson, duration: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      コンテンツURL/内容
                    </label>
                    <Input
                      placeholder="動画URL、テキスト内容、画像URLなど"
                      value={currentLesson.content}
                      onChange={(e) => setCurrentLesson({ ...currentLesson, content: e.target.value })}
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="free-lesson"
                      checked={currentLesson.free}
                      onChange={(e) => setCurrentLesson({ ...currentLesson, free: e.target.checked })}
                      className="mr-2"
                    />
                    <label htmlFor="free-lesson" className="text-sm text-gray-700">
                      無料レッスンにする
                    </label>
                  </div>

                  <Button onClick={addLesson} className="w-full">
                    <SafeIcon icon={FiPlus} className="mr-2 h-4 w-4" />
                    レッスンを追加
                  </Button>
                </div>
              </div>

              <Button onClick={addModule} className="w-full" variant="outline">
                <SafeIcon icon={FiPlus} className="mr-2 h-4 w-4" />
                モジュールを追加
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* 設定タブ */}
      {activeTab === 'settings' && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>コース設定</CardTitle>
              <CardDescription>
                コースの公開設定やアクセス権限を設定してください
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  公開設定
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="visibility" value="public" className="mr-2" />
                    <span>公開 - 誰でも購入可能</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="visibility" value="private" className="mr-2" />
                    <span>非公開 - 招待されたユーザーのみ</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="visibility" value="draft" className="mr-2" defaultChecked />
                    <span>下書き - 作成者のみ表示</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  修了証明書
                </label>
                <div className="flex items-center">
                  <input type="checkbox" id="certificate" className="mr-2" />
                  <label htmlFor="certificate" className="text-sm text-gray-700">
                    コース修了時に修了証明書を発行する
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ディスカッション
                </label>
                <div className="flex items-center">
                  <input type="checkbox" id="discussion" className="mr-2" defaultChecked />
                  <label htmlFor="discussion" className="text-sm text-gray-700">
                    受講者同士のディスカッションを許可する
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  進捗トラッキング
                </label>
                <div className="flex items-center">
                  <input type="checkbox" id="progress" className="mr-2" defaultChecked />
                  <label htmlFor="progress" className="text-sm text-gray-700">
                    受講者の進捗状況を追跡する
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* 保存・キャンセルボタン */}
      <div className="flex justify-end space-x-4 pt-6 border-t">
        <Button variant="outline" onClick={onCancel}>
          キャンセル
        </Button>
        <Button onClick={handleSave}>
          <SafeIcon icon={FiSave} className="mr-2 h-4 w-4" />
          {existingCourse ? 'コースを更新' : 'コースを作成'}
        </Button>
      </div>
    </div>
  )
}

export default CourseCreator