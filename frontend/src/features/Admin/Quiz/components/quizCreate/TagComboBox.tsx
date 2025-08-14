"use client";

import { useState, useEffect } from "react";
import {  Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Tags from "./Tags";
import { handleGetTags } from "../../services/apis/handle";
import { useAuth } from "@/hooks/useAuth";
import { TagDtoForList } from "../../types/interfaces";

import AddNewTag from "./AddNewTag";

export interface TagComboBoxProps {
  handleTaggingQuiz: (tagIds: string[]) => void
}

export function ComboBox({handleTaggingQuiz}: TagComboBoxProps) {
  const [tagList, setTagList] = useState<TagDtoForList[]>([]);
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState<TagDtoForList[]>([]);
  const { token } = useAuth();
  
  const handleAddTag = (tagId: string) => {
    const tag = tagList.filter((x) => x.id === tagId)[0];
    const checkTagExist = tags.some(
      (x) => x.normalizeName === tag.normalizeName
    );
    if (!checkTagExist) setTags([...tags, tag]);
  };

  useEffect(() => {
    fetchTags();
  }, []);
  
  useEffect(() => {
    const tagIds = tags.map(x => x.id);
    handleTaggingQuiz(tagIds)
  },[tags])
  
  const fetchTags = async () => {
      try {
        const tags = await handleGetTags(token);
        setTagList(tags);
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      }
    };


  const removeTag = (tagIdToRemove: string) => {
    setTags(tags.filter((tag) => tag.id !== tagIdToRemove));
  };


  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[100px] justify-between"
          >
            {/* {value
                ? frameworks.find((framework) => framework.value === value)?.label
                : "Select framework..."} */}
            Add Tag
            <Tag className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." className="h-9" />
            <CommandList>
              <CommandEmpty>No tag found.</CommandEmpty>
              <CommandGroup>
                {tagList.map((tag, index) => (
                  <CommandItem
                    key={index}
                    value={tag.id}
                    onSelect={(currentValue) => {
                      handleAddTag(currentValue);
                      setOpen(false);
                    }}
                  >
                    {tag.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          <AddNewTag reRenderTagList={fetchTags}></AddNewTag>
        </PopoverContent>
      </Popover>
      <Tags tags={tags} removeTag={removeTag}></Tags>
    </div>
  );
}
