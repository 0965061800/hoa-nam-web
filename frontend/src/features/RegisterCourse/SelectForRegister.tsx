import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { cn } from '@/lib/utils';
import { RegisterFormType } from './formSchema';
import { UseFormReturn } from 'react-hook-form';

type Props = {
  form: UseFormReturn<RegisterFormType>;
};



const SelectForRegister = ({form} : Props) => {
    return (
        <FormField
        control={form.control}
        name="courses"
        render={({ field }) => (
          <FormItem className="mt-5">
            <FormLabel className={cn(
                    "font-semibold",
                    form.formState.errors.username
                      ? "text-white"
                      : "text-black")}>Chọn khóa học</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn khóa học muốn đăng ký" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="children_courses">Khóa học cho trẻ em</SelectItem>
                <SelectItem value="HSK1_courses">Khóa học HSK 1</SelectItem>
                <SelectItem value="HSK2_courses">Khóa học HSK 2</SelectItem>
              </SelectContent>
              <FormMessage className="text-white" />
            </Select>
          </FormItem>
        )}
      />
    );
};

export default SelectForRegister;