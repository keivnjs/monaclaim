import { Dialog, Transition } from "@headlessui/react";
import Button from "components/elements/Buttons";
import React, { Fragment } from "react";

interface Props {
  closeModal: () => void;
  isOpen: boolean;
  address: string;
}

export const ClaimSuccessModal: React.FC<Props> = (props) => {
  const { isOpen, closeModal, address } = props;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-20 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/80" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform">
              <div className="relative font-display">
                <img
                  src="/assets/borders/frame1.png"
                  className="absolute z-20 hidden w-full h-full sm:block"
                />
                <div className="absolute bg-black/60 inset-8" />
                <div className="relative p-0 sm:px-14 sm:py-12 text-2xl sm:text-[2.75rem] sm:leading-none font-bold sm:font-medium text-yellow-300 text-center uppercase z-30">
                  <p>{'"Congratulations!"'}</p>
                  <p className="text-white text-3xl mt-4">
                    {"You've claimed your Mona successfully!"}
                  </p>
                </div>
              </div>

              <div className="flex justify-between space-x-4 mt-4 mx-4">
                <Button
                  variant="secondary"
                  className="!w-64"
                  onClick={closeModal}
                >
                  Got it, thanks!
                </Button>
                <Button
                  variant="primary"
                  className="!w-64"
                  onClick={() =>
                    window.open(
                      `https://opensea.io/${address}?search[resultModel]=ASSETS&search[sortBy]=LISTING_DATE&search[query]=Knights Game Voxel`,
                      "_blank"
                    )
                  }
                >
                  <span>Look at OpenSea</span>
                  <img
                    src="/assets/icons/icon-opensea.png"
                    className="w-6 h-6 ml-2"
                  />
                </Button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
