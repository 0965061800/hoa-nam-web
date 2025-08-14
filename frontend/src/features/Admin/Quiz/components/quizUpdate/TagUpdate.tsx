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

import { handleGetTags } from "../../services/apis/handle";
import { useAuth } from "@/hooks/useAuth";
import { TagDataDto, TagDtoForList } from "../../types/interfaces";
import AddNewTag from "../quizCreate/AddNewTag";
import Tags from "./Tags";



export interface TagComboBoxProps {
  tagExists: TagDataDto[];
  handleTaggingQuiz: (tagIds: string[]) => void
}

export function TagUpdate({handleTaggingQuiz, tagExists}: TagComboBoxProps) {
  const [tagList, setTagList] = useState<TagDtoForList[]>([]);
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState<TagDataDto[]>(tagExists);
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
    <div className="flex gap-3">
    <Tags tags={tags} removeTag={removeTag}></Tags>
    <Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
        <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className="rounded-3xl p-4"
        >
        +
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
    </div>
  );
}
