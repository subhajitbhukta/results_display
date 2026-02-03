import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Display from './components/Display';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true, // Refetch when window regains focus
      retry: 3, // Retry failed requests 3 times
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Display />
      {/* React Query Devtools - Remove in production */}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

export default App;