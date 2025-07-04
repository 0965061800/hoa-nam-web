'use client';
import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import useGlobalContextProvider from '@/context/ContextApi';
import { iconsData } from '@/features/Quiz/utils/iconsData';

function IconsComponents() {
  const [allIcons, setAllIcons] = useState(iconsData);
  const { openBoxToggle, selectedIconObject } = useGlobalContextProvider();
  const { openIconBox, setOpenIconBox } = openBoxToggle;
  const { setSelectedIcon } = selectedIconObject;
  function handleClickedIcon(iconIndex: number) {
    const updatedIcons = allIcons.map((icon, i) => {
      if (i === iconIndex) {
        setSelectedIcon((prevState) => {
          const copyIconState = prevState;
          copyIconState.faIcon = icon.faIcon;
          return copyIconState;
        });
        return { ...icon, isSelected: true };
      }

      return { ...icon, isSelected: false };
    });

    setAllIcons(updatedIcons);
  }

  return (
    <div
      className={`w-full flex absolute justify-center items-center top-50 ${
        openIconBox ? 'visible' : 'invisible'
      }`}
    >
      <div
        className=" relative z-50 w-[570px] p-4 rounded-md bg-white 
      border border-rose-700 flex flex-col gap-6 shadow-md"
      >
        <FontAwesomeIcon
          height={20}
          width={20}
          className="absolute top-8 right-4 text-gray-300 cursor-pointer"
          icon={faClose}
          onClick={() => {
            setOpenIconBox(false);
          }}
        />
        <span className="font-bold text-lg text-rose-700 bg-white mt-3 ">
          Choose Your Icon
        </span>
        <div
          className="border border-gray-200 p-5 flex flex-wrap gap-4
        items-center rounded-md   "
        >
          {allIcons.map((icon, iconIndex) => (
            <FontAwesomeIcon
              key={iconIndex}
              className={`border p-2   border-gray-300 rounded-md text-xl cursor-pointer
              hover:text-rose-700 hover:border-rose-700  ${
                icon.isSelected
                  ? 'text-rose-700 border-rose-700'
                  : 'text-black border-gray-300'
              }`}
              height={50}
              width={50}
              icon={icon.faIcon}
              onClick={() => {
                handleClickedIcon(iconIndex);
              }}
            />
          ))}
        </div>
        <div className=" flex my-2 justify-end">
          <button
            onClick={() => {
              setOpenIconBox(false);
            }}
            className="bg-rose-700 select-none hover:bg-rose-800 p-2 rounded-md text-white text-[13px] px-8"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default IconsComponents;
