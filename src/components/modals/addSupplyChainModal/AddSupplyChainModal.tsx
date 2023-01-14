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
      <Button className="flex items-center bg-blue-light text-blue hover:font-bold hover:!text-blue border-0 px-2 !py-6" size="large" onClick={showModal}>
      <AddIcon/>
        <span className="mx-2"> 
          Create New
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