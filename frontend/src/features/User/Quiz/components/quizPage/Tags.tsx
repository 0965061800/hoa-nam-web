import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import React from 'react';
import { TagDtoForList } from '../../types/interfaces';
interface TagsProps {
    tags: TagDtoForList[];
    removeTag: (tagIdToRemove: string) => void
}
const Tags = ({tags, removeTag}: TagsProps) => {
    return (
         <div className={`flex flex-wrap gap-2 rounded-md ${tags.length !== 0 && 'mb-3'}`}>
                {tags.map((tag, index) => (
                    <span key={index} className="transition-all border bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex h-8 items-center text-sm pl-2 rounded-md">
                        {tag.name}
                        <Button
                            type="button" 
                            variant="ghost"
                            onClick={() => removeTag(tag.id)}
                            className={cn("py-1 px-3 h-full hover:bg-transparent")}
                        >
                            <X size={14} />
                        </Button>
                    </span>
                ))}
            </div>
    );
};

export default Tags;