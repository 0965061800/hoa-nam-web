import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import InputAuth from "../components/InputAuth";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { SignUpFormType, signUpSchema } from "../signUpSchema";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const apiUrl = import.meta.env.VITE_APP_BASE_URL;

interface Props {
  role: string;
}

const SignUpPage = ({ role }: Props) => {
  const navigate = useNavigate();
  const { userName, roles } = useAuth();
  useEffect(() => {
    if (userName !== undefined && userName !== null && roles?.includes(role)) {
      navigate("/");
    }
  }, [userName, navigate, roles]);
  const form = useForm<SignUpFormType>({
    resolver: zodResolver(signUpSchema),
  });

  function onSubmit(values: SignUpFormType) {
    axios
      .post(
        role == "User"
          ? `${apiUrl}/Account/signup`
          : `${apiUrl}/Account/admin/signup`,
        values,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (role == "User") navigate("/signin");
        if (role == "Admin") navigate("/admin/signin");
        toast.success("Đăng ký thành công");
      })
      .catch((error) => {
        toast.error(`Đăng ký thất bại: ${error.response?.data}`);
      });
  }

  return (
    <div className="mx-auto container max-w-[1240px] font-primative mb-10">
      <p className="pt-10 text-center text-3xl font-bold text-primative ">
        Sign Up
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
            <InputAuth
              form={form}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Nhập lại password"
              type="password"
            ></InputAuth>
          </div>
          <Button
            type="submit"
            className="block mt-5 mx-auto bg-white cursor-pointer text-red-600 font-bold hover:bg-red-500 hover:text-white hover:scale-110 transition-all"
          >
            Sign Up
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignUpPage;
