import React, { useContext, useEffect, useRef, useState } from 'react';
import { DialogContext, DialogType } from '../Account';
import Business from './Business';
import Config from './Config';
import Personal from './Personal';
import Ports from './Ports';

function Dialog() {
  const { dialogType, setDialogType } = useContext(DialogContext);
  const [width, setWidth] = useState('w-[50rem]');

  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
    setDialogType(null);
    setWidth('w-[50rem]')
  };

 

  useEffect(() => {
    if (dialogType) {
      openDialog();
    }
  }, [dialogType]);

  useEffect(() => {
    console.log({width})
  }, [width])

  const Paths = new Map<DialogType, JSX.Element>([
    ['personal', <Personal closeDialog={closeDialog} />],
    ['business', <Business closeDialog={closeDialog} />],
    ['ports', <Ports closeDialog={closeDialog} setWidth={setWidth} />],
    ['config', <Config closeDialog={closeDialog} setWidth={setWidth} />],
  ]);

  return (
    <dialog className="dialog relative text-[1.6rem]" ref={dialogRef}>
      <div
        className={`bg-white fixed right-0 h-[100vh] py-4 px-12 overflow-y-scroll ${width}`}
      >
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
