import { Code2 } from "lucide-react";

export const SidebarHeader = () => {
  return (
    <div className="p-4 border-b border-border md:h-16">
      <div className="flex items-center gap-3">
        <Code2 className="w-6 h-6 text-editor-success" />
        <span className="text-lg font-semibold">Code Garden</span>
      </div>
    </div>
  );
};