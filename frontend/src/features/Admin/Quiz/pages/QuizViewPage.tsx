'use client';

import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import AdminQuizzesArea from "../components/ViewQuiz/AdminQuizzesArea";
import { PageListData, PageRequestParam } from "../types/interfaces";
import { handleGetAdminQuizzes } from "../services/apis/handle";
import CustomPagination from "../components/ViewQuiz/CustomPagination";

export default function QuizViewPage() {
    const [pageInfo, setPageInfo] = useState<PageListData>({
      totalPage:0,
      pageIndex:0,
      pageSize:0,
      data:[]
    })
    const [param, setParam] = useState<PageRequestParam>({
      filter:'',
      pageIndex: 1,
      pageSize: 12,
      sorting:0
    })
    const {token} = useAuth();
    useEffect(() => {
      async function fetchQuizzes() {
        const data = await handleGetAdminQuizzes(token,param);
        if (data) {
          setPageInfo({...data})
        }
      }
      fetchQuizzes();
    }, [param]);

    const handlePageChange = (page: number) => {
    setParam((prev) => ({...prev, pageIndex:page, pageSize: pageInfo.pageSize}))
  };

  const handleSorting = (value: string) => {
    setParam((prev) => ({...prev, sorting: parseInt(value)}))
  }

  const handleSearching = (value: string) => {
    setParam((prev) => ({...prev, filter: value}))
  }

  return (
    <div className="mx-auto container max-w-[1440px] font-primative">
        <div className="bg-white-300 h-full p-4">
        {
            pageInfo.data == undefined
            ? ""
            : 
            <div className="flex flex-col gap-10">
              <AdminQuizzesArea quizzes={pageInfo.data} sorting={param.sorting} handleSorting={handleSorting} filter={param.filter} handleSearching={handleSearching} ></AdminQuizzesArea>
              <CustomPagination currentPage={pageInfo.pageIndex} totalPages={pageInfo.totalPage} onPageChange={handlePageChange}></CustomPagination>
            </div>
        }
        </div>
    </div>
  );
}

