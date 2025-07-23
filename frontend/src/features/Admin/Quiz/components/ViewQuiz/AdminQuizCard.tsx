'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from 'react-router-dom';
import { AdminQuizDto } from '../../types/interfaces';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { handleDeleteQuiz } from '../../services/apis/handle';
import { useAuth } from '@/hooks/useAuth';


interface Props {
    singleQuiz: AdminQuizDto
}

function AdminQuizCard({singleQuiz} : Props) {
  const navigate = useNavigate()
  const {token} = useAuth();
  const { quizId, title, numberOfQuestion } = singleQuiz;

  function viewQuiz(quizId: string) {
    navigate(`/admin/quiz/${quizId}`)
  }

  async function deleteQuiz(quizId: string) {
    await handleDeleteQuiz(token, quizId);
    navigate(0);
  }

  //

//   function openDropDownMenu(event: any) {
//     const xPos = event.clientX;
//     const yPos = event.clientY;
//     setThreeDotsPositions({ x: xPos, y: yPos });
//     if (event) {
//       event.stopPropagation();
//     }
//     setDropDownToggle(true);
//     setSelectedQuiz(singleQuiz);
//   }

  return (
    <div className="min-w-[300px] rounded-[10px] flex flex-col gap-2 border border-gray-300 bg-white p-4">
      {/* Image Container */}
      <div className="relative bg-rose-300 w-full aspect-[5/4] flex justify-center items-center  rounded-md ">
        {/* More Options Icon */}
        <div className="absolute cursor-pointer top-3 right-3">
          {/* <FontAwesomeIcon
            className="text-white"
            height={13}
            width={13}
            icon={faEllipsis}
            onClick={openDropDownMenu}
          /> */}
        </div>
        {/* Quiz Icon */}
        {/* <FontAwesomeIcon
          className="text-white text-3xl"
          width={120}
          height={120}
            icon={convertToFaIcons(icon)}
        /> */}
      </div>
      <h3 className="font-bold ">{title}</h3>
      <p className="text-sm font-light">{numberOfQuestion} question(s)</p>
      <div className="flex gap-3 justify-end">
         <div
          onClick={() => {
            viewQuiz(quizId);
          }}
          className="rounded-lg w-10 h-7 bg-rose-500 flex items-center justify-center cursor-pointer"
        >
            <FontAwesomeIcon
              className="text-white"
              width={15}
              height={15}
              icon={faPenToSquare}
            />
        </div>
         <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="rounded-lg w-10 h-7 bg-rose-500 flex items-center justify-center cursor-pointer"
        >
            <FontAwesomeIcon
              className="text-white"
              width={15}
              height={15}
              icon={faTrashCan}
            />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteQuiz(quizId)}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
        
      </div>
    </div>
  );
}

export default AdminQuizCard;
