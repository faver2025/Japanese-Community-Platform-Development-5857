import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useAuth } from './AuthProvider';

const { FiX, FiMail, FiLock, FiUser } = FiIcons;

const AuthModal = ({ isOpen, onClose, mode = 'signin' }) => {
  const [currentMode, setCurrentMode] = useState(mode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    try {
      const result = currentMode === 'signin' 
        ? await signInWithEmail(email, password)
        : await signUpWithEmail(email, password);

      if (result.success) {
        onClose();
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Google auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md"
        >
          <Card>
            <CardHeader className="text-center relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2"
                onClick={onClose}
              >
                <SafeIcon icon={FiX} className="h-4 w-4" />
              </Button>
              <CardTitle>
                {currentMode === 'signin' ? 'サインイン' : 'アカウント作成'}
              </CardTitle>
              <CardDescription>
                {currentMode === 'signin' 
                  ? 'アカウントにサインインしてください' 
                  : '新しいアカウントを作成してください'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="google"
                className="w-full"
                onClick={handleGoogleAuth}
                loading={loading}
              >
                <SafeIcon icon={FiUser} className="mr-2 h-4 w-4" />
                Googleでサインイン
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-secondary-500">または</span>
                </div>
              </div>

              <form onSubmit={handleEmailAuth} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="メールアドレス"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="パスワード"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" loading={loading}>
                  <SafeIcon icon={currentMode === 'signin' ? FiMail : FiLock} className="mr-2 h-4 w-4" />
                  {currentMode === 'signin' ? 'サインイン' : 'アカウント作成'}
                </Button>
              </form>

              <div className="text-center">
                <button
                  type="button"
                  className="text-sm text-primary-600 hover:text-primary-700"
                  onClick={() => setCurrentMode(currentMode === 'signin' ? 'signup' : 'signin')}
                >
                  {currentMode === 'signin' 
                    ? 'アカウントをお持ちでない方はこちら' 
                    : '既にアカウントをお持ちの方はこちら'
                  }
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthModal;