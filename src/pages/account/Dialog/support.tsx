
function Support({closeDialog}: {
    closeDialog: () => void
}) {
 
   return (
     <div className="">
       <>
         <p className="text-[2rem] mb-16">Supportsfsf</p>


         <div className="grid gap-8 mt-[5rem]">
           <div className="flex items-center gap-8">
             <img src="/icons/headPhone.svg" alt="" />
             <p>+234 816727299020</p>
           </div>
           <div className="flex items-center gap-8">
             <img src="/icons/emailSupport.svg" alt="" />
             <p>Support@swifth.com</p>
           </div>
         </div>
       </>
     </div>
   );
}

export default Support





