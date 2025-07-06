import { createClient } from '@supabase/supabase-js'

// Environment variables or fallback values
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || localStorage.getItem('VITE_SUPABASE_URL')
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || localStorage.getItem('VITE_SUPABASE_ANON_KEY')

console.log('🔍 Supabase Configuration Check:')
console.log('URL:', SUPABASE_URL ? `${SUPABASE_URL.substring(0, 30)}...` : 'NOT FOUND')
console.log('Key:', SUPABASE_ANON_KEY ? `${SUPABASE_ANON_KEY.substring(0, 30)}...` : 'NOT FOUND')

// Validate URL format
const isValidUrl = (url) => {
  if (!url) return false
  try {
    new URL(url)
    return url.includes('supabase.co') || url.includes('localhost')
  } catch {
    return false
  }
}

// Validate anon key format
const isValidKey = (key) => {
  if (!key) return false
  return key.startsWith('eyJ') && key.length > 100
}

// Check if credentials are valid
if (!isValidUrl(SUPABASE_URL)) {
  console.error('❌ Invalid Supabase URL:', SUPABASE_URL)
}

if (!isValidKey(SUPABASE_ANON_KEY)) {
  console.error('❌ Invalid Supabase Anon Key:', SUPABASE_ANON_KEY)
}

// Create client only if credentials exist and are valid
export const supabase = (isValidUrl(SUPABASE_URL) && isValidKey(SUPABASE_ANON_KEY)) 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      },
      global: {
        headers: {
          'X-Client-Info': 'community-platform'
        }
      }
    })
  : null

// 詳細な接続テスト関数
export const testSupabaseConnection = async () => {
  console.log('🔄 Testing Supabase connection...')
  
  if (!supabase) {
    console.error('❌ Supabase client not initialized')
    return { success: false, error: 'Client not initialized' }
  }

  try {
    // Test 1: Basic connection
    console.log('Test 1: Basic connection...')
    const { data, error } = await supabase.from('_test_table_').select('*').limit(1)
    
    if (error) {
      if (error.code === 'PGRST116') {
        console.log('✅ Connection successful (table not found is expected)')
        return { success: true, message: 'Connection successful' }
      } else if (error.code === '42P01') {
        console.log('✅ Connection successful (relation not found is expected)')
        return { success: true, message: 'Connection successful' }
      } else {
        console.error('❌ Connection error:', error)
        return { success: false, error: error.message }
      }
    }

    console.log('✅ Supabase connection successful')
    return { success: true, message: 'Connection successful' }

  } catch (error) {
    console.error('❌ Supabase connection failed:', error)
    return { success: false, error: error.message }
  }
}

// 認証情報をクリアする関数
export const clearSupabaseCredentials = () => {
  localStorage.removeItem('VITE_SUPABASE_URL')
  localStorage.removeItem('VITE_SUPABASE_ANON_KEY')
  console.log('🗑️ Supabase credentials cleared')
}

export default supabase