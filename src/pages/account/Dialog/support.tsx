import React from 'react'

function support() {
 
   return (
     <div className="relative h-[90vh]">
     
       <>
         <p className="text-[2rem] mb-16">Support</p>

         <div className="grid gap-8 mt-[5rem]">
           
         </div>
       </>
       
     </div>
   );
}

export default support







 const initial = (
   <>
     <p className="text-[2rem] mb-16">Settings</p>

     <div className="grid gap-8 mt-[5rem]">
       <button
         className="border border-color-purple-light-2 rounded-3xl p-6 text-left flex items-center gap-8 "
         onClick={() => setStep('addCar')}
       >
         <img src="/icons/car.svg" alt="" />
         <div>
           <p className="text-[#251A45]">Add a Car</p>
           <p className="text-[1.4rem] text-gray-500">
             Add new car and details
           </p>
         </div>
       </button>
       <button
         className="border border-color-purple-light-2 rounded-3xl p-6 text-left flex items-center gap-8 "
         onClick={() => setStep('payment')}
       >
         <img src="/icons/customerPayment.svg" alt="" />
         <div>
           <p className="text-[#251A45]">Customer/Payment Settings</p>
           <p className="text-[1.4rem] text-gray-500">
             Manage customer & payment settings{' '}
           </p>
         </div>
       </button>
       <button
         className="border border-color-purple-light-2 rounded-3xl p-6 text-left flex items-center gap-8 "
         onClick={() => setStep('changePassword')}
       >
         <img src="/icons/security.svg" alt="" />
         <div>
           <p className="text-[#251A45]">Password & Security</p>
           <p className="text-[1.4rem] text-gray-500">
             Set up password and 2FA
           </p>
         </div>
       </button>
       <button
         className="border border-color-purple-light-2 rounded-3xl p-6 text-left flex items-center gap-8 "
         onClick={() => setStep('notification')}
       >
         <img src="/icons/notification-1.svg" alt="" />
         <div>
           <p className="text-[#251A45]">Notification Settings</p>
           <p className="text-[1.4rem] text-gray-500">
             Adjust your notification setting
           </p>
         </div>
       </button>
     </div>
   </>
 );