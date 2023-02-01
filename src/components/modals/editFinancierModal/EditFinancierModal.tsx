import { Button, Modal } from "antd";
import { useState } from "react";
import { EditFinancierForm } from "../../forms";
import { EditIcon } from "../../icons";

const EditFinancierModal = (financierInfo: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button className="bg-neutral-100 border-0 px-2" onClick={showModal}>
        <EditIcon className="text-neutral-400 hover:text-purple" />
      </Button>
      <Modal
        title="Edit Financier"
        open={isModalOpen}
        onOk={closeModal} 
        onCancel={closeModal}
        footer={false}
      >
        <EditFinancierForm closeModal={closeModal} financierInfo={financierInfo} />
      </Modal>
    </>
  )
}

export default EditFinancierModal;