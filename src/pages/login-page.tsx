import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsername } from "../hooks/use-username";

export default function LoginPage() {
  const [value, setValue] = useState("");
  const [isExiting, setIsExiting] = useState(false);
  const { saveUsername } = useUsername();
  const navigate = useNavigate();

  function handleEnter() {
    if (!value.trim() || isExiting) return;
    setIsExiting(true);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleEnter();
  }

  function handleAnimationEnd() {
    if (isExiting) {
      saveUsername(value.trim());
      navigate("/");
    }
  }

  return (
    <div className="min-h-screen bg-[#DDDDDD] flex items-center justify-center p-4 animate-page-in">
      <div
        className={isExiting ? "animate-modal-out" : "animate-modal-in"}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className="bg-white rounded-2xl w-full max-w-[500px] p-6">
          <h1 className="text-[22px] font-bold text-black mb-6">
            Welcome to CodeLeap network!
          </h1>

          <label className="block text-sm text-black mb-2">
            Please enter your username
          </label>
          <input
            type="text"
            placeholder="John doe"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="w-full border border-[#CCCCCC] rounded-lg px-3 py-2 text-sm placeholder-[#CCCCCC] outline-none focus:border-[#7695EC] transition-colors"
          />

          <div className="flex justify-end mt-6">
            <button
              onClick={handleEnter}
              disabled={!value.trim() || isExiting}
              className="bg-[#7695EC] text-white font-bold text-base px-9 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#5a7de0] transition-colors"
            >
              ENTER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
