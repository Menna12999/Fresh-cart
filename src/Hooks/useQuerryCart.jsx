
import { useQuery } from '@tanstack/react-query'

export default function useQuerryCart(key,fn) {
  return useQuery(
    {queryKey:[key],
      queryFn:fn,
    select:(data)=>data?.data
  }
  )
}
