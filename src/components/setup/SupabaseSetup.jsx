import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card'
import Button from '../ui/Button'
import Input from '../ui/Input'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'
import toast from 'react-hot-toast'

const { FiSettings, FiCheck, FiDatabase, FiExternalLink, FiCopy, FiAlertCircle, FiRefreshCw } = FiIcons

const SupabaseSetup = ({ onComplete }) => {
  const [credentials, setCredentials] = useState({
    url: '',
    anonKey: ''
  })
  const [isValidating, setIsValidating] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState(null)
  const [debugInfo, setDebugInfo] = useState([])

  useEffect(() => {
    // Load existing credentials
    const existingUrl = localStorage.getItem('VITE_SUPABASE_URL') || import.meta.env.VITE_SUPABASE_URL
    const existingKey = localStorage.getItem('VITE_SUPABASE_ANON_KEY') || import.meta.env.VITE_SUPABASE_ANON_KEY
    
    if (existingUrl && existingKey) {
      setCredentials({
        url: existingUrl,
        anonKey: existingKey
      })
    }
  }, [])

  const addDebugInfo = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString()
    setDebugInfo(prev => [...prev, { message, type, timestamp }])
  }

  const validateCredentials = (url, key) => {
    const errors = []
    
    if (!url) {
      errors.push('URLが入力されていません')
    } else if (!url.includes('supabase.co') && !url.includes('localhost')) {
      errors.push('正しいSupabase URLを入力してください (例: https://xxx.supabase.co)')
    }
    
    if (!key) {
      errors.push('Anon Keyが入力されていません')
    } else if (!key.startsWith('eyJ')) {
      errors.push('正しいAnon Keyを入力してください (eyJで始まるJWT形式)')
    } else if (key.length < 100) {
      errors.push('Anon Keyが短すぎます')
    }
    
    return errors
  }

  const testConnection = async (url, key) => {
    addDebugInfo('接続テストを開始...', 'info')
    
    try {
      // Test basic HTTP connection first
      addDebugInfo('HTTP接続をテスト中...', 'info')
      const response = await fetch(`${url}/rest/v1/`, {
        method: 'GET',
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json'
        }
      })

      addDebugInfo(`HTTP Status: ${response.status}`, response.ok ? 'success' : 'error')
      
      if (response.ok) {
        addDebugInfo('✅ 基本接続成功', 'success')
        return { success: true, message: '接続成功' }
      } else {
        const errorText = await response.text()
        addDebugInfo(`❌ HTTP Error: ${errorText}`, 'error')
        return { success: false, error: `HTTP ${response.status}: ${errorText}` }
      }

    } catch (error) {
      addDebugInfo(`❌ 接続エラー: ${error.message}`, 'error')
      return { success: false, error: error.message }
    }
  }

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault()
    setDebugInfo([])
    
    const { url, anonKey } = credentials
    const errors = validateCredentials(url, anonKey)
    
    if (errors.length > 0) {
      errors.forEach(error => {
        toast.error(error)
        addDebugInfo(error, 'error')
      })
      return
    }

    setIsValidating(true)
    setConnectionStatus('testing')

    try {
      const result = await testConnection(url, anonKey)
      
      if (result.success) {
        // Save credentials
        localStorage.setItem('VITE_SUPABASE_URL', url)
        localStorage.setItem('VITE_SUPABASE_ANON_KEY', anonKey)
        
        setConnectionStatus('success')
        toast.success('接続が成功しました！')
        addDebugInfo('✅ 認証情報を保存しました', 'success')
        
        setTimeout(() => {
          onComplete()
        }, 1000)
      } else {
        setConnectionStatus('error')
        toast.error(`接続失敗: ${result.error}`)
        addDebugInfo(`❌ ${result.error}`, 'error')
      }
    } catch (error) {
      setConnectionStatus('error')
      toast.error(`予期しないエラー: ${error.message}`)
      addDebugInfo(`❌ 予期しないエラー: ${error.message}`, 'error')
    } finally {
      setIsValidating(false)
    }
  }

  const clearCredentials = () => {
    localStorage.removeItem('VITE_SUPABASE_URL')
    localStorage.removeItem('VITE_SUPABASE_ANON_KEY')
    setCredentials({ url: '', anonKey: '' })
    setConnectionStatus(null)
    setDebugInfo([])
    toast.success('認証情報をクリアしました')
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    toast.success('クリップボードにコピーしました')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-6">
        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={FiSettings} className="h-8 w-8 text-primary-600" />
            </div>
            <CardTitle>🚀 Community Platform セットアップ</CardTitle>
            <CardDescription>
              Supabaseプロジェクトを接続してプラットフォームを開始しましょう
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Setup Instructions */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-4 flex items-center">
                <SafeIcon icon={FiDatabase} className="mr-2 h-5 w-5" />
                📋 Supabaseセットアップ手順
              </h3>
              <div className="space-y-3 text-sm text-blue-800">
                <div className="flex items-start space-x-3">
                  <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</span>
                  <div>
                    <p className="font-medium">Supabaseプロジェクトを作成</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => window.open('https://supabase.com/dashboard', '_blank')}
                    >
                      <SafeIcon icon={FiExternalLink} className="mr-2 h-4 w-4" />
                      Supabaseダッシュボードを開く
                    </Button>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</span>
                  <p>プロジェクト作成後、<strong>Settings → API</strong> に移動</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</span>
                  <p><strong>Project URL</strong> と <strong>anon/public key</strong> をコピー</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">4</span>
                  <p>下のフォームに貼り付けて接続</p>
                </div>
              </div>
            </div>

            {/* Credentials Form */}
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project URL
                </label>
                <div className="relative">
                  <Input
                    type="url"
                    placeholder="https://your-project-id.supabase.co"
                    value={credentials.url}
                    onChange={(e) => setCredentials({ ...credentials, url: e.target.value })}
                    required
                  />
                  {credentials.url && (
                    <button
                      type="button"
                      onClick={() => copyToClipboard(credentials.url)}
                      className="absolute right-2 top-2 p-1 text-gray-400 hover:text-gray-600"
                    >
                      <SafeIcon icon={FiCopy} className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Anon Key
                </label>
                <div className="relative">
                  <Input
                    type="password"
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    value={credentials.anonKey}
                    onChange={(e) => setCredentials({ ...credentials, anonKey: e.target.value })}
                    required
                  />
                  {credentials.anonKey && (
                    <button
                      type="button"
                      onClick={() => copyToClipboard(credentials.anonKey)}
                      className="absolute right-2 top-2 p-1 text-gray-400 hover:text-gray-600"
                    >
                      <SafeIcon icon={FiCopy} className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  type="submit"
                  className="flex-1"
                  loading={isValidating}
                  disabled={!credentials.url || !credentials.anonKey}
                >
                  {isValidating ? '接続中...' : '接続してセットアップを開始'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={clearCredentials}
                >
                  <SafeIcon icon={FiRefreshCw} className="h-4 w-4" />
                </Button>
              </div>
            </form>

            {/* Connection Status */}
            {connectionStatus && (
              <div className={`p-4 rounded-lg ${
                connectionStatus === 'success' ? 'bg-green-50 border border-green-200' :
                connectionStatus === 'error' ? 'bg-red-50 border border-red-200' :
                'bg-yellow-50 border border-yellow-200'
              }`}>
                <div className="flex items-center">
                  <SafeIcon 
                    icon={
                      connectionStatus === 'success' ? FiCheck :
                      connectionStatus === 'error' ? FiAlertCircle :
                      FiRefreshCw
                    } 
                    className={`h-5 w-5 mr-2 ${
                      connectionStatus === 'success' ? 'text-green-600' :
                      connectionStatus === 'error' ? 'text-red-600' :
                      'text-yellow-600 animate-spin'
                    }`} 
                  />
                  <span className={`font-medium ${
                    connectionStatus === 'success' ? 'text-green-800' :
                    connectionStatus === 'error' ? 'text-red-800' :
                    'text-yellow-800'
                  }`}>
                    {connectionStatus === 'success' ? '接続成功' :
                     connectionStatus === 'error' ? '接続失敗' :
                     '接続テスト中...'}
                  </span>
                </div>
              </div>
            )}

            {/* Debug Information */}
            {debugInfo.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-2">🔍 デバッグ情報:</h4>
                <div className="space-y-1 text-sm max-h-40 overflow-y-auto">
                  {debugInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <span className="text-gray-500 text-xs">{info.timestamp}</span>
                      <span className={`${
                        info.type === 'success' ? 'text-green-600' :
                        info.type === 'error' ? 'text-red-600' :
                        'text-gray-600'
                      }`}>
                        {info.message}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Example Values */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-700 mb-2">💡 入力例:</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Project URL:</strong>
                  <code className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded">
                    https://abcdefghijklmnop.supabase.co
                  </code>
                </div>
                <div>
                  <strong>Anon Key:</strong>
                  <code className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded">
                    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
                  </code>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SupabaseSetup