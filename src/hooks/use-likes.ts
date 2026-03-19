import { useState } from 'react'

const USER_LIKES_PREFIX = 'codeleap_likes_'
const COUNTS_KEY = 'codeleap_like_counts'

function getUserLikes(username: string): Set<number> {
  try {
    const stored = localStorage.getItem(USER_LIKES_PREFIX + username)
    return new Set(stored ? (JSON.parse(stored) as number[]) : [])
  } catch {
    return new Set()
  }
}

function getLikeCounts(): Record<number, number> {
  try {
    const stored = localStorage.getItem(COUNTS_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

function fakeLikeRequest(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, Math.random() * 300 + 150)
  })
}

export function usePostLike(postId: number, username: string) {
  const [liked, setLiked] = useState(() => getUserLikes(username).has(postId))
  const [count, setCount] = useState(() => getLikeCounts()[postId] ?? 0)
  const [isPending, setIsPending] = useState(false)

  async function toggle() {
    if (isPending) return

    const previousLiked = liked
    const previousCount = count
    setLiked(!previousLiked)
    setCount(previousLiked ? Math.max(0, previousCount - 1) : previousCount + 1)
    setIsPending(true)

    try {
      await fakeLikeRequest()

      const userLikes = getUserLikes(username)
      const counts = getLikeCounts()

      if (previousLiked) {
        userLikes.delete(postId)
        counts[postId] = Math.max(0, (counts[postId] ?? 1) - 1)
      } else {
        userLikes.add(postId)
        counts[postId] = (counts[postId] ?? 0) + 1
      }

      localStorage.setItem(USER_LIKES_PREFIX + username, JSON.stringify([...userLikes]))
      localStorage.setItem(COUNTS_KEY, JSON.stringify(counts))
    } catch {
      setLiked(previousLiked)
      setCount(previousCount)
    } finally {
      setIsPending(false)
    }
  }

  return { liked, count, toggle, isPending }
}
