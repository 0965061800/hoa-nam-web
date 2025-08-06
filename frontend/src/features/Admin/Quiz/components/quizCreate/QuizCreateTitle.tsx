"use client";
import React, { useEffect, useRef, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
export interface quizTitleProps {
  onChangeQuizInfo: (title: string, isShuffled:boolean, timeToPlay: number) => void;
}


function QuizCreateTitle({ onChangeQuizInfo }: quizTitleProps) {
  const quizTitleRef = useRef(null);
  const [shuffleable, setShuffleable] = useState(false);
  const [minute, setMinute] = useState(5);
  const [second, setSecond] = useState(0);

  const [title, setTitle] = useState("");
  const debouncedInputValue = useDebounce(title, 500);

  const handleChangeMinute = (minuteInput) => {
    if (minuteInput > 240) {
      toast.error(
        "The minute of playing quiz must be less than or equal to 240"
      );
    } else if (minuteInput < 0) {
      toast.error("The minute must be positive");
    } else {
      setMinute(minuteInput);
    }
  };

  const handleChangeSecond = (secondInput) => {
    if (secondInput> 60) {
      toast.error(
        "The second of playing quiz must be less than 60"
      );
    } else if (secondInput < 0) {
      toast.error("The second must be positive");
    } else {
      setSecond(secondInput);
    }
  };

  useEffect(() => {
    onChangeQuizInfo(debouncedInputValue, shuffleable, minute*60+second);
  }, [debouncedInputValue, shuffleable, minute, second]);


  return (
    <div className="p-3 flex border border-rose-700 rounded-md justify-between">
      <div className="flex gap-2">
        <div className="flex gap-2 items-center">
          <div className="bg-rose-700 px-4 py-1 rounded-md text-white">1</div>
          <span className="font-bold">Quiz Name : </span>
        </div>
        <input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
          ref={quizTitleRef}
          className="outline-none border-b-2 pt-1 w-[300px] text-[13px]"
          placeholder="Enter the Name Of The Quiz..."
        />
      </div>
      <div className="flex items-center space-x-2">
        <Label htmlFor="airplane-mode">Shufflable</Label>
        <Switch
          id="airplane-mode"
          color="orange"
          checked={shuffleable}
          className="data-[state=checked]:bg-rose-600"
          onCheckedChange={() => setShuffleable(!shuffleable)}
        />
      </div>
      <div className="flex items-center gap-3">
        <Label htmlFor="airplane-mode">Time to play</Label>
        <Input
          className="w-24 [&::-webkit-inner-spin-button]:appearance-none"
          type="number"
          placeholder="minute"
          min="0"
          max="240"
          value={minute}
          onChange={(e) => handleChangeMinute(e.target.value)}
        />
        <p>:</p>
        <Input
          className="w-24 [&::-webkit-inner-spin-button]:appearance-none"
          type="number"
          placeholder="second"
          min="0"
          max="59"
          value={second}
          onChange={(e) => handleChangeSecond(e.target.value)}
        />
      </div>
      {/* <FontAwesomeIcon
        onClick={() => {
          setOpenIconBox(true);
        }}
        icon={selectedIcon.faIcon}
        height={40}
        width={40}
        className="text-white p-2 rounded-md bg-rose-700 cursor-pointer"
      /> */}
    </div>
  );
}

export default QuizCreateTitle;
