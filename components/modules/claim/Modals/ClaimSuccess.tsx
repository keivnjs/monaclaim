import { Dialog, Transition } from "@headlessui/react";
import Button from "components/elements/Buttons";
import React, { Fragment } from "react";

interface Props {
  closeModal: () => void;
  isOpen: boolean;
}

export const ClaimSuccessModal: React.FC<Props> = (props) => {
  const { isOpen, closeModal } = props;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-20 overflow-y-auto"
        onClose={closeModal}
      >

          
          {/* This element is to trick the browser into centering the modal contents. */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="absolute h-screen w-screen">
            <img src="/assets/MOBILE/BLANK-BRICK-1.png" className=" w-full h-full object-cover object-center" />
            <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-10/12 sm:w-4/5 h-3/5 sm:h-4/5 bg-black bg-opacity-80 rounded-lg"></div>
          <div className="absolute inset-0 flex justify-center items-center flex-col space-y-10">
            <img src="/assets/MOBILE/CONGRATS.webp" className="h-30 w-3/4 sm:h-60 sm:w-3/5" />
            <div className="flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-10 space-x-4 ">
              <img src="/assets/MOBILE/THANKS.png" className="w-8/12 sm:w-3/12 cursor-pointer" onClick={closeModal} />
              <img src="/assets/MOBILE/OPENSEA.png" className="w-9/12 sm:w-3/12 cursor-pointer"  />
            </div>
          </div>
          </div>
        </div>
          </Transition.Child>
      </Dialog>
    </Transition>
  );
};
