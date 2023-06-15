import { Button, Modal } from "antd";
import React from "react";
import { useState } from "react";
import { mutate } from "swr";
import { post } from "../../../services/axios";
import { updateOrderState } from '../../../services/apiEndpoint';

interface Props {
  orderId: string;
  orderAction: string;
  ordersListUrl: string;
}

const UpdateStateModal = ({ orderId, orderAction, ordersListUrl }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    await post(updateOrderState, { id: orderId, orderState: orderAction });
    await mutate(ordersListUrl);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button className="flex items-center bg-primary-500 text-white  hover:!text-white font-medium text-sm border-0 px-2" onClick={showModal}>{orderAction}</Button>
      <Modal title={`${orderAction} order`} footer={false} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        Are You Sure?
        <div className="mt-10 flex w-full flex-row-reverse">
          <Button htmlType="submit" className="ml-2 bg-blue text-white hover:bg-blue-dark hover:!text-white" onClick={() => handleOk()}>
            Ok
          </Button>
          <Button htmlType="button" onClick={() => handleCancel()}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default UpdateStateModal;