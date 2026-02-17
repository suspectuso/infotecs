import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '@shared/lib/auth';
import { LoginForm } from '@features/auth/ui/LoginForm';

export const LoginPage: React.FC = () => {
  if (isAuthenticated()) {
    return <Navigate to="/users" replace />;
  }

  return <LoginForm />;
};
