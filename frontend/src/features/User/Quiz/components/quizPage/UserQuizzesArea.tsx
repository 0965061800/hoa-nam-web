'use client';
import React from 'react';
import PlaceHolder from './PlaceHolder';
import { UserQuizData } from '../../types/interfaces';
import UserQuizCard from './UserQuizCard';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Props {
  quizzes: UserQuizData[];
  sorting: number;
  filter: string;
  handleSorting: (value: string) => void;
  handleSearching: (value: string) => void
}

function UserQuizzesArea({quizzes, sorting, handleSorting, handleSearching}: Props) {
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
                    {quizzes.map((singleQuiz: UserQuizData, quizIndex:number) => (
                        <div key={quizIndex}>
                        <UserQuizCard singleQuiz={singleQuiz} />
                        </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        
        {/* (
          <div className="  h-96 flex flex-col gap-4 justify-center items-center">
            <h2 className="font-bold text-5xl">
              Learn 10x <span className="text-primative">Faster!</span>
            </h2>
            <span className="text-xl font-light">
              Unlock Your Potential with Personalized Quizzes
            </span>
            <button
              onClick={() => {
                setUser((prevUser) => ({ ...prevUser, isLogged: true }));
              }}
              className="p-4 bg-primative text-white rounded-md"
            >
              Get Started Now!
            </button>
          </div>
        )} */}
      </div>
  );
}

export default UserQuizzesArea;
