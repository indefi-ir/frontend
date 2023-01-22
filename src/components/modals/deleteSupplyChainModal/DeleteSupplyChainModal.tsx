import { Button, Modal } from "antd";
import React from "react";
import { useState } from "react";
import { mutate } from "swr";
import { removeSupplyChainUrl, supplyChainsUrl } from "../../../services/apiEndpoint";
import { post } from "../../../services/axios";
import { DeleteIcon } from "../../icons";
import { userInfoContext } from "../../providers/userInfoProvider/UserInfoProvider";

const DeleteSupplyChainModal = ({ supplyChainId }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id: regulatorId }: any = React.useContext(userInfoContext);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    await post(`${removeSupplyChainUrl}${supplyChainId}`);
    await mutate(`${supplyChainsUrl}${regulatorId}`);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button className="bg-neutral-100 border-0 px-2" onClick={showModal}>
        <DeleteIcon className="text-neutral-400 hover:text-purple" />
      </Button>
      <Modal title="Delete Chain" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false}>
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

export default DeleteSupplyChainModal;