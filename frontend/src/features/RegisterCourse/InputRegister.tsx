import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { RegisterFormType } from "./formSchema";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface InputFieldProps {
  form: UseFormReturn<RegisterFormType>;
  label: string;
  name: 'username' | 'phoneNumber' | 'email' | 'courses';
  placeholder: string;
}

const InputRegister: React.FC<InputFieldProps> = ({
  form,
  label,
  name,
  placeholder,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-1/2">
          <FormLabel
            className={cn(
              "font-semibold",
              form.formState.errors.username ? "text-white" : "text-black"
            )}
          >
            {label}
          </FormLabel>
          <FormControl className="w-full">
            <Input
              placeholder={placeholder} {...field}
              className="w-full"
            />
          </FormControl>
          <FormMessage className="text-white" />
        </FormItem>
      )}
    />
  );
};

export default InputRegister;
