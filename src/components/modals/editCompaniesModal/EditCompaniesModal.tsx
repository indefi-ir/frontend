import { Button, Modal } from "antd";
import { useState } from "react";
import { EditCompaniesForm } from "../../forms";
import { EditIcon } from "../../icons";

const EditCompaniesModal = (companyInfo: any) => {
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
        title="Edit Company" 
        open={isModalOpen} 
        onOk={closeModal} 
        onCancel={closeModal}
        footer={false}
      >
        <EditCompaniesForm closeModal={closeModal} companyInfo={companyInfo} />
      </Modal>
    </>
  )
}

export default EditCompaniesModal;