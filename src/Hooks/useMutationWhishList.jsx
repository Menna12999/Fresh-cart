import { useMutation ,useQueryClient } from '@tanstack/react-query'

export default function useMutationWhishList(fn) {
  const queryClient = useQueryClient()

  return useMutation({mutationFn:fn,
    onSuccess:()=>{
      queryClient.invalidateQueries({ queryKey: ['getWhishList'] })

    }
  })
}