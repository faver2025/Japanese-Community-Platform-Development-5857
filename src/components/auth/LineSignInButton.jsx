import React, { useState } from 'react';
import Button from '../ui/Button';
import { useAuth } from './AuthProvider';

const LineSignInButton = ({ onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signIn('line');
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
    <Button
      variant="line"
      className="w-full"
      onClick={handleSignIn}
      loading={loading}
      disabled={loading}
    >
      <div className="mr-2 h-4 w-4 bg-white rounded-sm flex items-center justify-center">
        <span className="text-[#00B900] font-bold text-xs">L</span>
      </div>
      LINEでサインイン
    </Button>
  );
};

export default LineSignInButton;