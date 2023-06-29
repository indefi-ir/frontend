import React, { useState } from 'react';
import { Button, Card, Form, Input, Modal, Select, SelectProps } from 'antd';
import useSWR from 'swr';
import 'beautiful-react-diagrams/styles.css';
import { fetcher, post } from '../../../services/axios';
import { addSupplyChainUrl, companiesUrl } from '../../../services/apiEndpoint';
import { DrawChain } from '../../../features';
import { BuildingIcon } from '../../../components/icons';


const CustomNode = (props: any) => {
  console.log("props", props)
  const { outputs, inputs } = props;

  return (
    <div className='flex flex-col items-center justify-center bg-red'>
      <div className='flex justify-between items-center'>
        {outputs.map((port: any) => React.cloneElement(port, { style: { width: '25px', height: '25px', background: '#F9B4AF', borderRadius: '50%' } }))}
        <div className='flex justify-center items-center rounded-full bg-primary-100 w-14 h-14 mb-2'>
          <BuildingIcon color="#5C59E8" width="30" height="30" />
        </div>

        {inputs.map((port: any) => React.cloneElement(port, { style: { width: '25px', height: '25px', background: '#9ED0B9', borderRadius: '50%' } }))}

      </div>
      <div className='bg-blue-300 rounded-md py-2 px-5'>
        {props.content}
      </div>

    </div>
  );
}

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
        render: CustomNode,
        coordinates: [0, 0],
        inputs: [{ id: company.value + '_in' }],
        outputs: [{ id: company.value + '_in' }],
      }])
    ))
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // @ts-ignore
  const handleChange = (value, options) => {
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
        name="supply-chain"
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
          <Input.TextArea rows={4} />
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
          <span className='block mb-1'>رسم زنجیره</span>
        </Form.Item>
        <div>
          <div className='flex items-center bg-primary-100 w-full rounded-lg p-3 mb-2'>
            <Select
              mode="multiple"
              style={{ minWidth: "500px" }}
              allowClear
              options={options}
              onChange={(value, options) => handleChange(value, options)}
              placeholder="انتخاب شرکت ها"
            />
            <Button type="primary" onClick={() => handleOk()} className="bg-primary-500 text-white mr-2">
              ارسال شرکت ها به زنجیره
            </Button>
          </div>
          <DrawChain nodesList={nodesList} getChainData={getChainData} />
        </div>
        <Form.Item className='flex justify-end mt-4'>
          <Button htmlType="submit" className='bg-primary-500 text-white'>
            ذخیره
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}
NewChain.layout = 'admin';
export default NewChain
