import { z } from "zod";

export const formSchema = z.object({
  username: z.string({
    required_error: "Nhập tên nè!"
  }).min(2, {
    message: "Tên chưa được nhập !",
  }).regex(/^(([a-zA-Z\sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]*)([a-zA-Z\s\\'ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]*)([a-zA-Z\sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]))*$/, "Tên bạn nhập có chưa đúng hoặc chứa số"),
  dob: z.date({
    required_error: "Cần nhập ngày sinh",
  }),
  phoneNumber: z.string({
    required_error: "Bạn nhập số nhé!"
  }).min(10, "Số điện thoại phải từ 10 số trở lên").regex(/^\d+$/,  "Số điện thoại của bạn không đúng hoặc chứa chữ"),
  email: z.string({
    required_error: "Bạn hãy nhập email nhé!"
  }).email("Nhập email chưa đúng"),
  courses: z.string({
    required_error: "Bạn cần chọn 1 khóa học"
  })
});

export type RegisterFormType = z.infer<typeof formSchema>;