import { useState } from "react";
import { useUpdatePost } from "../hooks/use-posts";
import type { Post } from "../types";

interface EditModalProps {
  post: Post;
  onClose: () => void;
}

export default function EditModal({ post, onClose }: EditModalProps) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const { mutate, isPending } = useUpdatePost();

  function handleSave() {
    if (!title.trim() || !content.trim()) return;
    mutate(
      {
        id: post.id,
        payload: { title: title.trim(), content: content.trim() },
      },
      { onSuccess: onClose },
    );
  }

  const isDisabled = !title.trim() || !content.trim() || isPending;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-[660px] overflow-hidden">
        <div className="px-6 pt-5">
          <h2 className="text-[22px] font-bold text-black">Edit item</h2>
        </div>

        <div className="px-6 py-5 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-base text-black">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-[#777777] rounded-lg px-3 h-8 text-sm outline-none focus:border-[#7695EC] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base text-black">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="border border-[#777777] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#7695EC] transition-colors resize-none"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              disabled={isPending}
              className="border border-black text-black font-bold px-9 h-8 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isDisabled}
              className="bg-[#47b960] text-white font-bold px-9 h-8 rounded-lg hover:bg-[#3da652] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
