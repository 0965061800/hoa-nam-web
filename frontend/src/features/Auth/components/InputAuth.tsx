import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { SignInFormType } from "../signInSchema";
import { SignUpFormType } from "../signUpSchema";

interface InputFieldProps {
  form: UseFormReturn<SignInFormType | SignUpFormType>;
  label: string;
  name: 'userName' | 'password' | 'confirmPassword';
  placeholder: string;
  type: string
}

const InputAuth: React.FC<InputFieldProps> = ({
  form,
  label,
  name,
  placeholder,
  type = 'text'
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel
            className={cn(
              "font-semibold",
              form.formState.errors.userName ? "text-white" : "text-black"
            )}
          >
            {label}
          </FormLabel>
          <FormControl className="w-full">
            <Input
              placeholder={placeholder} {...field}
              className="w-full"
              type = {type}
            />
          </FormControl>
          <FormMessage className="text-white" />
        </FormItem>
      )}
    />
  );
};

export default InputAuth;
