import { Button, Modal } from "antd";
import { useState } from "react";
// import { SetPasswordForm } from "../../forms";

const SetPasswordModal = ({ userId }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button className="flex items-center bg-blue text-white hover:bg-blue-dark hover:!text-white font-medium text-sm border-0 px-2 !py-5" onClick={showModal}>
        <span className="mx-2">
          Set Password
        </span>
      </Button>
      <Modal
        title="Set Password"
        open={isModalOpen}
        onOk={closeModal}
        onCancel={closeModal}
        footer={false}
      >
        {/* <SetPasswordForm closeModal={closeModal} id={userId} /> */}
      </Modal>
    </>
  )
}

export default SetPasswordModal;