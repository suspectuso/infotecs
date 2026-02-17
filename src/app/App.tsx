import React from 'react';
import { QueryProvider } from '@app/providers/QueryProvider';
import { RouterProvider } from '@app/providers/RouterProvider';
import { GlobalStyles } from '@app/styles/global';

export const App: React.FC = () => {
  return (
    <QueryProvider>
      <GlobalStyles />
      <RouterProvider />
    </QueryProvider>
  );
};
