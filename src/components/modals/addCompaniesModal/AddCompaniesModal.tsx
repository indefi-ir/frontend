import { Button, Modal } from "antd";
import { useState } from "react";
import { AddCompaniesForm } from "../../forms";
import { AddIcon } from "../../icons";

const AddCompaniesModal = () => {
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
      <Button className="flex items-center bg-blue text-white hover:bg-blue-dark hover:!text-white font-medium text-sm border-0 px-2 !py-6" onClick={showModal}>
        <span className="mx-2"> 
          Create New Company
        </span>
      </Button>
      <Modal 
        title="Add Company" 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel}
        footer={false}
      >
        <AddCompaniesForm />
      </Modal>
    </>
  )
}

export default AddCompaniesModal;