'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { handleGetQuizzes } from '../services/handle';
import { PageListData, PageRequestParam } from '../types/interfaces';
import UserQuizzesArea from '../components/quizPage/UserQuizzesArea';
import CustomPagination from '@/features/Admin/Quiz/components/ViewQuiz/CustomPagination';

export default function QuizPage() {
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
      sorting:0,
      tagIds:[]
    })
    const {token} = useAuth();
    useEffect(() => {
      async function fetchQuizzes() {
        const data = await handleGetQuizzes(token,param);
        if (data) {
          setPageInfo({...data})
        }
      }
      fetchQuizzes();
    }, [param]);

  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setOpenMenu(false);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call the function once initially to set initial state

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

    const handlePageChange = (page: number) => {
    setParam((prev) => ({...prev, pageIndex:page, pageSize: pageInfo.pageSize}))
  };

  const handleSorting = (value: string) => {
    setParam((prev) => ({...prev, sorting: parseInt(value)}))
  }

  const handleSearching = (value: string) => {
    setParam((prev) => ({...prev, filter: value}))
  }

  const handleTagging = (tagIds: string[]) => {
    setParam((prev) => ({...prev, tagIds: tagIds}))
  }

  return (
    <div className="mx-auto container max-w-[1440px] font-primative">
        <div className="bg-white-300 h-full p-4">
        {
            pageInfo.data == undefined
            ? ""
            : 
             <div className="flex flex-col gap-10">
              <UserQuizzesArea quizzes={pageInfo.data} sorting={param.sorting} handleSorting={handleSorting} filter={param.filter} handleSearching={handleSearching} handleTagging={handleTagging} ></UserQuizzesArea>
              <CustomPagination currentPage={pageInfo.pageIndex} totalPages={pageInfo.totalPage} onPageChange={handlePageChange}></CustomPagination>
            </div>
        }
        </div>
    </div>
  );
}

function Sidebar() {
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setOpenMenu(false);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call the function once initially to set initial state

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="bg-red-200 w-full flex flex-row px-5 justify-between md:flex-col md:px-0 md:w-3/12 ">
      {/* Logo */}
      <div className="bg-white p-3 border border-gray-300">Logo</div>
      {/* Menu */}
      <ul
        className={`bg-white ${
          openMenu
            ? 'flex flex-col absolute w-full h-1/2 top-14 left-0'
            : 'hidden'
        } p-3 md:flex md:flex-col gap-2 h-full border border-gray-300`}
      >
        <span>Home</span>
        <span>Blog</span>
        <span>Contact US</span>
      </ul>
      <button
        onClick={() => setOpenMenu((current) => !current)}
        className="md:hidden"
      >
        ...
      </button>
    </div>
  );
}

function Dashboard() {
  return (
    <></>
  );
}