import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card'
import Button from '../ui/Button'
import Input from '../ui/Input'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'
import toast from 'react-hot-toast'

const { FiSettings, FiSave, FiUpload, FiTrash2, FiMail, FiBell, FiShield, FiDollarSign } = FiIcons

const CommunitySettings = ({ community, onSave }) => {
  const [settings, setSettings] = useState({
    general: {
      name: community?.name || '',
      description: community?.description || '',
      logo: community?.logo || '',
      banner: community?.banner || '',
      website: community?.website || '',
      rules: community?.rules || []
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      weeklyDigest: true,
      memberJoined: true,
      newContent: true
    },
    privacy: {
      visibility: 'public',
      memberList: 'members',
      joinApproval: false,
      inviteOnly: false
    },
    billing: {
      currency: 'JPY',
      taxRate: 10,
      invoiceEmail: '',
      paymentMethods: ['stripe', 'paypal']
    }
  })

  const [activeTab, setActiveTab] = useState('general')
  const [newRule, setNewRule] = useState('')

  const tabs = [
    { id: 'general', label: '基本設定', icon: FiSettings },
    { id: 'notifications', label: '通知設定', icon: FiBell },
    { id: 'privacy', label: 'プライバシー', icon: FiShield },
    { id: 'billing', label: '決済設定', icon: FiDollarSign }
  ]

  const handleSave = () => {
    onSave(settings)
    toast.success('設定を保存しました')
  }

  const addRule = () => {
    if (newRule.trim()) {
      setSettings({
        ...settings,
        general: {
          ...settings.general,
          rules: [...settings.general.rules, newRule.trim()]
        }
      })
      setNewRule('')
    }
  }

  const removeRule = (index) => {
    setSettings({
      ...settings,
      general: {
        ...settings.general,
        rules: settings.general.rules.filter((_, i) => i !== index)
      }
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">コミュニティ設定</h1>
        <p className="text-gray-600">コミュニティの設定を管理します</p>
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

      {/* 基本設定 */}
      {activeTab === 'general' && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>基本情報</CardTitle>
              <CardDescription>コミュニティの基本的な情報を設定します</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  コミュニティ名
                </label>
                <Input
                  value={settings.general.name}
                  onChange={(e) => setSettings({
                    ...settings,
                    general: { ...settings.general, name: e.target.value }
                  })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  説明
                </label>
                <textarea
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={settings.general.description}
                  onChange={(e) => setSettings({
                    ...settings,
                    general: { ...settings.general, description: e.target.value }
                  })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ロゴURL
                  </label>
                  <Input
                    placeholder="https://example.com/logo.png"
                    value={settings.general.logo}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: { ...settings.general, logo: e.target.value }
                    })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    バナーURL
                  </label>
                  <Input
                    placeholder="https://example.com/banner.jpg"
                    value={settings.general.banner}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: { ...settings.general, banner: e.target.value }
                    })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ウェブサイト
                </label>
                <Input
                  placeholder="https://example.com"
                  value={settings.general.website}
                  onChange={(e) => setSettings({
                    ...settings,
                    general: { ...settings.general, website: e.target.value }
                  })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>コミュニティルール</CardTitle>
              <CardDescription>メンバーが守るべきルールを設定します</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {settings.general.rules.map((rule, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <span className="text-sm text-gray-700">{rule}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeRule(index)}
                    >
                      <SafeIcon icon={FiTrash2} className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex space-x-2">
                <Input
                  placeholder="新しいルールを入力..."
                  value={newRule}
                  onChange={(e) => setNewRule(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addRule()}
                />
                <Button onClick={addRule}>追加</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* 通知設定 */}
      {activeTab === 'notifications' && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>通知設定</CardTitle>
              <CardDescription>メンバーへの通知設定を管理します</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">メール通知</h4>
                  <p className="text-sm text-gray-600">重要な更新をメールで通知</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications.emailNotifications}
                  onChange={(e) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, emailNotifications: e.target.checked }
                  })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">プッシュ通知</h4>
                  <p className="text-sm text-gray-600">リアルタイムでの通知</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications.pushNotifications}
                  onChange={(e) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, pushNotifications: e.target.checked }
                  })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">週次ダイジェスト</h4>
                  <p className="text-sm text-gray-600">週1回のまとめメール</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications.weeklyDigest}
                  onChange={(e) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, weeklyDigest: e.target.checked }
                  })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">新メンバー参加通知</h4>
                  <p className="text-sm text-gray-600">新しいメンバーが参加した時</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications.memberJoined}
                  onChange={(e) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, memberJoined: e.target.checked }
                  })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">新しいコンテンツ通知</h4>
                  <p className="text-sm text-gray-600">新しいコンテンツが投稿された時</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications.newContent}
                  onChange={(e) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, newContent: e.target.checked }
                  })}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* プライバシー設定 */}
      {activeTab === 'privacy' && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>プライバシー設定</CardTitle>
              <CardDescription>コミュニティの公開設定とアクセス権限</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  コミュニティの公開設定
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="visibility"
                      value="public"
                      checked={settings.privacy.visibility === 'public'}
                      onChange={(e) => setSettings({
                        ...settings,
                        privacy: { ...settings.privacy, visibility: e.target.value }
                      })}
                      className="mr-2"
                    />
                    <span>公開 - 誰でも見つけることができる</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="visibility"
                      value="private"
                      checked={settings.privacy.visibility === 'private'}
                      onChange={(e) => setSettings({
                        ...settings,
                        privacy: { ...settings.privacy, visibility: e.target.value }
                      })}
                      className="mr-2"
                    />
                    <span>非公開 - 招待されたユーザーのみ</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  メンバーリストの表示
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={settings.privacy.memberList}
                  onChange={(e) => setSettings({
                    ...settings,
                    privacy: { ...settings.privacy, memberList: e.target.value }
                  })}
                >
                  <option value="public">全員に公開</option>
                  <option value="members">メンバーのみ</option>
                  <option value="admins">管理者のみ</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">参加承認制</h4>
                  <p className="text-sm text-gray-600">新しいメンバーの参加を承認制にする</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.privacy.joinApproval}
                  onChange={(e) => setSettings({
                    ...settings,
                    privacy: { ...settings.privacy, joinApproval: e.target.checked }
                  })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">招待制のみ</h4>
                  <p className="text-sm text-gray-600">招待されたユーザーのみ参加可能</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.privacy.inviteOnly}
                  onChange={(e) => setSettings({
                    ...settings,
                    privacy: { ...settings.privacy, inviteOnly: e.target.checked }
                  })}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* 決済設定 */}
      {activeTab === 'billing' && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>決済設定</CardTitle>
              <CardDescription>支払いと請求に関する設定</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    通貨
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={settings.billing.currency}
                    onChange={(e) => setSettings({
                      ...settings,
                      billing: { ...settings.billing, currency: e.target.value }
                    })}
                  >
                    <option value="JPY">日本円 (JPY)</option>
                    <option value="USD">米ドル (USD)</option>
                    <option value="EUR">ユーロ (EUR)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    税率 (%)
                  </label>
                  <Input
                    type="number"
                    value={settings.billing.taxRate}
                    onChange={(e) => setSettings({
                      ...settings,
                      billing: { ...settings.billing, taxRate: parseFloat(e.target.value) || 0 }
                    })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  請求書送信先メール
                </label>
                <Input
                  type="email"
                  placeholder="billing@example.com"
                  value={settings.billing.invoiceEmail}
                  onChange={(e) => setSettings({
                    ...settings,
                    billing: { ...settings.billing, invoiceEmail: e.target.value }
                  })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  対応決済方法
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.billing.paymentMethods.includes('stripe')}
                      onChange={(e) => {
                        const methods = settings.billing.paymentMethods
                        if (e.target.checked) {
                          setSettings({
                            ...settings,
                            billing: { ...settings.billing, paymentMethods: [...methods, 'stripe'] }
                          })
                        } else {
                          setSettings({
                            ...settings,
                            billing: { ...settings.billing, paymentMethods: methods.filter(m => m !== 'stripe') }
                          })
                        }
                      }}
                      className="mr-2"
                    />
                    <span>Stripe (クレジットカード)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.billing.paymentMethods.includes('paypal')}
                      onChange={(e) => {
                        const methods = settings.billing.paymentMethods
                        if (e.target.checked) {
                          setSettings({
                            ...settings,
                            billing: { ...settings.billing, paymentMethods: [...methods, 'paypal'] }
                          })
                        } else {
                          setSettings({
                            ...settings,
                            billing: { ...settings.billing, paymentMethods: methods.filter(m => m !== 'paypal') }
                          })
                        }
                      }}
                      className="mr-2"
                    />
                    <span>PayPal</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* 保存ボタン */}
      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <SafeIcon icon={FiSave} className="mr-2 h-4 w-4" />
          設定を保存
        </Button>
      </div>
    </div>
  )
}

export default CommunitySettings