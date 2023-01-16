import { Button, Modal } from "antd";
import { useState } from "react";
import { AddSupplyChainForm } from "../../forms";
import { AddIcon } from "../../icons";

const AddSupplyChainModal = () => {
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
      <Button className="flex items-center bg-blue text-white hover:!bg-blue-dark hover:!text-white font-medium text-sm border-0 px-2 !py-6" onClick={showModal}>
        <span className="mx-2"> 
          Create New Supply Chain
        </span>
      </Button>
      <Modal 
        title="Add Chain" 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel}
        footer={false}
      >
        <AddSupplyChainForm />
      </Modal>
    </>
  )
}

export default AddSupplyChainModal;