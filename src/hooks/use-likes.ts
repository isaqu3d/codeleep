import { useState } from 'react'

const STORAGE_KEY = 'codeleap_likes'

function getStoredLikes(): Set<number> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return new Set(stored ? (JSON.parse(stored) as number[]) : [])
  } catch {
    return new Set()
  }
}

export function usePostLike(postId: number) {
  const [liked, setLiked] = useState(() => getStoredLikes().has(postId))

  function toggle() {
    const stored = getStoredLikes()
    if (stored.has(postId)) {
      stored.delete(postId)
    } else {
      stored.add(postId)
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...stored]))
    setLiked(!liked)
  }

  return { liked, toggle }
}
