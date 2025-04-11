import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { formSchema, RegisterFormType } from "@/features/RegisterCourse/formSchema";
import SelectForRegister from "@/features/RegisterCourse/SelectForRegister";
import DobPicker from "@/features/RegisterCourse/DobPicker";
import InputRegister from "@/features/RegisterCourse/InputRegister";

const RegisterCourse = () => {
  const form = useForm<RegisterFormType>({
    resolver: zodResolver(formSchema)
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const coursePicked = form.watch('courses');

  return (
    <div className="mx-auto container max-w-[1240px] font-primative mb-10">
      <p className="mt-16 text-center text-3xl font-bold text-primative ">
        Đăng ký khóa học
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 mx-auto mt-5 bg-primative bg-opacity-80 px-10 py-5 rounded-lg"
        >
          <div className="flex gap-10 items-start justify-between">
            <InputRegister form={form} name="username" label="Họ và tên" placeholder="Nhập họ và tên" ></InputRegister>
            <DobPicker form ={form}/>
          </div>
          <div className="flex gap-10 items-start mt-5">
            <InputRegister form={form} name="phoneNumber" label="Số điện thoại" placeholder="Nhập số điện thoại" ></InputRegister>
            <InputRegister form={form} name="email" label="Email" placeholder="Nhập Email của bạn" ></InputRegister>
          </div>
          <SelectForRegister form = {form}/>
          {coursePicked !== undefined ? (
            <div className="text-white mt-3">
              Thời gian học từ 12/03 - 12/06
              <br /> Bao gồm 12 buổi, mỗi buổi 1 tiếng 30 phút
              <br /> Học phí: 1230.000.000 VND
            </div>
          ) : (
            ""
          )}
          <Button
            type="submit"
            className="block mt-5 mx-auto bg-white cursor-pointer text-red-600 font-bold hover:bg-red-500 hover:text-white hover:scale-110 transition-all"
          >
            Đăng ký ngay!
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterCourse;
