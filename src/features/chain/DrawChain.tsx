import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams';
import { useEffect, useState } from 'react';

// @ts-ignore




const UncontrolledDiagram = (nodesList:any, setIsParentData:any) => {
  const initialSchema = createSchema({
    nodes: [],
    links:[]
  });
  const [schema, { onChange, addNode, removeNode }] = useSchema(initialSchema);
  const [chainData, setChainData] = useState()

  console.log("schema",schema)


  const findHeadAndPrintChain = (links:any) => {
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

    setChainData(chainData)
  }

 useEffect(()=> {
  nodesList?.data?.map((company:any) => (
    addNode(company)
  ))
 }, [nodesList?.data?.length])

 


  return (
    <div style={{ height: '22.5rem' }}>
      <Diagram schema={schema} onChange={onChange} />
      <button onClick={() => {setIsParentData(chainData)}}>Update</button>
    </div>
  );
};

export default UncontrolledDiagram

