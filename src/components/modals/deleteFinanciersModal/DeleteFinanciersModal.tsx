import { Button, Modal } from "antd";
import { useState } from "react";
import { DeleteIcon } from "../../icons";

const DeleteCompaniesModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button className="bg-neutral-100 border-0 px-2" onClick={showModal}>
        <DeleteIcon className="text-neutral-400 hover:text-purple" />
      </Button>
      <Modal title="Delete Financiers" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        Are You Sure?
      </Modal>
    </>
  )
}

export default DeleteCompaniesModal;