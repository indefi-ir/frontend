import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ProductUnitForm } from '../../../components/forms';

const AddProductUnitModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button className='h-[50px]' type="dashed" onClick={showModal} block icon={<PlusOutlined />}>
        افزودن واحد اندازه گیری
      </Button>
      <Modal
        title={<span className='block mb-10'>افزودن واحد اندازه گیری</span>}
        open={isModalOpen}
        onOk={closeModal}
        onCancel={closeModal}
        footer={false}
      >
        <ProductUnitForm closeModal={closeModal} />
      </Modal>
    </>
  );
};

export default AddProductUnitModal;