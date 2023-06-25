import React, {useState} from 'react';
import { Button, Card, Form, Input } from 'antd';


const { TextArea } = Input;

import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';

import 'beautiful-react-diagrams/styles.css';
import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams';
import {DiagramSchema} from "beautiful-react-diagrams/@types/DiagramSchema";




const initialSchema = createSchema({
  nodes: [
/*    { id: 'node-1', content: 'تسلا تک ایرانیان', coordinates: [250, 60],   outputs: [ { id:Math.random().toString(36).slice(2, 7) }] },
    { id: 'node-2', content: 'چینوا', coordinates: [100, 200] , outputs: [ { id: Math.random().toString(36).slice(2, 7)  }]  },
    { id: 'node-3', content: 'آذز افروز', coordinates: [250, 220], outputs: [ { id:Math.random().toString(36).slice(2, 7)  }]  },
    { id: 'node-4', content: 'اردوان سازه پایدار', coordinates: [400, 200], outputs: [ { id:Math.random().toString(36).slice(2, 7) }] },*/
  ],
  links: [
/*    { input: 'node-1',  output: 'node-2' },
    { input: 'node-2',  output: 'node-3' },
    { input: 'node-3',  output: 'node-4' },*/
  ],
});

const UncontrolledDiagram = () => {




  const [schema, { onChange, addNode }] = useSchema(initialSchema);
  const [nodeCounter, setNodeCounter] = useState(4); // Counter for generating unique node IDs

  const handleAddNode = () => {
    let companyName = prompt("Please enter compnay name", "");


    const newNodeId = companyName ;
    const newNode = { id: newNodeId, content: <Button>newNodeId</Button> , coordinates: [0, 0] , outputs: [ { id: newNodeId+'_link'   }] };

    // @ts-ignore
    addNode(newNode);
    setNodeCounter(nodeCounter + 1);
  };
  const handleClick = () => {
    console.log(schema.links);
    console.log(schema.nodes);
  };

  // @ts-ignore
  const test = (schema) => {

  };

  return (

      <div style={{ height: '22.5rem' }}>

        <Diagram schema={schema}
                 onChange={onChange}

        />
        <Button onClick={handleAddNode}>Add Node</Button>
        <Button onClick={handleClick}>Get chain info in console</Button>
      </div>
  );
};





const { Dragger } = Upload;

const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const NewChain = () => {



  const onFinish = (values: any) => {
    console.log('Success:', values);
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
        autoComplete="off"
      >
        <Form.Item
          label="نام زنجیره"
          name="username"
          rules={[{ required: true, message: 'لطفا نام زنجیره را وارد نمایید.' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <span className='block mb-2'>توضیحات</span>
          <TextArea rows={4} maxLength={6} />
        </Form.Item>
        <Form.Item>
          <span className='block mb-2'>اسناد مربوط به زنجیره</span>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="text-gray-400 text-sm">تصویر را در اینجا بکشید و رها کنید یا روی افزودن تصویر کلیک کنید</p>
          </Dragger>
        </Form.Item>
        <Form.Item>
          <span className='block mb-2'>رسم زنجیره</span>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            ذخیره
          </Button>
        </Form.Item>
      </Form>
      <div className="App">
        <UncontrolledDiagram />
      </div>
    </Card>
  )
}
NewChain.layout = 'admin';
export default NewChain
