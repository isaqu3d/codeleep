import { useState } from "react";
import { useCreatePost } from "../hooks/use-posts";
import Spinner from "./spinner";

interface CreatePostFormProps {
  username: string;
}

export default function CreatePostForm({ username }: CreatePostFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { mutate, isPending } = useCreatePost();

  function handleCreate() {
    if (!title.trim() || !content.trim()) return;
    mutate(
      { username, title: title.trim(), content: content.trim() },
      {
        onSuccess: () => {
          setTitle("");
          setContent("");
        },
      },
    );
  }

  const isDisabled = !title.trim() || !content.trim() || isPending;

  return (
    <div className="border border-[#999999] rounded-2xl overflow-hidden bg-white">
      <div className="px-6 pt-6">
        <h2 className="text-[22px] font-bold text-black">
          What&apos;s on your mind?
        </h2>
      </div>

      <div className="px-6 py-6 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-base text-black">Title</label>
          <input
            type="text"
            placeholder="Hello world"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-[#777777] rounded-lg px-3 h-8 text-sm placeholder-[#CCCCCC] outline-none focus:border-[#7695EC] transition-colors"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-base text-black">Content</label>
          <textarea
            placeholder="Content here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="border border-[#777777] rounded-lg px-3 py-2 text-sm placeholder-[#CCCCCC] outline-none focus:border-[#7695EC] transition-colors resize-none"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleCreate}
            disabled={isDisabled}
            className="bg-[#7695EC] text-white font-bold text-base w-24 h-8 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#5a7de0] transition-colors cursor-pointer flex items-center justify-center"
          >
            {isPending ? <Spinner size="xs" /> : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
