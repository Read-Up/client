'use client';

import { useState } from 'react';
// import { useShallow } from 'zustand/react/shallow';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// ----------------------------------------------------------------------

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  // ! 스토어에 로딩 만들고 전역으로 쓰시면 됩니다.
  // const setLoading = useLoadingStatus(useShallow(state => state.setLoading));

  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          networkMode: 'offlineFirst',
          refetchOnWindowFocus: false,
          staleTime: 1000 * 60,
          retry: false,
        },
        mutations: {
          networkMode: 'offlineFirst',
          onMutate: () => {
            // setLoading(true);
          },
          onSettled: result => {
            // setLoading(false);
          },
          // useErrorBoundary: true,
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  );
};
