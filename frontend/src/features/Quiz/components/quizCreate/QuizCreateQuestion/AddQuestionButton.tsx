import React from 'react';

interface Props {
    onClick: () => void;
}

const AddQuestionButton = ({onClick}:Props) => {
    return (
        <div className="w-full flex justify-center mt-3 ">
            <button
              onClick={() => onClick()}
              className="p-3 bg-rose-700 rounded-md text-white w-[210px] text-[13px]"
            >
              Add a New Question
            </button>
        </div>
    );
};

export default AddQuestionButton;