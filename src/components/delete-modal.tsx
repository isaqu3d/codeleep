import { useDeletePost } from "../hooks/use-posts";
import type { Post } from "../types";

interface DeleteModalProps {
  post: Post;
  onClose: () => void;
}

export default function DeleteModal({ post, onClose }: DeleteModalProps) {
  const { mutate, isPending } = useDeletePost();

  function handleDelete() {
    mutate(post.id, { onSuccess: onClose });
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-[660px] p-6 animate-modal-in">
        <h2 className="text-[22px] font-bold text-black mb-6">
          Are you sure you want to delete this item?
        </h2>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            disabled={isPending}
            className="border border-[#999999] text-black font-bold px-9 py-2 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="bg-[#FF5151] text-white font-bold px-9 py-2 rounded-lg hover:bg-[#e04444] transition-colors disabled:opacity-50 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
