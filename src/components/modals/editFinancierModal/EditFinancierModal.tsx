import { Button, Modal } from "antd";
import { useState } from "react";
import { EditIcon } from "../../icons";

const EditFinancierModal = () => {
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
        <EditIcon className="text-neutral-400 hover:text-purple" />
      </Button>
      <Modal
        title="Edit Financiers"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        {/* <EditFinanciersForm /> */}
      </Modal>
    </>
  )
}

export default EditFinancierModal;