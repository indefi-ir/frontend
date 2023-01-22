import { Button, Modal } from "antd";
import { useState } from "react";
import { AddFinanciersForm } from "../../forms";
import { AddIcon } from "../../icons";

const AddFinanciersModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button className="flex items-center bg-blue text-white hover:!bg-blue-dark hover:!text-white font-medium text-sm border-0 px-2 !py-6" onClick={showModal}>
        <span className="mx-2"> 
          Create New Financier
        </span>
      </Button>
      <Modal 
        title="Add financiers" 
        open={isModalOpen} 
        onOk={closeModal} 
        onCancel={closeModal}
        footer={false}
      >
        <AddFinanciersForm closeModal={closeModal} />
      </Modal>
    </>
  )
}

export default AddFinanciersModal;