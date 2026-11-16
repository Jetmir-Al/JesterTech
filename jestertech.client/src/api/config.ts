import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query"



export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,            
      gcTime: 5 * 60_000,           
      retry: 2,                    
      retryDelay: (attempt) =>
        Math.min(1000 * 2 ** attempt, 30_000), 
    },
    mutations: {
      retry: 1,                  
    },
  },

  queryCache: new QueryCache({
    onError: (_, query) => {
      if (query.meta?.skipGlobarlError) return
      console.error("Problem with caching data");
    },
  }),
  mutationCache: new MutationCache({
    onError: (_, _variables, _context, mutation) => {
      if (mutation.options.onError) return
      console.error("Problem with caching data");
    },
  }),
})

