import { Button } from 'antd';
import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams';
import { useEffect, useState } from 'react';

// @ts-ignore
const UncontrolledDiagram = ({ nodesList, getChainData }) => {
  const initialSchema = createSchema({
    nodes: [],
    links: []
  });

  const [schema, { onChange, addNode, removeNode }] = useSchema(initialSchema);

  console.log("schema.links",schema.nodes)
  const [chainData, setChainData] = useState<any>();

  const findHeadAndPrintChain = (links: any) => {
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

    const chain = [headNode];
    let currentNode = headNode;

    setChainData(chain)

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
  }

  const sendChainData = () => {
    findHeadAndPrintChain(schema.links);
    getChainData({
      nodes: chainData,
      links: schema.links,
      schema: schema
    })
  }

  useEffect(() => {
    nodesList?.map((company: any) => (
      addNode(company)
    ))
  }, [nodesList?.length])

  return (
    <div style={{ height: '22.5rem' }}>
      <Diagram schema={schema} onChange={onChange} />
      <Button type="primary" className="bg-pasargad-yellow-400 text-white mt-4" onClick={sendChainData}>ثبت زنجیره</Button>
    </div>
  );
};

export default UncontrolledDiagram

