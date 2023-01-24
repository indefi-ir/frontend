import { Button, Modal } from "antd";
import React from "react";
import { useState } from "react";
import { mutate } from "swr";
import { financiersUrl, removeFinancierUrl } from "../../../services/apiEndpoint";
import { post } from "../../../services/axios";
import { DeleteIcon } from "../../icons";
import { userInfoContext } from "../../providers/userInfoProvider/UserInfoProvider";

const DeleteCompaniesModal = ({ companyId }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id: regulatorId }: any = React.useContext(userInfoContext);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    await post(`${removeFinancierUrl}${companyId}`);
    await mutate(financiersUrl);
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
      <Modal title="Delete Financiers" open={isModalOpen} onOk={handleOk} footer={false} onCancel={handleCancel}>
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

export default DeleteCompaniesModal;