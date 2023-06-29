import React, { useState } from 'react';
import { Button, Card, Form, Input, Modal, Select, SelectProps } from 'antd';
import useSWR from 'swr';
import 'beautiful-react-diagrams/styles.css';
import { fetcher, post } from '../../../services/axios';
import { addSupplyChainUrl, companiesUrl } from '../../../services/apiEndpoint';
import { DrawChain } from '../../../features';

const NewChain = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companiesList, setCompaniesList] = useState([]);
  const [nodesList, setNodesList] = useState<any>([])
  const [chainInfo, setChainInfo] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const getChainData = (data: any) => {
    setChainInfo(data);
  };
  const cloneChainInfo = chainInfo?.length > 0 ? [...chainInfo] : []
  cloneChainInfo.shift();

  const handleOk = () => {
    companiesList?.map((company: { value: any; label: any; }) => (
      setNodesList((current: any) => [...current, {
        id: company.value,
        content: company.label,
        coordinates: [0, 0],
        outputs: [{ id: company.value + '_in' }, { id: company.value + '_out' }],
      }])
    ))
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // @ts-ignore
  const handleChange = (value, options)=> {
    setCompaniesList(options)
  }

  const { data: companies } = useSWR(companiesUrl, fetcher);
  const options: SelectProps['options'] = [];
  companies?.data?.map((company: { id: any; name: any; }) => (
    options.push({
      value: company.id,
      label: company.name,
    })
  ));

  const onFinish = async (values: any) => {
    console.log("values", values)
    const finalData = { ...values, head: chainInfo[0], subChains: cloneChainInfo }
    console.log("values", finalData)
    const result = await post(addSupplyChainUrl, finalData);
    if (result.success) {

    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Card>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        layout="vertical"
        initialValues={{ remember: false }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <Form.Item
          label="نام زنجیره"
          name="name"
          rules={[{
            required: true,
            message: 'لطفا نام زنجیره را وارد نمایید.'
          }]}>
          <Input />
        </Form.Item>
        <Form.Item name="logo" label="اسناد مربوط به زنجیره">
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="توضیحات"
          rules={[{
            required: true,
            message: 'لطفا توضیحات زنجیره را وارد نمایید.'
          }]}>
          <Input.TextArea rows={4} maxLength={6} />
        </Form.Item>
        {/* <Form.Item>
          <span className='block mb-2'>اسناد مربوط به زنجیره</span>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="text-gray-400 text-sm">تصویر را در اینجا بکشید و رها کنید یا روی افزودن تصویر کلیک کنید</p>
          </Dragger>
        </Form.Item> */}
        <Form.Item>
          <span className='block mb-2'>رسم زنجیره</span>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button htmlType="submit">
            ذخیره
          </Button>
        </Form.Item>
      </Form>
      <div>
        <Button onClick={showModal}>Add Node</Button>
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            allowClear
            options={options}
            onChange={(value, options) => handleChange(value, options)}
            placeholder="لطفا محصولات مورد نظر را انتخاب کنید."
          />
        </Modal>
      </div>
      <DrawChain nodesList={nodesList} getChainData={getChainData} />
    </Card>
  )
}
NewChain.layout = 'admin';
export default NewChain
