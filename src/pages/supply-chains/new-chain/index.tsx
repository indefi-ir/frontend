import React, { useState } from 'react';
import { Button, Card, Form, Input, notification, Select, SelectProps, Upload, UploadProps } from 'antd';
import useSWR, { mutate } from 'swr';
import 'beautiful-react-diagrams/styles.css';
import { fetcher, post } from '../../../services/axios';
import { addSupplyChainUrl, companiesUrl, getAllSupplyChainsUrl } from '../../../services/apiEndpoint';
import { DrawChain } from '../../../features';
import { BuildingIcon } from '../../../components/icons';
import { InboxOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

const { Dragger } = Upload;

const CustomNode = (props: any) => {
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
  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();
  const [companiesList, setCompaniesList] = useState([]);
  const [nodesList, setNodesList] = useState<any>([])
  const [chainInfo, setChainInfo] = useState<any>({
    nodes: [],
    links:[],
    schema: []
  });


  console.log("chainInfo.nnode", chainInfo.nodes)
  const [file, setFile] = useState<any>({});

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      setFile(info?.file?.name);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const getChainData = (data: {
    nodes:any,
    links:any
  }) => {
    setChainInfo(data)
  };

  const cloneChainInfo = chainInfo?.nodes?.length > 0 ? [...chainInfo?.nodes] : []
  cloneChainInfo.shift();


  console.log("cloneChainInfo", cloneChainInfo)

  const handleOk = () => {
    companiesList?.map((company: { value: any; label: any; }) => (
      setNodesList((current: any) => [...current, {
        id: company.value,
        content: company.label,
        render: CustomNode,
        coordinates: [0, 0],
        inputs: [{ id: company.value + '_in' }],
        outputs: [{ id: company.value+ '_out' }],
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

  const chianLinks: { item1: any; item2: any; }[] = [];
  chainInfo.links.map((link: {input:any; output:any}) => (
    chianLinks.push({
      item1: link.output.split('_')[0],
      item2: link.input.split('_')[0]
    })
  ))

  const chianCoordinates:any[] = [];
    


  const onFinish = async (values: any) => {
    const finalData = { ...values, logo: file, head: chainInfo?.nodes[0], chianNodes: cloneChainInfo, chianLinks:chianLinks, cordinates:JSON.stringify(chainInfo?.schema)}
    const result = await post(addSupplyChainUrl, finalData);
    if (result.status) {
      api["success"]({
        message: <span className='text-sm text-green-500'>زنجیره مورد نظر با موفقیت افزوده شد.</span>,
        duration: 2,
      });
      await mutate(getAllSupplyChainsUrl);
      router.push(`/supply-chains`);
    } else {
      api["error"]({
        message: <span className='text-sm text-red-500'>{result.response.data}</span>,
        duration: 2,
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      {contextHolder}
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
          {/* <Form.Item name="logo" label="اسناد مربوط به زنجیره">
          <Input />
        </Form.Item> */}
          <div className='mb-4'>
            <span className='block mb-2'>اسناد مربوط به زنجیره</span>
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-hint">
                فایل را در اینجا بکشید و رها کنید یا روی افزودن تصویر کلیک کنید
              </p>
            </Dragger>
          </div>
          <Form.Item
            name="description"
            label="توضیحات"
            rules={[{
              required: true,
              message: 'لطفا توضیحات زنجیره را وارد نمایید.'
            }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
          <div>
            <span className='block mb-2'>رسم زنجیره</span>

            <div className='flex items-center w-full rounded-lg  mb-2'>
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
    </>
  )
}
NewChain.layout = 'admin';
export default NewChain


