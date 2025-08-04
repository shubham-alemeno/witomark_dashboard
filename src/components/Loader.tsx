import { LoaderCircle } from "lucide-react";

interface LoaderProps {
  size?: number;
  className?: string;
}

export default function Loader({ size = 24, className = "" }: LoaderProps) {
  return (
    <div className={`h-full flex items-center justify-center ${className}`}>
      <LoaderCircle className="animate-spin text-muted-foreground" size={size} strokeWidth={2.5} />
    </div>
  );
}
