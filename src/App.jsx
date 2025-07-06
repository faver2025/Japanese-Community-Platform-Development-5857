import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './components/auth/AuthProvider';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Header from './components/layout/Header';
import Hero from './components/landing/Hero';
import Features from './components/landing/Features';
import Pricing from './components/landing/Pricing';
import CommunityList from './components/community/CommunityList';
import Dashboard from './components/dashboard/Dashboard';
import SupabaseSetup from './components/setup/SupabaseSetup';
import { testConnection, setupSupabase } from './utils/supabaseSetup';
import { supabase } from './lib/supabase';
import toast from 'react-hot-toast';
import './App.css';

function App() {
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Check if Supabase is configured
      if (!supabase) {
        console.log('⚠️ Supabase not configured, showing setup');
        setIsSetupComplete(false);
        setIsLoading(false);
        return;
      }

      // Test connection
      const connectionResult = await testConnection();
      
      if (connectionResult.success) {
        console.log('✅ Supabase connection successful');
        
        // Run setup automatically
        const setupResult = await setupSupabase();
        
        if (setupResult.success) {
          console.log('✅ Supabase setup completed');
          setIsSetupComplete(true);
          toast.success('プラットフォームの準備が完了しました！');
        } else {
          console.error('❌ Setup failed:', setupResult.error);
          toast.error('セットアップに失敗しました');
        }
      } else {
        console.error('❌ Connection failed:', connectionResult.message);
        toast.error('データベースに接続できませんでした');
      }
    } catch (error) {
      console.error('❌ App initialization failed:', error);
      toast.error('アプリケーションの初期化に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetupComplete = () => {
    setIsSetupComplete(true);
    toast.success('セットアップが完了しました！');
    // Reload to reinitialize with new credentials
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">プラットフォームを初期化中...</p>
          <p className="text-sm text-gray-500 mt-2">データベースのセットアップを確認しています</p>
        </div>
      </div>
    );
  }

  if (!isSetupComplete) {
    return <SupabaseSetup onComplete={handleSetupComplete} />;
  }

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
          <Routes>
            <Route path="/" element={
              <>
                <Header />
                <main>
                  <Hero />
                  <Features />
                  <CommunityList />
                  <Pricing />
                </main>
              </>
            } />
            <Route path="/communities" element={
              <>
                <Header />
                <main>
                  <CommunityList />
                </main>
              </>
            } />
            <Route path="/dashboard/*" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;