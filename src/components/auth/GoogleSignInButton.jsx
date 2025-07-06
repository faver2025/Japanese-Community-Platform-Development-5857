import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useAuth } from './AuthProvider';

const { FiUser } = FiIcons;

const GoogleSignInButton = ({ onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  useEffect(() => {
    // Google One Tap initialization
    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID || 'your-google-client-id',
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true
      });

      window.google.accounts.id.renderButton(
        document.getElementById('google-signin-button'),
        {
          theme: 'outline',
          size: 'large',
          text: 'signin_with',
          locale: 'ja'
        }
      );

      // Show One Tap prompt
      window.google.accounts.id.prompt();
    }
  }, []);

  const handleCredentialResponse = async (response) => {
    setLoading(true);
    try {
      const result = await signIn('google', { credential: response.credential });
      if (result.success) {
        onSuccess?.(result.user);
      } else {
        onError?.(result.error);
      }
    } catch (error) {
      onError?.(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = async () => {
    setLoading(true);
    try {
      const result = await signIn('google');
      if (result.success) {
        onSuccess?.(result.user);
      } else {
        onError?.(result.error);
      }
    } catch (error) {
      onError?.(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div id="google-signin-button" className="flex justify-center" />
      
      <Button
        variant="google"
        className="w-full"
        onClick={handleButtonClick}
        loading={loading}
        disabled={loading}
      >
        <SafeIcon icon={FiUser} className="mr-2 h-4 w-4" />
        Googleでサインイン
      </Button>
    </div>
  );
};

export default GoogleSignInButton;