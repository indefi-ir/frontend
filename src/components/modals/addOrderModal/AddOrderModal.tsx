import { Button, Modal } from "antd";
import { useState } from "react";
import { AddOrderForm } from "../../forms";

const AddOrderModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button className="flex items-center bg-blue text-white hover:bg-blue-dark hover:!text-white font-medium text-sm border-0 px-2 !py-6" onClick={showModal}>
        <span className="mx-2"> 
          Create New Order
        </span>
      </Button>
      <Modal 
        title="Create Order" 
        open={isModalOpen} 
        onOk={closeModal} 
        onCancel={closeModal}
        footer={false}
      >
        <AddOrderForm closeModal={closeModal}/>
      </Modal>
    </>
  )
}

export default AddOrderModal;