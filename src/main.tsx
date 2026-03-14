import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PrivyProvider } from '@privy-io/react-auth';
import { configureClient, API_URL_PROD } from '@0xsofia/dashboard-graphql';
import { PRIVY_APP_ID, PRIVY_CLIENT_ID } from './config';
import App from './App';
import './index.css';

// Configure GraphQL client
configureClient({ apiUrl: API_URL_PROD });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 2,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <PrivyProvider
        appId={PRIVY_APP_ID}
        {...(PRIVY_CLIENT_ID ? { clientId: PRIVY_CLIENT_ID } : {})}
        config={{
          loginMethods: ['wallet'],
          appearance: {
            theme: 'dark',
            accentColor: '#ecc48f',
          },
        }}
      >
        <App />
      </PrivyProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
