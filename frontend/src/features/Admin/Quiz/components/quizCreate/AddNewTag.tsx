import { Input } from "@/components/ui/input";
import { Plus, Send } from "lucide-react";
import React, { useState } from "react";
import { handleCreateTag } from "../../services/apis/handle";
import { useAuth } from "@/hooks/useAuth";
import { AddTagDto } from "../../types/interfaces";


export interface AddNewTagProps {
    reRenderTagList: () => void
}
const AddNewTag = ({reRenderTagList}: AddNewTagProps) => {
  const { token } = useAuth();
  const [newTagValue, setNewTagValue] = useState<string>("");
  async function handleSendNewTag() {
    const newTagObjetct: AddTagDto = {
      name: newTagValue,
    };
    await handleCreateTag(token, newTagObjetct);
    reRenderTagList();
  }
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <div className="relative">
        <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
          <Plus className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        </div>
        <Input
          id="search"
          type="text"
          placeholder="Create tag"
          className="w-full rounded-lg bg-background pl-8 pr-8"
          value={newTagValue}
          onChange={(e) => setNewTagValue(e.target.value)}
        />
        <div
          className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground"
          onClick={handleSendNewTag}
        >
          <Send
            className={`mr-2 h-4 w-4 shrink-0 opacity-50 ${
              newTagValue.length > 0
                ? "cursor-pointer  font-extrabold text-blue-500"
                : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default AddNewTag;
