import React, {useState} from 'react';
import { Button, Card, Form, Input } from 'antd';


const { TextArea } = Input;

import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';

import 'beautiful-react-diagrams/styles.css';
import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams';
import {DiagramSchema} from "beautiful-react-diagrams/@types/DiagramSchema";





// @ts-ignore
function isTree(links) {
  const nodes = new Set();
  const childrenMap = {};

  for (const link of links) {
    const parent = link.input;
    const child = link.output;

    if (!nodes.has(parent)) {
      nodes.add(parent);
    }
    if (!nodes.has(child)) {
      nodes.add(child);
    }

    // @ts-ignore
    if (!childrenMap[parent]) {
      // @ts-ignore
      childrenMap[parent] = [];
    }
    // @ts-ignore
    childrenMap[parent].push(child);
  }

  let rootCount = 0;
  // @ts-ignore
  for (const node of nodes) {
    // @ts-ignore
    if (!childrenMap[node]) {
      rootCount++;
    }
    if (rootCount > 1) {
      return false; // Multiple roots found, not a tree
    }
  }

  if (rootCount !== 1) {
    return false; // No root found, not a tree
  }

  const visited = new Set();
  const stack = [Array.from(nodes)[0]]; // Start traversal from the root

  while (stack.length > 0) {
    const node = stack.pop();

    if (visited.has(node)) {
      return false; // Cycle detected, not a tree
    }

    visited.add(node);

    // @ts-ignore
    if (childrenMap[node]) {
      // @ts-ignore
      stack.push(...childrenMap[node]);
    }
  }

  return visited.size === nodes.size; // All nodes visited, forms a tree
}





// @ts-ignore
function findHeadAndPrintChain(links) {
  const inputs = new Set();
  const outputs = new Set();

  for (const link of links) {
    inputs.add(link.input.split('_')[0]);
    outputs.add(link.output.split('_')[0]);
  }

  let headNode = null;

  // @ts-ignore
  for (const node of outputs) {
    if (!inputs.has(node)) {
      headNode = node;
      break;
    }
  }

  if (headNode === null) {
    console.log('No head node found.');
    return;
  }

  console.log('Head Node:', headNode);

  const chain = [headNode];
  let currentNode = headNode;

  while (true) {
    // @ts-ignore
    const link = links.find((link) => link.output.startsWith(currentNode));
    if (link) {
      currentNode = link.input.split('_')[0];
      chain.push(currentNode);
    } else {
      break;
    }
  }

  console.log('Chain:', chain);
}







// @ts-ignore
function findNodeWithOutNoIn(links) {
  const outputNodes = new Set();
  const inputNodes = new Set();

  for (const link of links) {
    outputNodes.add(link.output.split('_')[0]);
    inputNodes.add(link.input.split('_')[0]);
  }

  // @ts-ignore
  for (const node of outputNodes) {
    if (!inputNodes.has(node)) {
      return node;
    }
  }

  return null;
}






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
    const newNode = { id: newNodeId, content: <Button>{newNodeId}</Button> , coordinates: [0, 0] , outputs: [ { id: newNodeId+'_in'   }, { id: newNodeId+'_out'   }] };

    // @ts-ignore
    addNode(newNode);
    setNodeCounter(nodeCounter + 1);
  };
  const handleClick = () => {

/*    const head = findNodeWithOutNoIn(schema.links);
    (findHeadAndPrintChain(schema.links))
    console.log('Head:', head);
    console.log('isTree:', isTree(schema.links))*/
    console.log(schema.links);
    (findHeadAndPrintChain(schema.links))
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
