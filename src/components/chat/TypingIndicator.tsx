import { Ship } from "lucide-react";

export const TypingIndicator = () => {
  return (
    <div className="flex gap-3 animate-fade-in">
      {/* Avatar */}
      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-ocean-teal to-ocean-blue text-white flex items-center justify-center">
        <Ship className="w-5 h-5" />
      </div>

      {/* Typing dots */}
      <div className="bg-card border border-border rounded-2xl rounded-tl-md px-4 py-3 shadow-soft">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 bg-ocean-teal rounded-full animate-typing" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 bg-ocean-teal rounded-full animate-typing" style={{ animationDelay: "200ms" }} />
          <span className="w-2 h-2 bg-ocean-teal rounded-full animate-typing" style={{ animationDelay: "400ms" }} />
        </div>
      </div>
    </div>
  );
};
