import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon } from 'lucide-react';
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { RegisterFormType } from './formSchema';
import { cn } from '@/lib/utils';
import { format, getYear, getMonth} from "date-fns";

interface Props {
    form: UseFormReturn<RegisterFormType>
}


const months = ["January", "February", "March", "April","May","June","July","August","September","October","November","December"];
const endYear = getYear(new Date());
const years = Array.from({ length: 40 }, (_, i) => endYear - 3 - i);


const DobPicker = ({form} : Props) => {
  const [month, setMonth] = useState<number>(getMonth(new Date));
  const [year, setYear] = useState<number>(getYear(new Date) - 3);
    return (
        <FormField
        control={form.control}
        name="dob"
        render={({ field }) => (
          <FormItem className="flex flex-col pt-2 w-1/2">
            <FormLabel className={cn(
                "font-semibold",
                form.formState.errors.username
                  ? "text-white"
                  : "text-black"
              )}>Ngày sinh</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "dd/MM/yyyy")
                    ) : (
                      <span>Chọn ngày</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <div className="flex justify-between gap-3 my-3 mx-3">
                  <Select onValueChange={(month) => setMonth(months.indexOf(month))} value={months[month]}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Tháng" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select onValueChange={(year) => setYear(Number(year))} value={year.toString()}>
                    <SelectTrigger className="w-1/2">
                      <SelectValue placeholder="Năm" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                  month = {new Date(year, month)}
                  classNames = {{
                    nav_button_previous: "hidden",
                    nav_button_next: "hidden",
                  }}
                />
              </PopoverContent>
            </Popover>
            <FormMessage className="text-white"/>
          </FormItem>
        )}
      />
    );
};

export default DobPicker;