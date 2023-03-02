import React from 'react'

function Dialog() {
  return (
    <dialog className="dialog relative text-[1.6rem]" ref={dialogRef}>
      <div className="bg-white fixed right-0 h-[100vh] w-[50rem] py-4 px-12 overflow-y-scroll">
        <input type="text" className="absolute top-0 w-0" />
        <figure className="flex justify-end">
          <img
            src="/icons/close.svg"
            alt=""
            className="w-[3rem] cursor-pointer"
            onClick={() => closeDialog()}
          />
        </figure>
      </div>
    </dialog>
  );
}

export default Dialog