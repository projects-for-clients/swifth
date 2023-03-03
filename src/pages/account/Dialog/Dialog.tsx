import React, { useContext, useEffect, useRef } from 'react';
import { DialogContext, DialogType } from '../Account';
import Business from './Business';
import Personal from './Personal';
import Ports from './Ports';

function Dialog() {
  const { dialogType, setDialogType } = useContext(DialogContext);

  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
    setDialogType(null);
  };

  useEffect(() => {
    if (dialogType) {
      openDialog();
    }
  }, [dialogType]);

  const Paths = new Map<DialogType, JSX.Element>([
    ['personal', <Personal closeDialog={closeDialog} />],
    ['business', <Business closeDialog={closeDialog} />],
    ['ports', <Ports closeDialog={closeDialog} />],
  ]);

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

        {dialogType && Paths.get(dialogType)}
      </div>
    </dialog>
  );
}

export default Dialog;
