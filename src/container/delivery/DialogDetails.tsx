import { BsArrowLeft } from 'react-icons/bs';


const DialogDetails = () => {




  return (
    <div className=" h-full items-baseline w-[80rem] overflow-y-scroll pb-10">
      <div className="flex gap-10 items-center">
        <BsArrowLeft
          className="text-[2.4rem] cursor-pointer"
         // onClick={() => handleCloseDialog('eachOrder')}
        />
        <p className="text-[2rem] text-gray-600 text-center">Details</p>
      </div>
     <main className="grid gap-10 mt-10  ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente ducimus nobis iure placeat. Quasi, illo ut. Ea quo, eligendi quidem at facere dignissimos sunt eum aut id saepe alias rerum?
     </main>
    </div>
  );
};

export default DialogDetails;
