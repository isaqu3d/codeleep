import { useState } from "react";
import { useCreatePost } from "../hooks/use-posts";
import Header from "./header";

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
    <div className="mb-6 bg-white">
      <Header />

      <div className="mt-6 rounded-2xl w-[752px] mx-auto">
        <div className="bg-white px-6 py-5 ">
          <h2 className="text-[22px] font-bold text-black">
            What&apos;s on your mind?
          </h2>
        </div>

        <div className="px-6 py-5 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-black">Title</label>
            <input
              type="text"
              placeholder="Hello world"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-[#CCCCCC] rounded-lg px-3 py-2 text-sm placeholder-[#CCCCCC] outline-none focus:border-[#7695EC] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-black">Content</label>
            <textarea
              placeholder="Content here"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="border border-[#CCCCCC] rounded-lg px-3 py-2 text-sm placeholder-[#CCCCCC] outline-none focus:border-[#7695EC] transition-colors resize-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleCreate}
              disabled={isDisabled}
              className="bg-[#7695EC] text-white font-bold text-base px-9 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#5a7de0] transition-colors cursor-pointer"
            >
              CREATE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
