import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { SignInFormType, signInSchema } from "../signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import InputAuth from "../components/InputAuth";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import { ISuccesUser } from "../types/user";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_APP_BASE_URL;

interface Props {
  role: string;
}

const SignInPage = ({ role }: Props) => {
  const navigate = useNavigate();

  const form = useForm<SignInFormType>({
    resolver: zodResolver(signInSchema),
  });

  const { userName, login, roles} = useAuth();
  useEffect(() => {
    if (userName !== undefined && userName !== null && roles?.includes(role)) {
      navigate("/");
    }
  }, [userName, navigate, roles]);
  function onSubmit(values: SignInFormType) {
    axios
      .post(
        role == "User"
          ? `${apiUrl}/Account/signin`
          : `${apiUrl}/Account/admin/signin`,
        values,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        const data = response.data;

        const user: ISuccesUser = {
          token: data.token,
          username: data.username,
          roles: data.roles,
          userId: data.userId,
        };

        login(user); // now correctly passing required info
      });
  }

  return (
    <div className="mx-auto container max-w-[1240px] font-primative mb-10">
      <p className="pt-10 text-center text-3xl font-bold text-primative">
        Đăng nhập
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-1/3 mx-auto mt-5 bg-primative bg-opacity-80 px-10 py-5 rounded-lg"
        >
          <div className="flex flex-col gap-10 items-center mt-5">
            <InputAuth
              form={form}
              name="userName"
              label="Username"
              placeholder="Nhập tên người dùng"
              type="text"
            ></InputAuth>
            <InputAuth
              form={form}
              name="password"
              label="Password"
              placeholder="Nhập password của bạn"
              type="password"
            ></InputAuth>
          </div>
          <Button
            type="submit"
            className="block mt-5 mx-auto bg-white cursor-pointer text-red-600 font-bold hover:bg-red-500 hover:text-white hover:scale-110 transition-all"
          >
            Đăng nhập
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignInPage;
