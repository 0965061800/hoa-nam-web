'use client';
import React from 'react';
import { AdminQuizDto, QuizDataDto } from '../../types/interfaces';
import PlaceHolder from './PlaceHolder';
import AdminQuizCard from './AdminQuizCard';
import { useNavigate } from 'react-router-dom';
import CustomPagination from './CustomPagination';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';


interface Props {
  quizzes: AdminQuizDto[];
  sorting: number;
  filter: string;
  handleSorting: (value: string) => void;
  handleSearching: (value: string) => void
}

function AdminQuizzesArea({quizzes, sorting, handleSorting, handleSearching}: Props) {
  const navigate = useNavigate();

  return (
    <div className="poppins mt-5">
      <div>
        {quizzes.length === 0 ? (
          <PlaceHolder />
        ) : (
          <div>
            {/* <DropDown /> */}
            <div className="flex gap-16 items-center">
              <h2 className="text-xl font-bold">My Quizzes</h2>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Lọc</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start">
                  <DropdownMenuRadioGroup value={sorting.toString()} onValueChange={handleSorting}>
                      <DropdownMenuRadioItem value="0" >
                        Theo ngày tháng
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="1">
                        Theo bảng chữ cái
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <Input type="text" placeholder="Tìm kiếm quiz..."  onChange={(e) => handleSearching(e.target.value)} className="w-fit" />
            </div>
            <div className="w-full mt-6 flex gap-6 flex-wrap ">
              {quizzes.map((singleQuiz: AdminQuizDto, quizIndex: number) => (
                <div key={quizIndex}>
                  <AdminQuizCard singleQuiz={singleQuiz} />
                </div>
              ))}
              <div
                onClick={() => navigate("/admin/quiz/create")}
                className=" cursor-pointer justify-center items-center rounded-[10px]
                   w-[230px] flex flex-col gap-2 border border-gray-100 bg-white p-4"
              >
                {/* <Image
                      src={'/add-quiz.png'}
                      width={160}
                      height={160}
                      alt=""
                    /> */}
                <span className="select-none opacity-40">Add a new Quiz</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminQuizzesArea;
