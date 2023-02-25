import { Fragment } from 'react';
import { BsArrowLeft } from 'react-icons/bs';


const DialogDetails = () => {


  return (
    <div className=" h-full items-baseline w-[80rem] overflow-y-scroll pb-10">
      <>
        <div className="flex gap-10 items-center">
          <BsArrowLeft
            className="text-[2.4rem] cursor-pointer"
            onClick={() => setIsIndividualDetail(false)}
          />
          <p className="text-[2rem] text-gray-600 text-center">Details</p>
        </div>
        <main className="grid gap-16 mt-10  ">
          <div className="grid justify-start justify-items-start gap-4">
            <p className="text-[2rem] text-gray-600 text-center">
              {individualHistory?.name}
            </p>
            <p className="bg-color-primary text-white rounded-3xl py-2 px-6">
              {individualHistory?.tag}
            </p>
          </div>
          <section
            className="grid gap-10 border border-color-purple-light p-8 rounded-2xl"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))',
            }}
          >
            <div>
              <p className=" text-gray-400">Car Brand</p>
              <p className=" text-gray-600">Toyota</p>
            </div>
            <div>
              <p className=" text-gray-400">Car Year</p>
              <p className=" text-gray-600">2022</p>
            </div>
            <div>
              <p className=" text-gray-400">Car Model</p>
              <p className=" text-gray-600">Camry</p>
            </div>
            <div>
              <p className=" text-gray-400">Car Trim</p>
              <p className=" text-gray-600">XLE</p>
            </div>
          </section>
          <section className="grid gap-[2rem]">
            {keys.map((doc, i) => (
              <Fragment key={doc}>
                <div className="grid relative">
                  <button
                    className={` w-full `}
                    onClick={() => accordianHandler(doc)}
                  >
                    <div className="flex justify-between cursor-pointer">
                      <p className=" text-color-purple-1 flex items-center gap-6">
                        <div>
                          <img
                            src="/icons/check-success.svg"
                            alt=""
                            className="w-[2.4rem] relative z-[2]"
                          />
                          {i !== keys.length - 1 && (
                            <span className="accordion__line"></span>
                          )}
                        </div>
                        <span>{doc}</span>
                      </p>
                      <p className="text-color-purple flex items-center gap-4">
                        <span className="text-gray-600 text-[1.4rem]">
                          Dec 3, 2023
                        </span>{' '}
                        {keyItem === doc ? (
                          <img src="/icons/arrow-circle-up.svg" alt="" />
                        ) : (
                          <img src="/icons/arrow-circle-down.svg" alt="" />
                        )}
                      </p>
                    </div>
                  </button>
                  {keyItem === doc && i !== keys.length - 1 ? (
                    <div
                      className={`grid mt-10 gap-8 px-16 ${
                        keyItem === doc ? 'visible h-auto' : 'invisible h-0'
                      }`}
                    >
                      <div className=" border-b-color-purple-light-2 flex justify-between">
                        <p className="text-[1.4rem] text-color-purple-1">
                          All Documents
                        </p>
                      </div>
                      <div className=" border-b-color-purple-light-2 flex justify-between">
                        <p className="text-[1.4rem] text-color-purple-1">
                          All Documents
                        </p>
                      </div>
                    </div>
                  ) : keyItem === doc && i === keys.length - 1 ? (
                    <div className="grid gap-8 px-16 my-8">
                      <p className="text-[1.4rem] text-gray-500">
                        James Ibori marked {individualHistory?.name}'s item as
                        delivered
                      </p>

                      <div
                        className={`flex border border-color-purple-light rounded-lg py-8 px-10 items-center gap-6 cursor-pointer text-[1.4rem] w-full h-[8rem]
                              `}
                      >
                        <img src="/icons/admin/upload.svg" alt="" />

                        <div className="grid">
                          <p className="text-[1.4rem]">Proof of Delivery</p>
                          <p className="text-color-grey-4 text-[1rem]">520KB</p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </Fragment>
            ))}
          </section>
        </main>
      </>
    </div>
  );
};

export default DialogDetails;
