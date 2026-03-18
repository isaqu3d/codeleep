import { cn } from "../lib/cn";

const sizeVariants = {
  sm: "size-6",
  md: "size-8",
} as const;

interface SpinnerProps {
  size?: keyof typeof sizeVariants;
}

export default function Spinner({ size = "md" }: SpinnerProps) {
  return (
    <div
      className={cn(
        "border-4 border-[#7695EC] border-t-transparent rounded-full animate-spin",
        sizeVariants[size],
      )}
    />
  );
}
