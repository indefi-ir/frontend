import { Popover } from 'antd';
import Diagram, { useSchema, createSchema } from 'beautiful-react-diagrams';
import useSWR from 'swr';
import 'beautiful-react-diagrams/styles.css';
import React from 'react';
import { BuildingIcon } from '../../components/icons';
import { fetcher } from '../../services/axios';
import { tooltipSupplyChainForCompanyUrl } from '../../services/apiEndpoint';

const ViewChain = ( {chain, chainId}:  any) => {

  const CustomNode = (props: any) => {
    const { outputs, inputs, id } = props;
    console.log("props", props)
    const { data: tooltipData } = useSWR(`${tooltipSupplyChainForCompanyUrl}?chainId=${chainId}&companyId=${id}`, fetcher);
    const tooltipContent = () => (
      <div className='flex flex-col'>
        <div>
          <span>خریدها</span>
          {tooltipData?.data?.buys?.map((buy: any) => (
            <>
              <div>
                <span className='block text-primary'>نام محصول</span>
                {buy?.product?.name}
              </div>
              <div>
                <span className='block text-primary'> میزان محصول</span>
                {buy?.productAmount}
              </div>
              <div>
                <span className='block text-primary'> مبلغ محصول</span>
                {buy?.value}
              </div>
            </>
          ))}
        </div>
        <div>
          <span className='block'>فروش ها</span>
          {tooltipData?.data?.sells?.map((sell: any) => (
            <>
              <div>
                <span className='block text-primary'> نام محصول</span>
                {sell?.product?.name}
              </div>
              <div>
                <span className='block text-primary'> میزان محصول‌</span>
  
                {sell?.productAmount}
              </div>
              <div>
                <span className='block text-primary'> مبلغ محصول</span>
                {sell?.value}
              </div>
            </>
          ))}
        </div>
      </div>
    );
  
    return (
      <Popover content={tooltipContent} trigger="hover">
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
      </Popover>
    );
  }
  let ParsedChainSchema;

  if(chain != null){
    ParsedChainSchema = JSON.parse(chain);
  }

  const chainLinks: { input: string; output: string;readonly: boolean }[]  = [];
  ParsedChainSchema?.links?.map((link:any)=> (
    chainLinks.push({
      input: link.input,
      output: link.output,
      readonly: true
    })
  ));

  const chainNodes: any = [];
  ParsedChainSchema?.nodes?.map((node: any) => (
    chainNodes.push({
      id: node?.id, 
      content: node?.content, 
      coordinates: node?.coordinates,
      inputs: node?.inputs,
      outputs: node?.outputs, 
      render:CustomNode
   })
  ))

  const initialSchema = createSchema({
    nodes: chainNodes,
    links: chainLinks
  });

  const [schema, { onChange, addNode, removeNode }] = useSchema(initialSchema);

  return (
    <div style={{ height: '22.5rem' }}>
      <Diagram schema={schema} onChange={onChange} />
    </div>
  );
};


export default ViewChain

