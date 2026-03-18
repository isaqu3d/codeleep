import { useEffect, useRef, useState } from "react";
import CreatePostForm from "../components/create-post-form";
import DeleteModal from "../components/delete-modal";
import EditModal from "../components/edit-modal";
import Header from "../components/header";
import PostCard from "../components/post-card";
import Spinner from "../components/spinner";
import { usePosts } from "../hooks/use-posts";
import { useUsername } from "../hooks/use-username";
import type { Post } from "../types";

export default function MainPage() {
  const { username } = useUsername();
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePosts();
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  const posts = data?.pages.flatMap((page) => page.results) ?? [];

  useEffect(() => {
    if (!loaderRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="min-h-screen bg-[#DDDDDD]">
      <div className="max-w-[800px] mx-auto min-h-screen bg-white">
        <Header />

        <main className="px-6 py-6 flex flex-col gap-6">
          <CreatePostForm username={username} />

          {isLoading && (
            <div className="flex justify-center py-10">
              <Spinner />
            </div>
          )}

          {isError && (
            <p className="text-center text-red-500 py-6">
              Failed to load posts. Try again later.
            </p>
          )}

          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUsername={username}
              onEdit={setPostToEdit}
              onDelete={setPostToDelete}
            />
          ))}

          <div ref={loaderRef} className="h-4" />

          {isFetchingNextPage && (
            <div className="flex justify-center py-4">
              <Spinner size="sm" />
            </div>
          )}
        </main>
      </div>

      {postToDelete && (
        <DeleteModal
          post={postToDelete}
          onClose={() => setPostToDelete(null)}
        />
      )}

      {postToEdit && (
        <EditModal post={postToEdit} onClose={() => setPostToEdit(null)} />
      )}
    </div>
  );
}
