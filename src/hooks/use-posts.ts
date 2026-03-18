import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchPosts, createPost, updatePost, deletePost } from '../api/posts'
import type { CreatePostPayload, UpdatePostPayload } from '../types'

const POSTS_KEY = ['posts']

export function usePosts() {
  return useInfiniteQuery({
    queryKey: POSTS_KEY,
    queryFn: ({ pageParam }) => fetchPosts(pageParam as string | undefined),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
  })
}

export function useCreatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreatePostPayload) => createPost(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: POSTS_KEY }),
  })
}

export function useUpdatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdatePostPayload }) =>
      updatePost(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: POSTS_KEY }),
  })
}

export function useDeletePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: POSTS_KEY }),
  })
}
