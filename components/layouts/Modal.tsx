import * as React from "react";
import { Dialog } from "@headlessui/react";
import { classNames } from "shared/utils/classNames";

type ModalProps = {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalImage = ({ isModalVisible, setIsModalVisible }: ModalProps) => {
  return (
    <Dialog
      open={isModalVisible}
      onClose={() => setIsModalVisible(false)}
      className="fixed inset-0 flex items-center justify-center overflow-y-auto z-50"
    >
      {/* Use the overlay to style a dim backdrop for your dialog */}
      <Dialog.Overlay className="fixed inset-0 bg-black/60" />

      <div className="flex flex-col w-96 py-8 px-4 text-center brightness-90">
        <img src="/assets/bg-coming-soon.png" />
      </div>
    </Dialog>
  );
};

export default ModalImage;
